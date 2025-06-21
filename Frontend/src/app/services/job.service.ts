import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Job, JobFilter } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobs: Job[] = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      salary: '$80,000 - $120,000',
      type: 'Full-time',
      experience: '2-5 years',
      degree: 'Bachelor\'s in Computer Science',
      skills: ['Angular', 'TypeScript', 'HTML', 'CSS', 'JavaScript'],
      description: 'We are looking for a talented Frontend Developer to join our team...',
      requirements: [
        'Strong experience with Angular framework',
        'Proficient in TypeScript and JavaScript',
        'Experience with responsive design',
        'Knowledge of modern CSS frameworks'
      ],
      benefits: [
        'Health insurance',
        '401k matching',
        'Flexible work hours',
        'Remote work options'
      ],
      postedDate: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Backend Engineer',
      company: 'DataFlow Inc',
      location: 'New York, NY',
      salary: '$90,000 - $130,000',
      type: 'Full-time',
      experience: '3-7 years',
      degree: 'Bachelor\'s in Computer Science or related field',
      skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS'],
      description: 'Join our backend team to build scalable microservices...',
      requirements: [
        'Experience with Node.js and Python',
        'Database design and optimization',
        'Cloud platform experience (AWS/Azure)',
        'API design and development'
      ],
      benefits: [
        'Competitive salary',
        'Stock options',
        'Professional development',
        'Team events'
      ],
      postedDate: new Date('2024-01-10')
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      company: 'Creative Studios',
      location: 'Austin, TX',
      salary: '$70,000 - $100,000',
      type: 'Full-time',
      experience: '1-4 years',
      degree: 'Bachelor\'s in Design or related field',
      skills: ['Figma', 'Adobe Creative Suite', 'User Research', 'Prototyping'],
      description: 'Create beautiful and intuitive user experiences...',
      requirements: [
        'Proficiency in Figma and Adobe Creative Suite',
        'User research and testing experience',
        'Portfolio demonstrating UI/UX work',
        'Understanding of design systems'
      ],
      benefits: [
        'Creative environment',
        'Latest design tools',
        'Conference attendance',
        'Flexible schedule'
      ],
      postedDate: new Date('2024-01-12')
    },
    {
      id: '4',
      title: 'DevOps Engineer',
      company: 'CloudTech Solutions',
      location: 'Seattle, WA',
      salary: '$100,000 - $140,000',
      type: 'Full-time',
      experience: '4-8 years',
      degree: 'Bachelor\'s in Computer Science or Engineering',
      skills: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Linux'],
      description: 'Help us build and maintain our cloud infrastructure...',
      requirements: [
        'Experience with containerization (Docker/Kubernetes)',
        'CI/CD pipeline development',
        'Infrastructure as Code (Terraform)',
        'Linux system administration'
      ],
      benefits: [
        'High salary range',
        'Remote work available',
        'Latest technology stack',
        'Career growth opportunities'
      ],
      postedDate: new Date('2024-01-08')
    },
    {
      id: '5',
      title: 'Product Manager',
      company: 'Innovate Labs',
      location: 'Boston, MA',
      salary: '$85,000 - $125,000',
      type: 'Full-time',
      experience: '3-6 years',
      degree: 'Bachelor\'s in Business, Engineering, or related field',
      skills: ['Product Strategy', 'Agile', 'Data Analysis', 'User Research'],
      description: 'Lead product development from concept to launch...',
      requirements: [
        'Product management experience',
        'Agile/Scrum methodology knowledge',
        'Data-driven decision making',
        'Excellent communication skills'
      ],
      benefits: [
        'Leadership opportunities',
        'Product ownership',
        'Competitive benefits',
        'Innovation culture'
      ],
      postedDate: new Date('2024-01-14')
    }
  ];

  private jobsSubject = new BehaviorSubject<Job[]>(this.jobs);
  private appliedJobs: Job[] = [];
  private savedJobs: Job[] = [];

  constructor() {}

  getJobs(): Observable<Job[]> {
    return this.jobsSubject.asObservable();
  }

  getJobById(id: string): Observable<Job | undefined> {
    const job = this.jobs.find(j => j.id === id);
    return of(job);
  }

  filterJobs(filter: JobFilter): Observable<Job[]> {
    let filteredJobs = [...this.jobs];

    if (filter.title) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(filter.title!.toLowerCase())
      );
    }

    if (filter.location) {
      filteredJobs = filteredJobs.filter(job => 
        job.location.toLowerCase().includes(filter.location!.toLowerCase())
      );
    }

    if (filter.experience) {
      filteredJobs = filteredJobs.filter(job => 
        job.experience.includes(filter.experience!)
      );
    }

    if (filter.skills && filter.skills.length > 0) {
      filteredJobs = filteredJobs.filter(job => 
        filter.skills!.some(skill => 
          job.skills.some(jobSkill => 
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    return of(filteredJobs);
  }

  applyToJob(job: Job): void {
    if (!this.appliedJobs.find(j => j.id === job.id)) {
      this.appliedJobs.push(job);
    }
  }

  saveJob(job: Job): void {
    if (!this.savedJobs.find(j => j.id === job.id)) {
      this.savedJobs.push(job);
    }
  }

  getAppliedJobs(): Observable<Job[]> {
    return of(this.appliedJobs);
  }

  getSavedJobs(): Observable<Job[]> {
    return of(this.savedJobs);
  }

  calculateFitScore(job: Job, resumeSkills: string[]): number {
    const jobSkills = job.skills.map(skill => skill.toLowerCase());
    const userSkills = resumeSkills.map(skill => skill.toLowerCase());
    
    const matchingSkills = jobSkills.filter(skill => 
      userSkills.some(userSkill => userSkill.includes(skill) || skill.includes(userSkill))
    );
    
    return Math.round((matchingSkills.length / jobSkills.length) * 100);
  }
}
