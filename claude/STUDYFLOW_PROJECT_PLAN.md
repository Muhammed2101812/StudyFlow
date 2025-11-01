# 📚 StudyFlow - Kapsamlı Proje Planı

## 📋 İçindekiler

- [1. Proje Özeti](#1-proje-özeti)
- [2. Teknik Mimari](#2-teknik-mimari)
- [3. Özellikler ve Gereksinimler](#3-özellikler-ve-gereksinimler)
- [4. UI/UX Tasarım Detayları](#4-uiux-tasarım-detayları)
- [5. Veri Modelleri](#5-veri-modelleri)
- [6. Fonksiyonlar ve Servisler](#6-fonksiyonlar-ve-servisler)
- [7. Geliştirme Aşamaları](#7-geliştirme-aşamaları)
- [8. Test Planı](#8-test-planı)
- [9. Deployment ve Distribution](#9-deployment-ve-distribution)
- [10. Gelecek Versiyonlar](#10-gelecek-versiyonlar)
- [11. Ekler](#11-ekler)

---

## 1. Proje Özeti

### 1.1 Proje Adı
**StudyFlow** - Universal Study Planning & Tracking Application

### 1.2 Versiyon
**v1.0.0** (MVP - Minimum Viable Product)

### 1.3 Proje Tanımı
StudyFlow, öğrencilerin sınav hazırlık süreçlerini planlayabilecekleri, günlük çalışmalarını takip edebilecekleri ve deneme sınavı performanslarını analiz edebilecekleri masaüstü bir uygulamadır.

### 1.4 Hedef Kitle
- İlkokul öğrencileri
- Ortaokul öğrencileri (LGS hazırlığı)
- Lise öğrencileri (YKS hazırlığı)
- Üniversite öğrencileri
- KPSS adayları
- Diğer sınav hazırlıkları (DGS, ALES, YDS, vb.)

### 1.5 Platform
- **Ana Platform:** Windows 10/11 (64-bit)
- **Gelecek Versiyonlar:** macOS, Linux

### 1.6 Temel Özellikler
- ✅ Multi-user support (birden fazla kullanıcı profili)
- ✅ JSON tabanlı çalışma planı import sistemi
- ✅ Günlük çalışma takibi (konu, süre, soru detayları)
- ✅ Esnek net hesaplama (yanlış siler/silmez seçeneği)
- ✅ Deneme sınavı yönetimi ve analizi
- ✅ Detaylı istatistikler ve görselleştirme
- ✅ Offline çalışma (internet bağlantısı gerektirmez)
- ✅ Veri export (JSON formatında)

### 1.7 Proje Hedefleri
1. **Kullanım Kolaylığı:** Tüm yaş gruplarının rahatlıkla kullanabileceği sade arayüz
2. **Esneklik:** Farklı sınav türleri için özelleştirilebilir plan yapısı
3. **Motivasyon:** Görsel geri bildirimlerle öğrenciyi motive etme
4. **Güvenilirlik:** Veri kaybı olmayan güvenli lokal depolama
5. **Performans:** Hızlı açılış ve akıcı kullanıcı deneyimi

---

## 2. Teknik Mimari

### 2.1 Teknoloji Stack'i

#### 2.1.1 Frontend Framework
```
React 18.2.0
├── React Router DOM 6.x (Sayfa yönlendirme)
├── React Hook Form (Form yönetimi)
└── Context API (Global state management)
```

#### 2.1.2 Desktop Framework
```
Electron 28.x
├── Electron Builder (Packaging)
├── Electron Store (Persistent storage)
└── Electron IPC (Process communication)
```

#### 2.1.3 UI ve Styling
```
Tailwind CSS 3.x
├── Headless UI (Accessible components)
├── Lucide React (Icon library)
└── Framer Motion (Animations)
```

#### 2.1.4 Grafik ve Görselleştirme
```
Recharts 2.x
└── Custom chart components
```

#### 2.1.5 Utility Libraries
```
date-fns 3.x (Tarih işlemleri)
clsx (Conditional classNames)
uuid (Unique ID generation)
```

#### 2.1.6 Build Tools
```
Vite 5.x
├── @vitejs/plugin-react
└── vite-plugin-electron
```

### 2.2 Proje Yapısı

```
studyflow/
│
├── src/
│   ├── main/                          # Electron Main Process
│   │   ├── main.js                    # Ana electron process
│   │   ├── preload.js                 # Preload script (IPC bridge)
│   │   └── menu.js                    # Uygulama menüsü
│   │
│   ├── renderer/                      # React Application
│   │   ├── components/                # React bileşenleri
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Layout.jsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── TodayProgram.jsx
│   │   │   │   ├── WeeklySummary.jsx
│   │   │   │   ├── ProgressBar.jsx
│   │   │   │   └── QuickActions.jsx
│   │   │   │
│   │   │   ├── study/
│   │   │   │   ├── StudyLogForm.jsx
│   │   │   │   ├── QuestionSetInput.jsx
│   │   │   │   ├── NetCalculator.jsx
│   │   │   │   └── Calendar.jsx
│   │   │   │
│   │   │   ├── exams/
│   │   │   │   ├── ExamForm.jsx
│   │   │   │   ├── ExamList.jsx
│   │   │   │   ├── ExamDetail.jsx
│   │   │   │   └── ExamChart.jsx
│   │   │   │
│   │   │   ├── stats/
│   │   │   │   ├── OverviewStats.jsx
│   │   │   │   ├── SubjectStats.jsx
│   │   │   │   ├── TrendChart.jsx
│   │   │   │   └── WeakTopics.jsx
│   │   │   │
│   │   │   ├── user/
│   │   │   │   ├── UserSelect.jsx
│   │   │   │   ├── UserCard.jsx
│   │   │   │   └── CreateUser.jsx
│   │   │   │
│   │   │   └── common/
│   │   │       ├── Button.jsx
│   │   │       ├── Input.jsx
│   │   │       ├── Modal.jsx
│   │   │       ├── Toast.jsx
│   │   │       ├── Dropdown.jsx
│   │   │       ├── Checkbox.jsx
│   │   │       └── LoadingSpinner.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── UserSelectPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── StudyLogPage.jsx
│   │   │   ├── ExamsPage.jsx
│   │   │   ├── StatsPage.jsx
│   │   │   └── SettingsPage.jsx
│   │   │
│   │   ├── contexts/
│   │   │   ├── UserContext.jsx
│   │   │   ├── PlanContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useUser.js
│   │   │   ├── usePlan.js
│   │   │   ├── useProgress.js
│   │   │   ├── useExams.js
│   │   │   └── useStats.js
│   │   │
│   │   ├── services/
│   │   │   ├── storageService.js      # Electron Store wrapper
│   │   │   ├── userService.js
│   │   │   ├── planService.js
│   │   │   ├── progressService.js
│   │   │   ├── examService.js
│   │   │   └── exportService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── calculations.js        # Net hesaplamaları
│   │   │   ├── dateHelpers.js         # Tarih fonksiyonları
│   │   │   ├── validators.js          # Form validasyonları
│   │   │   ├── formatters.js          # Veri formatlama
│   │   │   └── constants.js           # Sabitler
│   │   │
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── tailwind.css
│   │   │
│   │   ├── App.jsx                    # Ana React component
│   │   ├── main.jsx                   # React entry point
│   │   └── router.jsx                 # Route tanımlamaları
│   │
│   └── assets/
│       ├── icons/                     # Uygulama ikonları
│       ├── images/                    # Görseller
│       └── plans/                     # Örnek plan JSON dosyaları
│           ├── kpss-2026.json
│           ├── yks-2025.json
│           └── lgs-2025.json
│
├── public/
│   └── icon.png                       # Uygulama ikonu
│
├── dist/                              # Build çıktıları
├── release/                           # Paketlenmiş uygulamalar
│
├── package.json
├── package-lock.json
├── vite.config.js
├── electron-builder.json
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
├── README.md
└── CHANGELOG.md
```

### 2.3 Mimari Diyagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Electron Main Process                    │
│  ┌────────────┐  ┌──────────────┐  ┌──────────────────┐    │
│  │   Window   │  │  Menu System │  │  File System I/O │    │
│  │ Management │  │              │  │                  │    │
│  └────────────┘  └──────────────┘  └──────────────────┘    │
│         │                │                    │              │
│         └────────────────┼────────────────────┘              │
│                          │                                   │
│                    IPC Bridge                                │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
┌──────────────────────────┼───────────────────────────────────┐
│                          │                                   │
│              Electron Renderer Process                       │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    React App                         │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐    │  │
│  │  │   Pages    │  │ Components │  │  Contexts  │    │  │
│  │  └────────────┘  └────────────┘  └────────────┘    │  │
│  │         │                │                │          │  │
│  │         └────────────────┼────────────────┘          │  │
│  │                          │                           │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │              Services Layer                    │ │  │
│  │  │  ┌─────────┐ ┌─────────┐ ┌──────────────┐    │ │  │
│  │  │  │  User   │ │  Plan   │ │   Progress   │    │ │  │
│  │  │  │ Service │ │ Service │ │    Service   │    │ │  │
│  │  │  └─────────┘ └─────────┘ └──────────────┘    │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  │                          │                           │  │
│  │  ┌────────────────────────────────────────────────┐ │  │
│  │  │          Electron Store (Storage)             │ │  │
│  │  │  ┌─────────────┐  ┌──────────────────────┐   │ │  │
│  │  │  │  users.json │  │  user_XXX/           │   │ │  │
│  │  │  │             │  │  ├─ progress.json    │   │ │  │
│  │  │  │  plans/     │  │  ├─ exams.json       │   │ │  │
│  │  │  │             │  │  └─ settings.json    │   │ │  │
│  │  │  └─────────────┘  └──────────────────────┘   │ │  │
│  │  └────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### 2.4 Veri Akışı

#### 2.4.1 Çalışma Kaydı Veri Akışı
```
1. Kullanıcı formu doldurur
   └─> StudyLogForm.jsx

2. Form submit edilir
   └─> handleSubmit()
       └─> progressService.saveStudyLog()
           └─> Electron Store'a yazılır
               └─> progress.json güncellenir

3. Context güncellenir
   └─> PlanContext.refreshProgress()
       └─> UI otomatik yeniden render olur
```

#### 2.4.2 Deneme Sınavı Veri Akışı
```
1. Kullanıcı deneme bilgilerini girer
   └─> ExamForm.jsx

2. Net hesaplamaları yapılır
   └─> calculateNet() (utils/calculations.js)

3. Deneme kaydedilir
   └─> examService.saveExam()
       └─> exams.json güncellenir

4. İstatistikler yeniden hesaplanır
   └─> statsService.recalculate()
```

---

## 3. Özellikler ve Gereksinimler

### 3.1 Fonksiyonel Gereksinimler

#### 3.1.1 Kullanıcı Yönetimi
| ID | Özellik | Öncelik | Durum |
|----|---------|---------|-------|
| UM-01 | Yeni kullanıcı oluşturabilme | Yüksek | ✅ MVP |
| UM-02 | Kullanıcı avatarı seçebilme | Orta | ✅ MVP |
| UM-03 | Kullanıcı profili düzenleyebilme | Orta | ✅ MVP |
| UM-04 | Kullanıcı silebilme | Düşük | ✅ MVP |
| UM-05 | Kullanıcılar arası geçiş yapabilme | Yüksek | ✅ MVP |

#### 3.1.2 Plan Yönetimi
| ID | Özellik | Öncelik | Durum |
|----|---------|---------|-------|
| PM-01 | JSON plan import edebilme | Yüksek | ✅ MVP |
| PM-02 | Birden fazla plan yükleyebilme | Orta | ✅ MVP |
| PM-03 | Aktif plan değiştirebilme | Orta | ✅ MVP |
| PM-04 | Plan silme | Düşük | ✅ MVP |
| PM-05 | Manuel plan oluşturma | Düşük | 🔮 v2.0 |
| PM-06 | PDF'den plan import etme | Düşük | 🔮 v2.0 |

#### 3.1.3 Çalışma Takibi
| ID | Özellik | Öncelik | Durum |
|----|---------|---------|-------|
| ST-01 | Günlük çalışma kaydedebilme | Yüksek | ✅ MVP |
| ST-02 | Konu bazlı işaretleme | Yüksek | ✅ MVP |
| ST-03 | Ders bazlı D/Y girişi | Yüksek | ✅ MVP |
| ST-04 | Birden fazla soru seti ekleme | Yüksek | ✅ MVP |
| ST-05 | "Yanlış siler" checkbox | Yüksek | ✅ MVP |
| ST-06 | Otomatik net hesaplama | Yüksek | ✅ MVP |
| ST-07 | Çalışma süresi girişi | Orta | ✅ MVP |
| ST-08 | Not ekleme | Düşük | ✅ MVP |
| ST-09 | Geçmiş çalışmaları düzenleme | Orta | ✅ MVP |
| ST-10 | Pomodoro timer entegrasyonu | Düşük | 🔮 v2.0 |

#### 3.1.4 Deneme Sınavları
| ID | Özellik | Öncelik | Durum |
|----|---------|---------|-------|
| EX-01 | Deneme sınavı ekleyebilme | Yüksek | ✅ MVP |
| EX-02 | Ders bazlı D/Y/Boş girişi | Yüksek | ✅ MVP |
| EX-03 | Otomatik net hesaplama | Yüksek | ✅ MVP |
| EX-04 | Deneme listesi görüntüleme | Yüksek | ✅ MVP |
| EX-05 | Deneme detayı görüntüleme | Orta | ✅ MVP |
| EX-06 | Deneme düzenleme | Orta | ✅ MVP |
| EX-07 | Deneme silme | Orta | ✅ MVP |
| EX-08 | Net gelişim grafiği | Yüksek | ✅ MVP |
| EX-09 | Zayıf konu tespiti | Orta | ✅ MVP |

#### 3.1.5 İstatistikler ve Raporlar
| ID | Özellik | Öncelik | Durum |
|----|---------|---------|-------|
| SR-01 | Genel ilerleme gösterimi | Yüksek | ✅ MVP |
| SR-02 | Ders bazlı analiz | Yüksek | ✅ MVP |
| SR-03 | Haftalık/aylık özet | Orta | ✅ MVP |
| SR-04 | Çalışma tutarlılığı (streak) | Orta | ✅ MVP |
| SR-05 | Zayıf/güçlü konular | Orta | ✅ MVP |
| SR-06 | Trend grafikleri | Orta | ✅ MVP |
| SR-07 | PDF rapor export | Düşük | 🔮 v2.0 |
| SR-08 | Excel export | Düşük | 🔮 v2.0 |

#### 3.1.6 Veri Yönetimi
| ID | Özellik | Öncelik | Durum |
|----|---------|---------|-------|
| DM-01 | Lokal veri saklama | Yüksek | ✅ MVP |
| DM-02 | JSON export | Orta | ✅ MVP |
| DM-03 | JSON import (backup restore) | Orta | ✅ MVP |
| DM-04 | Otomatik backup | Düşük | 🔮 v2.0 |
| DM-05 | Cloud sync | Düşük | 🔮 v3.0 |

### 3.2 Non-Fonksiyonel Gereksinimler

#### 3.2.1 Performans
- Uygulama açılış süresi: < 3 saniye
- Sayfa geçiş süresi: < 500ms
- Form submit süresi: < 200ms
- Grafik render süresi: < 1 saniye

#### 3.2.2 Kullanılabilirlik
- Sezgisel arayüz tasarımı
- 7-70 yaş arası herkesin kullanabileceği basitlik
- Türkçe dil desteği
- Klavye kısayolları desteği
- Erişilebilirlik standartlarına uygunluk (WCAG 2.1 AA)

#### 3.2.3 Güvenilirlik
- Veri kaybı riski: %0
- Uygulama çökme oranı: < %1
- Otomatik veri kaydetme
- Hata durumunda graceful degradation

#### 3.2.4 Güvenlik
- Lokal veri şifreleme (opsiyonel)
- Kullanıcı verilerinin cihazda kalması
- Hassas bilgi içermeme

#### 3.2.5 Taşınabilirlik
- Windows 10/11 desteği
- Minimum sistem gereksinimleri:
  - RAM: 4GB
  - Disk: 500MB boş alan
  - CPU: Intel Core i3 veya eşdeğeri

---

## 4. UI/UX Tasarım Detayları

### 4.1 Tasarım Prensipleri

#### 4.1.1 Visual Hierarchy
- **Birincil Bilgiler:** Büyük font, bold, koyu renk
- **İkincil Bilgiler:** Orta font, regular, orta ton
- **Üçüncül Bilgiler:** Küçük font, light, açık renk

#### 4.1.2 Renk Paleti

```css
/* Ana Renkler */
--primary-50: #EFF6FF;
--primary-100: #DBEAFE;
--primary-200: #BFDBFE;
--primary-300: #93C5FD;
--primary-400: #60A5FA;
--primary-500: #3B82F6;  /* Ana mavi */
--primary-600: #2563EB;
--primary-700: #1D4ED8;
--primary-800: #1E40AF;
--primary-900: #1E3A8A;

/* Semantik Renkler */
--success: #10B981;      /* Yeşil - başarı */
--warning: #F59E0B;      /* Turuncu - uyarı */
--error: #EF4444;        /* Kırmızı - hata */
--info: #3B82F6;         /* Mavi - bilgi */

/* Nötr Renkler */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-200: #E5E7EB;
--gray-300: #D1D5DB;
--gray-400: #9CA3AF;
--gray-500: #6B7280;
--gray-600: #4B5563;
--gray-700: #374151;
--gray-800: #1F2937;
--gray-900: #111827;

/* Ders Renkleri */
--subject-turkce: #EF4444;
--subject-matematik: #3B82F6;
--subject-tarih: #8B5CF6;
--subject-cografya: #10B981;
--subject-vatandaslik: #F59E0B;
--subject-guncel: #6B7280;
```

#### 4.1.3 Typography

```css
/* Font Family */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Courier New', monospace;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

#### 4.1.4 Spacing System

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

#### 4.1.5 Border Radius

```css
--radius-sm: 0.25rem;   /* 4px */
--radius-md: 0.5rem;    /* 8px */
--radius-lg: 0.75rem;   /* 12px */
--radius-xl: 1rem;      /* 16px */
--radius-full: 9999px;  /* Tam yuvarlak */
```

### 4.2 Component Library

#### 4.2.1 Button Component

```jsx
// Variants: primary, secondary, ghost, danger
// Sizes: sm, md, lg
// States: default, hover, active, disabled

<Button variant="primary" size="md" onClick={handleClick}>
  Kaydet
</Button>
```

**Specifications:**
- Height: sm (32px), md (40px), lg (48px)
- Padding: sm (12px), md (16px), lg (20px)
- Border radius: --radius-md
- Transition: all 150ms ease

#### 4.2.2 Input Component

```jsx
<Input
  label="İsim"
  placeholder="Adınızı girin"
  value={name}
  onChange={setName}
  error={errors.name}
  helpText="En az 2 karakter olmalı"
/>
```

**Specifications:**
- Height: 40px
- Border: 1px solid --gray-300
- Focus: border --primary-500, shadow
- Error: border --error, error message below

#### 4.2.3 Card Component

```jsx
<Card>
  <CardHeader>
    <CardTitle>Başlık</CardTitle>
  </CardHeader>
  <CardContent>
    İçerik
  </CardContent>
</Card>
```

#### 4.2.4 Modal Component

```jsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <ModalHeader>Başlık</ModalHeader>
  <ModalBody>
    İçerik
  </ModalBody>
  <ModalFooter>
    <Button onClick={handleClose}>İptal</Button>
    <Button variant="primary">Onayla</Button>
  </ModalFooter>
</Modal>
```

### 4.3 Sayfa Layoutları

#### 4.3.1 Main Layout

```
┌─────────────────────────────────────────────────────┐
│  Navbar (60px height)                               │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│ Sidebar  │        Main Content Area                │
│ (240px)  │        (Flex-grow)                       │
│          │                                          │
│          │                                          │
│          │                                          │
│          │                                          │
└──────────┴──────────────────────────────────────────┘
```

#### 4.3.2 Responsive Breakpoints

```css
/* Mobil (gelecek versiyonlar için) */
@media (max-width: 640px) { }

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) { }

/* Desktop (ana hedef) */
@media (min-width: 1025px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

### 4.4 Animasyon ve Geçişler

#### 4.4.1 Sayfa Geçişleri
```css
/* Fade in */
.page-enter {
  opacity: 0;
}
.page-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
```

#### 4.4.2 Component Animasyonları
- Modal açılış: scale(0.95) → scale(1) + opacity 0 → 1
- Toast notification: slide in from right
- Loading spinner: rotate animation
- Button hover: subtle scale(1.02)
- Checkbox check: bounce animation

### 4.5 Erişilebilirlik (A11y)

#### 4.5.1 Keyboard Navigation
- Tab order mantıklı sırayla
- Tüm interactive elementler keyboard ile erişilebilir
- Focus indicator görünür (outline)
- Escape tuşu ile modal kapatma

#### 4.5.2 Screen Reader Support
- Semantic HTML kullanımı
- ARIA labels uygun yerlerde
- Alt text'ler eksiksiz
- Form label'ları doğru ilişkilendirilmiş

#### 4.5.3 Contrast Ratios
- Normal text: minimum 4.5:1
- Large text: minimum 3:1
- Interactive elements: minimum 3:1

---

## 5. Veri Modelleri

### 5.1 Users Model

```json
{
  "users": [
    {
      "id": "user_001",           // UUID v4
      "name": "Ahmet Yılmaz",     // String (2-50 karakter)
      "avatar": "👤",             // Emoji veya icon kodu
      "createdAt": "2025-11-01T10:00:00Z",  // ISO 8601
      "lastActive": "2025-11-07T20:30:00Z", // ISO 8601
      "activePlan": "kpss-2026",  // Plan ID referansı
      "settings": {
        "theme": "light",         // light | dark
        "language": "tr",         // tr | en
        "penaltyDefault": true    // Varsayılan "yanlış siler"
      }
    }
  ]
}
```

### 5.2 Plan Model

```json
{
  "id": "kpss-2026",
  "name": "KPSS Ortaöğretim 2026",
  "description": "2026 KPSS Ortaöğretim sınavı hazırlık planı",
  "examDate": "2026-09-15",
  "totalWeeks": 45,
  "createdAt": "2025-11-01T00:00:00Z",
  "version": "1.0",
  
  "subjects": [
    {
      "id": "turkce",
      "name": "Türkçe",
      "totalQuestions": 30,
      "color": "#EF4444",
      "icon": "📚"
    },
    {
      "id": "matematik",
      "name": "Matematik",
      "totalQuestions": 30,
      "color": "#3B82F6",
      "icon": "🔢"
    }
    // ... diğer dersler
  ],
  
  "stages": [
    {
      "id": "stage_1",
      "name": "Aşama 1: Temel Atma",
      "description": "Sıfır seviyeden başlangıç, temel kavramlar",
      "startDate": "2025-11-01",
      "endDate": "2026-02-28",
      "totalWeeks": 17,
      "weeklyHours": "6-8",
      
      "weeks": [
        {
          "weekNumber": 1,
          "startDate": "2025-11-01",
          "endDate": "2025-11-07",
          
          "days": [
            {
              "id": "day_001",
              "date": "2025-11-05",
              "dayName": "Salı",
              "subject": "turkce",
              "topic": "Paragraf okuma-anlama tekniği",
              "description": "Paragraf türleri ve anlam çıkarma",
              "duration": 1.5,           // Saat cinsinden
              "targetQuestions": 50,     // Hedef soru sayısı
              "difficulty": "beginner"   // beginner | intermediate | advanced
            },
            {
              "id": "day_002",
              "date": "2025-11-06",
              "dayName": "Çarşamba",
              "subject": "matematik",
              "topic": "Temel kavramlar + Sayılar",
              "description": "Doğal sayılar, tam sayılar",
              "duration": 1.5,
              "targetQuestions": 50,
              "difficulty": "beginner"
            }
            // ... diğer günler
          ]
        }
        // ... diğer haftalar
      ]
    }
    // ... diğer aşamalar
  ],
  
  "tips": [
    "Her gün düzenli çalışmak önemli",
    "Zor konuları ertesi gün tekrar et"
  ]
}
```

### 5.3 Progress Model

```json
{
  "userId": "user_001",
  "planId": "kpss-2026",
  
  "dailyLogs": {
    "2025-11-05": {
      "id": "log_001",
      "planDayId": "day_001",
      "date": "2025-11-05",
      "subject": "turkce",
      "topic": "Paragraf okuma-anlama",
      
      "duration": 1.5,        // Gerçek çalışma süresi (saat)
      
      "questionSets": [
        {
          "id": "set_001",
          "subject": "turkce",
          "correct": 45,
          "wrong": 5,
          "blank": 0,
          "penaltyEnabled": true,
          "net": 43.75
        },
        {
          "id": "set_002",
          "subject": "turkce",
          "correct": 20,
          "wrong": 2,
          "blank": 0,
          "penaltyEnabled": true,
          "net": 19.5
        }
      ],
      
      "totalCorrect": 65,
      "totalWrong": 7,
      "totalBlank": 0,
      "totalNet": 63.25,
      "totalQuestions": 72,
      
      "completed": true,      // Konu tamamlandı mı?
      "notes": "İyi gitti, paragraf teknikleri oturdu",
      
      "createdAt": "2025-11-05T22:00:00Z",
      "updatedAt": "2025-11-05T22:15:00Z"
    }
  },
  
  "summary": {
    "totalStudyHours": 87.5,
    "totalQuestions": 3245,
    "totalCorrect": 2789,
    "totalWrong": 456,
    "totalNet": 2675.75,
    "daysStudied": 38,
    "currentStreak": 5,
    "longestStreak": 12,
    "lastStudyDate": "2025-11-07"
  }
}
```

### 5.4 Exams Model

```json
{
  "userId": "user_001",
  "planId": "kpss-2026",
  
  "exams": [
    {
      "id": "exam_001",
      "date": "2025-11-07",
      "name": "Örnek Yayınları - Deneme 5",
      "publisher": "Örnek Yayınları",     // Opsiyonel
      "examNumber": 5,                    // Opsiyonel
      "duration": 130,                    // Dakika
      "penaltyEnabled": true,
      
      "results": [
        {
          "subject": "turkce",
          "totalQuestions": 30,
          "correct": 25,
          "wrong": 3,
          "blank": 2,
          "net": 24.25,
          "successRate": 80.83          // (correct/total)*100
        },
        {
          "subject": "matematik",
          "totalQuestions": 30,
          "correct": 18,
          "wrong": 7,
          "blank": 5,
          "net": 16.25,
          "successRate": 60.00
        },
        {
          "subject": "tarih",
          "totalQuestions": 27,
          "correct": 20,
          "wrong": 4,
          "blank": 3,
          "net": 19.00,
          "successRate": 74.07
        },
        {
          "subject": "cografya",
          "totalQuestions": 18,
          "correct": 15,
          "wrong": 2,
          "blank": 1,
          "net": 14.50,
          "successRate": 83.33
        },
        {
          "subject": "vatandaslik",
          "totalQuestions": 9,
          "correct": 7,
          "wrong": 1,
          "blank": 1,
          "net": 6.75,
          "successRate": 77.78
        },
        {
          "subject": "guncel",
          "totalQuestions": 6,
          "correct": 5,
          "wrong": 0,
          "blank": 1,
          "net": 5.00,
          "successRate": 83.33
        }
      ],
      
      "totalQuestions": 120,
      "totalCorrect": 90,
      "totalWrong": 17,
      "totalBlank": 13,
      "totalNet": 85.75,
      "overallSuccessRate": 75.00,
      
      "weakTopics": [
        {
          "subject": "matematik",
          "topic": "Geometri",
          "wrongCount": 3
        },
        {
          "subject": "tarih",
          "topic": "Osmanlı Dönemi",
          "wrongCount": 2
        }
      ],
      
      "notes": "Matematik zaman yönetimi iyi değildi. Geometride eksiklikler var.",
      
      "createdAt": "2025-11-07T14:30:00Z",
      "updatedAt": "2025-11-07T14:45:00Z"
    }
  ],
  
  "summary": {
    "totalExams": 8,
    "averageNet": 78.4,
    "highestNet": 85.75,
    "lowestNet": 65.25,
    "trend": "increasing",              // increasing | decreasing | stable
    "lastExamDate": "2025-11-07"
  }
}
```

### 5.5 Settings Model

```json
{
  "userId": "user_001",
  
  "general": {
    "language": "tr",
    "theme": "light",
    "startupPage": "dashboard"          // dashboard | study | exams | stats
  },
  
  "study": {
    "penaltyDefault": true,             // Varsayılan "yanlış siler"
    "autoSave": true,
    "saveInterval": 60,                 // Saniye
    "showTargets": true                 // Hedef göstergelerini göster
  },
  
  "notifications": {
    "enabled": false,                   // v2.0 için
    "studyReminder": false,
    "reminderTime": "20:00"
  },
  
  "display": {
    "compactMode": false,
    "showAnimations": true,
    "fontSize": "medium"                // small | medium | large
  },
  
  "export": {
    "defaultFormat": "json",            // json | csv | pdf
    "includeNotes": true
  }
}
```

---

## 6. Fonksiyonlar ve Servisler

### 6.1 Core Services

#### 6.1.1 Storage Service

```javascript
// src/renderer/services/storageService.js

import Store from 'electron-store';

const store = new Store({
  name: 'studyflow-data',
  encryptionKey: 'optional-encryption-key'  // v2.0 için
});

export const storageService = {
  // Generic operations
  get: (key) => store.get(key),
  set: (key, value) => store.set(key, value),
  delete: (key) => store.delete(key),
  has: (key) => store.has(key),
  clear: () => store.clear(),
  
  // User specific
  getUserData: (userId, dataType) => {
    return store.get(`users.${userId}.${dataType}`);
  },
  
  setUserData: (userId, dataType, data) => {
    store.set(`users.${userId}.${dataType}`, data);
  },
  
  // Backup & Restore
  exportAll: () => store.store,
  importAll: (data) => store.store = data
};
```

#### 6.1.2 User Service

```javascript
// src/renderer/services/userService.js

export const userService = {
  // Tüm kullanıcıları getir
  getAll: () => {
    return storageService.get('users') || [];
  },
  
  // Kullanıcı oluştur
  create: (userData) => {
    const users = userService.getAll();
    const newUser = {
      id: uuidv4(),
      name: userData.name,
      avatar: userData.avatar,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      activePlan: null,
      settings: {
        theme: 'light',
        language: 'tr',
        penaltyDefault: true
      }
    };
    
    users.push(newUser);
    storageService.set('users', users);
    
    // Kullanıcı için klasör yapısı oluştur
    storageService.set(`users.${newUser.id}.progress`, {});
    storageService.set(`users.${newUser.id}.exams`, { exams: [] });
    storageService.set(`users.${newUser.id}.settings`, newUser.settings);
    
    return newUser;
  },
  
  // Kullanıcı güncelle
  update: (userId, updates) => {
    const users = userService.getAll();
    const index = users.findIndex(u => u.id === userId);
    
    if (index !== -1) {
      users[index] = { ...users[index], ...updates };
      storageService.set('users', users);
      return users[index];
    }
    
    throw new Error('User not found');
  },
  
  // Kullanıcı sil
  delete: (userId) => {
    const users = userService.getAll();
    const filtered = users.filter(u => u.id !== userId);
    storageService.set('users', filtered);
    
    // Kullanıcı verilerini temizle
    storageService.delete(`users.${userId}`);
  },
  
  // Last active güncelle
  updateLastActive: (userId) => {
    userService.update(userId, {
      lastActive: new Date().toISOString()
    });
  }
};
```

#### 6.1.3 Plan Service

```javascript
// src/renderer/services/planService.js

export const planService = {
  // Tüm planları getir
  getAll: () => {
    return storageService.get('plans') || [];
  },
  
  // Plan detayı getir
  getById: (planId) => {
    const plans = planService.getAll();
    return plans.find(p => p.id === planId);
  },
  
  // JSON'dan plan import et
  import: async (filePath) => {
    try {
      // Electron IPC ile dosya okuma
      const planData = await window.electron.readFile(filePath);
      
      // Validasyon
      if (!planService.validate(planData)) {
        throw new Error('Invalid plan format');
      }
      
      // Mevcut planlara ekle
      const plans = planService.getAll();
      
      // Aynı ID kontrolü
      if (plans.some(p => p.id === planData.id)) {
        throw new Error('Plan already exists');
      }
      
      plans.push(planData);
      storageService.set('plans', plans);
      
      return planData;
    } catch (error) {
      console.error('Plan import error:', error);
      throw error;
    }
  },
  
  // Plan validasyonu
  validate: (planData) => {
    const required = ['id', 'name', 'examDate', 'subjects', 'stages'];
    return required.every(field => planData.hasOwnProperty(field));
  },
  
  // Kullanıcıya plan ata
  assignToUser: (userId, planId) => {
    userService.update(userId, { activePlan: planId });
  },
  
  // Plan sil
  delete: (planId) => {
    const plans = planService.getAll();
    const filtered = plans.filter(p => p.id !== planId);
    storageService.set('plans', filtered);
  },
  
  // Bugünün programını getir
  getTodayProgram: (planId) => {
    const plan = planService.getById(planId);
    if (!plan) return null;
    
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Tüm aşamalardaki günleri tara
    for (const stage of plan.stages) {
      for (const week of stage.weeks) {
        const day = week.days.find(d => d.date === today);
        if (day) return day;
      }
    }
    
    return null;
  },
  
  // Haftalık programı getir
  getWeekProgram: (planId, weekNumber) => {
    const plan = planService.getById(planId);
    if (!plan) return null;
    
    for (const stage of plan.stages) {
      const week = stage.weeks.find(w => w.weekNumber === weekNumber);
      if (week) return week;
    }
    
    return null;
  }
};
```

#### 6.1.4 Progress Service

```javascript
// src/renderer/services/progressService.js

export const progressService = {
  // Kullanıcının tüm ilerlemesini getir
  getAll: (userId) => {
    return storageService.getUserData(userId, 'progress') || { dailyLogs: {}, summary: {} };
  },
  
  // Belirli bir günün kaydını getir
  getByDate: (userId, date) => {
    const progress = progressService.getAll(userId);
    return progress.dailyLogs[date] || null;
  },
  
  // Çalışma kaydı kaydet
  saveStudyLog: (userId, logData) => {
    const progress = progressService.getAll(userId);
    const date = logData.date;
    
    // Yeni log oluştur
    const log = {
      id: uuidv4(),
      ...logData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Daily logs'a ekle
    progress.dailyLogs[date] = log;
    
    // Özeti güncelle
    progress.summary = progressService.calculateSummary(progress.dailyLogs);
    
    // Kaydet
    storageService.setUserData(userId, 'progress', progress);
    
    return log;
  },
  
  // Özet hesapla
  calculateSummary: (dailyLogs) => {
    const logs = Object.values(dailyLogs);
    
    let totalHours = 0;
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalNet = 0;
    
    logs.forEach(log => {
      totalHours += log.duration || 0;
      totalQuestions += log.totalQuestions || 0;
      totalCorrect += log.totalCorrect || 0;
      totalWrong += log.totalWrong || 0;
      totalNet += log.totalNet || 0;
    });
    
    const daysStudied = logs.filter(l => l.completed).length;
    const streak = progressService.calculateStreak(logs);
    
    return {
      totalStudyHours: parseFloat(totalHours.toFixed(2)),
      totalQuestions,
      totalCorrect,
      totalWrong,
      totalNet: parseFloat(totalNet.toFixed(2)),
      daysStudied,
      currentStreak: streak.current,
      longestStreak: streak.longest,
      lastStudyDate: logs.length > 0 ? logs[logs.length - 1].date : null
    };
  },
  
  // Streak hesapla
  calculateStreak: (logs) => {
    // Tarihlere göre sırala
    const sortedLogs = logs
      .filter(l => l.completed)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    for (let i = 0; i < sortedLogs.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(sortedLogs[i - 1].date);
        const currDate = new Date(sortedLogs[i].date);
        const diffDays = differenceInDays(currDate, prevDate);
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }
      
      longestStreak = Math.max(longestStreak, tempStreak);
      
      // Son gün bugünse veya dünse current streak
      const today = new Date();
      const logDate = new Date(sortedLogs[i].date);
      const daysDiff = differenceInDays(today, logDate);
      
      if (daysDiff <= 1) {
        currentStreak = tempStreak;
      }
    }
    
    return { current: currentStreak, longest: longestStreak };
  },
  
  // Ders bazlı istatistik
  getSubjectStats: (userId, subject) => {
    const progress = progressService.getAll(userId);
    const logs = Object.values(progress.dailyLogs)
      .filter(log => log.subject === subject);
    
    let totalQuestions = 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalHours = 0;
    
    logs.forEach(log => {
      totalQuestions += log.totalQuestions || 0;
      totalCorrect += log.totalCorrect || 0;
      totalWrong += log.totalWrong || 0;
      totalHours += log.duration || 0;
    });
    
    const successRate = totalQuestions > 0 
      ? ((totalCorrect / totalQuestions) * 100).toFixed(2)
      : 0;
    
    return {
      subject,
      totalQuestions,
      totalCorrect,
      totalWrong,
      totalNet: totalCorrect - (totalWrong / 4),
      totalHours,
      averageNet: logs.length > 0 ? (totalCorrect - totalWrong / 4) / logs.length : 0,
      successRate: parseFloat(successRate),
      sessionsCount: logs.length
    };
  }
};
```

#### 6.1.5 Exam Service

```javascript
// src/renderer/services/examService.js

export const examService = {
  // Tüm denemeleri getir
  getAll: (userId) => {
    const data = storageService.getUserData(userId, 'exams') || { exams: [], summary: {} };
    return data;
  },
  
  // Deneme kaydet
  save: (userId, examData) => {
    const data = examService.getAll(userId);
    
    const exam = {
      id: uuidv4(),
      ...examData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    data.exams.push(exam);
    
    // Özeti güncelle
    data.summary = examService.calculateSummary(data.exams);
    
    storageService.setUserData(userId, 'exams', data);
    
    return exam;
  },
  
  // Deneme güncelle
  update: (userId, examId, updates) => {
    const data = examService.getAll(userId);
    const index = data.exams.findIndex(e => e.id === examId);
    
    if (index !== -1) {
      data.exams[index] = {
        ...data.exams[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      data.summary = examService.calculateSummary(data.exams);
      storageService.setUserData(userId, 'exams', data);
      
      return data.exams[index];
    }
    
    throw new Error('Exam not found');
  },
  
  // Deneme sil
  delete: (userId, examId) => {
    const data = examService.getAll(userId);
    data.exams = data.exams.filter(e => e.id !== examId);
    
    data.summary = examService.calculateSummary(data.exams);
    storageService.setUserData(userId, 'exams', data);
  },
  
  // Özet hesapla
  calculateSummary: (exams) => {
    if (exams.length === 0) {
      return {
        totalExams: 0,
        averageNet: 0,
        highestNet: 0,
        lowestNet: 0,
        trend: 'stable',
        lastExamDate: null
      };
    }
    
    const sorted = [...exams].sort((a, b) => 
      new Date(a.date) - new Date(b.date)
    );
    
    const totalNet = exams.reduce((sum, e) => sum + e.totalNet, 0);
    const averageNet = totalNet / exams.length;
    const highestNet = Math.max(...exams.map(e => e.totalNet));
    const lowestNet = Math.min(...exams.map(e => e.totalNet));
    
    // Trend hesapla (son 4 deneme)
    let trend = 'stable';
    if (exams.length >= 4) {
      const recent = sorted.slice(-4);
      const firstTwo = (recent[0].totalNet + recent[1].totalNet) / 2;
      const lastTwo = (recent[2].totalNet + recent[3].totalNet) / 2;
      const diff = lastTwo - firstTwo;
      
      if (diff > 5) trend = 'increasing';
      else if (diff < -5) trend = 'decreasing';
    }
    
    return {
      totalExams: exams.length,
      averageNet: parseFloat(averageNet.toFixed(2)),
      highestNet: parseFloat(highestNet.toFixed(2)),
      lowestNet: parseFloat(lowestNet.toFixed(2)),
      trend,
      lastExamDate: sorted[sorted.length - 1].date
    };
  },
  
  // Ders bazlı deneme analizi
  getSubjectAnalysis: (userId, subject) => {
    const data = examService.getAll(userId);
    const subjectResults = data.exams.flatMap(exam =>
      exam.results.filter(r => r.subject === subject)
    );
    
    if (subjectResults.length === 0) return null;
    
    const totalNet = subjectResults.reduce((sum, r) => sum + r.net, 0);
    const averageNet = totalNet / subjectResults.length;
    const averageSuccess = subjectResults.reduce((sum, r) => sum + r.successRate, 0) / subjectResults.length;
    
    return {
      subject,
      examsCount: subjectResults.length,
      averageNet: parseFloat(averageNet.toFixed(2)),
      averageSuccessRate: parseFloat(averageSuccess.toFixed(2)),
      highest: Math.max(...subjectResults.map(r => r.net)),
      lowest: Math.min(...subjectResults.map(r => r.net))
    };
  }
};
```

### 6.2 Utility Functions

#### 6.2.1 Calculations

```javascript
// src/renderer/utils/calculations.js

export const calculations = {
  // Net hesaplama
  calculateNet: (correct, wrong, penaltyEnabled) => {
    if (penaltyEnabled) {
      return correct - (wrong / 4);
    }
    return correct;
  },
  
  // Başarı oranı hesaplama
  calculateSuccessRate: (correct, total) => {
    if (total === 0) return 0;
    return (correct / total) * 100;
  },
  
  // İlerleme yüzdesi hesaplama
  calculateProgressPercentage: (completed, total) => {
    if (total === 0) return 0;
    return (completed / total) * 100;
  },
  
  // Hedef fark hesaplama
  calculateTargetDifference: (current, target) => {
    return target - current;
  },
  
  // Ortalama hesaplama
  calculateAverage: (values) => {
    if (values.length === 0) return 0;
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  },
  
  // Trend hesaplama (basit linear regression)
  calculateTrend: (dataPoints) => {
    if (dataPoints.length < 2) return 0;
    
    const n = dataPoints.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    dataPoints.forEach((point, index) => {
      sumX += index;
      sumY += point;
      sumXY += index * point;
      sumXX += index * index;
    });
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    return slope;
  }
};
```

#### 6.2.2 Date Helpers

```javascript
// src/renderer/utils/dateHelpers.js

import { format, formatDistance, differenceInDays, isToday, isYesterday } from 'date-fns';
import { tr } from 'date-fns/locale';

export const dateHelpers = {
  // Tarih formatlama
  formatDate: (date, formatStr = 'dd.MM.yyyy') => {
    return format(new Date(date), formatStr, { locale: tr });
  },
  
  // Göreceli tarih (2 gün önce, dün, bugün)
  formatRelative: (date) => {
    const d = new Date(date);
    
    if (isToday(d)) return 'Bugün';
    if (isYesterday(d)) return 'Dün';
    
    return formatDistance(d, new Date(), { 
      addSuffix: true, 
      locale: tr 
    });
  },
  
  // Gün sayısı farkı
  daysDifference: (date1, date2) => {
    return differenceInDays(new Date(date1), new Date(date2));
  },
  
  // Haftanın günü
  getDayName: (date) => {
    return format(new Date(date), 'EEEE', { locale: tr });
  },
  
  // Ay adı
  getMonthName: (date) => {
    return format(new Date(date), 'MMMM', { locale: tr });
  },
  
  // Haftanın başlangıç ve bitiş tarihleri
  getWeekBounds: (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Pazartesi başlangıç
    
    const monday = new Date(d.setDate(diff));
    const sunday = new Date(d.setDate(diff + 6));
    
    return { start: monday, end: sunday };
  },
  
  // Bugüne kalan gün sayısı
  daysUntil: (targetDate) => {
    return differenceInDays(new Date(targetDate), new Date());
  }
};
```

#### 6.2.3 Validators

```javascript
// src/renderer/utils/validators.js

export const validators = {
  // İsim validasyonu
  validateName: (name) => {
    if (!name || name.trim().length < 2) {
      return 'İsim en az 2 karakter olmalıdır';
    }
    if (name.length > 50) {
      return 'İsim en fazla 50 karakter olabilir';
    }
    return null;
  },
  
  // Soru sayısı validasyonu
  validateQuestionCount: (count, min = 0, max = 1000) => {
    if (count === '' || count === null || count === undefined) {
      return 'Soru sayısı boş bırakılamaz';
    }
    
    const num = Number(count);
    
    if (isNaN(num)) {
      return 'Geçerli bir sayı giriniz';
    }
    if (num < min) {
      return `En az ${min} soru girmelisiniz`;
    }
    if (num > max) {
      return `En fazla ${max} soru girebilirsiniz`;
    }
    return null;
  },
  
  // Süre validasyonu
  validateDuration: (duration, min = 0, max = 24) => {
    if (duration === '' || duration === null || duration === undefined) {
      return 'Süre boş bırakılamaz';
    }
    
    const num = Number(duration);
    
    if (isNaN(num)) {
      return 'Geçerli bir sayı giriniz';
    }
    if (num < min) {
      return `En az ${min} saat girmelisiniz`;
    }
    if (num > max) {
      return `En fazla ${max} saat girebilirsiniz`;
    }
    return null;
  },
  
  // Tarih validasyonu
  validateDate: (date) => {
    if (!date) {
      return 'Tarih boş bırakılamaz';
    }
    
    const d = new Date(date);
    
    if (isNaN(d.getTime())) {
      return 'Geçerli bir tarih giriniz';
    }
    
    return null;
  },
  
  // Doğru/yanlış kontrolü
  validateAnswers: (correct, wrong, total) => {
    const c = Number(correct);
    const w = Number(wrong);
    const t = Number(total);
    
    if (isNaN(c) || isNaN(w)) {
      return 'Geçerli sayılar giriniz';
    }
    
    if (c < 0 || w < 0) {
      return 'Negatif sayı girilemez';
    }
    
    if (c + w > t) {
      return 'Doğru + yanlış toplam soru sayısından fazla olamaz';
    }
    
    return null;
  }
};
```

### 6.3 Custom Hooks

#### 6.3.1 useUser Hook

```javascript
// src/renderer/hooks/useUser.js

import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export const useUser = () => {
  const context = useContext(UserContext);
  
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  
  const {
    currentUser,
    setCurrentUser,
    users,
    createUser,
    updateUser,
    deleteUser,
    switchUser
  } = context;
  
  return {
    currentUser,
    users,
    isLoggedIn: !!currentUser,
    createUser,
    updateUser,
    deleteUser,
    switchUser,
    logout: () => setCurrentUser(null)
  };
};
```

#### 6.3.2 usePlan Hook

```javascript
// src/renderer/hooks/usePlan.js

import { useContext, useMemo } from 'react';
import { PlanContext } from '../contexts/PlanContext';
import { dateHelpers } from '../utils/dateHelpers';

export const usePlan = () => {
  const context = useContext(PlanContext);
  
  if (!context) {
    throw new Error('usePlan must be used within PlanProvider');
  }
  
  const { currentPlan, plans, importPlan, switchPlan, deletePlan } = context;
  
  // Bugünün programı
  const todayProgram = useMemo(() => {
    if (!currentPlan) return null;
    return planService.getTodayProgram(currentPlan.id);
  }, [currentPlan]);
  
  // Sınava kalan gün
  const daysUntilExam = useMemo(() => {
    if (!currentPlan) return null;
    return dateHelpers.daysUntil(currentPlan.examDate);
  }, [currentPlan]);
  
  return {
    currentPlan,
    plans,
    todayProgram,
    daysUntilExam,
    hasPlan: !!currentPlan,
    importPlan,
    switchPlan,
    deletePlan
  };
};
```

---

## 7. Geliştirme Aşamaları

### 7.1 Sprint Planlaması

#### Sprint 1: Altyapı ve Temel Yapı (8 saat)
**Hedef:** Proje iskeletinin oluşturulması ve temel routing

**Görevler:**
1. ✅ Proje kurulumu
   - Electron + React + Vite setup
   - Tailwind CSS kurulumu
   - Folder structure oluşturma
   - Git repository init
   
2. ✅ Temel bileşenler
   - Layout component
   - Navbar component
   - Sidebar component
   - Button, Input, Modal gibi common components
   
3. ✅ Routing sistemi
   - React Router kurulumu
   - Route tanımlamaları
   - Protected routes
   
4. ✅ Storage sistemi
   - Electron Store entegrasyonu
   - Base storage service
   - IPC bridge

**Tamamlanma Kriteri:**
- Uygulama açılıyor
- Sayfalar arası geçiş çalışıyor
- Veri storage işliyor

---

#### Sprint 2: Kullanıcı Yönetimi (6 saat)
**Hedef:** Multi-user sistem

**Görevler:**
1. ✅ User service implementation
   - CRUD operasyonları
   - Storage entegrasyonu
   
2. ✅ User Select sayfası
   - Kullanıcı kartları
   - Yeni kullanıcı ekleme modal
   - Avatar seçimi
   
3. ✅ User Context
   - Global state management
   - Current user tracking
   
4. ✅ User settings
   - Profil düzenleme
   - Ayarlar sayfası

**Tamamlanma Kriteri:**
- Kullanıcı oluşturulabiliyor
- Kullanıcılar arası geçiş yapılabiliyor
- Kullanıcı verileri persist ediliyor

---

#### Sprint 3: Plan Yönetimi (6 saat)
**Hedef:** Plan import ve yönetim sistemi

**Görevler:**
1. ✅ Plan service implementation
   - Plan CRUD operasyonları
   - JSON validation
   
2. ✅ Plan import UI
   - Dosya seçici
   - Import modal
   - Plan listesi
   
3. ✅ Plan Context
   - Active plan management
   - Plan switching
   
4. ✅ Örnek planlar
   - KPSS 2026 plan JSON
   - YKS plan JSON
   - LGS plan JSON

**Tamamlanma Kriteri:**
- JSON plan import edilebiliyor
- Plan validasyonu çalışıyor
- Aktif plan değiştirilebiliyor

---

#### Sprint 4: Dashboard (8 saat)
**Hedef:** Ana ekran ve bugünün programı

**Görevler:**
1. ✅ Dashboard layout
   - Grid yapısı
   - Responsive design
   
2. ✅ Today Program component
   - Bugünün dersi gösterimi
   - Başla/Atla butonları
   
3. ✅ Weekly Summary component
   - Haftalık ilerleme
   - Progress bars
   
4. ✅ Quick Actions component
   - Hızlı erişim butonları
   - Navigation shortcuts
   
5. ✅ Countdown widget
   - Sınava kalan gün
   - Motivasyon mesajı

**Tamamlanma Kriteri:**
- Dashboard görselleri tamamlanmış
- Bugünün programı doğru gösteriliyor
- Haftalık özet hesaplanıyor

---

#### Sprint 5: Çalışma Takibi (10 saat)
**Hedef:** Günlük çalışma kayıt sistemi

**Görevler:**
1. ✅ Progress service implementation
   - Save/update/delete operasyonları
   - Summary calculations
   
2. ✅ Study Log form
   - Konu seçimi
   - Süre girişi
   - Soru seti ekle/çıkar
   
3. ✅ Question Set Input component
   - D/Y input fields
   - "Yanlış siler" checkbox
   - Net otomatik hesaplama
   - Birden fazla set desteği
   
4. ✅ Calendar view
   - Aylık takvim
   - Tamamlanan günler işaretli
   - Günlük detay gösterimi
   
5. ✅ Study history
   - Geçmiş çalışmalar listesi
   - Düzenleme/silme

**Tamamlanma Kriteri:**
- Çalışma kaydedilebiliyor
- Soru setleri eklenip çıkarılabiliyor
- Net hesaplamaları doğru
- Veriler kaydediliyor

---

#### Sprint 6: Deneme Sınavları (10 saat)
**Hedef:** Deneme ekle/görüntüle/analiz et

**Görevler:**
1. ✅ Exam service implementation
   - CRUD operasyonları
   - Analysis calculations
   
2. ✅ Exam form
   - Tüm dersler için D/Y girişi
   - Otomatik boş hesaplama
   - Yanlış siler checkbox
   - Net hesaplama
   
3. ✅ Exam list
   - Tablo görünümü
   - Filtreleme/sıralama
   - Detay/düzenle/sil butonları
   
4. ✅ Exam detail
   - Ders bazlı sonuçlar
   - Zayıf konular
   - Notlar
   
5. ✅ Exam charts
   - Net gelişim grafiği (Recharts)
   - Ders bazlı karşılaştırma

**Tamamlanma Kriteri:**
- Deneme eklenebiliyor
- Deneme listesi görüntülenebiliyor
- Grafikler çalışıyor
- Net hesaplamaları doğru

---

#### Sprint 7: İstatistikler ve Raporlama (10 saat)
**Hedef:** Detaylı analiz ve görselleştirme

**Görevler:**
1. ✅ Stats service
   - Genel istatistik hesaplamaları
   - Ders bazlı analiz
   - Trend hesaplamaları
   
2. ✅ Overview stats component
   - Toplam çalışma saati
   - Toplam soru/net
   - Streak gösterimi
   
3. ✅ Subject stats component
   - Her ders için detaylı analiz
   - Progress bars
   - Güçlü/zayıf konular
   
4. ✅ Trend charts
   - Haftalık/aylık grafikler
   - Multiple data series
   
5. ✅ Export functionality
   - JSON export
   - Download trigger

**Tamamlanma Kriteri:**
- Tüm istatistikler doğru hesaplanıyor
- Grafikler görselleşiyor
- Export çalışıyor

---

#### Sprint 8: UI Polish ve UX İyileştirmeleri (8 saat)
**Hedef:** Görsel iyileştirmeler ve kullanıcı deneyimi

**Görevler:**
1. ✅ Animasyonlar
   - Page transitions
   - Hover effects
   - Loading states
   
2. ✅ Toast notifications
   - Success/error messages
   - Auto-dismiss
   
3. ✅ Loading states
   - Skeleton screens
   - Spinners
   
4. ✅ Error handling
   - Error boundaries
   - User-friendly error messages
   
5. ✅ Accessibility
   - Keyboard navigation
   - Focus management
   - ARIA labels
   
6. ✅ Responsive polish
   - Fine-tuning layouts
   - Mobile considerations (v2.0 için hazırlık)

**Tamamlanma Kriteri:**
- Animasyonlar smooth
- Error handling tutarlı
- Accessibility standartlarına uygun
- UI tutarlı ve professional

---

#### Sprint 9: Test ve Bug Fixing (6 saat)
**Hedef:** Tüm özelliklerin test edilmesi

**Görevler:**
1. ✅ Manuel test scenarios
   - User flow testing
   - Edge case testing
   
2. ✅ Bug fixing
   - Tespit edilen hataların düzeltilmesi
   
3. ✅ Performance optimization
   - Bundle size optimization
   - Render optimization
   
4. ✅ Data integrity testing
   - Storage tests
   - Backup/restore tests

**Tamamlanma Kriteri:**
- Kritik bug yok
- User flows akıcı çalışıyor
- Performance kabul edilebilir seviyede

---

#### Sprint 10: Build ve Distribution (4 saat)
**Hedef:** Windows executable oluşturma

**Görevler:**
1. ✅ Electron builder configuration
   - Build settings
   - Icon setup
   
2. ✅ Windows build
   - .exe oluşturma
   - Installer setup
   
3. ✅ Documentation
   - README güncelleme
   - User guide (opsiyonel)
   
4. ✅ Release preparation
   - Versioning
   - Changelog

**Tamamlanma Kriteri:**
- Windows .exe çalışıyor
- Installer sorunsuz kurulum yapıyor
- Documentation güncel

---

### 7.2 Toplam Süre Tahmini
**Toplam: ~76 saat**

**Haftalık çalışma (günde 4 saat):**
- Sprint 1-2: Hafta 1 (14 saat)
- Sprint 3-4: Hafta 2 (14 saat)
- Sprint 5: Hafta 3 (10 saat)
- Sprint 6: Hafta 4 (10 saat)
- Sprint 7: Hafta 5 (10 saat)
- Sprint 8-10: Hafta 6 (18 saat)

**Tahmini Tamamlanma:** 6 hafta

---

## 8. Test Planı

### 8.1 Test Stratejisi

#### 8.1.1 Test Türleri
1. **Manuel Fonksiyonel Test:** Tüm özellikler manuel test edilecek
2. **UI/UX Test:** Görsel tutarlılık ve kullanıcı deneyimi
3. **Performance Test:** Yükleme süreleri ve rendering
4. **Data Integrity Test:** Veri kaybı ve bozulma kontrolleri
5. **Cross-Windows Test:** Farklı Windows versiyonlarında test

#### 8.1.2 Test Ortamı
- Windows 10 (64-bit)
- Windows 11 (64-bit)
- RAM: 4GB ve 8GB cihazlarda
- Farklı ekran çözünürlükleri

### 8.2 Test Senaryoları

#### 8.2.1 Kullanıcı Yönetimi Test Senaryoları

| ID | Senaryo | Beklenen Sonuç | Öncelik |
|----|---------|----------------|---------|
| UT-01 | Yeni kullanıcı oluşturma | Kullanıcı başarıyla oluşturulur ve listeye eklenir | Yüksek |
| UT-02 | Aynı isimde kullanıcı oluşturma | İzin verilir (farklı ID'ler) | Orta |
| UT-03 | Boş isimle kullanıcı oluşturma | Hata mesajı gösterilir | Yüksek |
| UT-04 | Kullanıcılar arası geçiş | Veri karışmadan doğru kullanıcıya geçilir | Yüksek |
| UT-05 | Kullanıcı silme | Kullanıcı ve tüm verileri silinir | Orta |
| UT-06 | Avatar değiştirme | Avatar başarıyla güncellenir | Düşük |

#### 8.2.2 Plan Yönetimi Test Senaryoları

| ID | Senaryo | Beklenen Sonuç | Öncelik |
|----|---------|----------------|---------|
| PT-01 | Geçerli JSON plan import | Plan başarıyla yüklenir | Yüksek |
| PT-02 | Geçersiz JSON import | Hata mesajı gösterilir | Yüksek |
| PT-03 | Aynı plan tekrar import | Hata mesajı: "Plan zaten mevcut" | Orta |
| PT-04 | Plan değiştirme | Aktif plan güncellenir, dashboard yenilenir | Yüksek |
| PT-05 | Plan silme | Plan silinir, kullanıcıdan kaldırılır | Orta |
| PT-06 | Plansız kullanıcı | Boş state görünür, plan import önerilir | Orta |

#### 8.2.3 Çalışma Takibi Test Senaryoları

| ID | Senaryo | Beklenen Sonuç | Öncelik |
|----|---------|----------------|---------|
| ST-01 | Temel çalışma kaydı | Form başarıyla kaydedilir | Yüksek |
| ST-02 | Birden fazla soru seti ekleme | Tüm setler kaydedilir | Yüksek |
| ST-03 | Net hesaplama (yanlış siler açık) | Net = D - Y/4 | Yüksek |
| ST-04 | Net hesaplama (yanlış siler kapalı) | Net = D | Yüksek |
| ST-05 | Boş form submit | Validasyon hataları gösterilir | Yüksek |
| ST-06 | Negatif sayı girişi | Hata mesajı gösterilir | Orta |
| ST-07 | Aynı güne birden fazla kayıt | Son kayıt üzerine yazar | Orta |
| ST-08 | Geçmiş çalışma düzenleme | Değişiklikler kaydedilir, özet güncellenir | Orta |
| ST-09 | Çalışma silme | Kayıt silinir, özet güncellenir | Orta |

#### 8.2.4 Deneme Sınavları Test Senaryoları

| ID | Senaryo | Beklenen Sonuç | Öncelik |
|----|---------|----------------|---------|
| EX-01 | Deneme ekleme | Tüm dersler için net hesaplanır ve kaydedilir | Yüksek |
| EX-02 | Boş soru otomatik hesaplama | Boş = Toplam - D - Y | Yüksek |
| EX-03 | D + Y > Toplam durumu | Validasyon hatası gösterilir | Yüksek |
| EX-04 | Deneme düzenleme | Değişiklikler kaydedilir | Orta |
| EX-05 | Deneme silme | Deneme silinir, grafikler güncellenir | Orta |
| EX-06 | Net gelişim grafiği | Doğru verilerle grafik çizilir | Yüksek |
| EX-07 | Tek deneme ile grafik | Grafik gösterilir (tek nokta) | Düşük |

#### 8.2.5 İstatistikler Test Senaryoları

| ID | Senaryo | Beklenen Sonuç | Öncelik |
|----|---------|----------------|---------|
| SR-01 | Genel istatistik hesaplama | Tüm veriler doğru toplanır | Yüksek |
| SR-02 | Ders bazlı analiz | Her ders için doğru istatistikler | Yüksek |
| SR-03 | Streak hesaplama | Ardışık günler doğru hesaplanır | Orta |
| SR-04 | Boş veri durumu | "Henüz veri yok" mesajı gösterilir | Orta |
| SR-05 | Trend grafiği | Doğru yönde trend çizilir | Orta |
| SR-06 | JSON export | Tüm veriler eksiksiz export edilir | Yüksek |

#### 8.2.6 Performance Test Senaryoları

| ID | Senaryo | Beklenen Sonuç | Öncelik |
|----|---------|----------------|---------|
| PF-01 | Uygulama açılış süresi | < 3 saniye | Yüksek |
| PF-02 | Sayfa geçiş süresi | < 500ms | Orta |
| PF-03 | Form submit | < 200ms | Orta |
| PF-04 | Grafik render | < 1 saniye | Orta |
| PF-05 | 100+ çalışma kaydı ile performans | Yavaşlama olmaz | Düşük |
| PF-06 | 50+ deneme ile performans | Grafikler hızlı çizilir | Düşük |

### 8.3 Test Checklist

#### 8.3.1 Pre-Release Checklist

- [ ] Tüm kritik test senaryoları başarılı
- [ ] Bilinen kritik bug yok
- [ ] UI tutarlı ve profesyonel
- [ ] Tüm validasyonlar çalışıyor
- [ ] Error handling düzgün
- [ ] Data persistence çalışıyor
- [ ] Export/import fonksiyonları çalışıyor
- [ ] Windows 10 ve 11'de test edildi
- [ ] Installer sorunsuz çalışıyor
- [ ] Documentation güncel

---

## 9. Deployment ve Distribution

### 9.1 Build Configuration

#### 9.1.1 electron-builder.json

```json
{
  "appId": "com.studyflow.app",
  "productName": "StudyFlow",
  "directories": {
    "output": "release"
  },
  "files": [
    "dist/**/*",
    "node_modules/**/*",
    "package.json"
  ],
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": ["x64"]
      }
    ],
    "icon": "public/icon.ico",
    "artifactName": "${productName}-${version}-Setup.${ext}"
  },
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "StudyFlow"
  },
  "publish": null
}
```

### 9.2 Build Process

#### 9.2.1 Development Build
```bash
npm run dev          # Development mode
```

#### 9.2.2 Production Build
```bash
npm run build        # Build renderer
npm run build:electron  # Build electron + package
```

### 9.3 Distribution Strategy

#### 9.3.1 v1.0 (MVP)
- **Kanal:** Direct download
- **Format:** .exe installer (NSIS)
- **Boyut:** ~150-200MB
- **Platform:** Windows 10/11 (64-bit)

#### 9.3.2 Kurulum Adımları (Son Kullanıcı)
1. StudyFlow-1.0.0-Setup.exe indir
2. Kurulumu çalıştır
3. Kurulum dizini seç (varsayılan: C:\Program Files\StudyFlow)
4. Desktop kısayolu oluştur (opsiyonel)
5. Uygulamayı başlat

### 9.4 Auto-Update (v2.0)

```javascript
// Future feature
import { autoUpdater } from 'electron-updater';

autoUpdater.checkForUpdatesAndNotify();
```

---

## 10. Gelecek Versiyonlar

### 10.1 v1.5 (Küçük İyileştirmeler)

**Hedef Tarih:** MVP'den 2-3 ay sonra

#### Özellikler:
- [ ] Dark mode desteği
- [ ] Klavye kısayolları
- [ ] Toplu veri düzenleme
- [ ] Gelişmiş filtreleme ve arama
- [ ] CSV export
- [ ] Özelleştirilebilir tema renkleri
- [ ] Hatırlatıcı (notification) sistemi

---

### 10.2 v2.0 (Büyük Güncelleme)

**Hedef Tarih:** MVP'den 6 ay sonra

#### Özellikler:
- [ ] Pomodoro timer entegrasyonu
- [ ] Başarı sistemi (achievements, badges)
- [ ] Motivasyon sistemi
  - Günlük motivasyon mesajları
  - Streak ödülleri
  - Level sistemi
- [ ] PDF rapor export
- [ ] Excel export
- [ ] Otomatik backup sistemi
- [ ] PDF'den plan import (OCR)
- [ ] Manuel plan oluşturucu
- [ ] Grafik özelleştirmeleri
- [ ] Hedef belirleme sistemi
- [ ] Comparison mode (arkadaşlarla karşılaştırma - anonim)

---

### 10.3 v3.0 (Platform Expansion)

**Hedef Tarih:** MVP'den 1 yıl sonra

#### Özellikler:
- [ ] macOS desteği
- [ ] Linux desteği
- [ ] Cloud sync (opsiyonel)
- [ ] Mobil uygulama (iOS, Android)
  - Mobile responsive web app
  - Native mobile app
- [ ] Multi-device sync
- [ ] Collaborative features
  - Study groups
  - Shared progress
- [ ] AI-powered recommendations
  - Zayıf konu önerileri
  - Optimal çalışma planı
- [ ] Gamification
  - Leaderboards
  - Challenges
  - Social features

---

### 10.4 v4.0 (Enterprise/Educator Edition)

**Hedef Tarih:** MVP'den 1.5-2 yıl sonra

#### Özellikler:
- [ ] Öğretmen/öğrenci paneli
- [ ] Sınıf yönetimi
- [ ] Toplu rapor oluşturma
- [ ] İlerleme takibi (öğretmen tarafı)
- [ ] Ödev/görev atama
- [ ] Video dersler entegrasyonu
- [ ] Live study sessions
- [ ] Whiteboard özelliği
- [ ] Offline/online senkronizasyon

---

## 11. Ekler

### 11.1 Glossary (Terimler Sözlüğü)

| Terim | Açıklama |
|-------|----------|
| Net | Doğru - (Yanlış / 4) formülü ile hesaplanan başarı skoru |
| Plan | Sınav hazırlık programı (aşamalar, haftalar, konular) |
| Stage (Aşama) | Planın ana bölümü (ör: Temel Atma, Konu Tamamlama) |
| Study Log | Günlük çalışma kaydı |
| Question Set | Bir oturumda çözülen soru grubu |
| Streak | Ardışık gün çalışma serisi |
| Exam | Deneme sınavı |
| Success Rate | Başarı oranı (Doğru / Toplam * 100) |

### 11.2 Örnek Plan JSON Şeması

Detaylı plan JSON şeması için `assets/plans/` klasöründeki örnek dosyalara bakınız.

### 11.3 Renk Referansları

Tüm renk kodları için Bölüm 4.1.2'ye bakınız.

### 11.4 Component Hierarchy

```
App
├── UserProvider
│   ├── PlanProvider
│   │   ├── Router
│   │   │   ├── UserSelectPage
│   │   │   ├── Layout
│   │   │   │   ├── Navbar
│   │   │   │   ├── Sidebar
│   │   │   │   └── Outlet
│   │   │   │       ├── DashboardPage
│   │   │   │       ├── StudyLogPage
│   │   │   │       ├── ExamsPage
│   │   │   │       ├── StatsPage
│   │   │   │       └── SettingsPage
└── ToastProvider
```

### 11.5 File Size Estimates

| Kategori | Boyut |
|----------|-------|
| Base Electron | ~120MB |
| React + Dependencies | ~30MB |
| App Code | ~5MB |
| Assets (icons, images) | ~2MB |
| **Total Installed Size** | **~160MB** |

### 11.6 System Requirements

**Minimum:**
- OS: Windows 10 (64-bit)
- RAM: 4GB
- Disk: 500MB boş alan
- CPU: Intel Core i3 veya eşdeğeri
- Display: 1280x720

**Önerilen:**
- OS: Windows 11 (64-bit)
- RAM: 8GB+
- Disk: 1GB boş alan
- CPU: Intel Core i5 veya eşdeğeri
- Display: 1920x1080

---

## 📝 Notlar

### Geliştirme Prensipleri
1. **User First:** Her özellik kullanıcı ihtiyacından doğmalı
2. **Simplicity:** Basitliği tercih et, karmaşıklıktan kaçın
3. **Performance:** Hız ve akıcılık öncelikli
4. **Reliability:** Veri kaybı asla kabul edilemez
5. **Accessibility:** Herkes için erişilebilir olmalı

### Coding Standards
- **Naming:** camelCase for variables/functions, PascalCase for components
- **File organization:** Feature-based folder structure
- **Comments:** Karmaşık logic'lerde yorum ekle
- **ESLint:** Kod kalitesi için linting kullan
- **Git commits:** Anlamlı commit mesajları

---

**Doküman Versiyonu:** 1.0  
**Son Güncelleme:** 7 Kasım 2025  
**Yazar:** Claude (Anthropic)  
**Proje Sahibi:** [Kullanıcı Adı]

---

## 🎉 SON

Bu doküman StudyFlow uygulamasının kapsamlı planlama belgesidir. Geliştirme sürecinde referans olarak kullanılmalı ve düzenli olarak güncellenmelidir.

Sorular veya değişiklikler için: [İletişim Bilgisi]
