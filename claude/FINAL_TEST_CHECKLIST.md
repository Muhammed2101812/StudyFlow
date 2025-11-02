# ✅ StudyFlow v1.0.0 - Final Test Checklist

**Test Tarihi:** 2025-11-02
**Version:** 1.0.0
**Test Ortamı:** Development Mode (npm run dev)

---

## 🎯 Test Kategorileri

### 1. İlk Açılış ve Kullanıcı Yönetimi

#### 1.1 Yeni Kullanıcı Oluşturma
- [ ] Uygulama açıldığında UserSelectPage görünüyor mu?
- [ ] "Yeni Kullanıcı" butonu çalışıyor mu?
- [ ] Kullanıcı adı girebiliyor musunuz?
- [ ] Avatar seçebiliyor musunuz? (18 farklı avatar)
- [ ] **Boş isimle** oluşturmaya çalışın → Hata mesajı görmeli
- [ ] Geçerli bir kullanıcı oluşturun
- [ ] Kullanıcı kartı görünüyor mu?

**Test Adımları:**
1. Uygulama açılınca "Hoş Geldiniz" ekranı
2. "Yeni Kullanıcı" butonuna tıklayın
3. İsim: "Test Kullanıcı"
4. Avatar seçin (örn: 📚)
5. "Oluştur" butonuna tıklayın
6. Toast notification: "Kullanıcı başarıyla oluşturuldu"

#### 1.2 Kullanıcı Değiştirme
- [ ] İkinci bir kullanıcı oluşturun
- [ ] Navbar'da kullanıcı dropdown'ı görünüyor mu?
- [ ] Kullanıcılar arası geçiş yapabiliyor musunuz?
- [ ] Her kullanıcının kendi verileri var mı?

---

### 2. Plan Yönetimi

#### 2.1 Plan Import
- [ ] Ayarlar > Plan Yönetimi'ne gidin
- [ ] "Plan Import Et" butonu çalışıyor mu?
- [ ] File picker açılıyor mu?
- [ ] `public/plan-templates/kpss-2026-detayli-plan.json` dosyasını seçin
- [ ] Plan başarıyla import ediliyor mu?
- [ ] Toast notification: "Plan başarıyla import edildi"

**Kontrol Edilecekler:**
- [ ] Plan adı: "KPSS 2026 Ortaöğretim Hazırlık Planı"
- [ ] Sınav tarihi: 12 Temmuz 2026
- [ ] Dersler: Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık, Güncel
- [ ] Aşamalar: Konu Anlatımı, Soru Çözüm, Deneme ve Tekrar

#### 2.2 Plan Değiştirme
- [ ] İkinci bir plan import edin (kpss-2026-ornek-plan.json)
- [ ] Plan listesinde iki plan görünüyor mu?
- [ ] "Aktif Yap" butonu çalışıyor mu?
- [ ] Aktif plan değişiyor mu?

#### 2.3 Plan Silme
- [ ] Plan listesinde "Sil" butonuna tıklayın
- [ ] Confirmation modal açılıyor mu?
- [ ] "Emin misiniz?" mesajı var mı?
- [ ] İptal butonu çalışıyor mu?
- [ ] Sil butonu planı siliyor mu?

---

### 3. Dashboard

#### 3.1 Bugünün Programı
- [ ] Dashboard'da "Bugünün Programı" widget'ı görünüyor mu?
- [ ] Bugünün dersi gösteriliyor mu?
- [ ] Konu başlığı var mı?
- [ ] Hedef süre ve soru sayısı gösteriliyor mu?
- [ ] "Çalışmaya Başla" butonu çalışıyor mu?

**Not:** Eğer bugün program yoksa (Pazar/Pazartesi):
- [ ] "Bugün program yok - Dinlenme günü" mesajı görünüyor mu?

#### 3.2 Haftalık Özet
- [ ] "Bu Haftanın Özeti" widget'ı var mı?
- [ ] Progress bar'lar çalışıyor mu?
- [ ] Tamamlanan gün sayısı gösteriliyor mu?

