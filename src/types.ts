export type SuitType = 'hearts' | 'clubs' | 'diamonds' | 'spades';

export interface CardConfig {
  id: SuitType;
  symbol: string;
  color: string;
  rank: string;
  title: string;
  subTitle: string;
  backRank: string;
  isRed: boolean;
}

export interface Project {
  num: string;
  name: string;
  badge?: string;
  desc: string;
  tech: string[];
  link: string;
}

export interface Experience {
  role: string;
  company: string;
  date: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  school: string;
  year: string;
}

export interface SkillGroup {
  title: string;
  skills: { name: string; icon: string }[];
}
