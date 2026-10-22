// Créditos y licencias de terceros. Mismo formato que privacy.mjs.
const mdi = '<a href="https://github.com/Templarian/MaterialDesign/blob/master/LICENSE" target="_blank" rel="noopener">Apache 2.0</a>';
const mdiSite = '<a href="https://pictogrammers.com/library/mdi/" target="_blank" rel="noopener">pictogrammers.com</a>';
const gameSite = '<a href="https://game-icons.net" target="_blank" rel="noopener">game-icons.net</a>';
const ccBy3 = '<a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="noopener">CC BY 3.0</a>';
const ccBy4 = '<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>';
const faSite = '<a href="https://fontawesome.com/license/free" target="_blank" rel="noopener">fontawesome.com/license/free</a>';

/** «Versión» en cada idioma: el número sale de package.json al generar la página (scripts/build-legal.mjs). */
export const versionLabel = {
  en: 'Version', es: 'Versión', eu: 'Bertsioa', gl: 'Versión', ca: 'Versió', fr: 'Version', 'pt-BR': 'Versão', 'pt-PT': 'Versão',
  de: 'Version', it: 'Versione', pl: 'Wersja', ar: 'الإصدار', hi: 'संस्करण', tr: 'Sürüm', nl: 'Versie', ja: 'バージョン', ru: 'Версия',
};

