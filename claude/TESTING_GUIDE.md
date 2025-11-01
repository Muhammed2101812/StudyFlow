# StudyFlow - Manual Testing Guide

## Sprint 9: Testing and Bug Fixing

**Date:** 01 Kasım 2025
**Version:** 1.0.0 MVP
**Tester:** _[Your Name]_

---

## Testing Environment

- **OS:** Windows 10/11
- **Node Version:** v18+
- **Electron Version:** 28.x
- **Screen Resolution:** 1280x800 minimum

---

## Pre-Testing Checklist

- [ ] Application opens without errors
- [ ] DevTools console is visible (development mode)
- [ ] No critical errors in console
- [ ] Window is properly sized (1280x800)
- [ ] All UI elements are visible

---

## Test Suite 1: User Management

### Test 1.1: Create First User
**Steps:**
1. Launch the application (should show UserSelectPage)
2. Click "Yeni Kullanıcı" button
3. Enter name: "Test Kullanıcı 1"
4. Select an avatar (any emoji)
5. Click "Oluştur" button

**Expected Results:**
- [ ] Modal opens smoothly
- [ ] Name input accepts text
- [ ] Avatar selection highlights chosen avatar
- [ ] Success toast appears: "Kullanıcı başarıyla oluşturuldu"
- [ ] Modal closes
- [ ] User is automatically logged in
- [ ] Dashboard page loads

**Bugs Found:** _[Note any issues]_

---

### Test 1.2: Create Second User
**Steps:**
1. Click user avatar in navbar
2. Click "Çıkış Yap"
3. Click "Yeni Kullanıcı"
4. Enter name: "Test Kullanıcı 2"
5. Select different avatar
6. Click "Oluştur"

**Expected Results:**
- [ ] Returns to UserSelectPage
- [ ] Two user cards visible
- [ ] New user created successfully
- [ ] Auto-login to new user

**Bugs Found:** _[Note any issues]_

---

### Test 1.3: Switch Users
**Steps:**
1. Return to UserSelectPage (logout)
2. Click on first user card

**Expected Results:**
- [ ] User switches successfully
- [ ] Dashboard loads with correct user name
- [ ] Navbar shows correct user avatar/name

**Bugs Found:** _[Note any issues]_

---

### Test 1.4: Edit User Profile
**Steps:**
1. Navigate to Ayarlar (Settings)
2. Change user name to "Updated Name"
3. Change avatar
4. Click "Kaydet"

**Expected Results:**
- [ ] Settings page loads
- [ ] Input fields show current values
- [ ] Changes save successfully
- [ ] Success toast appears
- [ ] Navbar updates with new name/avatar

**Bugs Found:** _[Note any issues]_

---

### Test 1.5: Delete User (with confirmation)
**Steps:**
1. In Settings, scroll to "Hesabı Sil" section
2. Click "Hesabı Sil" button
3. Confirm in modal
4. Verify return to UserSelectPage

**Expected Results:**
- [ ] Confirmation modal appears
- [ ] Modal warns about data deletion
- [ ] User is deleted after confirmation
- [ ] Returns to UserSelectPage
- [ ] Deleted user no longer appears

**Bugs Found:** _[Note any issues]_

---

### Test 1.6: Validation - Empty Name
**Steps:**
1. Try creating user with empty name
2. Try creating user with only spaces

**Expected Results:**
- [ ] Validation error message appears
- [ ] Submit button disabled or error shown
- [ ] User not created

**Bugs Found:** _[Note any issues]_

---

## Test Suite 2: Plan Management

### Test 2.1: Import Valid Plan
**Steps:**
1. Login as a user
2. Dashboard shows "Plan yok" state
3. Click "Plan İçe Aktar" button
4. Select file: `claude/src/assets/plans/kpss-2026.json`
5. Confirm import

**Expected Results:**
- [ ] File picker dialog opens
- [ ] JSON file can be selected
- [ ] Import succeeds with success toast
- [ ] Plan appears in navbar dropdown
- [ ] Dashboard shows today's program (if applicable)

**Bugs Found:** _[Note any issues]_

---

### Test 2.2: Import Invalid JSON
**Steps:**
1. Create a file with invalid JSON (malformed)
2. Try to import it

