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
};
