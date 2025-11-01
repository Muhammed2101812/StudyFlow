# 📚 StudyFlow Plan Şablonları

Bu klasörde StudyFlow uygulamasında kullanabileceğiniz örnek çalışma plan şablonları bulunmaktadır.

## 📥 Nasıl Kullanılır?

### Adım 1: Şablon Dosyasını İndirin
- İstediğiniz sınav türü için uygun JSON dosyasını bilgisayarınıza kaydedin
- **YKS 2026** → `yks-2026-ornek-plan.json`
- **KPSS 2026** → `kpss-2026-ornek-plan.json`

### Adım 2: StudyFlow'a İçe Aktarın
1. StudyFlow uygulamasını açın
2. Ayarlar sayfasına gidin
3. "Plan İçe Aktar" butonuna tıklayın
4. İndirdiğiniz JSON dosyasını seçin
5. Plan otomatik olarak yüklenecektir

### Adım 3: Planı Özelleştirin (İsteğe Bağlı)
- JSON dosyasını metin editörü ile açabilir ve ihtiyaçlarınıza göre düzenleyebilirsiniz
- Konu başlıklarını, süreleri, soru sayılarını değiştirebilirsiniz
- Günleri ekleyip çıkarabilirsiniz

---

## 📋 Mevcut Şablonlar

### 1. YKS 2026 Sayısal Hazırlık Planı
**Dosya:** `yks-2026-ornek-plan.json`

**Özellikleri:**
- **Toplam Süre:** 40 hafta
- **Sınav Tarihi:** 13 Haziran 2026
- **Dersler:** Matematik, Fizik, Kimya, Biyoloji, Türkçe, Tarih, Coğrafya
- **Aşamalar:**
  - Aşama 1: Temel Atma (16 hafta)
  - Aşama 2: Pekiştirme ve Hız Kazanma (12 hafta)
  - Aşama 3: Final Sprint (12 hafta)

**Haftalık Program:**
- Salı-Cumartesi arası çalışma (Pazar-Pazartesi dinlenme)
- Günlük 1.5-4 saat arası çalışma
- Deneme sınavları ve analiz günleri
- Zor konular için ekstra pekiştirme

**Öne Çıkan Özellikler:**
- ✅ Temel seviyeden başlayıp ileri seviyeye ilerleyen yapı
- ✅ Her konuya yeterli süre ayrılmış
- ✅ Düzenli deneme sınavı ve analiz günleri
- ✅ Son 12 haftada yoğun deneme maratonu
- ✅ Sınav öncesi motivasyon ve dinlenme günleri

---

### 2. KPSS 2026 Ortaöğretim Hazırlık Planı (Genel)
**Dosya:** `kpss-2026-ornek-plan.json`

**Özellikleri:**
- **Toplam Süre:** 32 hafta
- **Sınav Tarihi:** 12 Temmuz 2026
- **Dersler:** Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık, Güncel
- **Aşamalar:**
  - Aşama 1: Temel Oluşturma (12 hafta)
  - Aşama 2: Derinleştirme ve Pekiştirme (12 hafta)
  - Aşama 3: Final Sprint (8 hafta)

**Haftalık Program:**
- Salı-Cumartesi arası çalışma
- Günlük 1.5-3.5 saat arası çalışma
- Haftalık deneme sınavları (son 10 hafta)
- Güncel olaylar takibi

**Öne Çıkan Özellikler:**
- ✅ Türkçe ve Matematik ağırlıklı program
- ✅ Güncel konulara özel günler
- ✅ Hız çalışması ve zaman yönetimi teknikleri
- ✅ Sınav stratejisi geliştirme
- ✅ Son haftalarda moral ve motivasyon odaklı çalışma

---

### 3. KPSS 2026 Ortaöğretim Detaylı Plan (PDF'den)
**Dosya:** `kpss-2026-detayli-plan.json`

