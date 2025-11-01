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

## 📦 Build

```bash
# Production build
npm run build

# Electron uygulamasını paketleyin
npm run build:electron

# Tam build ve paketleme
npm run package
```

## 🎯 Kullanım

1. Uygulamayı başlatın
2. Yeni bir kullanıcı profili oluşturun
3. Çalışma planınızı JSON formatında import edin
4. Günlük çalışmalarınızı kaydetmeye başlayın
5. Deneme sınavlarınızı ekleyin ve performansınızı analiz edin

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
