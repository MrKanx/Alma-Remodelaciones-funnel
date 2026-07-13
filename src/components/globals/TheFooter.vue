<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import bakanoLogo from '../../assets/logos/bakano-light.png'

const currentYear = new Date().getFullYear()

const seriousRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        seriousRef.value?.classList.add('is-visible')
        observer?.disconnect()
      }
    },
    { threshold: 0.5 },
  )
  if (seriousRef.value) observer.observe(seriousRef.value)
})

onUnmounted(() => observer?.disconnect())

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/bakanoec/posts/?feedView=all',
    // prettier-ignore
    svg: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/bakano.ec/',
    // prettier-ignore
    svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  },
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/bakano.ec',
    // prettier-ignore
    svg: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@bakano.ec?lang=en',
    // prettier-ignore
    svg: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/593984934039',
    // prettier-ignore
    svg: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741 1.052 1.001-3.867-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z',
  },
]

const services = [
  'Desarrollo Web',
  'Estrategia de Datos',
  'Estrategia de Growth',
  'Consultoría Tech',
  'UI/UX Design',
]

const openWhatsApp = () =>
  window.open('https://wa.me/593984934039', '_blank', 'noopener,noreferrer')
</script>

<template>
  <footer class="footer">

    <!-- ════════════════════════════════════════════════════
         CTA SECTION — invitación de conversión antes del footer
         ════════════════════════════════════════════════════ -->
    <section class="footer__cta" aria-label="Llamada a la acción">
      <div class="footer__cta-glow" aria-hidden="true" />
      <div class="footer__inner">
        <p class="footer__cta-label">¿Hablamos?</p>
        <h2 class="footer__cta-title">
          ¿Listo para llevar tu<br>
          <span class="footer__cta-gradient">negocio al siguiente nivel?</span>
        </h2>
        <p class="footer__cta-sub">
          Cuéntanos tu reto. Nuestro equipo está listo para convertirlo en resultados.
        </p>

        <!-- Énfasis "Lo decimos en serio" -->
        <div class="footer__cta-serious" ref="seriousRef">
          <span class="footer__cta-serious-icon" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
          <span class="footer__cta-serious-text">Lo decimos en serio</span>
          <span class="footer__cta-serious-divider" aria-hidden="true" />
          <span class="footer__cta-serious-sub">Sin compromisos. Solo resultados.</span>
        </div>

        <div class="footer__cta-actions">
          <button class="footer__cta-btn footer__cta-btn--primary" @click="openWhatsApp">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741 1.052 1.001-3.867-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
            </svg>
            Escríbenos por WhatsApp
          </button>
          <a class="footer__cta-btn footer__cta-btn--ghost" href="mailto:dquimi@bakano.ec">
            dquimi@bakano.ec
          </a>
        </div>
      </div>
    </section>

    <!-- ════════════════════════════════════════════════════
         GRID — Logo, contacto, servicios, redes
         ════════════════════════════════════════════════════ -->
    <div class="footer__grid-wrap">
      <div class="footer__inner footer__grid">

        <!-- Columna 1: Logo + tagline -->
        <div class="footer__col footer__col--brand">
          <RouterLink to="/" class="footer__logo-link" aria-label="Ir al inicio">
            <img :src="bakanoLogo" alt="Bakano" class="footer__logo" />
          </RouterLink>
          <p class="footer__tagline">
            Transformamos datos, marketing y tecnología en resultados reales para tu negocio.
          </p>
          <!-- Social icons -->
          <div class="footer__social" role="list" aria-label="Redes sociales">
            <a
              v-for="s in socialLinks"
              :key="s.name"
              :href="s.url"
              :aria-label="s.name"
              class="footer__social-link"
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path :d="s.svg" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Columna 2: Contacto -->
        <div class="footer__col">
          <h3 class="footer__col-title">Contacto</h3>
          <ul class="footer__list" role="list">
            <li>
              <a href="mailto:dquimi@bakano.ec" class="footer__list-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
                dquimi@bakano.ec
              </a>
            </li>
            <li>
              <a href="tel:+593984934039" class="footer__list-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 6.29 6.29l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +593 98 493 4039
              </a>
            </li>
            <li>
              <span class="footer__list-text">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Guayaquil, Ecuador
              </span>
            </li>
          </ul>
        </div>

        <!-- Columna 3: Servicios -->
        <div class="footer__col">
          <h3 class="footer__col-title">Servicios</h3>
          <ul class="footer__list" role="list">
            <li v-for="service in services" :key="service">
              <span class="footer__list-text footer__list-text--service">
                <span class="footer__list-dot" aria-hidden="true" />
                {{ service }}
              </span>
            </li>
          </ul>
        </div>

        <!-- Columna 4: Legal -->
        <div class="footer__col">
          <h3 class="footer__col-title">Legal</h3>
          <ul class="footer__list" role="list">
            <li>
              <RouterLink to="/politicas-privacidad" class="footer__list-link">
                Política de Privacidad
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/aviso-legal" class="footer__list-link">
                Aviso Legal
              </RouterLink>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- ════════════════════════════════════════════════════
         BOTTOM BAR
         ════════════════════════════════════════════════════ -->
    <div class="footer__bottom">
      <div class="footer__inner footer__bottom-inner">
        <p class="footer__copyright">
          © {{ currentYear }} Bakano — Todos los derechos reservados.
        </p>
        <p class="footer__made">
          Hecho con
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-label="amor" role="img" class="footer__heart">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          en Ecuador · por
          <a
            href="https://yeyo.dev/"
            target="_blank"
            rel="noopener noreferrer"
            class="footer__yeyo"
            aria-label="Sitio de yeyo.dev, CTO de Bakano"
          >yeyo.dev</a>
        </p>
      </div>
    </div>

  </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

