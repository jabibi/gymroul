// Genera store/importar-traducciones.csv: título, descripción breve y completa de todos los idiomas en un
// solo archivo, para el cuadro «Importar un archivo» de la ficha de Play Console.
//
//   node scripts/build-listing-csv.mjs
import { writeFileSync } from 'node:fs';
import { STORE_LOCALES, LISTINGS } from '../store/listing.mjs';

const cell = text => `"${String(text).replaceAll('"', '""')}"`;
const header = ['Language', 'Language name', 'App name', 'Short description', 'Full description'];
const rows = STORE_LOCALES.map(({ app, play, name }) => {
  const l = LISTINGS[app];
  return [play, name, l.title, l.short, l.full];
});

// BOM para que Excel y Google Sheets lean bien los acentos; CRLF entre filas
const csv = '﻿' + [header, ...rows].map(r => r.map(cell).join(',')).join('\r\n') + '\r\n';
writeFileSync(new URL('../store/importar-traducciones.csv', import.meta.url), csv);
console.log(`  ✓ store/importar-traducciones.csv (${rows.length} idiomas)`);
