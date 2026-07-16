import { createRouter, createWebHistory, type RouteMeta } from 'vue-router'
import FunnelView from '../views/FunnelView.vue'
import VideoView from '../views/VideoView.vue'
import PrivacyPolicyView from '../views/PrivacyPolicyView.vue'
import LegalNoticeView from '../views/LegalNoticeView.vue'
import BookingView from '../views/BookingView.vue'
import BookedView from '../views/BookedView.vue'
import NoSpaceView from '../views/NoSpaceView.vue'

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string
    description: string
    canonical: string
    ogTitle: string
    ogDescription: string
    ogUrl: string
    jsonLd?: object[]
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ top: 0, behavior: 'instant' }),
  routes: [
    {
      path: '/',
      alias: '/registro-vsl-tr',
      name: 'funnel',
      component: FunnelView,
      meta: {
        title: 'Alma Remodelaciones | Arquitectura Modular de Alta Fidelidad',
        description:
          'Descubre cómo desterrar la improvisación de tu obra para siempre con precisión milimétrica y ejecución impecable.',
        canonical: 'https://Alma Remodelaciones.com/',
        ogTitle: 'Alma Remodelaciones | Arquitectura Modular de Alta Fidelidad',
        ogDescription:
          'Transforma la dinámica en la que vives y disfrutas tu hogar con muebles diseñados y fabricados con responsabilidad.',
        ogUrl: 'https://Alma Remodelaciones.com/',
      } satisfies RouteMeta,
    },
    {
      path: '/ver-video',
      name: 'video',
      component: VideoView,
      meta: {
        title: 'Mira el video | Alma Remodelaciones — Paso 1 de 2',
        description: 'Descubre cómo una infraestructura modular de alto valor aumenta tu calidad de vida.',
        canonical: 'https://Alma Remodelaciones.com/ver-video',
        ogTitle: 'Mira el video | Alma Remodelaciones',
        ogDescription: 'Ve el video y agenda tu diagnóstico de espacios gratuito.',
        ogUrl: 'https://Alma Remodelaciones.com/ver-video',
      } satisfies RouteMeta,
    },
    {
      path: '/agendar',
      name: 'booking',
      component: BookingView,
      meta: {
        title: 'Agenda tu Diagnóstico | Alma Remodelaciones — Paso 2 de 2',
        description: 'Selecciona el día y hora para tu Diagnóstico de Planificación de Espacios gratuito.',
        canonical: 'https://Alma Remodelaciones.com/agendar',
        ogTitle: 'Agenda tu Diagnóstico | Alma Remodelaciones',
        ogDescription: 'Elige tu horario y reserva tu Diagnóstico de Espacios.',
        ogUrl: 'https://Alma Remodelaciones.com/agendar',
      } satisfies RouteMeta,
    },
    {
      path: '/cita-confirmada',
      name: 'booked',
      component: BookedView,
      meta: {
        title: 'Diagnóstico Confirmado | Alma Remodelaciones',
        description: 'Tu diagnóstico de espacios con Alma Remodelaciones está confirmado. Revisa tu correo.',
        canonical: 'https://Alma Remodelaciones.com/cita-confirmada',
        ogTitle: 'Diagnóstico Confirmado | Alma Remodelaciones',
        ogDescription: 'Tu diagnóstico está reservado. Te contactaremos pronto.',
        ogUrl: 'https://Alma Remodelaciones.com/cita-confirmada',
      } satisfies RouteMeta,
    },
    {
      path: '/sin-espacio',
      name: 'no-space',
      component: NoSpaceView,
      meta: {
        title: 'Sin Cupos Disponibles | Alma Remodelaciones',
        description: 'En este momento los cupos para diagnóstico de Alma Remodelaciones están completos.',
        canonical: 'https://Alma Remodelaciones.com/sin-espacio',
        ogTitle: 'Sin Cupos Disponibles | Alma Remodelaciones',
        ogDescription: 'Los cupos de diagnóstico están completos. Te avisaremos cuando haya disponibilidad.',
        ogUrl: 'https://Alma Remodelaciones.com/sin-espacio',
      } satisfies RouteMeta,
    },
    {
      path: '/politicas-privacidad',
      name: 'privacy-policy',
      component: PrivacyPolicyView,
      meta: {
        title: 'Política de Privacidad | Alma Remodelaciones',
        description: 'Política de privacidad de Alma Remodelaciones. Información sobre el tratamiento de datos personales.',
        canonical: 'https://Alma Remodelaciones.com/politicas-privacidad',
        ogTitle: 'Política de Privacidad | Alma Remodelaciones',
        ogDescription: 'Política de privacidad de Alma Remodelaciones.',
        ogUrl: 'https://Alma Remodelaciones.com/politicas-privacidad',
      } satisfies RouteMeta,
    },
    {
      path: '/aviso-legal',
      name: 'legal-notice',
      component: LegalNoticeView,
      meta: {
        title: 'Aviso Legal | Alma Remodelaciones',
        description: 'Aviso legal de Alma Remodelaciones. Términos y condiciones de uso del sitio web.',
        canonical: 'https://Alma Remodelaciones.com/aviso-legal',
        ogTitle: 'Aviso Legal | Alma Remodelaciones',
        ogDescription: 'Aviso legal de Alma Remodelaciones.',
        ogUrl: 'https://Alma Remodelaciones.com/aviso-legal',
      } satisfies RouteMeta,
    },
  ],
})

