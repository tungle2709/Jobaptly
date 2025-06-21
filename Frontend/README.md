# Jobaptly - The Smarter Way to Swipe and Apply

Jobaptly is a modern job application platform that combines intuitive swipe gestures with AI-powered job matching to revolutionize the job search experience.

## 🚀 Features

### ✨ Core Features
- **Swipe to Apply**: Intuitive swipe gestures to apply or save jobs
- **AI-Powered Matching**: Smart fit score calculation based on resume analysis
- **Resume Upload & Analysis**: Upload and parse resumes with AI insights
- **Job Filtering**: Advanced search and filtering capabilities
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎯 Key Components

#### Job Swipe Component
- Touch-enabled swipe gestures (right to apply, left to save)
- Real-time fit score calculation
- AI analysis with strengths, weaknesses, and recommendations
- Beautiful card-based interface with smooth animations

#### Resume Upload Component
- Drag-and-drop file upload
- AI-powered resume parsing
- Skills extraction and analysis
- Improvement tips and recommendations

#### Job List Component
- Advanced filtering by location, experience, and job type
- Search functionality
- Separate views for all jobs, applied jobs, and saved jobs
- Grid layout with detailed job cards

### 🎨 Design Features
- **Modern UI**: Clean, professional design with gradient backgrounds
- **Responsive Layout**: Optimized for all screen sizes
- **Smooth Animations**: Engaging user interactions
- **Accessibility**: Focus management and keyboard navigation
- **Color-coded Fit Scores**: Visual indicators for job compatibility

## 🛠️ Technology Stack

- **Frontend**: Angular 19
- **Styling**: CSS3 with modern features (Grid, Flexbox, Custom Properties)
- **State Management**: RxJS Observables and BehaviorSubjects
- **UI Components**: Custom-built components with Material Design principles
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Jobaptly/Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/           # Application header with navigation
│   │   ├── footer/           # Footer with links and branding
│   │   ├── job-swipe/        # Main swipe interface
│   │   ├── job-list/         # Job browsing and filtering
│   │   ├── resume-upload/    # Resume upload and analysis
│   │   ├── job-card/         # Individual job card component
│   │   └── fit-score/        # Fit score display component
│   ├── services/
│   │   ├── job.service.ts    # Job data management
│   │   ├── resume.service.ts # Resume handling
│   │   └── ai-analysis.service.ts # AI analysis logic
│   └── models/
│       ├── job.model.ts      # Job data interfaces
│       └── resume.model.ts   # Resume data interfaces
```

## 🎯 Usage

### Getting Started
1. **Upload Your Resume**: Use the resume upload section to add your resume
2. **Browse Jobs**: View available jobs in the job list or swipe interface
3. **Swipe to Apply**: Use swipe gestures to apply or save jobs
4. **View Analysis**: Check AI-powered fit scores and recommendations

### Swipe Gestures
- **Swipe Right**: Apply to the job
- **Swipe Left**: Save the job for later
- **Tap Buttons**: Alternative to swipe gestures

### Job Filtering
- **Search**: Filter by job title
- **Location**: Filter by specific locations
- **Experience**: Filter by experience level
- **Job Type**: Filter by employment type

## 🎨 Design System

### Color Palette
- **Primary**: `#667eea` to `#764ba2` (Gradient)
- **Success**: `#28a745`
- **Warning**: `#ff9800`
- **Error**: `#f44336`
- **Neutral**: `#6c757d`

### Typography
- **Font Family**: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Headings**: Bold weights with proper hierarchy
- **Body Text**: Regular weight with good line height

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with smooth scrolling

## 🔧 Development

### Building for Production
```bash
ng build --configuration production
```

### Running Tests
```bash
ng test
```

### Code Style
- Follow Angular style guide
- Use TypeScript strict mode
- Implement proper error handling
- Write meaningful component and service names

## 🚀 Future Enhancements

### Planned Features
- **Real-time Notifications**: Job application status updates
- **Advanced Analytics**: Detailed application tracking
- **Company Profiles**: Enhanced company information
- **Interview Scheduling**: Integrated calendar functionality
- **Cover Letter Generator**: AI-powered cover letter creation

### Technical Improvements
- **Backend Integration**: Real API endpoints
- **Authentication**: User login and registration
- **Database**: Persistent data storage
- **Real AI Integration**: Advanced machine learning models
- **PWA Features**: Offline functionality and app-like experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Angular team for the excellent framework
- Material Design for design inspiration
- The open-source community for various tools and libraries

---

**Jobaptly** - Making job applications smarter, one swipe at a time! 💼✨
