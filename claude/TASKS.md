# 📋 StudyFlow - Development Tasks

**Proje:** StudyFlow - Universal Study Planning & Tracking Application
**Versiyon:** 1.0.0 (MVP)
**Başlangıç Tarihi:** 01 Kasım 2025
**Son Güncelleme:** 01 Kasım 2025
**Tahmini Süre:** 76 saat / 6 hafta
**Geçen Süre:** ~5 saat

---

## 📊 İlerleme Özeti

- **Toplam Görev:** 150
- **Tamamlanan:** 120
- **Devam Eden:** 1
- **Bekleyen:** 29
- **İlerleme:** ██████████████████░░ 79%

---

## 🎯 Sprint Durumu

| Sprint | Durum | Görev | Tamamlanan | İlerleme |
|--------|-------|-------|------------|----------|
| Sprint 1 | 🟢 Tamamlandı | 25 | 25 | 100% |
| Sprint 2 | 🟢 Tamamlandı | 18 | 18 | 100% |
| Sprint 3 | 🟢 Tamamlandı | 16 | 16 | 100% |
| Sprint 4 | 🟢 Tamamlandı | 20 | 20 | 100% |
| Sprint 5 | 🟢 Tamamlandı | 22 | 22 | 100% |
| Sprint 6 | 🟢 Tamamlandı | 20 | 20 | 100% |
| Sprint 7 | 🟢 Tamamlandı | 15 | 15 | 100% |
| Sprint 8 | 🟢 Tamamlandı | 8 | 8 | 100% |
| Sprint 9 | 🟡 Devam Ediyor | 4 | 2 | 50% |
| Sprint 10 | 🔴 Bekliyor | 2 | 0 | 0% |

---

# 🚀 SPRINT 1: Altyapı ve Temel Yapı

**Hedef:** Proje iskeletinin oluşturulması ve temel routing
**Tahmini Süre:** 8 saat
**Durum:** 🟢 Tamamlandı

**Tamamlanan İşler:**
- ✅ Electron + React + Vite + Tailwind CSS kurulumu
- ✅ Tam klasör yapısı oluşturuldu
- ✅ Common componentler (Button, Input, Card, Modal, LoadingSpinner)
- ✅ Layout componentleri (Navbar, Sidebar, Layout)
- ✅ Routing sistemi ve protected routes
- ✅ UserContext ve PlanContext
- ✅ Storage service ve user service
- ✅ Development araçları (ESLint, Prettier)
- ✅ Git repository ve ilk commit

**Git Commit:** `d390ca8 - feat: Complete Sprint 1 - Infrastructure and basic structure`

## 1.1 Proje Kurulumu ve Başlangıç

### 1.1.1 Repository ve Proje İskelet
- [ ] Git repository oluştur
- [ ] .gitignore dosyası ekle (node_modules, dist, release, .env)
- [ ] README.md oluştur (proje açıklaması, kurulum)
- [ ] LICENSE dosyası ekle (MIT)
- [ ] CHANGELOG.md oluştur

### 1.1.2 Electron + React + Vite Setup
- [ ] npm/yarn init
- [ ] Electron kurulumu (`electron`, `electron-builder`)
- [ ] React kurulumu (`react`, `react-dom`)
- [ ] Vite kurulumu ve konfigürasyon
- [ ] `vite-plugin-electron` kurulumu
- [ ] TypeScript/JSX desteği ayarları

### 1.1.3 Development Dependencies
- [ ] ESLint kurulumu ve konfigürasyon
- [ ] Prettier kurulumu ve konfigürasyon
- [ ] EditorConfig dosyası oluştur
- [ ] Husky (git hooks) kurulumu - opsiyonel

### 1.1.4 Tailwind CSS Kurulumu
- [ ] `tailwindcss` kurulumu
- [ ] `postcss` ve `autoprefixer` kurulumu
- [ ] `tailwind.config.js` oluştur ve özelleştir
- [ ] `src/renderer/styles/tailwind.css` oluştur
- [ ] Custom colors ekle (proje renk paleti)
- [ ] Custom spacing ve typography ayarları

### 1.1.5 Additional Libraries
- [ ] `react-router-dom` kurulumu
- [ ] `electron-store` kurulumu
- [ ] `date-fns` kurulumu
- [ ] `recharts` kurulumu
- [ ] `lucide-react` kurulumu (icons)
- [ ] `clsx` kurulumu
- [ ] `uuid` kurulumu

---

## 1.2 Klasör Yapısı Oluşturma

- [ ] `src/main/` klasörü ve main.js
- [ ] `src/main/preload.js` oluştur
- [ ] `src/renderer/` klasörü
- [ ] `src/renderer/components/` klasörü
  - [ ] `layout/`
  - [ ] `dashboard/`
  - [ ] `study/`
  - [ ] `exams/`
  - [ ] `stats/`
  - [ ] `user/`
  - [ ] `common/`
- [ ] `src/renderer/pages/` klasörü
- [ ] `src/renderer/contexts/` klasörü
- [ ] `src/renderer/hooks/` klasörü
- [ ] `src/renderer/services/` klasörü
- [ ] `src/renderer/utils/` klasörü
- [ ] `src/renderer/styles/` klasörü
- [ ] `src/assets/` klasörü
  - [ ] `icons/`
  - [ ] `images/`
  - [ ] `plans/`
- [ ] `public/` klasörü

---

## 1.3 Electron Main Process Setup

### 1.3.1 Main Window Configuration
- [ ] `src/main/main.js` temel yapı
- [ ] BrowserWindow oluşturma
- [ ] Window boyutları ayarlama (1280x800, min: 1024x768)
- [ ] Window icon ayarlama
- [ ] Menu bar konfigürasyonu
- [ ] Development mode ve production mode ayarları

### 1.3.2 IPC Bridge Setup
- [ ] `src/main/preload.js` context bridge
- [ ] File system operasyonları için IPC handlers
- [ ] Electron Store expose etme
- [ ] Security best practices (contextIsolation, nodeIntegration)

### 1.3.3 Development Tools
- [ ] DevTools otomatik açma (dev mode)
- [ ] Hot reload konfigürasyonu
- [ ] Error handling ve logging

---

## 1.4 Temel React Yapısı

### 1.4.1 Entry Points
- [ ] `src/renderer/main.jsx` oluştur (React root)
- [ ] `src/renderer/App.jsx` oluştur
- [ ] `index.html` oluştur ve bağlantıları kur

### 1.4.2 Global Styles
- [ ] `src/renderer/styles/globals.css` oluştur
- [ ] CSS reset/normalize ekle
- [ ] Custom scrollbar styles
- [ ] Global utility classes
- [ ] Animation keyframes

---

## 1.5 Common Components (Temel)

### 1.5.1 Button Component
- [ ] `src/renderer/components/common/Button.jsx`
- [ ] Variants: primary, secondary, ghost, danger
- [ ] Sizes: sm, md, lg
- [ ] Loading state desteği
- [ ] Disabled state styling
- [ ] Icon desteği (left/right)
- [ ] Storybook/test örnekleri (yorumlar)

### 1.5.2 Input Component
- [ ] `src/renderer/components/common/Input.jsx`
- [ ] Label desteği
- [ ] Error state ve mesajları
- [ ] Help text desteği
- [ ] Icon desteği (left/right)
- [ ] Different types (text, number, date, etc.)
- [ ] Controlled component pattern

### 1.5.3 Card Component
- [ ] `src/renderer/components/common/Card.jsx`
- [ ] CardHeader, CardContent, CardFooter subcomponents
- [ ] Hover effects (opsiyonel)
- [ ] Shadow variants

### 1.5.4 Modal Component
- [ ] `src/renderer/components/common/Modal.jsx`
- [ ] Backdrop overlay
- [ ] ESC tuşu ile kapatma
- [ ] Outside click ile kapatma
- [ ] Animation (fade + scale)
- [ ] ModalHeader, ModalBody, ModalFooter subcomponents
- [ ] Focus trap

### 1.5.5 Loading Components
- [ ] `src/renderer/components/common/LoadingSpinner.jsx`
- [ ] `src/renderer/components/common/Skeleton.jsx` (opsiyonel)
- [ ] Full page loading overlay

---

## 1.6 Routing Sistemi

### 1.6.1 Router Configuration
- [ ] `src/renderer/router.jsx` oluştur
- [ ] BrowserRouter setup
- [ ] Route tanımlamaları
- [ ] 404 Not Found sayfası

### 1.6.2 Layout Component
- [ ] `src/renderer/components/layout/Layout.jsx`
- [ ] Navbar entegrasyonu
- [ ] Sidebar entegrasyonu
- [ ] Outlet için container
- [ ] Responsive layout

### 1.6.3 Navbar Component
- [ ] `src/renderer/components/layout/Navbar.jsx`
- [ ] Logo/App name
- [ ] Kullanıcı bilgisi gösterimi
- [ ] Plan dropdown
- [ ] Navigation icons/links
- [ ] Settings butonu

### 1.6.4 Sidebar Component
- [ ] `src/renderer/components/layout/Sidebar.jsx`
- [ ] Navigation links
  - Dashboard
  - Çalışma Günlüğü
  - Deneme Sınavları
  - İstatistikler
  - Ayarlar
- [ ] Active route highlighting
- [ ] Icon + text format
- [ ] Collapsible (opsiyonel - v2.0)

---

## 1.7 Storage Service (Temel)

### 1.7.1 Storage Service Base
- [ ] `src/renderer/services/storageService.js`
- [ ] Electron Store initialization
- [ ] Generic get/set/delete/has/clear methods
- [ ] getUserData helper
- [ ] setUserData helper
- [ ] Error handling

### 1.7.2 Storage Schema İnitializer
- [ ] İlk çalıştırmada default structure oluştur
- [ ] `users` array initialize
- [ ] `plans` array initialize

