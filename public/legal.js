// Muestra en las páginas legales el idioma pedido con ?lang=, el del navegador o, si no hay, el inglés.
// Cada <section data-lang> contiene el documento completo en un idioma. Sin este script se ven todos.
(function () {
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[data-lang]'));
  var nav = document.getElementById('langNav');
  var codes = sections.map(function (s) { return s.getAttribute('data-lang'); });

  function match(tags) {
    for (var i = 0; i < tags.length; i++) {
      var tag = String(tags[i]).toLowerCase().replace('_', '-');
      for (var j = 0; j < codes.length; j++) if (codes[j].toLowerCase() === tag) return codes[j];
      var base = tag.split('-')[0];
      if (base === 'pt') return 'pt-BR';
      for (var k = 0; k < codes.length; k++) if (codes[k].toLowerCase() === base) return codes[k];
    }
    return 'en';
  }

  function initial() {
    var fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl) return codes.indexOf(fromUrl) !== -1 ? fromUrl : match([fromUrl]);
    return match(navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || 'en']);
  }

  function show(code, updateUrl) {
    sections.forEach(function (s) { s.hidden = s.getAttribute('data-lang') !== code; });
    var active = sections.filter(function (s) { return s.getAttribute('data-lang') === code; })[0];
    document.documentElement.lang = code;
    if (active) document.title = active.getAttribute('data-title');
    // Los enlaces a las otras páginas legales conservan el idioma elegido
    Array.prototype.forEach.call(document.querySelectorAll('a[href]'), function (a) {
      var href = a.getAttribute('data-base') || a.getAttribute('href');
      if (/^[a-z-]+\.html(\?|$)/.test(href)) {
        a.setAttribute('data-base', href.split('?')[0]);
        a.setAttribute('href', href.split('?')[0] + '?lang=' + code);
      }
    });
    Array.prototype.forEach.call(nav.children, function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === code)); });
    if (updateUrl && window.history && history.replaceState) history.replaceState(null, '', '?lang=' + code);
  }

  sections.forEach(function (s) {
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('data-lang', s.getAttribute('data-lang'));
    b.textContent = s.getAttribute('data-name');
    b.addEventListener('click', function () { show(s.getAttribute('data-lang'), true); });
    nav.appendChild(b);
  });

  show(initial(), false);
})();