**Özellikleri:**
- **Toplam Süre:** 32 hafta (192 gün detaylı program)
- **Sınav Tarihi:** 12 Temmuz 2026
- **Dersler:** Türkçe, Matematik, Tarih, Coğrafya, Vatandaşlık
- **Aşamalar:**
  - Aşama 1: Temel Kavramlar (8 hafta)
  - Aşama 2: İleri Konular (8 hafta)
  - Aşama 3: Pekiştirme ve Deneme (8 hafta)
  - Aşama 4: Final Sprint (8 hafta)

**Haftalık Program:**
- Pazartesi-Cumartesi arası çalışma
- Günlük 0.5-3 saat arası çalışma
- Her hafta farklı konu kombinasyonları
- Düzenli deneme sınavları ve detaylı analiz

**Öne Çıkan Özellikler:**
- ✅ **En detaylı plan** - Her gün için özel konu başlıkları
- ✅ Pedagojik olarak sıralı konu akışı
- ✅ Türkçe: Ses bilgisi → Yapı bilgisi → Anlam bilgisi → Paragraf
- ✅ Matematik: Temel kavramlar → Geometri → Problemler → Mantık
- ✅ Tarih: Kronolojik sıralama (İlk Çağ → Cumhuriyet)
- ✅ Deneme sınavları sonrası detaylı analiz günleri
- ✅ Hız çalışması teknikleri ve stratejik soru seçimi
- ✅ Son 2 hafta tam dinlenme ve moral artırma odaklı

**Kimler İçin Uygun:**
- Sıfırdan başlayanlar için ideal
- Konuları sistematik öğrenmek isteyenler
- Günlük ne çalışacağını bilemeyenler
- Detaylı yol haritası arayanlar

---

## 🛠️ Kendi Planınızı Oluşturma

Kendi çalışma planınızı sıfırdan oluşturmak isterseniz, aşağıdaki JSON yapısını kullanabilirsiniz:

### Minimum Plan Yapısı

```json
{
  "id": "benzersiz-plan-id",
  "name": "Plan Adı",
  "description": "Planın açıklaması",
  "examDate": "2026-06-13",
  "subjects": [
    "Matematik",
    "Türkçe",
    "Fizik"
  ],
  "stages": [
    {
      "name": "Aşama 1: Başlangıç",
      "weeks": [
        {
          "weekNumber": 1,
          "days": [
            {
              "day": "Salı",
              "subject": "Matematik",
              "topic": "Konu başlığı",
              "duration": 2,
              "targetQuestions": 50
            }
          ]
        }
      ]
    }
  ]
}
```

### Gerekli Alanlar

#### Plan Düzeyinde:
- **id** (zorunlu): Benzersiz plan kimliği (örn: `"yks-2026"`)
- **name** (zorunlu): Plan adı (örn: `"YKS 2026 Hazırlık"`)
- **examDate** (zorunlu): Sınav tarihi (`"YYYY-MM-DD"` formatında)
- **subjects** (zorunlu): Ders listesi (dizi)
- **stages** (zorunlu): Aşamalar (dizi)

#### Gün Düzeyinde:
- **day**: Gün adı (Pazartesi, Salı, vb.)
- **subject**: Ders adı (subjects listesinden biri)
- **topic**: Konu başlığı
- **duration**: Çalışma süresi (saat cinsinden, ondalık kullanabilirsiniz: 1.5, 2.5)
- **targetQuestions**: Hedef soru sayısı

### İsteğe Bağlı Alanlar:
- **description**: Plan açıklaması
- **difficulty**: Zorluk seviyesi (`"beginner"`, `"intermediate"`, `"advanced"`)

---

## 📝 İpuçları

### Plan Oluştururken Dikkat Edilecekler:

1. **Gerçekçi Hedefler Koyun**
   - Günlük 10 saatten fazla çalışma planlamayın
   - Dinlenme günleri bırakın (önerilen: Pazar-Pazartesi)

