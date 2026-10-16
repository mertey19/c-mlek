import { business, type ContentBlock, type PageContent } from './site-data';

// District names checked against https://www.mersin.gov.tr/nufus-ve-dagilim on 2026-10-16.
// These are enquiry/service areas, never additional shops or workshop addresses.
export const SERVICE_AREAS_UPDATED = '2026-10-16';
type District = {
  slug: string;
  name: string;
  focus: string;
  intro: string;
  description: string;
  blocks: ContentBlock[];
  question: string;
  answer: string;
};

export const mersinDistricts: District[] = [
  {
    slug: 'akdeniz', name: 'Akdeniz', focus: 'İşletme girişleri ve toplu tedarik',
    intro: 'Akdeniz ilçesindeki iş yeri, restoran veya ortak alanınız için çömlek arıyorsanız, Tarsus’taki atölyemizden terracotta saksı ve büyük küp seçeneklerini değerlendirebilirsiniz. Tek bir giriş parçasından çok adetli alıma kadar form, yerleşim ve sevkiyat kapsamını birlikte belirliyoruz.',
    description: 'Akdeniz, Mersin için el yapımı çömlek, terracotta saksı ve büyük küp. İşletme girişleri ve toplu alımlar için Tarsus atölyesinden teklif isteyin.',
    blocks: [
      { title: 'Girişi tanımlayan, geçişi daraltmayan formlar', body: 'Bir işletme girişinde ürün yüksekliği kadar taban çapı ve kapı açılma payı da önemlidir. Akdeniz’deki mekânınızın ön cephe fotoğrafını, kullanılabilir zemin genişliğini ve yaya geçişini paylaşın. Bitkili saksı ile yalnızca dekoratif kullanılan küpü ayrı değerlendirelim; aynı dış ölçü, aynı kullanım anlamına gelmez.', bullets: ['Kapı ve servis geçişlerini ölçün.', 'Dış mekân mı, saçak altı mı olduğunu belirtin.', 'Tek parça mı, karşılıklı iki form mu istediğinizi yazın.'], link: { href: '/urunler/buyuk-boy-kupler', label: 'Büyük boy küp seçenekleri' } },
      { title: 'Toplu alımda tek bir ürün listesi hazırlayın', body: 'Birden fazla giriş veya işletme için alım yapıyorsanız her konumu ürün adediyle eşleştirin. Böylece benzer görünmesi istenen parçalar ile farklı ölçü gerektiren noktalar teklif içinde ayrılabilir. El yapımı üretimde doğal renk ve yüzey farkları olabileceğini hesaba katın; birebir endüstriyel eşleşme varsaymayın.' },
      { title: 'Teslimatın son metresini de planlayın', body: 'Akdeniz teslimatı için mahalle, araç yanaşma noktası, indirme saat aralığı ve ürünün yerleştirileceği alanı bildirin. Sokağa teslim ile bina içine taşıma aynı kapsam değildir. Taşıma ekibi veya ekipman ihtiyacı, sevkiyat ücretinden ayrı olarak görüşülmelidir; gün ve bedel teklif onayında netleşir.' },
    ],
    question: 'Akdeniz’de birden fazla iş yerine ayrı teslimat isteyebilir miyim?',
    answer: 'Adresleri ve her adrese ayrılan ürün adetlerini paylaşabilirsiniz. Ayrı teslimatların uygulanabilirliği, araç erişimi ve sevkiyat bedeli teklif sırasında değerlendirilir; standart ücretsiz dağıtım sözü verilmez.',
  },
  {
    slug: 'anamur', name: 'Anamur', focus: 'Bahçe koleksiyonları ve sipariş birleştirme',
    intro: 'Anamur için terracotta saksı veya büyük çömlek seçerken ürünleri bir bütün olarak planlamak, renk ve ölçek kararını kolaylaştırır. Tarsus’taki üretim atölyemizden bahçe, avlu ve ticari mekân talepleriniz için ürün ve sevkiyat teklifi alabilirsiniz.',
    description: 'Anamur çömlek ve terracotta saksı talepleri için Tarsus’tan üretici teklifi. Bahçe koleksiyonu, büyük küp ve sipariş bazlı sevkiyat planı.',
    blocks: [
      { title: 'Bahçeyi tek tek değil, bir yerleşim olarak düşünün', body: 'Anamur’daki bahçeniz için önce odak noktasını ve yardımcı saksıların yerini belirleyin. Girişte yüksek bir küp, oturma alanında daha alçak saksılar farklı görevler üstlenebilir. Bitki dikilecek formlarda iç hacim, ağız açıklığı ve drenaj ihtiyacını peyzaj planınızla birlikte değerlendirin.', link: { href: '/urunler/bahce-saksilari', label: 'Bahçe saksılarını inceleyin' } },
      { title: 'Sipariş kalemlerini sevkiyattan önce birleştirin', body: 'Farklı alanlar için düşünülen ürünleri ölçü, adet ve kullanım amacıyla tek listede toplamak paketleme hesabını anlaşılır kılar. Daha sonra eklenecek tek bir büyük parça, farklı bir taşıma planı gerektirebilir. Mevcut seçenekler ve özel üretim talebi ayrı değerlendirilir; katalog görselinden stok veya hazır teslim sonucu çıkarılmamalıdır.' },
      { title: 'Teslim almaya hazır bir alan oluşturun', body: 'Anamur teslimat adresinde ambalajlı ürünlerin konulacağı düz ve korunaklı alanı önceden belirleyin. Teslim günü erişim sağlayacak kişiyi, araç yaklaşımını ve bahçe kapısının genişliğini teklif talebine ekleyin. Ambalaj açma ve hasar kontrol yöntemini de sipariş sırasında sorun; teslim süresi ve taşıma bedeli adres bazında teyit edilir.' },
    ],
    question: 'Anamur siparişimde farklı boy saksıları aynı teklifte birleştirebilir miyim?',
    answer: 'Evet, her formun yaklaşık ölçüsünü ve adedini tek listede gönderebilirsiniz. Birlikte üretim veya sevkiyat olanağı ürünlerin hazır olma durumuna, paket hacmine ve teslimat planına göre netleştirilir.',
  },
  {
    slug: 'aydincik', name: 'Aydıncık', focus: 'Küçük mekânlarda doğru çap ve yerleşim',
    intro: 'Aydıncık’taki kafe, ev girişi veya küçük bahçeniz için el yapımı terracotta arıyorsanız, kullanılabilir alanın ölçüsüyle başlayabilirsiniz. Tarsus atölyemizden dekoratif çömlek ve saksı seçeneklerini, adet ve teslimat kapsamıyla birlikte değerlendirin.',
    description: 'Aydıncık için dekoratif çömlek ve terracotta saksı seçenekleri. Küçük bahçe ve kafe girişlerine uygun form seçimi, Tarsus’tan teklif ve sevkiyat.',
    blocks: [
      { title: 'Dar bir girişte ölçü sırası: çap, geçiş, yükseklik', body: 'Aydıncık’ta bir dükkân önü veya ev girişi düzenlerken önce ürünün kaplayacağı zemin alanını ölçün. En geniş gövde çapını yalnızca taban ölçüsüyle karıştırmayın. Kapı açılırken, sandalye çekilirken ve temizlik yapılırken kalan boşluk da seçimi etkiler. Fotoğrafta küçük görünen bir küp, dar bir alanda baskın olabilir.', link: { href: '/urunler/dekoratif-saksilar', label: 'Dekoratif saksı formlarına bakın' } },
      { title: 'Dekoratif kullanım ile bitki kullanımını ayırın', body: 'Çömleği tek başına bir obje olarak mı, içine bitki yerleştirerek mi kullanacağınızı belirtin. Bitkili kullanımda saksı içi ölçüler, drenaj ve suyun zemine ulaşma biçimi ayrıca konuşulmalıdır. İç mekânda kullanılacak bir altlık veya koruma çözümünün ürüne dahil olduğunu varsaymayın; ürün ve aksesuar kapsamını teklifte sorun.' },
      { title: 'Az adetli talepte de teslimat ayrıntısı önemlidir', body: 'Aydıncık için tek parça talebinde ürünün kendisi kadar ambalajlı hacmi de taşıma planını etkileyebilir. Adres, kat, merdiven ve araçtan son konuma olan mesafeyi paylaşın. Ürün bedeli, paketleme ve sevkiyat kalemlerinin nasıl hesaplandığını isteyin; minimum adet ve gönderim seçeneği ürün bazında teyit edilir.' },
    ],
    question: 'Aydıncık’taki küçük kafem için yalnızca bir çömlek sorabilir miyim?',
    answer: 'Tek parça ihtiyacınızı paylaşabilirsiniz. Uygun form, mevcut üretim seçenekleri, minimum sipariş ve taşıma uygulanabilirliği birlikte değerlendirilir. Fotoğraf ve ölçü göndermek, gereğinden büyük ürün seçimini önlemeye yardımcı olur.',
  },
  {
    slug: 'bozyazi', name: 'Bozyazı', focus: 'Bahçe yolları ve dengeli saksı grupları',
    intro: 'Bozyazı’da bahçe yolu, avlu veya oturma alanı için terracotta saksı grupları oluşturabilirsiniz. Tarsus’taki atölyemiz, el yapımı çömlek ve küpleri yerleşim planınıza göre değerlendirir; üretim ve teslimat ayrıntıları sipariş öncesinde görüşülür.',
    description: 'Bozyazı bahçe ve avlu düzenlemeleri için terracotta saksı ve çömlek. Saksı grupları, ölçü seçimi ve Tarsus atölyesinden teslimat teklifi.',
    blocks: [
      { title: 'Saksı gruplarında tekrar ve boşluk dengesi', body: 'Bozyazı’daki bahçe yolunuzda her noktaya aynı büyüklükte ürün koymak yerine, yürüyüş aksını ve oturma ceplerini işaretleyin. İki veya üç farklı yükseklikle kurulacak bir grup için toplam kapladığı alanı hesaplayın. Sulama ve bakım sırasında ürünlerin arasına erişim gerektiğini de yerleşim çiziminize ekleyin.', link: { href: '/urunler/terracotta-saksilar', label: 'Terracotta saksı koleksiyonu' } },
      { title: 'Ürünleri konumlarına göre numaralandırın', body: 'Birden fazla saksı istendiğinde basit bir kroki üzerinde A, B ve C gibi işaretler kullanın. Her konumun yaklaşık ölçü aralığını ve bitki ihtiyacını aynı isimle listeleyin. Bu düzen, farklı formların teklif ve teslimat sırasında karışmasını azaltır. El yapımına özgü ton farkları için güncel ürün veya numune bilgisi isteyin.' },
      { title: 'Bahçe içine taşıma koşullarını paylaşın', body: 'Bozyazı teslimatında bahçe kapısından ürünün son konumuna kadar olan zemini tarif edin. Çakıl, basamak ve dar dönüşler taşıma yöntemini etkileyebilir. Ambalajın nerede açılacağı, indirme sorumluluğu ve yerleştirme desteğinin kapsamı siparişten önce konuşulmalıdır; bunlar sevkiyat hizmetine kendiliğinden dahil sayılmaz.' },
    ],
    question: 'Bozyazı bahçem için aynı renkte farklı boylar seçebilir miyim?',
    answer: 'Birbirini tamamlayan formlar ve ölçüler hakkında teklif isteyebilirsiniz. Terracotta el yapımı olduğu için ton ve yüzeyin tam aynı olması garanti edilmez; beklentinizi fotoğraflarla ileterek güncel seçenekleri teyit edin.',
  },
  {
    slug: 'camliyayla', name: 'Çamlıyayla', focus: 'Mevsimlik kullanım ve bakım planı',
    intro: 'Çamlıyayla’daki ev veya bahçeniz için çömlek seçerken yalnızca görünümü değil, kullanım mevsimini ve kışın saklama koşullarını da değerlendirin. Tarsus atölyemizden terracotta saksı ve dekoratif küp seçenekleri için ölçü ve sevkiyat bilgisi alabilirsiniz.',
    description: 'Çamlıyayla için terracotta saksı ve çömlek: mevsimlik bahçe kullanımı, drenaj ve saklama koşulları. Tarsus atölyesinden ürün ve teslimat teklifi.',
    blocks: [
      { title: 'Dışarıda kalma süresini baştan belirtin', body: 'Çamlıyayla’da kullanacağınız saksının yıl boyunca dışarıda mı, yalnızca belirli dönemlerde mi duracağını söyleyin. Terracotta ürünlerin tamamı için koşulsuz don dayanımı varsayılmamalıdır. Seçilen formun malzeme ve bakım bilgisini atölyeden teyit edin; don riski olan kullanımlar için koruma ve su birikimini önleme planını ayrıca değerlendirin.', link: { href: '/rehber', label: 'Malzeme ve kullanım rehberi' } },
      { title: 'Taşınabilirlik de bir seçim ölçütüdür', body: 'Kışın korunaklı bir alana alınması düşünülen ürünlerde yalnızca boş saksı ölçüsüne bakmayın. Toprak ve bitki eklendikten sonraki taşıma ihtiyacı farklıdır. Dekoratif boş küp ile dikili saksıyı ayrı planlayın; güvenli taşıma yöntemini önceden belirlemeden büyük ürünün dönemsel olarak kolayca taşınacağını varsaymayın.' },
      { title: 'Teslim günü adresin erişilebilirliğini teyit edin', body: 'Çamlıyayla teslimatı için mahalleyi, varsa yol veya araç kısıtını ve adreste bulunacağınız tarih aralığını paylaşın. Son yaklaşım yolunun güncel fotoğrafı taşıma değerlendirmesini kolaylaştırır. Üretim takvimi ile teslim alma zamanını birlikte planlayın; hava, yol ve adres koşulları teyit edilmeden kesin sevkiyat günü sözü verilmez.' },
    ],
    question: 'Çamlıyayla’da terracotta saksıyı kışın dışarıda bırakabilir miyim?',
    answer: 'Bu karar seçilen ürüne, drenaja ve kullanım koşullarına bağlıdır. Her terracotta ürün donmaya dayanıklı kabul edilmemelidir. Sipariş öncesinde ürünün teknik özelliklerini ve önerilen koruma koşullarını teyit edin.',
  },
  {
    slug: 'erdemli', name: 'Erdemli', focus: 'Yazlık ve ortak alan siparişleri',
    intro: 'Erdemli’de yazlık, site girişi veya bahçe için terracotta saksı arıyorsanız, ürün seçimiyle teslim alma takvimini birlikte planlayabilirsiniz. Tarsus’taki atölyemizden el yapımı çömlek, büyük küp ve birden fazla konuma yönelik tedarik teklifi isteyin.',
    description: 'Erdemli terracotta saksı ve çömlek talepleri için üreticiden teklif. Yazlık, site girişi ve bahçe projelerine Tarsus’tan planlı tedarik.',
    blocks: [
      { title: 'Ortak alanlarda kararı ölçüyle netleştirin', body: 'Erdemli’de bir site veya ortak kullanım alanı için ürün alırken yerleşimin yönetim tarafından değerlendirilmesi gerekebilir. Giriş fotoğrafı, yürüyüş yolu genişliği ve istenen adetleri içeren kısa bir liste hazırlayın. Saksının bakımına ve sulamasına kimin erişeceğini belirlemek, yalnızca görsele göre yapılan seçimden daha sağlıklı bir başlangıçtır.', link: { href: '/otel-villa-peyzaj', label: 'Peyzaj ve ortak alan kullanımları' } },
      { title: 'Yazlık teslimatını kullanım tarihine göre görüşün', body: 'Ürünün kullanılacağı ilk gün ile teslim alınabileceği ilk gün aynı olmayabilir. Adreste bulunmadığınız dönemleri ve teslim alacak kişinin bilgisini önceden paylaşın. Mevcut ürün seçeneklerini özel ölçü taleplerinden ayrı sorun; üretim gerektiren bir form için yalnızca taşımaya ayrılan süre yeterli olmayabilir.' },
      { title: 'Çok bloklu adreslerde ürün dağılımını ayırın', body: 'Erdemli teslimat talebinde site veya bina adı tek başına yeterli olmayabilir. Hangi blokta kaç ürün kullanılacağını, araç girişini ve toplu indirme noktasını belirtin. Ambalajlı ürünlerin bekleyeceği alanı da planlayın. Bir noktaya indirme ile bloklara dağıtım kapsamını ayrı teyit ederek teklifin neyi içerdiğini açık tutun.' },
    ],
    question: 'Erdemli’deki yazlığıma belirli bir hafta teslimat isteyebilir miyim?',
    answer: 'Tercih ettiğiniz tarih aralığını talebinize ekleyebilirsiniz. Uygunluk, ürünün üretim durumu ve taşıma planı görüldükten sonra teyit edilir. Sipariş onayı olmadan belirli gün veya hafta için teslimat garantisi verilmez.',
  },
  {
    slug: 'gulnar', name: 'Gülnar', focus: 'Avlu düzeni ve erişim koşulları',
    intro: 'Gülnar için el yapımı çömlek ve terracotta saksı taleplerinde avlunun yerleşimi kadar adrese erişim de önemlidir. Tarsus atölyemizden dekoratif küp ve bahçe ürünleri için bilgi alabilir, ölçü ve teslimat koşullarını sipariş öncesinde görüşebilirsiniz.',
    description: 'Gülnar için el yapımı çömlek, avlu küpü ve terracotta saksı. Zemin, ölçü ve araç erişimine göre Tarsus atölyesinden tedarik teklifi.',
    blocks: [
      { title: 'Önce ürünün duracağı zemini değerlendirin', body: 'Gülnar’daki avlu veya bahçenizde taş döşeme, toprak ya da farklı kotlar varsa ürünün dengeli duracağı alanı belirleyin. Büyük küpü eğimi telafi etmek için gelişigüzel takozlarla yerleştirmeyin. Seçilecek formun tabanı ve kullanım koşulları için destek ihtiyacını uygulamayı yapacak kişiyle görüşün; ürün seçimi zemin düzenlemesinin yerine geçmez.', link: { href: '/urunler/buyuk-terracotta-kup', label: 'Büyük terracotta küpü inceleyin' } },
      { title: 'Avluda odak noktası mı, dikim alanı mı?', body: 'Bir ağacın yanında dekoratif boş küp ile içine bitki dikilecek saksının ihtiyaçları farklıdır. Avludaki mevcut malzemeleri gösteren gündüz fotoğrafını gönderin. İstenen yükseklik ve çap aralığını ayrıca yazın; perspektif nedeniyle fotoğraftan kesin ölçü çıkarılamaz. Bitkili kullanımda iç hacim ve drenaj açıklığını teyit edin.' },
      { title: 'Mahalle ve son yaklaşım yolunu ayrıntılandırın', body: 'Gülnar sevkiyatında açık adresin yanı sıra aracın yanaşabileceği noktayı ve indirme sonrası taşıma mesafesini paylaşın. Dar dönüş, merdiven veya araç kısıtı varsa tekliften önce bildirin. Yolun güncel durumunu ve teslim alacak kişiyi teyit etmek, uygun ambalaj ve taşıma yönteminin değerlendirilmesine yardımcı olur.' },
    ],
    question: 'Gülnar’da araç kapıma kadar yaklaşamıyorsa ne yapmalıyım?',
    answer: 'Araçtan son konuma kalan mesafeyi, zemini ve varsa basamakları fotoğraflarla iletin. İndirme ve iç taşıma sorumlulukları siparişten önce belirlenmelidir. Kapıya kadar taşımanın her adreste mümkün veya fiyata dahil olduğu varsayılmaz.',
  },
  {
    slug: 'mezitli', name: 'Mezitli', focus: 'Teras, balkon ve site girişleri',
    intro: 'Mezitli’de balkon, teras veya site girişi için terracotta saksı seçerken dolu ağırlığı, drenaj ve taşıma yolunu birlikte düşünün. Tarsus’taki üretim atölyemizden el yapımı çömlek seçeneklerini kullanım alanınıza göre değerlendirebilirsiniz.',
    description: 'Mezitli çömlek ve terracotta saksı seçenekleri: balkon, teras ve site girişleri için ölçü, drenaj ve taşıma planı. Tarsus’tan teklif alın.',
    blocks: [
      { title: 'Balkon ve terasta yalnızca dış ölçüye bakmayın', body: 'Mezitli’de yüksek katta bir alan için saksı alırken toprak, su ve bitkiyle birlikte oluşacak toplam yükü düşünün. Taşıyıcı kapasiteyi ürün satıcısından tahmin etmesini istemek yerine bina veya proje sorumlusuna doğrulatın. Kullanılabilir alan ölçüsü ve dikilecek bitki bilgisi, uygun form aralığını konuşmak için başlangıç sağlar.', link: { href: '/urunler/terracotta-saksilar', label: 'Terracotta saksı seçenekleri' } },
      { title: 'Sulama suyunun yolunu belirleyin', body: 'Alt komşuya veya kaplamaya su gitmesini önlemek için drenaj çıkışı ve zemin korumasını birlikte planlayın. Dekoratif dış kap ile doğrudan dikim yapılacak saksı aynı çözüm değildir. Altlık, iç kap veya ilave uygulama beklentiniz varsa talebe yazın; her ürünün bu parçalarla birlikte geldiği varsayılmamalıdır.' },
      { title: 'Asansör, kapı ve kat bilgisini paylaşın', body: 'Mezitli teslimatında bina giriş genişliği, asansör kabini ve kapı açıklığı büyük formların taşınmasını sınırlayabilir. Ürünün değil, ambalajlı paketin geçişini de değerlendirmek gerekir. Kat bilgisi ve indirme noktasını gönderin; bina içine taşıma ile adrese sevkiyatın ayrı kapsamlar olduğunu teklif sırasında netleştirin.' },
    ],
    question: 'Mezitli’deki balkonum için büyük saksı uygun mu?',
    answer: 'Uygunluk yalnızca balkonun genişliğine bağlı değildir. Dolu ürün ağırlığı, taşıyıcı kapasite, su tahliyesi ve güvenli yerleşim değerlendirilmelidir. Bina veya proje sorumlusundan uygunluk aldıktan sonra ölçü ve ürün seçeneklerini görüşebilirsiniz.',
  },
  {
    slug: 'mut', name: 'Mut', focus: 'İç avlular ve bitkili saksı seçimi',
    intro: 'Mut’taki evinizin avlusunda veya işletmenizde terracotta kullanmak için önce bitki ve yerleşim ihtiyacınızı belirleyin. Tarsus atölyemizden çömlek, bahçe saksısı ve büyük küp seçeneklerini; kullanım, ölçü ve teslimat kapsamıyla birlikte sorabilirsiniz.',
    description: 'Mut için terracotta bahçe saksısı ve dekoratif çömlek. İç avlu yerleşimi, bitki hacmi ve Tarsus atölyesinden sipariş bazlı teslimat teklifi.',
    blocks: [
      { title: 'Bitkinin ihtiyacı ile formun görünümünü eşleştirin', body: 'Mut’ta avlu için düşündüğünüz bitkinin kök hacmi, ağız açıklığı ve bakım erişimi ürün seçiminde belirleyicidir. Dar boyunlu dekoratif bir küp her bitkinin dikimi veya ileride çıkarılması için uygun olmayabilir. Bitki türünü ve yaklaşık boyunu paylaşın; peyzaj veya bitki bakım uzmanının önerdiği hacim aralığını ürün ölçüsüyle karşılaştırın.', link: { href: '/urunler/bahce-saksilari', label: 'Bitkili kullanım için bahçe saksıları' } },
      { title: 'Güneş alan ve korunaklı noktaları ayırın', body: 'Avlunuzun gün içinde nasıl kullanıldığını ve ürünün açıkta mı, sundurma altında mı duracağını tarif edin. Sulama alışkanlığı, suyun zeminden uzaklaşması ve bakım erişimi birlikte düşünülmelidir. Terracotta malzeme tek başına bir bitkinin her konumda yaşayacağını garanti etmez; bitki seçimini yerin koşullarına göre yapın.' },
      { title: 'Büyük formun avluya giriş yolunu kontrol edin', body: 'Mut teslimat adresinde sokak kapısı, koridor veya avlu geçidi ürünün en geniş noktasından dar olmamalıdır. Dönüş alanlarını ve varsa basamakları fotoğraflayın. Sevkiyat talebinizde açık adres, ürün adedi ve teslim alabileceğiniz tarih aralığı yer alsın. Paketleme, taşıma yöntemi ve bedeli ürünler netleştikten sonra teyit edilir.' },
    ],
    question: 'Mut’taki avlumda bir küpün içine doğrudan bitki dikebilir miyim?',
    answer: 'Her küp dikim amacıyla uygun olmayabilir. Ağız açıklığı, iç hacim ve drenaj seçilen form üzerinden teyit edilmelidir. Dekoratif kullanım ile bitkili kullanımı teklif talebinde ayırın ve bitkinin ihtiyaçlarını ayrıca değerlendirin.',
  },
  {
    slug: 'silifke', name: 'Silifke', focus: 'Konaklama ve peyzajda aşamalı tedarik',
    intro: 'Silifke’de otel, konaklama alanı veya peyzaj projesi için terracotta tedarikini uygulama takviminizle birlikte planlayabilirsiniz. Tarsus’taki atölyemiz, giriş küpleri ve bitkili saksıları farklı kullanım alanlarına göre değerlendirir.',
    description: 'Silifke için otel, bahçe ve peyzaj çömlekleri. Büyük terracotta küp, saksı grupları ve aşamalı tedarik için Tarsus üreticisinden teklif isteyin.',
    blocks: [
      { title: 'Karşılama, havuz çevresi ve bahçeyi ayrı listeleyin', body: 'Silifke’deki konaklama projenizde her alanın ürün görevi farklı olabilir. Girişte bir odak parçası, oturma bölümünde alçak formlar ve bahçede bitkili saksılar için ayrı ölçü aralıkları hazırlayın. Islak zemin, yaya akışı ve bakım araçlarının geçişi ürünün yerini etkiler; yerleşim kararını uygulama sorumlusuyla teyit edin.', link: { href: '/otel-villa-peyzaj', label: 'Otel ve peyzaj tedarik yaklaşımı' } },
      { title: 'Teklif listesini uygulama etaplarına bölün', body: 'Bütün alanlar aynı anda hazır değilse ürün adetlerini etaplar halinde listeleyin. İlk teslimatla sonraki üretimler arasındaki olası ton farkını el yapımı malzemenin bir özelliği olarak değerlendirin. Kesin renk eşleşmesi veya sürekli aynı stok varsayımı yerine, beklentinizi atölyeyle açıkça paylaşın ve güncel üretim seçeneklerini sorun.' },
      { title: 'Şantiye teslimi ile kullanıma hazır teslimi ayırın', body: 'Silifke adresinde ürünlerin uygulama öncesinde bekletileceği korunaklı bir alan olup olmadığını bildirin. Şantiye giriş prosedürü, indirme ekipmanı ve teslim sorumlusu taşıma planında önemlidir. Yerleştirme, dikim ve ambalaj atıklarının kaldırılmasının teklif kapsamına dahil olup olmadığını ayrıca sorun; üretim ve sevkiyat takvimi siparişe göre teyit edilir.' },
    ],
    question: 'Silifke projemi iki ayrı teslimat etabına bölebilir miyim?',
    answer: 'Etaplara ait ürün listesini ve tercih edilen tarih aralıklarını paylaşabilirsiniz. Ayrı üretim veya sevkiyatların uygulanabilirliği, maliyeti ve ton uyumu beklentisi sipariş öncesinde değerlendirilir.',
  },
  {
    slug: 'tarsus', name: 'Tarsus', focus: 'Atölye ziyareti ve doğrudan üretici görüşmesi',
    intro: 'Tarsus’ta çömlekçi veya terracotta üreticisi arıyorsanız, Yeşil Mahalle’deki atölyemizle doğrudan görüşebilirsiniz. El yapımı saksı ve büyük küp seçeneklerini yerinde değerlendirmek ya da projenize göre teklif almak için önceden iletişime geçin.',
    description: 'Tarsus çömlekçi ve terracotta atölyesi: Yeşil Mahalle’de el yapımı saksı, büyük küp ve toptan üretim. Ziyaret ve ürün seçimi için iletişime geçin.',
    blocks: [
      { title: 'Atölye ziyareti öncesinde ne hazırlamalısınız?', body: 'Tarsus’taki atölyeyi ziyaret etmeden önce kullanacağınız alanın fotoğraflarını ve yaklaşık ölçülerini hazırlayın. Aradığınız ürün türünü, adedi ve kullanım amacını bildirmek görüşmeyi verimli kılar. Üretim programına göre ziyaret zamanını önceden teyit edin; web sitesindeki her görselin o gün atölyede hazır bulunan bir ürünü gösterdiğini varsaymayın.', link: { href: '/atolye', label: 'Atölyedeki üretim sürecini tanıyın' } },
      { title: 'El yapımını yüzey ve form üzerinden değerlendirin', body: 'Bir terracotta parçanın ağız, omuz ve taban oranlarını birlikte inceleyin. Üretim izleri, ton ve ölçüdeki küçük farklılıklar el yapımının parçasıdır. Birden fazla ürün seçiyorsanız birbirleriyle ilişkisini de değerlendirin. Özel ölçü düşünüyorsanız hedef ölçünün yanında adet ve kullanım bilgisi verin; yapılabilirlik atölye tarafından teyit edilir.' },
      { title: 'Atölyeden teslim alma seçeneğini görüşün', body: 'Tarsus’tan kendi aracınızla teslim almak istiyorsanız ürünün ambalajlı ölçüsünü, araç uygunluğunu ve güvenli sabitleme ihtiyacını önceden sorun. Büyük formlarda yükleme ve taşıma düzeni ayrıca değerlendirilmelidir. Hazır ürün, üretim bekleyen sipariş ve planlı sevkiyat seçenekleri aynı takvime sahip olmayabilir; teslim alma zamanı onaylanmadan yola çıkmayın.' },
    ],
    question: 'Tarsus çömlek atölyenize doğrudan gelebilir miyim?',
    answer: `Atölyemiz ${business.address} adresindedir. Ziyaret zamanı ve görmek istediğiniz ürünleri önceden telefon veya WhatsApp üzerinden teyit etmenizi rica ederiz.`,
  },
  {
    slug: 'toroslar', name: 'Toroslar', focus: 'Bahçede kot farkı ve büyük form yerleşimi',
    intro: 'Toroslar’daki bahçe, müstakil ev girişi veya peyzaj alanı için terracotta çömlekleri ölçü ve zemin koşullarına göre seçebilirsiniz. Tarsus atölyemizden büyük küp ve saksı taleplerinize, uygulama alanınızı göstererek teklif isteyin.',
    description: 'Toroslar, Mersin için büyük küp ve terracotta bahçe saksıları. Zemin, kot farkı ve giriş ölçülerine göre Tarsus atölyesinden ürün teklifi.',
    blocks: [
      { title: 'Büyük form için sağlam ve dengeli bir yer seçin', body: 'Toroslar’da bahçe düzenlerken ürünün konulacağı alanın düzlüğünü ve çevresindeki kot farklarını kontrol edin. Eğimli zeminde ya da merdiven yanında büyük küp yerleşimi, güvenli uygulama değerlendirmesi gerektirir. Ürün fotoğrafı zeminin uygunluğunu göstermez; seçilecek taban ölçüsünü ve yerleştirme yöntemini uygulama sorumlusuyla netleştirin.', link: { href: '/urunler/buyuk-boy-kupler', label: 'Büyük boy küplere göz atın' } },
      { title: 'Giriş aksında yükseklik kadar görüşü de düşünün', body: 'Bahçe kapısının iki yanında kullanılacak formlar için kapı hareketini, görüş açısını ve bakım geçişini birlikte değerlendirin. İstenen etki her zaman en büyük ürünle sağlanmaz. Kapının genişliği ve çevredeki duvar yüksekliğiyle birlikte yaklaşık ürün çapını gönderin; tek odak parçası ile karşılıklı ikili düzen için seçenekleri ayrı sorabilirsiniz.' },
      { title: 'Basamaklı teslimat yolunu önceden gösterin', body: 'Toroslar adresinde araçtan bahçeye basamak veya rampa varsa fotoğraf ve ölçü paylaşın. Ürünün ambalajlı halde dönebileceği alanı da kontrol edin. İndirme ekipmanı, taşıma desteği ve son konuma yerleştirme sorumlulukları açık olmalıdır; sevkiyat bedelinin bunların tamamını kapsadığı varsayılmamalıdır.' },
    ],
    question: 'Toroslar’da merdivenli bahçeye büyük küp teslim edilebilir mi?',
    answer: 'Basamak sayısı, genişlik, dönüş alanı ve ürün ölçüsü görülmeden kesin yanıt verilemez. Fotoğraflarla birlikte erişim bilgilerini gönderin; uygun taşıma yöntemi ve hizmet kapsamı teklif aşamasında değerlendirilir.',
  },
  {
    slug: 'yenisehir', name: 'Yenişehir', focus: 'Kafe terasları ve mimari yerleşim',
    intro: 'Yenişehir’de restoran, kafe terası veya mimari bir giriş için terracotta saksı seçerken mekânın dolaşımını koruyan bir yerleşim planlayın. Tarsus atölyemizden el yapımı çömlekleri ölçü, adet ve kullanım senaryonuzla birlikte değerlendirebilirsiniz.',
    description: 'Yenişehir, Mersin için terracotta saksı ve çömlek. Kafe terası, restoran ve mimari girişlere uygun form seçimi; Tarsus’tan proje teklifi.',
    blocks: [
      { title: 'Saksıyı mekânın dolaşım planına yerleştirin', body: 'Yenişehir’de kafe veya restoran terası için ürün seçerken masa ve sandalyelerin kullanım halindeki alanını dikkate alın. Servis geçişi, giriş kapısı ve erişilebilir dolaşım boşlukları korunmalıdır. Ürünleri ayırıcı olarak kullanacaksanız tek saksının ölçüsü yerine bütün dizinin kapladığı alanı paylaşın.', link: { href: '/projeler', label: 'Mimari projeler için ürün seçimi' } },
      { title: 'Cephe malzemesiyle formu birlikte değerlendirin', body: 'Terracotta tonları taş, ahşap veya açık renk yüzeylerle farklı görünür. Mekânın gündüz fotoğrafını ve hedeflenen atmosferi gönderin. Seçimi yalnızca ekrandaki renge bağlamayın; ışık ve el yapımı üretim ton algısını değiştirebilir. Birden fazla parça için doğal farkları kabul edebileceğiniz aralığı görüşün.' },
      { title: 'İşletme saatleriyle teslimat saatini ayırın', body: 'Yenişehir teslimatında müşterilerin kullandığı saatler yerine uygun bir indirme aralığı belirlemek gerekebilir. Araç yanaşma noktasını, bina veya işletme giriş kurallarını ve ambalajlı ürünlerin geçici bekleme alanını belirtin. Mevcut mobilyaların arasından taşıma veya teras katına çıkarma gibi ihtiyaçların kapsamını ayrıca teyit edin.' },
    ],
    question: 'Yenişehir’deki kafemde saksılarla oturma alanını ayırabilir miyim?',
    answer: 'Yerleşim krokisi ve geçiş ölçüleriyle birlikte böyle bir talep iletebilirsiniz. Saksıların kapladığı alan, servis akışı ve güvenli geçişler proje sorumlusuyla değerlendirilmelidir; ürün önerisi bir uygulama veya güvenlik onayının yerine geçmez.',
  },
];

