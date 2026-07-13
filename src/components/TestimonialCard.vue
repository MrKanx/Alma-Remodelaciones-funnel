<script setup lang="ts">
import type { PropType } from 'vue'

interface Testimonial {
  id: number
  name: string
  quote: string
  image: string
  videoUrl: string
}

const props = defineProps({
  testimonial: {
    type: Object as PropType<Testimonial>,
    required: true,
  },
})

const emit = defineEmits<{
  openVideo: [url: string]
}>()

const handleOpen = () => emit('openVideo', props.testimonial.videoUrl)
</script>

<template>
  <article class="t-card" @click="handleOpen" role="button" tabindex="0" @keydown.enter="handleOpen">

    <!-- ── Cuerpo: comilla decorativa + cita ── -->
    <div class="t-card__body">
      <span class="t-card__quote-mark" aria-hidden="true">&ldquo;</span>
      <p class="t-card__quote">"{{ testimonial.quote }}"</p>
    </div>

    <!-- ── Divisor ── -->
    <div class="t-card__divider" aria-hidden="true" />

    <!-- ── Footer: foto, nombre, botón ── -->
    <footer class="t-card__footer">
      <div class="t-card__avatar-wrap">
        <img
          class="t-card__avatar"
          :src="testimonial.image"
          :alt="testimonial.name"
          loading="lazy"
        />
      </div>

      <div class="t-card__author">
        <span class="t-card__name">{{ testimonial.name }}</span>
        <span class="t-card__cta-hint">Ver testimonio</span>
      </div>

      <button class="t-card__play" aria-label="Ver video testimonio">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z"/>
        </svg>
      </button>
    </footer>

    <!-- Borde superior gradiente (hover reveal) -->
    <div class="t-card__top-glow" aria-hidden="true" />
  </article>
</template>

<style lang="scss" scoped>
@use '../styles/fonts.modules.scss' as fonts;
@use '../styles/colorVariables.module.scss' as colors;

// ── Mixins internos ──────────────────────────────────────────────
$glass-bg:     rgba(12, 7, 22, 0.58);
$glass-border: rgba(255, 255, 255, 0.07);
$quote-color:  rgba(255, 255, 255, 0.80);

// ── Tarjeta ──────────────────────────────────────────────────────
.t-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 32px 28px 26px;
  border-radius: 18px;
  border: 1px solid $glass-border;
  background: $glass-bg;
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  cursor: pointer;
  outline: none;
  overflow: hidden;

  // Transición sólo para los efectos de hover (no para transform/opacity,
  // que los controla GSAP desde el wrapper padre)
  transition:
    border-color 0.35s ease,
    box-shadow   0.35s ease;

  @media (max-width: 768px) {
    padding: 28px 22px 22px;
    border-radius: 16px;
  }

  // ── Hover ────────────────────────────────────────────────────
  &:hover,
  &:focus-visible {
    border-color: rgba(colors.$BAKANO-PINK, 0.28);
    box-shadow:
      0 0 0 1px rgba(colors.$BAKANO-PINK, 0.15),
      0 28px 56px rgba(0, 0, 0, 0.5),
      0  8px 24px rgba(colors.$BAKANO-PINK, 0.10);

    .t-card__top-glow  { opacity: 1; }
    .t-card__play      { transform: scale(1.08); }
    .t-card__avatar    { transform: scale(1.06); }
    .t-card__quote-mark { opacity: 1; }
  }

  // ── Comilla decorativa ────────────────────────────────────────
  &__quote-mark {
    display: block;
    font-family: Georgia, serif;
    font-size: 4.5rem;
    line-height: 0.75;
    margin-bottom: 12px;
    // Gradiente como color de texto
    background: colors.$QS-NAVY;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    opacity: 0.85;
    transition: opacity 0.3s ease;
    user-select: none;
  }

  // ── Cuerpo / cita ─────────────────────────────────────────────
  &__body {
    flex: 1;
    margin-bottom: 24px;
  }

  &__quote {
    @include fonts.body-font(400);
    font-size: 0.98rem;
    color: $quote-color;
    line-height: 1.72;
    margin: 0;
    font-style: italic;

    @media (max-width: 768px) {
      font-size: 0.93rem;
    }
  }

  // ── Divisor ───────────────────────────────────────────────────
  &__divider {
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.10) 30%,
      rgba(255, 255, 255, 0.10) 70%,
      transparent 100%
    );
    margin-bottom: 20px;
  }

  // ── Footer ────────────────────────────────────────────────────
  &__footer {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__avatar-wrap {
    flex-shrink: 0;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid rgba(colors.$BAKANO-PINK, 0.35);
    background: colors.$BAKANO-DARK;
  }

  &__avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 0.35s ease;
  }

  &__author {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  &__name {
    @include fonts.heading-font(600);
    font-size: 0.9rem;
    color: colors.$white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__cta-hint {
    @include fonts.interface-font(400);
    font-size: 0.72rem;
    color: rgba(colors.$BAKANO-PINK, 0.75);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  // ── Botón play ───────────────────────────────────────────────
  &__play {
    margin-left: auto;
    flex-shrink: 0;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background: colors.$QS-NAVY;
    color: colors.$white;
    transition: transform 0.25s ease;

    svg { margin-left: 2px; }
  }

  // ── Borde superior gradiente (reveal en hover) ────────────────
  &__top-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: colors.$QS-NAVY;
    opacity: 0;
    transition: opacity 0.35s ease;
  }
}
</style>