**Expected Results:**
- [ ] Error message appears
- [ ] Toast shows: "Geçersiz JSON formatı"
- [ ] Plan not imported

**Bugs Found:** _[Note any issues]_

---

### Test 2.3: Switch Between Plans
**Steps:**
1. Import second plan: `yks-2025.json`
2. Click plan dropdown in navbar
3. Select different plan

**Expected Results:**
- [ ] Both plans appear in dropdown
- [ ] Active plan is highlighted
- [ ] Switching updates dashboard
- [ ] Today's program updates accordingly

**Bugs Found:** _[Note any issues]_

---

### Test 2.4: Delete Plan
**Steps:**
1. Go to Settings > Plan Yönetimi
2. Find a plan and click "Sil"
3. Confirm deletion

**Expected Results:**
- [ ] Confirmation modal appears
- [ ] Plan deleted successfully
- [ ] Plan removed from dropdown
- [ ] If active plan deleted, switches to another or shows empty state

**Bugs Found:** _[Note any issues]_

---

## Test Suite 3: Study Log Functionality

### Test 3.1: Add Simple Study Log
**Steps:**
1. Navigate to "Çalışma Günlüğü"
2. Click on today's date in calendar
3. Fill form:
   - Konu: "Matematik - Temel Kavramlar"
   - Süre: 2 saat
   - Add question set:
     - Ders: Matematik
     - Doğru: 40
     - Yanlış: 10
     - Penalty: Checked
4. Click "Kaydet"

**Expected Results:**
- [ ] Form appears when date selected
- [ ] All fields accept input
- [ ] Net calculated automatically: 40 - (10/4) = 37.5
- [ ] Success toast appears
- [ ] Calendar updates with checkmark on today
- [ ] Form resets

**Bugs Found:** _[Note any issues]_

---

### Test 3.2: Net Calculation - Penalty Disabled
**Steps:**
1. Add study log with penalty checkbox UNCHECKED
2. Doğru: 30, Yanlış: 10

**Expected Results:**
- [ ] Net = 30 (wrong answers not deducted)

**Bugs Found:** _[Note any issues]_

---

### Test 3.3: Multiple Question Sets
**Steps:**
1. Add study log
2. Add first set: Matematik (D:30, Y:5)
3. Add second set: Türkçe (D:25, Y:3)
4. Verify total net calculation

**Expected Results:**
- [ ] Both sets appear in list
- [ ] Individual nets calculated correctly
- [ ] Total net shown at bottom
- [ ] Each set can be deleted individually

**Bugs Found:** _[Note any issues]_

---

### Test 3.4: Edit Study Log
**Steps:**
1. Click on a past date with existing log
2. Modify duration
3. Add another question set
4. Save changes

**Expected Results:**
- [ ] Existing data loads in form
- [ ] Changes save successfully
- [ ] Updated data persists

**Bugs Found:** _[Note any issues]_

---

### Test 3.5: Delete Study Log
**Steps:**
1. Select date with log
2. Click "Sil" button
3. Confirm deletion

**Expected Results:**
- [ ] Confirmation modal appears
- [ ] Log deleted successfully
- [ ] Calendar checkmark removed
- [ ] Form clears

**Bugs Found:** _[Note any issues]_

---

### Test 3.6: Validation Tests
**Steps:**
Test each validation:
- Negative numbers
- Duration > 24 hours
- Empty required fields
- Correct + Wrong > Total (if applicable)

**Expected Results:**
- [ ] All validation errors show
- [ ] Submit disabled when invalid
- [ ] Error messages clear and in Turkish

**Bugs Found:** _[Note any issues]_

---

## Test Suite 4: Mock Exam System

### Test 4.1: Add Complete Exam
**Steps:**
1. Navigate to "Deneme Sınavları"
2. Click "Deneme Ekle" tab
3. Fill form:
   - Tarih: Today
   - Deneme Adı: "Örnek Deneme 1"
   - Yayınevi: "Test Yayınları"
   - Süre: 135 dakika
   - For each subject, enter D/Y values:
     - Türkçe: D:25, Y:3, Boş:2
     - Matematik: D:28, Y:2, Boş:0
     - [Continue for all subjects]
4. Click "Kaydet"

