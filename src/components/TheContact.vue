<script setup lang="ts">
import ContactWizard from './ContactWizard.vue'
</script>

<template>
  <section class="contact" id="contacto">

    <!-- Radial glow de fondo -->
    <div class="contact__glow" aria-hidden="true" />

    <div class="contact__inner">

      <!-- ── Columna izquierda: copy ──────────────────────────────────── -->
      <div class="contact__copy">
        <p class="contact__label">Hablemos</p>

        <h2 class="contact__title">
          Tu negocio merece<br>
          <span class="contact__title-grad">resultados reales</span>
        </h2>

        <p class="contact__desc">
          Cuéntanos sobre tu empresa. En menos de 24 horas
          uno de nuestros estrategas te contactará con un
          diagnóstico inicial sin costo.
        </p>

        <!-- Trust bullets -->
        <ul class="contact__trust" aria-label="Beneficios">
          <li class="contact__trust-item">
            <span class="contact__trust-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            Diagnóstico inicial gratuito
          </li>
          <li class="contact__trust-item">
            <span class="contact__trust-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            Sin compromisos ni contratos forzados
          </li>
          <li class="contact__trust-item">
            <span class="contact__trust-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            Respuesta en menos de 24 horas
          </li>
          <li class="contact__trust-item">
            <span class="contact__trust-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                   stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
            +150 negocios transformados en Ecuador
          </li>
        </ul>

        <!-- Stat decorativo -->
        <div class="contact__stat">
          <span class="contact__stat-num">20%</span>
          <span class="contact__stat-text">
            promedio de aumento en facturación<br>
            en los primeros 90 días
          </span>
        </div>
      </div>

      <!-- ── Columna derecha: formulario ─────────────────────────────── -->
      <div class="contact__form-wrap">
        <div class="contact__form-card">
          <ContactWizard />
        </div>
      </div>

    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

// ── Sección raíz ──────────────────────────────────────────────────────────────
.contact {
  position: relative;
  background-color: #000000;
  padding: 120px 24px;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
}

// Glow de fondo
.contact__glow {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 70vw;
  border-radius: 50%;
  background: radial-gradient(
    ellipse at center,
    rgba(colors.$BAKANO-PINK, 0.06) 0%,
    rgba(colors.$BAKANO-PURPLE, 0.04) 40%,
    transparent 70%
  );
  pointer-events: none;
}

// ── Layout interior ───────────────────────────────────────────────────────────
.contact__inner {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;

  @media (max-width: 1024px) {
    gap: 52px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
}

// ── Copy izquierdo ────────────────────────────────────────────────────────────
.contact__copy {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.contact__label {
  @include fonts.accent-font(700);
  font-size: 0.75rem;
  color: colors.$BAKANO-PINK;
  text-transform: uppercase;
  letter-spacing: 5px;
  margin: 0;
}

.contact__title {
  @include fonts.heading-font(800);
  font-size: clamp(2.4rem, 4.5vw, 4rem);
  color: colors.$white;
  text-transform: uppercase;
  line-height: 1.06;
  letter-spacing: -0.025em;
  margin: 0;

  @media (max-width: 600px) {
    font-size: clamp(2rem, 8vw, 2.8rem);
    br { display: none; }
  }
}

.contact__title-grad {
  background: colors.$QS-NAVY;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.contact__desc {
  @include fonts.body-font(400);
  font-size: 1rem;
  color: rgba(colors.$white, 0.52);
  line-height: 1.7;
  margin: 0;
  max-width: 420px;
}

// ── Trust bullets ──────────────────────────────────────────────────────────────
.contact__trust {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact__trust-item {
  @include fonts.body-font(500);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: rgba(colors.$white, 0.7);
}

.contact__trust-icon {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: rgba(colors.$BAKANO-PINK, 0.12);
  border: 1px solid rgba(colors.$BAKANO-PINK, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  color: colors.$BAKANO-PINK;
  flex-shrink: 0;
}

// ── Stat decorativo ────────────────────────────────────────────────────────────
.contact__stat {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 20px 24px;
  border-radius: 14px;
  border: 1px solid rgba(colors.$BAKANO-PINK, 0.12);
  background: rgba(colors.$BAKANO-PINK, 0.04);
  max-width: 380px;
}

.contact__stat-num {
  @include fonts.heading-font(900);
  font-size: 3rem;
  line-height: 1;
  background: colors.$QS-NAVY;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  flex-shrink: 0;
}

.contact__stat-text {
  @include fonts.body-font(400);
  font-size: 0.82rem;
  color: rgba(colors.$white, 0.48);
  line-height: 1.5;
}

// ── Card del formulario ────────────────────────────────────────────────────────
.contact__form-wrap {
  display: flex;
  flex-direction: column;
}

.contact__form-card {
  background: rgba(11, 8, 21, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 20px;
  padding: 40px 36px;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  box-shadow:
    0 0 0 1px rgba(255, 255, 255, 0.03) inset,
    0 40px 80px rgba(0, 0, 0, 0.5);

  @media (max-width: 480px) {
    padding: 28px 20px;
    border-radius: 16px;
  }
}
</style>
