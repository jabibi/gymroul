// Polski (Polonia, trato informal con "ty")
export default {
  strings: {
    'app.title': 'GymRoulette',

    'header.sound': 'Włącz lub wyłącz dźwięk',
    'header.history': 'Otwórz historię',
    'header.settings': 'Otwórz ustawienia',

    'live.drag': 'Przeciągnij koło, aby je zakręcić',
    'live.configure': 'Edytuj koło',
    'wheel.aria': 'Koło ćwiczeń: zakręć je przyciskiem poniżej lub przeciągnij',
    'wheel.centerAria': 'Zakręć kołem',
    'wheel.center': 'Kręć',
    'wheel.setup': 'Edytuj',
    'spin.button': 'Zakręć kołem',

    'result.badge': 'Wylosowano ćwiczenie',
    'result.reps': 'powtórzeń',
    'result.skip': 'Pomiń to wyzwanie',
    'result.done': 'Zrobione',
    'result.share': 'Udostępnij wyzwanie',
    'share.text': 'Moje wyzwanie w GymRoulette: {challenge}. Zakręć kołem i ćwicz razem ze mną: {url}',
    'share.saved': 'Obraz pobrany',
    'share.failed': 'Nie udało się udostępnić wyzwania',
    'share.preparing': 'Przygotowuję obraz…',
    'share.cancel': 'Anuluj',

    'history.title': 'Historia treningu',
    'history.close': 'Zamknij historię',
    'history.empty': 'Nie ma jeszcze żadnych ćwiczeń. Zakręć kołem, aby zacząć.',
    'history.total': 'Ćwiczenia: {n} · Powtórzenia łącznie: {reps}',
    'history.clear': 'Wyczyść historię',
    'history.clearConfirm': 'Dotknij ponownie',

    'config.title': 'Edytuj koło',
    'config.close': 'Zamknij ustawienia',
    'config.intro': 'Włączaj i wyłączaj ćwiczenia, ustaw zakres powtórzeń każdego z nich albo twórz je i usuwaj. Zmiany są zapisywane od razu.',
    'config.reps': 'Powtórzenia',
    'config.repsMin': 'Min.',
    'config.repsMax': 'Maks.',
    'config.repsRange': '{min}–{max} powt.',
    'config.editReps': 'Edytuj powtórzenia: {name}',
    'config.repsSave': 'Zapisz',
    'config.exercises': 'Ćwiczenia',
    'config.exsAll': 'Wszystkie',
    'config.exsNone': 'Żadne',
    'config.addExercise': 'Dodaj nowe ćwiczenie',
    'config.namePlaceholder': 'Nazwa (np. Deska)',
    'config.chooseIcon': 'Wybierz ikonę',
    'config.searchPlaceholder': 'Szukaj: joga, karate, boks, ciężary…',
    'config.searchAria': 'Szukaj ikony',
    'config.noIcons': 'Brak ikon pasujących do wyszukiwania',
    'config.save': 'Zapisz',
    'config.help': 'Pomoc',
    'config.language': 'Język',
    'settings.title': 'Ustawienia',
    'settings.back': 'Wstecz',
    'settings.wheel': 'Edytuj koło',
    'settings.appearance': 'Wygląd',
    'appearance.calm': 'Ciemny',
    'appearance.calmDesc': 'Stonowane barwy na kole i szmaragdowa zieleń, na ciemnym tle.',
    'appearance.classic': 'Klasyczny',
    'appearance.classicDesc': 'Oryginalny wygląd: żywe kolory koła i intensywna zieleń.',
    'appearance.light': 'Jasny',
    'appearance.lightDesc': 'Te same stonowane barwy i szmaragdowa zieleń, na jasnym tle.',
    'appearance.system': 'Systemowy',
    'appearance.systemDesc': 'Przełącza się między ciemnym a jasnym zależnie od urządzenia.',
    'whatsnew.title': 'Nowości w wersji {version}',
    'whatsnew.look': 'Nowy jasny wygląd i świeższy styl.',
    'whatsnew.settings': 'Wygląd Delikatny nazywa się teraz Ciemny, a Systemowy podąża za urządzeniem.',
    'whatsnew.text': 'Teraz także po rosyjsku.',
    'whatsnew.classicTitle': 'Wolisz inny wygląd?',
    'whatsnew.classicText': 'Aplikacja domyślnie podąża teraz za urządzeniem. Otwórz {settings}, potem {appearance} i wybierz {options}, aby wrócić do swojego ulubionego.',
    'whatsnew.classicButton': 'Zmień wygląd',
    'whatsnew.close': 'Zaczynamy',
    'whatsnew.closeAria': 'Zamknij nowości',
    'config.deleteExercise': 'Usuń {name}',
    'config.deleted': 'Usunięto: {name}',
    'config.undo': 'Cofnij',
    'exercise.burpee': 'Burpees',
    'exercise.lunge': 'Wykroki',
    'exercise.pushup': 'Pompki',
    'exercise.squat': 'Przysiady',
    'exercise.climbers': 'Wspinaczka górska',
    'exercise.splitjump': 'Wykroki skokowe',

    'error.nameRequired': 'Wpisz nazwę ćwiczenia',
    'error.iconRequired': 'Wybierz ikonę z listy',
    'error.duplicateExercise': 'Ćwiczenie o nazwie „{name}” już istnieje',
    'error.maxExercises': 'Maksymalnie {max} ćwiczeń',
    'error.repRange': 'Wpisz liczbę od 1 do {max}',
    'error.repMinMax': 'Minimum nie może być większe od maksimum',
    'error.maxLength': 'Maksymalnie {max} znaków',

    'config.commitment': 'Zobowiązanie do prywatności',
    'settings.privacy': 'Prywatność',
    'settings.about': 'Informacje',
    'commitment.intro': 'GymRoulette to oprogramowanie etyczne i suwerenne: robi to, o co je prosisz, i nic więcej.',
    'commitment.offline.title': '100% offline',
    'commitment.offline.text': 'Działa bez połączenia. Aplikacja nawet nie prosi o uprawnienie do internetu.',
    'commitment.noTrackers.title': 'Bez trackerów',
    'commitment.noTrackers.text': 'Bez analityki, bibliotek śledzących i profili.',
    'commitment.noAds.title': 'Bez reklam',
    'commitment.noAds.text': 'Bez reklam i sieci reklamowych.',
    'commitment.yourData.title': 'Twoje dane są twoje',
    'commitment.yourData.text': 'Wszystko, co tworzysz, zostaje na twoim urządzeniu. Jeśli usuniesz aplikację lub jej dane, w chmurze nie zostanie żaden ślad.',
    'commitment.noScripts.title': 'Zero zewnętrznych skryptów',
    'commitment.noScripts.text': 'Cały kod jest w aplikacji. Nic nie jest pobierane z innych serwerów.',
    'commitment.policy': 'Przeczytaj pełną politykę prywatności',

    'doc.privacy': 'Polityka prywatności',
    'doc.credits': 'Podziękowania i licencje',
    'doc.close': 'Zamknij',
  },

  groups: {
    strength: 'Siła i ciężary',
    calisthenics: 'Kalistenika i gimnastyka',
    cardio: 'Cardio i wytrzymałość',
    martial: 'Sztuki walki',
    mindbody: 'Umysł i ciało',
    sports: 'Sporty',
    outdoor: 'Woda, góry i natura',
    challenges: 'Przeszkody i wyzwania',
  },

  icons: `
dumbbell | Hantla | hantle ciężary siłownia kulturystyka siła weights gym
kettlebell | Kettlebell | kettle odważnik rosyjski crossfit zamach swing
weight-lifter | Podnoszenie ciężarów | sztanga wyciskanie crossfit rwanie podrzut weightlifting
lift-up | Podniesienie ciężaru | nad głowę wyciskanie żołnierskie sztanga w górę
lift-down | Opuszczenie ciężaru | martwy ciąg przysiad sztanga opuszczanie
weight | Obciążenie | talerz ciężar kilogramy kilosy
bench | Ławka | wyciskanie leżąc ławeczka wiosłowanie
anvil | Kowadło | siła moc strongman
hammer | Młot | młot kowalski crossfit uderzanie opona
tire | Opona | przerzucanie opony crossfit strongman
sandbag | Worek z piaskiem | hyrox wykroki noszenie worek
arm-flex | Biceps | ramiona uginanie mięśnie siła
arm | Ramię | triceps barki dipy pompki na poręczach
leg | Nogi | przysiad wykrok pośladki czworogłowy uda
boulder | Głaz | kamień atlas strongman
rock | Kamień | kamień atlas ocr noszenie
gymnastics | Gimnastyka | kalistenika akrobatyka
muscle-up | Muscle-up | podciąganie drążek kalistenika
pull | Przyciąganie | podciąganie wiosłowanie kalistenika
pushup | Pompki | podłoga klatka piersiowa triceps kalistenika dipy
plank | Deska | plank brzuch core izometria podłoga kalistenika
situp | Brzuszki | spięcia mięśnie brzucha core podłoga kalistenika
burpee | Burpee | skok podłoga hiit crossfit cardio
climbers | Wspinaczka w podporze | mountain climbers kolana cardio core podłoga hiit crossfit
squat | Przysiad | przysiady nogi pośladki czworogłowy kalistenika squat
push | Pchanie | ściana sanie pchać
cartwheel | Gwiazda | koło akrobatyka gimnastyka
handsup | Ręce w górę | rozciąganie nad głowę wyciskanie
balance | Równowaga | stanie na rękach deska core balans
jump-rope | Skakanka | skakanie double unders crossfit
jump | Skok | skok na skrzynię burpee skok w dal wykroki skoczne plyometria
ladder | Drabinka | drabinka koordynacyjna zwinność wspinaczka ocr
stairs | Schody | stopnie wchodzenie wspinaczka cardio
rope | Lina | liny treningowe battle rope wspinaczka crossfit ocr
run | Bieg | bieganie jogging wyścig
run-fast | Szybki bieg | sprint tempo szybko mountain climbers
sprint | Sprint | szybkość interwały lekkoatletyka
walk | Chód | marsz spacer wykroki
hiking | Wędrówka | góry trekking chodzenie piesze
sneaker | Buty sportowe | trampki buty do biegania obuwie
footprint | Ślady stóp | kroki marsz chodzenie
bike | Rower | jazda na rowerze kolarstwo spinning cardio
bike-fast | Szybka jazda na rowerze | assault bike airbike tempo
rowing | Wioślarstwo | wiosłowanie ergometr wioślarski hyrox crossfit
skierg | Narciarstwo biegowe | skierg hyrox narty ergometr
heart-pulse | Tętno | puls cardio serce zdrowie
fire | Ogień | burpee intensywny spalanie kalorie hiit
bolt | Błyskawica | wybuchowy moc energia szybko
timer | Stoper | czas izometria deska emom
hourglass | Minutnik | klepsydra tabata interwały przerwa
infinity | Nieskończoność | amrap bez przerwy wytrzymałość
repeat | Serie | powtórzenia obwód rundy podejścia
karate | Karate | kimono dojo sztuki walki judo taekwondo
boxing | Boks | rękawice sparing kickboxing
mma | MMA | mieszane sztuki walki walka
high-kick | Wysoki kopniak | taekwondo kickboxing karate kopnięcia
kick | Kopnięcie | kopniak kickboxing muay thai
punch | Cios | uderzenie boks prosty jab
punching-bag | Worek bokserski | uderzanie trening boks
fist | Pięść | kung fu karate siła
ninja | Ninja | sztuki walki ninjutsu zwinność
sword | Miecze | miecz kendo szermierka walka
fencing | Szermierka | szpada floret szabla
shield | Obrona | tarcza samoobrona ochrona
yoga | Joga | asany rozciąganie gibkość elastyczność pilates yoga
meditation | Medytacja | oddech uważność relaks mindfulness
lotus | Lotos | joga medytacja zen
yin-yang | Yin i yang | tai chi taichi równowaga qigong
spa | Relaks | pilates rozciąganie regeneracja wellness odpoczynek
flower | Kwiat | pilates joga spokój
tortoise | Żółw | powoli tai chi kontrola tempo
hand-heart | Dobre samopoczucie | zdrowie troska oddech
soccer | Piłka nożna | piłka futbol nożna
basketball | Koszykówka | kosz piłka wall ball
volleyball | Siatkówka | piłka
tennis | Tenis | rakieta piłka padel
table-tennis | Tenis stołowy | ping pong pingpong
badminton | Badminton | rakieta lotka kometka
rugby | Rugby | piłka
football | Futbol amerykański | piłka american football
handball | Piłka ręczna | piłka
baseball | Baseball | kij piłka
golf | Golf | kij piłka
hockey | Hokej | kij krążek
bowling | Kręgle | piłka bowling
archery | Łucznictwo | cel celowanie precyzja łuk
target | Tarcza | cel precyzja wyzwanie
skate | Deskorolka | skateboard hulajnoga
roller-skate | Jazda na wrotkach | wrotki rolki
swim | Pływanie | basen kraul
pool | Basen | woda pływanie aqua
waves | Fale | woda morze aqua
surf | Surfing | fale deska
kayak | Kajak | kanu wiosłowanie pływanie
sailing | Żeglarstwo | łódź żagle jacht
diving | Nurkowanie | akwalung freediving snorkeling
climbing | Wspinaczka | skały bouldering ocr
terrain | Góry | szlak wzgórza wędrówka trail
ski | Narty | śnieg zjazdowe alpejskie
snowboard | Snowboard | śnieg deska
sled | Sanie | pchanie ciągnięcie hyrox sanki
horse | Jazda konna | koń jeździectwo
fence | Płot | przeszkoda ocr skok ściana
flag | Meta | linia mety wyścig ocr hyrox flaga
trophy | Puchar | trofeum wyzwanie wyjątkowe mistrz
medal | Medal | osiągnięcie nagroda
dice | Kostka | los przypadek niespodzianka
star | Gwiazda | ulubione wyjątkowe
rocket | Rakieta | wybuchowy start moc
tractor | Traktor | ciągnięcie opona strongman
`,
};
