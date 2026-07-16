<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const iframeHeight = ref(1100)

const BASE_URL = 'https://api.leadconnectorhq.com/widget/booking/jNp2KzOZW13tacMG3v1U'

const calendarUrl = computed(() => {
  try {
    const stored = localStorage.getItem('os_contact')
    if (!stored) return BASE_URL
    const { nombre, email, phone } = JSON.parse(stored)
    const params = new URLSearchParams()
    if (nombre) params.set('firstName', nombre)
    if (email) params.set('email', email)
    if (phone) params.set('phone', phone)
    const qs = params.toString()
    return qs ? `${BASE_URL}?${qs}` : BASE_URL
  } catch {
    return BASE_URL
  }
})

const onMessage = (event: MessageEvent) => {
  if (Array.isArray(event.data) && event.data[0] === 'msgsndr-booking-complete') {
    localStorage.setItem('os_booked_at', String(Date.now()))
    ;(window as any).fbq?.('track', 'CompleteRegistration', {
      content_name: 'cita-agendada',
      value: 1,
      currency: 'USD',
    })
    router.push('/cita-confirmada')
  }
  if (event.data?.type === 'booking-app' && typeof event.data.height === 'number') {
    iframeHeight.value = event.data.height + 40
  }
}

onMounted(() => {
  window.addEventListener('message', onMessage)

  if (!document.getElementById('ghl-form-embed-script')) {
    const script = document.createElement('script')
    script.id = 'ghl-form-embed-script'
    script.src = 'https://link.msgsndr.com/js/form_embed.js'
    script.type = 'text/javascript'
    document.body.appendChild(script)
  }
})

onUnmounted(() => window.removeEventListener('message', onMessage))
</script>

<template>
  <div class="booking">

    <header class="booking__topbar">
      <span class="booking__logo-text">STUDENTS<span class="booking__logo-accent">2MADRID</span></span>
    </header>

    <main class="booking__main">

      <div class="stepper" aria-label="Paso 2 de 2">
        <div class="stepper__track">
          <div class="stepper__step stepper__step--done">
            <div class="stepper__circle">
              <i class="fa-solid fa-check" aria-hidden="true"></i>
            </div>
            <span class="stepper__label">Video</span>
          </div>
          <div class="stepper__line stepper__line--done"></div>
          <div class="stepper__step stepper__step--active">
            <div class="stepper__circle">2</div>
            <span class="stepper__label">Agenda</span>
          </div>
        </div>
      </div>

      <section class="booking__heading">
        <p class="booking__eyebrow">
          <i class="fa-solid fa-calendar" aria-hidden="true"></i>
          Casi listo
        </p>
        <h1 class="booking__title">
          Elige el horario de tu
          <span class="booking__title-accent">asesoría premium</span>
        </h1>
        <p class="booking__subtitle">
          Una sesión de 30 minutos con el equipo de DISFAMOSA para trazar la ruta de tu viaje a España. Evaluaremos tus opciones y crearemos un plan seguro.
        </p>
      </section>

      <div class="calendar__wrap">
        <iframe
          :src="calendarUrl"
          :style="{ height: iframeHeight + 'px' }"
          title="Agenda tu asesoría con DISFAMOSA"
          class="calendar__iframe"
          frameborder="0"
          scrolling="no"
          id="jNp2KzOZW13tacMG3v1U_1784216658225"
        ></iframe>
      </div>

    </main>

    <footer class="booking__footer">
      <nav class="booking__footer-links" aria-label="Legal">
        <RouterLink to="/politicas-privacidad">Política de Privacidad</RouterLink>
        <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
      </nav>
      <p class="booking__footer-copy">© {{ new Date().getFullYear() }} DISFAMOSA. Todos los derechos reservados.</p>
      <p class="booking__footer-dev">Hecho por <a href="https://github.com/MrKanx" target="_blank" rel="noopener noreferrer">Kankox</a></p>
    </footer>

  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.booking {
  min-height: 100vh;
  background: #000000;
  color: #ffffff;
  display: flex;
  flex-direction: column;
}

.booking__topbar {
  background: #000000;
  border-bottom: 1px solid #222222;
  padding: 0.9rem 1.5rem;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2);
}

.booking__logo-text {
  font-family: fonts.$font-principal;
  font-weight: 900;
  font-size: 1.25rem;
  letter-spacing: -0.5px;
  color: #ffffff;
  margin: 0;
}

.booking__logo-accent {
  color: colors.$DIS-GOLD;
}

.booking__main {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
  width: 100%;
}

.stepper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  &__track { display: flex; align-items: center; gap: 0; }
  &__step { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; }

  &__circle {
    width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-family: fonts.$font-interface; font-size: 0.85rem;
    font-weight: 800; border: 2px solid #333; color: #EEEEEE; transition: all 0.3s ease;

    .stepper__step--done & { background: colors.$DIS-GOLD; border-color: colors.$DIS-GOLD; color: #000000; }
    .stepper__step--active & { background: colors.$DIS-DARK-BLUE; border-color: colors.$DIS-DARK-BLUE; color: #ffffff; }
  }

  &__label {
    font-family: fonts.$font-interface; font-size: 0.72rem; font-weight: 600;
    letter-spacing: 0.04em; color: #EEEEEE;
    .stepper__step--done & { color: colors.$DIS-GOLD; }
    .stepper__step--active & { color: colors.$DIS-DARK-BLUE; }
  }

  &__line {
    width: 60px; height: 2px; background: #333; border-radius: 2px;
    margin: 0 0.5rem; margin-bottom: 1.1rem;
    &--done { background: colors.$DIS-GOLD; }
  }
}

.booking__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(colors.$DIS-GOLD, 0.14);
  border: 1px solid rgba(colors.$DIS-GOLD, 0.35);
  border-radius: 999px;
  padding: 0.4rem 0.95rem;
  font-family: fonts.$font-interface;
  font-size: 0.74rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  margin: 0 0 1rem;

  i {
    font-size: 0.78rem;
    color: colors.$DIS-GOLD;
  }
}

.booking__heading { margin-bottom: 1.75rem; text-align: center; }

.booking__title {
  @include fonts.heading-font(800);
  font-size: clamp(1.7rem, 4vw, 2.4rem);
  color: #ffffff; margin: 0 0 0.6rem; letter-spacing: -0.025em; line-height: 1.2;
  &-accent { color: colors.$DIS-GOLD; }
}

.booking__subtitle {
  font-size: 1rem; color: #a0aec0; line-height: 1.6; margin: 0 auto; max-width: 650px;
}

.calendar__wrap {
  border-radius: 16px; overflow: hidden; border: 1px solid #333;
  box-shadow: 0 10px 40px rgba(0,0,0, 0.4);
}

.calendar__iframe { width: 100%; display: block; min-height: 600px; }

.booking__footer {
  padding: 1.5rem; border-top: 1px solid #222222;
  display: flex; flex-direction: column; align-items: center; gap: 0.5rem; text-align: center;

  &-links { display: flex; gap: 1.5rem; a { font-size: 0.76rem; color: #a0aec0; text-decoration: none; &:hover { color: colors.$DIS-GOLD; } } }
  &-copy { font-size: 0.72rem; color: #a0aec0; margin: 0; }
  
  &-dev {
    font-size: 0.72rem;
    color: #4a5568;
    margin: 0;
    
    a {
      color: #718096;
      text-decoration: none;
      font-weight: bold;
      
      &:hover {
        color: colors.$DIS-GOLD;
      }
    }
  }
}
</style>
