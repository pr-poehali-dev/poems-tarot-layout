import { useState } from 'react';
import Icon from '@/components/ui/icon';

const CARD_BACK = 'https://cdn.poehali.dev/projects/863578ef-b3c4-4de5-b685-46de58c92141/files/5759482e-e0fe-4e76-876d-cd3ec61e3312.jpg';

interface TarotCard {
  name: string;
  symbol: string;
  meaning: string;
}

const DECK: TarotCard[] = [
  { name: 'Звезда', symbol: '✦', meaning: 'Надежда, вдохновение, тихий свет в ночи. Твои мечты ближе, чем кажутся.' },
  { name: 'Луна', symbol: '☽', meaning: 'Интуиция и тайны. Доверься внутреннему голосу — он знает дорогу.' },
  { name: 'Солнце', symbol: '☀', meaning: 'Радость, ясность, успех. Впереди тёплый и светлый период.' },
  { name: 'Маг', symbol: '✷', meaning: 'Сила воли и творчество. У тебя есть всё, чтобы воплотить задуманное.' },
  { name: 'Жрица', symbol: '◈', meaning: 'Мудрость и тайное знание. Прислушайся к снам и предчувствиям.' },
  { name: 'Влюблённые', symbol: '❦', meaning: 'Выбор сердца, гармония, союз. Слушай, чего хочет душа.' },
  { name: 'Колесо', symbol: '⊛', meaning: 'Перемены и судьба. Цикл завершается, начинается новый виток.' },
  { name: 'Башня', symbol: '⛬', meaning: 'Внезапное озарение. То, что рушится, освобождает место новому.' },
  { name: 'Отшельник', symbol: '✣', meaning: 'Уединение и поиск. Свет истины зажигается изнутри.' },
  { name: 'Сила', symbol: '∞', meaning: 'Мягкая внутренняя мощь. Терпение приручает любого зверя.' },
  { name: 'Мир', symbol: '❂', meaning: 'Завершение и целостность. Круг замкнулся, ты дома.' },
  { name: 'Императрица', symbol: '♛', meaning: 'Изобилие и творчество. Земля щедра к тем, кто любит.' },
];

const POSITIONS = ['Прошлое', 'Настоящее', 'Будущее'];

function pickThree(): TarotCard[] {
  const shuffled = [...DECK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

const TarotSpread = () => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([false, false, false]);
  const [started, setStarted] = useState(false);

  const startSpread = () => {
    setCards(pickThree());
    setRevealed([false, false, false]);
    setStarted(true);
  };

  const reveal = (i: number) => {
    setRevealed((prev) => prev.map((v, idx) => (idx === i ? true : v)));
  };

  const allRevealed = started && revealed.every(Boolean);

  return (
    <div className="flex flex-col items-center">
      {!started ? (
        <button
          onClick={startSpread}
          className="group relative px-10 py-4 font-display text-lg tracking-wider text-background bg-primary rounded-sm overflow-hidden transition-transform hover:scale-105"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Icon name="Sparkles" size={18} />
            Сделать расклад
          </span>
        </button>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-10 w-full max-w-3xl">
            {cards.map((card, i) => (
              <div key={i} className="flex flex-col items-center">
                <p className="mb-4 font-script text-2xl text-gold">{POSITIONS[i]}</p>
                <div
                  className="card-3d w-[180px] h-[300px] cursor-pointer"
                  onClick={() => reveal(i)}
                >
                  <div
                    className="relative w-full h-full transition-transform duration-700"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: revealed[i] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-lg overflow-hidden border border-gold/40 shadow-2xl"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      <img src={CARD_BACK} alt="Рубашка карты" className="w-full h-full object-cover" />
                      {!revealed[i] && (
                        <div className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-black/60 to-transparent">
                          <span className="text-xs tracking-widest text-gold/90 uppercase">Открыть</span>
                        </div>
                      )}
                    </div>
                    <div
                      className="absolute inset-0 rounded-lg glass flex flex-col items-center justify-center p-5 text-center"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      <span className="text-5xl text-gold mb-3 animate-glow">{card.symbol}</span>
                      <h4 className="font-display text-2xl text-gold mb-3">{card.name}</h4>
                      <div className="ornament-line w-16 mb-3" />
                      <p className="text-sm text-foreground/80 leading-relaxed italic">{card.meaning}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={startSpread}
            className="mt-12 flex items-center gap-2 px-8 py-3 font-display tracking-wider text-gold border border-gold/50 rounded-sm hover:bg-gold/10 transition-colors"
          >
            <Icon name="RotateCcw" size={16} />
            Новый расклад
          </button>

          {allRevealed && (
            <p className="mt-6 max-w-xl text-center font-serif text-lg text-muted-foreground italic animate-fade-up">
              Карты сложили свою историю. Прислушайся к тому, что отозвалось в сердце.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default TarotSpread;
