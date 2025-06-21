export interface Resume {
  id: string;
  fileName: string;
  fileSize: number;
  uploadDate: Date;
  content?: string;
  parsedData?: ResumeData;
}

export interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  summary: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
}

export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
  skills: string[];
}

export interface AIAnalysis {
  fitScore: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  skillMatch: SkillMatch[];
}

export interface SkillMatch {
  skill: string;
  match: number;
  required: boolean;
} 