export const districtPath = (slug: string) => `/mersin/${slug}`;
export const districtFromPath = (path: string) => mersinDistricts.find(district => districtPath(district.slug) === path);
export const districtAreas = mersinDistricts.map(district => ({ '@type': 'AdministrativeArea', name: `${district.name}, Mersin`, containedInPlace: { '@type': 'AdministrativeArea', name: 'Mersin, Türkiye' } }));

export const districtPages: PageContent[] = mersinDistricts.map(district => ({
  path: districtPath(district.slug), locale: 'tr', kicker: 'Mersin · İlçe bazlı tedarik',
  title: `${district.name} için çömlek ve terracotta`,
  intro: district.intro,
  seoTitle: `${district.name} Çömlek & Terracotta Saksı`,
  seoDescription: district.description,
  image: district.slug === 'tarsus' ? '/images/workshop.webp' : '/images/collection.webp',
  imageAlt: 'Tarsus atölyesinin el yapımı terracotta ürünlerini temsil eden konsept görsel',
  blocks: [...district.blocks, {
    title: district.slug === 'tarsus' ? 'Tarsus’taki üretim adresimiz' : `${district.name} talepleri Tarsus atölyemizde değerlendirilir`,
    body: `Üretim ve ziyaret adresimiz ${business.address}. ${district.slug === 'tarsus' ? 'Ziyaret ve ürün teslimi önceden teyit edilir.' : `Bu sayfa ${district.name} ilçesine yönelik tedarik talepleri içindir; ilçede ayrı bir şube veya mağaza bulunduğu anlamına gelmez.`} Ürün tipi, yaklaşık ölçü, adet, mahalle ve tarih aralığını göndererek teklif alabilirsiniz. Stok, özel üretim, minimum adet, paketleme ve sevkiyat koşulları siparişe göre teyit edilir.`,
    link: { href: '/iletisim', label: 'Atölye adresi ve iletişim' },
  }],
  faq: [
    [district.question, district.answer],
    [`${district.name} için çömlek fiyatını nasıl öğrenebilirim?`, `İstediğiniz ürünün görseli veya türü, yaklaşık ölçüsü, adedi ve ${district.name} içindeki teslimat mahallesini paylaşın. Ürün, paketleme ve taşıma kapsamı görüşülerek teklif hazırlanır; sayfada sabit fiyat veya kesin teslim süresi taahhüdü verilmez.`],
  ],
}));

