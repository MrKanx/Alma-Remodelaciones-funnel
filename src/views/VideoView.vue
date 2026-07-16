<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CalendarModal from '@/components/CalendarModal.vue'
import { trackStage, generateEventId } from '@/utils/ghl'
import { useContactStore } from '@/stores/contact'

const contactStore = useContactStore()
const calendarOpen = ref(false)
const captureOpen = ref(false)
const captureForm = ref({ nombre: '', apellido: '', empresa: '', email: '', telefono: '' })
const captureErrors = ref<Record<string, string>>({})
const captureTouched = ref<Record<string, boolean>>({})
const captureSubmitting = ref(false)

const validateCapture = () => {
  const e: Record<string, string> = {}
  if (captureForm.value.nombre.trim().length < 2) e.nombre = 'Ingresa tu nombre'
  if (captureForm.value.apellido.trim().length < 2) e.apellido = 'Ingresa tu apellido'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(captureForm.value.email.trim())) e.email = 'Email inválido'
  if (captureForm.value.telefono.trim().length < 7) e.telefono = 'Teléfono inválido'
  captureErrors.value = e
  return Object.keys(e).length === 0
}

const submitCapture = async () => {
  captureTouched.value = { nombre: true, apellido: true, email: true, telefono: true }
  if (!validateCapture()) return
  captureSubmitting.value = true

  contactStore.save({
    nombre: captureForm.value.nombre.trim(),
    apellido: captureForm.value.apellido.trim(),
    negocio: 'N/A',
    email: captureForm.value.email.trim().toLowerCase(),
    telefono: captureForm.value.telefono.trim(),
  })

  const c = contactStore.get()
  const leadEventId = generateEventId('lead_video')
  trackStage('lead_capturado', {
    nombre: c.nombre,
    apellido: c.apellido,
    email: c.email,
    telefono: c.telefono,
    phone: c.telefono,
    event_id: leadEventId,
  })
  ;(window as any).fbq?.('track', 'Lead', { content_name: 'video-gate' }, { eventID: leadEventId })
  
  await new Promise(r => setTimeout(r, 600))
  captureSubmitting.value = false
  captureOpen.value = false
  startTimer()
}

const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
const COUNTDOWN_SECONDS = isLocalhost ? 3 : 120
const secondsLeft = ref(COUNTDOWN_SECONDS)
const ctaUnlocked = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

