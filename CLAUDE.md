# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**StudyFlow** is a desktop application for students to plan exam preparation, track daily study sessions, and analyze mock exam performance. Built with Electron + React + Vite + Tailwind CSS for Windows (with future macOS/Linux support).

**Target Users:** Students preparing for LGS, YKS, KPSS, and other standardized exams in Turkey.

**Core Features:**
- Multi-user profiles with avatar support
- JSON-based study plan import system
- Daily study tracking (subjects, duration, question counts)
- Mock exam management with detailed analytics
- Progress statistics and visualizations
- Offline-first with local data persistence

## Technology Stack

- **Desktop Framework:** Electron 28.x with Electron Store for persistence
- **Frontend:** React 18.2 with React Router DOM 6.x and Context API
- **Build Tool:** Vite 5.x with vite-plugin-electron
- **Styling:** Tailwind CSS 3.x with Lucide React icons
- **Charts:** Recharts 2.x for data visualization
- **Utilities:** date-fns, clsx, uuid

## Development Commands

### Setup and Installation
```bash
npm install                    # Install all dependencies
```

### Development
```bash
npm run dev                    # Start development server with hot reload
                              # Opens Electron window with DevTools
```

### Building
```bash
npm run build                  # Build Vite bundle for production
npm run build:electron         # Package Electron app with electron-builder
npm run package                # Full build + package workflow
```

### Code Quality
```bash
npm run lint                   # Run ESLint
npm run format                 # Run Prettier
```

## Project Architecture

### Directory Structure
```
src/
├── main/                      # Electron main process
│   ├── main.js               # Window management, IPC handlers
│   ├── preload.js            # IPC bridge (contextBridge)
│   └── menu.js               # Application menu
│
├── renderer/                  # React application
│   ├── components/           # React components organized by feature
│   │   ├── layout/          # Navbar, Sidebar, Layout
│   │   ├── dashboard/       # TodayProgram, WeeklySummary
│   │   ├── study/           # StudyLogForm, Calendar
│   │   ├── exams/           # ExamForm, ExamList, ExamChart
│   │   ├── stats/           # OverviewStats, TrendChart
│   │   ├── user/            # UserSelect, CreateUser
│   │   └── common/          # Button, Input, Modal, Toast
│   │
│   ├── pages/               # Top-level route components
│   │   ├── UserSelectPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── StudyLogPage.jsx
│   │   ├── ExamsPage.jsx
│   │   ├── StatsPage.jsx
│   │   └── SettingsPage.jsx
│   │
│   ├── contexts/            # React Context providers
│   │   ├── UserContext.jsx  # Current user, user list
│   │   └── PlanContext.jsx  # Current plan, plan data
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useUser.js
│   │   ├── usePlan.js
│   │   ├── useProgress.js
│   │   ├── useExams.js
│   │   └── useStats.js
│   │
│   ├── services/            # Business logic layer
│   │   ├── storageService.js   # Electron Store wrapper
│   │   ├── userService.js      # CRUD for users
│   │   ├── planService.js      # Plan import/validation
│   │   ├── progressService.js  # Study log management
│   │   ├── examService.js      # Mock exam management
│   │   └── exportService.js    # Data export to JSON
│   │
│   └── utils/               # Pure utility functions
│       ├── calculations.js  # Net score calculations
│       ├── dateHelpers.js   # Date manipulation
│       ├── validators.js    # Form validation
│       ├── formatters.js    # Display formatting
│       └── constants.js     # App constants
│
└── assets/
    └── plans/               # Sample JSON study plans
        ├── kpss-2026.json
        ├── yks-2025.json
        └── lgs-2025.json
```

### Key Architectural Patterns

**Electron IPC Communication:**
- Main process handles file I/O and native dialogs via IPC channels
- Preload script exposes safe APIs through `contextBridge`
- Never enable `nodeIntegration` (security: contextIsolation enabled)

**Data Storage:**
- Electron Store for persistent local storage (JSON files)
- User data structure: `users/` array + per-user folders (`user_XXX/`)
- Each user has: `progress.json`, `exams.json`, `settings.json`
- Plans stored separately in `plans/` directory

