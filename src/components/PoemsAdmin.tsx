import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const API = 'https://functions.poehali.dev/4891cda1-7cff-4248-a5ce-bd8c32105b90';

interface Poem {
  id: number;
  title: string;
  content: string;
}

const PASS = 'солнечная';

export default function PoemsAdmin({ onClose }: { onClose: () => void }) {
  const [auth, setAuth] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [poems, setPoems] = useState<Poem[]>([]);
  const [editing, setEditing] = useState<Poem | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const load = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setPoems(data);
  };

  useEffect(() => { if (auth) load(); }, [auth]);

  const save = async () => {
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    if (editing) {
      await fetch(API, { method: 'PUT', body: JSON.stringify({ id: editing.id, title, content }) });
      setMsg('Стихотворение обновлено!');
    } else {
      await fetch(API, { method: 'POST', body: JSON.stringify({ title, content }) });
      setMsg('Стихотворение добавлено!');
    }
    setEditing(null);
    setTitle('');
    setContent('');
    await load();
    setLoading(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const del = async (id: number) => {
    if (!confirm('Удалить стихотворение?')) return;
    await fetch(API, { method: 'DELETE', body: JSON.stringify({ id }) });
    await load();
  };

  const startEdit = (p: Poem) => {
    setEditing(p);
    setTitle(p.title);
    setContent(p.content);
  };

  const cancel = () => {
    setEditing(null);
    setTitle('');
    setContent('');
  };

  if (!auth) return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="glass rounded-xl p-8 w-full max-w-sm">
        <h2 className="font-display text-2xl text-gold mb-6 text-center">Вход в редактор</h2>
        <input
          type="password"
          placeholder="Пароль"
          value={passInput}
          onChange={e => setPassInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && passInput === PASS && setAuth(true)}
          className="w-full bg-input border border-border rounded px-4 py-3 text-foreground mb-4 focus:outline-none focus:border-gold"
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-border rounded py-2 text-muted-foreground hover:border-gold/50 transition-colors">Отмена</button>
          <button
            onClick={() => { if (passInput === PASS) setAuth(true); else setMsg('Неверный пароль'); }}
            className="flex-1 bg-primary text-background font-display rounded py-2 hover:opacity-90 transition-opacity"
          >Войти</button>
        </div>
        {msg && <p className="text-destructive text-sm mt-3 text-center">{msg}</p>}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm px-4 py-8 overflow-y-auto">
      <div className="glass rounded-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="font-display text-2xl text-gold">Редактор стихов</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-gold transition-colors">
            <Icon name="X" size={22} />
          </button>
        </div>

        <div className="p-6 border-b border-border">
          <h3 className="font-display text-lg text-foreground/80 mb-4">{editing ? 'Редактировать стихотворение' : 'Добавить новое стихотворение'}</h3>
          <input
            type="text"
            placeholder="Название"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-input border border-border rounded px-4 py-2 text-foreground mb-3 focus:outline-none focus:border-gold"
          />
          <textarea
            placeholder="Текст стихотворения..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={10}
            className="w-full bg-input border border-border rounded px-4 py-2 text-foreground font-serif leading-relaxed focus:outline-none focus:border-gold resize-none"
          />
          {msg && <p className="text-green-400 text-sm mt-2">{msg}</p>}
          <div className="flex gap-3 mt-3">
            {editing && <button onClick={cancel} className="border border-border rounded px-4 py-2 text-muted-foreground hover:border-gold/50 transition-colors">Отмена</button>}
            <button
              onClick={save}
              disabled={loading}
              className="bg-primary text-background font-display px-6 py-2 rounded hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
            >
              <Icon name={editing ? 'Save' : 'Plus'} size={16} />
              {editing ? 'Сохранить' : 'Добавить'}
            </button>
          </div>
        </div>

        <div className="p-6 space-y-3">
          <h3 className="font-display text-lg text-foreground/80 mb-4">Мои стихи ({poems.length})</h3>
          {poems.length === 0 && <p className="text-muted-foreground text-center py-4">Стихов пока нет</p>}
          {poems.map(p => (
            <div key={p.id} className="flex items-center justify-between bg-card rounded-lg px-4 py-3 border border-border">
              <span className="font-display text-foreground/90 truncate">{p.title}</span>
              <div className="flex gap-2 ml-4 shrink-0">
                <button onClick={() => startEdit(p)} className="text-muted-foreground hover:text-gold transition-colors">
                  <Icon name="Pencil" size={16} />
                </button>
                <button onClick={() => del(p.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Icon name="Trash2" size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
