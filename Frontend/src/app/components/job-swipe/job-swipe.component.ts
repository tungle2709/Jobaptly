import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobService } from '../../services/job.service';
import { ResumeService } from '../../services/resume.service';
import { AiAnalysisService } from '../../services/ai-analysis.service';
import { Job } from '../../models/job.model';
import { AIAnalysis } from '../../models/resume.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-swipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-swipe.component.html',
  styleUrl: './job-swipe.component.css'
})
export class JobSwipeComponent implements OnInit, OnDestroy {
  jobs: Job[] = [];
  currentJobIndex = 0;
  currentJob: Job | null = null;
  isAnalyzing = false;
  analysis: AIAnalysis | null = null;
  showAnalysis = false;
  swipeDirection: 'left' | 'right' | null = null;
  isDragging = false;
  startX = 0;
  currentX = 0;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private jobService: JobService,
    private resumeService: ResumeService,
    private aiAnalysisService: AiAnalysisService
  ) {}

  ngOnInit(): void {
    this.loadJobs();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadJobs(): void {
    this.subscriptions.push(
      this.jobService.getJobs().subscribe(jobs => {
        this.jobs = jobs;
        this.currentJob = jobs[0] || null;
        this.analyzeCurrentJob();
      })
    );
  }

  analyzeCurrentJob(): void {
    if (!this.currentJob) return;
    
    this.isAnalyzing = true;
    const resumeSkills = this.resumeService.getResumeSkills();
    
    this.subscriptions.push(
      this.aiAnalysisService.analyzeJobFit(this.currentJob, resumeSkills).subscribe(analysis => {
        this.analysis = analysis;
        if (this.currentJob) {
          this.currentJob.fitScore = analysis?.fitScore || 0;
        }
        this.isAnalyzing = false;
      })
    );
  }

  onTouchStart(event: TouchEvent): void {
    this.isDragging = true;
    this.startX = event.touches[0].clientX;
    this.currentX = this.startX;
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.currentX = event.touches[0].clientX;
  }

  onTouchEnd(): void {
    if (!this.isDragging) return;
    
    const deltaX = this.currentX - this.startX;
    const threshold = 100;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        this.swipeRight();
      } else {
        this.swipeLeft();
      }
    }
    
    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
  }

  swipeLeft(): void {
    this.swipeDirection = 'left';
    this.saveJob();
    this.nextJob();
  }

  swipeRight(): void {
    this.swipeDirection = 'right';
    this.applyToJob();
    this.nextJob();
  }

  applyToJob(): void {
    if (this.currentJob) {
      this.jobService.applyToJob(this.currentJob);
      console.log(`Applied to: ${this.currentJob.title} at ${this.currentJob.company}`);
    }
  }

  saveJob(): void {
    if (this.currentJob) {
      this.jobService.saveJob(this.currentJob);
      console.log(`Saved: ${this.currentJob.title} at ${this.currentJob.company}`);
    }
  }

  nextJob(): void {
    setTimeout(() => {
      this.currentJobIndex++;
      if (this.currentJobIndex < this.jobs.length) {
        this.currentJob = this.jobs[this.currentJobIndex];
        this.analyzeCurrentJob();
        this.showAnalysis = false;
        this.analysis = null;
      } else {
        this.currentJob = null;
      }
      this.swipeDirection = null;
    }, 300);
  }

  toggleAnalysis(): void {
    this.showAnalysis = !this.showAnalysis;
  }

  getSwipeTransform(): string {
    if (!this.isDragging) return '';
    const deltaX = this.currentX - this.startX;
    const rotation = deltaX * 0.1;
    return `translateX(${deltaX}px) rotate(${rotation}deg)`;
  }

  getFitScoreColor(score: number): string {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  }
}
