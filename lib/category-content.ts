import type { Category, ContentBlock } from './content-types';

export const CATALOG_CONTENT_UPDATED = '2026-10-19';
type Editorial = { seoTitle?: string; intro: string; description: string; blocks: ContentBlock[] };

/** Selection guidance, not claims about inventory, delivery or tested durability. */
const editorials: Record<string, Editorial> = {
  'buyuk-boy-kupler': {
    seoTitle: 'Büyük Boy Toprak Küp ve Terracotta Küpler | Tarsus',
    intro: 'Tarsus büyük boy küp koleksiyonunu bahçe, giriş ve avlu için değerlendirin. Büyük boy toprak küp seçiminde yükseklik kadar gövde çapı ve yerleşim yolu da önemlidir. Mersin’de büyük boy çömlek talebinizi kullanım amacı, ölçü ve adetle paylaşabilirsiniz.',
    description: 'Büyük boy terracotta küpler için form, çap ve yerleşim rehberi. Katalogdaki ürünleri inceleyin; ölçü, adet ve teslimat kapsamıyla teklif isteyin.',
    blocks: [
      { title: 'Küpün en geniş noktasını ölçü listesine ekleyin', body: 'Dar tabanlı bir küpün omuz bölümü çok daha geniş olabilir. Ürünün yüksekliğiyle birlikte ağız, en geniş gövde ve taban ölçülerini sorun. Kapıdan geçiş veya duvar önündeki görünüm için bu ölçüler farklı bilgiler verir. Yerleşim fotoğrafında hedef noktayı işaretlemek, formun çevresiyle oranını konuşmayı kolaylaştırır.' },
      { title: 'Dekoratif kullanım ve dikim aynı seçim değildir', body: 'Bir küpü boş bir odak olarak kullanmak ile içine bitki yerleştirmek farklı ihtiyaçlar doğurur. Dar ağızlı formlarda iç saksının geçişi ve çıkarılması ayrıca kontrol edilmelidir. Doğrudan dikim uygunluğu, drenaj ve bakım bilgisi seçilen ürün için teyit edilir; büyük gövde tek başına bitkiye uygun hacim garantisi değildir.' },
      { title: 'Son konuma kadar erişimi planlayın', body: 'Ambalajlı ölçüleri, araç yanaşma noktasını ve son taşıma yolunu teklif öncesinde paylaşın. Basamak veya dar dönüş varsa fotoğraf ekleyin. Sevkiyat ile bahçedeki son yere yerleştirmenin aynı hizmet olduğunu varsaymayın; kapsam, ürün ve adres değerlendirildikten sonra netleşir.', link: { href: '/rehber/buyuk-boy-saksi-secerken', label: 'Büyük form seçimi rehberi' } },
    ],
  },
  'terracotta-saksilar': {
    seoTitle: 'El Yapımı Toprak Saksı ve Terracotta Saksılar | Tarsus',
    intro: 'Mersin terracotta saksı talepleriniz için Tarsus’taki el yapımı toprak saksı koleksiyonunu inceleyin. Dış görünüş, iç kullanım hacmi ve bakım düzenini birlikte değerlendirin; doğrudan dikim veya çıkarılabilir iç saksı tercihinizi belirtin.',
    description: 'Terracotta saksı modellerinde dış çap, iç hacim, ağız açıklığı ve drenaj seçimi. Kullanım alanınıza göre ürün ve tedarik bilgisi alın.',
    blocks: [
      { title: 'Dış ölçü ve kullanılabilir hacmi ayırın', body: 'Saksının dış çapı zeminde kaplanan alanı gösterir; iç hacmi tek başına anlatmaz. Mevcut bir iç saksıyı kullanacaksanız onun yüksekliğini ve en geniş çapını da ölçün. Ağızdan geçiş, tabana oturma ve gerektiğinde çıkarılabilme koşullarını görüşün. Aynı yükseklikte iki farklı form aynı dikim alanını sunmayabilir.' },
      { title: 'Drenajı ve tabak kullanımını görüşün', body: 'Bitkili kullanımda suyun yönetimi, bitkinin ihtiyaçları ve ürünün yapısı birlikte ele alınmalıdır. Drenaj açıklığı, tabak veya iç saksı seçeneğini seçilen form için sorun. Bir saksının bütün bitkilere ya da bütün açık hava koşullarına uygun olduğu varsayılmamalıdır. Bakım bilgisi ve dış mekân uygunluğu ürün bazında teyit edilmelidir.' },
      { title: 'Sipariş için kullanım senaryosu yazın', body: 'Balkon, bahçe ve ticari alanda farklı ölçü ve bakım erişimi gerekebilir. Ürün adedi, yaklaşık ölçü, kullanılacağı yerin fotoğrafı ve teslimat adresiyle başvurun. El yapımı yüzeylerdeki doğal ton farklılıklarını beklentinize dahil edin; fiyat ve mevcut seçenekler talep üzerinden netleştirilir.', link: { href: '/rehber/terracotta-saksi-nedir', label: 'Terracotta malzemeyi tanıyın' } },
    ],
  },
  'dekoratif-saksilar': {
    seoTitle: 'Dekoratif Terracotta Saksı ve Çömlek Seçimi | Tarsus',
    intro: 'Dekoratif terracotta saksı seçiminde form, mekânın görüş hattı ve çevresindeki malzemeler öne çıkar. Bitkisiz bir odak parçasıyla bitkili bir düzen için aynı ürünü seçmek zorunda değilsiniz. Tarsus atölyesine mekân fotoğrafı ve hedef ölçüyle danışabilirsiniz.',
    description: 'Dekoratif saksı seçimi için form, yerleşim ve malzeme uyumu. Ev, kafe ve giriş alanları için çömlek seçeneklerini ölçülerinizle değerlendirin.',
    blocks: [
      { title: 'Tek parça mı, bir grup mu?', body: 'Bir köşede tek bir formu öne çıkarmakla farklı yüksekliklerde grup oluşturmak farklı düzenlerdir. Önce ürünün görüleceği yönü ve çevredeki mobilyaları fotoğraflayın. Bir grupta yalnızca saksı çaplarını değil, aralarında bırakılacak boşluğu da hesaplayın. Fotoğrafları benzer ölçekte karşılaştırmak ürünlerin birbirine oranını anlamayı kolaylaştırır.' },
      { title: 'Günlük kullanım alanını koruyun', body: 'Kapı açılması, sandalye hareketi ve temizlik sırasında kalan boşlukları kontrol edin. Düşündüğünüz çapı zemine bant veya kartonla işaretleyerek bir yerleşim provası yapabilirsiniz. Bu prova alan kullanımını anlatır; zemin, ağırlık veya sabitleme konusunda teknik uygunluk belgesi değildir. Gereken uygulama değerlendirmesi ayrıca yapılmalıdır.' },
      { title: 'Yüzey beklentinizi fotoğrafla anlatın', body: 'Duvar, zemin ve mobilya fotoğraflarını ürün talebine ekleyin. Ekran rengi ve ortam ışığı algıyı değiştirebileceğinden kesin renk eşleşmesi varsaymayın. Bitki yerleştirmek istiyorsanız dekoratif görünümün yanında ağız açıklığı, iç ölçü ve kullanım uygunluğunu da sorun.', link: { href: '/blog/aydincik-kucuk-mekan-dekoratif-comlek-secimi', label: 'Küçük mekânda dekoratif form seçimi' } },
    ],
  },
  'bahce-saksilari': {
    seoTitle: 'Tarsus Bahçe Saksısı | Büyük Boy Toprak Saksılar',
    intro: 'Tarsus bahçe saksısı koleksiyonunda büyük boy toprak saksı ve daha küçük grupları giriş, oturma bölümü ve yürüyüş yolu için ayrı planlayın. Mersin el yapımı toprak saksı taleplerinde bitki, bakım erişimi ve teslimat güzergâhını birlikte paylaşın.',
    description: 'Terracotta bahçe saksıları için yerleşim, bitkili kullanım ve bakım erişimi rehberi. Form, ölçü ve adet bilgisiyle tedarik teklifi alın.',
    blocks: [
      { title: 'Bahçenin kullanım noktalarını belirleyin', body: 'Girişte yüksek bir vurgu ile oturma alanındaki alçak bir saksı farklı görevler üstlenebilir. Basit bir krokide ürünlerin yerini ve boş kalacak geçişleri gösterin. Her noktaya aynı büyük formu yerleştirmek yerine işlevleri ayrı değerlendirin. Ürünlerin arka plandaki duvar ve bitkilerle ilişkisini genel alan fotoğrafında kontrol edin.' },
      { title: 'Bitki ve ürün gereksinimlerini eşleştirin', body: 'Dikim yapılacak saksının iç hacmi, ağız açıklığı ve drenaj özelliklerini sorun. Bitki seçimi ve bakım koşullarını bakım sorumlusuyla değerlendirin. Dış ortamda kullanımı veya don koşullarına dayanımı tüm ürünler için genellemeyin; seçilen formun kullanım bilgisine göre karar verin. Bakım sırasında çevresine erişilebilmesi de yerleşimin parçasıdır.' },
      { title: 'Bahçe kapısından sonraki taşıma yolunu gösterin', body: 'Ürün listesinde adet ve ölçüye ek olarak kapı açıklığı, basamak ve son yerleştirme noktası yer alsın. Ambalajlı ölçüyü ayrıca isteyin. Araca erişim sağlanması, bütün bahçeye aynı yöntemle taşıma yapılabileceği anlamına gelmez; teslimat ve yerleştirme kapsamını teyit edin.', link: { href: '/blog/anamur-bahce-terracotta-saksi-yerlesimi', label: 'Bahçe yerleşimini adım adım planlayın' } },
    ],
  },
  'seramik-urunler': {
    seoTitle: 'Tarsus Seramik Çömlek ve Seramik Ürün Koleksiyonu',
    intro: 'Tarsus seramik çömlek ve seramik ürün koleksiyonunda form, yüzey rengi ve kullanım amacı birlikte ele alınır. Katalog kaydındaki ürün fotoğraflarını, belirtilen ölçüleri ve uygulama bilgilerini inceleyerek seçim yapın.',
    description: 'Seramik ürün koleksiyonunu ve katalogdaki çömlekleri inceleyin. Renk, ölçü, kullanım ve fotoğraf bilgileriyle ürün bazında teklif isteyin.',
    blocks: [
      { title: 'Koleksiyon görseli ile ürün fotoğrafını ayırın', body: 'Bir uygulama görseli yerleşim fikri verir; tek bir ürünün tam ölçüsünü veya stok durumunu göstermeyebilir. Ürün detayına geçerek o kayda ait fotoğrafları ve açıklamayı inceleyin. Renk, yüzey ve form konusunda belirli bir beklentiniz varsa ürün adını ve ilgilendiğiniz görseli görüşmeye ekleyin.' },
      { title: 'Kullanım uygunluğunu ürüne göre sorun', body: 'Dekorasyon, bitkili kullanım ve farklı kap türleri aynı gereksinimlere sahip değildir. Malzeme adı tek başına gıda teması, dış mekân veya dona dayanım onayı anlamına gelmez. Talep ettiğiniz kullanımı açıkça belirtin. Özellikle ölçü birimi veya iç hacim belirtilmemişse fotoğraftan tahmin etmek yerine atölyeden açıklama isteyin.' },
      { title: 'Kayıtlı çömlekleri karşılaştırın', body: 'Ürün adını, ölçüsünü, hedef adedi ve teslimat adresini birlikte paylaşın. Birden çok formu karşılaştırıyorsanız her kalemi ayrı yazın. Güncel üretim seçeneği, stok ve fiyat talep sırasında doğrulanır; katalogda görünmesi hazır teslim sözü değildir.', link: { href: '/urunler/seramik-comlek', label: 'Seramik Çömlek ürün detayını görün' } },
    ],
  },
  'mimari-saksilar': {
    seoTitle: 'Mimari Terracotta Saksı | Projeye Göre Form ve Ölçü',
    intro: 'Mimari terracotta saksı seçimi, plan üzerindeki bir noktayı ürün ölçüsüne dönüştürmeyi gerektirir. Giriş aksı, cephe oranı, dolaşım ve bakım bilgileri ürün listesinde birlikte ele alınır; üretim ve tedarik kapsamı proje özelinde değerlendirilir.',
    description: 'Mimari saksılar için cephe, giriş aksı ve dolaşım odaklı seçim rehberi. Proje fotoğrafı, ölçü ve adetle terracotta tedarik talebi oluşturun.',
    blocks: [
      { title: 'Konseptten ölçü listesine geçin', body: 'Mimari görseldeki bir formu uygulamaya aktarırken yüksekliğin yanında en geniş çapı ve zeminde kaplayacağı alanı belirleyin. Kapı, tabela ve mobilyalarla ilişkisini gösterin. Ürünün rolünü odak, bitkili grup veya sınır tanımı olarak not etmek farklı seçenekleri daha anlaşılır biçimde karşılaştırmanıza yardımcı olur.' },
      { title: 'Dolaşımı ve teknik uygunluğu ayrı doğrulayın', body: 'Giriş ve servis geçişleri, kapı hareketleri ve bakım erişimi korunmalıdır. Ağır bir ürünün teras veya farklı kotta kullanılması gerekiyorsa zemin ve taşıma koşulları uzman tarafından değerlendirilmelidir. Bir ürün önerisi veya konsept görsel, taşıyıcı uygunluk ya da uygulama onayı yerine geçmez.' },
      { title: 'Proje kodlarıyla teklif isteyin', body: 'Plan üzerindeki her noktaya kod verip ürün ailesi, yaklaşık ölçü ve adet ekleyin. Tasarımı onaylanan kalemleri alternatiflerden ayırın. Yerleştirme ve bitki dikiminin teklif kapsamını ayrıca sorun; ürün, üretim ve sevkiyat koşulları proje bilgileri üzerinden netleştirilir.', link: { href: '/projeler', label: 'Mimari proje tedarik sürecini inceleyin' } },
    ],
  },
  'otel-villa-koleksiyonlari': {
    seoTitle: 'Otel ve Villa Bahçe Saksısı Koleksiyonları | Tarsus',
    intro: 'Otel için büyük saksı ve villa bahçe saksısı koleksiyonlarını karşılama, avlu, teras ve bahçe için farklı kullanım gruplarıyla planlayın. Aynı form ailesinin ölçüleri, alanların görevine göre değerlendirilebilir.',
    description: 'Otel ve villa için terracotta koleksiyon seçimi. Karşılama, avlu ve teras alanlarına yönelik ürün listesi, etap ve tedarik hazırlığı.',
    blocks: [
      { title: 'Karşılama ve dinlenme alanlarını ayırın', body: 'Uzaktan görülen giriş küpü ile oturma bölümünün yanındaki bitkili saksının ölçü ve bakım ihtiyaçları farklıdır. Alanları kodlayıp her birine kullanım amacı yazın. Bir koleksiyon bütünlüğü hedeflenirken bütün noktalarda aynı boy ürün kullanılması gerekmez; oranları gerçek alan ölçülerinde karşılaştırın.' },
      { title: 'Uygulama etaplarını ürünlerle eşleştirin', body: 'İlk açılacak alanlara ait kalemleri sonraki etaplardan ayırın. Farklı üretim partilerindeki doğal ton değişimleri hakkında beklentinizi baştan konuşun. Aynı alanda birlikte duracak ürünlerin sipariş düzeni bu nedenle önemlidir. Kesin tarih, üretim durumu ve paketleme planı teyit edilmeden uygulama takvimine teslim sözü yazmayın.' },
      { title: 'Teslimat ve yerleştirme sorumluluğunu belirleyin', body: 'İndirme saatleri, araç yaklaşımı, bekletme alanı ve teslim sorumlusunu belirtin. Ürün tedariki, sahaya taşıma, son yerleştirme ve dikim farklı kapsamlar olabilir. Teklifleri aynı kalemler üzerinden karşılaştırın; görselleri tamamlanmış müşteri referansı olarak değil, kullanım fikri olarak değerlendirin.', link: { href: '/otel-villa-peyzaj', label: 'Otel, villa ve peyzaj uygulamalarını inceleyin' } },
    ],
  },
  'peyzaj-projeleri': {
    seoTitle: 'Peyzaj Saksıları ve Büyük Peyzaj Küpü | Terracotta',
    intro: 'Peyzaj saksıları ve büyük peyzaj küpü seçimini bitkilendirme planı, bakım erişimi ve sahadaki uygulama sırasıyla birlikte yapın. Peyzaj projeleri için terracotta ürünlerde dış ölçü kadar kullanılabilir iç hacim de önemlidir.',
    description: 'Peyzaj projeleri için terracotta saksı ve küp seçimi. Bitkilendirme, bakım erişimi, ürün kodları ve saha teslimatı için hazırlık bilgileri.',
    blocks: [
      { title: 'Bitkilendirme planı ile kap ölçüsünü eşleştirin', body: 'Saksıya yerleştirilecek bitki ve bakım yöntemi, iç hacim ve drenaj beklentisini etkiler. Bu bilgileri peyzaj uygulamasını üstlenen kişiyle hazırlayın. Aynı dış ölçüdeki farklı formlar aynı iç kullanımı sağlamayabilir. Ürün listesinde dekoratif küpleri dikim yapılacak saksılardan ayrı tutun.' },
      { title: 'Bakım ekipmanının erişimini düşünün', body: 'Ürünlerin yalnızca ilk gün yerleşimi değil, sulama ve bakım sırasında çevresine ulaşılması da gerekir. Dar kalan geçişleri ve kot farklarını plan üzerinde gösterin. Zeminin uygunluğu veya sabitleme ihtiyacı proje sorumlusunca değerlendirilmelidir; standart bir katalog görselinden saha için teknik onay çıkarılmamalıdır.' },
      { title: 'Saha takvimini ürün kodlarıyla paylaşın', body: 'Her uygulama etabına ürün, ölçü ve adet atayın. Alan hazır değilken gelecek parçalar için bekletme ihtiyacını belirtin. Ambalajın korunması, indirme ve son konuma taşıma işlerinin kimde olduğu açık olsun. Tedarik takvimi ve sevkiyat bedeli sipariş listesiyle adresin değerlendirilmesinden sonra teyit edilir.', link: { href: '/blog/silifke-otel-peyzaj-terracotta-tedarik-plani', label: 'Etaplı peyzaj tedariki rehberi' } },
    ],
  },
  'ozel-uretim': {
    seoTitle: 'Özel Ölçü Terracotta Saksı ve Özel Üretim Çömlek',
    intro: 'Özel ölçü terracotta saksı ve özel üretim çömlek talebinde form fikrini ölçü, adet ve kullanım bilgisine dönüştürün. Her tasarımın uygulanabilirliği, Tarsus atölyesinin üretim değerlendirmesiyle netleştirilir.',
    description: 'Özel ölçü çömlek ve terracotta talepleri için form, ölçü, adet ve üretim hazırlığı rehberi. Uygulanabilirlik ve teslim koşullarını görüşün.',
    blocks: [
      { title: 'Referans görseli ölçülerle birlikte gönderin', body: 'Görselin hangi özelliğini istediğinizi belirtin: ağız açıklığı, omuz oranı, yükseklik veya yüzey karakteri. Hedef ölçüleri ve kullanım amacını ekleyin. Fotoğraftaki her ayrıntının aynı malzeme ve yöntemle üretilebileceğini varsaymayın; benzer form ile birebir yeniden üretim farklı taleplerdir.' },
      { title: 'Tolerans ve onay sürecini konuşun', body: 'El yapımı üretimde ölçü ve yüzey beklentisinin nasıl değerlendirileceğini önceden sorun. Örnek görme, numune veya aşamalı onay ihtiyacınız varsa bunu talep dosyasına yazın. Bu seçeneklerin sunulması ve maliyeti sipariş bazında görüşülür. Tasarım değiştiğinde daha önce konuşulan fiyat ve üretim süresi yeniden değerlendirme gerektirebilir.' },
      { title: 'Üretim takviminden önce kapsamı tamamlayın', body: 'Ürün adedi, teslimat noktası, paketleme ihtiyacı ve hedef tarih aralığı belli olsun. Form veya ölçü henüz kesinleşmemişse bu durumu belirtin. Yapılabilirlik teyit edilmeden kesin teslim günü, minimum adet veya sabit fiyat taahhüdü verilmez; atölye sürecini bu çerçevede değerlendirin.', link: { href: '/atolye', label: 'Atölye üretim aşamalarını inceleyin' } },
    ],
  },
  toptan: {
    seoTitle: 'Seramik Çömlek Modelleri ve Kullanım Rehberi | Tarsus',
    intro: 'Seramik çömlek koleksiyonunda kullanım amacını ve form beklentisini belirleyerek ürün detaylarına geçin. Tarsus atölyesine adetli alım için ürün bazında liste gönderebilirsiniz; koleksiyon sayfası ile tek bir ürünün kayıtlı ölçü ve kullanım bilgilerini ayrı değerlendirin.',
    description: 'Seramik çömlek modelleri için koleksiyon rehberi. Dekoratif ve bitkili kullanım soruları, ürün detayları ve adet bazında teklif hazırlığı.',
    blocks: [
      { title: 'Koleksiyon içinden ürün detayına geçin', body: 'Bir koleksiyonun kapağı, tek bir ürünün ölçü ve stok bilgisini kapsamaz. İlgilendiğiniz ürünün detay sayfasında fotoğraf, açıklama ve belirtilen uygulamaları inceleyin. Seramik Çömlek adlı ürünle bu koleksiyon sayfası farklı amaç taşır: biri belirli ürün kaydıdır, diğeri seçim yapmanız için grubu tanıtır.' },
      { title: 'Çömleğin kullanımını açıklayın', body: 'Dekoratif kullanım ile bitki yerleştirme ihtiyacı için sorulacak ölçüler farklı olabilir. İç hacim, ağız açıklığı ve drenaj bilgisini istediğiniz ürün üzerinden teyit edin. Belirtilmemiş ölçü birimini, dış ortam dayanımını veya gıda temasına uygunluğu kendiniz varsaymayın. Kullanım fotoğrafı ve hedef ölçü, talebinizin daha anlaşılır olmasını sağlar.' },
      { title: 'Adetli talepleri ürün bazında listeleyin', body: 'Farklı form ve renkleri tek bir toplam adet altında birleştirmek yerine ayrı satırlarda yazın. Her kaleme teslimat noktası ve hedef zaman aralığını ekleyin. El yapımı ürünlerde doğal farklılıklar olabileceğini dikkate alın; fiyat, hazır ürün ve üretim seçenekleri atölye görüşmesinde teyit edilir.', link: { href: '/urunler/seramik-urunler', label: 'Seramik ürün grubundaki kayıtları görün' } },
    ],
  },
};

export function categoryEditorial(category: Category): Editorial {
  return editorials[category.slug] ?? {
    intro: `${category.name} grubunu kullanım amacı, ölçü ve adet bilgileriyle değerlendirin. Güncel ürün ve üretim seçenekleri atölyeyle görüşülerek teyit edilir.`,
    description: `${category.name} koleksiyonu: ürün seçimi, ölçü ve kullanım bilgileri. Tarsus atölyesinden adet ve teslimat kapsamına göre teklif isteyin.`,
    blocks: [{ title: `${category.name} için talebinizi hazırlayın`, body: `${category.name} talebinizde hedef ölçüyü, kullanım yerini ve teslimat adresini belirtin. Katalogda görünen ürünler stok veya kesin teslim günü taahhüdü değildir. Form, üretim ve paketleme seçeneklerini görüşmek için ürün görseli veya alan fotoğrafı paylaşabilirsiniz.`, link: { href: '/iletisim#teklif', label: 'Koleksiyon hakkında bilgi alın' } }],
  };
}
