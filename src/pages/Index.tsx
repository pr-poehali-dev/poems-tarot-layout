import { useState } from 'react';
import Icon from '@/components/ui/icon';
import TarotSpread from '@/components/TarotSpread';

const HERO_IMG = 'https://cdn.poehali.dev/projects/863578ef-b3c4-4de5-b685-46de58c92141/files/f86d6af7-9dea-48e0-9a14-a3ab6cd155de.jpg';

const NAV = [
  { id: 'hero', label: 'Главная' },
  { id: 'poems', label: 'Стихи' },
  { id: 'tarot', label: 'Расклады' },
  { id: 'author', label: 'Об авторе' },
  { id: 'gallery', label: 'Галерея' },
  { id: 'blog', label: 'Блог' },
  { id: 'contacts', label: 'Контакты' },
];

const POEMS = [
  {
    title: 'Я тихая гавань',
    lines: [
      'Я тихая гавань горной реки',
      'В уютном покое зелени леса',
      'Я в каплях росы отражение звёзд',
      'Коротких ночей московского лета',
      '',
      'Я томная нега туманных зарниц',
      'Прохлады объятья рассветного неба',
      'Я утренний шёпет стройных берёз',
      'Чьи ветки качает ласково ветер',
      '',
      'Я воздух пропитанный духом садов',
      'Цветочных нектаров благоуханье',
      'Я в солнечном свете дневное тепло',
      'Дающее вечное жизни дыханье',
      '',
      'Я множество птиц несмолкающий хор',
      'С разнообразной сменой солистов',
      'Я звуков чарующих нот колдовство',
      'Сплетение вместе с шелестом листьев',
      '',
      'Я все настроения чувства и знания',
      'Всё окружение, всё что внутри',
      'Я всё что в душе и потёмках сознания',
      'Всё это я создаю для земного пути',
      '',
      'Новые сутки наполнены действом',
      'Не повторяясь событий река',
      'Течёт в своём вечном русле безвременья',
      'А своим состоянием я создаю глубины берега',
    ],
  },
];

const GALLERY = [
  { emoji: '🌙', title: 'Лунный цикл' },
  { emoji: '🕯️', title: 'Свечи и тени' },
  { emoji: '🪶', title: 'Перо и чернила' },
  { emoji: '✦', title: 'Звёздная карта' },
  { emoji: '🔮', title: 'Хрустальный шар' },
  { emoji: '🌿', title: 'Травы судьбы' },
];

const BLOG = [
  { date: '12 июня', title: 'Как читать расклад из трёх карт', excerpt: 'Прошлое, настоящее и будущее — простая основа для глубокого диалога с собой.' },
  { date: '3 июня', title: 'Поэзия как медитация', excerpt: 'Почему написание стихов успокаивает ум и открывает интуицию.' },
  { date: '24 мая', title: 'Символы Старших Арканов', excerpt: 'Краткий путеводитель по образам, что встречаются на картах.' },
];

