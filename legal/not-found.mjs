// Página 404 (Firebase Hosting la sirve para cualquier ruta inexistente).
const page = (title, message, back) => ({ title, blocks: [['h1', '404'], ['p', message], ['p', `<a href="/">${back}</a>`]] });

export default {
  en: page('Page not found - GymRoulette', 'The page you are looking for does not exist.', 'Back to GymRoulette'),
  es: page('Página no encontrada - GymRoulette', 'La página que buscas no existe.', 'Volver a GymRoulette'),
  eu: page('Orria ez da aurkitu - GymRoulette', 'Bilatzen duzun orria ez da existitzen.', 'Itzuli GymRoulette-ra'),
  gl: page('Páxina non atopada - GymRoulette', 'A páxina que buscas non existe.', 'Volver a GymRoulette'),
  ca: page('Pàgina no trobada - GymRoulette', 'La pàgina que busques no existeix.', 'Torna a GymRoulette'),
  fr: page('Page introuvable - GymRoulette', "La page que tu cherches n'existe pas.", 'Retour à GymRoulette'),
  'pt-BR': page('Página não encontrada - GymRoulette', 'A página que você procura não existe.', 'Voltar ao GymRoulette'),
  'pt-PT': page('Página não encontrada - GymRoulette', 'A página que procuras não existe.', 'Voltar ao GymRoulette'),
  de: page('Seite nicht gefunden - GymRoulette', 'Die Seite, die du suchst, existiert nicht.', 'Zurück zu GymRoulette'),
  it: page('Pagina non trovata - GymRoulette', 'La pagina che stai cercando non esiste.', 'Torna a GymRoulette'),
  pl: page('Nie znaleziono strony - GymRoulette', 'Strona, której szukasz, nie istnieje.', 'Wróć do GymRoulette'),

  ar: page('الصفحة غير موجودة - GymRoulette', 'الصفحة التي تبحث عنها غير موجودة.', 'العودة إلى GymRoulette'),
  hi: page('पेज नहीं मिला - GymRoulette', 'आप जो पेज ढूँढ रहे हैं वह मौजूद नहीं है।', 'GymRoulette पर वापस जाएँ'),

  tr: page('Sayfa bulunamadı - GymRoulette', 'Aradığın sayfa mevcut değil.', 'GymRoulette\'e dön'),

  nl: page('Pagina niet gevonden - GymRoulette', 'De pagina die je zoekt bestaat niet.', 'Terug naar GymRoulette'),

  ja: page('ページが見つかりません - GymRoulette', 'お探しのページは存在しません。', 'GymRouletteに戻る'),

  ru: page('Страница не найдена - GymRoulette', 'Страница, которую вы ищете, не существует.', 'Вернуться в GymRoulette'),
};
