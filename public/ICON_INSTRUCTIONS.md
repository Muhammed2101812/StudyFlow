# StudyFlow Icon Instructions

## Current Status
⚠️ **Icon placeholder files need to be replaced with actual graphics before final distribution.**

## Required Icon Files

### Windows (.ico)
- **Location:** `public/icon.ico`
- **Required sizes:** 256x256, 128x128, 64x64, 48x48, 32x32, 16x16
- **Format:** ICO (multi-resolution)

### macOS (.icns)
- **Location:** `public/icon.icns`
- **Required sizes:** 512x512, 256x256, 128x128, 64x64, 32x32, 16x16
- **Format:** ICNS

### Linux (.png)
- **Location:** `public/icon.png`
- **Size:** 512x512
- **Format:** PNG with transparency

## Icon Design Guidelines

### Theme
- **Concept:** Study planning and progress tracking
- **Suggested imagery:**
  - Open book with checkmark/progress indicator
  - Calendar with study symbols
  - Brain with organizational elements
  - Minimalist academic symbols

### Colors
- **Primary:** Blue (#3B82F6) - StudyFlow brand color
- **Secondary:** White/Light gray
- **Accent:** Green (#10B981) - success/progress
- **Style:** Flat design, modern, clean

### Technical Requirements
- **Resolution:** Start with 1024x1024 or 512x512
- **Transparency:** Use transparent background
- **Visibility:** Must be recognizable at 16x16 (smallest size)
- **Format:** PNG for source, convert to ICO/ICNS

## How to Create Icons

### Option 1: Design Tools
1. Use Figma, Adobe Illustrator, or Inkscape
2. Create 512x512 design with transparent background
3. Export as PNG

### Option 2: Online Tools
- **Canva:** https://www.canva.com/
- **Flaticon:** https://www.flaticon.com/ (find and customize)
- **IconScout:** https://iconscout.com/

### Option 3: AI Generation
- Use DALL-E, Midjourney, or similar tools
- Prompt: "Modern flat design app icon for study planning application, blue and white colors, minimalist book or calendar symbol, 512x512, transparent background"

## Convert PNG to Required Formats

### Windows ICO
**Online Tools:**
- https://convertio.co/png-ico/
- https://www.icoconverter.com/

**Command Line (ImageMagick):**
```bash
convert icon.png -define icon:auto-resize=256,128,64,48,32,16 icon.ico
```

### macOS ICNS
**Command Line (macOS only):**
```bash
mkdir icon.iconset
sips -z 16 16     icon.png --out icon.iconset/icon_16x16.png
sips -z 32 32     icon.png --out icon.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out icon.iconset/icon_32x32.png
sips -z 64 64     icon.png --out icon.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out icon.iconset/icon_128x128.png
sips -z 256 256   icon.png --out icon.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out icon.iconset/icon_256x256.png
sips -z 512 512   icon.png --out icon.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out icon.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out icon.iconset/icon_512x512@2x.png
iconutil -c icns icon.iconset
mv icon.icns public/
```

**Online Tools:**
- https://cloudconvert.com/png-to-icns
- https://iconverticons.com/online/

## Installation Steps

1. Create or obtain your 512x512 PNG icon
2. Place the source PNG in `public/icon.png`
3. Convert to ICO format for Windows
4. Convert to ICNS format for macOS (if targeting macOS)
5. Place converted files in `public/` directory:
   - `public/icon.ico` (Windows)
   - `public/icon.icns` (macOS)
   - `public/icon.png` (Linux/source)
6. Rebuild the application: `npm run package`

## Testing

After adding icons:
1. Build the application: `npm run package:win`
2. Check the generated executable in `release/` folder
3. Verify icon appears correctly in:
   - Application window title bar
   - Windows taskbar
   - Desktop shortcut
   - Start menu
   - Application installer

## Current Placeholder

The current `icon.png` is a text placeholder. **You must replace it with an actual graphic icon before distributing the application.**

## Example Icons (for inspiration)

- Simple book icon with a checkmark
- Calendar grid with progress markers
- Graduation cap with checkmark
- Study desk with organized items
- Brain with circuit/connection lines

## License Considerations

If using pre-made icons:
- Ensure you have proper license (commercial use allowed)
- Credit the designer if required by license
- Consider creating original artwork to avoid licensing issues

## Need Help?

For professional icon design, consider:
- **Fiverr:** Affordable freelance designers
- **99designs:** Icon design contests
- **Upwork:** Professional designers
- **DIY:** Use Canva templates and customize

---

**Last Updated:** 2025-11-02
**Status:** 🔴 Placeholder - Awaiting actual icon graphics