**State Management:**
- React Context API for global state (UserContext, PlanContext)
- Custom hooks wrap contexts for easier consumption
- Services layer handles all data operations
- UI components stay pure and receive data via props/context

**Component Design:**
- Common components are reusable and unstyled (variants via props)
- Page components compose smaller components
- Form state managed with controlled components
- Loading/error states handled consistently

## Data Models

### Study Plan JSON Structure
Plans are imported from JSON files with this structure:
```json
{
  "id": "kpss-2026",
  "name": "KPSS 2026 Hazırlık Planı",
  "examDate": "2026-07-12",
  "subjects": ["Türkçe", "Matematik", "Tarih", "Coğrafya", "Vatandaşlık", "Güncel"],
  "stages": [
    {
      "name": "Konu Anlatımı",
      "weeks": [
        {
          "weekNumber": 1,
          "days": [
            {
              "day": "Pazartesi",
              "subject": "Matematik",
              "topic": "Temel Kavramlar",
              "duration": 3,
              "targetQuestions": 50
            }
          ]
        }
      ]
    }
  ]
}
```

### Progress Data Structure
```json
{
  "date": "2025-11-01",
  "topic": "Matematik - Temel Kavramlar",
  "duration": 2.5,
  "questionSets": [
    {
      "subject": "Matematik",
      "correct": 45,
      "wrong": 5,
      "penaltyEnabled": true,
      "net": 43.75
    }
  ],
  "completed": true,
  "notes": "Konuyu tamamladım"
}
```

### Exam Data Structure
```json
{
  "id": "uuid",
  "date": "2025-11-01",
  "name": "Ösym Tarz Deneme 1",
  "publisher": "X Yayınevi",
  "duration": 135,
  "penaltyEnabled": true,
  "results": {
    "Türkçe": { "correct": 25, "wrong": 3, "empty": 2, "net": 24.25 },
    "Matematik": { "correct": 28, "wrong": 2, "empty": 0, "net": 27.5 }
  },
  "totalNet": 95.75,
  "weakTopics": ["Geometri", "Osmanlı Tarihi"],
  "notes": "Zaman yönetimi iyi gitti"
}
```

## Net Score Calculation

The application uses two calculation modes:

**With Penalty (yanlış siler):**
```javascript
net = correct - (wrong / 4)
```

**Without Penalty:**
```javascript
net = correct
```

This is handled in `utils/calculations.js`:
```javascript
export function calculateNet(correct, wrong, penaltyEnabled) {
  if (!penaltyEnabled) return correct;
  return correct - (wrong / 4);
}
```

## Important Implementation Notes

### Data Persistence
- All user data stored locally via Electron Store
- Storage path: `%APPDATA%/StudyFlow/` (Windows)
- Never expose sensitive file system paths to renderer
- Always validate imported JSON against schema before processing

### Form Validation
- All forms must validate on both onChange and onSubmit
- Required fields: date, subject, question counts
- Business rules:
  - Question counts must be non-negative
  - correct + wrong ≤ total questions
  - Duration: 0-24 hours
  - Future dates not allowed for study logs

### Multi-User System
- Users have UUID identifiers (generated with `uuid` library)
- User switching updates currentUser in UserContext
- All data operations scoped to currentUser.id
- Last active user stored for auto-login

### Plan System
- Plans validated on import (see `planService.validate()`)
- Multiple plans can exist, one active per user
- "Today's program" calculated by comparing current date with plan schedule
- Sundays/Mondays are rest days (no program)

