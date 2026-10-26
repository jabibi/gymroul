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
    'menu.sound': 'الصوت',
    'menu.history': 'السجل',

    'live.drag': 'اسحب العجلة لتدويرها',
    'live.configure': 'تعديل العجلة',
    'wheel.aria': 'عجلة التمارين: دوّرها بالزر أدناه أو اسحبها',
    'wheel.centerAria': 'أدر العجلة',
    'wheel.center': 'دوّر',
    'wheel.setup': 'تعديل',
    'spin.button': 'أدر العجلة',

    'result.badge': 'تم اختيار التمرين',
    'result.reps': 'تكرار',
    'result.skip': 'تخطي هذا التحدي',
    'result.done': 'تم',
    'result.share': 'مشاركة التحدي',
    'share.text': 'تحدّيي في GymRoulette: {challenge}. أدِر العجلة وتمرّن أنت أيضًا: {url}',
    'share.saved': 'تم تنزيل الصورة',
    'share.failed': 'تعذّرت مشاركة التحدي',
    'share.preparing': 'جارٍ تجهيز الصورة…',
    'share.cancel': 'إلغاء',

    'history.title': 'سجل الجلسة',
    'history.close': 'إغلاق السجل',
    'history.empty': 'لم تسجّل أي تمرين بعد. أدر العجلة للبدء.',
    'history.total': 'التمارين: {n} · إجمالي التكرارات: {reps}',
    'history.clear': 'مسح السجل',
    'history.clearConfirm': 'اضغط مرة أخرى',

    'config.title': 'تعديل العجلة',
    'config.close': 'إغلاق الإعدادات',
    'config.intro': 'فعّل التمارين أو عطّلها، وحدّد نطاق تكرارات كل تمرين، أو أنشئها واحذفها. تُحفظ التغييرات فور إجرائها.',
    'config.reps': 'التكرارات',
    'config.repsMin': 'الأدنى',
    'config.repsMax': 'الأقصى',
    'config.repsRange': '{min}–{max} تكرار',
    'config.editReps': 'تعديل تكرارات {name}',
    'config.repsSave': 'حفظ',
    'config.exercises': 'التمارين',
    'config.exsAll': 'الكل',
    'config.exsNone': 'لا شيء',
    'config.addExercise': 'أضف تمرينًا جديدًا',
    'config.namePlaceholder': 'الاسم (مثال: البلانك)',
    'config.chooseIcon': 'اختر أيقونة',
    'config.searchPlaceholder': 'ابحث: يوغا، كاراتيه، ملاكمة، أثقال…',
    'config.searchAria': 'البحث عن أيقونة',
    'config.noIcons': 'لا توجد أيقونات مطابقة لبحثك',
    'config.save': 'حفظ',
    'config.help': 'مساعدة',
    'config.language': 'اللغة',
    'settings.title': 'الإعدادات',
    'settings.back': 'رجوع',
    'settings.wheel': 'تعديل العجلة',
    'settings.appearance': 'المظهر',
    'appearance.calm': 'داكن',
    'appearance.calmDesc': 'ألوان هادئة على العجلة مع الأخضر الزمردي، على خلفية داكنة.',
    'appearance.classic': 'كلاسيكي',
    'appearance.classicDesc': 'المظهر الأصلي: ألوان زاهية على العجلة وأخضر مكثف.',
    'appearance.light': 'فاتح',
    'appearance.lightDesc': 'الألوان الهادئة نفسها والأخضر الزمردي، على خلفية فاتحة.',
    'appearance.system': 'النظام',
    'appearance.systemDesc': 'يتبدّل بين الداكن والفاتح بحسب جهازك.',
    'whatsnew.title': 'الجديد في الإصدار {version}',
    'whatsnew.templates': 'قوالب التمارين: كارديو وأوزان وعضلات البطن وغيرها. حمّل قالبًا على العجلة أو أنشئ قوالبك.',
    'whatsnew.colors': 'ألوان العجلة تتبع الآن موضع كل قطاع، فلا يجاور اللون نفسه أبدًا.',
    'whatsnew.exercises': '24 تمرينًا جديدًا مترجمة إلى 21 لغة.',
    'whatsnew.templatesTitle': 'جرّب القوالب',
    'whatsnew.templatesText': 'افتح {settings} ثم اختر {templates}.',
    'whatsnew.templatesButton': 'عرض القوالب',
    'whatsnew.close': 'ابدأ',
    'whatsnew.closeAria': 'إغلاق الجديد',
    'config.deleteExercise': 'حذف {name}',
    'config.deleted': 'تم حذف التمرين',
    'config.undo': 'تراجع',
    'exercise.burpee': 'بيربي',
    'exercise.lunge': 'اندفاع',
    'exercise.pushup': 'تمرين الضغط',
    'exercise.squat': 'القرفصاء',
    'exercise.climbers': 'متسلق الجبال',
    'exercise.splitjump': 'قفزات الاندفاع',
    'exercise.jumpingjacks': 'قفز الجاك',
    'exercise.highknees': 'رفع الركبتين',
    'exercise.jumprope': 'نط الحبل',
    'exercise.skaters': 'حركة المتزلج',
    'exercise.buttkicks': 'ركل الأرداف',
    'exercise.dumbbellpress': 'ضغط الدمبل',
    'exercise.gobletsquat': 'قرفصاء الكأس',
    'exercise.kettlebellswing': 'أرجحة الكيتلبل',
    'exercise.dumbbellrow': 'تجديف بالدمبل',
    'exercise.deadlift': 'الرفعة الميتة',
    'exercise.overheadpress': 'ضغط الكتف فوق الرأس',
    'exercise.wallsit': 'الجلوس على الحائط',
    'exercise.glutebridge': 'جسر الأرداف',
    'exercise.deadbug': 'الحشرة الميتة',
    'exercise.birddog': 'الطائر والكلب',
    'exercise.calfraises': 'رفع السمانة',
    'exercise.superman': 'سوبرمان',
    'exercise.heeltouches': 'لمس الكعبين',
    'exercise.tuckups': 'الطي الكامل',
    'exercise.russiantwists': 'التواءات روسية',
    'exercise.crunch': 'الكرنش',
    'exercise.bicyclecrunch': 'كرنش الدراجة',
    'exercise.flutterkicks': 'ركلات الرفرفة',
    'exercise.forearmplank': 'بلانك الساعدين',
    'template.bodyweight': 'وزن الجسم',
    'template.cardio': 'كارديو',
    'template.weights': 'بالأوزان',
    'template.home': 'في المنزل بهدوء',
    'template.abs': 'عضلات البطن',
    'settings.templates': 'القوالب',
    'templates.mine': 'قوالبي',
    'templates.system': 'قوالب النظام',
    'templates.empty': 'ليس لديك قوالب بعد.',
    'templates.new': 'قالب جديد',
    'templates.edit': 'تعديل القالب',
    'templates.name': 'اسم القالب',
    'templates.fromWheel': 'استخدام تمارين العجلة',
    'templates.copy': 'نسخ إلى قوالبي',
    'templates.copyName': '{name} (نسخة)',
    'templates.delete': 'حذف القالب',
    'templates.systemNote': 'قالب النظام لا يمكن تعديله. تحميله يستبدل تمارين عجلتك؛ انسخه لإنشاء نسختك الخاصة.',
    'templates.load': 'تحميل قالب',
    'templates.loadWarn': 'تحميل قالب يستبدل تمارين عجلتك.',
    'templates.loadButton': 'تحميل على العجلة',
    'templates.saved': 'تم حفظ القالب',
    'templates.copied': 'تم نسخ القالب',
    'templates.removeExercise': 'إزالة {name}',
    'error.duplicateTemplate': 'يوجد بالفعل قالب باسم «{name}»',
    'error.maxTemplates': 'الحد الأقصى للقوالب: {max}',
    'error.templateEmpty': 'أضف تمرينًا واحدًا على الأقل إلى القالب',
    'error.templateNameRequired': 'أدخل اسمًا للقالب',

    'error.nameRequired': 'أدخل اسمًا للتمرين',
    'error.iconRequired': 'اختر أيقونة من القائمة',
    'error.duplicateExercise': 'يوجد بالفعل تمرين باسم «{name}»',
    'error.maxExercises': 'الحد الأقصى للتمارين: {max}',
    'error.repRange': 'أدخل رقمًا بين 1 و{max}',
    'error.repMinMax': 'يجب ألا يكون الحد الأدنى أكبر من الحد الأقصى',
    'error.maxLength': 'الحد الأقصى {max} حرفًا',

    'config.commitment': 'التزام الخصوصية',
    'settings.privacy': 'الخصوصية',
    'settings.about': 'حول',
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
