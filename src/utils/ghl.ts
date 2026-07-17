const PRIMARY_GHL_WEBHOOK =
  import.meta.env.VITE_WEBHOOK_REGISTRO ??
  import.meta.env.VITE_WEBHOOK_TRACKING ??
  'https://services.leadconnectorhq.com/hooks/sZSqcOsIlHto63OiBVvI/webhook-trigger/mAhbHooYUtamnROiXEjy'
const FALLBACK_GHL_WEBHOOK =
  'https://services.leadconnectorhq.com/hooks/sZSqcOsIlHto63OiBVvI/webhook-trigger/mAhbHooYUtamnROiXEjy'

const PRIMARY_QUALIFY_WEBHOOK =
  import.meta.env.VITE_WEBHOOK_CALIFICACION ??
  'https://services.leadconnectorhq.com/hooks/sZSqcOsIlHto63OiBVvI/webhook-trigger/pb5eVfAXZDx8YX2tBzLR'
const FALLBACK_QUALIFY_WEBHOOK =
  'https://services.leadconnectorhq.com/hooks/sZSqcOsIlHto63OiBVvI/webhook-trigger/pb5eVfAXZDx8YX2tBzLR'

export function generateEventId(prefix = 'evt'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

export async function sendWebhookWithFallback(
  payload: any,
  options: { headers?: Record<string, string> } = {},
) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  try {
    const res = await fetch(PRIMARY_GHL_WEBHOOK, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      throw new Error(`Primary webhook failed with status: ${res.status}`)
    }
    return res
  } catch (error) {
    console.warn('[Webhook Fallback] Primary webhook failed, trying fallback...', error)
    const res = await fetch(FALLBACK_GHL_WEBHOOK, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      throw new Error(`Fallback webhook failed with status: ${res.status}`)
    }
    return res
  }
}

export async function sendQualifyWebhookWithFallback(
  payload: any,
  options: { headers?: Record<string, string> } = {},
) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  try {
    const res = await fetch(PRIMARY_QUALIFY_WEBHOOK, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      throw new Error(`Primary qualify webhook failed with status: ${res.status}`)
    }
    return res
  } catch (error) {
    console.warn('[Webhook Fallback] Primary qualify webhook failed, trying fallback...', error)
    const res = await fetch(FALLBACK_QUALIFY_WEBHOOK, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      throw new Error(`Fallback qualify webhook failed with status: ${res.status}`)
    }
    return res
  }
}

export async function trackStage(
  etapa: string,
  data: Record<string, string> & { event_id?: string },
) {
  try {
    const event_id = data.event_id ?? generateEventId('view')
    await sendWebhookWithFallback({ etapa, event_id, ...data })
  } catch {
    // silencioso
  }
}
