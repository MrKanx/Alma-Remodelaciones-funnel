<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const scrollY      = ref(0)
const docHeight    = ref(1)
const activeSection = ref(0)

const sections = [
  { id: 'inicio',      label: 'Inicio' },
  { id: 'servicios',   label: 'Servicios' },
  { id: 'testimonios', label: 'Testimonios' },
  { id: 'nosotros',    label: 'Equipo' },
  { id: 'contacto',    label: 'Contacto' },
]

// Flecha: oculta en el primer tramo (el hero ya tiene la suya)
// y también cuando estamos casi al final de la página.
const showArrow = computed(() => {
  const progress = scrollY.value / docHeight.value
  return scrollY.value > 80 && progress < 0.93
})

let ticking = false

const update = () => {
  scrollY.value  = window.scrollY
  docHeight.value = Math.max(
    1,
    document.documentElement.scrollHeight - window.innerHeight,
  )

  // Sección activa: la última cuyo top ya pasó el centro de la pantalla
  const mid = window.innerHeight * 0.5
  let active = 0
  sections.forEach((s, i) => {
    const el = document.getElementById(s.id)
    if (el && el.getBoundingClientRect().top <= mid) active = i
  })
  activeSection.value = active

  ticking = false
}

const onScroll = () => {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(update)
  }
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const scrollDown = () => {
  window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  update()
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <!-- ── Dots de navegación lateral (desktop) ──────────────────────── -->
  <nav class="scroll-guide" aria-label="Navegación de secciones">
    <ul class="scroll-guide__list">
      <li
        v-for="(section, i) in sections"
        :key="section.id"
        class="scroll-guide__item"
      >
        <button
          class="scroll-guide__dot"
          :class="{ 'is-active': activeSection === i }"
          @click="scrollTo(section.id)"
          :aria-label="section.label"
        />
        <span class="scroll-guide__label" aria-hidden="true">{{ section.label }}</span>
      </li>
    </ul>
  </nav>

  <!-- ── Flecha "seguir scrolleando" ───────────────────────────────── -->
  <Transition name="arrow-fade">
    <button
      v-if="showArrow"
      class="scroll-down-hint"
      @click="scrollDown"
      aria-label="Desplazarse hacia abajo"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <polyline points="6 9 12 15 18 9"/>
      </svg>
    </button>
  </Transition>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

// ── Contenedor lateral ────────────────────────────────────────────────────
.scroll-guide {
  position: fixed;
  right: 28px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 90;
  pointer-events: auto;

  // Ocultar en pantallas pequeñas (no hay espacio)
  @media (max-width: 768px) { display: none; }
}

.scroll-guide__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 22px;
  // Línea vertical entre dots
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 1px;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.1);
    pointer-events: none;
  }
}

.scroll-guide__item {
  position: relative;
  display: flex;
  align-items: center;
  // Dot queda sobre la línea
  z-index: 1;
}

// ── Dot ──────────────────────────────────────────────────────────────────
.scroll-guide__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.30);
  background: transparent;
  cursor: pointer;
  padding: 0;
  transition:
    background    0.3s ease,
    border-color  0.3s ease,
    box-shadow    0.3s ease,
    transform     0.3s ease;

  &.is-active {
    background: colors.$BAKANO-PINK;
    border-color: colors.$BAKANO-PINK;
    box-shadow:
      0 0 8px  rgba(colors.$BAKANO-PINK, 0.55),
      0 0 22px rgba(colors.$BAKANO-PINK, 0.22);
    transform: scale(1.4);
  }

  &:hover:not(.is-active) {
    background: rgba(255, 255, 255, 0.28);
    border-color: rgba(255, 255, 255, 0.55);
    transform: scale(1.15);
  }
}

// ── Label tooltip (aparece al hover del item) ─────────────────────────────
.scroll-guide__label {
  @include fonts.interface-font(500);
  position: absolute;
  right: calc(100% + 14px);
  white-space: nowrap;
  font-size: 0.66rem;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  opacity: 0;
  transform: translateX(8px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: none;
}

.scroll-guide__item:hover .scroll-guide__label {
  opacity: 1;
  transform: translateX(0);
}

// ── Flecha "scroll abajo" centrada en el bottom ───────────────────────────
.scroll-down-hint {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 90;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  color: rgba(255, 255, 255, 0.55);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: chevron-bounce 2s ease-in-out infinite;
  transition:
    border-color 0.3s ease,
    color        0.3s ease,
    background   0.3s ease;

  &:hover {
    border-color: rgba(colors.$BAKANO-PINK, 0.5);
    color: colors.$BAKANO-PINK;
    background: rgba(colors.$BAKANO-PINK, 0.08);
    animation-play-state: paused;
  }

  // En móvil lo ocultamos si hay superposición con otros elementos
  @media (max-width: 480px) {
    bottom: 20px;
    width: 36px;
    height: 36px;
  }
}

@keyframes chevron-bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(6px); }
}

// ── Transición de la flecha ───────────────────────────────────────────────
.arrow-fade-enter-active,
.arrow-fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.arrow-fade-enter-from,
.arrow-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}
</style>
