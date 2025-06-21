import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobSwipeComponent } from '../../components/job-swipe/job-swipe.component';

@Component({
  selector: 'app-swipe-page',
  standalone: true,
  imports: [CommonModule, JobSwipeComponent],
  templateUrl: './swipe-page.component.html',
  styleUrl: './swipe-page.component.css'
})
export class SwipePageComponent {
  title = 'Swipe to Apply';
  subtitle = 'Discover and apply to jobs with intuitive swipe gestures';
}
