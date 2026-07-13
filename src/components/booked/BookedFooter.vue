<script setup lang="ts">
</script>

<template>
  <footer class="booked-footer">
    <nav class="booked-footer__links" aria-label="Legal">
      <router-link to="/politicas-privacidad" class="booked-footer__link">
        Política de Privacidad
      </router-link>
      <span class="booked-footer__separator" aria-hidden="true">·</span>
      <router-link to="/aviso-legal" class="booked-footer__link">
        Aviso Legal
      </router-link>
    </nav>
    <p class="booked-footer__copy">
      © {{ new Date().getFullYear() }} Aluvicopp.
      <br class="mobile-break" />
      Todos los derechos reservados.
    </p>
  </footer>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

.booked-footer {
  width: 100%;
  padding: 2.5rem 1.5rem 3.5rem;
  text-align: center;
  border-top: 1px solid #222222;
  background: #FAFBFF;
  margin-top: auto;

  @media (min-width: 768px) { padding: 4rem 2rem; }

  &__links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    margin-bottom: 1.25rem;
    @media (min-width: 768px) { gap: 1.5rem; margin-bottom: 1.5rem; }
  }

  &__link {
    @include fonts.interface-font(500);
    font-size: 0.72rem;
    color: #EEEEEE;
    text-decoration: none;
    transition: color 0.3s ease;
    &:hover { color: colors.$OS-NAVY; }
    @media (min-width: 768px) { font-size: 0.85rem; }
  }

  &__separator { color: #EEEEEE; font-size: 1rem; line-height: 1; }

  &__copy {
    @include fonts.interface-font(500);
    font-size: 0.65rem;
    color: #EEEEEE;
    margin: 0;
    line-height: 1.8;
    text-transform: uppercase;
    letter-spacing: 1.2px;
    @media (min-width: 768px) { font-size: 0.72rem; letter-spacing: 2.2px; }
  }
}

.mobile-break {
  @media (min-width: 640px) { display: none; }
}
</style>
