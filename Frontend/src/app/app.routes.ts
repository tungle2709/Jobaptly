import { Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { UploadPageComponent } from './pages/upload-page/upload-page.component';
import { SwipePageComponent } from './pages/swipe-page/swipe-page.component';
import { JobsPageComponent } from './pages/jobs-page/jobs-page.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'upload', component: UploadPageComponent },
  { path: 'swipe', component: SwipePageComponent },
  { path: 'jobs', component: JobsPageComponent },
  { path: '**', redirectTo: '' }
];