export const serviceAreaHub: PageContent = {
  path: '/mersin', locale: 'tr', kicker: 'Tarsus’tan Mersin’e',
  title: 'Mersin’in ilçelerine çömlek ve terracotta tedariki',
  intro: 'Mersin’in 13 ilçesinden saksı, büyük küp, toptan ve proje taleplerini Tarsus’taki atölyemizde değerlendiriyoruz. İlçenizi seçerek ürün seçimi, teslimat hazırlığı ve teklif için gerekli bilgileri inceleyin.',
  seoTitle: 'Mersin İlçelerine Çömlek & Terracotta Tedariki',
  seoDescription: 'Mersin’in 13 ilçesi için el yapımı çömlek, terracotta saksı ve büyük küp. Tarsus atölyesinden ilçe bazlı ürün, toptan tedarik ve sevkiyat teklifi.',
  image: '/images/hero-terracotta.webp', imageAlt: 'El yapımı terracotta küp ve saksılar — temsili konsept',
  blocks: [
    { title: 'Tek üretim adresi, ilçeye göre değerlendirilen talepler', body: `Atölyemiz ${business.address} adresindedir. İlçe sayfaları ayrı şubeleri değil, ürün ve sevkiyat talebinde bulunabileceğiniz hizmet alanlarını gösterir. Aynı ilçe içindeki farklı adreslerde bile araç erişimi, paketleme ve iç taşıma ihtiyacı değişebilir.`, link: { href: '/iletisim', label: 'Gerçek atölye adresini görün' } },
    { title: 'Ürünü kullanım amacına göre seçin', body: 'Bitki dikilecek saksı, tek başına dekoratif küp ve birden fazla ürün içeren peyzaj grubu farklı ihtiyaçlara cevap verir. Dış çap, iç hacim, ağız açıklığı ve bakım koşullarını birlikte değerlendirin. Görseller konsept amaçlıdır; kesin ölçü ve mevcut ürün seçenekleri teklif öncesinde teyit edilir.', link: { href: '/urunler', label: 'Ürün gruplarını keşfedin' } },
    { title: 'Tedarik talebinizde bulunması gereken bilgiler', body: 'Ürün grubu ve adetle birlikte teslimat ilçesi, mahalle, yaklaşık ölçü ve tercih edilen tarih aralığını paylaşın. Büyük ürünlerde kapı genişliği, kat, merdiven ve araç yaklaşımı da önemlidir. Sevkiyat yöntemi, maliyet ve süre ancak ürün ve adres bilgileri değerlendirildikten sonra netleşir.', bullets: ['Bireysel kullanım: ürün tipi, ölçü ve kullanım alanı.', 'Toptan alım: ürün bazında adet listesi ve teslimat noktası.', 'Mimari proje: yerleşim fotoğrafları, etaplar ve uygulama takvimi.'], link: { href: '/toptan-satis', label: 'Toptan tedarik süreci' } },
  ],
  faq: [
    ['Mersin’in tüm ilçelerinden teklif isteyebilir miyim?', 'Evet. 13 ilçenin tamamından ürün ve tedarik talepleri değerlendirilmektedir. Fiili sevkiyatın uygulanabilirliği, yöntemi, bedeli ve takvimi ürün ölçüsü, adet ve açık adrese göre teyit edilir.'],
    ['Her ilçede mağazanız var mı?', `Hayır. İlçe sayfaları ayrı mağaza adresleri değildir. Üretim ve ziyaret adresimiz ${business.address}. Ziyaretinizi önceden teyit etmenizi rica ederiz.`],
    ['İlçe seçimi teslimat garantisi verir mi?', 'Hayır. İlçe seçimi teklif talebini yönlendirir. Stok, üretim takvimi, paketleme, araç erişimi ve taşıma yöntemi değerlendirilmeden kesin gün veya ücretsiz teslimat sözü verilmez.'],
  ],
};
