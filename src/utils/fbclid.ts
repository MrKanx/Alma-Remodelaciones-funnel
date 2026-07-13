/**
 * Captura fbclid, UTMs, _fbc y _fbp para atribución completa de Meta Ads.
 *
 * fbclid       → generado por Meta al hacer click en un anuncio
 * fbc          → cookie estándar Meta: fb.1.{ts}.{fbclid}
 * fbp          → cookie de browser ID de Meta (generada por el Pixel)
 * utm_source   → ej. "facebook", "meta"
 * utm_medium   → ej. "paid_ad", "paid"
 * utm_campaign → ej. "yeyo-tofu-lead"
 * utm_content  → ID o nombre del anuncio
 * utm_term     → ID del adset (opcional)
 * utm_id       → ID numérico de la campaña (opcional)
 */

const STORAGE_KEY = 'os_fb'

export interface FbParams {
  fbclid: string
  fbc: string
  fbp: string
  utm_source: string
  utm_medium: string
  utm_campaign: string
  utm_content: string
  utm_term: string
  utm_id: string
}

function getCookie(name: string): string {
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : ''
}

function buildFbc(fbclid: string): string {
  return `fb.1.${Date.now()}.${fbclid}`
}

/**
 * Llama esto en el onMounted de FunnelView.
 * Captura fbclid + UTMs de la URL y los persiste en sessionStorage.
 */
export function captureFbParams(): void {
  const params = new URLSearchParams(window.location.search)
  const fbclid = params.get('fbclid') ?? ''

  const existing = getStoredFbParams()

  // Si ya tenemos fbclid y no llegó uno nuevo, conservar todo
  if (!fbclid && existing.fbclid) return

  const data: FbParams = {
    fbclid,
    fbc: fbclid ? buildFbc(fbclid) : getCookie('_fbc'),
    fbp: getCookie('_fbp'),
    utm_source:   params.get('utm_source')   ?? '',
    utm_medium:   params.get('utm_medium')   ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_content:  params.get('utm_content')  ?? '',
    utm_term:     params.get('utm_term')     ?? '',
    utm_id:       params.get('utm_id')       ?? '',
  }

  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

/**
 * Retorna todos los parámetros de atribución almacenados en esta sesión.
 */
export function getStoredFbParams(): FbParams {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as FbParams
  } catch { /* ignorar */ }
  return {
    fbclid: '', fbc: '', fbp: '',
    utm_source: '', utm_medium: '', utm_campaign: '',
    utm_content: '', utm_term: '', utm_id: '',
  }
}