#### 3.3 Sınav Geri Sayımı
- [ ] Exam Countdown widget'ı görünüyor mu?
- [ ] Sınav adı: "KPSS 2026"
- [ ] Kalan gün sayısı hesaplanıyor mu?
- [ ] Motivasyon mesajı var mı?

#### 3.4 Hızlı İşlemler
- [ ] Quick Actions kartları görünüyor mu?
- [ ] "Günlük Çalışma Ekle" → StudyLogPage'e yönlendiriyor mu?
- [ ] "Deneme Ekle" → ExamsPage'e yönlendiriyor mu?
- [ ] "İstatistikleri Gör" → StatsPage'e yönlendiriyor mu?

---

### 4. Çalışma Günlüğü (Study Log)

#### 4.1 Yeni Çalışma Kaydı
- [ ] Çalışma Günlüğü sayfasına gidin
- [ ] Calendar görünüyor mu?
- [ ] Bugünün tarihi highlight edilmiş mi?
- [ ] Bir tarihe tıklayın → Form açılıyor mu?

**Çalışma Kaydı Ekleme:**
1. Tarih: Bugün
2. Konu: "Matematik - Temel Kavramlar" (manuel girin)
3. Süre: 2.5 saat
4. Soru Seti Ekle:
   - Ders: Matematik
   - Doğru: 45
   - Yanlış: 5
   - "Yanlış siler" checkbox işaretli
   - Net: **43.75** (otomatik hesaplanmalı)
5. Notlar: "İlk çalışma testi"
6. "Kaydet" butonuna tıklayın

**Kontrol Edilecekler:**
- [ ] Net hesaplaması doğru mu? (45 - 5/4 = 43.75)
- [ ] Toast notification: "Çalışma kaydedildi"
- [ ] Calendar'da tarih işaretlendi mi? (✓)
- [ ] Form reset oldu mu?

#### 4.2 Birden Fazla Soru Seti
Yeni bir çalışma ekleyin:
- [ ] İlk soru seti: Türkçe (30D, 2Y)
- [ ] İkinci soru seti: Tarih (25D, 3Y)
- [ ] Her iki set listede görünüyor mu?
- [ ] Her birinin net'i ayrı hesaplanıyor mu?
- [ ] "Sil" butonu setleri kaldırıyor mu?

#### 4.3 Yanlış Siler Açık/Kapalı
Test 1 (Yanlış siler AÇIK):
- [ ] Doğru: 40, Yanlış: 4
- [ ] Net: 39 (40 - 4/4 = 39)

Test 2 (Yanlış siler KAPALI):
- [ ] Checkbox'ı kaldırın
- [ ] Doğru: 40, Yanlış: 4
- [ ] Net: 40 (yanlışlar sayılmaz)

#### 4.4 Form Validasyonları
- [ ] Süre: -1 girin → Hata mesajı
- [ ] Süre: 25 girin → "Max 24 saat" hatası
- [ ] Doğru: -5 girin → Hata mesajı
- [ ] Boş form submit → "Zorunlu alanlar" hatası

#### 4.5 Çalışma Düzenleme
- [ ] Calendar'da kayıtlı bir güne tıklayın
- [ ] Mevcut veriler formda görünüyor mu?
- [ ] Değişiklik yapın
- [ ] "Güncelle" butonu çalışıyor mu?
- [ ] Toast: "Çalışma güncellendi"

#### 4.6 Çalışma Silme
- [ ] "Sil" butonuna tıklayın
- [ ] Confirmation modal açılıyor mu?
- [ ] Silme işlemi çalışıyor mu?
- [ ] Calendar'dan işaret kalkıyor mu?

---

### 5. Deneme Sınavları

#### 5.1 Yeni Deneme Ekleme
- [ ] Deneme Sınavları sayfasına gidin
- [ ] "Deneme Ekle" sekmesi aktif mi?
- [ ] Form tüm dersleri gösteriyor mu?

