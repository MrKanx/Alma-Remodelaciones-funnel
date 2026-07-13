<script setup lang="ts">
const LOGO = 'https://res.cloudinary.com/dpuody0df/image/upload/v1775587085/bakano/logos/bakano-light.png';
</script>

<template>
  <header class="booked-header">
    <img src="@/assets/logos/logo.png" class="booked-header__logo-img" alt="NOVAERA Logo" />
  </header>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;

.booked-header {
  width: 100%;
  padding: 1.25rem 1rem;
  display: flex;
  justify-content: center;
  background: colors.$OS-NAVY;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;

  &__logo-img {
  height: 35px;
  width: auto;
  object-fit: contain;
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 1.25rem;
    letter-spacing: 0.1em;
    color: #ffffff;
    margin: 0;
  }
}
</style>