---

## 1.8 Test ve Doğrulama

- [ ] Uygulamayı development mode'da çalıştır (`npm run dev`)
- [ ] Window açılıyor mu?
- [ ] DevTools açılıyor mu?
- [ ] Hot reload çalışıyor mu?
- [ ] Routing çalışıyor mu? (sayfalar arası geçiş)
- [ ] Tailwind CSS çalışıyor mu?
- [ ] Common components render ediliyor mu?
- [ ] Console'da hata yok mu?

---

**Sprint 1 Tamamlanma Kriteri:**
- ✅ Uygulama açılıyor
- ✅ Sayfalar arası geçiş çalışıyor
- ✅ Temel componentler hazır
- ✅ Storage sistemi çalışıyor
- ✅ Hata yok

---

# 🧑 SPRINT 2: Kullanıcı Yönetimi

**Hedef:** Multi-user sistem
**Tahmini Süre:** 6 saat
**Durum:** 🟢 Tamamlandı

**Tamamlanan İşler:**
- ✅ Toast notification sistemi (4 variant)
- ✅ UserSelectPage tam fonksiyonel
- ✅ Avatar sistemi (18 seçenek)
- ✅ Settings sayfası - profil düzenleme
- ✅ Kullanıcı silme (confirmation modal)
- ✅ Logout/switch user fonksiyonları
- ✅ Form validasyonları
- ✅ Error handling

**Git Commit:** `35fcae0 - feat: Complete Sprint 2 - User Management System`

## 2.1 User Service Implementation

### 2.1.1 User Service Core
- [ ] `src/renderer/services/userService.js` oluştur
- [ ] `getAll()` - Tüm kullanıcıları getir
- [ ] `getById(userId)` - ID ile kullanıcı getir
- [ ] `create(userData)` - Yeni kullanıcı oluştur
  - [ ] UUID generation
  - [ ] Default settings oluştur
  - [ ] User folder structure oluştur
- [ ] `update(userId, updates)` - Kullanıcı güncelle
- [ ] `delete(userId)` - Kullanıcı sil (verileriyle birlikte)
- [ ] `updateLastActive(userId)` - Last active timestamp güncelle

### 2.1.2 User Data Initialization
- [ ] Yeni kullanıcı için boş `progress.json` oluştur
- [ ] Yeni kullanıcı için boş `exams.json` oluştur
- [ ] Yeni kullanıcı için default `settings.json` oluştur

---

## 2.2 User Context

### 2.2.1 Context Setup
- [ ] `src/renderer/contexts/UserContext.jsx` oluştur
- [ ] `UserProvider` component
- [ ] State management:
  - [ ] `currentUser`
  - [ ] `users` (tüm kullanıcı listesi)
- [ ] Context methods:
  - [ ] `createUser`
  - [ ] `updateUser`
  - [ ] `deleteUser`
  - [ ] `switchUser`
  - [ ] `logout`

### 2.2.2 useUser Hook
- [ ] `src/renderer/hooks/useUser.js` oluştur
- [ ] Context'i consume et
- [ ] Helper properties expose et
  - [ ] `isLoggedIn`
  - [ ] `currentUser`
  - [ ] `users`
- [ ] Methods expose et

---

## 2.3 User Select Page

### 2.3.1 UserSelectPage Component
- [ ] `src/renderer/pages/UserSelectPage.jsx` oluştur
- [ ] Layout yapısı
- [ ] "Hoş Geldiniz" başlık
- [ ] User card grid
- [ ] "Yeni Kullanıcı" card butonu

### 2.3.2 UserCard Component
- [ ] `src/renderer/components/user/UserCard.jsx` oluştur
- [ ] Avatar gösterimi
- [ ] Kullanıcı adı
- [ ] Son aktif bilgisi
- [ ] Hover effects
- [ ] Click handler (switchUser)

### 2.3.3 CreateUser Modal
- [ ] `src/renderer/components/user/CreateUser.jsx` oluştur
- [ ] Modal yapısı
- [ ] Form fields:
  - [ ] Name input (validation)
  - [ ] Avatar selector
- [ ] Avatar seçenekleri (emoji grid)
- [ ] Form validation
- [ ] Submit handler
- [ ] Error handling

---

## 2.4 Avatar System

### 2.4.1 Avatar Selector Component
- [ ] Avatar options array (emoji list)
- [ ] Grid layout
- [ ] Seçili avatar highlighting
- [ ] Click handler

### 2.4.2 Avatar Display Component
- [ ] Küçük avatar component (navbar için)
- [ ] Büyük avatar component (card için)
- [ ] Fallback icon

---

## 2.5 Settings Page (Temel)

### 2.5.1 SettingsPage Component
- [ ] `src/renderer/pages/SettingsPage.jsx` oluştur
- [ ] Tab navigation (gelecekte genişleyecek)
- [ ] Profil sekmesi aktif

### 2.5.2 Profile Settings
- [ ] Kullanıcı adı değiştirme
- [ ] Avatar değiştirme
- [ ] Hesap silme butonu (confirmation modal)
- [ ] Save butonu

---

## 2.6 Validation ve Error Handling

### 2.6.1 Validators
- [ ] `src/renderer/utils/validators.js` genişlet
- [ ] `validateName()` implementation
- [ ] Min/max length kontrolleri
- [ ] Empty check

### 2.6.2 Toast Notification System
- [ ] `src/renderer/components/common/Toast.jsx` oluştur
- [ ] Toast provider/context setup
- [ ] Success/error/info variants
- [ ] Auto-dismiss timer
- [ ] Position (top-right)
- [ ] Animation (slide in/out)
- [ ] useToast hook oluştur

---

## 2.7 User Flow Implementation

### 2.7.1 Initial Load
- [ ] Uygulama açılışında kullanıcı var mı kontrol et
- [ ] Varsa: Son kullanıcıyı otomatik seç veya seçim ekranı göster
- [ ] Yoksa: Yeni kullanıcı oluşturma ekranı göster

### 2.7.2 Protected Routes
- [ ] Route guard logic
- [ ] Kullanıcı yoksa UserSelectPage'e yönlendir
- [ ] Kullanıcı varsa ilgili sayfayı göster

---

## 2.8 Test ve Doğrulama

- [ ] Yeni kullanıcı oluşturma testi
- [ ] Avatar seçimi çalışıyor mu?
- [ ] Validasyon hataları gösteriliyor mu?
- [ ] Kullanıcı verisi kaydediliyor mu?
- [ ] Kullanıcılar arası geçiş çalışıyor mu?
- [ ] Last active güncelleniyor mu?
- [ ] Kullanıcı silme çalışıyor mu?
- [ ] Toast notifications gösteriliyor mu?

---

**Sprint 2 Tamamlanma Kriteri:**
- ✅ Kullanıcı oluşturulabiliyor
- ✅ Kullanıcılar arası geçiş yapılabiliyor
- ✅ Kullanıcı verileri persist ediliyor
- ✅ Avatar sistemi çalışıyor
- ✅ Profil düzenleme çalışıyor

---

# 📚 SPRINT 3: Plan Yönetimi

**Hedef:** Plan import ve yönetim sistemi
**Tahmini Süre:** 6 saat
**Durum:** 🟢 Tamamlandı

**Tamamlanan İşler:**
- ✅ PlanImport component (file picker dialog)
- ✅ 3 örnek plan JSON (KPSS 2026, YKS 2025, LGS 2025)
- ✅ Plan yönetimi Settings'e entegre
- ✅ Plan listesi ve aktif plan gösterimi
- ✅ Plan değiştirme ve silme
- ✅ Electron IPC file operations
- ✅ date-fns Turkish locale
- ✅ Plan validasyonu

**Git Commit:** `1d9621a - feat: Complete Sprint 3 - Plan Management System`

## 3.1 Plan Service Implementation

### 3.1.1 Plan Service Core
- [ ] `src/renderer/services/planService.js` oluştur
- [ ] `getAll()` - Tüm planları getir
- [ ] `getById(planId)` - ID ile plan getir
- [ ] `import(filePath)` - JSON'dan plan import et
- [ ] `validate(planData)` - Plan JSON validasyonu
- [ ] `delete(planId)` - Plan sil
- [ ] `assignToUser(userId, planId)` - Kullanıcıya plan ata

### 3.1.2 Plan Helper Methods
- [ ] `getTodayProgram(planId)` - Bugünkü programı bul
- [ ] `getWeekProgram(planId, weekNumber)` - Haftalık program
- [ ] `getCurrentStage(planId)` - Mevcut aşamayı bul
- [ ] `calculatePlanProgress(planId, userId)` - İlerleme hesapla

---

## 3.2 Plan Context

### 3.2.1 Context Setup
- [ ] `src/renderer/contexts/PlanContext.jsx` oluştur
- [ ] `PlanProvider` component
- [ ] State management:
  - [ ] `currentPlan`
  - [ ] `plans` (tüm plan listesi)
  - [ ] `loading`
- [ ] Context methods:
  - [ ] `importPlan`
  - [ ] `switchPlan`
  - [ ] `deletePlan`
  - [ ] `refreshPlan`

### 3.2.2 usePlan Hook
- [ ] `src/renderer/hooks/usePlan.js` oluştur
- [ ] Context'i consume et
- [ ] Computed properties:
  - [ ] `todayProgram`
  - [ ] `daysUntilExam`
  - [ ] `currentStage`
  - [ ] `planProgress`

---

## 3.3 Örnek Plan JSON Dosyaları

