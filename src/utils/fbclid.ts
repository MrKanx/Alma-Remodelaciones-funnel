/**
 * Captura fbclid, UTMs, _fbc y _fbp para atribución completa de Meta Ads.
 *
 * fbclid       → generado por Meta al hacer click en un anuncio
 * fbc          → cookie estándar Meta: fb.1.{ts}.{fbclid}
 * fbp          → cookie de browser ID de Meta (generada por el Pixel)
 * utm_source   → ej. "facebook", "meta"
 * utm_medium   → ej. "paid_ad", "paid"
 * utm_campaign → ej. "campaña-meta"
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
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'))
  return match ? decodeURIComponent(match[1]) : ''
}

function buildFbc(fbclid: string): string {
  return `fb.1.${Date.now()}.${fbclid}`
}

/**
 * Captura fbclid + UTMs de la URL y los persiste en localStorage + sessionStorage.
 */
export function captureFbParams(): void {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)
  const fbclid = params.get('fbclid') ?? ''
  const utm_source = params.get('utm_source') ?? ''
  const utm_medium = params.get('utm_medium') ?? ''
  const utm_campaign = params.get('utm_campaign') ?? ''
  const utm_content = params.get('utm_content') ?? ''
  const utm_term = params.get('utm_term') ?? ''
  const utm_id = params.get('utm_id') ?? ''

  const existing = getStoredFbParams()

  // Si no hay parámetros nuevos en la URL pero tenemos almacenados previamente, solo actualizamos cookies si cambiaron
  const hasNewParams = !!(fbclid || utm_source || utm_medium || utm_campaign || utm_content)

  const fbcValue = fbclid ? buildFbc(fbclid) : (getCookie('_fbc') || existing.fbc)
  const fbpValue = getCookie('_fbp') || existing.fbp

  const data: FbParams = {
    fbclid: fbclid || existing.fbclid,
    fbc: fbcValue,
    fbp: fbpValue,
    utm_source: utm_source || existing.utm_source,
    utm_medium: utm_medium || existing.utm_medium,
    utm_campaign: utm_campaign || existing.utm_campaign,
    utm_content: utm_content || existing.utm_content,
    utm_term: utm_term || existing.utm_term,
    utm_id: utm_id || existing.utm_id,
  }

  if (hasNewParams || !existing.fbclid) {
    try {
      const json = JSON.stringify(data)
      sessionStorage.setItem(STORAGE_KEY, json)
      localStorage.setItem(STORAGE_KEY, json)
    } catch {
      /* ignorar errores de storage en modo privado */
    }
  }
}

/**
 * Retorna todos los parámetros de atribución almacenados en la sesión o almacenamiento local.
 */
export function getStoredFbParams(): FbParams {
  let stored: Partial<FbParams> = {}
  try {
    const rawSession = sessionStorage.getItem(STORAGE_KEY)
    const rawLocal = localStorage.getItem(STORAGE_KEY)
    if (rawSession) {
      stored = JSON.parse(rawSession)
    } else if (rawLocal) {
      stored = JSON.parse(rawLocal)
    }
  } catch {
    /* ignorar */
  }

  const fbcCookie = getCookie('_fbc')
  const fbpCookie = getCookie('_fbp')

  return {
    fbclid: stored.fbclid ?? '',
    fbc: fbcCookie || stored.fbc || (stored.fbclid ? buildFbc(stored.fbclid) : ''),
    fbp: fbpCookie || stored.fbp || '',
    utm_source: stored.utm_source ?? '',
    utm_medium: stored.utm_medium ?? '',
    utm_campaign: stored.utm_campaign ?? '',
    utm_content: stored.utm_content ?? '',
    utm_term: stored.utm_term ?? '',
    utm_id: stored.utm_id ?? '',
  }
}

/**
 * Dispara un evento del Pixel de Facebook de forma segura si el Pixel está activo.
 */
export function trackPixelEvent(
  eventName: string,
  data: Record<string, any> = {},
  eventId?: string,
): void {
  if (typeof window === 'undefined') return
  const fbq = (window as any).fbq
  if (typeof fbq === 'function') {
    try {
      if (eventId) {
        fbq('track', eventName, data, { eventID: eventId })
      } else {
        fbq('track', eventName, data)
      }
    } catch (err) {
      console.warn('[Meta Pixel] Error al enviar evento:', eventName, err)
    }
  }
}
