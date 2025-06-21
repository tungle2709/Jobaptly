import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { Job, JobFilter } from '../../models/job.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit, OnDestroy {
  allJobs: Job[] = [];
  filteredJobs: Job[] = [];
  appliedJobs: Job[] = [];
  savedJobs: Job[] = [];
  currentView: 'all' | 'applied' | 'saved' = 'all';
  
  // Filter properties
  filter: JobFilter = {};
  searchTerm = '';
  selectedLocation = '';
  selectedExperience = '';
  selectedType = '';
  
  // Available filter options
  locations: string[] = [];
  experienceLevels: string[] = [];
  jobTypes: string[] = [];
  
  private subscriptions: Subscription[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobs();
    this.loadAppliedJobs();
    this.loadSavedJobs();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadJobs(): void {
    this.subscriptions.push(
      this.jobService.getJobs().subscribe(jobs => {
        this.allJobs = jobs;
        this.filteredJobs = jobs;
        this.extractFilterOptions();
        this.applyFilters();
      })
    );
  }

  loadAppliedJobs(): void {
    this.subscriptions.push(
      this.jobService.getAppliedJobs().subscribe(jobs => {
        this.appliedJobs = jobs;
      })
    );
  }

  loadSavedJobs(): void {
    this.subscriptions.push(
      this.jobService.getSavedJobs().subscribe(jobs => {
        this.savedJobs = jobs;
      })
    );
  }

  extractFilterOptions(): void {
    // Extract unique locations
    this.locations = [...new Set(this.allJobs.map(job => job.location))];
    
    // Extract unique experience levels
    this.experienceLevels = [...new Set(this.allJobs.map(job => job.experience))];
    
    // Extract unique job types
    this.jobTypes = [...new Set(this.allJobs.map(job => job.type))];
  }

  setView(view: 'all' | 'applied' | 'saved'): void {
    this.currentView = view;
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  onLocationChange(): void {
    this.filter.location = this.selectedLocation || undefined;
    this.applyFilters();
  }

  onExperienceChange(): void {
    this.filter.experience = this.selectedExperience || undefined;
    this.applyFilters();
  }

  onTypeChange(): void {
    this.filter.type = this.selectedType || undefined;
    this.applyFilters();
  }

  clearFilters(): void {
    this.filter = {};
    this.searchTerm = '';
    this.selectedLocation = '';
    this.selectedExperience = '';
    this.selectedType = '';
    this.applyFilters();
  }

  applyFilters(): void {
    let jobsToFilter = this.allJobs;

    // Filter by view
    if (this.currentView === 'applied') {
      jobsToFilter = this.appliedJobs;
    } else if (this.currentView === 'saved') {
      jobsToFilter = this.savedJobs;
    }

    // Apply search filter
    if (this.searchTerm) {
      this.filter.title = this.searchTerm;
    }

    // Apply service filters
    this.subscriptions.push(
      this.jobService.filterJobs(this.filter).subscribe(filteredJobs => {
        if (this.currentView === 'all') {
          this.filteredJobs = filteredJobs;
        } else {
          // For applied/saved views, filter from the respective arrays
          const filteredIds = new Set(filteredJobs.map(job => job.id));
          this.filteredJobs = jobsToFilter.filter(job => filteredIds.has(job.id));
        }
      })
    );
  }

  applyToJob(job: Job): void {
    this.jobService.applyToJob(job);
    this.loadAppliedJobs();
  }

  saveJob(job: Job): void {
    this.jobService.saveJob(job);
    this.loadSavedJobs();
  }

  removeFromSaved(job: Job): void {
    // In a real app, you'd have a remove method in the service
    this.loadSavedJobs();
  }

  getFitScoreColor(score: number): string {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FF9800';
    return '#F44336';
  }

  getCurrentJobs(): Job[] {
    return this.filteredJobs;
  }

  getJobCount(): number {
    return this.filteredJobs.length;
  }
}
