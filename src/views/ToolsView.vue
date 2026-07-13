<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Herramientas ──────────────────────────────────────────────────────────────
const tools = [
  {
    id: 'metrics',
    num: '01',
    name: 'Bakano Metrics',
    tagline: 'Inteligencia de datos en tiempo real',
    description:
      'Visualiza el rendimiento de tus campañas, ventas y audiencias desde un solo lugar. Dashboards interactivos construidos sobre tus datos reales.',
    tags: ['Analytics', 'Dashboards', 'Tiempo real'],
    url: 'https://metrics.bakano.ec',
    urlLabel: 'metrics.bakano.ec',
    gradient: 'linear-gradient(135deg, #e6285c 0%, #85529c 100%)',
    glowColor: 'rgba(230, 40, 92, 0.18)',
    icon: `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
      <line x1="6" y1="20" x2="6" y2="14"/>
    </svg>`,
  },
]

const heroRef = ref<HTMLElement | null>(null)
const titleRef = ref<HTMLElement | null>(null)

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })

  // Hero entrance
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  tl.from('.tools-hero__eyebrow', { y: 20, opacity: 0, duration: 0.6, delay: 0.1 })
    .from('.tools-hero__title', { y: 60, opacity: 0, duration: 0.75 }, '-=0.3')
    .from('.tools-hero__sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
    .from('.tools-hero__line', { scaleX: 0, duration: 0.7, transformOrigin: 'left' }, '-=0.4')

  // Cards scroll reveal
  gsap.from('.tool-card', {
    scrollTrigger: {
      trigger: '.tools-grid',
      start: 'top 80%',
    },
    y: 80,
    opacity: 0,
    stagger: 0.18,
    duration: 0.9,
    ease: 'power3.out',
  })

  // Floating glow
  gsap.to('.tools-hero__glow', {
    y: -20,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut',
  })
})

const openTool = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <div class="tools-page">

    <!-- ── Hero ──────────────────────────────────────────────────────────── -->
    <section class="tools-hero" ref="heroRef">
      <div class="tools-hero__glow" aria-hidden="true" />
      <div class="tools-hero__glow tools-hero__glow--2" aria-hidden="true" />

      <div class="tools-hero__inner">
        <p class="tools-hero__eyebrow">
          <span class="tools-hero__eyebrow-dot" aria-hidden="true" />
          Ecosistema Bakano
        </p>

        <h1 class="tools-hero__title" ref="titleRef">
          HERRAMIENTAS
        </h1>

        <div class="tools-hero__line" aria-hidden="true" />

        <p class="tools-hero__sub">
          Plataformas construidas para que tomes decisiones con datos,<br class="d-br" />
          no con suposiciones.
        </p>
      </div>

      <div class="tools-hero__scroll-hint" aria-hidden="true">
        <span>Explorar</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </section>

    <!-- ── Grid de herramientas ───────────────────────────────────────────── -->
    <section class="tools-grid-section">
      <div class="tools-grid">

        <article
          v-for="tool in tools"
          :key="tool.id"
          class="tool-card"
          tabindex="0"
          :aria-label="`Abrir ${tool.name}`"
          @click="openTool(tool.url)"
          @keydown.enter="openTool(tool.url)"
        >
          <!-- Glow de fondo -->
          <div class="tool-card__glow" :style="{ background: tool.glowColor }" aria-hidden="true" />

          <!-- Header de la card -->
          <div class="tool-card__header">
            <div class="tool-card__num">{{ tool.num }}</div>
            <div class="tool-card__icon" v-html="tool.icon" aria-hidden="true" />
          </div>

          <!-- Info principal -->
          <div class="tool-card__body">
            <p class="tool-card__tagline">{{ tool.tagline }}</p>
            <h2 class="tool-card__name">{{ tool.name }}</h2>
            <p class="tool-card__desc">{{ tool.description }}</p>
          </div>

          <!-- Tags -->
          <div class="tool-card__tags">
            <span v-for="tag in tool.tags" :key="tag" class="tool-card__tag">{{ tag }}</span>
          </div>

          <!-- Footer / CTA -->
          <div class="tool-card__footer">
            <span class="tool-card__url">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {{ tool.urlLabel }}
            </span>
            <span class="tool-card__cta">
              Abrir plataforma
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
          </div>

          <!-- Barra de gradiente inferior -->
          <div class="tool-card__bar" :style="{ background: tool.gradient }" aria-hidden="true" />
        </article>

        <!-- Placeholder — próximamente -->
        <div class="tool-card tool-card--soon" aria-hidden="true">
          <div class="tool-card__soon-inner">
            <div class="tool-card__soon-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
              </svg>
            </div>
            <p class="tool-card__soon-label">Próximamente</p>
            <p class="tool-card__soon-sub">Nuevas herramientas en desarrollo</p>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

