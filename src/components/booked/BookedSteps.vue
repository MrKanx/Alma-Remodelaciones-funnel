<script setup lang="ts">
interface StepItem {
  icon: string;
  title: string;
  body: string;
}

const props = defineProps({
  steps: {
    type: Array as () => StepItem[],
    required: true,
  },
});
</script>

<template>
  <section class="booked-steps">
    <h2 class="booked-steps__section-title">
      <i class="fa-solid fa-list-check"></i>
      Próximos pasos
    </h2>

    <ol class="steps-list">
      <li v-for="(step, idx) in props.steps" :key="idx" class="steps-item">
        <div class="steps-item__num">{{ idx + 1 }}</div>
        <div class="steps-item__icon-wrap">
          <i :class="step.icon"></i>
        </div>
        <div class="steps-item__content">
          <strong class="steps-item__title">{{ step.title }}</strong>
          <p class="steps-item__body">{{ step.body }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

.booked-steps {
  width: 100%;
  padding: 1.5rem 0;
  @media (min-width: 768px) { padding: 2.5rem 0; }

  &__section-title {
    @include fonts.heading-font(700);
    font-size: 1.1rem;
    color: colors.$OS-DARK;
    margin: 0 0 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    i { color: colors.$OS-BLUE; }
    @media (min-width: 768px) { font-size: 1.25rem; margin-bottom: 2rem; }
  }
}

.steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (min-width: 768px) { gap: 1.25rem; }
}

.steps-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: #111111;
  border: 1px solid rgba(colors.$OS-NAVY, 0.1);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);

  &:hover {
    background: #F0F6FF;
    border-color: rgba(colors.$OS-BLUE, 0.4);
    transform: translateY(-4px) scale(1.01);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 768px) { gap: 1.5rem; padding: 1.75rem; }

  &__num {
    flex-shrink: 0;
    width: 26px; height: 26px; border-radius: 50%;
    background: colors.$OS-NAVY;
    color: #ffffff;
    display: flex; align-items: center; justify-content: center;
    @include fonts.accent-font(700);
    font-size: 0.75rem;
    @media (min-width: 768px) { width: 32px; height: 32px; font-size: 0.9rem; }
  }

  &__icon-wrap {
    flex-shrink: 0;
    width: 38px; height: 38px; border-radius: 12px;
    background: rgba(colors.$OS-NAVY, 0.1);
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(colors.$OS-NAVY, 0.2);
    transition: all 0.3s ease;
    i { font-size: 1rem; color: colors.$OS-NAVY; }
    @media (min-width: 768px) { width: 48px; height: 48px; i { font-size: 1.3rem; } }
  }

  &__content { flex: 1; min-width: 0; }

  &__title {
    display: block;
    @include fonts.interface-font(700);
    font-size: 0.95rem;
    color: colors.$OS-DARK;
    margin-bottom: 0.35rem;
    @media (min-width: 768px) { font-size: 1.1rem; }
  }

  &__body {
    @include fonts.body-font(400);
    font-size: 0.9rem;
    color: #FFFFFF;
    margin: 0;
    line-height: 1.6;
    @media (min-width: 768px) { font-size: 1rem; }
  }
}
</style>
