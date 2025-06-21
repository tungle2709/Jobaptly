export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  experience: string;
  degree: string;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: Date;
  logo?: string;
  fitScore?: number;
}

export interface JobFilter {
  title?: string;
  location?: string;
  experience?: string;
  degree?: string;
  skills?: string[];
  type?: string;
} 