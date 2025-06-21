import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../services/resume.service';
import { AiAnalysisService } from '../../services/ai-analysis.service';
import { Resume } from '../../models/resume.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-resume-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resume-upload.component.html',
  styleUrl: './resume-upload.component.css'
})
export class ResumeUploadComponent implements OnInit, OnDestroy {
  currentResume: Resume | null = null;
  isUploading = false;
  uploadProgress = 0;
  improvementTips: string[] = [];
  showTips = false;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private resumeService: ResumeService,
    private aiAnalysisService: AiAnalysisService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.resumeService.getCurrentResume().subscribe(resume => {
        this.currentResume = resume;
        if (resume?.content) {
          this.loadImprovementTips(resume.content);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadResume(file);
    }
  }

  uploadResume(file: File): void {
    this.isUploading = true;
    this.uploadProgress = 0;

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      this.uploadProgress += 10;
      if (this.uploadProgress >= 100) {
        clearInterval(progressInterval);
        this.completeUpload(file);
      }
    }, 200);
  }

  private completeUpload(file: File): void {
    this.subscriptions.push(
      this.resumeService.uploadResume(file).subscribe(resume => {
        this.currentResume = resume;
        this.isUploading = false;
        this.uploadProgress = 0;
        this.loadImprovementTips(resume.content || '');
      })
    );
  }

  private loadImprovementTips(resumeContent: string): void {
    this.subscriptions.push(
      this.aiAnalysisService.getResumeImprovementTips(resumeContent).subscribe(tips => {
        this.improvementTips = tips;
      })
    );
  }

  toggleTips(): void {
    this.showTips = !this.showTips;
  }

  clearResume(): void {
    this.resumeService.clearResume();
    this.currentResume = null;
    this.improvementTips = [];
    this.showTips = false;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
