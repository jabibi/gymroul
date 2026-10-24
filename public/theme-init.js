// Pone la apariencia en <html> antes del primer pintado, para que no haya un destello con la equivocada (la misma
// lógica que src/theme.js, que se ocupa del resto): lo guardado en gym_theme o, si es «system» o no hay nada, el modo del dispositivo.
(function () {
  var choice = null;
  try { choice = JSON.parse(localStorage.getItem('gym_theme')); } catch (e) { /* sin almacenamiento: vale el modo del dispositivo */ }
  var dark = !window.matchMedia || window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = choice === 'calm' || choice === 'light' || choice === 'classic' ? choice : (dark ? 'calm' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  // En la app de Android, Capacitor ya está inyectado y la pantalla de arranque es la nativa (SplashOverlay.kt): la de HTML solo es para la web
  var cap = window.Capacitor;
  if (cap && (cap.isNativePlatform ? cap.isNativePlatform() : cap.getPlatform && cap.getPlatform() !== 'web')) document.documentElement.classList.add('native');
  // Arranque: la pantalla de arranque (#bootSplash en index.html) tapa la interfaz mientras dure la clase booting (ver src/style.css)
  // hasta que src/main.js la quita con un fundido, cuando las fuentes y las zonas seguras ya están; así no se ve cómo se
  // colocan. Si algo fallara, se quita sola.
  document.documentElement.classList.add('booting');
  setTimeout(function () { document.documentElement.classList.remove('booting'); }, 2500);
})();
