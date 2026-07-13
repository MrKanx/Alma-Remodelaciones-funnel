<script setup lang="ts">
/**
 * @file TheScrollOverlay.vue
 * @description Premium scroll overlay to guide users to start the experience.
 */
</script>

<template>
  <div class="scroll-overlay">
    <div class="scroll-overlay__content">
      <div class="scroll-overlay__icon-wrapper">
        <div class="scroll-overlay__mouse">
          <div class="scroll-overlay__wheel"></div>
        </div>
      </div>
      
      <div class="scroll-overlay__text">
        <h2 class="scroll-overlay__title">Para empezar la experiencia</h2>
        <p class="scroll-overlay__description">
          Desliza hacia abajo para descubrir toda la información
        </p>
      </div>

      <div class="scroll-overlay__arrows">
        <svg class="arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 13L12 18L17 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7 6L12 11L17 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.scroll-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background: radial-gradient(circle at center, rgba(colors.$BAKANO-DARK, 0.4) 0%, rgba(colors.$BAKANO-DARK, 0.9) 100%);
  backdrop-filter: blur(8px);
  pointer-events: none;
  text-align: center;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    max-width: 500px;
  }

  &__icon-wrapper {
    margin-bottom: 1rem;
  }

  &__mouse {
    width: 30px;
    height: 50px;
    border: 2px solid rgba(colors.$white, 0.3);
    border-radius: 15px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }

  &__wheel {
    width: 4px;
    height: 10px;
    background: colors.$BAKANO-PRIMARY;
    border-radius: 2px;
    animation: scroll-wheel 1.5s ease-in-out infinite;
  }

  &__text {
    .scroll-overlay__title {
      @include fonts.heading-font(800);
      font-size: clamp(1.5rem, 4vw, 2rem);
      color: colors.$white;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    .scroll-overlay__description {
      @include fonts.body-font(400);
      font-size: clamp(1rem, 2vw, 1.2rem);
      color: rgba(colors.$white, 0.8);
      line-height: 1.4;
    }
  }

  &__arrows {
    .arrow {
      width: 40px;
      height: 40px;
      color: colors.$BAKANO-PRIMARY;
      animation: arrow-bounce 2s ease-in-out infinite;
    }
  }
}

@keyframes scroll-wheel {
  0% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(15px); opacity: 0; }
}

@keyframes arrow-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(10px); opacity: 1; }
}

// Mobile specific refinements
@media (max-width: 768px) {
  .scroll-overlay {
    backdrop-filter: blur(4px);
    
    &__content {
      gap: 1.5rem;
    }
    
    &__mouse {
      width: 26px;
      height: 42px;
    }
  }
}
</style>
