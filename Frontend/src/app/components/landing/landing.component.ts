import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  title = 'Jobaptly';
  slogan = 'The Smarter Way to Swipe and Apply';

  constructor(private router: Router) {}

  navigateToUpload(): void {
    this.router.navigate(['/upload']);
  }
}
