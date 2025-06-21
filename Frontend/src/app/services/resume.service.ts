import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Resume, ResumeData } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private currentResume: Resume | null = null;
  private resumeSubject = new BehaviorSubject<Resume | null>(null);

  constructor() {}

  uploadResume(file: File): Observable<Resume> {
    return new Observable(observer => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const resume: Resume = {
          id: this.generateId(),
          fileName: file.name,
          fileSize: file.size,
          uploadDate: new Date(),
          content: content,
          parsedData: this.parseResumeContent(content)
        };
        
        this.currentResume = resume;
        this.resumeSubject.next(resume);
        observer.next(resume);
        observer.complete();
      };
      
      reader.readAsText(file);
    });
  }

  getCurrentResume(): Observable<Resume | null> {
    return this.resumeSubject.asObservable();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private parseResumeContent(content: string): ResumeData {
    // Mock parsing - in a real app, this would use AI/ML to extract data
    const lines = content.split('\n');
    
    return {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '(555) 123-4567',
      education: [
        {
          degree: 'Bachelor of Science in Computer Science',
          institution: 'University of Technology',
          year: '2020',
          gpa: '3.8'
        }
      ],
      experience: [
        {
          title: 'Frontend Developer',
          company: 'Tech Solutions Inc',
          duration: '2021 - Present',
          description: 'Developed responsive web applications using Angular and TypeScript',
          skills: ['Angular', 'TypeScript', 'HTML', 'CSS', 'JavaScript']
        },
        {
          title: 'Junior Developer',
          company: 'StartupXYZ',
          duration: '2020 - 2021',
          description: 'Built and maintained web applications using modern frameworks',
          skills: ['React', 'JavaScript', 'Node.js', 'MongoDB']
        }
      ],
      skills: [
        'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS',
        'React', 'Node.js', 'MongoDB', 'Git', 'Agile'
      ],
      summary: 'Experienced frontend developer with 3+ years of experience building modern web applications using Angular and React frameworks.'
    };
  }

  updateResume(resume: Resume): void {
    this.currentResume = resume;
    this.resumeSubject.next(resume);
  }

  clearResume(): void {
    this.currentResume = null;
    this.resumeSubject.next(null);
  }

  getResumeSkills(): string[] {
    return this.currentResume?.parsedData?.skills || [];
  }
}