// ── SEO dinámico por ruta ──────────────────────────────────────────────────────
const setMeta = (name: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
  el.content = content
}

const setOgMeta = (property: string, content: string) => {
  let el = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) { el = document.createElement('meta'); el.setAttribute('property', property); document.head.appendChild(el) }
  el.content = content
}

const setCanonical = (href: string) => {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el) }
  el.href = href
}

router.afterEach((to) => {
  const meta = to.meta
  document.title = meta.title ?? 'Alma Remodelaciones'
  setMeta('description', meta.description ?? '')
  setOgMeta('og:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('og:description', meta.ogDescription ?? meta.description ?? '')
  setOgMeta('og:url', meta.ogUrl ?? '')
  setOgMeta('twitter:title', meta.ogTitle ?? meta.title ?? '')
  setOgMeta('twitter:description', meta.ogDescription ?? meta.description ?? '')
  setCanonical(meta.canonical ?? '')
})

// ── Router Guards ──────────────────────────────────────────────────────────────
const BOOKED_TTL_MS = 3 * 24 * 60 * 60 * 1000
const DISQ_TTL_MS   = 48 * 60 * 60 * 1000

const readTimestamp = (key: string): number | null => {
  const raw = localStorage.getItem(key)
  if (!raw) return null
  const n = Number(raw)
  return Number.isFinite(n) && n > 0 ? n : null
}

const isFresh = (key: string, ttl: number): boolean => {
  const ts = readTimestamp(key)
  if (ts === null) return false
  if (Date.now() - ts <= ttl) return true
  localStorage.removeItem(key)
  return false
}

const PUBLIC_ROUTES = ['privacy-policy', 'legal-notice']

router.beforeEach((to, from, next) => {
  const routeName = to.name as string
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') return next()
  if (PUBLIC_ROUTES.includes(routeName)) return next()

  const bookedFresh = isFresh('os_booked_at', BOOKED_TTL_MS)
  const disqFresh   = isFresh('os_disq_at',   DISQ_TTL_MS)

  if (routeName === 'booked') {
    if (!bookedFresh) return next({ name: 'funnel' })
    return next()
  }

  if (bookedFresh) {
    return next({ name: 'booked' })
  }

  if (disqFresh && ['booking', 'booked'].includes(routeName)) {
    return next({ name: 'no-space' })
  }

  if (routeName === 'no-space' && !disqFresh) {
    return next({ name: 'funnel' })
  }

  next()
})

export default router