**Expected Results:**
- [ ] All subject sections visible
- [ ] Boş (empty) auto-calculated: Total - D - Y
- [ ] Net auto-calculated for each subject
- [ ] Total net shown at bottom
- [ ] Success toast appears
- [ ] Exam appears in "Deneme Listesi" tab

**Bugs Found:** _[Note any issues]_

---

### Test 4.2: Validation - D + Y > Total
**Steps:**
1. Try entering Türkçe: D:25, Y:10 (total 30 questions)

**Expected Results:**
- [ ] Error message appears
- [ ] Submit disabled
- [ ] Clear validation message

**Bugs Found:** _[Note any issues]_

---

### Test 4.3: View Exam Detail
**Steps:**
1. Go to "Deneme Listesi"
2. Click "Detay" on an exam

**Expected Results:**
- [ ] Modal opens with full exam details
- [ ] All subject results shown in table
- [ ] General info displayed
- [ ] Notes visible (if any)

**Bugs Found:** _[Note any issues]_

---

### Test 4.4: Edit Exam
**Steps:**
1. Click "Düzenle" on an exam
2. Modify some values
3. Save changes

**Expected Results:**
- [ ] Form loads with existing data
- [ ] Changes save successfully
- [ ] List updates

**Bugs Found:** _[Note any issues]_

---

### Test 4.5: Delete Exam
**Steps:**
1. Click "Sil" on an exam
2. Confirm deletion

**Expected Results:**
- [ ] Confirmation modal appears
- [ ] Exam deleted successfully
- [ ] List updates
- [ ] Charts update (if exam was in data)

**Bugs Found:** _[Note any issues]_

---

### Test 4.6: View Progress Chart
**Steps:**
1. Add 3-5 exams with varying net scores
2. Check chart in exam list or stats page

**Expected Results:**
- [ ] Line chart shows net progression over time
- [ ] X-axis shows dates
- [ ] Y-axis shows net values
- [ ] Tooltip works on hover
- [ ] Chart responsive

**Bugs Found:** _[Note any issues]_

---

## Test Suite 5: Statistics and Reporting

### Test 5.1: View Overview Stats
**Steps:**
1. Navigate to "İstatistikler"
2. View "Genel Bakış" tab

**Expected Results:**
- [ ] 6 stat cards visible:
  - Total study hours
  - Total questions
  - Average net
  - Study consistency (streak)
  - Plan progress
  - (6th stat if applicable)
- [ ] All values calculated correctly
- [ ] Icons and colors appropriate

**Bugs Found:** _[Note any issues]_

---

### Test 5.2: View Subject Stats
**Steps:**
1. Click "Ders Bazlı" tab
2. Review each subject card

**Expected Results:**
- [ ] Card for each subject
- [ ] Subject color coding correct
- [ ] Progress bar shows completion %
- [ ] Total questions, net, hours shown
- [ ] Success rate calculated
- [ ] Trend indicator (↗️/→/↘️)

**Bugs Found:** _[Note any issues]_

---

### Test 5.3: View Trend Charts
**Steps:**
1. Click "Trend Analizi" tab
2. Review charts:
   - Weekly net trend (line chart)
   - Subject comparison (bar chart)
   - Study hours (area chart - if exists)

**Expected Results:**
- [ ] All charts render correctly
- [ ] Data accurate
- [ ] Responsive sizing
- [ ] Tooltips work
- [ ] Legends clear

**Bugs Found:** _[Note any issues]_

---

### Test 5.4: Date Range Filter
**Steps:**
1. Select different date ranges:
   - Son 7 gün
   - Son 30 gün
   - Bu hafta
   - Özel aralık (custom dates)
2. Verify stats update

**Expected Results:**
- [ ] Filter options visible
- [ ] Stats recalculate on selection
- [ ] Custom date picker works
- [ ] Charts update

**Bugs Found:** _[Note any issues]_

---

### Test 5.5: Export Data
**Steps:**
1. Click "Export" button (if in stats page)
2. Select export type (all data / progress / exams)
3. Choose save location
4. Save file

**Expected Results:**
- [ ] Export modal/dialog appears
- [ ] File save dialog opens
- [ ] JSON file created successfully
- [ ] File contains correct data structure
- [ ] Success toast appears

