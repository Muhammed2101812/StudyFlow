# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-11-02

**Status:** ✅ Production Ready - All critical bugs fixed

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
    - Multiple question sets per session (optional)
    - Net calculation (with/without penalty)
    - Notes and completion status
  - **Multiple study sessions per day support**
  - UUID-based unique identification for each session
  - Study history with edit/delete per session
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

### Fixed - Critical Bug Fixes (12 Total)

**Bug #1-7:** Core Service Layer Async Issues
- Fixed async/await patterns in all service methods (userService, examService, progressService, planService)
- Added array validation to prevent undefined/null iterations
- Fixed import path errors for hooks
- **Impact:** Resolved all application crashes on initial load

**Bug #8:** Plans Not User-Specific
- Modified planService to accept userId parameter
- Each user now has isolated plan data
- **Impact:** Multi-user data isolation working correctly

**Bug #9:** Toast Notifications Not Working
- Added showToast backward compatibility wrapper
- Fixed ExamForm, ExamList, StatsPage toast errors
- **Impact:** All user feedback notifications working

**Bug #10:** Duplicate Plan Key Warning
- Automatically resolved with Bug #8 fix
- **Impact:** Console warnings eliminated

**Bug #11:** Export Service Crash
- Added await to async service calls in exportService
- Added array validation before reduce operations
- **Impact:** JSON export fully functional

**Bug #12:** Study Logs Overwriting Same Day Entries ⚠️ CRITICAL DATA LOSS
- Added UUID to every study log entry
- Changed date-based identification to ID-based
- Redesigned UI to show multiple logs per day
- Made question sets optional
- **Impact:** Users can now add unlimited study sessions per day without data loss

**Bug Verification:** All 12 bugs tested and verified fixed. See BUG_REPORT.md for details.

### Known Limitations
- Windows-only thoroughly tested (MVP)
- Turkish language UI only
- No cloud sync (local data only)
- Manual backup required (JSON export)
- Default Electron icon used (custom icon recommended for v1.1)

### Performance
- Build size: 704.82 KB JS bundle (gzipped: 199.79 KB)
- Main process: 281.19 KB (gzipped: 87.18 KB)
- Fast startup time (<3 seconds)
- Smooth 60fps animations
- Efficient re-renders with React.memo

### Build & Distribution
- **Windows Installer:** StudyFlow Setup 1.0.0.exe (79 MB)
- NSIS installer with custom installation options
- Portable unpacked version available
- Installer tested on Windows 10/11
- All dependencies bundled

### Development
- 10 Sprints completed (76 hours estimated, ~80 hours actual)
- 150+ granular tasks completed
- 12 critical bugs found and fixed during testing
- Git-based version control with 30+ commits
- Comprehensive testing with FINAL_TEST_CHECKLIST.md
- Incremental development with user testing feedback

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

### Planned for v1.1 (Minor Enhancements)
- Custom application icon (replace default Electron icon)
- Additional study plan templates (TYT, AYT, DGS, ALES)
- Multi-format export (Excel, PDF, CSV in addition to JSON)
- Study session notes search functionality
- Enhanced calendar view with month navigation
- Performance optimizations
- Bug fixes based on user feedback
- UI polish and refinements
- macOS and Linux build testing