**Deneme Formu Doldurma:**
1. Genel Bilgiler:
   - Tarih: Bugün
   - Deneme Adı: "Ösym Tarz Deneme 1"
   - Yayın Evi: "X Yayınları"
   - Süre: 135 dakika
   - Yanlış Siler: İşaretli

2. Ders Sonuçları:
   - **Türkçe** (30 soru): 25D, 3Y
     - [ ] Boş: 2 (otomatik hesaplanmalı)
     - [ ] Net: 24.25
   - **Matematik** (30 soru): 28D, 2Y
     - [ ] Boş: 0
     - [ ] Net: 27.5
   - **Tarih** (27 soru): 20D, 5Y
   - **Coğrafya** (18 soru): 15D, 2Y
   - **Vatandaşlık** (9 soru): 7D, 1Y
   - **Güncel** (6 soru): 5D, 0Y

3. Ek Bilgiler:
   - Zayıf Konular: "Geometri, Osmanlı Tarihi"
   - Notlar: "Zaman yönetimi iyi gitti"

4. "Kaydet" butonuna tıklayın

**Kontrol Edilecekler:**
- [ ] Her ders için net otomatik hesaplanıyor mu?
- [ ] Boş soru sayısı otomatik mu? (Total - D - Y)
- [ ] Toplam net hesaplanıyor mu?
- [ ] Toast: "Deneme kaydedildi"

#### 5.2 Deneme Validasyonları
- [ ] Doğru + Yanlış > Total → Hata mesajı
- [ ] Negatif sayı → Hata mesajı
- [ ] Boş deneme adı → Hata mesajı

#### 5.3 Deneme Listesi
- [ ] "Deneme Listesi" sekmesine geçin
- [ ] Eklenen deneme görünüyor mu?
- [ ] Tarih, ad, toplam net gösteriliyor mu?
- [ ] Ders bazlı netler küçük yazılmış mı?

#### 5.4 Deneme Detayı
- [ ] "Detay" butonuna tıklayın
- [ ] Modal açılıyor mu?
- [ ] Tüm bilgiler görünüyor mu?
- [ ] Ders bazlı tablo var mı?
- [ ] Zayıf konular listesi var mı?

#### 5.5 Deneme Grafiği
İkinci bir deneme ekleyin (farklı netlerle):
- [ ] "Net Gelişimi" line chart görünüyor mu?
- [ ] İki deneme grafikte var mı?
- [ ] Tooltip çalışıyor mu?
- [ ] "Ders Karşılaştırma" bar chart var mı?

#### 5.6 Deneme Düzenleme ve Silme
- [ ] "Düzenle" butonu çalışıyor mu?
- [ ] "Sil" → Confirmation modal
- [ ] Silme işlemi çalışıyor mu?

---

### 6. İstatistikler

#### 6.1 Genel Bakış
- [ ] İstatistikler sayfasına gidin
- [ ] "Genel Bakış" sekmesi aktif mi?

**İstatistik Kartları:**
- [ ] Toplam Çalışma Saati (icon: Clock)
- [ ] Toplam Soru Sayısı (icon: FileQuestion)
- [ ] Ortalama Net (icon: Target)
- [ ] Current Streak (icon: Flame 🔥)
- [ ] Plan İlerleme (%)
- [ ] Tutarlılık (%)

**Kontroller:**
- [ ] Sayılar doğru hesaplanıyor mu?
- [ ] Icon'lar görünüyor mu?
- [ ] Progress bar'lar çalışıyor mu?

#### 6.2 Ders Bazlı Analiz
- [ ] "Ders Bazlı" sekmesine geçin
- [ ] Her ders için kart var mı?

**Her Ders Kartında:**
- [ ] Ders adı ve icon (renk kodlu)
- [ ] Toplam soru / net
- [ ] Ortalama net per session
- [ ] Toplam çalışma saati
- [ ] Success rate %
- [ ] Trend indicator (↗️ / → / ↘️)

