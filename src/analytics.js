// Firebase Analytics, cargado solo si el usuario da su consentimiento

const firebaseConfig = {
  apiKey: 'AIzaSyCWgc1F8MOgkNAXnZa-3ajW75xILKXGt2c',
  authDomain: 'gymroul.firebaseapp.com',
  projectId: 'gymroul',
  storageBucket: 'gymroul.firebasestorage.app',
  messagingSenderId: '952507126076',
  appId: '1:952507126076:web:4b8449faf8aaa0a29d0e39',
  measurementId: 'G-HVDEBLCMHP',
};

const KEY_CONSENT = 'gymroulette_analytics_consent';

/** @returns {'granted' | 'denied' | null} null = sin decidir */
export function getConsent() {
  try {
    const v = localStorage.getItem(KEY_CONSENT);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch (e) {
    return null;
  }
}

/** @type {Promise<any> | null} */
let analyticsPromise = null;

// El SDK se descarga con import() dinámico: sin consentimiento no se carga ni se contacta con Google
function loadAnalytics() {
  if (!analyticsPromise) {
    analyticsPromise = Promise.all([import('firebase/app'), import('firebase/analytics')])
      .then(([{ initializeApp }, analytics]) => ({ analytics, instance: analytics.getAnalytics(initializeApp(firebaseConfig)) }))
      .catch(e => { analyticsPromise = null; throw e; });
  }
  return analyticsPromise;
}

/** @param {boolean} granted */
export async function applyConsent(granted) {
  /** @type {any} */ (window)['ga-disable-' + firebaseConfig.measurementId] = !granted;
  try {
    if (granted) {
      const { analytics, instance } = await loadAnalytics();
      analytics.setAnalyticsCollectionEnabled(instance, true);
    } else if (analyticsPromise) {
      const { analytics, instance } = await analyticsPromise;
      analytics.setAnalyticsCollectionEnabled(instance, false);
    }
  } catch (e) { /* sin red o SDK bloqueado: la app sigue funcionando */ }
}

/** @param {boolean} granted */
export function setConsent(granted) {
  try { localStorage.setItem(KEY_CONSENT, granted ? 'granted' : 'denied'); } catch (e) { /* ignorado */ }
  return applyConsent(granted);
}
