// العربية (الفصحى المعاصرة) — اتجاه الكتابة من اليمين إلى اليسار (RTL).
// Árabe estándar moderno. Se escribe de derecha a izquierda: la app pone dir="rtl" (ver src/i18n/index.js).
// Puntuación árabe (، ؛ ؟), comillas «…», cifras occidentales (0-9) como en el resto de la app y nombres
// propios (GymRoulette) en latino. Sin vocalización (tashkeel), como es habitual en las interfaces.
export default {
  strings: {
    'app.title': 'GymRoulette',

    'header.sound': 'تشغيل الصوت أو إيقافه',
    'header.history': 'فتح السجل',
    'header.settings': 'فتح الإعدادات',

    'live.drag': 'اسحب العجلة لتدويرها',
    'live.configure': 'اضبط العجلة',
    'wheel.aria': 'عجلة التمارين: دوّرها بالزر أدناه أو اسحبها',
    'wheel.centerAria': 'أدر العجلة',
    'wheel.center': 'دوّر',
    'wheel.setup': 'الإعداد',
    'spin.button': 'أدر العجلة!',

    'result.badge': 'تم اختيار التمرين!',
    'result.reps': 'تكرار',
    'result.skip': 'تخطي هذا التحدي',
    'result.done': 'تم!',
    'result.share': 'مشاركة التحدي',
    'share.text': 'تحدّيي في GymRoulette: {challenge}! أدِر العجلة وتمرّن أنت أيضًا: {url}',
    'share.saved': 'تم تنزيل الصورة',
    'share.failed': 'تعذّرت مشاركة التحدي',
    'share.preparing': 'جارٍ تجهيز الصورة…',
    'share.cancel': 'إلغاء',

    'history.title': 'سجل الجلسة',
    'history.close': 'إغلاق السجل',
    'history.empty': 'لم تسجّل أي تمرين بعد. أدر العجلة!',
    'history.total': 'التمارين: {n} · إجمالي التكرارات: {reps}',
    'history.clear': 'مسح السجل',
    'history.clearConfirm': 'اضغط مرة أخرى',

    'config.title': 'إعدادات العجلة',
    'config.close': 'إغلاق الإعدادات',
    'config.intro': 'فعّل التمارين أو عطّلها، وحدّد نطاق تكرارات كل تمرين، أو أنشئها واحذفها:',
    'config.reps': 'التكرارات',
    'config.repsMin': 'الأدنى',
    'config.repsMax': 'الأقصى',
    'config.repsRange': '{min}–{max} تكرار',
    'config.editReps': 'تعديل تكرارات {name}',
    'config.repsSave': 'حفظ',
    'config.add': 'إضافة',
    'config.exercises': 'التمارين',
    'config.exsAll': 'الكل',
    'config.exsNone': 'لا شيء',
    'config.addExercise': 'أضف تمرينًا جديدًا:',
    'config.namePlaceholder': 'الاسم (مثال: البلانك)',
    'config.chooseIcon': 'اختر أيقونة',
    'config.create': 'إنشاء',
    'config.searchPlaceholder': 'ابحث: يوغا، كاراتيه، ملاكمة، أثقال…',
    'config.searchAria': 'البحث عن أيقونة',
    'config.noIcons': 'لا توجد أيقونات مطابقة لبحثك',
    'config.privacy': 'سياسة الخصوصية',
    'config.credits': 'شكر وتقدير',
    'config.apply': 'حفظ التغييرات',
    'config.language': 'اللغة',
    'settings.title': 'الإعدادات',
    'settings.back': 'رجوع',
    'settings.wheel': 'إعداد العجلة',
    'settings.appearance': 'المظهر',
    'appearance.calm': 'ناعم',
    'appearance.calmDesc': 'ألوان هادئة على العجلة وأخضر زمردي.',
    'appearance.classic': 'كلاسيكي',
    'appearance.classicDesc': 'المظهر الأصلي: ألوان زاهية على العجلة وأخضر مكثف.',
    'config.deleteExercise': 'حذف {name}',
    'exercise.burpee': 'بيربي',
    'exercise.lunge': 'اندفاع',
    'exercise.pushup': 'تمرين الضغط',
    'exercise.squat': 'القرفصاء',
    'exercise.climbers': 'متسلق الجبال',
    'exercise.splitjump': 'قفزات الاندفاع',

    'error.nameRequired': 'أدخل اسمًا للتمرين',
    'error.iconRequired': 'اختر أيقونة من القائمة',
    'error.duplicateExercise': 'يوجد بالفعل تمرين باسم «{name}»',
    'error.maxExercises': 'الحد الأقصى للتمارين: {max}',
    'error.repRange': 'أدخل رقمًا بين 1 و{max}',
    'error.repMinMax': 'يجب ألا يكون الحد الأدنى أكبر من الحد الأقصى',
    'error.maxLength': 'الحد الأقصى {max} حرفًا',

    'config.commitment': 'التزام الخصوصية',
    'commitment.intro': 'GymRoulette برنامج أخلاقي وسيادي: ينفّذ ما تطلبه منه ولا شيء غير ذلك.',
    'commitment.offline.title': 'بلا اتصال بنسبة 100%',
    'commitment.offline.text': 'يعمل دون اتصال بالإنترنت. التطبيق لا يطلب حتى إذن الإنترنت.',
    'commitment.noTrackers.title': 'بلا متتبّعات',
    'commitment.noTrackers.text': 'بلا تحليلات، ولا مكتبات تتبّع، ولا ملفات شخصية.',
    'commitment.noAds.title': 'بلا إعلانات',
    'commitment.noAds.text': 'بلا إعلانات ولا شبكات إعلانية.',
    'commitment.yourData.title': 'بياناتك ملكك',
    'commitment.yourData.text': 'كل ما تنشئه يبقى على جهازك. وإذا حذفت التطبيق أو بياناته فلا يبقى أي أثر في السحابة.',
    'commitment.noScripts.title': 'بلا سكربتات خارجية',
    'commitment.noScripts.text': 'كل الشيفرة داخل التطبيق. لا يُحمَّل شيء من خوادم أخرى.',
    'commitment.policy': 'اقرأ سياسة الخصوصية كاملة',

    'doc.privacy': 'سياسة الخصوصية',
    'doc.credits': 'شكر وتراخيص',
    'doc.close': 'إغلاق',
  },

  groups: {
    strength: 'القوة والأثقال',
    calisthenics: 'تمارين وزن الجسم والجمباز',
    cardio: 'الكارديو والتحمّل',
    martial: 'الفنون القتالية والنزال',
    mindbody: 'العقل والجسد',
    sports: 'الرياضات',
    outdoor: 'الماء والجبل والهواء الطلق',
    challenges: 'العوائق والتحديات',
  },

  icons: `
dumbbell | دمبل | أثقال نادي كمال أجسام قوة
kettlebell | كيتلبل | كرة حديدية روسية كروس فيت أرجحة
weight-lifter | رفع الأثقال | بار ضغط كروس فيت خطف نثر
lift-up | رفع الثقل | ضغط الكتف عسكري بار أعلى
lift-down | خفض الثقل | رفعة ميتة سكوات بار أسفل
weight | ثقل | قرص حمل كيلوغرام
bench | مقعد | ضغط الصدر تجديف
anvil | سندان | قوة طاقة رجل خارق
hammer | مطرقة | مطرقة ثقيلة كروس فيت ضرب إطار
tire | إطار | قلب الإطار كروس فيت رجل خارق
sandbag | كيس رمل | هايركس اندفاع حمل كيس
arm-flex | عضلة ذات الرأسين | ذراعان بايسبس عضلة قوة
arm | ذراع | ترايسبس كتفان متوازي
leg | الساقان | سكوات اندفاع أرداف فخذان
boulder | صخرة كبيرة | حجر أطلس رجل خارق
rock | حجر | حجر أطلس سباق عوائق حمل
gymnastics | جمباز | كاليستنكس بهلوانيات
muscle-up | موسكل أب | عقلة بار كاليستنكس
pull | سحب | عقلة تجديف كاليستنكس
pushup | ضغط | ضغط أرضي صدر ترايسبس كاليستنكس متوازي
plank | بلانك | جذع بطن ثبات أرضي كاليستنكس
situp | تمرين البطن | بطن جذع أرضي كاليستنكس
burpee | بيربي | قفز أرضي هيت كروس فيت كارديو
climbers | متسلق الجبال | ركبتان كارديو جذع أرضي هيت كروس فيت
squat | سكوات | قرفصاء ساقان أرداف فخذان كاليستنكس
push | دفع | جدار مزلقة دفع
cartwheel | عجلة بهلوانية | بهلوانيات جمباز
handsup | رفع الذراعين | تمدد ضغط الكتف
balance | توازن | وقوف على اليدين بلانك جذع
jump-rope | حبل القفز | نط حبل كروس فيت
jump | قفز | قفز على الصندوق بيربي قفز طويل بليومترك
ladder | سلم | رشاقة تسلق سباق عوائق
stairs | درج | تسلق درجات كارديو
rope | حبل | حبل المعركة تسلق كروس فيت سباق عوائق
run | جري | ركض هرولة سباق
run-fast | جري سريع | عدو سرعة متسلق الجبال
sprint | عدو | سرعة فترات ألعاب قوى
walk | مشي | اندفاع مسيرة تنزه
hiking | مشي جبلي | جبل رحلة مشي
sneaker | حذاء رياضي | جري حذاء
footprint | آثار الأقدام | خطوات مسيرة مشي
bike | دراجة | ركوب الدراجات سبينينغ كارديو
bike-fast | دراجة سريعة | دراجة هوائية سرعة
rowing | تجديف | جهاز تجديف هايركس كروس فيت
skierg | التزلج الريفي | سكي هايركس تزلج جهاز
heart-pulse | نبض القلب | كارديو قلب صحة
fire | نار | بيربي مكثف حرق سعرات هيت
bolt | برق | قوة انفجارية طاقة سرعة
timer | ساعة إيقاف | وقت ثبات بلانك
hourglass | مؤقت | تاباتا فترات راحة
infinity | لانهاية | أمراب بلا توقف تحمل
repeat | مجموعات | تكرارات دائرة جولات
karate | كاراتيه | كيمونو دوجو فنون قتالية جودو تايكوندو
boxing | ملاكمة | قفاز مبارزة كيك بوكسينغ
mma | فنون قتالية مختلطة | إم إم إيه قتال نزال
high-kick | ركلة عالية | تايكوندو كيك بوكسينغ كاراتيه ركلات
kick | ركلة | ضرب كيك بوكسينغ مواي تاي
punch | لكمة | ضربة ملاكمة
punching-bag | كيس اللكم | تدريب ضرب ملاكمة
fist | قبضة | كونغ فو كاراتيه قوة
ninja | نينجا | فنون قتالية نينجوتسو رشاقة
sword | سيوف | كيندو مبارزة قتال
fencing | مبارزة بالسيف | سيف رمح
shield | دفاع | دفاع عن النفس حماية
yoga | يوغا | آسانا تمدد مرونة بيلاتس
meditation | تأمل | تنفس يقظة استرخاء
lotus | لوتس | يوغا تأمل زن
yin-yang | يين يانغ | تاي تشي توازن تشي غونغ
spa | استرخاء | بيلاتس تمدد تعاف عافية
flower | زهرة | بيلاتس يوغا هدوء
tortoise | سلحفاة | بطء تاي تشي تحكم إيقاع
hand-heart | عافية | صحة رعاية تنفس
soccer | كرة القدم | كرة قدم
basketball | كرة السلة | سلة كرة جدار
volleyball | كرة الطائرة | كرة طائرة
tennis | تنس | مضرب كرة بادل
table-tennis | تنس الطاولة | بينغ بونغ
badminton | ريشة طائرة | مضرب كرة ريشة
rugby | رغبي | كرة
football | كرة القدم الأمريكية | كرة
handball | كرة اليد | كرة
baseball | بيسبول | مضرب كرة
golf | غولف | مضرب كرة
hockey | هوكي | عصا قرص
bowling | بولينغ | كرة
archery | رماية | هدف تصويب دقة
target | هدف | غاية دقة تحد
skate | لوح التزلج | سكيت سكوتر
roller-skate | تزلج بالعجلات | زلاجات
swim | سباحة | مسبح زحف
pool | مسبح | ماء سباحة
waves | أمواج | ماء بحر
surf | ركوب الأمواج | أمواج لوح
kayak | كاياك | قارب مجداف تجديف
sailing | إبحار | قارب
diving | غوص | غطس سكوبا
climbing | تسلق | صخرة سباق عوائق
terrain | جبل | مسار تلال مشي
ski | تزلج | ثلج جبال
snowboard | تزلج على الثلج | ثلج لوح
sled | مزلقة | دفع سحب هايركس جر
horse | ركوب الخيل | حصان فروسية
fence | سياج | عائق قفز جدار
flag | خط النهاية | سباق هايركس عوائق
trophy | كأس | تحد بطل خاص
medal | ميدالية | إنجاز جائزة
dice | نرد | عشوائي حظ مفاجأة
star | نجمة | مفضل خاص
rocket | صاروخ | انفجار إطلاق قوة
tractor | جرار | جر إطار رجل خارق
`,
};