2. **Dengeli Dağılım**
   - Her derse yeterli zaman ayırın
   - Zor dersler için daha fazla süre planlayın

3. **Aşamalı İlerleme**
   - Basit konulardan zor konulara doğru ilerleyin
   - İlk haftalarda tempo düşük, son haftalarda yüksek olsun

4. **Tekrar Günleri**
   - Düzenli aralıklarla tekrar günleri ekleyin
   - Deneme sınavları için özel günler ayırın

5. **Motivasyon**
   - Son haftalarda kolay sorularla moral artırın
   - Sınavdan 2-3 gün önce tam dinlenme planlayın

---

## ⚠️ Önemli Notlar

- **Tarih Formatı:** Tüm tarihler `YYYY-MM-DD` formatında olmalıdır (örn: `2026-06-13`)
- **Encoding:** JSON dosyası UTF-8 encoding ile kaydedilmelidir
- **Geçerli JSON:** Dosya geçerli JSON formatında olmalı (virgüllere, tırnaklara dikkat edin)
- **Dosya Boyutu:** Çok büyük planlar (100+ hafta) performans sorunlarına yol açabilir

---

## 🆘 Yardım

### Plan yüklenmiyor mu?

1. **JSON Geçerliliğini Kontrol Edin:**
   - https://jsonlint.com adresinde dosyanızı kontrol edin
   - Tüm köşeli parantezler `[]` ve süslü parantezler `{}` eşleşiyor mu?
   - Tüm dizeler çift tırnak içinde mi?

2. **Zorunlu Alanları Kontrol Edin:**
   - `id`, `name`, `examDate`, `subjects`, `stages` alanları var mı?
   - Tarih formatı doğru mu? (`YYYY-MM-DD`)

3. **Encoding Kontrol:**
   - Dosya UTF-8 encoding ile kaydedilmiş mi?
   - Türkçe karakterler bozuk görünüyor mu?

### Hala sorun mu yaşıyorsunuz?

StudyFlow uygulamasının "Ayarlar > Hakkında" bölümünden destek ekibimize ulaşabilirsiniz.

---

## 📊 Örnek Kullanım Senaryoları

### Senaryo 1: YKS'ye Sıfırdan Başlama
1. `yks-2026-ornek-plan.json` dosyasını indirin
2. StudyFlow'a aktarın
3. İlk hafta programını görün
4. Günlük çalışmalarınızı kaydedin
5. Haftalık ilerlemenizi takip edin

### Senaryo 2: Kendi Planınızı Oluşturma
1. `yks-2026-ornek-plan.json` dosyasını kopyalayın
2. Metin editörü ile açın (VS Code, Notepad++ önerilir)
3. Konu başlıklarını kendi ihtiyaçlarınıza göre değiştirin
4. Süreleri ve soru sayılarını ayarlayın
5. Yeni dosyayı farklı kaydedin
6. StudyFlow'a yeni planı yükleyin

### Senaryo 3: Kısa Dönem Plan
1. Örnek planlardan birini açın
2. Sadece ihtiyacınız olan haftaları bırakın
3. Gereksiz aşamaları silin
4. Yoğunlaşmak istediğiniz dersleri önceliklendirin
5. Özelleştirilmiş planı kaydedin

---

## 🎯 Başarı İpuçları

✅ **Planınıza sadık kalın** ama esnek olun
✅ **Günlük kayıt tutun** - uygulama bunu kolaylaştırır
✅ **Deneme sınavlarını atlam ayın** - gelişiminizi ölçün
✅ **Zayıf konularınızı tespit edin** ve ekstra çalışın
✅ **Dinlenmeyi unutmayın** - verimlilik için gerekli

---

**Tüm plan şablonları StudyFlow ekibi tarafından hazırlanmıştır.**
**Başarılar dileriz! 🎓**

**İletişim:** support@studyflow.app
**Versiyon:** 1.0
**Son Güncelleme:** 1 Kasım 2025
