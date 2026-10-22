// Pone la apariencia en <html> antes del primer pintado, para que no haya un destello con la equivocada (la misma
// lógica que src/theme.js, que se ocupa del resto): lo guardado en gym_theme o, si es «system» o no hay nada, el modo del dispositivo.
(function () {
  var choice = null;
  try { choice = JSON.parse(localStorage.getItem('gym_theme')); } catch (e) { /* sin almacenamiento: vale el modo del dispositivo */ }
  var dark = !window.matchMedia || window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = choice === 'calm' || choice === 'light' || choice === 'classic' ? choice : (dark ? 'calm' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();
