import React, { useState, useEffect } from 'react';
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
  ChevronRight,
  Volume2,
  VolumeX
} from 'lucide-react';
import { cardsData, projectsData, experiencesData, educationData, certificationsData, skillsData } from './data';
import { SuitType } from './types';
import { playCardFlipSound, playCardsFallingSound, getMutedState, setMutedState, ensureAudioContext } from './utils';

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
      <span className="text-[#d4af37] font-mono tracking-[4px] uppercase font-bold text-xs sm:text-sm gold-glow">
        {currentText}
      </span>
      <span className="ml-1 inline-block w-[2px] h-[1em] bg-[#d4af37] animate-pulse shadow-[0_0_8px_#d4af37]"></span>
    </span>
  );
}

interface Suit3DModelProps {
  suit: SuitType;
  size?: number;
  className?: string;
}

function Suit3DModel({ suit, size = 100, className = '' }: Suit3DModelProps) {
  const mainGradId = `main-grad-${suit}`;
  const highlightGradId = `highlight-grad-${suit}`;

  switch (suit) {
    case 'hearts':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${className} transition-transform duration-300`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={mainGradId} x1="15%" y1="15%" x2="85%" y2="85%">
              <stop offset="0%" stopColor="#ffa292" />
              <stop offset="15%" stopColor="#ff4d32" />
              <stop offset="50%" stopColor="#d61a00" />
              <stop offset="85%" stopColor="#880000" />
              <stop offset="100%" stopColor="#420000" />
            </linearGradient>
            <linearGradient id={highlightGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
            </linearGradient>
          </defs>
          {/* Base Drop Shadow */}
          <ellipse cx="50" cy="95" rx="30" ry="5" fill="black" opacity="0.35" filter="blur(4px)" />
          
          {/* Main 3D Shape */}
          <path
            d="M 50,88 C 15,55 8,40 8,28 C 8,14 18,7 32,7 C 42,7 48,13 50,16 C 52,13 58,7 68,7 C 82,7 92,14 92,28 C 92,40 85,55 50,88 Z"
            fill={`url(#${mainGradId})`}
          />
          
          {/* Left Lobe Specular Highlight */}
          <ellipse
            cx="28"
            cy="23"
            rx="13"
            ry="6.5"
            transform="rotate(-35 28 23)"
            fill={`url(#${highlightGradId})`}
          />
          
          {/* Secondary Highlight */}
          <ellipse
            cx="63"
            cy="19"
            rx="6.5"
            ry="3.5"
            transform="rotate(-15 63 19)"
            fill="rgba(255, 255, 255, 0.45)"
          />
          
          {/* Bottom Rim Reflection */}
          <path
            d="M 55,80 C 75,64 85,48 85,34"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="blur(1px)"
          />
        </svg>
      );

    case 'diamonds':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${className} transition-transform duration-300`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={mainGradId} x1="15%" y1="15%" x2="85%" y2="85%">
              <stop offset="0%" stopColor="#ffbfa3" />
              <stop offset="25%" stopColor="#ff5a2b" />
              <stop offset="65%" stopColor="#d12503" />
              <stop offset="95%" stopColor="#770c00" />
              <stop offset="100%" stopColor="#3a0400" />
            </linearGradient>
            <linearGradient id={highlightGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
            </linearGradient>
          </defs>
          {/* Base Drop Shadow */}
          <ellipse cx="50" cy="95" rx="20" ry="4" fill="black" opacity="0.35" filter="blur(4px)" />
          
          {/* Main 3D Shape */}
          <path
            d="M 50,8 C 62,24 86,38 86,50 C 86,62 62,76 50,92 C 38,76 14,62 14,50 C 14,38 38,24 50,8 Z"
            fill={`url(#${mainGradId})`}
          />
          
          {/* Top-Left Long Specular Highlight */}
          <path
            d="M 45,18 C 30,30 22,42 22,50"
            fill="none"
            stroke={`url(#${highlightGradId})`}
            strokeWidth="6.5"
            strokeLinecap="round"
            opacity="0.85"
          />
          
          {/* Secondary Soft Highlight */}
          <path
            d="M 55,18 C 68,30 74,42 74,50"
            fill="none"
            stroke="rgba(255, 255, 255, 0.22)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          
          {/* Bottom-Right Rim Reflection */}
          <path
            d="M 72,58 C 66,70 56,80 52,84"
            fill="none"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'spades':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${className} transition-transform duration-300`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={mainGradId} x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#6ea0d4" />
              <stop offset="20%" stopColor="#2e4c73" />
              <stop offset="60%" stopColor="#121f31" />
              <stop offset="95%" stopColor="#050a11" />
              <stop offset="100%" stopColor="#010204" />
            </linearGradient>
            <linearGradient id={highlightGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
            </linearGradient>
          </defs>
          {/* Base Drop Shadow */}
          <ellipse cx="50" cy="96" rx="26" ry="4.5" fill="black" opacity="0.4" filter="blur(4px)" />
          
          {/* Main 3D Shape */}
          <path
            d="M 50,11 C 47,11 18,44 18,58 C 18,72 30,80 46,80 C 48,80 48,80 48,80 L 46,90 C 43,92 40,93 40,93 L 60,93 C 60,93 57,92 54,90 L 52,80 C 52,80 52,80 54,80 C 70,80 82,72 82,58 C 82,44 53,11 50,11 Z"
            fill={`url(#${mainGradId})`}
          />
          
          {/* Left Lobe Specular Highlight */}
          <ellipse
            cx="34"
            cy="42"
            rx="13.5"
            ry="6.5"
            transform="rotate(-40 34 42)"
            fill={`url(#${highlightGradId})`}
          />
          
          {/* Top Tip Subtler Glow */}
          <ellipse
            cx="50"
            cy="18"
            rx="4"
            ry="2"
            fill="rgba(255, 255, 255, 0.35)"
          />

          {/* Bottom-Right Soft Reflection */}
          <path
            d="M 58,74 C 72,70 76,60 74,52"
            fill="none"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="blur(1px)"
          />
          
          {/* Stem Highlight */}
          <path
            d="M 45,82 L 43,89"
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'clubs':
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 100 100"
          className={`${className} transition-transform duration-300`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id={mainGradId} x1="15%" y1="10%" x2="85%" y2="90%">
              <stop offset="0%" stopColor="#6ea0d4" />
              <stop offset="20%" stopColor="#2e4c73" />
              <stop offset="60%" stopColor="#121f31" />
              <stop offset="95%" stopColor="#050a11" />
              <stop offset="100%" stopColor="#010204" />
            </linearGradient>
            <linearGradient id={highlightGradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.0)" />
            </linearGradient>
          </defs>
          {/* Base Drop Shadow */}
          <ellipse cx="50" cy="94" rx="25" ry="4.5" fill="black" opacity="0.4" filter="blur(4px)" />
          
          {/* Main 3D Shape */}
          <path
            d="M 50,13 C 59.4,13 67,20.6 67,30 C 67,36 63.8,41.2 59,44.2 C 65.2,44.2 73,40.5 80,40.5 C 89.4,40.5 97,48.1 97,57.5 C 97,66.9 89.4,74.5 80,74.5 C 72.5,74.5 66.2,69.6 64.2,62.8 L 54.5,84 C 57,86 59.5,87 59.5,87 L 40.5,87 C 40.5,87 43,86 45.5,84 L 35.8,62.8 C 33.8,69.6 27.5,74.5 20,74.5 C 10.6,74.5 3,66.9 3,57.5 C 3,48.1 10.6,40.5 20,40.5 C 27,40.5 34.8,44.2 41,44.2 C 36.2,41.2 33,36 33,30 C 33,20.6 40.6,13 50,13 Z"
            fill={`url(#${mainGradId})`}
          />
          
          {/* Top Bulb Specular Highlight */}
          <ellipse
            cx="44"
            cy="22"
            rx="9"
            ry="4.5"
            transform="rotate(-30 44 22)"
            fill={`url(#${highlightGradId})`}
          />
          
          {/* Left Bulb Specular Highlight */}
          <ellipse
            cx="14"
            cy="51"
            rx="9"
            ry="4.5"
            transform="rotate(-40 14 51)"
            fill={`url(#${highlightGradId})`}
          />
          
          {/* Right Bulb Specular Highlight */}
          <ellipse
            cx="75"
            cy="51"
            rx="7"
            ry="3.5"
            transform="rotate(-20 75 51)"
            fill="rgba(255, 255, 255, 0.42)"
          />
          
          {/* Stem Highlight */}
          <path
            d="M 45,80 L 43,85"
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    default:
      return null;
  }
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoveredSuit, setHoveredSuit] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      
      const cardEl = target.closest('[data-suit]');
      if (cardEl) {
        const suit = cardEl.getAttribute('data-suit');
        setHoveredSuit(suit);
      } else {
        setHoveredSuit(null);
      }

      const isClickable = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('.cursor-pointer') ||
        target.closest('[role="button"]') ||
        cardEl;
      setHovered(!!isClickable);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  if (!visible) return null;

  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'spades': return '♠';
      case 'hearts': return '♥';
      case 'clubs': return '♣';
      case 'diamonds': return '♦';
      default: return null;
    }
  };

  const isRedSuit = hoveredSuit === 'hearts' || hoveredSuit === 'diamonds';

  return (
    <>
      {/* Outer fluid trailing circle */}
      <div 
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-serif text-lg leading-none"
        style={{
          width: hoveredSuit ? '48px' : '36px',
          height: hoveredSuit ? '48px' : '36px',
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${hovered ? 1.2 : 1})`,
          backgroundColor: hoveredSuit 
            ? (isRedSuit ? 'rgba(239, 68, 68, 0.08)' : 'rgba(212, 175, 55, 0.08)')
            : (hovered ? 'rgba(212, 175, 55, 0.05)' : 'transparent'),
          borderColor: hoveredSuit 
            ? (isRedSuit ? 'rgba(239, 68, 68, 0.6)' : 'rgba(212, 175, 55, 0.6)')
            : (hovered ? '#d4af37' : 'rgba(255, 255, 255, 0.2)'),
          borderWidth: '1.5px',
          borderStyle: 'solid',
          boxShadow: hoveredSuit
            ? (isRedSuit ? '0 0 15px rgba(239, 68, 68, 0.35)' : '0 0 15px rgba(212, 175, 55, 0.35)')
            : (hovered ? '0 0 10px rgba(212, 175, 55, 0.25)' : 'none'),
        }}
      >
        {hoveredSuit && (
          <span className={`select-none transition-all duration-300 transform scale-110 font-bold ${isRedSuit ? 'text-red-500' : 'text-[#d4af37]'}`}>
            {getSuitSymbol(hoveredSuit)}
          </span>
        )}
      </div>
      
      {/* Inner solid dot (hides when hovering card suit to not block the symbol) */}
      {!hoveredSuit && (
        <div 
          className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${clicked ? 0.7 : 1})`,
            backgroundColor: hovered ? '#d4af37' : '#ffffff',
            boxShadow: hovered ? '0 0 8px #d4af37' : '0 0 4px rgba(255, 255, 255, 0.5)',
          }}
        />
      )}
    </>
  );
}