const Section = ({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) => (
  <section id={id} className={`relative py-24 px-6 scroll-mt-20 ${className}`}>
    <div className="max-w-6xl mx-auto">{children}</div>
  </section>
);

const Title = ({ kicker, children }: { kicker: string; children: React.ReactNode }) => (
  <div className="text-center mb-16">
    <p className="font-script text-3xl text-gold mb-2">{kicker}</p>
    <h2 className="font-display text-4xl md:text-6xl tracking-wide gold-gradient">{children}</h2>
    <div className="flex items-center justify-center gap-3 mt-6">
      <div className="ornament-line w-24" />
      <span className="text-gold text-xl">✦</span>
      <div className="ornament-line w-24" />
    </div>
  </div>
);

const Index = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <header className="fixed top-0 inset-x-0 z-50 glass">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#hero" className="font-display text-xl tracking-widest text-gold flex items-center gap-2">
            <span className="text-2xl">☀</span> Солнечная Чернильница
          </a>
          <nav className="hidden lg:flex gap-7">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="font-display text-sm tracking-wider text-foreground/80 hover:text-gold transition-colors">
                {n.label}
              </a>
            ))}
          </nav>
          <button className="lg:hidden text-gold" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? 'X' : 'Menu'} size={26} />
          </button>
        </div>
        {menuOpen && (
          <nav className="lg:hidden flex flex-col px-6 pb-4 gap-3 animate-fade-up">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setMenuOpen(false)} className="font-display tracking-wider text-foreground/80 hover:text-gold">
                {n.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 vignette">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left animate-fade-up">
            <p className="font-script text-4xl text-gold mb-4">стихи · таро · мечты</p>
            <h1 className="font-display text-5xl md:text-7xl leading-tight gold-gradient mb-6">
              Солнечная Чернильница
            </h1>
            <p className="font-serif text-xl text-foreground/80 leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
              Пространство, где рождаются стихи и оживают карты таро. Загляни внутрь — и узнай, о чём шепчет ночь.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#tarot" className="px-8 py-3 bg-primary text-background font-display tracking-wider rounded-sm hover:scale-105 transition-transform flex items-center gap-2">
                <Icon name="Sparkles" size={18} /> Сделать расклад
              </a>
              <a href="#poems" className="px-8 py-3 border border-gold/50 text-gold font-display tracking-wider rounded-sm hover:bg-gold/10 transition-colors">
                Читать стихи
              </a>
            </div>
          </div>
          <div className="relative animate-float">
            <div className="absolute -inset-4 rounded-full bg-gold/15 blur-3xl animate-glow" />
            <img src={HERO_IMG} alt="Мистическая иллюстрация" className="relative rounded-2xl border border-gold/30 shadow-2xl" />
          </div>
        </div>
        <a href="#poems" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gold/70 animate-bounce">
          <Icon name="ChevronDown" size={28} />
        </a>
      </section>

      <Section id="poems">
        <Title kicker="строки из тишины">Стихи</Title>
        <div className="max-w-2xl mx-auto">
          {POEMS.map((p, i) => (
            <article key={i} className="glass rounded-lg p-10">
              <span className="text-gold text-3xl">❝</span>
              <h3 className="font-display text-2xl text-gold mb-6 mt-2">{p.title}</h3>
              <div>
                {p.lines.map((l, j) => (
                  l === ''
                    ? <div key={j} className="h-4" />
                    : <p key={j} className="font-serif text-lg italic text-foreground/90 leading-relaxed">{l}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="tarot" className="bg-card/30">
        <Title kicker="спроси у карт">Интерактивный расклад</Title>
        <p className="text-center font-serif text-lg text-muted-foreground max-w-xl mx-auto mb-14 italic">
          Сосредоточься на своём вопросе, открой три карты и услышь историю прошлого, настоящего и будущего.
        </p>
        <TarotSpread />
      </Section>

      <Section id="author">
        <Title kicker="голос за строками">Об авторе</Title>
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-gold/20 blur-2xl" />
              <div className="relative w-48 h-48 rounded-full glass flex items-center justify-center text-7xl">🌙</div>
            </div>
          </div>
          <div>
            <p className="font-serif text-xl text-foreground/85 leading-relaxed mb-4 italic">
              Я пишу стихи с тех пор, как научилась видеть в ночном небе не темноту, а карту. Таро для меня — не предсказание, а язык, на котором душа говорит сама с собой.
            </p>
            <p className="font-serif text-lg text-muted-foreground leading-relaxed">
              На этих страницах живут мои строки и расклады. Пусть они станут для тебя тихим спутником в дороге к себе.
            </p>
            <p className="font-script text-3xl text-gold mt-6">— с любовью, Луна</p>
          </div>
        </div>
      </Section>

      <Section id="gallery" className="bg-card/30">
        <Title kicker="образы и сны">Галерея</Title>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY.map((g, i) => (
            <div key={i} className="group relative aspect-square glass rounded-lg flex flex-col items-center justify-center gap-3 overflow-hidden hover:border-gold/60 transition-colors">
              <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors" />
              <span className="text-6xl group-hover:scale-110 transition-transform duration-500">{g.emoji}</span>
              <p className="font-display tracking-wider text-gold">{g.title}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="blog">
        <Title kicker="мысли вслух">Блог</Title>
        <div className="space-y-6 max-w-3xl mx-auto">
          {BLOG.map((b, i) => (
            <article key={i} className="glass rounded-lg p-7 flex flex-col md:flex-row md:items-center gap-4 hover:border-gold/50 transition-colors">
              <span className="font-script text-2xl text-gold whitespace-nowrap">{b.date}</span>
              <div className="hidden md:block w-px self-stretch bg-gold/30" />
              <div>
                <h3 className="font-display text-2xl text-gold mb-1">{b.title}</h3>
                <p className="font-serif text-lg text-foreground/75">{b.excerpt}</p>
              </div>
              <Icon name="ArrowRight" size={22} className="text-gold/60 ml-auto hidden md:block" />
            </article>
          ))}
        </div>
      </Section>

      <Section id="contacts" className="bg-card/30">
        <Title kicker="напиши мне">Контакты</Title>
        <div className="max-w-md mx-auto glass rounded-lg p-8">
          <div className="space-y-4">
            <input placeholder="Ваше имя" className="w-full bg-input/60 border border-gold/20 rounded-sm px-4 py-3 font-serif text-foreground placeholder:text-muted-foreground focus:border-gold/60 outline-none transition-colors" />
            <input placeholder="Email" className="w-full bg-input/60 border border-gold/20 rounded-sm px-4 py-3 font-serif text-foreground placeholder:text-muted-foreground focus:border-gold/60 outline-none transition-colors" />
            <textarea placeholder="Ваше послание..." rows={4} className="w-full bg-input/60 border border-gold/20 rounded-sm px-4 py-3 font-serif text-foreground placeholder:text-muted-foreground focus:border-gold/60 outline-none transition-colors resize-none" />
            <button className="w-full py-3 bg-primary text-background font-display tracking-wider rounded-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
              <Icon name="Send" size={18} /> Отправить
            </button>
          </div>
          <div className="flex justify-center gap-6 mt-8 text-gold">
            <a href="#" className="hover:scale-125 transition-transform"><Icon name="Instagram" size={24} /></a>
            <a href="#" className="hover:scale-125 transition-transform"><Icon name="Send" size={24} /></a>
            <a href="#" className="hover:scale-125 transition-transform"><Icon name="Mail" size={24} /></a>
          </div>
        </div>
      </Section>

      <footer className="py-10 text-center border-t border-gold/20">
        <p className="font-display text-gold tracking-widest text-lg mb-2">☀ Солнечная Чернильница</p>
        <p className="font-serif text-muted-foreground text-sm">Стихи и таро · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;