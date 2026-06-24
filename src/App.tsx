import { useState, useEffect } from 'react';
import { 
  Mail, 
  Phone, 
  Github, 
  MapPin, 
  X, 
  ExternalLink, 
  Award, 
  BookOpen, 
  Briefcase, 
  ChevronRight 
} from 'lucide-react';
import { cardsData, projectsData, experiencesData, educationData, certificationsData, skillsData } from './data';
import { SuitType } from './types';
import { playCardFlipSound } from './utils';

function Typewriter() {
  const roles = [
    'AI Developer', 
    'Automation Dev', 
    'AI Native Engineer', 
    'Vibe Coder',
    'Jack of All Trades'
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIndex];

    const handleType = () => {
      if (!isDeleting) {
        // Typing text
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setTypingSpeed(90);

        if (currentText === fullText) {
          // Pause when full word is typed
          setTypingSpeed(1800);
          setIsDeleting(true);
        }
      } else {
        // Erasing text
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setTypingSpeed(40);

        if (currentText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(400); // short pause before typing next word
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, typingSpeed]);

  return (
    <span className="inline-flex items-center min-h-[1.5rem] relative">
      <span className="text-[#d4af37] font-mono tracking-[4px] uppercase font-bold text-xs sm:text-sm">
        {currentText}
      </span>
      <span className="ml-1 inline-block w-[2px] h-[1em] bg-[#d4af37] animate-pulse"></span>
    </span>
  );
}

export default function App() {
  const [animatingSuit, setAnimatingSuit] = useState<SuitType | null>(null);
  const [activePanel, setActivePanel] = useState<SuitType | null>(null);

  // Handle ESC key to close any active modal panels
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActivePanel(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when panel is active
  useEffect(() => {
    if (activePanel) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePanel]);

  const handleCardClick = (suit: SuitType) => {
    // Play audio effect
    playCardFlipSound();
    
    // Show big flip animation overlay
    setAnimatingSuit(suit);
    
    // Transition to opening panel after animation finishes
    setTimeout(() => {
      setAnimatingSuit(null);
      setActivePanel(suit);
    }, 680);
  };

  return (
    <div className="min-height-screen felt-bg text-white font-sans selection:bg-red-600 selection:text-white pb-16">
      
      {/* ── HEADER ── */}
      <header className="relative pt-12 pb-4 px-4 text-center overflow-hidden">
        {/* Floating background suit symbols */}
        <div className="absolute inset-0 flex justify-around items-center pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <span className="text-9xl opacity-[0.025] animate-float-suit text-white">♠</span>
          <span className="text-9xl opacity-[0.02] animate-float-suit text-red-600 [animation-delay:-4s]">♥</span>
          <span className="text-9xl opacity-[0.025] animate-float-suit text-white [animation-delay:-8s]">♣</span>
          <span className="text-9xl opacity-[0.02] animate-float-suit text-red-600 [animation-delay:-12s]">♦</span>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex justify-between items-center px-4 sm:px-8">
          {/* Flanking Card Index Left */}
          <div className="hidden sm:flex flex-col items-center leading-none font-serif text-[#d4af37] opacity-60 pointer-events-none select-none text-2xl border border-[#d4af37]/20 p-2 rounded-lg bg-black/20" aria-hidden="true">
            <span className="font-bold">J</span>
            <span className="text-red-500">♥</span>
          </div>

          <div className="flex-1">
            {/* Title Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
              <span className="font-serif text-[10px] tracking-[4px] text-[#d4af37] uppercase">Curiosity & Code</span>
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
            </div>

            {/* Main Name Heading */}
            <h1 className="font-serif text-5xl sm:text-7xl font-black tracking-tight leading-none mb-4 select-none">
              <span className="block text-white">Ali Zain</span>
              <span className="block text-red-600 mt-1">Hemani</span>
            </h1>

            {/* Slogan & Tagline */}
            <div className="mt-4 max-w-md mx-auto">
              <div className="mb-3 h-8 flex justify-center items-center">
                <Typewriter />
              </div>
              <p className="font-serif text-lg sm:text-xl italic text-white/80 leading-relaxed px-4">
                "Every hand's a winning hand <br className="hidden sm:block"/>when you know how to play them all."
              </p>
            </div>

            {/* Suit divider and user prompt */}
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="flex gap-4 text-xl select-none" aria-hidden="true">
                <span className="text-white/20">♠</span>
                <span className="text-red-600/40">♥</span>
                <span className="text-white/20">♣</span>
                <span className="text-red-600/40">♦</span>
              </div>
              <p className="text-[9px] tracking-[6px] text-white/20 uppercase font-medium mt-1">Pick a card to explore</p>
            </div>
          </div>

          {/* Flanking Card Index Right */}
          <div className="hidden sm:flex flex-col items-center leading-none font-serif text-[#d4af37] opacity-60 pointer-events-none select-none text-2xl border border-[#d4af37]/20 p-2 rounded-lg bg-black/20" aria-hidden="true">
            <span className="font-bold">J</span>
            <span className="text-red-500">♥</span>
          </div>
        </div>
      </header>

      {/* ── 2X2 CARD TABLE ── */}
      <main className="w-full max-w-5xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-8 justify-center max-w-[340px] sm:max-w-xl mx-auto">
          {cardsData.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="w-[155px] h-[225px] sm:w-[240px] sm:h-[340px] perspective-1000 cursor-pointer group"
              style={{
                opacity: 0,
                animation: 'dealCard 0.6s cubic-bezier(.22,1,.36,1) forwards',
                animationDelay: `${1.3 + idx * 0.25}s`,
              }}
            >
              {/* Card Inner */}
              <div className="w-full h-full relative preserve-3d transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:[transform:rotateY(5deg)] shadow-xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.6)] rounded-2xl">
                
                {/* CARD BACK (shown by default) */}
                <div className="absolute inset-0 rounded-2xl bg-[#f5f0e8] border border-black/10 p-3 sm:p-4 shadow-lg flex flex-col justify-between backface-hidden">
                  
                  {/* Ornate Inner Border Frame */}
                  <div className={`absolute inset-2 rounded-lg pointer-events-none border ${card.isRed ? 'border-red-600/15' : 'border-black/10'}`}></div>

                  {/* Top-Left Corner Rank */}
                  <div className={`flex flex-col items-center leading-none select-none ${card.isRed ? 'text-red-600' : 'text-[#1a1a1a]'}`}>
                    <span className="font-serif text-lg sm:text-2xl font-bold">{card.backRank}</span>
                    <span className="text-xs sm:text-base leading-none">{card.symbol}</span>
                  </div>

                  {/* Back center graphic */}
                  <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 z-10">
                    <span className={`text-5xl sm:text-7xl select-none leading-none drop-shadow-sm ${card.isRed ? 'text-red-600' : 'text-[#1a1a1a]'}`}>
                      {card.symbol}
                    </span>
                    <span className={`font-serif text-[10px] sm:text-xs tracking-[1px] uppercase font-bold text-center ${card.isRed ? 'text-red-600/90' : 'text-black/80'}`}>
                      {card.title}
                    </span>
                  </div>

                  {/* Bottom-Right Corner Rank (Upside down) */}
                  <div className={`flex flex-col items-center leading-none select-none rotate-180 self-end ${card.isRed ? 'text-red-600' : 'text-[#1a1a1a]'}`}>
                    <span className="font-serif text-lg sm:text-2xl font-bold">{card.backRank}</span>
                    <span className="text-xs sm:text-base leading-none">{card.symbol}</span>
                  </div>
                </div>

                {/* CARD FACE (front) - Not displayed directly until flip trigger but kept styled inside 3D container */}
                <div className="absolute inset-0 rounded-2xl bg-[#f5f0e8] border border-black/10 p-3 sm:p-4 shadow-lg flex flex-col justify-between [transform:rotateY(180deg)] backface-hidden">
                  <div className={`absolute inset-2 rounded-lg pointer-events-none border ${card.isRed ? 'border-red-600/15' : 'border-black/10'}`}></div>
                  
                  <div className={`flex flex-col items-center leading-none select-none ${card.isRed ? 'text-red-600' : 'text-[#1a1a1a]'}`}>
                    <span className="font-serif text-lg sm:text-2xl font-bold">{card.rank}</span>
                    <span className="text-xs sm:text-base leading-none">{card.symbol}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 z-10 text-center">
                    <span className={`text-5xl sm:text-6xl select-none leading-none ${card.isRed ? 'text-red-600' : 'text-[#1a1a1a]'}`}>
                      {card.symbol}
                    </span>
                    <span className={`font-serif text-[10px] sm:text-xs tracking-[1px] uppercase font-bold ${card.isRed ? 'text-red-600' : 'text-[#1a1a1a]'}`}>
                      {card.title}
                    </span>
                    <span className="text-[7px] sm:text-[9px] tracking-[1px] uppercase text-black/40 mt-1">click to reveal</span>
                  </div>

                  <div className={`flex flex-col items-center leading-none select-none rotate-180 self-end ${card.isRed ? 'text-red-600' : 'text-[#1a1a1a]'}`}>
                    <span className="font-serif text-lg sm:text-2xl font-bold">{card.rank}</span>
                    <span className="text-xs sm:text-base leading-none">{card.symbol}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── CARD FLIP ANIMATION OVERLAY ── */}
      {animatingSuit && (
        <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-black/45 backdrop-blur-sm">
          <div className="w-[180px] h-[260px] sm:w-[220px] sm:h-[320px] [perspective:1000px]">
            <div 
              className="w-full h-full [transform-style:preserve-3d] rounded-2xl relative"
              style={{
                animation: 'bigFlip 0.72s cubic-bezier(0.4, 0, 0.2, 1) forwards'
              }}
            >
              {/* Back side of animating card (facing user at start) */}
              <div className="absolute inset-0 rounded-2xl [backface-visibility:hidden] bg-[#f5f0e8] border-2 border-black/10 flex flex-col items-center justify-center gap-3 shadow-2xl p-4">
                <span 
                  className="text-7xl sm:text-8xl select-none leading-none" 
                  style={{ color: cardsData.find(c => c.id === animatingSuit)?.color }}
                >
                  {cardsData.find(c => c.id === animatingSuit)?.symbol}
                </span>
                <span 
                  className="font-serif text-[8px] sm:text-[10px] uppercase tracking-[3px] select-none font-bold"
                  style={{ color: cardsData.find(c => c.id === animatingSuit)?.color }}
                >
                  Jack of All Trades
                </span>
              </div>
              
              {/* Front side of animating card (rotated 180deg) */}
              <div 
                className="absolute inset-0 rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#f5f0e8] border-2 border-black/10 flex flex-col p-4 justify-between"
                style={{ color: cardsData.find(c => c.id === animatingSuit)?.color }}
              >
                <div className="flex flex-col items-center leading-none">
                  <span className="font-serif text-xl font-bold">{cardsData.find(c => c.id === animatingSuit)?.rank}</span>
                  <span className="text-sm">{cardsData.find(c => c.id === animatingSuit)?.symbol}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1">
                  <span className="text-5xl sm:text-6xl select-none leading-none">{cardsData.find(c => c.id === animatingSuit)?.symbol}</span>
                  <span className="font-serif text-[10px] uppercase tracking-[2px] font-bold">
                    {cardsData.find(c => c.id === animatingSuit)?.title}
                  </span>
                </div>
                <div className="flex flex-col items-center leading-none rotate-180">
                  <span className="font-serif text-xl font-bold">{cardsData.find(c => c.id === animatingSuit)?.rank}</span>
                  <span className="text-sm">{cardsData.find(c => c.id === animatingSuit)?.symbol}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL PANEL OVERLAYS ── */}

      {/* 1. HEARTS - ABOUT ME PANEL */}
      <div 
        className={`fixed inset-0 bg-black/85 backdrop-blur-md z-40 flex items-center justify-center p-4 transition-opacity duration-300 ${
          activePanel === 'hearts' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setActivePanel(null)}
      >
        <div 
          className={`bg-[#f5f0e8] text-[#1a1a1a] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto transition-all duration-300 shadow-2xl border border-black/10 flex flex-col ${
            activePanel === 'hearts' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-black/10 flex items-center justify-between sticky top-0 bg-[#f5f0e8] z-10">
            <div className="flex items-center gap-4">
              <span className="text-4xl text-red-600 leading-none">♥</span>
              <div>
                <h2 className="font-serif text-2xl font-black tracking-tight">About Me</h2>
                <p className="text-[10px] tracking-[2px] uppercase text-red-600 font-bold">
                  {cardsData.find(c => c.id === 'hearts')?.subTitle}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActivePanel(null)}
              className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            <p className="text-base sm:text-lg leading-relaxed text-[#2a2a2a]">
              Hey — I'm <strong className="text-red-600 font-bold">Ali Zain Hemani</strong>, a Computer Science undergraduate based in <strong className="text-red-600 font-bold">Karachi, Pakistan</strong>. 
              I call myself the <strong className="text-red-600 font-bold">Jack of All Trades</strong> because I genuinely don't believe in boxing myself into one lane. 
              One day I'm building AI-powered chat platforms, the next I'm scraping the web for leads or training a vision model. 
              I thrive at the intersection of curiosity and code.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-[#2a2a2a]">
              My focus is on <strong className="text-red-600 font-bold">AI-driven development</strong> — building things that are actually useful, scalable, and a little bit clever. 
              Whether it's automation, computer vision, or full-stack AI integration, I pick up what I need and ship.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-[#1a1a1a] rounded-xl p-4 text-center border border-white/5 shadow-inner">
                <span className="block font-serif text-2xl sm:text-3xl font-black text-red-600">10+</span>
                <span className="block text-[8px] sm:text-[10px] tracking-[1.5px] uppercase text-white/50 mt-1">Projects Built</span>
              </div>
              <div className="bg-[#1a1a1a] rounded-xl p-4 text-center border border-white/5 shadow-inner">
                <span className="block font-serif text-2xl sm:text-3xl font-black text-red-600">1+</span>
                <span className="block text-[8px] sm:text-[10px] tracking-[1.5px] uppercase text-white/50 mt-1">Years Exp.</span>
              </div>
              <div className="bg-[#1a1a1a] rounded-xl p-4 text-center border border-white/5 shadow-inner">
                <span className="block font-serif text-2xl sm:text-3xl font-black text-red-600">6+</span>
                <span className="block text-[8px] sm:text-[10px] tracking-[1.5px] uppercase text-white/50 mt-1">Certifications</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-4 border-t border-black/5">
              <h4 className="font-serif text-xs tracking-[4px] uppercase text-black/30 font-bold mb-3">Get in Touch</h4>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="mailto:alizain.rizwan02@gmail.com" 
                  className="flex items-center gap-2 bg-[#1a1a1a] text-white/90 hover:bg-red-600 hover:text-white rounded-full px-4 py-2 text-xs font-medium transition-colors"
                >
                  <Mail size={13} />
                  alizain.rizwan02@gmail.com
                </a>
                <a 
                  href="tel:+923352367457" 
                  className="flex items-center gap-2 bg-[#1a1a1a] text-white/90 hover:bg-red-600 hover:text-white rounded-full px-4 py-2 text-xs font-medium transition-colors"
                >
                  <Phone size={13} />
                  +92 335 2367457
                </a>
                <a 
                  href="https://github.com/AliZain2002" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#1a1a1a] text-white/90 hover:bg-red-600 hover:text-white rounded-full px-4 py-2 text-xs font-medium transition-colors"
                >
                  <Github size={13} />
                  github.com/AliZain2002
                </a>
                <span className="flex items-center gap-2 bg-black/5 text-[#1a1a1a] rounded-full px-4 py-2 text-xs font-semibold">
                  <MapPin size={13} />
                  Karachi, Pakistan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CLUBS - PROJECTS PANEL */}
      <div 
        className={`fixed inset-0 bg-black/85 backdrop-blur-md z-40 flex items-center justify-center p-4 transition-opacity duration-300 ${
          activePanel === 'clubs' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setActivePanel(null)}
      >
        <div 
          className={`bg-[#f5f0e8] text-[#1a1a1a] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto transition-all duration-300 shadow-2xl border border-black/10 flex flex-col ${
            activePanel === 'clubs' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-black/10 flex items-center justify-between sticky top-0 bg-[#f5f0e8] z-10">
            <div className="flex items-center gap-4">
              <span className="text-4xl text-[#1a1a1a] leading-none">♣</span>
              <div>
                <h2 className="font-serif text-2xl font-black tracking-tight">Projects</h2>
                <p className="text-[10px] tracking-[2px] uppercase text-black/60 font-bold">
                  {cardsData.find(c => c.id === 'clubs')?.subTitle}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActivePanel(null)}
              className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            
            {/* Project Hero Banner */}
            <div className="flex items-center gap-5 bg-[#1a1a1a] text-white rounded-xl p-5 border-l-4 border-red-600">
              <div className="font-serif text-5xl font-black text-white leading-none">
                10<span className="text-red-600">+</span>
              </div>
              <div>
                <h3 className="font-serif text-xs font-bold uppercase tracking-[2px]">Projects Shipped</h3>
                <p className="text-[11px] text-white/50 leading-normal mt-1">
                  AI systems · automation tools · computer vision · desktop apps · web scrapers · and more
                </p>
              </div>
            </div>

            <h4 className="font-serif text-xs tracking-[4px] uppercase text-black/30 font-bold border-b border-black/5 pb-2">Featured Projects</h4>

            {/* Projects List */}
            <div className="space-y-4">
              {projectsData.map((project) => (
                <a 
                  key={project.num}
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-[#1a1a1a] text-white rounded-xl p-5 relative overflow-hidden group hover:translate-x-1 border-l-3 border-transparent hover:border-red-600 transition-all shadow"
                >
                  {/* Faded Large background number */}
                  <span className="absolute right-5 top-3 font-serif text-5xl font-black text-white/[0.03] select-none leading-none pointer-events-none">
                    {project.num}
                  </span>

                  <div className="flex items-start justify-between gap-4">
                    <h5 className="font-serif text-base font-bold flex items-center gap-2">
                      {project.name}
                      {project.badge && (
                        <span className="font-sans text-[8px] font-semibold tracking-wider uppercase bg-red-600/20 text-[#ff6b7a] border border-red-600/30 rounded-full px-2 py-0.5">
                          {project.badge}
                        </span>
                      )}
                    </h5>
                    <ExternalLink size={14} className="text-white/20 group-hover:text-red-600 transition-colors mt-1" />
                  </div>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed mt-2 mb-4">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((techItem) => (
                      <span 
                        key={techItem}
                        className="bg-red-600/10 text-[#ff6b7a] border border-red-600/25 rounded-full px-2.5 py-0.5 text-[9px] tracking-wide font-medium"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            {/* GitHub Callout row */}
            <div className="flex items-center gap-3 bg-black/5 border-1 border-dashed border-black/15 rounded-xl p-4 flex-wrap">
              <span className="text-red-600 text-lg">♣</span>
              <p className="text-xs text-black/50 flex-1 min-w-[180px]">
                +6 more projects across web scraping, ML experiments, CLI tools & automation scripts
              </p>
              <a 
                href="https://github.com/AliZain2002" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1 shrink-0"
              >
                View on GitHub <ChevronRight size={13} />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 3. DIAMONDS - EXPERIENCE PANEL */}
      <div 
        className={`fixed inset-0 bg-black/85 backdrop-blur-md z-40 flex items-center justify-center p-4 transition-opacity duration-300 ${
          activePanel === 'diamonds' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setActivePanel(null)}
      >
        <div 
          className={`bg-[#f5f0e8] text-[#1a1a1a] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto transition-all duration-300 shadow-2xl border border-black/10 flex flex-col ${
            activePanel === 'diamonds' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-black/10 flex items-center justify-between sticky top-0 bg-[#f5f0e8] z-10">
            <div className="flex items-center gap-4">
              <span className="text-4xl text-red-600 leading-none">♦</span>
              <div>
                <h2 className="font-serif text-2xl font-black tracking-tight">Experience</h2>
                <p className="text-[10px] tracking-[2px] uppercase text-red-600 font-bold">
                  {cardsData.find(c => c.id === 'diamonds')?.subTitle}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActivePanel(null)}
              className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            
            <h4 className="font-serif text-xs tracking-[4px] uppercase text-black/30 font-bold border-b border-black/5 pb-2">Work Experience</h4>
            
            {/* Work experience Blocks */}
            <div className="space-y-6">
              {experiencesData.map((exp, expIdx) => (
                <div key={expIdx} className="space-y-2">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <div>
                      <h5 className="font-serif text-lg font-bold text-black">{exp.role}</h5>
                      <p className="text-red-600 font-bold text-sm">{exp.company}</p>
                    </div>
                    <span className="text-[10px] tracking-widest uppercase font-bold text-black/40 mt-1">{exp.date}</span>
                  </div>
                  <ul className="space-y-2 pt-1">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="relative pl-5 text-sm text-[#2a2a2a] leading-relaxed">
                        <span className="absolute left-0 text-red-600 text-xs top-0.5">♦</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h4 className="font-serif text-xs tracking-[4px] uppercase text-black/30 font-bold border-b border-black/5 pt-2 pb-2">Education</h4>

            {/* Education boxes */}
            <div className="space-y-3">
              {educationData.map((edu, eduIdx) => (
                <div key={eduIdx} className="bg-[#1a1a1a] text-white rounded-xl p-4 flex justify-between items-start gap-4">
                  <div>
                    <h5 className="font-sans text-sm font-bold text-white leading-snug">{edu.degree}</h5>
                    <p className="text-xs text-white/50 mt-1">{edu.school}</p>
                  </div>
                  <span className="font-serif text-sm font-black text-red-600 shrink-0">{edu.year}</span>
                </div>
              ))}
            </div>

            <h4 className="font-serif text-xs tracking-[4px] uppercase text-black/30 font-bold border-b border-black/5 pt-2 pb-2">Certifications & Achievements</h4>
            
            {/* Certifications grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certificationsData.map((cert, cIdx) => (
                <div key={cIdx} className="bg-[#1a1a1a] text-white/80 rounded-lg p-3 text-xs leading-normal flex gap-2 items-start shadow-inner border border-white/5">
                  <span className="text-[#d4af37] font-semibold shrink-0">✦</span>
                  <span>{cert}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* 4. SPADES - SKILLS PANEL */}
      <div 
        className={`fixed inset-0 bg-black/85 backdrop-blur-md z-40 flex items-center justify-center p-4 transition-opacity duration-300 ${
          activePanel === 'spades' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setActivePanel(null)}
      >
        <div 
          className={`bg-[#f5f0e8] text-[#1a1a1a] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto transition-all duration-300 shadow-2xl border border-black/10 flex flex-col ${
            activePanel === 'spades' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-black/10 flex items-center justify-between sticky top-0 bg-[#f5f0e8] z-10">
            <div className="flex items-center gap-4">
              <span className="text-4xl text-[#1a1a1a] leading-none">♠</span>
              <div>
                <h2 className="font-serif text-2xl font-black tracking-tight">Skills</h2>
                <p className="text-[10px] tracking-[2px] uppercase text-black/60 font-bold">
                  {cardsData.find(c => c.id === 'spades')?.subTitle}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActivePanel(null)}
              className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
            {skillsData.map((group, gIdx) => (
              <div key={gIdx} className="space-y-3">
                <h4 className="font-serif text-xs tracking-[3px] uppercase text-black/40 font-bold border-b border-black/5 pb-2">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className="flex items-center gap-2 bg-[#1a1a1a] text-white/90 border border-white/5 shadow rounded-lg px-4 py-2 text-xs font-semibold hover:-translate-y-0.5 hover:border-red-600/30 transition-all"
                    >
                      <span>{skill.icon}</span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="text-center pt-16 px-4 text-xs tracking-widest text-white/20 uppercase font-medium">
        <p>Ali Zain Hemani &nbsp;<span className="text-red-600">♠ ♥ ♣ ♦</span>&nbsp; Karachi, Pakistan &nbsp;·&nbsp; 2026</p>
      </footer>
    </div>
  );
}