interface IntroScreenProps {
  onComplete: () => void;
}

function IntroScreen({ onComplete }: IntroScreenProps) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    let hasPlayed = false;

    const playSound = () => {
      if (hasPlayed) return;
      const ctx = ensureAudioContext();
      if (ctx) {
        if (ctx.state === 'running') {
          hasPlayed = true;
          playCardsFallingSound();
        } else {
          // Attempt to play (might be muted/silent due to autoplay), but don't mark as played yet
          playCardsFallingSound();
        }
      }
    };

    // Attempt to play immediately on mount
    playSound();

    // To robustly handle browser autoplay restrictions, trigger the falling sound on first click or touch
    const handleFirstInteraction = () => {
      const ctx = ensureAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().then(() => {
          playSound();
        });
      } else {
        playSound();
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    // Cinematic auto-finish after 4.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 4500);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [onComplete]);

  // Carefully curated array of playing cards with custom 3D rotations, sizes, and delays 
  // to replicate the exact vertical falling cascading layout from your poster.
  const fallingCards = [
    { symbol: '♠', rank: 'A', isRed: false, left: 8, delay: 0, duration: 4.5, scale: 1.15, rotateStart: -25, rotateX: 360, rotateY: 180, rotateZ: 45, isFront: true },
    { symbol: '♥', rank: '10', isRed: true, left: 24, delay: 0.4, duration: 3.8, scale: 0.95, rotateStart: 15, rotateX: -360, rotateY: 360, rotateZ: -30, isFront: true },
    { symbol: '♣', rank: 'J', isRed: false, left: 42, delay: 0.1, duration: 4.8, scale: 0.85, rotateStart: -10, rotateX: 180, rotateY: -180, rotateZ: 90, isFront: false },
    { symbol: '♦', rank: 'K', isRed: true, left: 60, delay: 0.7, duration: 4.0, scale: 1.05, rotateStart: 35, rotateX: 270, rotateY: 90, rotateZ: -60, isFront: true },
    { symbol: '♠', rank: 'Q', isRed: false, left: 78, delay: 0.3, duration: 5.2, scale: 0.9, rotateStart: -45, rotateX: -180, rotateY: 180, rotateZ: 120, isFront: false },
    
    { symbol: '♥', rank: 'A', isRed: true, left: 15, delay: 1.1, duration: 3.6, scale: 1.1, rotateStart: 20, rotateX: 360, rotateY: 360, rotateZ: 40, isFront: true },
    { symbol: '♣', rank: 'A', isRed: false, left: 30, delay: 1.5, duration: 4.3, scale: 0.8, rotateStart: -30, rotateX: -270, rotateY: 180, rotateZ: -45, isFront: true },
    { symbol: '♦', rank: '2', isRed: true, left: 48, delay: 0.9, duration: 5.0, scale: 0.75, rotateStart: 10, rotateX: 180, rotateY: -360, rotateZ: 80, isFront: false },
    { symbol: '♠', rank: '10', isRed: false, left: 66, delay: 1.8, duration: 4.1, scale: 1.0, rotateStart: -15, rotateX: 360, rotateY: 90, rotateZ: -30, isFront: true },
    { symbol: '♥', rank: 'Q', isRed: true, left: 84, delay: 1.3, duration: 4.6, scale: 0.95, rotateStart: 30, rotateX: -180, rotateY: 180, rotateZ: 60, isFront: true },
    
    { symbol: '♣', rank: 'K', isRed: false, left: 5, delay: 2.1, duration: 4.2, scale: 1.05, rotateStart: -25, rotateX: 360, rotateY: 360, rotateZ: 45, isFront: true },
    { symbol: '♦', rank: 'J', isRed: true, left: 21, delay: 2.4, duration: 4.4, scale: 0.9, rotateStart: 15, rotateX: 180, rotateY: 270, rotateZ: -40, isFront: true },
    { symbol: '♠', rank: '9', isRed: false, left: 37, delay: 2.0, duration: 3.7, scale: 1.0, rotateStart: -40, rotateX: -360, rotateY: 180, rotateZ: 30, isFront: false },
    { symbol: '♥', rank: '2', isRed: true, left: 54, delay: 2.7, duration: 4.9, scale: 0.8, rotateStart: -10, rotateX: 270, rotateY: -180, rotateZ: 75, isFront: true },
    { symbol: '♣', rank: 'Q', isRed: false, left: 72, delay: 2.5, duration: 4.2, scale: 0.85, rotateStart: 25, rotateX: 180, rotateY: 180, rotateZ: -50, isFront: false },
    { symbol: '♦', rank: 'A', isRed: true, left: 90, delay: 2.2, duration: 3.9, scale: 1.12, rotateStart: -20, rotateX: 360, rotateY: 360, rotateZ: 25, isFront: true },

    { symbol: '♠', rank: 'J', isRed: false, left: 12, delay: 0.2, duration: 4.1, scale: 1.0, rotateStart: -12, rotateX: 240, rotateY: 180, rotateZ: 60, isFront: true },
    { symbol: '♣', rank: 'Joker', isRed: true, left: 50, delay: 0.6, duration: 4.5, scale: 1.15, rotateStart: 45, rotateX: 360, rotateY: 360, rotateZ: -45, isFront: true }
  ];

  return (
    <div className={`fixed inset-0 z-[100] bg-[#09090b] flex flex-col justify-between items-center transition-all duration-700 ease-out pointer-events-auto select-none ${
      isFading ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
    }`}>
      
      {/* 3D falling cards container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 [perspective:1200px] [transform-style:preserve-3d]">
        {/* Soft atmospheric radial dark shadow overlay mirroring the poster */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 z-10 pointer-events-none"></div>
        
        {fallingCards.map((card, idx) => (
          <div
            key={idx}
            className="absolute animate-fall-tumble"
            style={{
              left: `${card.left}%`,
              animationDelay: `${card.delay}s`,
              transform: `scale(${card.scale})`,
              '--fall-duration': `${card.duration}s`,
              '--rotate-start': `${card.rotateStart}deg`,
              '--rotate-x': `${card.rotateX}deg`,
              '--rotate-y': `${card.rotateY}deg`,
              '--rotate-z': `${card.rotateZ}deg`,
              top: '-180px',
            } as React.CSSProperties}
          >
            {/* White-faced and black-backed luxury physical playing cards */}
            <div className={`w-[75px] h-[110px] sm:w-[100px] sm:h-[145px] rounded-xl shadow-[0_12px_30px_rgba(0,0,0,0.85)] flex flex-col justify-between p-2 sm:p-3 transition-all border ${
              card.isFront
                ? 'bg-neutral-100 border-zinc-200 text-zinc-950'
                : 'bg-neutral-900 border-zinc-800 text-red-600/40'
            }`}>
              {card.isFront ? (
                <>
                  <div className="flex flex-col leading-none items-start select-none">
                    <span className="font-serif text-xs sm:text-sm font-black leading-none">{card.rank}</span>
                    <span className={`text-[10px] sm:text-xs leading-none mt-0.5 ${card.isRed ? 'text-red-600 font-bold' : 'text-zinc-950 font-bold'}`}>{card.symbol}</span>
                  </div>
                  <div className="text-center text-3xl sm:text-4xl self-center leading-none select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
                    <span className={card.isRed ? 'text-red-600' : 'text-zinc-950'}>{card.symbol}</span>
                  </div>
                  <div className="flex flex-col leading-none items-start rotate-180 self-end select-none">
                    <span className="font-serif text-xs sm:text-sm font-black leading-none">{card.rank}</span>
                    <span className={`text-[10px] sm:text-xs leading-none mt-0.5 ${card.isRed ? 'text-red-600 font-bold' : 'text-zinc-950 font-bold'}`}>{card.symbol}</span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-1.5 border border-red-600/10 rounded-lg flex flex-col justify-between items-center p-1 bg-neutral-950">
                  <span className="text-[9px] text-red-600/30">♥</span>
                  <div className="w-8 h-8 rounded-full border border-red-600/10 flex items-center justify-center">
                    <span className="text-red-600 text-xs font-serif opacity-40">J</span>
                  </div>
                  <span className="text-[9px] text-red-600/30">♥</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Cinematic intro message in the center */}
      <div className="relative z-20 flex flex-col items-center justify-center flex-1 text-center px-4 max-w-lg">
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mb-7"></div>
        
        <p className="font-serif text-[10px] sm:text-xs tracking-[8px] text-[#d4af37] uppercase font-bold mb-4 opacity-80 gold-glow">
          Shuffling the Deck
        </p>

        <h2 className="font-cinzel text-3xl sm:text-5xl font-black tracking-[4px] text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 mb-3 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] select-none">
          Ali Zain Hemani
        </h2>
        
        <p className="font-serif text-sm sm:text-base italic text-zinc-400 opacity-85 leading-relaxed">
          "Every hand's a winning hand<br/>when you know how to play them all."
        </p>
        
        {/* Spinner */}
        <div className="mt-9 flex gap-2 items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>

      {/* Skip Button at bottom */}
      <div className="relative z-20 pb-16">
        <button
          onClick={() => setIsFading(true)}
          className="px-8 py-3 border border-zinc-800 hover:border-[#d4af37]/60 hover:text-white bg-black/50 text-zinc-400 text-[10px] font-bold uppercase tracking-[4px] rounded-full transition-all duration-300 backdrop-blur-md cursor-pointer hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] active:scale-95"
        >
          Skip Intro
        </button>
      </div>

    </div>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [animatingSuit, setAnimatingSuit] = useState<SuitType | null>(null);
  const [activePanel, setActivePanel] = useState<SuitType | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [isMuted, setIsMuted] = useState(getMutedState());

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

  // Lock body scroll when panel or intro is active
  useEffect(() => {
    if (activePanel || showIntro) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activePanel, showIntro]);

  const handleCardClick = (suit: SuitType) => {
    // Capture scroll position immediately before animating
    setScrollTop(window.scrollY);
    
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

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    setMutedState(nextMuted);
    
    // Warm up and resume context immediately when unmuting
    if (!nextMuted) {
      const ctx = ensureAudioContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(console.warn);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardId: SuitType) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const px = (x / rect.width) - 0.5;
    const py = (y / rect.height) - 0.5;
    
    // Tilt rotation: up to 25 degrees
    card.style.setProperty('--tilt-x', `${-py * 25}deg`);
    card.style.setProperty('--tilt-y', `${px * 25}deg`);
    
    // Glare position
    card.style.setProperty('--glare-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--glare-y', `${(y / rect.height) * 100}%`);
    card.style.setProperty('--glare-opacity', '0.45');
    
    // Z translate to lift the card
    card.style.setProperty('--card-translate-z', '35px');
    
    // Dynamic Shadow attributes
    card.style.setProperty('--shadow-intensity', '0.85');
    card.style.setProperty('--shadow-offset-y', `${18 + py * 15}px`);
    card.style.setProperty('--shadow-blur', '45px');
    
    // Soft suit colored backlight glow
    const glowColor = cardId === 'hearts' || cardId === 'diamonds' 
      ? 'rgba(239, 68, 68, 0.35)' 
      : 'rgba(212, 175, 55, 0.35)';
    card.style.setProperty('--suit-glow-color', glowColor);
    card.style.setProperty('--suit-glow-size', '35px');
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
    card.style.setProperty('--glare-opacity', '0');
    card.style.setProperty('--card-translate-z', '0px');
    card.style.setProperty('--shadow-intensity', '0.65');
    card.style.setProperty('--shadow-offset-y', '15px');
    card.style.setProperty('--shadow-blur', '35px');
    card.style.setProperty('--suit-glow-size', '0px');
  };

  return (
    <div className="relative min-h-screen felt-bg text-white font-sans selection:bg-red-600 selection:text-white pb-16 overflow-x-hidden">
      
      {/* ── AUDIO CONTROL BUTTON (MUTE/UNMUTE) ── */}
      <button
        onClick={toggleMute}
        className={`fixed top-4 right-4 sm:top-5 sm:right-5 z-[110] p-2 rounded-full border transition-all duration-300 backdrop-blur-md cursor-pointer active:scale-95 ${
          isMuted 
            ? 'border-red-500/20 hover:border-red-500/50 bg-neutral-950/80 text-red-500 hover:shadow-[0_0_12px_rgba(239,68,68,0.25)]' 
            : 'border-[#d4af37]/20 hover:border-[#d4af37]/50 bg-neutral-950/80 text-[#d4af37] hover:shadow-[0_0_12px_rgba(212,175,55,0.25)]'
        }`}
        title={isMuted ? "Unmute Audio" : "Mute Audio"}
      >
        {isMuted ? (
          <VolumeX className="w-4 h-4 text-red-500 filter drop-shadow-[0_0_3px_rgba(239,68,68,0.4)]" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#d4af37] filter drop-shadow-[0_0_3px_rgba(212,175,55,0.4)]" />
        )}
      </button>

      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}

      <div className={`transition-all duration-1000 ease-out ${
        showIntro ? 'opacity-0 scale-98 blur-sm pointer-events-none' : 'opacity-100 scale-100 blur-0 pointer-events-auto'
      }`}>
        {/* ── PREMIUM AMBIENT BACKGROUND GLOWS & FLOATING SUITS ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Deep luxurious atmospheric ambient glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-red-600/10 blur-[130px] rounded-full animate-pulse-ambient"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-[#d4af37]/8 blur-[130px] rounded-full animate-pulse-ambient [animation-delay:-5s]"></div>
        <div className="absolute top-[35%] left-[30%] w-[35vw] h-[35vw] max-w-[400px] max-h-[400px] bg-violet-600/5 blur-[160px] rounded-full animate-pulse-ambient [animation-delay:-3s]"></div>
        
        {/* Subtle felt weaving texture overlay */}
        <div className="absolute inset-0 felt-pattern opacity-20"></div>

        {/* Cinematic watermark in background behind cards */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0 opacity-[0.035] leading-none" aria-hidden="true">
          <div className="font-cinzel text-[6rem] sm:text-[11rem] font-black tracking-[8px] text-white">ALI ZAIN</div>
          <div className="font-cinzel text-[6rem] sm:text-[11rem] font-black tracking-[12px] text-red-500 mt-[-20px] sm:mt-[-45px]">PORTFOLIO.</div>
        </div>

        {/* Floating background suit symbols */}
        <div className="absolute inset-0 flex justify-around items-center select-none pointer-events-none">
          <span className="text-[14rem] sm:text-[18rem] opacity-[0.02] animate-float-suit text-white absolute top-[10%] left-[5%]">♠</span>
          <span className="text-[12rem] sm:text-[16rem] opacity-[0.015] animate-float-suit text-red-600 absolute top-[48%] right-[5%] [animation-delay:-4s]">♥</span>
          <span className="text-[13rem] sm:text-[17rem] opacity-[0.02] animate-float-suit-slow text-white absolute bottom-[10%] left-[8%] [animation-delay:-8s]">♣</span>
          <span className="text-[11rem] sm:text-[14rem] opacity-[0.012] animate-float-suit-slow text-red-600 absolute top-[25%] right-[22%] [animation-delay:-12s]">♦</span>
        </div>

        {/* Slow rising ambient starlight dust */}
        <div className="absolute top-[20%] left-[25%] w-1 h-1 bg-white/40 rounded-full animate-float-particle"></div>
        <div className="absolute top-[48%] left-[78%] w-1.5 h-1.5 bg-red-500/30 rounded-full animate-float-particle [animation-delay:-2s]"></div>
        <div className="absolute bottom-[35%] left-[42%] w-1 h-1 bg-yellow-500/40 rounded-full animate-float-particle [animation-delay:-4s]"></div>
        <div className="absolute top-[72%] left-[12%] w-1.5 h-1.5 bg-white/20 rounded-full animate-float-particle [animation-delay:-6s]"></div>
      </div>

      {/* ── PREMIUM TECHNICAL MARGIN DECALS (As shown on poster) ── */}
      <div className="fixed inset-0 pointer-events-none z-20 select-none hidden lg:block font-mono text-[9px] tracking-[2px] text-white/30 uppercase leading-relaxed p-8" aria-hidden="true">
        {/* Top-Left Decal */}
        <div className="absolute top-8 left-8 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-bold text-white/60">DECK: INITIALIZED</span>
          </div>
          <div>CLASS: NATIVE AI</div>
          <div>ORIGIN: LATENT SPACE</div>
        </div>

        {/* Top-Right Decal */}
        <div className="absolute top-8 right-8 flex flex-col gap-0.5 text-right">
          <div>CLASSIFICATION: OMEGA</div>
          <div>REGISTRATION: UNCA-892</div>
          <div className="text-red-500 font-bold">⚡ STATUS: HIGH STAKES</div>
        </div>

        {/* Bottom-Left Decal */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-1 max-w-xs">
          <div className="font-bold text-white/50">DRAW INSTRUCTIONS</div>
          <div className="text-[8px] leading-normal text-white/20">
            SELECT A CARD FROM THE DECK BELOW TO REVEAL PORTFOLIO DATA. INTERFACE UTILIZES GLASSMORPHIC NEURAL RENDERING.
          </div>
        </div>

        {/* Bottom-Right Decal */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-0.5 text-right">
          <div>DIMENSIONS: 2835X1920</div>
          <div>RESOLUTION: 300 PPI</div>
          <div>© 2026 OMEGA DECK</div>
        </div>
      </div>
      
      {/* ── HEADER ── */}
      <header className="relative z-10 pt-16 pb-6 px-4 text-center overflow-hidden">
        <div className="relative max-w-4xl mx-auto flex justify-between items-center px-4 sm:px-8">
          {/* Flanking Card Index Left */}
          <div className="hidden sm:flex flex-col items-center leading-none font-serif text-[#d4af37] opacity-40 pointer-events-none select-none text-2xl border border-[#d4af37]/20 p-2.5 rounded-xl bg-black/40 backdrop-blur-md shadow-lg" aria-hidden="true">
            <span className="font-bold">J</span>
            <span className="text-red-500">♥</span>
          </div>

          <div className="flex-1">
            {/* Title Eyebrow */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]/40"></div>
              <span className="font-serif text-[10px] sm:text-[11px] tracking-[5px] text-[#d4af37] uppercase font-bold leading-none">Curiosity & Code</span>
              <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]/40"></div>
            </div>

            {/* Main Name Heading */}
            <h1 className="font-cinzel text-5xl sm:text-7xl font-bold tracking-[4px] leading-tight mb-5 select-none text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-400 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]">
              <span className="block text-white">Ali Zain</span>
              <span className="block text-red-600 tracking-[6px] mt-1 text-shadow">Hemani</span>
            </h1>

            {/* Slogan & Tagline */}
            <div className="mt-4 max-w-md mx-auto">
              <div className="mb-3 h-8 flex justify-center items-center">
                <Typewriter />
              </div>
              <p className="font-serif text-lg sm:text-xl italic text-white/80 leading-relaxed px-4 text-shadow-sm">
                "Every hand's a winning hand <br className="hidden sm:block"/>when you know how to play them all."
              </p>
            </div>

            {/* Suit divider and user prompt */}
            <div className="mt-8 flex flex-col items-center gap-2">
              <div className="flex gap-4 text-xl select-none" aria-hidden="true">
                <span className="text-white/20 hover:text-[#d4af37] transition-colors duration-300">♠</span>
                <span className="text-red-600/30 hover:text-red-500 transition-colors duration-300">♥</span>
                <span className="text-white/20 hover:text-[#d4af37] transition-colors duration-300">♣</span>
                <span className="text-red-600/30 hover:text-red-500 transition-colors duration-300">♦</span>
              </div>
              <p className="text-[9px] tracking-[6px] text-white/35 uppercase font-semibold mt-1">Pick a card to explore</p>
            </div>
          </div>

          {/* Flanking Card Index Right */}
          <div className="hidden sm:flex flex-col items-center leading-none font-serif text-[#d4af37] opacity-40 pointer-events-none select-none text-2xl border border-[#d4af37]/20 p-2.5 rounded-xl bg-black/40 backdrop-blur-md shadow-lg" aria-hidden="true">
            <span className="font-bold">J</span>
            <span className="text-red-500">♥</span>
          </div>
        </div>
      </header>

      {/* ── 2X2 CARD TABLE WITH 3D GLASSMORPHIC CARDS ── */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-4 sm:gap-10 justify-center max-w-[340px] sm:max-w-2xl mx-auto">
          {cardsData.map((card, idx) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              onMouseMove={(e) => handleMouseMove(e, card.id)}
              onMouseLeave={handleMouseLeave}
              data-suit={card.id}
              className="w-[155px] h-[225px] sm:w-[250px] sm:h-[350px] perspective-1000 cursor-pointer group select-none"
              style={!showIntro ? {
                opacity: 0,
                animation: 'dealCard 0.75s cubic-bezier(.16,1,.3,1) forwards',
                animationDelay: `${0.2 + idx * 0.15}s`,
              } : { opacity: 0 }}
            >
              {/* Card Inner with gorgeous 3D dynamic rotations & reflections on hover */}
              <div className="w-full h-full relative card-3d-model rounded-2xl [transform-style:preserve-3d]">
                
                {/* CARD BACK (shown on table by default, crafted with luxury glassmorphic physical feel) */}
                <div className={`absolute inset-0 rounded-2xl backdrop-blur-md p-3 sm:p-5 flex flex-col justify-between backface-hidden transition-all duration-300 border [transform-style:preserve-3d] ${
                  card.isRed 
                    ? 'bg-neutral-950/75 card-3d-bevel-red text-red-500' 
                    : 'bg-neutral-950/70 card-3d-bevel-gold text-[#d4af37]'
                }`}>
                  
                  {/* Glare/Highlight varnish Overlay for back */}
                  <div 
                    className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-opacity duration-300 mix-blend-overlay opacity-[var(--glare-opacity,0)]"
                    style={{
                      background: 'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 65%)'
                    }}
                  />

                  {/* Ornate Inner Border Frame */}
                  <div className={`absolute inset-2 sm:inset-3 rounded-xl pointer-events-none border ${card.isRed ? 'border-red-500/10' : 'border-[#d4af37]/10'} [transform:translateZ(10px)]`}></div>
                  
                  {/* Left edge vertical text */}
                  <div className="absolute left-1.5 bottom-12 origin-bottom-left -rotate-90 text-[7px] sm:text-[8px] tracking-[2px] font-mono uppercase text-white/25 whitespace-nowrap leading-none select-none pointer-events-none [transform:translateZ(15px)]">
                    {card.id === 'hearts' ? 'ELEMENT // ABOUT ME' : `AN ENTERTAINMENT ELEMENT // ${card.title}`}
                  </div>
                  
                  {/* Right edge vertical text */}
                  <div className="absolute right-1.5 top-12 origin-top-right rotate-90 text-[7px] sm:text-[8px] tracking-[2px] font-mono uppercase text-white/25 whitespace-nowrap leading-none select-none pointer-events-none [transform:translateZ(15px)]">
                    {card.isRed ? '// DECK // INITIALIZED' : '// 2026 // NATIVE'}
                  </div>

                  {/* Elegant Horizontal Triple Dots Menu */}
                  <div className="absolute top-4 right-4 flex gap-0.5 select-none opacity-40 sm:top-5 sm:right-5 [transform:translateZ(20px)]">
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                  </div>

                  {/* Top-Left Corner Rank */}
                  <div className={`flex flex-col items-center leading-none select-none ${card.isRed ? 'text-red-500' : 'text-[#d4af37]'} [transform:translateZ(20px)]`}>
                    <span className="font-serif text-lg sm:text-2xl font-black">{card.backRank}</span>
                    <span className="text-xs sm:text-base leading-none mt-0.5">{card.symbol}</span>
                  </div>

                  {/* Back center graphic */}
                  <div className="flex flex-col items-center justify-center gap-1 sm:gap-3 z-10 [transform:translateZ(45px)] filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.65)]">
                    <div className="select-none transition-transform duration-300 group-hover:scale-110">
                      <Suit3DModel suit={card.id} size={70} className="sm:w-[100px] sm:h-[100px]" />
                    </div>
                    <span className={`font-cinzel text-[10px] sm:text-xs tracking-[2px] uppercase font-bold text-center leading-none mt-1.5 ${
                      card.isRed ? 'text-red-400' : 'text-[#f5d061]'
                    }`}>
                      {card.title}
                    </span>
                  </div>

                  {/* Bottom-Right Corner Rank (Upside down) */}
                  <div className={`flex flex-col items-center leading-none select-none rotate-180 self-end ${card.isRed ? 'text-red-500' : 'text-[#d4af37]'} [transform:translateZ(20px)]`}>
                    <span className="font-serif text-lg sm:text-2xl font-black">{card.backRank}</span>
                    <span className="text-xs sm:text-base leading-none mt-0.5">{card.symbol}</span>
                  </div>
                </div>

                {/* CARD FACE (rotated front) */}
                <div className={`absolute inset-0 rounded-2xl backdrop-blur-md p-3 sm:p-5 [transform:rotateY(180deg)] backface-hidden border [transform-style:preserve-3d] ${
                  card.isRed 
                    ? 'bg-neutral-950/85 card-3d-bevel-red text-red-500' 
                    : 'bg-neutral-950/85 card-3d-bevel-gold text-[#d4af37]'
                }`}>
                  
                  {/* Glare/Highlight varnish Overlay for face */}
                  <div 
                    className="absolute inset-0 rounded-2xl pointer-events-none z-30 transition-opacity duration-300 mix-blend-overlay opacity-[var(--glare-opacity,0)]"
                    style={{
                      background: 'radial-gradient(circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 65%)'
                    }}
                  />

                  <div className={`absolute inset-2 sm:inset-3 rounded-xl pointer-events-none border ${card.isRed ? 'border-red-500/10' : 'border-[#d4af37]/10'} [transform:translateZ(10px)]`}></div>
                  
                  <div className="flex flex-col items-center leading-none select-none [transform:translateZ(20px)]">
                    <span className="font-serif text-lg sm:text-2xl font-black">{card.rank}</span>
                    <span className="text-xs sm:text-base leading-none mt-0.5">{card.symbol}</span>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-1 sm:gap-3 z-10 text-center [transform:translateZ(45px)] filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.65)]">
                    <div className="select-none transition-transform duration-300 group-hover:scale-110">
                      <Suit3DModel suit={card.id} size={60} className="sm:w-[85px] sm:h-[85px]" />
                    </div>
                    <span className="font-cinzel text-[10px] sm:text-xs tracking-[2px] uppercase font-bold leading-none mt-1.5">
                      {card.title}
                    </span>
                    <span className="text-[7.5px] sm:text-[9.5px] tracking-[2px] uppercase opacity-40 mt-1.5">click to reveal</span>
                  </div>

                  <div className="flex flex-col items-center leading-none select-none rotate-180 self-end [transform:translateZ(20px)]">
                    <span className="font-serif text-lg sm:text-2xl font-black">{card.rank}</span>
                    <span className="text-xs sm:text-base leading-none mt-0.5">{card.symbol}</span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 text-center pt-16 px-4 text-xs tracking-widest text-white/30 uppercase font-semibold">
        <p>Ali Zain Hemani &nbsp;<span className="text-red-500">♠ ♥ ♣ ♦</span>&nbsp; Karachi, Pakistan &nbsp;·&nbsp; 2026</p>
      </footer>

      </div>

      {/* ── CARD FLIP ANIMATION OVERLAY ── */}
      {animatingSuit && (
        <div 
          className="absolute inset-x-0 h-screen z-50 pointer-events-none flex items-center justify-center bg-black/60 backdrop-blur-sm"
          style={{ top: `${scrollTop}px` }}
        >
          <div className="w-[180px] h-[260px] sm:w-[220px] sm:h-[320px] [perspective:1000px]">
            <div 
              className="w-full h-full [transform-style:preserve-3d] rounded-2xl relative"
              style={{
                animation: 'bigFlip 0.72s cubic-bezier(0.4, 0, 0.2, 1) forwards'
              }}
            >
              {/* Back side of animating card (facing user at start) */}
              <div className={`absolute inset-0 rounded-2xl [backface-visibility:hidden] backdrop-blur-md flex flex-col items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-4 border ${
                cardsData.find(c => c.id === animatingSuit)?.isRed 
                  ? 'bg-neutral-950/80 border-red-500/40 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.3)]' 
                  : 'bg-neutral-950/80 border-[#d4af37]/40 text-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.3)]'
              }`}>
                <div className="filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.65)]">
                  <Suit3DModel suit={animatingSuit} size={90} className="sm:w-[125px] sm:h-[125px]" />
                </div>
                <span className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[3px] select-none font-bold text-center mt-2">
                  {cardsData.find(c => c.id === animatingSuit)?.title}
                </span>
              </div>
              
              {/* Front side of animating card (rotated 180deg) */}
              <div 
                className={`absolute inset-0 rounded-2xl [backface-visibility:hidden] [transform:rotateY(180deg)] backdrop-blur-md flex flex-col p-4 justify-between border shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${
                  cardsData.find(c => c.id === animatingSuit)?.isRed 
                    ? 'bg-neutral-950/80 border-red-500/45 text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.3)]' 
                    : 'bg-neutral-950/80 border-[#d4af37]/45 text-[#d4af37] shadow-[0_0_40px_rgba(212,175,55,0.3)]'
                }`}
              >
                <div className="flex flex-col items-center leading-none">
                  <span className="font-serif text-xl sm:text-2xl font-black">{cardsData.find(c => c.id === animatingSuit)?.rank}</span>
                  <span className="text-sm mt-0.5">{cardsData.find(c => c.id === animatingSuit)?.symbol}</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-2 text-center filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.65)]">
                  <Suit3DModel suit={animatingSuit} size={80} className="sm:w-[110px] sm:h-[110px]" />
                  <span className="font-cinzel text-[11px] sm:text-xs uppercase tracking-[2.5px] font-bold mt-2">
                    {cardsData.find(c => c.id === animatingSuit)?.title}
                  </span>
                </div>
                <div className="flex flex-col items-center leading-none rotate-180">
                  <span className="font-serif text-xl sm:text-2xl font-black">{cardsData.find(c => c.id === animatingSuit)?.rank}</span>
                  <span className="text-sm mt-0.5">{cardsData.find(c => c.id === animatingSuit)?.symbol}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL PANEL OVERLAYS (STUNNING FROSTED DARK GLASSMORPHISM STYLE) ── */}

      {/* 1. HEARTS - ABOUT ME PANEL */}
      <div 
        className={`absolute inset-x-0 h-screen bg-black/85 backdrop-blur-md z-40 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 ${
          activePanel === 'hearts' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: `${scrollTop}px` }}
        onClick={() => setActivePanel(null)}
      >
        <div 
          className={`bg-neutral-950/95 text-white rounded-2xl w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/10 flex flex-col ${
            activePanel === 'hearts' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0c0c10]/95 backdrop-blur-xl z-10">
            <div className="flex items-center gap-4">
              <span className="text-4xl text-red-500 leading-none filter drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">♥</span>
              <div>
                <h2 className="font-cinzel text-2xl font-bold tracking-tight">About Me</h2>
                <p className="text-[10px] tracking-[2px] uppercase text-red-500 font-bold">
                  {cardsData.find(c => c.id === 'hearts')?.subTitle}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActivePanel(null)}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all text-white/70"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
            <p className="text-base sm:text-lg leading-relaxed text-white/80">
              Hey — I'm <strong className="text-red-500 font-bold">Ali Zain Hemani</strong>, a Computer Science undergraduate based in <strong className="text-red-500 font-bold">Karachi, Pakistan</strong>. 
              I call myself the <strong className="text-red-500 font-bold">Jack of All Trades</strong> because I genuinely don't believe in boxing myself into one lane. 
              One day I'm building AI-powered chat platforms, the next I'm scraping the web for leads or training a vision model. 
              I thrive at the intersection of curiosity and code.
            </p>
            <p className="text-base sm:text-lg leading-relaxed text-white/80">
              My focus is on <strong className="text-red-500 font-bold">AI-driven development</strong> — building things that are actually useful, scalable, and a little bit clever. 
              Whether it's automation, computer vision, or full-stack AI integration, I pick up what I need and ship.
            </p>

            {/* Quick Stats Grid with gorgeous frosted cards */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-white/[0.03] backdrop-blur-lg rounded-xl p-4 text-center border border-white/10 hover:border-red-500/25 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="block font-serif text-2xl sm:text-3xl font-black text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">10+</span>
                <span className="block text-[8px] sm:text-[10px] tracking-[1.5px] uppercase text-white/50 mt-1">Projects Built</span>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-lg rounded-xl p-4 text-center border border-white/10 hover:border-red-500/25 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="block font-serif text-2xl sm:text-3xl font-black text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">1+</span>
                <span className="block text-[8px] sm:text-[10px] tracking-[1.5px] uppercase text-white/50 mt-1">Years Exp.</span>
              </div>
              <div className="bg-white/[0.03] backdrop-blur-lg rounded-xl p-4 text-center border border-white/10 hover:border-red-500/25 transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
                <span className="block font-serif text-2xl sm:text-3xl font-black text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.3)]">6+</span>
                <span className="block text-[8px] sm:text-[10px] tracking-[1.5px] uppercase text-white/50 mt-1">Certifications</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-4 border-t border-white/10">
              <h4 className="font-cinzel text-xs tracking-[4px] uppercase text-white/40 font-bold mb-3">Get in Touch</h4>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="mailto:alizain.rizwan02@gmail.com" 
                  className="flex items-center gap-2 bg-white/[0.04] border border-white/10 hover:bg-red-600 hover:text-white hover:border-red-600/50 rounded-full px-4 py-2.5 text-xs font-medium transition-all text-white/90"
                >
                  <Mail size={13} className="text-red-500" />
                  alizain.rizwan02@gmail.com
                </a>
                <a 
                  href="tel:+923352367457" 
                  className="flex items-center gap-2 bg-white/[0.04] border border-white/10 hover:bg-red-600 hover:text-white hover:border-red-600/50 rounded-full px-4 py-2.5 text-xs font-medium transition-all text-white/90"
                >
                  <Phone size={13} className="text-red-500" />
                  +92 335 2367457
                </a>
                <a 
                  href="https://github.com/AliZain2002" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/[0.04] border border-white/10 hover:bg-red-600 hover:text-white hover:border-red-600/50 rounded-full px-4 py-2.5 text-xs font-medium transition-all text-white/90"
                >
                  <Github size={13} className="text-red-500" />
                  github.com/AliZain2002
                </a>
                <span className="flex items-center gap-2 bg-red-600/10 text-red-400 border border-red-600/25 rounded-full px-4 py-2.5 text-xs font-semibold">
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
        className={`absolute inset-x-0 h-screen bg-black/85 backdrop-blur-md z-40 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 ${
          activePanel === 'clubs' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: `${scrollTop}px` }}
        onClick={() => setActivePanel(null)}
      >
        <div 
          className={`bg-neutral-950/95 text-white rounded-2xl w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/10 flex flex-col ${
            activePanel === 'clubs' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0c0c10]/95 backdrop-blur-xl z-10">
            <div className="flex items-center gap-4">
              <span className="text-4xl text-[#d4af37] leading-none filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">♣</span>
              <div>
                <h2 className="font-cinzel text-2xl font-bold tracking-tight">Projects</h2>
                <p className="text-[10px] tracking-[2px] uppercase text-[#d4af37] font-bold">
                  {cardsData.find(c => c.id === 'clubs')?.subTitle}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActivePanel(null)}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all text-white/70"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
            
            {/* Project Hero Banner with glass outline */}
            <div className="flex items-center gap-5 bg-gradient-to-r from-neutral-900/90 to-neutral-900/50 text-white rounded-xl p-5 border-l-4 border-[#d4af37] border border-white/5">
              <div className="font-serif text-5xl font-black text-[#d4af37] leading-none drop-shadow-[0_0_8px_rgba(212,175,55,0.2)]">
                10<span className="text-[#d4af37]">+</span>
              </div>
              <div>
                <h3 className="font-cinzel text-xs font-bold uppercase tracking-[2px] text-white/90">Projects Shipped</h3>
                <p className="text-[11px] text-white/50 leading-normal mt-1">
                  AI systems · automation tools · computer vision · desktop apps · web scrapers · and more
                </p>
              </div>
            </div>

            <h4 className="font-cinzel text-xs tracking-[4px] uppercase text-white/40 font-bold border-b border-white/5 pb-2">Featured Projects</h4>

            {/* Projects List with ultra-premium glass cards */}
            <div className="space-y-4">
              {projectsData.map((project) => (
                <a 
                  key={project.num}
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-white/[0.03] text-white border border-white/10 rounded-xl p-5 relative overflow-hidden group hover:translate-x-1 border-l-3 border-transparent hover:border-[#d4af37]/60 hover:bg-white/[0.05] transition-all shadow-lg duration-300"
                >
                  {/* Faded Large background number */}
                  <span className="absolute right-5 top-3 font-serif text-5xl font-black text-[#d4af37]/[0.03] select-none leading-none pointer-events-none">
                    {project.num}
                  </span>

                  <div className="flex items-start justify-between gap-4">
                    <h5 className="font-serif text-base font-bold flex items-center gap-2">
                      {project.name}
                      {project.badge && (
                        <span className="font-sans text-[8px] font-semibold tracking-wider uppercase bg-[#d4af37]/20 text-[#ffeaa7] border border-[#d4af37]/30 rounded-full px-2 py-0.5">
                          {project.badge}
                        </span>
                      )}
                    </h5>
                    <ExternalLink size={14} className="text-white/20 group-hover:text-[#d4af37] transition-colors mt-1" />
                  </div>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed mt-2 mb-4">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((techItem) => (
                      <span 
                        key={techItem}
                        className="bg-white/5 border border-white/10 text-[#f5d061] rounded-full px-2.5 py-0.5 text-[9px] tracking-wide font-medium"
                      >
                        {techItem}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>

            {/* GitHub Callout row */}
            <div className="flex items-center gap-3 bg-white/[0.02] border border-dashed border-white/15 rounded-xl p-4 flex-wrap">
              <span className="text-[#d4af37] text-lg">♣</span>
              <p className="text-xs text-white/60 flex-1 min-w-[180px]">
                +6 more projects across web scraping, ML experiments, CLI tools & automation scripts
              </p>
              <a 
                href="https://github.com/AliZain2002" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs font-bold text-[#d4af37] hover:underline flex items-center gap-1 shrink-0"
              >
                View on GitHub <ChevronRight size={13} />
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 3. DIAMONDS - EXPERIENCE PANEL */}
      <div 
        className={`absolute inset-x-0 h-screen bg-black/85 backdrop-blur-md z-40 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 ${
          activePanel === 'diamonds' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: `${scrollTop}px` }}
        onClick={() => setActivePanel(null)}
      >
        <div 
          className={`bg-neutral-950/95 text-white rounded-2xl w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/10 flex flex-col ${
            activePanel === 'diamonds' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0c0c10]/95 backdrop-blur-xl z-10">
            <div className="flex items-center gap-4">
              <span className="text-4xl text-red-500 leading-none filter drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">♦</span>
              <div>
                <h2 className="font-cinzel text-2xl font-bold tracking-tight">Experience</h2>
                <p className="text-[10px] tracking-[2px] uppercase text-red-500 font-bold">
                  {cardsData.find(c => c.id === 'diamonds')?.subTitle}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActivePanel(null)}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:bg-red-600 hover:text-white hover:border-red-600 transition-all text-white/70"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
            
            <h4 className="font-cinzel text-xs tracking-[4px] uppercase text-white/40 font-bold border-b border-white/5 pb-2">Work Experience</h4>
            
            {/* Work experience Blocks in glass card */}
            <div className="space-y-6">
              {experiencesData.map((exp, expIdx) => (
                <div key={expIdx} className="bg-white/[0.03] border border-white/10 rounded-xl p-5 space-y-3 shadow-lg hover:border-red-500/20 transition-colors">
                  <div className="flex justify-between items-start flex-wrap gap-1">
                    <div>
                      <h5 className="font-serif text-lg font-bold text-white">{exp.role}</h5>
                      <p className="text-red-500 font-bold text-sm">{exp.company}</p>
                    </div>
                    <span className="text-[10px] tracking-widest uppercase font-bold text-white/40 mt-1">{exp.date}</span>
                  </div>
                  <ul className="space-y-2 pt-1">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="relative pl-5 text-sm text-white/70 leading-relaxed">
                        <span className="absolute left-0 text-red-500 text-xs top-0.5">♦</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h4 className="font-cinzel text-xs tracking-[4px] uppercase text-white/40 font-bold border-b border-white/5 pt-2 pb-2">Education</h4>

            {/* Education boxes with glass design */}
            <div className="space-y-3">
              {educationData.map((edu, eduIdx) => (
                <div key={eduIdx} className="bg-white/[0.03] border border-white/10 text-white rounded-xl p-4 flex justify-between items-start gap-4 transition-all hover:border-red-500/20 shadow-md">
                  <div>
                    <h5 className="font-sans text-sm font-bold text-white leading-snug">{edu.degree}</h5>
                    <p className="text-xs text-white/50 mt-1">{edu.school}</p>
                  </div>
                  <span className="font-serif text-sm font-black text-red-500 shrink-0">{edu.year}</span>
                </div>
              ))}
            </div>

            <h4 className="font-cinzel text-xs tracking-[4px] uppercase text-white/40 font-bold border-b border-white/5 pt-2 pb-2">Certifications & Achievements</h4>
            
            {/* Certifications grid with glass design */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certificationsData.map((cert, cIdx) => (
                <div key={cIdx} className="bg-white/[0.03] border border-white/10 text-white/80 rounded-lg p-3 text-xs leading-normal flex gap-2 items-start shadow-md hover:border-red-500/15 transition-all">
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
        className={`absolute inset-x-0 h-screen bg-black/85 backdrop-blur-md z-40 flex items-center justify-center p-2 sm:p-4 transition-opacity duration-300 ${
          activePanel === 'spades' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: `${scrollTop}px` }}
        onClick={() => setActivePanel(null)}
      >
        <div 
          className={`bg-neutral-950/95 text-white rounded-2xl w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-hidden transition-all duration-300 shadow-[0_25px_60px_rgba(0,0,0,0.85)] border border-white/10 flex flex-col ${
            activePanel === 'spades' ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#0c0c10]/95 backdrop-blur-xl z-10">
            <div className="flex items-center gap-4">
              <span className="text-4xl text-[#d4af37] leading-none filter drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]">♠</span>
              <div>
                <h2 className="font-cinzel text-2xl font-bold tracking-tight">Skills</h2>
                <p className="text-[10px] tracking-[2px] uppercase text-[#d4af37] font-bold">
                  {cardsData.find(c => c.id === 'spades')?.subTitle}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setActivePanel(null)}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center hover:bg-[#d4af37] hover:text-black hover:border-[#d4af37] transition-all text-white/70"
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
            {skillsData.map((group, gIdx) => (
              <div key={gIdx} className="space-y-3">
                <h4 className="font-cinzel text-xs tracking-[3px] uppercase text-white/40 font-bold border-b border-white/5 pb-2">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <div 
                      key={skill.name}
                      className="flex items-center gap-2.5 bg-white/[0.03] text-white/90 border border-white/10 shadow-lg rounded-lg px-4 py-2 text-xs font-semibold hover:-translate-y-0.5 hover:border-[#d4af37]/40 hover:bg-white/[0.05] transition-all cursor-default"
                    >
                      {/* Premium gold bullet points instead of emojis */}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_5px_#d4af37]"></span>
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CustomCursor />
    </div>
  );
}
