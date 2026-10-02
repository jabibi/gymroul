// @ts-check
// Tabla compacta de iconos por idioma: una línea por icono con el formato
//   id | Etiqueta | palabras clave separadas por espacios

/**
 * @param {string} text
 * @returns {Record<string, { label: string, keywords: string }>}
 */
export function parseIconTable(text) {
  /** @type {Record<string, { label: string, keywords: string }>} */
  const table = {};
  for (const line of text.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [id, label, keywords = ''] = trimmed.split('|').map(part => part.trim());
    if (id && label) table[id] = { label, keywords };
  }
  return table;
}
