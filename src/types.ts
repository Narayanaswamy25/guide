
export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  duration?: string;
  difficulty?: Difficulty;
  resources?: { name: string; url: string }[];
  isCompleted?: boolean;
}

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Specialist';

export type DegreeType = 
  | 'Computer Science' 
  | 'Civil Engineering' 
  | 'Mechanical Engineering' 
  | 'Electrical Engineering'
  | 'Data Science'
  | 'Business Management'
  | 'Bio-Medical'
  | 'Aerospace Engineering';

export type CareerCategory = 
  | 'frontend' 
  | 'backend' 
  | 'security' 
  | 'devops' 
  | 'ai-ml' 
  | 'system-design' 
  | 'cloud-hosting'
  | 'bim-structural'
  | 'gis-surveying'
  | 'data-analytics'
  | 'product-management'
  | 'robotics'
  | 'aerodynamics';

export interface CareerPath {
  id: string;
  title: string;
  icon: string;
  description: string;
  degree: DegreeType[];
  category: CareerCategory;
  difficulty: Difficulty;
  duration: string;
  rating: number;
  steps: RoadmapStep[];
  updatedAt: string;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: {
    text: string;
    weights: Partial<Record<DegreeType, number>>;
  }[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  selectedDegree?: DegreeType;
  progress: Record<string, string[]>;
}