#### 6.3 Trend Analizi
- [ ] "Trend Analizi" sekmesine geçin
- [ ] "Haftalık Net Trend" line chart var mı?
- [ ] "Ders Karşılaştırma" bar chart var mı?
- [ ] "Haftalık Çalışma Saati" area chart var mı?

**Chart Kontrolleri:**
- [ ] Tooltip çalışıyor mu?
- [ ] Axis labels doğru mu?
- [ ] Renkler subject colors'a uygun mu?
- [ ] Responsive mi? (pencereyi küçült/büyüt)

#### 6.4 Tarih Aralığı Filtresi
- [ ] Date range selector var mı?
- [ ] Preset'ler çalışıyor mu?
  - [ ] Son 7 gün
  - [ ] Son 30 gün
  - [ ] Bu hafta
  - [ ] Bu ay
  - [ ] Tüm zamanlar
- [ ] Custom aralık seçebiliyor musunuz?
- [ ] "Uygula" butonu filtreliyor mu?

#### 6.5 Veri Export
- [ ] "Export" butonu var mı?
- [ ] Tıklayınca file save dialog açılıyor mu?
- [ ] JSON dosyası indiriliyor mu?
- [ ] Dosya içeriği geçerli JSON mı?
- [ ] Tüm veriler export edilmiş mi?

---

### 7. Ayarlar

#### 7.1 Profil Ayarları
- [ ] Ayarlar sayfasına gidin
- [ ] "Profil" sekmesi aktif mi?
- [ ] Mevcut kullanıcı bilgileri görünüyor mu?

**Profil Düzenleme:**
- [ ] İsmi değiştirebiliyor musunuz?
- [ ] Avatar değiştirebiliyor musunuz?
- [ ] "Kaydet" butonu çalışıyor mu?
- [ ] Toast: "Profil güncellendi"

#### 7.2 Plan Yönetimi
- [ ] "Plan Yönetimi" sekmesine geçin
- [ ] Aktif plan gösteriliyor mu?
- [ ] Plan listesi var mı?
- [ ] "Plan Import Et" çalışıyor mu?
- [ ] "Sil" butonu confirmation modal gösteriyor mu?

#### 7.3 Hesap Silme
- [ ] "Hesabı Sil" butonu kırmızı ve alt kısımda mı?
- [ ] Tıklayınca confirmation modal açılıyor mu?
- [ ] "Bu işlem geri alınamaz" uyarısı var mı?
- [ ] "İptal" çalışıyor mu?
- [ ] "Sil" butonu kullanıcıyı siliyor mu?
- [ ] UserSelectPage'e dönüyor mu?

---

### 8. Navigasyon ve Layout

#### 8.1 Sidebar Navigation
- [ ] Sidebar tüm sayfalarda görünüyor mu?
- [ ] Active route highlight'lanıyor mu?

**Sayfalar:**
- [ ] 📊 Dashboard
- [ ] 📝 Çalışma Günlüğü
- [ ] 📊 Deneme Sınavları
- [ ] 📈 İstatistikler
- [ ] ⚙️ Ayarlar

#### 8.2 Navbar
- [ ] Navbar her sayfada görünüyor mu?
- [ ] "StudyFlow" logosu sol üstte mi?
- [ ] Kullanıcı dropdown sağ üstte mi?
- [ ] Avatar ve isim görünüyor mu?
- [ ] "Çıkış Yap" çalışıyor mu?

#### 8.3 Breadcrumb ve Page Titles
- [ ] Her sayfada başlık var mı?
- [ ] Sayfa isimleri doğru mu?

---

### 9. UI/UX Özellikler

#### 9.1 Toast Notifications
4 çeşit toast test edin:
- [ ] Success (yeşil) → Çalışma kaydetme
- [ ] Error (kırmızı) → Geçersiz form submit
- [ ] Warning (sarı) → (varsa)
- [ ] Info (mavi) → (varsa)

**Toast Özellikleri:**
- [ ] Sağ üstte görünüyor mu?
- [ ] Auto-dismiss (3-4 saniye)
- [ ] Manual dismiss "X" butonu
- [ ] Slide-in animation
- [ ] Icon var mı?

