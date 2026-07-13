<script setup lang="ts">
interface TeamMember {
  name: string;
  role: string;
  photo: string;
}

const props = defineProps({
  team: {
    type: Array as () => TeamMember[],
    required: true,
  },
});
</script>

<template>
  <section class="booked-team">
    <h2 class="booked-team__section-title">
      <i class="fa-solid fa-hard-hat"></i>
      Tu especialista
    </h2>

    <div class="team-grid">
      <article v-for="member in props.team" :key="member.name" class="team-card">
        <div class="team-card__image-wrap">
          <div class="team-card__avatar">
            <i class="fa-solid fa-user-tie"></i>
          </div>
        </div>
        <div class="team-card__info">
          <h3 class="team-card__name">{{ member.name }}</h3>
          <p class="team-card__role">{{ member.role }}</p>
        </div>
      </article>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

.booked-team {
  width: 100%;
  padding: 0 0 2.5rem;
  @media (min-width: 768px) { padding: 0 0 4rem; }

  &__section-title {
    @include fonts.heading-font(700);
    font-size: 1.15rem;
    color: colors.$OS-DARK;
    margin: 0 0 1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    i { color: colors.$OS-NAVY; }
    @media (min-width: 768px) { font-size: 1.35rem; margin-bottom: 2.5rem; }
  }
}

.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  @media (min-width: 600px) { grid-template-columns: repeat(2, 1fr); gap: 1.75rem; }
}

.team-card {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: #111111;
  border: 1px solid rgba(colors.$OS-NAVY, 0.1);
  border-radius: 28px;
  transition: all 0.3s ease;

  &:hover {
    background: #111111;
    border-color: rgba(colors.$OS-BLUE, 0.3);
    transform: translateY(-4px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
  }

  @media (min-width: 768px) { flex-direction: column; text-align: center; padding: 2.5rem 1.5rem; gap: 1.75rem; }

  &__image-wrap {
    position: relative;
    width: 68px; height: 68px;
    border-radius: 50%;
    border: 2px solid rgba(colors.$OS-NAVY, 0.2);
    padding: 4px;
    transition: all 0.3s ease;
    flex-shrink: 0;
    background: #000000;

    @media (min-width: 768px) { width: 110px; height: 110px; }
  }

  &__avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: colors.$OS-NAVY;
    display: flex;
    align-items: center;
    justify-content: center;
    i { color: rgba(#ffffff, 0.85); font-size: 1.8rem; }
    @media (min-width: 768px) { i { font-size: 2.5rem; } }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    position: relative;
    z-index: 1;
  }

  &__name {
    @include fonts.heading-font(700);
    font-size: 1.1rem;
    color: colors.$OS-DARK;
    margin: 0;
    letter-spacing: -0.01em;
    @media (min-width: 768px) { font-size: 1.35rem; }
  }

  &__role {
    @include fonts.interface-font(600);
    font-size: 0.75rem;
    color: #CCCCCC;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    @media (min-width: 768px) { font-size: 0.85rem; }
  }
}
</style>