### UI/UX Standards
- Turkish language interface
- Tailwind utility classes for styling
- Consistent spacing: 4px base unit (Tailwind's spacing scale)
- Color scheme: Blue primary (#3B82F6), semantic colors for states
- Subject-specific colors (see constants.js):
  - Türkçe: Red (#EF4444)
  - Matematik: Blue (#3B82F6)
  - Tarih: Purple (#8B5CF6)
  - Coğrafya: Green (#10B981)
  - Vatandaşlık: Orange (#F59E0B)
  - Güncel: Gray (#6B7280)

### Error Handling
- All service methods return `{ success, data, error }` objects
- UI shows errors via Toast notifications
- Never expose technical errors to users (use friendly Turkish messages)
- Log errors to console in development mode

### Accessibility
- Target: WCAG 2.1 AA compliance
- Keyboard navigation required for all interactive elements
- ARIA labels on all buttons and form inputs
- Focus indicators visible (Tailwind's `focus:ring` utilities)
- Minimum contrast ratio: 4.5:1 for text

## Development Workflow

### Sprint-Based Development
The project follows a 10-sprint plan (see TASKS.md):
1. Sprint 1: Infrastructure and basic structure
2. Sprint 2: User management
3. Sprint 3: Plan management
4. Sprint 4: Dashboard
5. Sprint 5: Study tracking
6. Sprint 6: Mock exams
7. Sprint 7: Statistics and reporting
8. Sprint 8: UI polish and UX improvements
9. Sprint 9: Testing and bug fixing
10. Sprint 10: Build and distribution

Each sprint has completion criteria and specific tasks.

### Git Workflow
- Commit after completing each task
- Use meaningful commit messages in English
- Tag sprints: `sprint-1`, `sprint-2`, etc.
- Never commit `node_modules/`, `dist/`, `release/`

### Testing Approach
- Manual testing for MVP (no automated tests required initially)
- Test scenarios defined in Sprint 9
- Critical paths: user creation, plan import, study logging, exam recording
- Edge cases: empty states, boundary values, data integrity

## Build and Distribution

### Windows Packaging
- Uses electron-builder with NSIS installer
- Target: Windows 10/11 x64
- Installer creates desktop shortcut and start menu entry
- App icon: 512x512 PNG converted to ICO format
- Output: `release/StudyFlow-Setup-1.0.0.exe`

### Build Configuration
electron-builder.json:
```json
{
  "appId": "com.studyflow.app",
  "productName": "StudyFlow",
  "directories": { "output": "release" },
  "win": {
    "target": "nsis",
    "arch": ["x64"],
    "icon": "public/icon.ico"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true
  }
}
```

## Common Development Tasks

### Adding a New Page
1. Create page component in `src/renderer/pages/`
2. Add route in `src/renderer/router.jsx`
3. Add navigation link in `Sidebar.jsx`
4. Create any page-specific components in `src/renderer/components/[feature]/`

### Adding a New Data Service
1. Create service in `src/renderer/services/`
2. Follow pattern: CRUD methods returning `{ success, data, error }`
3. Use `storageService` for all Electron Store operations
4. Create corresponding custom hook in `src/renderer/hooks/`

### Implementing a Form
1. Use controlled components (useState for form state)
2. Validate on onChange and onSubmit
3. Show inline errors below inputs
4. Disable submit button when invalid
5. Show loading state during submission
6. Toast notification on success/error

### Creating Charts
1. Use Recharts components (LineChart, BarChart, etc.)
2. Ensure responsive sizing with ResponsiveContainer
3. Apply subject colors from constants
4. Include Tooltip for data points
5. Format axes with date-fns for dates, formatters for numbers

## Known Constraints

- **Windows-only for MVP:** macOS/Linux support planned for v2.0
- **No cloud sync:** All data local (cloud sync in v3.0)
- **Turkish language only:** i18n planned for future versions
- **No automated backups:** User must manually export data
- **Minimum screen resolution:** 1024x768

## Reference Documents

- **STUDYFLOW_PROJECT_PLAN.md:** Complete technical specification, UI design, data models
- **TASKS.md:** Sprint breakdown with 150+ granular tasks
- Both documents are in Turkish and provide comprehensive implementation details

## Getting Help

When implementing features:
1. Check TASKS.md for specific task requirements
2. Reference STUDYFLOW_PROJECT_PLAN.md for technical details
3. Follow the established patterns in services and components
4. Maintain consistency with existing UI components