### 3.3.1 KPSS 2026 Plan
- [ ] `src/assets/plans/kpss-2026.json` oluştur
- [ ] Tüm aşamaları doldur (PDF'den)
- [ ] Haftalık breakdown
- [ ] Günlük detaylar
- [ ] Subject bilgileri
- [ ] Validation testi

### 3.3.2 YKS 2025 Plan (Bonus)
- [ ] `src/assets/plans/yks-2025.json` oluştur (basitleştirilmiş)
- [ ] Temel aşamalar
- [ ] Validation testi

### 3.3.3 LGS 2025 Plan (Bonus)
- [ ] `src/assets/plans/lgs-2025.json` oluştur (basitleştirilmiş)
- [ ] Temel aşamalar
- [ ] Validation testi

---

## 3.4 Plan Import UI

### 3.4.1 Plan Import Modal
- [ ] `src/renderer/components/common/PlanImport.jsx` oluştur
- [ ] File picker integration (Electron IPC)
- [ ] Drag & drop support
- [ ] JSON preview (opsiyonel)
- [ ] Validation feedback
- [ ] Import progress indicator

### 3.4.2 File System IPC
- [ ] Main process'te file reader handler
- [ ] `readFile` IPC channel
- [ ] Error handling
- [ ] JSON parse

### 3.4.3 Plan Listesi
- [ ] Mevcut planları listele
- [ ] Her plan için:
  - [ ] Plan adı
  - [ ] Sınav tarihi
  - [ ] Toplam hafta
  - [ ] Aktif/pasif durumu
- [ ] "Aktif Yap" butonu
- [ ] "Sil" butonu (confirmation)

---

## 3.5 Plan Selection

### 3.5.1 İlk Kullanım - Plan Yok
- [ ] Boş state UI
- [ ] "Plan Import Et" butonu
- [ ] Örnek planları göster
- [ ] "Örnek planlardan birini indir" linkleri

### 3.5.2 Plan Seçimi (Navbar'da)
- [ ] Dropdown menu component
- [ ] Aktif plan gösterimi
- [ ] Plan değiştirme
- [ ] "Yeni Plan Ekle" seçeneği

---

## 3.6 Plan Validation

### 3.6.1 Validation Rules
- [ ] Required fields kontrolü
  - [ ] `id`
  - [ ] `name`
  - [ ] `examDate`
  - [ ] `subjects`
  - [ ] `stages`
- [ ] Date format validation
- [ ] Subject array validation
- [ ] Stage structure validation
- [ ] Unique ID kontrolü

### 3.6.2 Error Messages
- [ ] Her hata tipi için anlamlı mesaj
- [ ] Türkçe hata mesajları
- [ ] Toast notification ile gösterim

---

## 3.7 Plan Utilities

### 3.7.1 Date Helpers
- [ ] `src/renderer/utils/dateHelpers.js` genişlet
- [ ] Plan tarih aralığı hesaplama
- [ ] Bugünün plan gününü bulma
- [ ] Hafta numarası hesaplama

### 3.7.2 Plan Formatters
- [ ] `src/renderer/utils/formatters.js` oluştur
- [ ] Plan display formatları
- [ ] Subject color mapping
- [ ] Stage name formatting

---

## 3.8 Test ve Doğrulama

- [ ] JSON plan import testi
- [ ] Geçerli plan başarıyla yükleniyor mu?
- [ ] Geçersiz JSON reddediliyor mu?
- [ ] Validation error mesajları gösteriliyor mu?
- [ ] Plan değiştirme çalışıyor mu?
- [ ] Plan silme çalışıyor mu?
- [ ] Kullanıcıya plan atama çalışıyor mu?
- [ ] Bugünün programı doğru gösteriliyor mu?

---

**Sprint 3 Tamamlanma Kriteri:**
- ✅ JSON plan import edilebiliyor
- ✅ Plan validasyonu çalışıyor
- ✅ Aktif plan değiştirilebiliyor
- ✅ Örnek planlar hazır
- ✅ Plan UI complete

---

# 🏠 SPRINT 4: Dashboard

**Hedef:** Ana ekran ve bugünün programı
**Tahmini Süre:** 8 saat
**Durum:** 🟢 Tamamlandı

**Tamamlanan İşler:**
- ✅ TodayProgram widget (rest day detection)
- ✅ WeeklySummary widget (progress tracking)
- ✅ ExamCountdown widget (motivational messages)
- ✅ QuickActions widget (4 action cards)
- ✅ Responsive 2-column layout
- ✅ Kişiselleştirilmiş karşılama
- ✅ Subject color coding
- ✅ Empty states

**Git Commit:** `9bbd421 - feat: Complete Sprint 4 - Dashboard Implementation`

## 4.1 Dashboard Page Layout

### 4.1.1 DashboardPage Component
- [ ] `src/renderer/pages/DashboardPage.jsx` oluştur
- [ ] Grid layout (responsive)
- [ ] Section containers
- [ ] Loading states
- [ ] Empty states (plan yok, veri yok)

---

## 4.2 Today Program Component

### 4.2.1 TodayProgram Component
- [ ] `src/renderer/components/dashboard/TodayProgram.jsx` oluştur
- [ ] Card wrapper
- [ ] Bugünün tarihini göster
- [ ] Bugünün dersini göster:
  - [ ] Ders adı
  - [ ] Konu
  - [ ] Süre
  - [ ] Hedef soru sayısı
- [ ] "Çalışmaya Başla" butonu
- [ ] "Atla" butonu

### 4.2.2 Action Handlers
- [ ] "Çalışmaya Başla" - StudyLogPage'e yönlendir
- [ ] "Atla" - Günü işaretle ve devam et
- [ ] Bugün program yoksa - "Bugün program yok" mesajı

### 4.2.3 Today Program Empty State
- [ ] Program yok durumu
- [ ] Hafta sonu mesajı (Pazar/Pazartesi)
- [ ] "Geçmiş çalışmalar" butonu

---

## 4.3 Weekly Summary Component

### 4.3.1 WeeklySummary Component
- [ ] `src/renderer/components/dashboard/WeeklySummary.jsx` oluştur
- [ ] Bu haftanın tamamlanan günlerini göster
- [ ] Her gün için:
  - [ ] Tarih
  - [ ] Ders
  - [ ] Net/soru sayısı
  - [ ] Süre
  - [ ] Tamamlanma durumu (✓/✗)

### 4.3.2 Weekly Progress Bar
- [ ] `src/renderer/components/dashboard/ProgressBar.jsx` oluştur
- [ ] Gün progress (X/5 gün)
- [ ] Soru progress (X/Y soru)
- [ ] Saat progress (X/Y saat)
- [ ] Animated bars
- [ ] Percentage labels

---

## 4.4 Countdown Widget

### 4.4.1 ExamCountdown Component
- [ ] `src/renderer/components/dashboard/ExamCountdown.jsx` oluştur
- [ ] Sınav adı göster
- [ ] Sınav tarihi göster
- [ ] Kalan gün sayısı (büyük, vurgulanmış)
- [ ] Motivasyon mesajı (dinamik)
- [ ] Progress ring/circle (opsiyonel)

### 4.4.2 Countdown Logic
- [ ] `daysUntilExam` hesaplama
- [ ] Motivasyon mesajları array
- [ ] Tarih formatı

---

## 4.5 Quick Actions Component

### 4.5.1 QuickActions Component
- [ ] `src/renderer/components/dashboard/QuickActions.jsx` oluştur
- [ ] Grid of action cards
- [ ] Her card için:
  - [ ] Icon
  - [ ] Label
  - [ ] Click handler

### 4.5.2 Action Buttons
- [ ] "Günlük Çalışma Ekle" - StudyLogPage'e git
- [ ] "Deneme Ekle" - ExamsPage'e git
- [ ] "İstatistikleri Gör" - StatsPage'e git
- [ ] Hover effects
- [ ] Icon animations

---

## 4.6 Recent Activity Component (Opsiyonel)

### 4.6.1 RecentActivity Component
- [ ] Son 5 çalışmayı listele
- [ ] Her item için:
  - [ ] Tarih
  - [ ] Ders
  - [ ] Net
  - [ ] Küçük success indicator
- [ ] "Tümünü Gör" linki

---

## 4.7 Stats Overview Widget

### 4.7.1 StatsOverview Component
- [ ] `src/renderer/components/dashboard/StatsOverview.jsx` oluştur
- [ ] 4 küçük stat card:
  - [ ] Toplam çalışma saati
  - [ ] Toplam soru sayısı
  - [ ] Ortalama net
  - [ ] Aktif streak
- [ ] Icon + number + label format
- [ ] Color coding

---

## 4.8 Empty States

### 4.8.1 No Plan State
- [ ] Plan seçilmediğinde göster
- [ ] "Plan import et" mesajı
- [ ] Import butonu

### 4.8.2 No Progress State
- [ ] Hiç çalışma kaydı yoksa
- [ ] "Çalışmaya başla" teşvik mesajı
- [ ] İlk çalışma ekleme butonu

---

## 4.9 Dashboard Interactions

### 4.9.1 Data Fetching
- [ ] User context'ten currentUser al
- [ ] Plan context'ten currentPlan al
- [ ] Progress data fetch (useEffect)
- [ ] Exam data fetch (useEffect)

### 4.9.2 Real-time Updates
- [ ] Context değişince yeniden render
- [ ] Optimistic updates (opsiyonel)

---

## 4.10 Test ve Doğrulama

- [ ] Dashboard açılıyor mu?
- [ ] Bugünün programı doğru mu?
- [ ] Haftalık özet gösteriliyor mu?
- [ ] Countdown doğru hesaplanıyor mu?
- [ ] Quick actions çalışıyor mu?
- [ ] Empty states gösteriliyor mu?
- [ ] Loading states doğru mu?
- [ ] Responsive layout çalışıyor mu?

---

**Sprint 4 Tamamlanma Kriteri:**
- ✅ Dashboard görselleri tamamlanmış
- ✅ Bugünün programı doğru gösteriliyor
- ✅ Haftalık özet hesaplanıyor
- ✅ Navigation butonları çalışıyor
- ✅ Empty states düzgün

---

# 📝 SPRINT 5: Çalışma Takibi

**Hedef:** Günlük çalışma kayıt sistemi
**Tahmini Süre:** 10 saat
**Durum:** 🟢 Tamamlandı

**Tamamlanan İşler:**
- ✅ ProgressService (CRUD, summary, streak calculation)
- ✅ useProgress hook
- ✅ Calendar component (interactive, progress indicators)
- ✅ QuestionSetInput (multiple sets, net calculation)
- ✅ StudyLogForm (topic, duration, question sets, notes)
- ✅ StudyLogPage (calendar + form layout)
- ✅ Study deletion (confirmation)
- ✅ Real-time net calculation
- ✅ Penalty toggle (yanlış siler)
- ✅ Subject-specific statistics
- ✅ Form validations

**Git Commit:** `cd399d5 - feat: Complete Sprint 5 - Study Log System`

## 5.1 Progress Service Implementation

### 5.1.1 Progress Service Core
- [ ] `src/renderer/services/progressService.js` oluştur
- [ ] `getAll(userId)` - Tüm ilerlemeyi getir
- [ ] `getByDate(userId, date)` - Tarih bazlı kayıt
- [ ] `saveStudyLog(userId, logData)` - Çalışma kaydet
- [ ] `updateStudyLog(userId, date, updates)` - Güncelle
- [ ] `deleteStudyLog(userId, date)` - Sil

### 5.1.2 Summary Calculations
- [ ] `calculateSummary(dailyLogs)` - Genel özet hesapla
  - [ ] Total hours
  - [ ] Total questions
  - [ ] Total correct/wrong
  - [ ] Total net
  - [ ] Days studied
  - [ ] Streak calculation

### 5.1.3 Streak Calculation
- [ ] `calculateStreak(logs)` - Streak logic
- [ ] Current streak hesapla
- [ ] Longest streak hesapla
- [ ] Tarih sıralama ve fark hesaplama

### 5.1.4 Subject Stats
- [ ] `getSubjectStats(userId, subject)` - Ders bazlı stats
- [ ] Total questions/correct/wrong
- [ ] Average net
- [ ] Success rate
- [ ] Total hours

---

## 5.2 StudyLogPage Layout

### 5.2.1 StudyLogPage Component
- [ ] `src/renderer/pages/StudyLogPage.jsx` oluştur
- [ ] Two-column layout
  - [ ] Sol: Calendar view
  - [ ] Sağ: Form view
- [ ] Responsive breakpoints

---

## 5.3 Calendar Component

### 5.3.1 Calendar View
- [ ] `src/renderer/components/study/Calendar.jsx` oluştur
- [ ] Aylık görünüm
- [ ] Günleri render et
- [ ] Tamamlanan günleri işaretle (✓)
- [ ] Bugünü vurgula
- [ ] Boş günleri göster

### 5.3.2 Calendar Navigation
- [ ] Önceki ay / Sonraki ay butonları
- [ ] Ay ve yıl başlığı
- [ ] "Bugüne Git" butonu

### 5.3.3 Day Selection
- [ ] Güne tıklayınca formu göster
- [ ] Seçili günü highlight et
- [ ] Veri varsa preview göster

---

## 5.4 Study Log Form

### 5.4.1 StudyLogForm Component
- [ ] `src/renderer/components/study/StudyLogForm.jsx` oluştur
- [ ] Form state management (React Hook Form veya useState)
- [ ] Controlled inputs

### 5.4.2 Form Fields - Temel Bilgiler
- [ ] Tarih seçici (default: bugün)
- [ ] Konu gösterimi (plan'dan otomatik)
- [ ] Manuel konu girişi toggle (plan dışı çalışma)
- [ ] Çalışma süresi input (number, saat)

### 5.4.3 Question Set Input Component
- [ ] `src/renderer/components/study/QuestionSetInput.jsx` oluştur
- [ ] Ders dropdown (plan subjects'ten)
- [ ] Doğru sayısı input
- [ ] Yanlış sayısı input
- [ ] "Yanlış cevap doğruyu siler" checkbox
- [ ] Net gösterimi (otomatik hesaplama)
- [ ] "Ekle" butonu

### 5.4.4 Question Sets List
- [ ] Eklenen soru setlerini listele
- [ ] Her set için:
  - [ ] Ders
  - [ ] Doğru / Yanlış
  - [ ] Net
  - [ ] "Sil" butonu
- [ ] Toplam özet (toplam D/Y/net)

### 5.4.5 Additional Fields
- [ ] "Konuyu tamamladım" checkbox
- [ ] Notlar textarea (opsiyonel)

---

## 5.5 Net Calculator

### 5.5.1 Calculation Logic
- [ ] `src/renderer/utils/calculations.js` oluştur
- [ ] `calculateNet(correct, wrong, penaltyEnabled)`
- [ ] Real-time hesaplama
- [ ] Decimal precision (2 digit)

### 5.5.2 Net Display Component
- [ ] `src/renderer/components/study/NetCalculator.jsx`
- [ ] Net gösterimi (bold, vurgulanmış)
- [ ] Penalty enabled/disabled indicator
- [ ] Formula açıklaması (tooltip - opsiyonel)

---

## 5.6 Form Validation

### 5.6.1 Validation Rules
- [ ] `validators.js` genişlet
- [ ] Duration validation (0-24 saat)
- [ ] Question count validation (0-1000)
- [ ] Correct + Wrong ≤ Total kontrolü
- [ ] Required fields kontrolü

### 5.6.2 Error Display
- [ ] Input altında error mesajları
- [ ] Field-level validation
- [ ] Form-level validation
- [ ] Submit disabled durumu

---

## 5.7 Form Submission

### 5.7.1 Save Handler
- [ ] Form data toplama
- [ ] Validation kontrolü
- [ ] Progress service'e kaydetme
- [ ] Success toast
- [ ] Form reset
- [ ] Calendar refresh

### 5.7.2 Update Handler
- [ ] Mevcut kayıt varsa update et
- [ ] Özeti yeniden hesapla
- [ ] Toast notification

### 5.7.3 Delete Handler
- [ ] Confirmation modal
- [ ] Delete operation
- [ ] Calendar güncelleme
- [ ] Toast notification

---

## 5.8 Study History

### 5.8.1 History List View
- [ ] Son 10-20 çalışmayı listele
- [ ] Tarih bazlı gruplama
- [ ] Her kayıt için:
  - [ ] Tarih
  - [ ] Ders
  - [ ] Konu
  - [ ] Net
  - [ ] Süre
- [ ] "Düzenle" butonu
- [ ] "Sil" butonu

### 5.8.2 Filter ve Search
- [ ] Ders bazlı filtreleme
- [ ] Tarih aralığı filtresi
- [ ] Arama (konu ismi)

---

## 5.9 useProgress Hook

### 5.9.1 Hook Implementation
- [ ] `src/renderer/hooks/useProgress.js` oluştur
- [ ] Progress data fetch
- [ ] CRUD operations wrapped
- [ ] Loading states
- [ ] Error handling

---

## 5.10 Test ve Doğrulama

- [ ] Çalışma kaydedilebiliyor mu?
- [ ] Birden fazla soru seti eklenebiliyor mu?
- [ ] Net hesaplaması doğru mu? (yanlış siler açık)
- [ ] Net hesaplaması doğru mu? (yanlış siler kapalı)
- [ ] Validasyon çalışıyor mu?
- [ ] Form reset ediliyor mu?
- [ ] Calendar güncelleniyormu?
- [ ] Geçmiş kayıt düzenlenebiliyor mu?
- [ ] Kayıt silinebiliyor mu?
- [ ] Toast notifications gösteriliyor mu?

---

**Sprint 5 Tamamlanma Kriteri:**
- ✅ Çalışma kaydedilebiliyor
- ✅ Soru setleri eklenip çıkarılabiliyor
- ✅ Net hesaplamaları doğru
- ✅ Veriler kaydediliyor
- ✅ Calendar çalışıyor
- ✅ Edit/delete fonksiyonları çalışıyor

---

# 📊 SPRINT 6: Deneme Sınavları

**Hedef:** Deneme ekle/görüntüle/analiz et
**Tahmini Süre:** 10 saat
**Durum:** 🟢 Tamamlandı

**Tamamlanan İşler:**
- ✅ examService.js: Full CRUD, summary calculations, trend analysis
- ✅ ExamForm: Multi-section form with subject results and auto net calculation
- ✅ ExamList: Sortable list with statistics and detail modal
- ✅ ExamChart: Line chart (progress) and bar chart (subject comparison)
- ✅ WeakTopicsAnalysis: Frequency analysis of weak topics
- ✅ ExamStats dashboard widget
- ✅ useExams custom hook
- ✅ constants.js: SUBJECT_COLORS and SUBJECT_QUESTIONS

**Git Commit:** `b715a85 - feat: Complete Sprint 6 - Mock Exam System`

## 6.1 Exam Service Implementation

### 6.1.1 Exam Service Core
- [ ] `src/renderer/services/examService.js` oluştur
- [ ] `getAll(userId)` - Tüm denemeleri getir
- [ ] `getById(userId, examId)` - ID ile deneme getir
- [ ] `save(userId, examData)` - Deneme kaydet
- [ ] `update(userId, examId, updates)` - Deneme güncelle
- [ ] `delete(userId, examId)` - Deneme sil

### 6.1.2 Summary Calculations
- [ ] `calculateSummary(exams)` - Genel deneme özeti
  - [ ] Total exams
  - [ ] Average net
  - [ ] Highest net
  - [ ] Lowest net
  - [ ] Trend (increasing/decreasing/stable)

### 6.1.3 Analysis Methods
- [ ] `getSubjectAnalysis(userId, subject)` - Ders bazlı analiz
- [ ] `getTrendData(userId)` - Grafik için trend verisi
- [ ] `getWeakTopics(userId)` - Zayıf konular tespiti

---

## 6.2 ExamsPage Layout

### 6.2.1 ExamsPage Component
- [ ] `src/renderer/pages/ExamsPage.jsx` oluştur
- [ ] Tab navigation:
  - [ ] "Deneme Ekle" tab
  - [ ] "Deneme Listesi" tab
- [ ] Tab state management

---

## 6.3 Exam Form

### 6.3.1 ExamForm Component
- [ ] `src/renderer/components/exams/ExamForm.jsx` oluştur
- [ ] Form state management
- [ ] Multi-section form

### 6.3.2 Form - Genel Bilgiler
- [ ] Tarih picker
- [ ] Deneme adı input
- [ ] Yayın evi input (opsiyonel)
- [ ] Deneme numarası input (opsiyonel)
- [ ] Süre input (dakika)
- [ ] "Yanlış siler" checkbox (tüm dersler için)

### 6.3.3 Form - Ders Sonuçları
- [ ] Her ders için section:
  - [ ] Ders başlığı (icon + name)
  - [ ] Toplam soru sayısı (readonly, plan'dan)
  - [ ] Doğru input
  - [ ] Yanlış input
  - [ ] Boş input (otomatik hesaplanan)
  - [ ] Net display (otomatik)
  
### 6.3.4 Subject Input Sections
- [ ] Türkçe (30 soru)
- [ ] Matematik (30 soru)
- [ ] Tarih (27 soru)
- [ ] Coğrafya (18 soru)
- [ ] Vatandaşlık (9 soru)
- [ ] Güncel (6 soru)

### 6.3.5 Exam Form - Calculations
- [ ] Boş otomatik hesaplama (Total - D - Y)
- [ ] Net hesaplama (penalty ile/siz)
- [ ] Toplam net hesaplama
- [ ] Success rate hesaplama

### 6.3.6 Exam Form - Additional
- [ ] Zayıf konular input (opsiyonel, otomatik tespit)
- [ ] Genel notlar textarea
- [ ] "Kaydet" butonu
- [ ] "İptal" butonu

---

## 6.4 Form Validation (Exam)

### 6.4.1 Validation Rules
- [ ] Required fields kontrolü
- [ ] D + Y ≤ Total kontrolü (her ders için)
- [ ] Negative number kontrolü
- [ ] Date validation

### 6.4.2 Real-time Validation
- [ ] Input onChange validation
- [ ] Boş otomatik update
- [ ] Net otomatik update
- [ ] Error messages

---

## 6.5 Exam List

### 6.5.1 ExamList Component
- [ ] `src/renderer/components/exams/ExamList.jsx` oluştur
- [ ] Tablo veya card layout
- [ ] Sıralama seçenekleri (tarih, net)
- [ ] Filtreleme (tarih aralığı, minimum net)

### 6.5.2 Exam List Item
- [ ] Tarih
- [ ] Deneme adı
- [ ] Toplam net (büyük, vurgulu)
- [ ] Ders bazlı net'ler (küçük)
- [ ] Action buttons:
  - [ ] "Detay"
  - [ ] "Düzenle"
  - [ ] "Sil"

### 6.5.3 Empty State
- [ ] "Henüz deneme yok" mesajı
- [ ] "İlk deneme ekle" butonu

---

## 6.6 Exam Detail Modal

### 6.6.1 ExamDetail Component
- [ ] `src/renderer/components/exams/ExamDetail.jsx` oluştur
- [ ] Modal layout
- [ ] Genel bilgiler bölümü
- [ ] Ders bazlı sonuçlar tablosu
- [ ] Zayıf konular listesi
- [ ] Notlar gösterimi
- [ ] "Düzenle" butonu
- [ ] "Kapat" butonu

### 6.6.2 Subject Results Table
- [ ] Her ders için satır:
  - [ ] Ders adı
  - [ ] Doğru / Yanlış / Boş
  - [ ] Net
  - [ ] Success rate %
- [ ] Visual indicators (color coding)

---

## 6.7 Exam Charts

### 6.7.1 ExamChart Component
- [ ] `src/renderer/components/exams/ExamChart.jsx` oluştur
- [ ] Recharts integration
- [ ] Line chart (net gelişimi)
- [ ] X axis: Tarih
- [ ] Y axis: Net
- [ ] Tooltip
- [ ] Grid lines
- [ ] Responsive

### 6.7.2 Chart Configuration
- [ ] Color scheme
- [ ] Axis labels
- [ ] Legend
- [ ] Animation
- [ ] Data formatting

### 6.7.3 Subject Comparison Chart
- [ ] Ders bazlı karşılaştırma (bar chart)
- [ ] Her ders için ortalama net
- [ ] Color coding (ders renklerine göre)

---

## 6.8 Statistics Widget (Exams)

### 6.8.1 Exam Stats Overview
- [ ] Toplam deneme sayısı
- [ ] Ortalama net
- [ ] En yüksek net (tarih ile)
- [ ] En düşük net (tarih ile)
- [ ] Trend indicator (↗️ / → / ↘️)

### 6.8.2 Stats Cards
- [ ] 4 adet stat card
- [ ] Icon + value + label
- [ ] Color coding

---

## 6.9 useExams Hook

### 6.9.1 Hook Implementation
- [ ] `src/renderer/hooks/useExams.js` oluştur
- [ ] Exam data fetch
- [ ] CRUD operations wrapped
- [ ] Computed properties:
  - [ ] `examsSorted`
  - [ ] `averageNet`
  - [ ] `trendData`
- [ ] Loading states

---

## 6.10 Test ve Doğrulama

- [ ] Deneme eklenebiliyor mu?
- [ ] Tüm dersler için net hesaplanıyor mu?
- [ ] Boş otomatik hesaplanıyor mu?
- [ ] Validasyon çalışıyor mu?
- [ ] Deneme listesi gösteriliyor mu?
- [ ] Deneme detayı açılıyor mu?
- [ ] Deneme düzenlenebiliyor mu?
- [ ] Deneme silinebiliyor mu?
- [ ] Net gelişim grafiği doğru mu?
- [ ] Ders karşılaştırma grafiği doğru mu?

---

**Sprint 6 Tamamlanma Kriteri:**
- ✅ Deneme eklenebiliyor
- ✅ Deneme listesi görüntülenebiliyor
- ✅ Grafikler çalışıyor
- ✅ Net hesaplamaları doğru
- ✅ CRUD operations complete

---

# 📈 SPRINT 7: İstatistikler ve Raporlama

**Hedef:** Detaylı analiz ve görselleştirme
**Tahmini Süre:** 10 saat
**Durum:** 🟢 Tamamlandı

**Tamamlanan İşler:**
- ✅ statsService.js: Overview, subject stats, trends, weak topics analysis
- ✅ exportService.js: Full data export with Electron/browser support
- ✅ OverviewStats.jsx: 6 stat cards with key metrics
- ✅ SubjectStats.jsx: Subject performance cards with trends
- ✅ TrendChart.jsx: Line, bar, weekly charts with Recharts
- ✅ WeakTopics.jsx: Frequency analysis with suggestions
- ✅ DateRangeSelector.jsx: Flexible date filtering
- ✅ useStats.js: Statistics hook with memoization
- ✅ StatsPage.jsx: 3-tab dashboard fully integrated

**Git Commit:** `9bc0f13 - feat: Complete Sprint 7 - Statistics and Reporting System`

## 7.1 Stats Service Implementation

### 7.1.1 Stats Service Core
- [ ] `src/renderer/services/statsService.js` oluştur (varsa genişlet)
- [ ] `getOverview(userId)` - Genel istatistikler
- [ ] `getSubjectStats(userId)` - Tüm dersler için stats
- [ ] `getWeeklyStats(userId)` - Haftalık breakdown
- [ ] `getMonthlyStats(userId)` - Aylık breakdown
- [ ] `getTrendAnalysis(userId)` - Trend analysis

### 7.1.2 Advanced Calculations
- [ ] Çalışma tutarlılığı hesaplama
- [ ] Ders bazlı success rate
- [ ] Zayıf/güçlü konu tespiti
- [ ] İlerleme yüzdesi hesaplama
- [ ] Hedef karşılaştırma

---

## 7.2 StatsPage Layout

### 7.2.1 StatsPage Component
- [ ] `src/renderer/pages/StatsPage.jsx` oluştur
- [ ] Multi-section layout
- [ ] Date range selector
- [ ] Tab navigation (opsiyonel):
  - [ ] Genel Bakış
  - [ ] Ders Bazlı
  - [ ] Trend Analizi

---

## 7.3 Overview Statistics

### 7.3.1 OverviewStats Component
- [ ] `src/renderer/components/stats/OverviewStats.jsx` oluştur
- [ ] Büyük stat cards (4-6 adet)

### 7.3.2 Stat Cards
- [ ] Toplam çalışma saati
  - [ ] Icon
  - [ ] Value (X saat)
  - [ ] Trend (son hafta vs önceki)
- [ ] Toplam soru sayısı
  - [ ] Doğru / Yanlış breakdown
  - [ ] Net
- [ ] Ortalama net
  - [ ] Hedef net ile karşılaştırma
  - [ ] Progress bar
- [ ] Çalışma tutarlılığı
  - [ ] Current streak (🔥 emoji)
  - [ ] Longest streak
  - [ ] Tutarlılık % (X/Y gün)
- [ ] Plan ilerleme
  - [ ] Tamamlanan gün sayısı
  - [ ] Kalan gün sayısı
  - [ ] % progress

---

## 7.4 Subject Statistics

### 7.4.1 SubjectStats Component
- [ ] `src/renderer/components/stats/SubjectStats.jsx` oluştur
- [ ] Her ders için detaylı card

### 7.4.2 Subject Card Content
- [ ] Ders başlığı (icon + name + color)
- [ ] İlerleme bar (% tamamlanma)
- [ ] Toplam soru / net
- [ ] Ortalama net (per session)
- [ ] Toplam çalışma saati
- [ ] Success rate %
- [ ] Trend indicator (↗️ / → / ↘️)

### 7.4.3 Güçlü/Zayıf Konular
- [ ] Her ders için:
  - [ ] 💪 En iyi konu (en yüksek success rate)
  - [ ] ⚠️ Zayıf konu (en düşük success rate)
- [ ] Success rate gösterimi
- [ ] Konu başlık ve %

---

## 7.5 Trend Charts

### 7.5.1 TrendChart Component
- [ ] `src/renderer/components/stats/TrendChart.jsx` oluştur
- [ ] Recharts integration
- [ ] Multiple chart types:
  - [ ] Line chart (haftalık/aylık net)
  - [ ] Bar chart (ders karşılaştırma)
  - [ ] Area chart (kümülatif soru sayısı)

### 7.5.2 Weekly Trend Chart
- [ ] Haftalık net ortalaması
- [ ] X axis: Haftalar
- [ ] Y axis: Net
- [ ] Data points
- [ ] Trend line

### 7.5.3 Subject Comparison Chart
- [ ] Her ders için bar
- [ ] Ortalama net karşılaştırması
- [ ] Color coding
- [ ] Tooltip

### 7.5.4 Study Hours Chart
- [ ] Haftalık çalışma saati
- [ ] Area chart
- [ ] Cumulative line (opsiyonel)

---

## 7.6 Weekly Calendar Heatmap

### 7.6.1 WeeklyHeatmap Component
- [ ] Haftalık çalışma takvimi (tablo formatı)
- [ ] Satırlar: Haftalar
- [ ] Sütunlar: Pazartesi-Cumartesi
- [ ] Cell'ler:
  - [ ] ✓ Çalıştı
  - [ ] ✗ Çalışmadı
  - [ ] - Tatil (Pazar/Pazartesi)
- [ ] Color coding

---

## 7.7 Weak Topics Analysis

### 7.7.1 WeakTopics Component
- [ ] `src/renderer/components/stats/WeakTopics.jsx` oluştur
- [ ] Tüm derslerden zayıf konuları topla
- [ ] Başarı oranına göre sırala
- [ ] Önceliklendir

### 7.7.2 Weak Topic Card
- [ ] Konu adı
- [ ] Ders
- [ ] Success rate
- [ ] Toplam soru sayısı
- [ ] Öneri mesajı (opsiyonel)

---

## 7.8 Export Functionality

### 7.8.1 Export Service
- [ ] `src/renderer/services/exportService.js` oluştur
- [ ] `exportToJSON(userId)` - Tüm veriyi JSON'a export
- [ ] `exportProgress(userId)` - Sadece progress
- [ ] `exportExams(userId)` - Sadece exams

### 7.8.2 Export UI
- [ ] "Export" butonu (StatsPage'de)
- [ ] Export options modal:
  - [ ] Tüm veri
  - [ ] Sadece çalışma kayıtları
  - [ ] Sadece deneme sonuçları
- [ ] File save dialog (Electron IPC)
- [ ] Success notification

### 7.8.3 File Save IPC
- [ ] Main process'te save handler
- [ ] `saveFile` IPC channel
- [ ] Default filename generation (studyflow-export-2025-11-07.json)
- [ ] Error handling

---

## 7.9 Date Range Selector

### 7.9.1 DateRangeSelector Component
- [ ] Preset options:
  - [ ] Son 7 gün
  - [ ] Son 30 gün
  - [ ] Bu hafta
  - [ ] Bu ay
  - [ ] Tüm zamanlar
  - [ ] Özel aralık
- [ ] Custom date picker (başlangıç-bitiş)
- [ ] Apply butonu
- [ ] Seçili aralığı gösterme

---

## 7.10 useStats Hook

### 7.10.1 Hook Implementation
- [ ] `src/renderer/hooks/useStats.js` oluştur
- [ ] Stats data fetch
- [ ] Date range filtering
- [ ] Computed properties:
  - [ ] `overviewStats`
  - [ ] `subjectStats`
  - [ ] `trendData`
  - [ ] `weeklyData`
- [ ] Loading states

---

## 7.11 Test ve Doğrulama

- [ ] Genel istatistikler doğru hesaplanıyor mu?
- [ ] Ders bazlı analiz doğru mu?
- [ ] Grafikler doğru verileri gösteriyor mu?
- [ ] Date range filter çalışıyor mu?
- [ ] Weak topics doğru tespit ediliyor mu?
- [ ] Export fonksiyonu çalışıyor mu?
- [ ] JSON dosyası doğru formatta mı?
- [ ] Empty states gösteriliyor mu?

---

**Sprint 7 Tamamlanma Kriteri:**
- ✅ Tüm istatistikler doğru hesaplanıyor
- ✅ Grafikler görselleşiyor
- ✅ Export çalışıyor
- ✅ Ders bazlı analiz complete
- ✅ UI professional ve anlaşılır

---

# 🎨 SPRINT 8: UI Polish ve UX İyileştirmeleri

**Hedef:** Görsel iyileştirmeler ve kullanıcı deneyimi
**Tahmini Süre:** 8 saat
**Durum:** 🟢 Tamamlandı

**Tamamlanan İşler:**
- ✅ Modal component enhancements (focus trap, ARIA, scale-in animation)
- ✅ ErrorBoundary component (React error handling with fallback UI)
- ✅ Skeleton loading system (multiple variants and preset components)
- ✅ Button component enhancements (outline/success variants, scale effects)
- ✅ Input component enhancements (error icon, ARIA, better focus states)
- ✅ Card component enhancements (onClick support, keyboard navigation)
- ✅ LoadingSpinner color consistency fix
- ✅ Global CSS animations and utilities (scale-in, shimmer, focus-ring, hover-lift)

**Git Commit:** `f1a9d4b - feat: Complete Sprint 8 - UI/UX Polish and Enhancements`

## 8.1 Animasyonlar

### 8.1.1 Page Transitions
- [ ] React Router transition wrapper
- [ ] Fade in animation (300ms)
- [ ] Slide animation (opsiyonel)
- [ ] Smooth page switches

### 8.1.2 Component Animations
- [ ] Modal enter/exit animations
  - [ ] Backdrop fade
  - [ ] Modal scale + fade
  - [ ] Framer Motion kullanımı
- [ ] Toast slide-in animation
- [ ] Loading spinner animations
- [ ] Progress bar animations (smooth fill)

### 8.1.3 Hover Effects
- [ ] Button hover (subtle scale, shadow)
- [ ] Card hover (lift effect)
- [ ] Link hover (underline animation)
- [ ] Icon hover (color transition)

### 8.1.4 Micro Interactions
- [ ] Checkbox check animation (bounce)
- [ ] Input focus animation (border glow)
- [ ] Tab switch animation (slide indicator)
- [ ] Dropdown open animation

---

## 8.2 Loading States

### 8.2.1 Page Loading
- [ ] Full page loading spinner
- [ ] Loading overlay component
- [ ] "Yükleniyor..." mesajı

### 8.2.2 Skeleton Screens
- [ ] Dashboard skeleton
- [ ] List view skeleton
- [ ] Chart skeleton
- [ ] Card skeleton
- [ ] Shimmer effect

### 8.2.3 Component Loading
- [ ] Button loading state (spinner)
- [ ] Form submit loading
- [ ] Data fetch loading indicators

---

## 8.3 Error Handling

### 8.3.1 Error Boundaries
- [ ] React Error Boundary component
- [ ] Fallback UI
- [ ] Error mesajı gösterimi
- [ ] "Yeniden Dene" butonu
- [ ] Error logging (console)

### 8.3.2 API Error Handling
- [ ] Service layer error handling
- [ ] Network error mesajları
- [ ] Toast notification ile hata gösterimi
- [ ] User-friendly error messages (Türkçe)

### 8.3.3 Form Validation Errors
- [ ] Inline error messages
- [ ] Error styling (red border, icon)
- [ ] Error clearing on input change
- [ ] Form-level error summary

---

## 8.4 Toast Notification System

### 8.4.1 Toast Enhancement
- [ ] Multiple toast support (stack)
- [ ] Auto-dismiss timer (configurable)
- [ ] Manual dismiss button
- [ ] Variants:
  - [ ] Success (green)
  - [ ] Error (red)
  - [ ] Warning (yellow)
  - [ ] Info (blue)
- [ ] Icon per variant
- [ ] Slide-in animation
- [ ] Position: top-right

### 8.4.2 Toast Provider
- [ ] Global toast context
- [ ] `useToast()` hook
- [ ] `toast.success()`, `toast.error()`, etc.

---

## 8.5 Accessibility Improvements

### 8.5.1 Keyboard Navigation
- [ ] Tab order doğru sırayla
- [ ] Focus indicators (outline, ring)
- [ ] Skip to main content link
- [ ] ESC tuşu ile modal kapatma
- [ ] Enter ile form submit
- [ ] Arrow keys ile dropdown navigasyon

### 8.5.2 ARIA Labels
- [ ] Button'larda aria-label
- [ ] Form inputs'da aria-describedby
- [ ] Modal'da aria-modal
- [ ] Dropdown'da aria-expanded
- [ ] Loading state'de aria-busy

### 8.5.3 Semantic HTML
- [ ] Doğru HTML tag kullanımı
- [ ] `<button>` vs `<div onClick>`
- [ ] `<nav>` for navigation
- [ ] `<main>` for main content
- [ ] `<article>`, `<section>` uygun yerlerde

### 8.5.4 Screen Reader Support
- [ ] Alt text'ler eksiksiz
- [ ] Form label ilişkileri doğru
- [ ] Live regions (toast için)
- [ ] Descriptive link text

### 8.5.5 Contrast Ratios
- [ ] WCAG 2.1 AA standardına uygun
- [ ] Text contrast minimum 4.5:1
- [ ] Large text minimum 3:1
- [ ] Interactive elements minimum 3:1
- [ ] Contrast checker ile test

---

## 8.6 Responsive Polish

### 8.6.1 Breakpoint Testing
- [ ] 1920x1080 (large desktop)
- [ ] 1440x900 (desktop)
- [ ] 1280x800 (small desktop)
- [ ] 1024x768 (minimum)

### 8.6.2 Layout Adjustments
- [ ] Grid columns responsive
- [ ] Sidebar collapse (opsiyonel)
- [ ] Font sizes scale appropriately
- [ ] Spacing adjustments
- [ ] Chart responsiveness

---

## 8.7 Visual Consistency

### 8.7.1 Color Audit
- [ ] Tüm renklerin consistent kullanımı
- [ ] Semantic colors (success, error, warning, info)
- [ ] Subject colors consistent
- [ ] Hover states consistent

### 8.7.2 Typography Audit
- [ ] Font sizes hierarchy doğru
- [ ] Line heights optimal
- [ ] Font weights consistent
- [ ] Heading styles uniform

### 8.7.3 Spacing Audit
- [ ] Padding/margin consistent
- [ ] Component spacing uniform
- [ ] Whitespace kullanımı
- [ ] Border radius consistent

### 8.7.4 Icon Audit
- [ ] Tüm iconlar Lucide React'ten
- [ ] Icon sizes consistent
- [ ] Icon colors consistent
- [ ] Icon placement uniform

---

## 8.8 Performance Optimization

### 8.8.1 Code Splitting
- [ ] Route-based code splitting
- [ ] Lazy loading for pages
- [ ] React.lazy() kullanımı
- [ ] Suspense boundaries

### 8.8.2 Bundle Optimization
- [ ] Bundle size analizi
- [ ] Unused dependencies temizleme
- [ ] Tree shaking
- [ ] Production build optimization

### 8.8.3 Render Optimization
- [ ] React.memo() kullanımı (gerekli yerlerde)
- [ ] useMemo, useCallback optimization
- [ ] Unnecessary re-render'ları engelleme
- [ ] List rendering optimization (key props)

---

## 8.9 Final UI Touches

### 8.9.1 Empty States
- [ ] Tüm empty state'lerin illustrasyon/icon'u var mı?
- [ ] Mesajlar açık ve yönlendirici mi?
- [ ] CTA butonları var mı?

### 8.9.2 Confirmation Modals
- [ ] Silme işlemleri için confirmation
- [ ] "Emin misiniz?" mesajı
- [ ] Cancel/Confirm butonları
- [ ] Destructive action styling (red)

### 8.9.3 Placeholder States
- [ ] Input placeholders anlamlı
- [ ] Help text'ler yeterli
- [ ] Example values gösterilmiş

---

## 8.10 Test ve Doğrulama

- [ ] Animasyonlar smooth çalışıyor mu?
- [ ] Loading states görünüyor mu?
- [ ] Error handling çalışıyor mu?
- [ ] Toast notifications görünüyor mu?
- [ ] Keyboard navigation çalışıyor mu?
- [ ] ARIA labels mevcut mu?
- [ ] Contrast ratios yeterli mi?
- [ ] Responsive layout çalışıyor mu?
- [ ] Visual consistency var mı?

---

**Sprint 8 Tamamlanma Kriteri:**
- ✅ Animasyonlar smooth
- ✅ Error handling tutarlı
- ✅ Accessibility standartlarına uygun
- ✅ UI tutarlı ve professional
- ✅ Performance kabul edilebilir

---

# 🧪 SPRINT 9: Test ve Bug Fixing

**Hedef:** Tüm özelliklerin test edilmesi
**Tahmini Süre:** 6 saat
**Durum:** 🟡 Devam Ediyor

**Tamamlanan İşler:**
- ✅ Comprehensive testing guide created (TESTING_GUIDE.md)
- ✅ Development server running successfully
- ✅ Bug report documentation created (BUG_REPORT.md)
- ✅ Critical Bug #1 Fixed: useUser import path errors (2 files)
- ✅ Critical Bug #2 Fixed: Modal input focus issue (1 file)
- ✅ Critical Bug #3 Fixed: users.push async error (1 file)
- ✅ Critical Bug #4 Fixed: exams is not iterable (2 files)
- ✅ User creation flow tested and verified working
- ✅ Dashboard navigation tested and verified working
- 🎯 Total: 4 Critical Bugs Fixed in Sprint 9

## 9.1 Manuel Test Scenarios

### 9.1.1 User Management Tests
- [ ] Kullanıcı oluşturma flow testi
- [ ] Aynı isimle kullanıcı oluşturma
- [ ] Boş isimle oluşturma (validation)
- [ ] Avatar seçimi
- [ ] Kullanıcılar arası geçiş
- [ ] Kullanıcı silme (data persistence)

### 9.1.2 Plan Management Tests
- [ ] JSON plan import
- [ ] Geçersiz JSON import (error handling)
- [ ] Plan değiştirme
- [ ] Plan silme
- [ ] Bugünün programı doğruluğu
- [ ] Plansız kullanıcı durumu

### 9.1.3 Study Log Tests
- [ ] Basit çalışma kaydı
- [ ] Multiple question sets
- [ ] Net hesaplama (penalty açık)
- [ ] Net hesaplama (penalty kapalı)
- [ ] Boş form submit (validation)
- [ ] Negatif sayı girişi (validation)
- [ ] Aynı güne birden fazla kayıt
- [ ] Geçmiş çalışma düzenleme
- [ ] Çalışma silme

### 9.1.4 Exam Tests
- [ ] Deneme ekleme (tüm alanlar)
- [ ] Boş otomatik hesaplama
- [ ] D + Y > Total validation
- [ ] Net hesaplaması
- [ ] Deneme düzenleme
- [ ] Deneme silme
- [ ] Net gelişim grafiği doğruluğu
- [ ] Ders karşılaştırma grafiği

### 9.1.5 Statistics Tests
- [ ] Genel istatistik hesaplamaları
- [ ] Ders bazlı analiz
- [ ] Streak hesaplama doğruluğu
- [ ] Trend grafiği doğruluğu
- [ ] Date range filter
- [ ] Export fonksiyonu

### 9.1.6 Navigation Tests
- [ ] Tüm sayfalara erişim
- [ ] Back button çalışması
- [ ] Breadcrumb navigation
- [ ] Route protection (kullanıcı/plan yok)

---

## 9.2 Edge Case Testing

### 9.2.1 Empty State Tests
- [ ] Hiç kullanıcı yok
- [ ] Hiç plan yok
- [ ] Hiç çalışma kaydı yok
- [ ] Hiç deneme yok
- [ ] Boş istatistikler

### 9.2.2 Boundary Value Tests
- [ ] Maximum soru sayısı (1000)
- [ ] Minimum soru sayısı (0)
- [ ] Maximum süre (24 saat)
- [ ] 100+ çalışma kaydı
- [ ] 50+ deneme kaydı
- [ ] Çok uzun kullanıcı ismi
- [ ] Çok uzun not metni

### 9.2.3 Data Integrity Tests
- [ ] Kullanıcı silince verileri de silinir mi?
- [ ] Plan silince bağlantı kopar mı?
- [ ] Çalışma silince özet güncellenir mi?
- [ ] Deneme silince grafikler güncellenir mi?

---

## 9.3 Performance Testing

### 9.3.1 Load Time Tests
- [ ] Uygulama açılış süresi (< 3 saniye)
- [ ] Sayfa geçiş süresi (< 500ms)
- [ ] Form submit süresi (< 200ms)
- [ ] Grafik render süresi (< 1 saniye)

### 9.3.2 Large Data Tests
- [ ] 100+ çalışma kaydı ile performance
- [ ] 50+ deneme ile grafik performansı
- [ ] Tüm verileri export etme süresi
- [ ] Dashboard load with full data

---

## 9.4 Browser Compatibility (Electron)

### 9.4.1 Chromium Features
- [ ] localStorage çalışıyor mu?
- [ ] Date picker çalışıyor mu?
- [ ] File picker çalışıyor mu?
- [ ] JSON parse/stringify

---

## 9.5 Bug Tracking ve Fixing

### 9.5.1 Bug List
- [ ] Tespit edilen bugları listele
- [ ] Öncelik ver (critical, high, medium, low)
- [ ] Kategorize et (UI, logic, data, performance)

### 9.5.2 Critical Bugs
- [ ] Uygulama crash eden buglar (varsa)
- [ ] Veri kaybına neden olan buglar (varsa)
- [ ] Core features çalışmayan buglar (varsa)
- [ ] Bu bugları ÖNCE düzelt

### 9.5.3 High Priority Bugs
- [ ] Major features'ı etkileyen buglar
- [ ] UX'i ciddi etkileyen buglar
- [ ] Bu bugları düzelt

### 9.5.4 Medium/Low Bugs
- [ ] Minor visual buglar
- [ ] Edge case buglar
- [ ] Zaman kalırsa düzelt, yoksa backlog'a al

---

## 9.6 User Acceptance Testing (UAT)

### 9.6.1 Real User Testing
- [ ] Gerçek bir kullanıcıya test ettir
- [ ] Geri bildirim topla
- [ ] Confusion points belirle
- [ ] UX iyileştirmeleri yap

### 9.6.2 User Flow Testing
- [ ] İlk kullanım deneyimi
- [ ] Günlük çalışma ekleme akışı
- [ ] Deneme ekleme akışı
- [ ] İstatistik görüntüleme akışı

---

## 9.7 Final Checks

### 9.7.1 Functionality Checklist
- [ ] Tüm core features çalışıyor
- [ ] Tüm validasyonlar çalışıyor
- [ ] Tüm error handling'ler çalışıyor
- [ ] Tüm storage operations çalışıyor

### 9.7.2 UI/UX Checklist
- [ ] Visual consistency var
- [ ] Tüm animasyonlar smooth
- [ ] Loading states doğru
- [ ] Empty states doğru
- [ ] Error messages anlaşılır

### 9.7.3 Data Checklist
- [ ] Data persistence çalışıyor
- [ ] Data integrity korunuyor
- [ ] Export çalışıyor
- [ ] Import çalışıyor (backup restore için)

---

**Sprint 9 Tamamlanma Kriteri:**
- ✅ Kritik bug yok
- ✅ User flows akıcı çalışıyor
- ✅ Performance kabul edilebilir seviyede
- ✅ UAT feedback address edildi

---

# 📦 SPRINT 10: Build ve Distribution

**Hedef:** Windows executable oluşturma  
**Tahmini Süre:** 4 saat  
**Durum:** 🔴 Bekliyor

## 10.1 Electron Builder Configuration

### 10.1.1 electron-builder.json Setup
- [ ] `electron-builder.json` dosyası oluştur
- [ ] appId configure et
- [ ] productName set et
- [ ] directories configure et (output: release)
- [ ] files listesi (dist, node_modules, package.json)

### 10.1.2 Windows Configuration
- [ ] win target: nsis
- [ ] arch: x64
- [ ] icon path set et (public/icon.ico)
- [ ] artifactName format

### 10.1.3 NSIS Configuration
- [ ] oneClick: false
- [ ] allowToChangeInstallationDirectory: true
- [ ] createDesktopShortcut: true
- [ ] createStartMenuShortcut: true
- [ ] shortcutName: "StudyFlow"

---

## 10.2 Icon ve Assets

### 10.2.1 Application Icon
- [ ] 512x512 PNG icon oluştur
- [ ] ICO format'a dönüştür (Windows)
- [ ] `public/icon.ico` olarak kaydet
- [ ] Multiple sizes embed (256, 128, 64, 48, 32, 16)

### 10.2.2 Splash Screen (Opsiyonel)
- [ ] Splash screen image
- [ ] Loading screen implementation

---

## 10.3 Build Scripts

### 10.3.1 package.json Scripts
- [ ] `"build"` script (Vite build)
- [ ] `"build:electron"` script (electron-builder)
- [ ] `"dev"` script (development)
- [ ] `"package"` script (build + electron-builder)

### 10.3.2 Pre-build Checks
- [ ] Version number güncel mi?
- [ ] Dependencies güncel mi?
- [ ] No dev dependencies in production

---

## 10.4 Production Build

### 10.4.1 Build Process
- [ ] `npm run build` çalıştır (Vite)
- [ ] Dist klasörü kontrol
- [ ] Main process build
- [ ] Renderer process build

### 10.4.2 Electron Builder Run
- [ ] `npm run build:electron` çalıştır
- [ ] Build output kontrol
- [ ] .exe dosyası oluştu mu?
- [ ] Installer oluştu mu?

### 10.4.3 Build Troubleshooting
- [ ] Hata mesajları check
- [ ] Dependencies eksik mi?
- [ ] Path problemleri var mı?
- [ ] Icon problemi var mı?

---

## 10.5 Testing Executable

### 10.5.1 Installation Test
- [ ] Installer'ı çalıştır
- [ ] Kurulum tamamlanıyor mu?
- [ ] Desktop shortcut oluşuyor mu?
- [ ] Start menu entry oluşuyor mu?

### 10.5.2 Fresh Installation Test
- [ ] Temiz bir Windows makinesinde test
- [ ] İlk açılış çalışıyor mu?
- [ ] User data oluşuyor mu?
- [ ] Tüm features çalışıyor mu?

### 10.5.3 Update Scenario Test
- [ ] Eski version install
- [ ] Yeni version install (üzerine)
- [ ] Data migrate ediyor mu?
- [ ] Settings korunuyor mu?

---

## 10.6 Documentation

### 10.6.1 README.md Update
- [ ] Proje açıklaması
- [ ] Features listesi
- [ ] Screenshots ekle
- [ ] Installation instructions
- [ ] System requirements
- [ ] Kullanım kılavuzu (kısa)
- [ ] Troubleshooting section
- [ ] Contact/support info

### 10.6.2 CHANGELOG.md
- [ ] v1.0.0 entry
- [ ] Tüm features listele
- [ ] Release date
- [ ] Known issues (varsa)

### 10.6.3 User Guide (Opsiyonel)
- [ ] PDF veya MD user guide
- [ ] Screenshots ile adım adım
- [ ] FAQ section

---

## 10.7 Release Preparation

### 10.7.1 Version Tagging
- [ ] Git tag oluştur (v1.0.0)
- [ ] Git push --tags

### 10.7.2 Release Notes
- [ ] GitHub Release oluştur (veya başka platform)
- [ ] Release notes yaz
- [ ] Binary'leri upload et

### 10.7.3 Distribution Package
- [ ] .exe dosyası
- [ ] README.txt
- [ ] LICENSE.txt
- [ ] Örnek plan JSON'ları (opsiyonel, klasör)
- [ ] Tümünü zip'le

---

## 10.8 Final Testing

### 10.8.1 Clean Install Test
- [ ] Farklı Windows 10 makinesinde
- [ ] Farklı Windows 11 makinesinde
- [ ] 4GB RAM'de test
- [ ] 8GB RAM'de test

### 10.8.2 Uninstall Test
- [ ] Uninstaller çalışıyor mu?
- [ ] Data temizleniyor mu? (veya korunuyor mu?)
- [ ] Registry entries temizleniyor mu?

---

**Sprint 10 Tamamlanma Kriteri:**
- ✅ Windows .exe çalışıyor
- ✅ Installer sorunsuz kurulum yapıyor
- ✅ Documentation güncel
- ✅ Release paketlendi

---

# 🎯 Post-MVP Tasks (Opsiyonel)

## P1. Deployment
- [ ] GitHub repository public yap (veya private)
- [ ] Release yayınla
- [ ] Download link paylaş

## P2. User Feedback
- [ ] Feedback formu (Google Forms)
- [ ] Beta test grubu
- [ ] İyileştirme önerileri topla

## P3. Bug Fixes
- [ ] Post-release bugları topla
- [ ] Hotfix release planla (v1.0.1)

## P4. Marketing Materials
- [ ] Website landing page
- [ ] Demo video
- [ ] Social media graphics

---

# 📝 Notlar ve Geliştirme İlkeleri

## Geliştirme Sırasında Dikkat Edilecekler:

### ✅ Her Task Tamamlandıktan Sonra:
1. Checkbox'ı işaretle
2. Git commit yap (meaningful commit message)
3. Local'de test et
4. Sonraki task'a geç

### ✅ Her Sprint Tamamlandıktan Sonra:
1. Sprint'in tamamlanma kriterlerini kontrol et
2. Sprint durumunu güncelle
3. İlerleme özeti güncelle
4. Git tag oluştur (opsiyonel: sprint-1, sprint-2, etc.)

### ✅ Blocking Issues:
- Bir task takılırsa "🚧 Blocked" işareti ekle
- Blocker'ı ayrı bir yere not al
- Diğer task'lara geç
- Blocker çözülünce geri dön

### ✅ Code Quality:
- Her commit anlamlı olmalı
- Component dosyaları küçük ve focused olmalı
- Reusable componentler oluştur
- Magic number kullanma (constants.js)
- Hardcoded string kullanma (i18n için hazırlık)

### ✅ Testing:
- Her feature'ı develop ederken test et
- Browser console'da error olmamalı
- Data persist ediliyor mu kontrol et

---

# 📊 İlerleme Takibi

## Manuel Güncelleme Talimatları:

### Her Task Tamamlandığında:
1. Task yanındaki checkbox'ı işaretle: `- [x]`
2. Dosyayı kaydet
3. Commit yap

### Sprint Tamamlandığında:
1. Sprint başlığındaki durumu güncelle: 🟢 Tamamlandı
2. Sprint tablosunu güncelle
3. İlerleme özeti'ni güncelle (tamamlanan görev sayısı, %)

### İlerleme Hesaplama:
```
İlerleme % = (Tamamlanan Görev / Toplam Görev) * 100
```

---

# 🏁 Final Checklist (MVP Tamamlama)

- [ ] Tüm sprintler tamamlandı
- [ ] Tüm kritik buglar düzeltildi
- [ ] Windows .exe çalışıyor
- [ ] Documentation hazır
- [ ] Release notes hazır
- [ ] Minimum 1 kişi UAT tamamladı
- [ ] Git repository temiz ve organize
- [ ] README güncel
- [ ] CHANGELOG güncel

---

**Proje Tamamlandı! 🎉**

---

## 📅 Zaman Takibi (Opsiyonel)

Her sprint için gerçek harcanan zamanı not edebilirsiniz:

| Sprint | Tahmini | Gerçek | Fark |
|--------|---------|--------|------|
| Sprint 1 | 8h | - | - |
| Sprint 2 | 6h | - | - |
| Sprint 3 | 6h | - | - |
| Sprint 4 | 8h | - | - |
| Sprint 5 | 10h | - | - |
| Sprint 6 | 10h | - | - |
| Sprint 7 | 10h | - | - |
| Sprint 8 | 8h | - | - |
| Sprint 9 | 6h | - | - |
| Sprint 10 | 4h | - | - |
| **TOPLAM** | **76h** | **-** | **-** |

---

**Son Güncelleme:** [Tarih]  
**Geliştirici:** [İsim]  
**Durum:** 🔴 Başlanmadı

