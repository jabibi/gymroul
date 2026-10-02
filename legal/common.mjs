// Piezas que se repiten en los documentos legales de todos los idiomas.
export const CONTACT_EMAIL = 'javimelex@gmail.com';
export const MAIL = `<a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>`;
/** Enlace de correo con asunto precargado (ya codificado para la URL) */
export const mailWithSubject = subject => `<a href="mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}">${CONTACT_EMAIL}</a>`;
export const FIREBASE_PRIVACY = '<a href="https://firebase.google.com/support/privacy">firebase.google.com/support/privacy</a>';
export const GOOGLE_PRIVACY = '<a href="https://policies.google.com/privacy">policies.google.com/privacy</a>';
export const AEPD = '<a href="https://www.aepd.es">www.aepd.es</a>';
export const APP_ID = '<code>eus.jabibi.gymroul</code>';
export const WEB = '<code>gymroul.web.app</code>';
