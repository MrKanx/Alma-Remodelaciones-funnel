<script setup lang="ts">
const props = defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div class="testimonials-header" :class="{ 'is-visible': props.isVisible }">
    <p class="testimonials-header__label">TESTIMONIOS</p>
    <h2 class="testimonials-header__title">
      Algunos Testimonios de Nuestros
      <br>
      Clientes
    </h2>
  </div>
</template>

<style lang="scss" scoped>
@use '../styles/fonts.modules.scss' as fonts;
@use '../styles/colorVariables.module.scss' as colors;

.testimonials-header {
  text-align: center;
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s cubic-bezier(0.2, 0.8, 0.2, 1);

  &.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  &__label {
    @include fonts.accent-font(600);
    font-size: 0.9rem;
    color: colors.$BAKANO-PINK;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 16px;

    @media (max-width: 768px) {
      font-size: 0.8rem;
      letter-spacing: 2px;
    }
  }

  &__title {
    @include fonts.heading-font(800);
    font-size: clamp(3rem, 7vw, 6rem);
    text-transform: uppercase;
    color: colors.$text-light;
    margin-bottom: 0;
    line-height: 1.05;
    letter-spacing: -0.02em;

    @media (max-width: 768px) {
      font-size: clamp(1.8rem, 6vw, 2.5rem);

      br {
        display: none;
      }
    }
  }
}
</style>