const formattedTime = () => {
  const m = Math.floor(secondsLeft.value / 60)
  const s = secondsLeft.value % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const startTimer = () => {
  if (timer) return // already started
  timer = setInterval(() => {
    if (secondsLeft.value > 0) {
      secondsLeft.value--
    } else {
      ctaUnlocked.value = true
      ;(window as any).fbq?.('track', 'CompleteRegistration', {
        content_name: 'video-completado',
        value: 1,
        currency: 'USD',
      })
      if (timer) clearInterval(timer)
    }
  }, 1000)
}

onMounted(() => {
  const c = contactStore.get()
  const hasContact = !!c.email && !!c.nombre
  if (!hasContact) {
    captureOpen.value = true
  } else {
    ;(window as any).fbq?.('track', 'ViewContent', { content_name: 'video-vsl' })
    startTimer()
  }

  // Wistia scripts
  if (!document.querySelector('script[src="https://fast.wistia.com/player.js"]')) {
    const script1 = document.createElement('script')
    script1.src = 'https://fast.wistia.com/player.js'
    script1.async = true
    document.head.appendChild(script1)
    
    const script2 = document.createElement('script')
    script2.src = 'https://fast.wistia.com/embed/nl8brnqhfz.js'
    script2.type = 'module'
    script2.async = true
    document.head.appendChild(script2)
  }
})

onUnmounted(() => { if (timer) clearInterval(timer) })
</script>

<template>
  <div class="vv-page">

    <header class="vv-topbar">
      <span class="vv-topbar__logo-text">Alma <span class="vv-topbar__logo-accent">Remodelaciones</span></span>
    </header>

    <main class="vv-main">

      <div class="vv-stepper" aria-label="Paso 1 de 2">
        <span class="vv-stepper__pill">
          <span class="vv-stepper__dot vv-stepper__dot--active" aria-current="step"></span>
          <span class="vv-stepper__dot"></span>
          <span class="vv-stepper__label">Paso 1 de 2</span>
        </span>
      </div>

      <section class="vv-headline">
        <h1 class="vv-h1">
          Descubre por qué cientos de proyectos
          <span class="vv-accent">eligen a Alma Remodelaciones</span>
        </h1>
        <p class="vv-subtitle">
          Accede a la presentación completa y descubre cómo asegurar el éxito de tu obra,
          ahorrar meses de retrasos y disfrutar de tus espacios con total tranquilidad.
        </p>
      </section>

      <div class="vv-video-wrapper">
        <div class="vv-video-ratio">
          <wistia-player media-id="nl8brnqhfz" aspect="1.7777777777777777"></wistia-player>
        </div>
      </div>

      <div class="vv-cta-section">
        <div v-if="!ctaUnlocked" class="vv-cta-locked" aria-live="polite">
          <div class="vv-cta-locked__message">
            <i class="fa-solid fa-lock vv-cta-locked__icon" aria-hidden="true"></i>
            <p class="vv-cta-locked__text">
              El botón se habilita en <strong>{{ formattedTime() }}</strong> — la presentación tiene la clave para tu proceso
            </p>
          </div>
          <button 
            class="vv-cta-btn vv-cta-btn--disabled" 
            disabled
            :style="{ '--fill': ((COUNTDOWN_SECONDS - secondsLeft) / COUNTDOWN_SECONDS * 100) + '%' }"
          >
            <i class="fa-solid fa-lock" aria-hidden="true"></i>
            QUIERO AGENDAR MI CITA
          </button>
        </div>

        <button
          v-else
          class="vv-cta-btn"
          @click="calendarOpen = true"
        >
          <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
          QUIERO AGENDAR MI CITA
        </button>

        <p class="vv-cta-sub">
          <i class="fa-solid fa-lock" aria-hidden="true"></i>
          100% gratuito &nbsp;·&nbsp; Sin compromiso &nbsp;·&nbsp; Cupos limitados
        </p>
      </div>

    </main>

    <footer class="vv-footer">
      <nav class="vv-footer__links" aria-label="Legal">
        <RouterLink to="/politicas-privacidad">Política de Privacidad</RouterLink>
        <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
      </nav>
      <p class="vv-footer__copy">© {{ new Date().getFullYear() }} Alma Remodelaciones. Todos los derechos reservados.</p>
      <p class="vv-footer__dev">Hecho por <a href="https://github.com/MrKanx" target="_blank" rel="noopener noreferrer">Kankox</a></p>
    </footer>

  </div>

  <!-- The Qualification Modal used before routing to Booking -->
  <CalendarModal :open="calendarOpen" @close="calendarOpen = false" />

  <Teleport to="body">
    <Transition name="capture-fade">
      <div v-if="captureOpen" class="capture-overlay" role="dialog" aria-modal="true" aria-labelledby="capture-title">
        <div class="capture-modal">
          <div class="capture-modal__header">
            <h2 id="capture-title" class="capture-modal__title">
              Antes de acceder a la presentación, <span>confirma tus datos</span>
            </h2>
            <p class="capture-modal__sub">Para personalizar el diseño de tu proyecto</p>
          </div>
          <form class="capture-modal__form" @submit.prevent="submitCapture" novalidate>
            <div class="capture-row">
              <div class="capture-field" :class="{ error: captureTouched.nombre && captureErrors.nombre }">
                <label>Nombre</label>
                <input v-model="captureForm.nombre" type="text" placeholder="Ej: Juan" @blur="captureTouched.nombre = true" />
                <span v-if="captureTouched.nombre && captureErrors.nombre" class="capture-field__error">{{ captureErrors.nombre }}</span>
              </div>
              <div class="capture-field" :class="{ error: captureTouched.apellido && captureErrors.apellido }">
                <label>Apellido</label>
                <input v-model="captureForm.apellido" type="text" placeholder="Ej: Pérez" @blur="captureTouched.apellido = true" />
                <span v-if="captureTouched.apellido && captureErrors.apellido" class="capture-field__error">{{ captureErrors.apellido }}</span>
              </div>
            </div>
            <div class="capture-field" :class="{ error: captureTouched.email && captureErrors.email }">
              <label>Email</label>
              <input v-model="captureForm.email" type="email" placeholder="tu@correo.com" @blur="captureTouched.email = true" />
              <span v-if="captureTouched.email && captureErrors.email" class="capture-field__error">{{ captureErrors.email }}</span>
            </div>
            <div class="capture-field" :class="{ error: captureTouched.telefono && captureErrors.telefono }">
              <label>Teléfono</label>
              <input v-model="captureForm.telefono" type="tel" placeholder="+593 98 000 0000" @blur="captureTouched.telefono = true" />
              <span v-if="captureTouched.telefono && captureErrors.telefono" class="capture-field__error">{{ captureErrors.telefono }}</span>
            </div>
            <button type="submit" class="capture-submit" :disabled="captureSubmitting">
              <span v-if="!captureSubmitting">
                <i class="fa-solid fa-play" aria-hidden="true"></i>
                Acceder a la presentación
              </span>
              <span v-else>
                <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
                Cargando...
              </span>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '@/styles/fonts.modules.scss' as fonts;
@use '@/styles/colorVariables.module.scss' as colors;

.vv-page {
  min-height: 100vh;
  background-color: colors.$BG-BASE;
  background-image: radial-gradient(circle at top right, rgba(224, 106, 65, 0.05) 0%, transparent 40%),
                    radial-gradient(circle at bottom left, rgba(23, 23, 23, 0.8) 0%, transparent 40%);
  color: #ffffff;
  display: flex;
  flex-direction: column;
}

.vv-topbar {
  background: rgba(10, 15, 29, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  padding: 0.9rem 1.5rem;
  display: flex;
  justify-content: center;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  &__logo-text {
    font-family: fonts.$font-principal;
    font-weight: 900;
    font-size: 1.25rem;
    letter-spacing: -0.5px;
    color: #ffffff;
    margin: 0;
  }

  &__logo-accent {
    color: colors.$DIS-GOLD;
  }
}

.vv-main {
  flex: 1;
  max-width: 800px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
  width: 100%;
}

.vv-stepper {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  &__pill {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: colors.$BG-SURFACE;
    backdrop-filter: blur(8px);
    border: 1px solid colors.$BG-BORDER;
    border-radius: 999px;
    padding: 0.4rem 1rem;
  }

  &__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #444;
    transition: background 0.2s;

    &--active {
      background: colors.$DIS-GOLD;
    }
  }

  &__label {
    font-family: fonts.$font-interface;
    font-size: 0.8rem;
    font-weight: 600;
    color: #CCCCCC;
    letter-spacing: 0.03em;
  }
}

.vv-headline {
  margin-bottom: 2rem;
  text-align: center;
}

.vv-h1 {
  font-family: fonts.$font-principal;
  font-weight: 800;
  font-size: clamp(1.6rem, 5vw, 3rem);
  color: #ffffff;
  line-height: 1.2;
  margin: 0 0 1rem;
  letter-spacing: -0.025em;
}

.vv-accent {
  color: colors.$DIS-GOLD;
}

.vv-subtitle {
  font-size: clamp(0.95rem, 3vw, 1.1rem);
  color: #a0aec0;
  line-height: 1.5;
  margin: 0 auto;
  max-width: 650px;
}

.vv-video-wrapper {
  margin-bottom: 2.5rem;
}

.vv-video-ratio {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
  border: 1px solid colors.$BG-BORDER;
  background: colors.$BG-SURFACE;
  backdrop-filter: blur(10px);

  wistia-player {
    display: block;
    width: 100%;
    height: 100%;

    &:not(:defined) {
      background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/nl8brnqhfz/swatch');
      display: block;
      filter: blur(5px);
      padding-top: 56.25%;
    }
  }
}

.vv-cta-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.vv-cta-locked {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.2rem;
  width: 100%;
  max-width: 500px;

  &__message {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    padding: 1rem 1.5rem;
    background: colors.$BG-SURFACE;
    backdrop-filter: blur(8px);
    border: 1px solid colors.$BG-BORDER;
    border-radius: 12px;
  }

  &__icon {
    font-size: 1rem;
    color: #888888;
  }

  &__text {
    font-size: 0.95rem;
    color: #CCCCCC;
    margin: 0;
    font-family: fonts.$font-secondary;

    strong {
      color: colors.$DIS-GOLD;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
  }
}

.vv-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  background: colors.$DIS-GOLD;
  color: #000000;
  border: none;
  border-radius: 12px;
  padding: 1.25rem 2.5rem;
  font-family: fonts.$font-accent;
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  width: 100%;
  max-width: 500px;
  transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(colors.$DIS-GOLD, 0.3);

  &:hover {
    background: #FB923C;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(colors.$DIS-GOLD, 0.45);
  }

  &:active {
    transform: translateY(0);
  }

  &--disabled {
    background: linear-gradient(to right, rgba(224, 106, 65, 0.3) var(--fill, 0%), colors.$BG-SURFACE var(--fill, 0%)) !important;
    color: #888888 !important;
    border: 1px solid colors.$BG-BORDER !important;
    box-shadow: none !important;
    cursor: not-allowed !important;
    transform: none !important;
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(8px);

    &:hover {
      background: linear-gradient(to right, rgba(224, 106, 65, 0.3) var(--fill, 0%), colors.$BG-SURFACE var(--fill, 0%)) !important;
      transform: none !important;
      box-shadow: none !important;
    }

    i {
      color: #888888;
    }
  }
}

.vv-cta-sub {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.8rem;
  color: #a0aec0;
  margin: 0;

  i {
    font-size: 0.75rem;
    color: colors.$DIS-GOLD;
  }
}

.vv-footer {
  padding: 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: colors.$BG-BASE;

  &__links {
    display: flex;
    gap: 1.5rem;

    a {
      font-size: 0.8rem;
      color: #a0aec0;
      text-decoration: none;

      &:hover {
        color: colors.$DIS-GOLD;
      }
    }
  }

  &__copy {
    font-size: 0.75rem;
    color: #718096;
    margin: 0;
  }

  &__dev {
    font-size: 0.75rem;
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

/* Capture Modal Overrides for S2M */
.capture-fade-enter-active,
.capture-fade-leave-active {
  transition: opacity 0.25s ease;
}

.capture-fade-enter-from,
.capture-fade-leave-to {
  opacity: 0;
}

.capture-overlay {
  position: fixed;
  inset: 0;
  z-index: 950;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.capture-modal {
  background: colors.$BG-BASE;
  border-radius: 20px;
  width: 100%;
  max-width: 460px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.6);
  border: 1px solid colors.$BG-BORDER;

  &__header {
    padding: 2rem 2rem 1.25rem;
    text-align: center;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    background: colors.$BG-SURFACE;
    backdrop-filter: blur(8px);
  }

  &__title {
    font-family: fonts.$font-principal;
    font-size: 1.5rem;
    font-weight: 800;
    color: #ffffff;
    margin: 0 0 0.5rem;
    letter-spacing: -0.02em;

    span {
      color: colors.$DIS-GOLD;
    }
  }

  &__sub {
    font-size: 0.9rem;
    color: #a0aec0;
    margin: 0;
  }

  &__form {
    padding: 1.5rem 1.75rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.capture-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
}

.capture-field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-family: fonts.$font-interface;
    font-size: 0.8rem;
    font-weight: 700;
    color: #FFFFFF;
    letter-spacing: 0.02em;
  }

  input {
    border: 1.5px solid colors.$BG-BORDER;
    border-radius: 9px;
    padding: 0.8rem 1rem;
    font-family: fonts.$font-secondary;
    font-size: 0.9rem;
    color: #FFFFFF;
    background: colors.$BG-SURFACE;
    outline: none;
    transition: all 0.2s ease;

    &::placeholder {
      color: rgba(255, 255, 255, 0.35);
    }

    &:focus {
      border-color: colors.$DIS-GOLD;
      background: rgba(30, 41, 59, 0.7);
    }
  }

  &.error input {
    border-color: colors.$OS-RED;
  }

  &__error {
    font-size: 0.75rem;
    color: colors.$OS-RED;
  }
}

.capture-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: colors.$DIS-GOLD;
  color: #000000;
  border: none;
  border-radius: 11px;
  padding: 1.1rem 1.5rem;
  font-family: fonts.$font-accent;
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  width: 100%;
  margin-top: 0.5rem;
  transition: background 0.2s, transform 0.15s;
  box-shadow: 0 4px 16px rgba(colors.$DIS-GOLD, 0.3);

  &:hover:not(:disabled) {
    background: #FB923C;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}
</style>