export default {
  en: { title: 'Credits and licenses - GymRoulette', blocks: [
    ['h1', 'Credits and licenses'],
    ['p', 'GymRoulette uses the following third-party resources. Thanks to their authors.'],
    ['h2', 'Exercise icons'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), ${mdi} license. ${mdiSite}`,
      '<strong>GymRoulette\'s own pictograms</strong> (push-ups, plank, sit-ups, burpee, mountain climbers and squat).',
      `<strong>Game Icons</strong> (${gameSite}), icons by Lorc, Delapouite and other contributors, ${ccBy3} license. Some icons have been recolored and resized.`,
    ]],
    ['h2', 'Interface icons'],
    ['ul', [`<strong>Font Awesome Free</strong>, icons under ${ccBy4}, fonts under SIL OFL 1.1 and code under MIT. ${faSite}`]],
    ['h2', 'Typography'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, SIL Open Font License 1.1.']],
  ] },
  es: { title: 'Créditos y licencias - GymRoulette', blocks: [
    ['h1', 'Créditos y licencias'],
    ['p', 'GymRoulette usa los siguientes recursos de terceros. Gracias a sus autores.'],
    ['h2', 'Iconos de los ejercicios'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), licencia ${mdi}. ${mdiSite}`,
      '<strong>Pictogramas propios</strong> de GymRoulette (flexiones, plancha, abdominales, burpee, mountain climbers y sentadilla).',
      `<strong>Game Icons</strong> (${gameSite}), iconos de Lorc, Delapouite y otros colaboradores, licencia ${ccBy3}. Algunos iconos se han recoloreado y redimensionado.`,
    ]],
    ['h2', 'Iconos de la interfaz'],
    ['ul', [`<strong>Font Awesome Free</strong>, iconos bajo ${ccBy4}, fuentes bajo SIL OFL 1.1 y código bajo MIT. ${faSite}`]],
    ['h2', 'Tipografía'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, licencia SIL Open Font License 1.1.']],
  ] },
  eu: { title: 'Kredituak eta lizentziak - GymRoulette', blocks: [
    ['h1', 'Kredituak eta lizentziak'],
    ['p', 'GymRoulette-k hirugarrenen ondorengo baliabideak erabiltzen ditu. Eskerrik asko egileei.'],
    ['h2', 'Ariketen ikonoak'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), ${mdi} lizentzia. ${mdiSite}`,
      '<strong>GymRoulette-ren piktograma propioak</strong> (flexioak, plantxa, abdominalak, burpee, mountain climbers eta squat).',
      `<strong>Game Icons</strong> (${gameSite}), Lorc, Delapouite eta beste kolaboratzaile batzuen ikonoak, ${ccBy3} lizentzia. Ikono batzuen kolorea eta tamaina aldatu dira.`,
    ]],
    ['h2', 'Interfazearen ikonoak'],
    ['ul', [`<strong>Font Awesome Free</strong>, ikonoak ${ccBy4} lizentziapean, letra-tipoak SIL OFL 1.1 lizentziapean eta kodea MIT lizentziapean. ${faSite}`]],
    ['h2', 'Tipografia'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, SIL Open Font License 1.1 lizentzia.']],
  ] },
  gl: { title: 'Créditos e licenzas - GymRoulette', blocks: [
    ['h1', 'Créditos e licenzas'],
    ['p', 'GymRoulette usa os seguintes recursos de terceiros. Grazas aos seus autores.'],
    ['h2', 'Iconas dos exercicios'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), licenza ${mdi}. ${mdiSite}`,
      '<strong>Pictogramas propios</strong> de GymRoulette (flexións, prancha, abdominais, burpee, mountain climbers e agachamento).',
      `<strong>Game Icons</strong> (${gameSite}), iconas de Lorc, Delapouite e outros colaboradores, licenza ${ccBy3}. Algunhas iconas recoloreáronse e redimensionáronse.`,
    ]],
    ['h2', 'Iconas da interface'],
    ['ul', [`<strong>Font Awesome Free</strong>, iconas baixo ${ccBy4}, fontes baixo SIL OFL 1.1 e código baixo MIT. ${faSite}`]],
    ['h2', 'Tipografía'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, licenza SIL Open Font License 1.1.']],
  ] },
  ca: { title: 'Crèdits i llicències - GymRoulette', blocks: [
    ['h1', 'Crèdits i llicències'],
    ['p', 'GymRoulette utilitza els recursos de tercers següents. Gràcies als seus autors.'],
    ['h2', 'Icones dels exercicis'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), llicència ${mdi}. ${mdiSite}`,
      '<strong>Pictogrames propis</strong> de GymRoulette (flexions, planxa, abdominals, burpee, mountain climbers i esquat).',
      `<strong>Game Icons</strong> (${gameSite}), icones de Lorc, Delapouite i altres col·laboradors, llicència ${ccBy3}. Algunes icones s'han recolorit i redimensionat.`,
    ]],
    ['h2', 'Icones de la interfície'],
    ['ul', [`<strong>Font Awesome Free</strong>, icones sota ${ccBy4}, tipus de lletra sota SIL OFL 1.1 i codi sota MIT. ${faSite}`]],
    ['h2', 'Tipografia'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, llicència SIL Open Font License 1.1.']],
  ] },
  fr: { title: 'Crédits et licences - GymRoulette', blocks: [
    ['h1', 'Crédits et licences'],
    ['p', 'GymRoulette utilise les ressources de tiers suivantes. Merci à leurs auteurs.'],
    ['h2', 'Icônes des exercices'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), licence ${mdi}. ${mdiSite}`,
      '<strong>Pictogrammes propres</strong> de GymRoulette (pompes, gainage, abdominaux, burpee, mountain climbers et squat).',
      `<strong>Game Icons</strong> (${gameSite}), icônes de Lorc, Delapouite et d'autres contributeurs, licence ${ccBy3}. Certaines icônes ont été recolorées et redimensionnées.`,
    ]],
    ['h2', 'Icônes de l\'interface'],
    ['ul', [`<strong>Font Awesome Free</strong>, icônes sous ${ccBy4}, polices sous SIL OFL 1.1 et code sous MIT. ${faSite}`]],
    ['h2', 'Typographie'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, licence SIL Open Font License 1.1.']],
  ] },
  'pt-BR': { title: 'Créditos e licenças - GymRoulette', blocks: [
    ['h1', 'Créditos e licenças'],
    ['p', 'O GymRoulette usa os seguintes recursos de terceiros. Obrigado aos autores.'],
    ['h2', 'Ícones dos exercícios'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), licença ${mdi}. ${mdiSite}`,
      '<strong>Pictogramas próprios</strong> do GymRoulette (flexões, prancha, abdominais, burpee, mountain climbers e agachamento).',
      `<strong>Game Icons</strong> (${gameSite}), ícones de Lorc, Delapouite e outros colaboradores, licença ${ccBy3}. Alguns ícones foram recoloridos e redimensionados.`,
    ]],
    ['h2', 'Ícones da interface'],
    ['ul', [`<strong>Font Awesome Free</strong>, ícones sob ${ccBy4}, fontes sob SIL OFL 1.1 e código sob MIT. ${faSite}`]],
    ['h2', 'Tipografia'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, licença SIL Open Font License 1.1.']],
  ] },
  'pt-PT': { title: 'Créditos e licenças - GymRoulette', blocks: [
    ['h1', 'Créditos e licenças'],
    ['p', 'O GymRoulette utiliza os seguintes recursos de terceiros. Obrigado aos autores.'],
    ['h2', 'Ícones dos exercícios'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), licença ${mdi}. ${mdiSite}`,
      '<strong>Pictogramas próprios</strong> do GymRoulette (flexões, prancha, abdominais, burpee, mountain climbers e agachamento).',
      `<strong>Game Icons</strong> (${gameSite}), ícones de Lorc, Delapouite e outros colaboradores, licença ${ccBy3}. Alguns ícones foram recoloridos e redimensionados.`,
    ]],
    ['h2', 'Ícones da interface'],
    ['ul', [`<strong>Font Awesome Free</strong>, ícones sob ${ccBy4}, tipos de letra sob SIL OFL 1.1 e código sob MIT. ${faSite}`]],
    ['h2', 'Tipografia'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, licença SIL Open Font License 1.1.']],
  ] },
  de: { title: 'Danksagungen und Lizenzen - GymRoulette', blocks: [
    ['h1', 'Danksagungen und Lizenzen'],
    ['p', 'GymRoulette verwendet die folgenden Ressourcen von Dritten. Vielen Dank an die Urheber.'],
    ['h2', 'Symbole der Übungen'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), Lizenz ${mdi}. ${mdiSite}`,
      '<strong>Eigene Piktogramme</strong> von GymRoulette (Liegestütze, Unterarmstütz, Sit-ups, Burpee, Mountain Climbers und Kniebeuge).',
      `<strong>Game Icons</strong> (${gameSite}), Symbole von Lorc, Delapouite und weiteren Mitwirkenden, Lizenz ${ccBy3}. Einige Symbole wurden umgefärbt und in der Größe angepasst.`,
    ]],
    ['h2', 'Symbole der Oberfläche'],
    ['ul', [`<strong>Font Awesome Free</strong>, Symbole unter ${ccBy4}, Schriften unter SIL OFL 1.1 und Code unter MIT. ${faSite}`]],
    ['h2', 'Typografie'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, Lizenz SIL Open Font License 1.1.']],
  ] },
  it: { title: 'Crediti e licenze - GymRoulette', blocks: [
    ['h1', 'Crediti e licenze'],
    ['p', 'GymRoulette utilizza le seguenti risorse di terze parti. Grazie ai loro autori.'],
    ['h2', 'Icone degli esercizi'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), licenza ${mdi}. ${mdiSite}`,
      '<strong>Pittogrammi propri</strong> di GymRoulette (flessioni, plank, addominali, burpee, mountain climbers e squat).',
      `<strong>Game Icons</strong> (${gameSite}), icone di Lorc, Delapouite e altri collaboratori, licenza ${ccBy3}. Alcune icone sono state ricolorate e ridimensionate.`,
    ]],
    ['h2', 'Icone dell\'interfaccia'],
    ['ul', [`<strong>Font Awesome Free</strong>, icone con licenza ${ccBy4}, font con licenza SIL OFL 1.1 e codice con licenza MIT. ${faSite}`]],
    ['h2', 'Tipografia'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, licenza SIL Open Font License 1.1.']],
  ] },
  pl: { title: 'Podziękowania i licencje - GymRoulette', blocks: [
    ['h1', 'Podziękowania i licencje'],
    ['p', 'GymRoulette korzysta z następujących zasobów podmiotów trzecich. Dziękujemy ich autorom.'],
    ['h2', 'Ikony ćwiczeń'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), licencja ${mdi}. ${mdiSite}`,
      '<strong>Własne piktogramy GymRoulette</strong> (pompki, deska, brzuszki, burpee, wspinaczka w podporze i przysiad).',
      `<strong>Game Icons</strong> (${gameSite}), ikony autorstwa Lorc, Delapouite i innych współtwórców, licencja ${ccBy3}. Niektóre ikony zostały przekolorowane i zmieniono ich rozmiar.`,
    ]],
    ['h2', 'Ikony interfejsu'],
    ['ul', [`<strong>Font Awesome Free</strong>, ikony na licencji ${ccBy4}, czcionki na licencji SIL OFL 1.1, a kod na licencji MIT. ${faSite}`]],
    ['h2', 'Typografia'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, licencja SIL Open Font License 1.1.']],
  ] },

  ar: { title: 'الشكر والتراخيص - GymRoulette', blocks: [
    ['h1', 'الشكر والتراخيص'],
    ['p', 'يستخدم GymRoulette الموارد التالية من جهات خارجية. شكرًا لأصحابها.'],
    ['h2', 'أيقونات التمارين'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers)، بترخيص ${mdi}. ${mdiSite}`,
      '<strong>الرموز التصويرية الخاصة بـ GymRoulette</strong> (تمارين الضغط، والبلانك، وتمارين البطن، وتمرين بيربي، وتمرين متسلق الجبال، والقرفصاء).',
      `<strong>Game Icons</strong> (${gameSite})، أيقونات من Lorc وDelapouite ومساهمين آخرين، بترخيص ${ccBy3}. أُعيد تلوين بعض الأيقونات وتغيير حجمها.`,
    ]],
    ['h2', 'أيقونات الواجهة'],
    ['ul', [`<strong>Font Awesome Free</strong>، الأيقونات بترخيص ${ccBy4}، والخطوط بترخيص SIL OFL 1.1، والشيفرة البرمجية بترخيص MIT. ${faSite}`]],
    ['h2', 'الخطوط'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>، بترخيص SIL Open Font License 1.1.']],
  ] },

  hi: { title: 'श्रेय और लाइसेंस - GymRoulette', blocks: [
    ['h1', 'श्रेय और लाइसेंस'],
    ['p', 'GymRoulette नीचे दिए गए थर्ड-पार्टी संसाधनों का उपयोग करता है। उनके रचनाकारों का धन्यवाद।'],
    ['h2', 'एक्सरसाइज़ के आइकन'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), ${mdi} लाइसेंस। ${mdiSite}`,
      '<strong>GymRoulette के अपने चित्रसंकेत</strong> (पुश-अप, प्लैंक, सिट-अप, बर्पी, माउंटेन क्लाइंबर और स्क्वाट)।',
      `<strong>Game Icons</strong> (${gameSite}), Lorc, Delapouite और अन्य योगदानकर्ताओं के आइकन, ${ccBy3} लाइसेंस। कुछ आइकन का रंग और आकार बदला गया है।`,
    ]],
    ['h2', 'इंटरफ़ेस के आइकन'],
    ['ul', [`<strong>Font Awesome Free</strong>, आइकन ${ccBy4} के अंतर्गत, फ़ॉन्ट SIL OFL 1.1 के अंतर्गत और कोड MIT के अंतर्गत। ${faSite}`]],
    ['h2', 'टाइपोग्राफ़ी'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, SIL Open Font License 1.1 लाइसेंस।']],
  ] },

  tr: { title: 'Katkıda bulunanlar ve lisanslar - GymRoulette', blocks: [
    ['h1', 'Katkıda bulunanlar ve lisanslar'],
    ['p', 'GymRoulette aşağıdaki üçüncü taraf kaynakları kullanır. Yazarlarına teşekkürler.'],
    ['h2', 'Egzersiz simgeleri'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), ${mdi} lisansı. ${mdiSite}`,
      '<strong>GymRoulette\'in kendi piktogramları</strong> (şınav, plank, mekik, burpee, mountain climbers ve squat).',
      `<strong>Game Icons</strong> (${gameSite}), Lorc, Delapouite ve diğer katkıda bulunanlara ait simgeler, ${ccBy3} lisansı. Bazı simgelerin rengi değiştirilmiş ve boyutu ayarlanmıştır.`,
    ]],
    ['h2', 'Arayüz simgeleri'],
    ['ul', [`<strong>Font Awesome Free</strong>, simgeler ${ccBy4} altında, yazı tipleri SIL OFL 1.1 altında ve kod MIT altında. ${faSite}`]],
    ['h2', 'Tipografi'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, SIL Open Font License 1.1.']],
  ] },

  nl: { title: 'Dankwoord en licenties - GymRoulette', blocks: [
    ['h1', 'Dankwoord en licenties'],
    ['p', 'GymRoulette gebruikt de volgende bronnen van derden. Dank aan de makers.'],
    ['h2', 'Oefeningpictogrammen'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), licentie ${mdi}. ${mdiSite}`,
      '<strong>Eigen pictogrammen van GymRoulette</strong> (push-ups, plank, sit-ups, burpee, mountain climbers en squat).',
      `<strong>Game Icons</strong> (${gameSite}), pictogrammen van Lorc, Delapouite en andere bijdragers, licentie ${ccBy3}. Sommige pictogrammen zijn van kleur en formaat aangepast.`,
    ]],
    ['h2', 'Interfacepictogrammen'],
    ['ul', [`<strong>Font Awesome Free</strong>, pictogrammen onder ${ccBy4}, lettertypen onder SIL OFL 1.1 en code onder MIT. ${faSite}`]],
    ['h2', 'Typografie'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, SIL Open Font License 1.1.']],
  ] },

  ja: { title: 'クレジットとライセンス - GymRoulette', blocks: [
    ['h1', 'クレジットとライセンス'],
    ['p', 'GymRouletteは、以下のサードパーティのリソースを使用しています。制作者の皆様に感謝します。'],
    ['h2', 'エクササイズのアイコン'],
    ['ul', [
      `<strong>Material Design Icons</strong>（Pictogrammers）、${mdi}ライセンス。${mdiSite}`,
      '<strong>GymRoulette独自のピクトグラム</strong>（腕立て伏せ、プランク、腹筋、バーピー、マウンテンクライマー、スクワット）。',
      `<strong>Game Icons</strong>（${gameSite}）、Lorc、Delapouiteほかの制作者によるアイコン、${ccBy3}ライセンス。一部のアイコンは色とサイズを変更しています。`,
    ]],
    ['h2', 'インターフェースのアイコン'],
    ['ul', [`<strong>Font Awesome Free</strong>、アイコンは${ccBy4}、フォントはSIL OFL 1.1、コードはMITライセンス。${faSite}`]],
    ['h2', 'フォント'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>、SIL Open Font License 1.1。']],
  ] },

  ru: { title: 'Благодарности и лицензии - GymRoulette', blocks: [
    ['h1', 'Благодарности и лицензии'],
    ['p', 'GymRoulette использует следующие ресурсы третьих лиц. Благодарим их авторов.'],
    ['h2', 'Значки упражнений'],
    ['ul', [
      `<strong>Material Design Icons</strong> (Pictogrammers), лицензия ${mdi}. ${mdiSite}`,
      '<strong>Собственные пиктограммы GymRoulette</strong> (отжимания, планка, скручивания, бёрпи, скалолаз и приседания).',
      `<strong>Game Icons</strong> (${gameSite}), значки Lorc, Delapouite и других авторов, лицензия ${ccBy3}. Некоторые значки перекрашены и изменены по размеру.`,
    ]],
    ['h2', 'Значки интерфейса'],
    ['ul', [`<strong>Font Awesome Free</strong>, значки по лицензии ${ccBy4}, шрифты по SIL OFL 1.1, код по MIT. ${faSite}`]],
    ['h2', 'Типографика'],
    ['ul', ['<strong>Plus Jakarta Sans</strong>, лицензия SIL Open Font License 1.1.']],
  ] },
};