#### 9.2 Loading States
- [ ] Sayfa yüklenirken loading spinner var mı?
- [ ] Buton'da loading state var mı? ("Kaydediliyor...")
- [ ] Skeleton screens var mı? (varsa)

#### 9.3 Empty States
Yeni bir kullanıcı oluşturun ve test edin:
- [ ] Plan yok → "Plan import et" mesajı
- [ ] Çalışma yok → "İlk çalışmanı ekle" mesajı
- [ ] Deneme yok → "İlk denemeyi ekle" mesajı
- [ ] İstatistik yok → "Veri yok" mesajı

#### 9.4 Modal'lar
- [ ] Backdrop overlay (koyu gri)
- [ ] ESC tuşu ile kapanıyor mu?
- [ ] Outside click ile kapanıyor mu?
- [ ] Scale + fade animation var mı?
- [ ] Focus trap çalışıyor mu? (Tab tuşu)

#### 9.5 Form Validasyonları
- [ ] Error mesajları input altında görünüyor mu?
- [ ] Error border (kırmızı) çalışıyor mu?
- [ ] Submit butonu disabled oluyor mu?
- [ ] Input focus'ta error temizleniyor mu?

#### 9.6 Animasyonlar
- [ ] Page transitions smooth mu?
- [ ] Hover effects çalışıyor mu?
- [ ] Button hover (scale, shadow)
- [ ] Card hover (lift effect)
- [ ] Progress bar animations

