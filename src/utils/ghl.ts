const GHL_WEBHOOK = import.meta.env.VITE_WEBHOOK_TRACKING ?? 'https://services.leadconnectorhq.com/hooks/AIfaQhtY6ww2dKc5xq8r/webhook-trigger/EHeiuQ0FuekJ68p7JWbd'

export function generateEventId(prefix = 'evt'): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2)}`
}

export async function trackStage(etapa: string, data: Record<string, string> & { event_id?: string }) {
  try {
    const event_id = data.event_id ?? generateEventId('view')
    await fetch(GHL_WEBHOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ etapa, event_id, ...data }),
    })
  } catch {
    // silencioso
  }
}
