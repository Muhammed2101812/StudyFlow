# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-02

### Added - Core Features
- **Multi-User System**
  - User profile creation with avatar support (18 avatar options)
  - User switching and management
  - Per-user data isolation
  - Profile editing and deletion with confirmation

- **Study Plan Management**
  - JSON-based study plan import system
  - Plan validation and error handling
  - Multiple plan support per user
  - Active plan switching
  - Pre-built plan templates:
    - KPSS 2026 Detailed Plan (57 weeks, 6 subjects)
    - KPSS 2026 Sample Plan
    - YKS 2026 Sample Plan

- **Dashboard**
  - Today's program from active plan
  - Weekly summary with progress tracking
  - Exam countdown widget
  - Quick action buttons
  - Personalized greeting
  - Statistics overview cards

- **Study Log System**
  - Interactive calendar view
  - Daily study recording with:
    - Subject and topic tracking
    - Duration recording (hours)
    - Multiple question sets per session
    - Net calculation (with/without penalty)
    - Notes and completion status
  - Study history with edit/delete
  - Subject-specific color coding
  - Streak calculation

- **Mock Exam Management**
  - Comprehensive exam form (all KPSS subjects)
  - Automatic net calculation per subject
  - Empty question auto-calculation
  - Exam list with sorting and filtering
  - Detailed exam view modal
  - Performance charts:
    - Net progress line chart
    - Subject comparison bar chart
  - Weak topics analysis

- **Statistics & Analytics**
  - Overview statistics:
    - Total study hours
    - Total questions solved
    - Average net
    - Current streak and longest streak
    - Plan progress percentage
  - Subject-based analysis:
    - Per-subject performance cards
    - Success rate calculation
    - Strong/weak topic identification
    - Trend indicators
  - Visual charts:
    - Weekly net trend line chart
    - Subject comparison bar chart
    - Study hours area chart
  - Date range filtering
  - Data export to JSON

- **UI/UX Enhancements**
  - Responsive layout (1024x768 minimum)
  - Dark/light mode support
  - Toast notification system (4 variants)
  - Loading states and skeletons
  - Empty state illustrations
  - Confirmation modals for destructive actions
  - Error boundary for crash handling
  - Smooth animations and transitions
  - Accessibility features (ARIA labels, keyboard navigation)

### Technical Implementation
- **Frontend Stack**
  - React 18.2 with Hooks and Context API
  - React Router DOM 6.x for navigation
  - Tailwind CSS 3.x for styling
  - Recharts 2.x for data visualization
  - Lucide React for icons
  - date-fns for date manipulation

- **Desktop Framework**
  - Electron 28.x
  - Electron Store for data persistence
  - IPC communication for file operations
  - Context isolation for security

- **Build System**
  - Vite 5.x for fast development and builds
  - vite-plugin-electron for Electron integration
  - electron-builder for packaging
  - Support for Windows, macOS, and Linux builds

### Services & Architecture
- Storage Service (Electron Store wrapper)
- User Service (CRUD operations)
- Plan Service (import, validation, helpers)
- Progress Service (study log management, summaries, streak calculation)
- Exam Service (CRUD, analysis, trends)
- Stats Service (overview, subject stats, trends, weak topics)
- Export Service (JSON export for backup)

### Utilities
- Net calculation (with/without penalty)
- Date helpers (formatting, ranges, comparisons)
- Validators (forms, plans, inputs)
- Formatters (numbers, dates, subjects)
- Constants (subject colors, question counts)

### Bug Fixes (Sprint 9)
- Fixed `useUser` import path errors in multiple components
- Fixed Modal input focus issue preventing user input
- Fixed async operation errors in userService (users.push)
- Fixed "exams is not iterable" errors in examService and useExams
- Fixed planService async operations causing import crashes
- Fixed progressService and statsService async operations

### Documentation
- Comprehensive README with usage instructions
- CLAUDE.md for AI assistant guidance
- TASKS.md with detailed sprint breakdown (150+ tasks)
- ICON_INSTRUCTIONS.md for icon creation guide
- Plan template documentation
- Build and distribution guide

### Build & Distribution
- Windows NSIS installer (.exe)
- macOS DMG package
- Linux AppImage
- Configurable installation directory
- Desktop and Start Menu shortcuts
- Auto-uninstaller

### Known Limitations
- Windows-only thoroughly tested (MVP)
- Turkish language UI only
- No cloud sync (local data only)
- Manual backup required (JSON export)
- Icon placeholders (need actual graphics before distribution)

### Performance
- Build size: ~700KB JS bundle (gzipped: ~200KB)
- Fast startup time (<3 seconds)
- Smooth 60fps animations
- Efficient re-renders with React.memo

### Development
- 10 Sprints completed (76 hours estimated, ~80 hours actual)
- 150+ granular tasks completed
- Git-based version control
- Incremental development with testing

---

## [Unreleased]

### Planned for v2.0
- Multi-language support (English, Turkish)
- Cloud sync and backup
- Mobile companion app
- Advanced analytics (ML-based predictions)
- Study timer with Pomodoro technique
- Custom plan creator (GUI-based)
- Social features (study groups, leaderboards)
- Dark theme improvements
- PDF export for reports
- Study reminders and notifications

### Planned for v1.1 (Bug Fixes & Minor Enhancements)
- Icon graphics (replace placeholders)
- Additional study plan templates (TYT, AYT, DGS, ALES)
- Performance optimizations
- Bug fixes based on user feedback
- UI polish and refinements