**Bugs Found:** _[Note any issues]_

---

### Test 5.6: Weak Topics Analysis
**Steps:**
1. View weak topics section
2. Verify topics identified correctly

**Expected Results:**
- [ ] Weak topics listed
- [ ] Based on low success rates
- [ ] Suggestions provided (if applicable)
- [ ] Subject grouping clear

**Bugs Found:** _[Note any issues]_

---

## Test Suite 6: Dashboard

### Test 6.1: Today's Program Display
**Steps:**
1. Go to Dashboard
2. Verify today's program widget

**Expected Results:**
- [ ] Shows correct date
- [ ] Shows correct subject from plan
- [ ] Topic, duration, target questions visible
- [ ] "Çalışmaya Başla" button works
- [ ] If no program: "Bugün program yok" message

**Bugs Found:** _[Note any issues]_

---

### Test 6.2: Weekly Summary
**Steps:**
1. Review weekly summary widget
2. Check current week's progress

**Expected Results:**
- [ ] Shows current week dates
- [ ] Completed days marked
- [ ] Progress bars show correct percentages
- [ ] Day/question/hour counts accurate

**Bugs Found:** _[Note any issues]_

---

### Test 6.3: Exam Countdown
**Steps:**
1. View exam countdown widget

**Expected Results:**
- [ ] Shows exam name
- [ ] Shows exam date
- [ ] Days remaining calculated correctly
- [ ] Motivational message displayed

**Bugs Found:** _[Note any issues]_

---

### Test 6.4: Quick Actions
**Steps:**
1. Click each quick action button:
   - Günlük Çalışma Ekle
   - Deneme Ekle
   - İstatistikleri Gör

**Expected Results:**
- [ ] Each button navigates to correct page
- [ ] Icons appropriate
- [ ] Hover effects work

**Bugs Found:** _[Note any issues]_

---

## Test Suite 7: UI/UX and Accessibility

### Test 7.1: Keyboard Navigation
**Steps:**
1. Use Tab key to navigate through all pages
2. Use Enter to activate buttons
3. Use ESC to close modals

**Expected Results:**
- [ ] Tab order logical
- [ ] Focus indicators visible
- [ ] All interactive elements reachable
- [ ] ESC closes modals
- [ ] Enter submits forms

**Bugs Found:** _[Note any issues]_

---

### Test 7.2: Responsive Layout
**Steps:**
1. Resize window to different sizes:
   - 1920x1080
   - 1440x900
   - 1280x800
   - 1024x768 (minimum)

**Expected Results:**
- [ ] Layout adjusts appropriately
- [ ] No horizontal scrolling
- [ ] All content visible
- [ ] Charts resize correctly

**Bugs Found:** _[Note any issues]_

---

### Test 7.3: Animations and Transitions
**Steps:**
1. Navigate between pages
2. Open/close modals
3. View toast notifications
4. Interact with buttons

**Expected Results:**
- [ ] Page transitions smooth (fade)
- [ ] Modal animations smooth (scale + fade)
- [ ] Toast slides in/out
- [ ] Button hover effects work
- [ ] No janky animations

**Bugs Found:** _[Note any issues]_

---

### Test 7.4: Loading States
**Steps:**
1. Observe loading states when:
   - App first opens
   - Switching users
   - Importing plan
   - Saving forms
   - Loading charts

**Expected Results:**
- [ ] Loading spinners appear
- [ ] Skeleton screens (if implemented)
- [ ] Loading states don't block UI unnecessarily
- [ ] No "flash of unstyled content"

**Bugs Found:** _[Note any issues]_

---

### Test 7.5: Error States
**Steps:**
1. Trigger various errors:
   - Invalid form data
   - Network errors (if applicable)
   - File read errors
2. Verify error messages

**Expected Results:**
- [ ] Error messages clear and in Turkish
- [ ] Toast notifications for errors
- [ ] Inline form errors
- [ ] User can recover from errors

**Bugs Found:** _[Note any issues]_

---

### Test 7.6: Empty States
**Steps:**
1. Check empty states:
   - No users
   - No plan
   - No study logs
   - No exams
   - No statistics data

**Expected Results:**
- [ ] Empty state messages clear
- [ ] Call-to-action buttons present
- [ ] Icons/illustrations (if applicable)
- [ ] Guidance on next steps

