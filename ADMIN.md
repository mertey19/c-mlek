# Yönetim paneli (`/admin`)

Blog yazıları, ürünler, kategoriler, firma/iletişim bilgileri ve teklif talepleri panelden yönetilir.

## Nasıl çalışır

- İçerik `content/*.json` dosyalarında durur. Panelde "Kaydet" denince dosya GitHub API ile bu repoya commit edilir, Vercel yeni commit'i görüp siteyi 1-2 dakikada yeniden yayınlar. Site statik kalır, veritabanı gerekmez.
- Teklif formu gönderimleri Upstash Redis'e kaydedilir (kişisel veri repoya yazılmaz), ardından kullanıcı yine WhatsApp'a yönlendirilir.
- Geliştirme ortamında (`npm run dev`) panel dosyaları doğrudan diske yazar, talepler `.data/leads.json`'a düşer.

## Vercel kurulumu

Project → Settings → Environment Variables:

| Değişken | Açıklama |
| --- | --- |
| `ADMIN_PASSWORD` | Panel şifresi (en az 10 karakter) |
| `ADMIN_SESSION_SECRET` | En az 32 karakter rastgele değer: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `GITHUB_TOKEN` | Fine-grained token — yalnızca bu repo, **Contents: Read and write** |
| `GITHUB_REPO` | `mertey19/c-mlek` |
| `GITHUB_BRANCH` | `main` (isteğe bağlı) |

Teklif talepleri için: Vercel → Storage → Upstash (Redis) → projeye bağla. `KV_REST_API_URL` ve `KV_REST_API_TOKEN` otomatik eklenir.

Değişkenleri ekledikten sonra yeniden deploy edin.

- `GITHUB_*` yoksa panel salt okunur açılır.
- Redis yoksa form WhatsApp'a yönlendirmeye devam eder, yalnızca kayıt tutulmaz.

## Notlar

- Blog metinlerinde `{{adres}}`, `{{telefon}}`, `{{firma}}` firma bilgileriyle doldurulur. Link adresinde `whatsapp:project` gibi kısayollar güncel WhatsApp bağlantısına dönüşür.
- Görseller `public/images/uploads/` altına yüklenir (en fazla 4 MB, WebP önerilir), site yeniden yayınlandığında görünür.
- Talepler 2 yıl sonra otomatik silinir. KVKK aydınlatma metnini bu kayda göre güncelleyin.
