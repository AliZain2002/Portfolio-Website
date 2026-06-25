import { CardConfig, Project, Experience, Education, SkillGroup } from './types';

export const cardsData: CardConfig[] = [
  {
    id: 'hearts',
    symbol: '♥',
    color: '#c0001a',
    rank: 'A',
    title: 'About Me',
    subTitle: 'The Jack of Hearts',
    backRank: 'J',
    isRed: true,
  },
  {
    id: 'clubs',
    symbol: '♣',
    color: '#1a1a1a',
    rank: 'K',
    title: 'Projects',
    subTitle: 'The Jack of Clubs',
    backRank: 'J',
    isRed: false,
  },
  {
    id: 'diamonds',
    symbol: '♦',
    color: '#c0001a',
    rank: 'Q',
    title: 'Experience',
    subTitle: 'The Jack of Diamonds',
    backRank: 'J',
    isRed: true,
  },
  {
    id: 'spades',
    symbol: '♠',
    color: '#1a1a1a',
    rank: 'J',
    title: 'Skills',
    subTitle: 'The Jack of Spades',
    backRank: 'J',
    isRed: false,
  },
];

export const projectsData: Project[] = [
  {
    num: '01',
    name: 'Munshi.ai',
    badge: 'AI · SaaS',
    desc: 'AI-powered customer support platform enabling businesses to deploy intelligent chat systems that handle queries, automate responses, and drive engagement through natural language interaction. Built for production-level scale.',
    tech: ['Python', 'AI / NLP', 'Chatbot', 'Automation'],
    link: 'https://github.com/AliZain2002/Munshi.Ai',
  },
  {
    num: '02',
    name: 'Video Similarity Tool',
    badge: 'Computer Vision',
    desc: 'Frame-level content analysis engine that computes visual similarity scores between YouTube videos and generates recommendations — no metadata, pure computer vision.',
    tech: ['Python', 'OpenCV', 'YouTube API', 'Computer Vision'],
    link: 'https://github.com/AliZain2002/video-similarity-tool',
  },
  {
    num: '03',
    name: 'Google Maps Scraper',
    badge: 'Data · Automation',
    desc: 'High-throughput automated extraction pipeline that structures business listings from Google Maps into clean datasets — built for lead generation and market analytics at scale.',
    tech: ['Python', 'Beautiful Soup', 'Data Mining', 'Automation'],
    link: 'https://github.com/AliZain2002/Google_maps_scrapper',
  },
  {
    num: '04',
    name: 'Data Analysis Dashboard',
    badge: 'Analytics · Viz',
    desc: 'Interactive data analysis dashboard for exploring, visualizing, and deriving insights from datasets — combining clean UI with powerful analytical capabilities under the hood.',
    tech: ['Python', 'Data Analysis', 'Visualization', 'Dashboard'],
    link: 'https://github.com/AliZain2002/data-analysis-dashboard',
  },
];

export const experiencesData: Experience[] = [
  {
    role: 'AI Developer',
    company: 'Wiga Tech',
    date: 'Aug 2025 – Present',
    bullets: [
      'Developed and deployed AI-driven automation components to improve workflow efficiency and system intelligence across business processes.',
      'Improved workflow automation by integrating AI-based components, reducing manual processing effort and making systems more autonomous, efficient, and scalable.',
      'Collaborated with engineering teams to integrate AI models into production-level applications and APIs.',
    ],
  },
];

export const educationData: Education[] = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'Undergraduate — Class of 2026',
    year: '2022–26',
  },
  {
    degree: 'GCE A-Levels',
    school: 'Private Candidate',
    year: '2018–21',
  },
  {
    degree: 'O-Levels',
    school: 'Beaconhouse School System',
    year: '2015–18',
  },
];

export const certificationsData: string[] = [
  'GDWS BWAI Hackathon 2026',
  'Google AI Essentials Specialization',
  'Database Management System – Beginner\'s Guide',
  'Python 3 Fundamentals: Real-World Coding',
  'Developers\' Day: Speed Programming',
  'PROCOM\'22: Speed Programming',
];

export const skillsData: SkillGroup[] = [
  {
    title: 'Programming Languages',
    skills: [
      { name: 'Python' },
      { name: 'C++' },
      { name: 'C#' },
      { name: 'SQL' },
    ],
  },
  {
    title: 'Libraries & Tools',
    skills: [
      { name: 'Scikit-learn' },
      { name: 'Beautiful Soup' },
      { name: 'NumPy' },
      { name: 'Pandas' },
      { name: 'OpenCV' },
      { name: 'MySQL' },
      { name: 'Git' },
      { name: 'Firebase' },
      { name: 'Visual Studio' },
    ],
  },
  {
    title: 'Core Knowledge',
    skills: [
      { name: 'Artificial Intelligence' },
      { name: 'Data Structures' },
      { name: 'Algorithms' },
      { name: 'OOP' },
      { name: 'Software Dev' },
      { name: 'Problem Solving' },
    ],
  },
  {
    title: 'Currently Exploring',
    skills: [
      { name: 'AI Agents' },
      { name: 'Vibe Coding' },
      { name: 'LLM Integration' },
      { name: 'Production AI' },
    ],
  },
];