// ── Variables locales ─────────────────────────────────────────────────────────
$footer-bg: #09060f;
$border: rgba(255, 255, 255, 0.06);
$text-muted: rgba(255, 255, 255, 0.42);
$text-body: rgba(255, 255, 255, 0.65);

// ── Contenedor centrado reutilizable ─────────────────────────────────────────
.footer__inner {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: 24px;

  @media (max-width: 600px) {
    padding-inline: 16px;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER RAÍZ
// ─────────────────────────────────────────────────────────────────────────────
.footer {
  background-color: $footer-bg;
  color: colors.$white;
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────────────────────────────────────
.footer__cta {
  position: relative;
  padding: 100px 0 88px;
  border-bottom: 1px solid $border;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 72px 0 64px;
  }

  // Glow decorativo
  &-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    background: radial-gradient(ellipse 60% 50% at 50% 50%,
        rgba(colors.$BAKANO-PINK, 0.08) 0%,
        rgba(colors.$BAKANO-PURPLE, 0.05) 40%,
        transparent 70%);
    pointer-events: none;
  }

  .footer__inner {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  &-label {
    @include fonts.accent-font(700);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 5px;
    color: colors.$BAKANO-PINK;
    margin-bottom: 20px;
  }

  &-title {
    @include fonts.heading-font(800);
    font-size: clamp(2.4rem, 5vw, 4.4rem);
    text-transform: uppercase;
    letter-spacing: -0.025em;
    line-height: 1.06;
    color: colors.$white;
    margin: 0 0 20px;

    @media (max-width: 600px) {
      font-size: clamp(2rem, 8vw, 3rem);

      br {
        display: none;
      }
    }
  }

  &-gradient {
    background: colors.$QS-NAVY;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &-sub {
    @include fonts.body-font(400);
    font-size: 1rem;
    color: $text-body;
    line-height: 1.7;
    margin: 0 0 44px;
    max-width: 480px;
    margin-inline: auto;
    margin-bottom: 44px;

    @media (max-width: 600px) {
      font-size: 0.92rem;
    }
  }

  // ── Énfasis "Lo decimos en serio" ─────────────────────────────────────────
  &-serious {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin: 0 auto 40px;
    padding: 10px 20px;
    border-radius: 50px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    opacity: 0;
    transform: translateY(-20px) scale(0.92);
    transition: opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);

    &.is-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: colors.$QS-NAVY;
      color: colors.$white;
      flex-shrink: 0;
    }

    &-text {
      @include fonts.interface-font(600);
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: colors.$white;
      white-space: nowrap;
    }

    &-divider {
      width: 1px;
      height: 14px;
      background: rgba(255, 255, 255, 0.15);
      flex-shrink: 0;
    }

    &-sub {
      @include fonts.interface-font(400);
      font-size: 0.72rem;
      color: rgba(255, 255, 255, 0.4);
      white-space: nowrap;

      @media (max-width: 480px) {
        display: none;
      }
    }
  }

  &-actions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
  }

  &-btn {
    @include fonts.interface-font(600);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.82rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border-radius: 50px;
    padding: 14px 28px;
    cursor: pointer;
    text-decoration: none;
    transition: transform 0.2s ease, box-shadow 0.25s ease, opacity 0.2s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }

    // Botón principal: gradiente
    &--primary {
      background: colors.$QS-NAVY;
      border: none;
      color: colors.$white;
      box-shadow: 0 8px 32px rgba(colors.$BAKANO-PINK, 0.25);

      &:hover {
        box-shadow: 0 16px 48px rgba(colors.$BAKANO-PINK, 0.4);
      }
    }

    // Botón fantasma: borde
    &--ghost {
      background: transparent;
      border: 1px solid $border;
      color: $text-body;

      &:hover {
        border-color: rgba(255, 255, 255, 0.2);
        color: colors.$white;
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GRID DE COLUMNAS
// ─────────────────────────────────────────────────────────────────────────────
.footer__grid-wrap {
  padding: 64px 0 56px;
  border-bottom: 1px solid $border;
}

.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 48px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
}

// ── Columna ───────────────────────────────────────────────────────────────────
.footer__col {
  display: flex;
  flex-direction: column;
  gap: 0;

  &--brand {
    @media (max-width: 1024px) {
      grid-column: 1 / -1;
    }

    @media (max-width: 600px) {
      grid-column: 1;
    }
  }
}

.footer__col-title {
  @include fonts.interface-font(600);
  font-size: 0.68rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: rgba(255, 255, 255, 0.35);
  margin: 0 0 20px;
}

// ── Logo + tagline ────────────────────────────────────────────────────────────
.footer__logo-link {
  display: inline-flex;
  margin-bottom: 16px;

  &:hover .footer__logo {
    opacity: 0.8;
  }
}

.footer__logo {
  height: 26px;
  width: auto;
  transition: opacity 0.2s ease;
}

.footer__tagline {
  @include fonts.body-font(400);
  font-size: 0.88rem;
  color: $text-body;
  line-height: 1.72;
  margin: 0 0 24px;
  max-width: 340px;
}

// ── Social icons ──────────────────────────────────────────────────────────────
.footer__social {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid $border;
  color: $text-muted;
  text-decoration: none;
  transition: color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;

  &:hover {
    color: colors.$white;
    border-color: rgba(colors.$BAKANO-PINK, 0.4);
    background: rgba(colors.$BAKANO-PINK, 0.1);
    box-shadow: 0 0 16px rgba(colors.$BAKANO-PINK, 0.2);
  }
}

// ── Listas de items ───────────────────────────────────────────────────────────
.footer__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer__list-link {
  @include fonts.interface-font(400);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: $text-body;
  text-decoration: none;
  transition: color 0.2s ease;

  svg {
    flex-shrink: 0;
    opacity: 0.5;
  }

  &:hover {
    color: colors.$white;

    svg {
      opacity: 1;
    }
  }
}

.footer__list-text {
  @include fonts.interface-font(400);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: $text-body;

  svg {
    flex-shrink: 0;
    opacity: 0.5;
  }

  &--service {
    gap: 10px;
    color: $text-body;
    cursor: default;
  }
}

.footer__list-dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: colors.$QS-NAVY;
  flex-shrink: 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// BOTTOM BAR
// ─────────────────────────────────────────────────────────────────────────────
.footer__bottom {
  padding: 20px 0;
}

.footer__bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}

.footer__copyright,
.footer__made {
  @include fonts.interface-font(400);
  font-size: 0.75rem;
  color: $text-muted;
  margin: 0;
}

.footer__made {
  display: flex;
  align-items: center;
  gap: 5px;
}

.footer__heart {
  color: colors.$BAKANO-PINK;
  flex-shrink: 0;
}

.footer__yeyo {
  @include fonts.interface-font(600);
  color: $text-muted;
  text-decoration: none;
  background: colors.$QS-NAVY;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
}

@keyframes cta-drop {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.92);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
