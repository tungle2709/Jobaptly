import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeUploadComponent } from '../../components/resume-upload/resume-upload.component';

@Component({
  selector: 'app-upload-page',
  standalone: true,
  imports: [CommonModule, ResumeUploadComponent],
  templateUrl: './upload-page.component.html',
  styleUrl: './upload-page.component.css'
})
export class UploadPageComponent {
  title = 'Upload Your Resume';
  subtitle = 'Get started by uploading your resume for AI-powered job matching';
}
