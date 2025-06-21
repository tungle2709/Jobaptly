import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobListComponent } from '../../components/job-list/job-list.component';

@Component({
  selector: 'app-jobs-page',
  standalone: true,
  imports: [CommonModule, JobListComponent],
  templateUrl: './jobs-page.component.html',
  styleUrl: './jobs-page.component.css'
})
export class JobsPageComponent {
  title = 'Job Listings';
  subtitle = 'Browse and filter available job opportunities';
}
