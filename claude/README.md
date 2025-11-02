# 📚 StudyFlow

Universal Study Planning & Tracking Application

## 📖 Proje Hakkında

StudyFlow, öğrencilerin sınav hazırlık süreçlerini planlayabilecekleri, günlük çalışmalarını takip edebilecekleri ve deneme sınavı performanslarını analiz edebilecekleri masaüstü bir uygulamadır.

### Hedef Kitle
- LGS hazırlığı yapan öğrenciler
- YKS hazırlığı yapan öğrenciler
- KPSS adayları
- Diğer sınav hazırlıkları (DGS, ALES, YDS, vb.)

### Temel Özellikler
- ✅ Multi-user support (birden fazla kullanıcı profili)
- ✅ JSON tabanlı çalışma planı import sistemi
- ✅ Günlük çalışma takibi (konu, süre, soru detayları)
- ✅ Esnek net hesaplama (yanlış siler/silmez seçeneği)
- ✅ Deneme sınavı yönetimi ve analizi
- ✅ Detaylı istatistikler ve görselleştirme
- ✅ Offline çalışma (internet bağlantısı gerektirmez)
- ✅ Veri export (JSON formatında)

## 🛠️ Teknoloji Stack

- **Desktop Framework:** Electron 28.x
- **Frontend:** React 18.2
- **Build Tool:** Vite 5.x
- **Styling:** Tailwind CSS 3.x
- **Charts:** Recharts 2.x
- **Icons:** Lucide React

## 🚀 Kurulum

### Gereksinimler
- Node.js 18.x veya üzeri
- npm 9.x veya üzeri

### Adımlar

```bash
# Repository'yi klonlayın
git clone https://github.com/yourusername/studyflow.git

# Proje klasörüne girin
cd studyflow

# Bağımlılıkları yükleyin
npm install

# Geliştirme modunda başlatın
npm run dev
```

## 📦 Build ve Distribution

### Development Build
```bash
# Geliştirme modunda çalıştır (hot reload ile)
npm run dev
```

### Production Build
```bash
# Vite production build (dist/ klasörü oluşturur)
npm run build
```

### Application Packaging

#### Windows (NSIS Installer)
```bash
# Windows için .exe installer oluştur
npm run package:win

# Çıktı: release/StudyFlow-Setup-1.0.0.exe
```

#### macOS (DMG)
```bash
# macOS için .dmg oluştur
npm run package:mac

# Çıktı: release/StudyFlow-1.0.0.dmg
```

#### Linux (AppImage)
```bash
# Linux için AppImage oluştur
npm run package:linux

# Çıktı: release/StudyFlow-1.0.0.AppImage
```

#### Tüm Platformlar
```bash
# Mevcut platforma göre package oluştur
npm run package
```

### Build Gereksinimleri

- **Windows Build:** Windows 10/11 (64-bit)
- **macOS Build:** macOS 10.15+ (Xcode Command Line Tools)
- **Linux Build:** Ubuntu 18.04+ veya eşdeğeri

### İlk Build Öncesi

1. **Icon Dosyalarını Ekleyin:**
   - `public/icon.ico` (Windows - 256x256)
   - `public/icon.icns` (macOS - 512x512)
   - `public/icon.png` (Linux - 512x512)
   - Detaylar için: `public/ICON_INSTRUCTIONS.md`

2. **Version Kontrolü:**
   - `package.json` içinde version numarasını güncelleyin
   - CHANGELOG.md'yi güncelleyin

3. **Build:**
   ```bash
   npm install
   npm run package:win
   ```

### Build Çıktıları

Build tamamlandığında `release/` klasöründe şu dosyaları bulabilirsiniz:

- **Windows:** `StudyFlow-Setup-1.0.0.exe` (NSIS installer)
- **macOS:** `StudyFlow-1.0.0.dmg`
- **Linux:** `StudyFlow-1.0.0.AppImage`

### Installer Özellikleri (Windows)

- ✅ Kullanıcı kurulum klasörü seçebilir
- ✅ Desktop kısayolu oluşturulur
- ✅ Start Menu kısayolu oluşturulur
- ✅ Otomatik uninstaller dahil

## 🎯 Kullanım

### İlk Kurulum
1. Uygulamayı başlatın
2. Yeni bir kullanıcı profili oluşturun
   - İsim girin
   - Avatar seçin
3. Çalışma planınızı import edin

### Hazır Plan Şablonları

Uygulama ile birlikte 3 hazır plan şablonu gelir:

#### 1. KPSS 2026 Detaylı Plan
- **Dosya:** `public/plan-templates/kpss-2026-detayli-plan.json`
- **Sınav Tarihi:** 12 Temmuz 2026
- **Dersler:** Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık, Güncel
- **Aşamalar:**
  - Konu Anlatımı (41 hafta)
  - Soru Çözüm (8 hafta)
  - Deneme ve Tekrar (8 hafta)
- **Toplam:** 57 hafta, detaylı haftalık ve günlük program

#### 2. KPSS 2026 Örnek Plan
- **Dosya:** `public/plan-templates/kpss-2026-ornek-plan.json`
- Basitleştirilmiş versiyon, hızlı test için

#### 3. YKS 2026 Örnek Plan
- **Dosya:** `public/plan-templates/yks-2026-ornek-plan.json`
- YKS hazırlığı için örnek şablon

### Plan Import Etme

1. Ayarlar > Plan Yönetimi
2. "Plan Import Et" butonuna tıklayın
3. Hazır planlardan birini veya kendi JSON dosyanızı seçin
4. Plan otomatik olarak yüklenecek

### Günlük Kullanım
1. Dashboard'dan bugünün çalışma programını görün
2. Çalışma Günlüğü'nden günlük çalışmalarınızı kaydedin
   - Konu/ders seçin
   - Çalışma süresini girin
   - Soru setlerini ekleyin (doğru/yanlış)
   - Net otomatik hesaplanır
3. Deneme Sınavları bölümünden deneme sonuçlarınızı girin
4. İstatistikler sayfasından performansınızı analiz edin
   - Genel özet
   - Ders bazlı analiz
   - Trend grafikleri
   - Zayıf konular

### Veri Yönetimi
- **Export:** İstatistikler sayfasından tüm verilerinizi JSON formatında export edebilirsiniz
- **Backup:** Düzenli olarak verilerinizi export edin
- **Multi-User:** Aynı bilgisayarda birden fazla kullanıcı profili oluşturabilirsiniz

## 📁 Proje Yapısı

```
src/
├── main/           # Electron main process
├── renderer/       # React application
│   ├── components/ # React bileşenleri
│   ├── pages/      # Sayfa bileşenleri
│   ├── contexts/   # React Context providers
│   ├── hooks/      # Custom hooks
│   ├── services/   # Business logic
│   └── utils/      # Yardımcı fonksiyonlar
└── assets/         # Statik dosyalar
```

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Pull request göndermekten çekinmeyin.

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 📞 İletişim

Sorularınız için issue açabilirsiniz.

## 🙏 Teşekkürler

Bu projeyi kullandığınız için teşekkür ederiz!
