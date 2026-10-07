// Türkçe (Türkiye, "sen" ile samimi hitap)
export default {
  strings: {
    'app.title': 'GymRoulette - Gasteiz Trainning',

    'header.sound': 'Sesi aç veya kapat',
    'header.history': 'Geçmişi aç',
    'header.settings': 'Ayarları aç',

    'live.drag': 'Çevirmek için çarkı sürükle',
    'live.configure': 'Çarkı ayarla',
    'wheel.aria': 'Egzersiz çarkı: aşağıdaki düğmeyle çevir ya da sürükleyerek çevir',
    'wheel.centerAria': 'Çarkı çevir',
    'wheel.center': 'ÇEVİR',
    'wheel.setup': 'Ayarla',
    'spin.button': 'ÇARKI ÇEVİR!',

    'result.badge': 'EGZERSİZ SEÇİLDİ!',
    'result.desc': 'Harika bir meydan okuma! Kusursuz formla {reps} tekrar {exercise} yap.',
    'result.skip': 'Bu meydan okumayı geç',
    'result.done': 'Tamam!',

    'history.title': 'Antrenman geçmişi',
    'history.close': 'Geçmişi kapat',
    'history.empty': 'Henüz kayıtlı egzersiz yok. Çarkı çevir!',
    'history.total': 'Bu antrenmanda tamamlanan: {n}',
    'history.done': 'Tamam!',
    'history.clear': 'Geçmişi temizle',

    'config.title': 'Çark ayarları',
    'config.close': 'Ayarları kapat',
    'config.intro': 'Tekrarları ve egzersizleri aç ya da kapat, yenilerini oluştur veya sil:',
    'config.reps': 'Tekrarlar',
    'config.repsAll': 'Tümü',
    'config.repsNone': 'Hiçbiri',
    'config.repPlaceholder': 'Örn. 15',
    'config.add': 'Ekle',
    'config.exercises': 'Egzersizler',
    'config.exsAll': 'Tümü',
    'config.exsNone': 'Hiçbiri',
    'config.addExercise': 'Yeni egzersiz ekle:',
    'config.namePlaceholder': 'Ad (örn. Plank)',
    'config.shortPlaceholder': 'Kısa ad',
    'config.chooseIcon': 'Simge seç',
    'config.create': 'Oluştur',
    'config.searchPlaceholder': 'Ara: yoga, hyrox, boks, ağırlık…',
    'config.searchAria': 'Simge ara',
    'config.noIcons': 'Aramana uyan simge yok',
    'config.privacy': 'Gizlilik politikası',
    'config.credits': 'Katkıda bulunanlar',
    'config.apply': 'Değişiklikleri kaydet',
    'config.language': 'Dil',
    'config.repLabel': '{n} tekrar',
    'config.deleteRep': '{n} tekrarı sil',
    'config.deleteExercise': '{name} egzersizini sil',

    'error.nameRequired': 'Egzersiz için bir ad gir',
    'error.iconRequired': 'Listeden bir simge seç',
    'error.duplicateExercise': '“{name}” adlı bir egzersiz zaten var',
    'error.maxExercises': 'En fazla {max} egzersiz',
    'error.repRange': '1 ile {max} arasında bir sayı gir',
    'error.duplicateRep': '{n} tekrar zaten var',
    'error.maxReps': 'En fazla {max} tekrar seçeneği',

    'intro.skip': 'Geç',
    'intro.next': 'İleri',
    'intro.start': 'Başla',
    'intro.steps': 'Tanıtım',
    'intro.how.title': 'Çark nasıl çalışır?',
    'intro.how.spin': '“ÇARKI ÇEVİR!” düğmesine dokun ya da çarkı parmağınla fırlat.',
    'intro.how.result': 'Çark durunca bir meydan okuma alırsın: bir egzersizin birkaç tekrarı.',
    'intro.how.done': 'Tamamlandı olarak işaretle ya da geç, sonra yeniden çevir.',
    'intro.private.title': 'Çevrimdışı ve gizli',
    'intro.private.offline': 'Tamamen çevrimdışı çalışır.',
    'intro.private.noAds': 'Reklam yok.',
    'intro.private.noTrackers': 'İzleyici yok: cihazından hiçbir şey çıkmaz.',
    'intro.private.noCookies': 'Gereksiz çerez yok.',
    'intro.private.noLocation': 'Konumuna erişim yok.',

    'doc.privacy': 'Gizlilik politikası',
    'doc.credits': 'Katkıda bulunanlar ve lisanslar',
    'doc.close': 'Kapat',
  },

  groups: {
    strength: 'Kuvvet ve ağırlıklar',
    calisthenics: 'Calisthenics ve jimnastik',
    cardio: 'Kardiyo ve dayanıklılık',
    martial: 'Dövüş sanatları ve dövüş sporları',
    mindbody: 'Zihin ve beden',
    sports: 'Sporlar',
    outdoor: 'Su, dağ ve doğa',
    challenges: 'Engeller ve meydan okumalar',
  },

  icons: `
dumbbell | Dumbbell | ağırlık halter dambıl spor salonu vücut geliştirme kuvvet gym weights
kettlebell | Kettlebell | rus ağırlığı top ağırlık crossfit sallama swing
weight-lifter | Halter | barbell bar şınav crossfit snatch clean ağırlık kaldırma
lift-up | Ağırlık kaldır | omuz press baş üstü barbell yukarı itme
lift-down | Ağırlık indir | deadlift ölü kaldırış squat çömelme barbell indirme
weight | Ağırlık | plaka yük kilo disk
bench | Bench | sehpa bench press göğüs press kürek bank
anvil | Örs | kuvvet güç strongman
hammer | Çekiç | balyoz crossfit vurma lastik
tire | Lastik | lastik çevirme crossfit strongman
sandbag | Kum torbası | hyrox hamle lunge taşıma çuval
arm-flex | Biceps | kol pazı curl kas kuvvet
arm | Kol | triceps omuz dips
leg | Bacaklar | squat çömelme hamle lunge kalça quadriceps
boulder | Kaya | taş atlas strongman kaya parçası
rock | Taş | atlas taşı ocr taşıma
gymnastics | Jimnastik | calisthenics akrobasi
muscle-up | Muscle-up | barfiks bar calisthenics mekik çekme
pull | Çekme | barfiks kürek çekişi calisthenics
pushup | Şınav | zemin göğüs triceps calisthenics dips pushup
plank | Plank | karın core izometrik zemin calisthenics
situp | Mekik | crunch karın core zemin calisthenics sit-up
burpee | Burpee | zıplama zemin hiit crossfit kardiyo
climbers | Mountain climbers | dağcı dizler kardiyo core zemin hiit crossfit
squat | Squat | çömelme bacak kalça quadriceps calisthenics
push | İtme | duvar kızak itiş
cartwheel | Takla | akrobasi jimnastik
handsup | Eller yukarı | esneme germe baş üstü
balance | Denge | amut plank core
jump-rope | İp atlama | ip skipping double unders crossfit
jump | Sıçrama | kutu sıçraması box jump burpee uzun atlama plyometrik zıplama
ladder | Merdiven | çeviklik koordinasyon merdiveni tırmanma ocr
stairs | Basamaklar | merdiven tırmanma kardiyo
rope | Halat | battle rope savaş ipi tırmanma ip crossfit ocr
run | Koşu | koşmak jogging yarış
run-fast | Hızlı koşu | sprint hız mountain climbers
sprint | Sprint | hız aralıklar atletizm
walk | Yürüyüş | hamle lunge yürümek tempo
hiking | Doğa yürüyüşü | dağ trekking yürüyüş hiking
sneaker | Spor ayakkabı | koşu ayakkabısı sneakers
footprint | Ayak izleri | adımlar yürüyüş yürümek
bike | Bisiklet | bisiklete binmek spinning kardiyo
bike-fast | Hızlı pedal | assault bike hava bisikleti hız
rowing | Kürek | kürek ergometresi ergometre hyrox crossfit
skierg | Kayak ergometresi | skierg kros kayak hyrox ergometre
heart-pulse | Nabız | kalp atışı kardiyo kalp sağlık
fire | Ateş | burpee yoğun yakmak kalori hiit
bolt | Şimşek | patlayıcı güç enerji hızlı
timer | Kronometre | süre zaman izometrik plank emom
hourglass | Zamanlayıcı | kum saati tabata aralık dinlenme
infinity | Sonsuzluk | amrap durmadan dayanıklılık
repeat | Setler | tekrar devre tur turlar
karate | Karate | kimono dojo dövüş sanatları judo taekwondo
boxing | Boks | eldiven sparing kickboks boxing
mma | MMA | karma dövüş sanatları dövüş
high-kick | Yüksek tekme | taekwondo kickboks karate tekmeler
kick | Tekme | vuruş kickboks muay thai
punch | Yumruk | vuruş boks jab direkt
punching-bag | Boks torbası | vuruş antrenman boks kum torbası
fist | Yumruk darbesi | kung fu karate kuvvet
ninja | Ninja | dövüş sanatları ninjutsu çeviklik
sword | Kılıçlar | kılıç kendo eskrim dövüş
fencing | Eskrim | kılıç flöre epe kılıç
shield | Savunma | kalkan self defense kendini savunma koruma
yoga | Yoga | asana esneme esneklik pilates
meditation | Meditasyon | nefes farkındalık gevşeme mindfulness
lotus | Lotus | yoga meditasyon zen
yin-yang | Yin yang | tai chi taichi denge qigong
spa | Gevşeme | pilates esneme toparlanma wellness dinlenme
flower | Çiçek | pilates yoga sakinlik
tortoise | Kaplumbağa | yavaş tai chi kontrol tempo
hand-heart | İyi oluş | sağlık bakım nefes
soccer | Futbol | top soccer
basketball | Basketbol | pota top wall ball
volleyball | Voleybol | top file
tennis | Tenis | raket top padel
table-tennis | Masa tenisi | pinpon ping pong
badminton | Badminton | raket tüylü top
rugby | Ragbi | top rugby
football | Amerikan futbolu | top american football
handball | Hentbol | top
baseball | Beyzbol | sopa top
golf | Golf | sopa top
hockey | Hokey | sopa disk buz hokeyi
bowling | Bowling | top
archery | Okçuluk | hedef nişan hassasiyet yay
target | Hedef | amaç hassasiyet meydan okuma
skate | Kaykay | skateboard scooter paten
roller-skate | Paten | tekerlekli paten rollerblade
swim | Yüzme | havuz kulaç
pool | Havuz | su yüzme aqua
waves | Dalgalar | su deniz aqua
surf | Sörf | dalga tahta
kayak | Kano | kayak kürek çekmek
sailing | Yelken | tekne yelkenli
diving | Dalış | tüplü serbest dalış şnorkel
climbing | Tırmanış | kaya bouldering ocr
terrain | Dağ | patika tepe yürüyüş trail
ski | Kayak | kar alp disiplini
snowboard | Snowboard | kar tahta
sled | Kızak | kızak itme çekme hyrox sürükleme
horse | Binicilik | at atçılık
fence | Çit | engel ocr atlama duvar
flag | Bitiş | bitiş çizgisi yarış ocr hyrox bayrak
trophy | Kupa | meydan okuma özel şampiyon
medal | Madalya | başarı ödül
dice | Zar | rastgele şans sürpriz
star | Yıldız | favori özel
rocket | Roket | patlayıcı fırlatma güç
tractor | Traktör | sürükleme lastik strongman
`,
};