**Bugs Found:** _[Note any issues]_

---

## Test Suite 8: Edge Cases and Boundary Values

### Test 8.1: Maximum Data Volume
**Steps:**
1. Create 10+ users
2. Add 50+ study logs
3. Add 30+ exams
4. Navigate through app

**Expected Results:**
- [ ] Performance acceptable (< 2s page loads)
- [ ] Lists load correctly
- [ ] Charts render without lag
- [ ] No memory leaks
- [ ] Scrolling smooth

**Bugs Found:** _[Note any issues]_

---

### Test 8.2: Long Text Fields
**Steps:**
1. Enter very long text in:
   - User name (100+ characters)
   - Exam notes (1000+ characters)
   - Study log notes

**Expected Results:**
- [ ] Text truncates or wraps appropriately
- [ ] No layout breaking
- [ ] Saves and displays correctly

**Bugs Found:** _[Note any issues]_

---

### Test 8.3: Special Characters
**Steps:**
1. Enter names/notes with:
   - Turkish characters (ğ, ş, ç, ı, ü, ö)
   - Emoji
   - Numbers
   - Special symbols

**Expected Results:**
- [ ] All characters accepted
- [ ] Display correctly
- [ ] Save/load correctly

**Bugs Found:** _[Note any issues]_

---

### Test 8.4: Date Edge Cases
**Steps:**
1. Test dates:
   - Today
   - Yesterday
   - Last month
   - Last year
   - Future dates (should block)

**Expected Results:**
- [ ] Past dates work
- [ ] Future dates blocked for logs
- [ ] Date formatting consistent
- [ ] Sorting by date works

**Bugs Found:** _[Note any issues]_

---

### Test 8.5: Concurrent Operations
**Steps:**
1. Rapidly click buttons
2. Submit forms multiple times
3. Switch pages quickly

**Expected Results:**
- [ ] No double submissions
- [ ] No race conditions
- [ ] State remains consistent
- [ ] No crashes

**Bugs Found:** _[Note any issues]_

---

## Test Suite 9: Data Persistence

### Test 9.1: Data Persistence After Restart
**Steps:**
1. Add user, plan, logs, exams
2. Close application completely
3. Reopen application

**Expected Results:**
- [ ] All data persists
- [ ] Last user auto-selected (or selection screen)
- [ ] All features work as before

**Bugs Found:** _[Note any issues]_

---

### Test 9.2: Data Integrity After Updates
**Steps:**
1. Create data
2. Edit data
3. Verify references intact

**Expected Results:**
- [ ] User deletion removes user data
- [ ] Plan deletion doesn't break user data
- [ ] Edits don't corrupt data

**Bugs Found:** _[Note any issues]_

---

## Bug Summary

### Critical Bugs (Application Breaking)
_[List any bugs that prevent core functionality]_

1.
2.
3.

---

### High Priority Bugs (Major Features Affected)
_[List bugs affecting major features]_

1.
2.
3.

---

### Medium Priority Bugs (Minor Features Affected)
_[List bugs with moderate impact]_

1.
2.
3.

---

### Low Priority Bugs (Visual/Minor Issues)
_[List cosmetic or minor bugs]_

1.
2.
3.

---

## Performance Notes
_[Note any performance issues, slow operations, or optimization opportunities]_

---

## UX Improvement Suggestions
_[Note any confusion points or UX improvements]_

---

## Test Summary

**Total Test Cases:** ~80+
**Passed:** ___
**Failed:** ___
**Not Tested:** ___

**Critical Bugs:** ___
**High Priority Bugs:** ___
**Medium Priority Bugs:** ___
**Low Priority Bugs:** ___

**Recommendation:**
- [ ] Ready for production
- [ ] Needs bug fixes before release
- [ ] Needs major rework

**Tester Signature:** ________________
**Date:** ________________

---

## Next Steps

Based on test results:

1. Fix all critical bugs (must fix)
2. Fix high priority bugs (should fix)
3. Address medium priority bugs (time permitting)
4. Log low priority bugs for future updates
5. Implement UX improvements (time permitting)
6. Retest after fixes
7. Proceed to Sprint 10: Build and Distribution

---

**End of Testing Guide**
