<script setup lang="ts">
const props = defineProps({
  contactName: {
    type: String,
    required: false,
    default: '',
  },
});
</script>

<template>
  <section class="booked-hero">
    <div class="booked-hero__icon-wrap">
      <i class="fa-solid fa-circle-check booked-hero__check-icon"></i>
    </div>

    <h1 class="booked-hero__title">
      <template v-if="props.contactName">¡Listo, {{ props.contactName }}!</template>
      <template v-else>¡Tu diagnóstico está confirmado!</template>
    </h1>

    <p class="booked-hero__subtitle">
      Tu sesión de diagnóstico estructural con Aluvicopp ha sido agendada correctamente.
      En breve recibirás todos los detalles.
    </p>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

.booked-hero {
  text-align: center;
  padding: 2.5rem 0 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  @media (min-width: 768px) {
    padding: 4.5rem 0 2.5rem;
    gap: 1.75rem;
  }

  &__icon-wrap {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: rgba(colors.$OS-BLUE, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid rgba(colors.$OS-BLUE, 0.3);
    box-shadow: 0 0 30px rgba(colors.$OS-BLUE, 0.1);
    margin-bottom: 0.5rem;

    @media (min-width: 768px) { width: 90px; height: 90px; margin-bottom: 0.75rem; }
  }

  &__check-icon {
    font-size: 2.25rem;
    color: colors.$OS-BLUE;
    filter: drop-shadow(0 0 12px rgba(colors.$OS-BLUE, 0.5));
    @media (min-width: 768px) { font-size: 3.25rem; }
  }

  &__title {
    @include fonts.heading-font(800);
    font-size: clamp(1.85rem, 8vw, 3.5rem);
    line-height: 1.1;
    margin: 0;
    color: colors.$OS-DARK;
  }

  &__subtitle {
    @include fonts.body-font(400);
    font-size: 0.95rem;
    color: #FFFFFF;
    margin: 0;
    line-height: 1.6;
    max-width: 540px;
    @media (min-width: 768px) { font-size: 1.15rem; line-height: 1.7; }
  }
}
</style>
