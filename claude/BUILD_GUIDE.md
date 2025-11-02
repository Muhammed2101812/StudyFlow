# 📦 StudyFlow Build & Distribution Guide

Complete guide for building and distributing StudyFlow across Windows, macOS, and Linux platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Development Setup](#development-setup)
- [Building for Production](#building-for-production)
- [Platform-Specific Builds](#platform-specific-builds)
- [Testing Builds](#testing-builds)
- [Troubleshooting](#troubleshooting)
- [Release Process](#release-process)

---

## Prerequisites

### Required Software
- **Node.js:** 18.x or higher
- **npm:** 9.x or higher
- **Git:** Latest version

### Platform-Specific Requirements

#### Windows
- **OS:** Windows 10/11 (64-bit)
- **Additional:** None (all tools included in npm packages)

#### macOS
- **OS:** macOS 10.15 (Catalina) or higher
- **Xcode:** Xcode Command Line Tools
  ```bash
  xcode-select --install
  ```

#### Linux
- **OS:** Ubuntu 18.04+ or equivalent
- **Dependencies:**
  ```bash
  sudo apt-get install -y libgtk-3-0 libnotify4 libnss3 libxtst6 xdg-utils libatspi2.0-0 libdrm2 libgbm1 libxcb-dri3-0
  ```

---

## Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/studyflow.git
cd studyflow
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- React and React Router
- Electron and electron-builder
- Vite and plugins
- Tailwind CSS
- Recharts, date-fns, lucide-react
- All other dependencies

### 3. Verify Installation
```bash
npm run dev
```

The application should open in an Electron window with DevTools enabled.

---

## Building for Production

### Step 1: Prepare Icons

Before building, ensure you have proper application icons:

1. **Create icons** (see `public/ICON_INSTRUCTIONS.md`)
   - Source: 512x512 PNG with transparency
   - Windows: Convert to ICO (256x256, 128, 64, 48, 32, 16)
   - macOS: Convert to ICNS (512x512, 256, 128, 64, 32, 16)
   - Linux: Use PNG (512x512)

2. **Place icons in `public/` directory:**
   ```
   public/
   ├── icon.png   (512x512 - source/Linux)
   ├── icon.ico   (Windows multi-res)
   └── icon.icns  (macOS multi-res)
   ```

### Step 2: Update Version

Edit `package.json`:
```json
{
  "name": "studyflow",
  "version": "1.0.0",  // <- Update this
  ...
}
```

### Step 3: Update CHANGELOG

Add release notes to `CHANGELOG.md`:
```markdown
## [1.0.0] - 2025-11-02

### Added
- Feature 1
- Feature 2
...
```

### Step 4: Run Vite Build

```bash
npm run build
```

This creates:
- `dist/` - Compiled frontend (HTML, CSS, JS)
- `dist-electron/` - Compiled Electron main and preload

**Output:**
```
dist/
├── index.html
└── assets/
    ├── index-[hash].css
    └── index-[hash].js

dist-electron/
├── main.js
└── preload.js
```

---

## Platform-Specific Builds

### Windows Build (NSIS Installer)

```bash
npm run package:win
```

**Output:** `release/StudyFlow-Setup-1.0.0.exe`

**What it creates:**
- NSIS-based installer (.exe)
- User can choose installation directory
- Desktop shortcut created
- Start Menu shortcut created
- Includes uninstaller

**File size:** ~150-200 MB (includes Electron runtime)

**Configuration:** `electron-builder.json` > `win` section

---

### macOS Build (DMG)

**Requirements:** Must be built on macOS

```bash
npm run package:mac
```

**Output:** `release/StudyFlow-1.0.0.dmg`

**What it creates:**
- DMG disk image
- Drag-to-install experience
- Code signing (if configured)
- Notarization (if configured)

**File size:** ~150-200 MB

**Configuration:** `electron-builder.json` > `mac` section

**Note:** For distribution outside your organization, you need:
- Apple Developer ID
- Code signing certificate
- Notarization setup

---

### Linux Build (AppImage)

```bash
npm run package:linux
```

**Output:** `release/StudyFlow-1.0.0.AppImage`

**What it creates:**
- Self-contained AppImage
- Works on most Linux distros
- No installation required
- Portable executable

**File size:** ~150-200 MB

**Configuration:** `electron-builder.json` > `linux` section

**Running:**
```bash
chmod +x StudyFlow-1.0.0.AppImage
./StudyFlow-1.0.0.AppImage
```

---

### Build All Platforms (Sequential)

⚠️ **Note:** macOS builds can only be created on macOS

```bash
# Build for current platform
npm run package

# Build Vite only (no packaging)
npm run build

# Build with electron-builder only (assumes Vite build is done)
npm run build:electron
```

---

## Testing Builds

### Pre-Release Checklist

- [ ] Version number updated in `package.json`
- [ ] CHANGELOG.md updated with release notes
- [ ] All icons present in `public/` directory
- [ ] No console errors in dev mode
- [ ] All features tested manually
- [ ] Critical bugs fixed
- [ ] Git repository clean (no uncommitted changes)

### Testing Windows Build

1. **Install:**
   ```
   Double-click StudyFlow-Setup-1.0.0.exe
   Follow installer prompts
   ```

2. **Verify:**
   - [ ] Application installs successfully
   - [ ] Desktop shortcut works
   - [ ] Start Menu entry exists
   - [ ] Application launches
   - [ ] Icon displays correctly
   - [ ] All features work
   - [ ] No console errors

3. **Test Uninstall:**
   - [ ] Windows Settings > Apps > StudyFlow > Uninstall
   - [ ] Uninstaller runs successfully
   - [ ] Application removed from Programs

### Testing macOS Build

1. **Install:**
   ```
   Double-click StudyFlow-1.0.0.dmg
   Drag StudyFlow to Applications folder
   ```

2. **Verify:**
   - [ ] Application opens (may need "Open Anyway" on first run)
   - [ ] Icon displays in Dock
   - [ ] All features work
   - [ ] No security warnings (if code signed)

3. **First Run Security:**
   - If not code-signed, users must:
     - Right-click app > Open
     - Click "Open" in security dialog

### Testing Linux Build

1. **Make executable:**
   ```bash
   chmod +x StudyFlow-1.0.0.AppImage
   ```

2. **Run:**
   ```bash
   ./StudyFlow-1.0.0.AppImage
   ```

3. **Verify:**
   - [ ] Application launches
   - [ ] All features work
   - [ ] Desktop integration works (icon, name)

---

## Troubleshooting

### Build Fails: "Cannot find module"

**Solution:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

### Build Fails: Icon not found

**Error:** `Error: Cannot find icon at public/icon.ico`

**Solution:**
1. Check that icon files exist:
   ```bash
   ls public/icon.*
   ```
2. Ensure files are named correctly:
   - `icon.ico` (Windows)
   - `icon.icns` (macOS)
   - `icon.png` (Linux/source)

### Windows: "Application is not signed"

**Issue:** Windows SmartScreen warning on first run

**Solution:**
- For development: Click "More info" > "Run anyway"
- For distribution: Get code signing certificate

**To sign:**
1. Obtain code signing certificate
2. Configure in `electron-builder.json`:
   ```json
   "win": {
     "certificateFile": "path/to/cert.pfx",
     "certificatePassword": "password"
   }
   ```

### macOS: "App is damaged and can't be opened"

**Issue:** Gatekeeper blocking unsigned app

**Solution for developers:**
```bash
xattr -cr /Applications/StudyFlow.app
```

**For distribution:** Code sign and notarize

### Large Bundle Size Warning

**Warning:** `Some chunks are larger than 500 kB after minification`

**Current:** ~700KB (acceptable for desktop app)

**To optimize (optional):**
1. Code splitting:
   ```javascript
   const Dashboard = lazy(() => import('./pages/DashboardPage'));
   ```

2. Dynamic imports for heavy components

3. Configure in `vite.config.js`:
   ```javascript
   build: {
     rollupOptions: {
       output: {
         manualChunks: {
           'react-vendor': ['react', 'react-dom'],
           'recharts-vendor': ['recharts']
         }
       }
     }
   }
   ```

### Electron Version Mismatch

**Error:** `Electron version mismatch`

**Solution:**
```bash
npm rebuild electron
```

---

## Release Process

### 1. Pre-Release

```bash
# Ensure clean state
git status

# Update version
# Edit package.json: "version": "1.0.0"

# Update CHANGELOG.md
# Add release notes for new version

# Commit changes
git add .
git commit -m "chore: Prepare v1.0.0 release"
```

### 2. Build

```bash
# Clean previous builds
rm -rf release/
rm -rf dist/
rm -rf dist-electron/

# Build for Windows
npm run package:win

# Build for macOS (on macOS only)
npm run package:mac

# Build for Linux
npm run package:linux
```

### 3. Create Git Tag

```bash
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0
git push origin master
```

### 4. Create GitHub Release

1. Go to GitHub repository > Releases
2. Click "Draft a new release"
3. Select tag: `v1.0.0`
4. Release title: `StudyFlow v1.0.0`
5. Description: Copy from CHANGELOG.md
6. Upload binaries:
   - `StudyFlow-Setup-1.0.0.exe` (Windows)
   - `StudyFlow-1.0.0.dmg` (macOS)
   - `StudyFlow-1.0.0.AppImage` (Linux)
7. Click "Publish release"

### 5. Distribution

**Windows:**
- Upload .exe to website/storage
- Users download and run installer

**macOS:**
- Upload .dmg to website/storage
- Recommend users drag to Applications

**Linux:**
- Upload .AppImage to website/storage
- Provide instructions: `chmod +x && ./StudyFlow*.AppImage`

---

## Build Configuration

### electron-builder.json

```json
{
  "appId": "com.studyflow.app",
  "productName": "StudyFlow",
  "directories": {
    "output": "release",
    "buildResources": "public"
  },
  "files": [
    "dist/**/*",
    "dist-electron/**/*",
    "package.json"
  ],
  "win": {
    "target": ["nsis"],
    "arch": ["x64"],
    "icon": "public/icon.ico"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "StudyFlow"
  },
  "mac": {
    "target": ["dmg"],
    "icon": "public/icon.icns",
    "category": "public.app-category.education"
  },
  "linux": {
    "target": ["AppImage"],
    "icon": "public/icon.png",
    "category": "Education"
  }
}
```

### Package Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:electron": "electron-builder",
    "package": "npm run build && electron-builder",
    "package:win": "npm run build && electron-builder --win",
    "package:mac": "npm run build && electron-builder --mac",
    "package:linux": "npm run build && electron-builder --linux"
  }
}
```

---

## Continuous Integration (Optional)

### GitHub Actions Example

Create `.github/workflows/build.yml`:

```yaml
name: Build

on:
  push:
    tags:
      - 'v*'

jobs:
  build-windows:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run package:win
      - uses: actions/upload-artifact@v3
        with:
          name: windows-build
          path: release/*.exe

  build-macos:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run package:mac
      - uses: actions/upload-artifact@v3
        with:
          name: macos-build
          path: release/*.dmg

  build-linux:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run package:linux
      - uses: actions/upload-artifact@v3
        with:
          name: linux-build
          path: release/*.AppImage
```

---

## Performance Benchmarks

### Build Times (on mid-range hardware)
- Vite build: ~7 seconds
- Windows package: ~2-3 minutes
- macOS package: ~3-4 minutes
- Linux package: ~2-3 minutes

### Output Sizes
- Windows installer: ~150 MB
- macOS DMG: ~180 MB
- Linux AppImage: ~160 MB
- Installed size: ~400 MB (includes Electron runtime)

---

## Security Considerations

### Code Signing
- **Windows:** Authenticode certificate (~$100/year)
- **macOS:** Apple Developer ID ($99/year)
- **Linux:** Not required

### Auto-Updates
StudyFlow v1.0 does not include auto-update functionality.

For v2.0, consider:
- electron-updater
- Update server setup
- Delta updates

---

## Support & Resources

### Documentation
- Electron Builder: https://www.electron.build/
- Vite: https://vitejs.dev/
- Electron: https://www.electronjs.org/

### Community
- GitHub Issues: Report bugs and request features
- Discord: [Link to Discord server]

---

**Last Updated:** 2025-11-02
**Version:** 1.0.0
**Maintainer:** StudyFlow Team