$dark: #0b0815;
$dark2: #11091f;

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────
.tools-page {
  background: $dark;
  min-height: 100vh;
  color: colors.$white;
  margin-top: -56px;
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────────────────────────────────────
.tools-hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 80px 24px 120px;

  &__glow {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;

    // Glow 1 — rosa, arriba-derecha
    width: 600px;
    height: 600px;
    top: -120px;
    right: -160px;
    background: radial-gradient(
      circle,
      rgba(colors.$BAKANO-PINK, 0.12) 0%,
      rgba(colors.$BAKANO-PURPLE, 0.06) 50%,
      transparent 70%
    );

    &--2 {
      // Glow 2 — púrpura, abajo-izquierda
      width: 400px;
      height: 400px;
      top: auto;
      bottom: 0;
      left: -80px;
      right: auto;
      background: radial-gradient(
        circle,
        rgba(colors.$BAKANO-PURPLE, 0.1) 0%,
        transparent 65%
      );
    }
  }

  &__inner {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 900px;
  }

  &__eyebrow {
    @include fonts.accent-font(500);
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: rgba(colors.$BAKANO-PINK, 0.8);
    margin: 0 0 28px;
  }

  &__eyebrow-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: colors.$BAKANO-PINK;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  &__title {
    @include fonts.heading-font(900);
    font-size: clamp(1.8rem, 9vw, 6.5rem);
    text-transform: uppercase;
    letter-spacing: -0.04em;
    line-height: 1;
    margin: 0 0 32px;
    background: colors.$QS-NAVY;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  &__line {
    width: 60px;
    height: 2px;
    background: colors.$QS-NAVY;
    margin: 0 auto 28px;
    border-radius: 2px;
  }

  &__sub {
    @include fonts.body-font(400);
    font-size: clamp(0.95rem, 2.5vw, 1.15rem);
    color: rgba(colors.$white, 0.55);
    margin: 0;
    line-height: 1.7;

    .d-br {
      @media (max-width: 640px) {
        display: none;
      }
    }
  }

  &__scroll-hint {
    position: absolute;
    bottom: 36px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    span {
      @include fonts.interface-font(500);
      font-size: 0.65rem;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      color: rgba(colors.$white, 0.3);
    }

    svg {
      color: rgba(colors.$BAKANO-PINK, 0.5);
      animation: bounce-down 2s ease-in-out infinite;
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// GRID SECTION
// ─────────────────────────────────────────────────────────────────────────────
.tools-grid-section {
  padding: 0 24px 120px;
  background: $dark;
}

.tools-grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 24px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOL CARD
// ─────────────────────────────────────────────────────────────────────────────
.tool-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 24px;
  padding: 36px 32px 28px;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition:
    border-color 0.35s ease,
    transform 0.35s ease,
    box-shadow 0.35s ease;

  &:hover {
    border-color: rgba(colors.$BAKANO-PINK, 0.3);
    transform: translateY(-6px);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(colors.$BAKANO-PINK, 0.08) inset;

    .tool-card__glow {
      opacity: 1;
    }

    .tool-card__cta svg {
      transform: translateX(4px);
    }

    .tool-card__bar {
      opacity: 1;
      transform: scaleX(1);
    }
  }

  &__glow {
    position: absolute;
    inset: -40px;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.5s ease;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }

  &__num {
    @include fonts.accent-font(700);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: rgba(colors.$BAKANO-PINK, 0.5);
  }

  &__icon {
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    position: relative;
    z-index: 1;
  }

  &__tagline {
    @include fonts.accent-font(500);
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: rgba(colors.$BAKANO-PINK, 0.7);
    margin: 0;
  }

  &__name {
    @include fonts.heading-font(800);
    font-size: clamp(1.6rem, 4vw, 2.2rem);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: colors.$white;
    margin: 0;
    line-height: 1;
  }

  &__desc {
    @include fonts.body-font(400);
    font-size: 0.88rem;
    color: rgba(255, 255, 255, 0.5);
    margin: 8px 0 0;
    line-height: 1.65;
  }

  &__tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    position: relative;
    z-index: 1;
  }

  &__tag {
    @include fonts.interface-font(500);
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: rgba(255, 255, 255, 0.4);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 100px;
    padding: 4px 12px;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 16px;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
    position: relative;
    z-index: 1;
  }

  &__url {
    @include fonts.accent-font(400);
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.3);
  }

  &__cta {
    @include fonts.interface-font(600);
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.72rem;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: colors.$BAKANO-PINK;

    svg {
      transition: transform 0.25s ease;
    }
  }

  &__bar {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    opacity: 0;
    transform: scaleX(0);
    transform-origin: left;
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  // ── Placeholder ────────────────────────────────────────────────────────────
  &--soon {
    background: rgba(255, 255, 255, 0.015);
    border-style: dashed;
    cursor: default;
    min-height: 280px;
    align-items: center;
    justify-content: center;

    &:hover {
      border-color: rgba(255, 255, 255, 0.12);
      transform: none;
      box-shadow: none;
    }
  }

  &__soon-inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;
  }

  &__soon-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.07);
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.2);
  }

  &__soon-label {
    @include fonts.heading-font(700);
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.2);
    margin: 0;
  }

  &__soon-sub {
    @include fonts.body-font(400);
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.12);
    margin: 0;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.7); }
}

@keyframes bounce-down {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(6px); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .tools-hero__eyebrow-dot { animation: none; }
  .tools-hero__scroll-hint svg { animation: none; }
}
</style>
