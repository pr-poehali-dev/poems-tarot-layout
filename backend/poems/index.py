import json
import os
import psycopg2

SCHEMA = 't_p51651311_poems_tarot_layout'

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def handler(event: dict, context) -> dict:
    """CRUD для стихов: GET — список, POST — создать, PUT — обновить, DELETE — удалить."""
    headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json',
    }

    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': headers, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}

    conn = get_conn()
    cur = conn.cursor()

    try:
        if method == 'GET':
            cur.execute(f'SELECT id, title, content, created_at FROM {SCHEMA}.poems ORDER BY created_at DESC')
            rows = cur.fetchall()
            poems = [{'id': r[0], 'title': r[1], 'content': r[2], 'created_at': str(r[3])} for r in rows]
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps(poems, ensure_ascii=False)}

        body = json.loads(event.get('body') or '{}')

        if method == 'POST':
            title = body.get('title', '').strip()
            content = body.get('content', '').strip()
            if not title or not content:
                return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'title и content обязательны'})}
            cur.execute(f"INSERT INTO {SCHEMA}.poems (title, content) VALUES (%s, %s) RETURNING id", (title, content))
            new_id = cur.fetchone()[0]
            conn.commit()
            return {'statusCode': 201, 'headers': headers, 'body': json.dumps({'id': new_id})}

        if method == 'PUT':
            poem_id = body.get('id')
            title = body.get('title', '').strip()
            content = body.get('content', '').strip()
            if not poem_id or not title or not content:
                return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'id, title и content обязательны'})}
            cur.execute(f"UPDATE {SCHEMA}.poems SET title=%s, content=%s, updated_at=NOW() WHERE id=%s", (title, content, poem_id))
            conn.commit()
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}

        if method == 'DELETE':
            poem_id = body.get('id') or params.get('id')
            if not poem_id:
                return {'statusCode': 400, 'headers': headers, 'body': json.dumps({'error': 'id обязателен'})}
            cur.execute(f"DELETE FROM {SCHEMA}.poems WHERE id=%s", (poem_id,))
            conn.commit()
            return {'statusCode': 200, 'headers': headers, 'body': json.dumps({'ok': True})}

    finally:
        cur.close()
        conn.close()

    return {'statusCode': 405, 'headers': headers, 'body': json.dumps({'error': 'Метод не поддерживается'})}