#### 9.7 Renk Kodlama (Subject Colors)
Her dersin rengi doğru mu?
- [ ] Türkçe: Kırmızı (#EF4444)
- [ ] Matematik: Mavi (#3B82F6)
- [ ] Tarih: Mor (#8B5CF6)
- [ ] Coğrafya: Yeşil (#10B981)
- [ ] Vatandaşlık: Turuncu (#F59E0B)
- [ ] Güncel: Gri (#6B7280)

---

### 10. Keyboard Navigation & Accessibility

#### 10.1 Tab Navigation
- [ ] Tab tuşu ile form alanları arasında geçiş
- [ ] Focus indicator (outline) görünüyor mu?
- [ ] Doğru sırayla mı?

#### 10.2 Keyboard Shortcuts
- [ ] ESC: Modal kapatma
- [ ] Enter: Form submit
- [ ] Arrow keys: Dropdown navigasyon (varsa)

#### 10.3 ARIA Labels
Console'da accessibility check (opsiyonel):
- [ ] Button'larda aria-label var mı?
- [ ] Input'larda aria-describedby var mı?

---

### 11. Performance

#### 11.1 Sayfa Yükleme
- [ ] Dashboard < 1 saniye
- [ ] Çalışma Günlüğü < 1 saniye
- [ ] İstatistikler < 2 saniye (grafikler yüzünden)

#### 11.2 Form Response
- [ ] Input onChange hızlı mı?
- [ ] Net hesaplama anlık mı?
- [ ] Validation feedback hızlı mı?

#### 11.3 Large Data
100 çalışma + 50 deneme ekleyin (script veya manuel):
- [ ] İstatistikler sayfası yavaşlıyor mu?
- [ ] Grafikler render ediliyor mu?
- [ ] Scroll smooth mu?

---

### 12. Data Persistence

#### 12.1 Yeniden Başlatma
1. Birkaç çalışma ve deneme ekleyin
2. Uygulamayı kapatın (Ctrl+C terminalde)
3. `npm run dev` ile yeniden başlatın
4. **Kontrol:**
   - [ ] Kullanıcılar korunuyor mu?
   - [ ] Son kullanıcı otomatik seçiliyor mu?
   - [ ] Planlar korunuyor mu?
   - [ ] Çalışma kayıtları korunuyor mu?
   - [ ] Deneme sonuçları korunuyor mu?

#### 12.2 Data Export/Import
- [ ] Export edilen JSON geçerli mi?
- [ ] İçerisinde tüm veriler var mı?
- [ ] Backup olarak kullanılabilir mi?

---

### 13. Console Errors

#### 13.1 Chrome DevTools (Electron)
Uygulama açıkken F12 veya Ctrl+Shift+I ile DevTools açın:

**Console Sekmesi:**
- [ ] Kırmızı error yok mu?
- [ ] Warning'ler kabul edilebilir mi?
- [ ] Network errors yok mu?

**İzin Verilen Warning'ler:**
- ⚠️ "Module type not specified" (postcss.config.js) - Harmless
- ⚠️ "CJS build deprecated" - Vite warning, kabul edilebilir

**Kabul Edilemez:**
- ❌ Uncaught TypeError
- ❌ Uncaught ReferenceError
- ❌ React render errors
- ❌ Failed to load resource

#### 13.2 Network Tab
- [ ] Failed requests yok mu?
- [ ] 404 errors yok mu?

---

## 🎯 Critical Path Test (Hızlı Özet Test)

Eğer zamanınız kısıtlıysa, bu adımları sırayla test edin:

### 1. Kullanıcı Oluştur (2 dk)
1. Uygulama aç
2. Yeni kullanıcı: "Test User"
3. Avatar seç
4. Oluştur

### 2. Plan Import Et (1 dk)
1. Ayarlar > Plan Yönetimi
2. kpss-2026-detayli-plan.json import et

### 3. Çalışma Ekle (2 dk)
1. Çalışma Günlüğü
2. Bugün: Matematik, 2 saat, 45D 5Y
3. Kaydet

### 4. Deneme Ekle (3 dk)
1. Deneme Sınavları
2. Tüm derslere sonuç gir
3. Kaydet

### 5. İstatistikleri Gör (1 dk)
1. İstatistikler sayfası
2. Genel bakış kontrol
3. Grafikler render oldu mu?

### 6. Data Persistence (1 dk)
1. Uygulamayı kapat
2. Yeniden aç
3. Veriler korunmuş mu?

**Toplam: ~10 dakika**

---

## 📋 Test Sonuçları Formu

### Genel Değerlendirme
- **Test Edildi:** [ ] Evet / [ ] Hayır
- **Tarih:** _______________
- **Süre:** ___ dakika

### Kritik Buglar (Varsa)
```
1.
2.
3.
```

### Minor Sorunlar (Varsa)
```
1.
2.
3.
```

### UI/UX İyileştirme Önerileri
```
1.
2.
3.
```

### Genel Not
```
[Uygulamanın genel durumu hakkında notlarınız]
```

### Final Karar
- [ ] ✅ Production'a hazır
- [ ] ⚠️ Minor düzeltmeler gerekli
- [ ] ❌ Major sorunlar var, düzeltilmeli

---

## 🎉 Başarılı Test Kriterleri

Aşağıdaki kriterler karşılanıyorsa **production'a hazır**:

✅ **Temel Fonksiyonlar:**
- Kullanıcı oluşturma/değiştirme çalışıyor
- Plan import çalışıyor
- Çalışma kaydı çalışıyor
- Deneme kaydı çalışıyor
- İstatistikler gösteriliyor

✅ **Validasyonlar:**
- Form validasyonları çalışıyor
- Error mesajları görünüyor
- Boş/geçersiz data engelleniyor

✅ **UI/UX:**
- Toast notifications çalışıyor
- Modal'lar çalışıyor
- Animasyonlar smooth
- Loading states var

✅ **Data:**
- Data kaydediliyor
- Uygulama kapanınca korunuyor
- Export çalışıyor

✅ **Performance:**
- Sayfa yüklemeleri hızlı (< 2s)
- Form response hızlı
- Grafik render hızlı

✅ **Console:**
- Critical error yok
- Warning'ler kabul edilebilir

---

**Test tamamlandı mı? Icon ekleyip build alabilirsiniz!** 🚀

**Komut:** `npm run package:win`
