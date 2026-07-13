<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { gsap } from 'gsap'

import bakanoLogo from '../../assets/logos/bakano-light.png'

// ── Estado ────────────────────────────────────────────────────────────────────
const isMenuOpen = ref(false)
const isScrolled = ref(false)
const router = useRouter()
const route = useRoute()

// Refs de accesibilidad
const toggleBtnRef = ref<HTMLButtonElement | null>(null)
const mobileMenuRef = ref<HTMLElement | null>(null)

// ── Datos de navegación ────────────────────────────────────────────────────────
const navLinks = [
  { id: 'inicio', num: '01', label: 'Inicio', section: 'inicio' },
  { id: 'servicios', num: '02', label: 'Servicios', section: 'servicios' },
  { id: 'nosotros', num: '03', label: 'Nosotros', section: 'nosotros' },
  { id: 'testimonios', num: '04', label: 'Testimonios', section: 'testimonios' },
]

const toolsLink = { id: 'herramientas', num: '05', label: 'Herramientas', route: '/herramientas' }

// ── Scroll / nav helpers ───────────────────────────────────────────────────────
const handleScroll = () => { isScrolled.value = window.scrollY > 30 }

const scrollToSection = async (sectionId: string) => {
  if (route.name !== 'home') {
    await router.push('/')
    await nextTick()
    setTimeout(() => {
      const el = document.getElementById(sectionId)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' })
    }, 100)
  } else {
    const el = document.getElementById(sectionId)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' })
  }
  closeMenu()
}

const openWhatsApp = () => {
  window.open('https://wa.me/593984934039', '_blank', 'noopener,noreferrer')
  closeMenu()
}

// ── Menú móvil ────────────────────────────────────────────────────────────────
const toggleMenu = async () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    await nextTick()
    mobileMenuRef.value?.querySelector<HTMLElement>('a, button')?.focus()
  } else {
    toggleBtnRef.value?.focus()
  }
}

const closeMenu = () => {
  if (!isMenuOpen.value) return
  isMenuOpen.value = false
  toggleBtnRef.value?.focus()
}

// Click fuera
const handleClickOutside = (e: MouseEvent) => {
  if (!isMenuOpen.value) return
  const t = e.target as Node
  if (!mobileMenuRef.value?.contains(t) && !toggleBtnRef.value?.contains(t)) closeMenu()
}

// Teclado
const handleKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeMenu() }

