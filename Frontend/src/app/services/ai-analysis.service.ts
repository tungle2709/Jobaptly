import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AIAnalysis, SkillMatch } from '../models/resume.model';
import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class AiAnalysisService {

  constructor() {}

  analyzeJobFit(job: Job, resumeSkills: string[]): Observable<AIAnalysis> {
    // Mock AI analysis - in a real app, this would call an AI service
    const jobSkills = job.skills.map(skill => skill.toLowerCase());
    const userSkills = resumeSkills.map(skill => skill.toLowerCase());
    
    const skillMatches: SkillMatch[] = jobSkills.map(skill => {
      const match = userSkills.some(userSkill => 
        userSkill.includes(skill) || skill.includes(userSkill)
      );
      return {
        skill: skill,
        match: match ? 100 : 0,
        required: true
      };
    });

    const matchingSkills = skillMatches.filter(sm => sm.match > 0);
    const fitScore = Math.round((matchingSkills.length / jobSkills.length) * 100);

    const strengths = this.generateStrengths(matchingSkills, job);
    const weaknesses = this.generateWeaknesses(skillMatches.filter(sm => sm.match === 0), job);
    const recommendations = this.generateRecommendations(weaknesses, job);

    return of({
      fitScore,
      strengths,
      weaknesses,
      recommendations,
      skillMatch: skillMatches
    });
  }

  private generateStrengths(matchingSkills: SkillMatch[], job: Job): string[] {
    const strengths: string[] = [];
    
    if (matchingSkills.length > 0) {
      strengths.push(`Strong match with ${matchingSkills.length} required skills`);
      strengths.push(`Good alignment with ${job.title} role requirements`);
    }
    
    if (matchingSkills.length >= job.skills.length * 0.7) {
      strengths.push('Excellent skill compatibility for this position');
    }
    
    return strengths;
  }

  private generateWeaknesses(missingSkills: SkillMatch[], job: Job): string[] {
    const weaknesses: string[] = [];
    
    missingSkills.forEach(skill => {
      weaknesses.push(`Missing required skill: ${skill.skill}`);
    });
    
    if (missingSkills.length > job.skills.length * 0.5) {
      weaknesses.push('Significant skill gap for this position');
    }
    
    return weaknesses;
  }

  private generateRecommendations(weaknesses: string[], job: Job): string[] {
    const recommendations: string[] = [];
    
    if (weaknesses.length > 0) {
      recommendations.push('Consider gaining experience in missing skills through online courses');
      recommendations.push('Update your resume to highlight relevant projects and achievements');
      recommendations.push('Network with professionals in this field to learn about requirements');
    }
    
    if (job.experience.includes('3-') || job.experience.includes('4-') || job.experience.includes('5+')) {
      recommendations.push('Focus on gaining more hands-on experience in your target field');
    }
    
    recommendations.push('Tailor your cover letter to address specific job requirements');
    recommendations.push('Prepare examples of how your skills align with the job description');
    
    return recommendations;
  }

  getResumeImprovementTips(resumeContent: string): Observable<string[]> {
    // Mock AI tips for resume improvement
    return of([
      'Add quantifiable achievements to your experience section',
      'Include relevant keywords from job descriptions',
      'Highlight leadership and project management experience',
      'Add certifications and professional development',
      'Ensure consistent formatting and professional appearance',
      'Include a compelling summary statement',
      'Add links to portfolio or relevant projects'
    ]);
  }

  suggestSkillsToLearn(jobSkills: string[], userSkills: string[]): Observable<string[]> {
    const missingSkills = jobSkills.filter(skill => 
      !userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    
    return of(missingSkills.slice(0, 5)); // Return top 5 missing skills
  }
}