// Bloqueo de scroll + animaciones GSAP al abrir el overlay
watch(isMenuOpen, async (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''

  if (open) {
    await nextTick()
    // Stagger en los links del overlay
    gsap.from('.nav__overlay-link', {
      x: 48,
      opacity: 0,
      stagger: 0.07,
      duration: 0.55,
      ease: 'power3.out',
      delay: 0.2,
    })
    gsap.from('.nav__overlay-cta', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power3.out',
      delay: 0.5,
    })
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="nav">
      <div class="nav__inner">

        <!-- ── Logo ─────────────────────────────────── -->
        <RouterLink to="/" class="nav__logo" aria-label="Ir al inicio">
          <img :src="bakanoLogo" alt="Bakano" class="nav__logo-img" />
        </RouterLink>

        <!-- ── Links desktop ─────────────────────────── -->
        <ul class="nav__links" role="list">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="`#${link.section}`"
              class="nav__link"
              @click.prevent="scrollToSection(link.section)"
            >{{ link.label }}</a>
          </li>
          <li>
            <RouterLink
              :to="toolsLink.route"
              class="nav__link nav__link--tools"
              @click="closeMenu"
            >{{ toolsLink.label }}</RouterLink>
          </li>
        </ul>

        <!-- ── CTA desktop ───────────────────────────── -->
        <button class="nav__cta" @click="scrollToSection('contacto')" aria-label="Ir al formulario de contacto">
          <span>Contáctanos</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- ── Hamburger (mobile) ────────────────────── -->
        <button
          ref="toggleBtnRef"
          class="nav__hamburger"
          :class="{ 'is-open': isMenuOpen }"
          @click="toggleMenu"
          :aria-expanded="isMenuOpen"
          aria-controls="mobile-overlay"
          aria-label="Abrir menú de navegación"
        >
          <span class="nav__hamburger-line" />
          <span class="nav__hamburger-line" />
          <span class="nav__hamburger-line" />
        </button>

      </div>
    </div>

    <!-- ════════════════════════════════════════════════
         OVERLAY MÓVIL — full-screen, desliza desde la derecha
         ════════════════════════════════════════════════ -->
    <Teleport to="body">
    <Transition name="overlay">
      <div
        v-show="isMenuOpen"
        id="mobile-overlay"
        ref="mobileMenuRef"
        class="nav__overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <!-- Barra superior del overlay -->
        <div class="nav__overlay-bar">
          <img :src="bakanoLogo" alt="Bakano" class="nav__overlay-logo" />
          <button
            class="nav__overlay-close"
            @click="closeMenu"
            aria-label="Cerrar menú"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Separador -->
        <div class="nav__overlay-sep" aria-hidden="true" />

        <!-- Links numerados -->
        <nav class="nav__overlay-nav" aria-label="Navegación móvil">
          <a
            v-for="link in navLinks"
            :key="link.id"
            :href="`#${link.section}`"
            class="nav__overlay-link"
            @click.prevent="scrollToSection(link.section)"
          >
            <span class="nav__overlay-num" aria-hidden="true">{{ link.num }}</span>
            <span class="nav__overlay-label">{{ link.label }}</span>
          </a>

          <!-- Herramientas — navega a página -->
          <RouterLink
            :to="toolsLink.route"
            class="nav__overlay-link nav__overlay-link--tools"
            @click="closeMenu"
          >
            <span class="nav__overlay-num" aria-hidden="true">{{ toolsLink.num }}</span>
            <span class="nav__overlay-label">{{ toolsLink.label }}</span>
            <span class="nav__overlay-badge" aria-hidden="true">Nuevo</span>
          </RouterLink>
        </nav>

        <!-- CTA Formulario -->
        <button class="nav__overlay-cta" @click="scrollToSection('contacto')">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          <span>Contáctanos</span>
        </button>

        <!-- Decoración de fondo -->
        <div class="nav__overlay-glow" aria-hidden="true" />
      </div>
    </Transition>
    </Teleport>

  </header>
</template>

<style lang="scss" scoped>
@use 'sass:color';
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

// ── Variables ─────────────────────────────────────────────────────────────────
$header-h: 56px;
$bp: 768px;
$dark-bg: #0b0815;

// ─────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 900;
  height: $header-h;
  // Transparente sobre el hero (que usa margin-top: -56px)
  background: transparent;
  transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;

  // Cuando el usuario ha hecho scroll
  &--scrolled {
    background: rgba($dark-bg, 0.88);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    box-shadow: 0 1px 40px rgba(0, 0, 0, 0.3);
  }
}

// ── Nav container ─────────────────────────────────────────────────────────────
.nav {
  height: 100%;

  &__inner {
    max-width: 1200px;
    height: 100%;
    margin-inline: auto;
    padding-inline: 24px;
    display: flex;
    align-items: center;
    gap: 40px;

    @media (max-width: $bp) {
      padding-inline: 16px;
      gap: 0;
    }
  }

  // ── Logo ──────────────────────────────────────────────────────────────────
  &__logo {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    text-decoration: none;

    &-img {
      height: 28px;
      width: auto;
      filter: brightness(1);
      transition: opacity 0.25s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  // ── Links desktop ─────────────────────────────────────────────────────────
  &__links {
    display: flex;
    align-items: center;
    gap: 32px;
    list-style: none;
    margin: 0 auto 0 40px;
    padding: 0;

    @media (max-width: $bp) {
      display: none;
    }
  }

  &__link {
    @include fonts.interface-font(500);
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    padding: 4px 0;
    position: relative;
    transition: color 0.25s ease;

    // Underline gradiente en hover
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 1px;
      background: colors.$QS-NAVY;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.25s ease;
    }

    &:hover {
      color: colors.$white;

      &::after {
        transform: scaleX(1);
      }
    }

    // Herramientas — estilo especial
    &--tools {
      color: colors.$BAKANO-PINK;
      border: 1px solid rgba(colors.$BAKANO-PINK, 0.3);
      border-radius: 100px;
      padding: 4px 12px;

      &::after {
        display: none;
      }

      &:hover,
      &.router-link-active {
        color: colors.$white;
        background: colors.$BAKANO-PINK;
        border-color: colors.$BAKANO-PINK;
      }
    }
  }

  // ── CTA desktop ───────────────────────────────────────────────────────────
  &__cta {
    @include fonts.interface-font(600);
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.70rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: colors.$white;
    background: transparent;
    border: 1px solid rgba(colors.$BAKANO-PINK, 0.45);
    border-radius: 24px;
    padding: 7px 16px;
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;
    transition:
      background 0.25s ease,
      border-color 0.25s ease,
      box-shadow 0.25s ease;

    svg {
      transition: transform 0.25s ease;
    }

    &:hover {
      background: colors.$BAKANO-PINK;
      border-color: colors.$BAKANO-PINK;
      box-shadow: 0 0 24px rgba(colors.$BAKANO-PINK, 0.35);

      svg {
        transform: translateX(3px);
      }
    }

    @media (max-width: $bp) {
      display: none;
    }
  }

  // ── Hamburger ─────────────────────────────────────────────────────────────
  &__hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 5px;
    width: 44px;
    height: 44px;
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    @media (max-width: $bp) {
      display: flex;
    }

    &-line {
      display: block;
      height: 1.5px;
      background: rgba(255, 255, 255, 0.85);
      border-radius: 1px;
      transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.2s ease, width 0.3s ease;

      &:nth-child(1) {
        width: 22px;
      }

      &:nth-child(2) {
        width: 16px;
      }

      // más corta → detalle visual
      &:nth-child(3) {
        width: 22px;
      }
    }

    &.is-open {
      .nav__hamburger-line {
        &:nth-child(1) {
          width: 22px;
          transform: rotate(45deg) translate(5px, 4.5px);
        }

        &:nth-child(2) {
          opacity: 0;
          transform: scaleX(0);
        }

        &:nth-child(3) {
          width: 22px;
          transform: rotate(-45deg) translate(5px, -4.5px);
        }
      }
    }
  }

  // ── Overlay móvil ─────────────────────────────────────────────────────────
  &__overlay {
    position: fixed;
    inset: 0;
    z-index: 901;
    background: $dark-bg;
    display: flex;
    flex-direction: column;
    padding: 0 0 40px;
    overflow-x: hidden;
    overflow-y: auto;

    // Gradiente decorativo
    &-glow {
      position: absolute;
      bottom: 0;
      right: -60px;
      width: 320px;
      height: 320px;
      background: radial-gradient(circle,
          rgba(colors.$BAKANO-PINK, 0.09) 0%,
          rgba(colors.$BAKANO-PURPLE, 0.05) 50%,
          transparent 70%);
      pointer-events: none;
      border-radius: 50%;
    }
  }

  // Barra superior del overlay
  &__overlay-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    height: $header-h;
    flex-shrink: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  &__overlay-logo {
    height: 26px;
    width: auto;
  }

  &__overlay-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.7);
    transition: background 0.2s ease, color 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      color: colors.$white;
    }
  }

  // Separador
  &__overlay-sep {
    display: none; // ya está la border-bottom en overlay-bar
  }

  // Nav links del overlay
  &__overlay-nav {
    display: flex;
    flex-direction: column;
    padding: 40px 32px 0;
    flex: 1;
    gap: 4px;
  }

  &__overlay-link {
    display: flex;
    align-items: baseline;
    gap: 20px;
    text-decoration: none;
    padding: 18px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    position: relative;
    overflow: hidden;

    // Línea de hover a la izquierda
    &::before {
      content: '';
      position: absolute;
      left: -32px;
      top: 0;
      bottom: 0;
      width: 3px;
      background: colors.$QS-NAVY;
      transition: left 0.3s ease;
    }

    &:hover::before,
    &.router-link-active::before {
      left: 0;
    }

    &:hover .nav__overlay-label,
    &.router-link-active .nav__overlay-label {
      color: colors.$white;
    }

    &:hover .nav__overlay-num,
    &.router-link-active .nav__overlay-num {
      color: colors.$BAKANO-PINK;
    }

    // Herramientas — badge "Nuevo"
    &--tools {
      align-items: center;
    }
  }

  &__overlay-badge {
    @include fonts.interface-font(700);
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: colors.$white;
    background: colors.$QS-NAVY;
    border-radius: 100px;
    padding: 2px 8px;
    margin-left: auto;
    flex-shrink: 0;
  }

  &__overlay-num {
    @include fonts.accent-font(600);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(colors.$BAKANO-PINK, 0.5);
    transition: color 0.25s ease;
    flex-shrink: 0;
    padding-top: 4px;
  }

  &__overlay-label {
    @include fonts.heading-font(700);
    font-size: clamp(2rem, 8vw, 2.8rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: rgba(255, 255, 255, 0.75);
    line-height: 1;
    transition: color 0.25s ease;
  }

  // CTA WhatsApp del overlay
  &__overlay-cta {
    @include fonts.interface-font(600);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 40px 32px 0;
    padding: 16px 24px;
    background: colors.$QS-NAVY;
    border: none;
    border-radius: 14px;
    color: colors.$white;
    font-size: 0.88rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: opacity 0.25s ease, transform 0.2s ease, box-shadow 0.25s ease;

    &:hover {
      opacity: 0.92;
      transform: translateY(-2px);
      box-shadow: 0 12px 32px rgba(colors.$BAKANO-PINK, 0.35);
    }

    &:active {
      transform: translateY(0);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TRANSICIÓN del overlay (desliza desde la derecha)
// ─────────────────────────────────────────────────────────────────────────────
.overlay-enter-from,
.overlay-leave-to {
  transform: translateX(100%);
}

.overlay-enter-active {
  transition: transform 0.45s cubic-bezier(0.76, 0, 0.24, 1);
}

.overlay-leave-active {
  transition: transform 0.35s cubic-bezier(0.76, 0, 0.24, 1);
}

// ─────────────────────────────────────────────────────────────────────────────
// Respeto a reduce-motion
// ─────────────────────────────────────────────────────────────────────────────
@media (prefers-reduced-motion: reduce) {

  .overlay-enter-active,
  .overlay-leave-active {
    transition: opacity 0.2s ease;
  }

  .overlay-enter-from,
  .overlay-leave-to {
    transform: none;
    opacity: 0;
  }
}
</style>
