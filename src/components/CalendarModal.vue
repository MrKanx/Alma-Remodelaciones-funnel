<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { trackStage, generateEventId } from '@/utils/ghl'
import { useContactStore } from '@/stores/contact'
import { getStoredFbParams } from '@/utils/fbclid'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const router = useRouter()
const contactStore = useContactStore()
const IS_DEV = window.location.hostname === 'localhost'

const submitting = ref(false)
const touched = ref(false)

const form = ref({
  perfil: '',
  etapa: '',
  presupuesto: '',
  reto: '',
  consent: false,
})

const wordCount = (s: string) => s.trim().split(/\s+/).filter(Boolean).length

const isValid = () =>
  !!form.value.perfil &&
  !!form.value.etapa &&
  !!form.value.presupuesto &&
  wordCount(form.value.reto) >= 5 &&
  form.value.consent

const qualifies = () => {
  if (form.value.presupuesto === 'precio') return false
  if (form.value.perfil === 'curioso') return false
  return true
}

const handleSubmit = async () => {
  touched.value = true
  if (!isValid()) return

  submitting.value = true
  const contact = contactStore.get()
  const califica = qualifies()
  const scheduleEventId = generateEventId('schedule')

  const perfilLabel: Record<string, string> = {
    propietario: 'Propietario (construyendo/remodelando)',
    arquitecto: 'Arquitecto / Interiorista',
    constructor: 'Constructor de proyectos en serie',
    curioso: 'Solo busco precios económicos / gangas',
  }
  const etapaLabel: Record<string, string> = {
    planos: 'En planos o diseño arquitectónico',
    construccion: 'En obra gris / construcción actual',
    acabados: 'En acabados (listo para modulares)',
    remodelacion: 'Remodelación de espacios habitados',
  }
  const presupuestoLabel: Record<string, string> = {
    calidad: 'Busco calidad y precisión (con presupuesto)',
    intermedio: 'Balance entre calidad y costo',
    precio: 'Priorizo buscar el precio más barato',
  }

  const etiquetas = [
    'funnel-DISFAMOSA',
    'step-2-cualificacion',
    califica ? 'califica-DISFAMOSA' : 'no-califica-DISFAMOSA',
    `perfil-${form.value.perfil}`,
    `etapa-${form.value.etapa}`,
    `presupuesto-${form.value.presupuesto}`,
  ]

  const notas = `
━━━━━━━━━━━━━━━━━━━━━━━━
DISFAMOSA — Cualificación
━━━━━━━━━━━━━━━━━━━━━━━━
👤 ${contact.nombre} ${contact.apellido}
📧 ${contact.email}
📱 ${contact.telefono}
━━━━━━━━━━━━━━━━━━━━━━━━
🎓 Perfil: ${perfilLabel[form.value.perfil] ?? form.value.perfil}
🏗️ Etapa Obra: ${etapaLabel[form.value.etapa] ?? form.value.etapa}
💰 Enfoque: ${presupuestoLabel[form.value.presupuesto] ?? form.value.presupuesto}
💡 Desafío/Mala experiencia: ${form.value.reto}
━━━━━━━━━━━━━━━━━━━━━━━━
${califica ? '✅ CALIFICA' : '❌ NO CALIFICA — Busca barato/gangas'}
  `.trim()

  const pageEntry = Number(sessionStorage.getItem('alu_page_entry')) || Date.now()
  const pageDuration = Math.floor((Date.now() - pageEntry) / 1000)
  const notasConTiempo = `${notas}\n⏳ Tiempo total en página: ${Math.floor(pageDuration / 60)}m ${pageDuration % 60}s`

  const etiquetasStr = etiquetas.join(', ')
  const payload: Record<string, string> = {
    nombre: contact.nombre,
    apellido: contact.apellido,
    email: contact.email,
    telefono: contact.telefono,
    phone: contact.telefono,
    paso: '2-cualificacion',
    perfil: form.value.perfil,
    etapa: form.value.etapa,
    presupuesto: form.value.presupuesto,
    reto: form.value.reto,
    cualifica: califica ? 'true' : 'false',
    etiquetas: etiquetasStr,
    tags: etiquetasStr,
    notas: notasConTiempo,
    nota: notasConTiempo,
    pageDuration: String(pageDuration),
    event_id: scheduleEventId,
    ...getStoredFbParams(),
  }

  trackStage('cualificacion_completada', payload)

  const webhookUrl = import.meta.env.VITE_WEBHOOK_CALIFICACION ?? 'https://services.leadconnectorhq.com/hooks/fEMLLNjtxgizyNARamWS/webhook-trigger/S2uzKeLAiW2owmXyUi17'
  await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => {})

  ;(window as any).fbq?.('track', 'CompleteRegistration',
    {
      content_name: 'cualificacion-step2',
      status: califica ? 'califica' : 'no-califica',
      value: 1,
      currency: 'USD',
    },
    { eventID: scheduleEventId }
  )

  submitting.value = false
  emit('close')

  if (califica) {
    ;(window as any).fbq?.('track', 'Lead')
    router.push('/agendar')
  } else {
    if (!IS_DEV) localStorage.setItem('os_disq_at', String(Date.now()))
    router.push('/sin-espacio')
  }
}

const onKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') emit('close') }

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => document.removeEventListener('keydown', onKeydown))

watch(() => props.open, (v) => {
  if (v) {
    touched.value = false
    form.value = { perfil: '', etapa: '', presupuesto: '', reto: '', consent: false }
  }
  document.body.style.overflow = v ? 'hidden' : ''
})
</script>

<template>
  <Teleport to="body">
    <Transition name="cal-fade">
      <div v-if="open" class="cal-backdrop" @click.self="emit('close')" role="dialog" aria-modal="true" aria-labelledby="cal-title">

        <div class="cal-modal">

          <button class="cal-close" @click="emit('close')" aria-label="Cerrar">
            <i class="fa-solid fa-xmark"></i>
          </button>

          <div class="cal-header">
            <div class="cal-header-icon" aria-hidden="true">
              <i class="fa-solid fa-hammer"></i>
            </div>
            <h2 id="cal-title" class="cal-title">
              Antes de agendar, cuéntanos sobre
              <span class="cal-accent">tu proyecto</span>
            </h2>
            <p class="cal-subtitle">4 preguntas para preparar tu diagnóstico — 60 segundos.</p>
          </div>

          <form class="cal-form" @submit.prevent="handleSubmit" novalidate>

            <!-- Q1 — Perfil -->
            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.perfil }">
              <legend class="cal-legend">
                <span class="cal-q-num">01</span>
                ¿Cuál es tu perfil respecto a la obra?
              </legend>
              <div class="cal-options">
                <label v-for="opt in [
                  { value: 'propietario', label: 'Propietario (construyendo o remodelando)' },
                  { value: 'arquitecto', label: 'Arquitecto / Interiorista' },
                  { value: 'constructor', label: 'Constructor de proyectos en serie' },
                  { value: 'curioso', label: 'Solo busco precios económicos / gangas' },
                ]" :key="opt.value" class="cal-option" :class="{ selected: form.perfil === opt.value }">
                  <input type="radio" :value="opt.value" v-model="form.perfil" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">{{ opt.label }}</span>
                </label>
              </div>
              <span v-if="touched && !form.perfil" class="cal-error">Selecciona una opción</span>
            </fieldset>

            <!-- Q2 — Etapa -->
            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && !form.etapa }">
              <legend class="cal-legend">
                <span class="cal-q-num">02</span>
                ¿En qué etapa de desarrollo está tu proyecto?
              </legend>
              <div class="cal-options">
                <label v-for="opt in [
                  { value: 'planos', label: 'En planos o diseño arquitectónico' },
                  { value: 'construccion', label: 'En obra gris / construcción actual' },
                  { value: 'acabados', label: 'En etapa de acabados' },
                  { value: 'remodelacion', label: 'Remodelación de un espacio habitado' },
                ]" :key="opt.value" class="cal-option" :class="{ selected: form.etapa === opt.value }">
                  <input type="radio" :value="opt.value" v-model="form.etapa" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <span class="cal-option__label">{{ opt.label }}</span>
                </label>
              </div>
              <span v-if="touched && !form.etapa" class="cal-error">Selecciona una opción</span>
            </fieldset>

            <!-- Q3 — Presupuesto -->
            <fieldset class="cal-fieldset cal-fieldset--budget" :class="{ 'has-error': touched && !form.presupuesto, 'has-investment': form.presupuesto && form.presupuesto !== 'precio' }">
              <legend class="cal-legend cal-legend--budget">
                <span class="cal-q-num cal-q-num--budget">03</span>
                <span>¿Qué priorizas al contratar mobiliario modular?</span>
                <i class="fa-solid fa-gem cal-legend-chart" aria-hidden="true"></i>
              </legend>
              <div class="cal-options">
                <label v-for="opt in [
                  { value: 'calidad', label: 'Calidad, durabilidad y precisión técnica', premium: true },
                  { value: 'intermedio', label: 'Un balance equitativo entre calidad y costo', premium: false },
                  { value: 'precio', label: 'Busco la opción más barata del mercado', premium: false },
                ]" :key="opt.value" class="cal-option" :class="{
                  selected: form.presupuesto === opt.value,
                  'cal-option--premium': opt.premium && form.presupuesto === opt.value,
                  'cal-option--low': opt.value === 'precio' && form.presupuesto === 'precio',
                  'cal-option--premium-hover': opt.premium && form.presupuesto !== opt.value,
                }">
                  <input type="radio" :value="opt.value" v-model="form.presupuesto" hidden />
                  <span class="cal-option__radio" aria-hidden="true" />
                  <i v-if="opt.premium" class="fa-solid fa-gem cal-option__gem" aria-hidden="true"></i>
                  <span class="cal-option__label">{{ opt.label }}</span>
                </label>
              </div>
              <span v-if="touched && !form.presupuesto" class="cal-error">Selecciona un rango</span>
            </fieldset>

            <!-- Q4 — Reto -->
            <fieldset class="cal-fieldset" :class="{ 'has-error': touched && wordCount(form.reto) < 5 }">
              <legend class="cal-legend">
                <span class="cal-q-num">04</span>
                ¿Cuál es tu principal temor o mala experiencia previa con otros proveedores?
              </legend>
              <textarea
                v-model="form.reto"
                class="cal-textarea"
                placeholder="Ej: Tengo miedo de que se retrasen en la entrega, que las puertas de los gabinetes no cuadren o que el material se infle con la humedad..."
                rows="4"
                aria-describedby="q4-hint"
              ></textarea>
              <span id="q4-hint" class="cal-hint">
                {{ wordCount(form.reto) }}/5 palabras mínimo
              </span>
              <span v-if="touched && wordCount(form.reto) < 5" class="cal-error">
                Describe tu desafío con al menos 5 palabras
              </span>
            </fieldset>

            <!-- Consent -->
            <label class="cal-consent" :class="{ 'has-error': touched && !form.consent }">
              <input type="checkbox" v-model="form.consent" />
              <span class="cal-consent__box" aria-hidden="true" />
              <span class="cal-consent__text">
                Acepto que DISFAMOSA evalúe mis respuestas para agendar un Diagnóstico Técnico.
              </span>
            </label>
            <span v-if="touched && !form.consent" class="cal-error">Debes aceptar para continuar</span>

            <button type="submit" class="cal-submit" :disabled="submitting">
              <span v-if="!submitting">
                <i class="fa-solid fa-calendar-check" aria-hidden="true"></i>
                Ver disponibilidad
              </span>
              <span v-else>
                <i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i>
                Procesando...
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

.cal-fade-enter-active,
.cal-fade-leave-active { transition: opacity 0.25s ease; }
.cal-fade-enter-from,
.cal-fade-leave-to { opacity: 0; }

.cal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
}

.cal-modal {
  background: #000000;
  border-radius: 20px;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.2);
  border: 1px solid #222222;
}

.cal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: #111111;
  color: #CCCCCC;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: background 0.2s, color 0.2s;
  z-index: 1;
  &:hover { background: #222222; color: colors.$DIS-GOLD; }
}

.cal-header {
  padding: 2rem 2rem 1.25rem;
  border-bottom: 1px solid #222222;
  text-align: center;
}

.cal-header-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: colors.$DIS-DARK-BLUE;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  i { color: colors.$DIS-GOLD; font-size: 1.4rem; }
}

.cal-title {
  @include fonts.heading-font(800);
  font-size: 1.45rem;
  color: #ffffff;
  margin: 0 0 0.5rem;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.cal-accent { color: colors.$DIS-GOLD; }

.cal-subtitle {
  font-size: 0.86rem;
  color: #CCCCCC;
  margin: 0;
}

.cal-form {
  padding: 1.5rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cal-fieldset {
  border: none;
  padding: 0;
  margin: 0;

  &.has-error .cal-options { border-color: colors.$DIS-GOLD; border-radius: 10px; }

  &--budget {
    border: 1.5px solid transparent;
    border-radius: 12px;
    padding: 1rem 0.85rem;
    margin: 0 -0.85rem;
    transition: all 0.25s ease;

    &.has-investment {
      border-color: rgba(colors.$DIS-DARK-BLUE, 0.4);
      background: rgba(colors.$DIS-DARK-BLUE, 0.1);
    }
  }
}

.cal-legend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: fonts.$font-interface;
  font-size: 0.88rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.75rem;

  &--budget {
    gap: 0.4rem;
  }
}

.cal-legend-chart {
  color: colors.$DIS-GOLD;
  font-size: 0.8rem;
  margin-left: auto;
  animation: chart-pulse 2s ease-in-out infinite;

  .cal-fieldset--budget.has-investment & {
    animation: chart-pulse 1s ease-in-out infinite;
  }
}

@keyframes chart-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.85); }
}

.cal-q-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: colors.$DIS-DARK-BLUE;
  color: #ffffff;
  font-size: 0.72rem;
  font-weight: 800;
  flex-shrink: 0;

  &--budget {
    background: colors.$DIS-GOLD;
    color: #000;
  }
}

.cal-options {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.cal-option {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem 1.15rem;
  border: 1.5px solid #333333;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #151515;

  &:hover { 
    border-color: #555555; 
    background: #1e1e1e; 
    transform: translateY(-1px);
  }

  &.selected {
    border-color: colors.$DIS-GOLD;
    background: rgba(colors.$DIS-GOLD, 0.08);
  }

  &__radio {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #555555;
    flex-shrink: 0;
    position: relative;
    transition: all 0.2s ease;

    .cal-option.selected & {
      border-color: colors.$DIS-GOLD;
      background: rgba(colors.$DIS-GOLD, 0.1);
      &::after {
        content: '';
        position: absolute;
        inset: 4px;
        border-radius: 50%;
        background: colors.$DIS-GOLD;
        box-shadow: 0 0 8px colors.$DIS-GOLD;
      }
    }
  }

  &__label {
    font-size: 0.92rem;
    color: #DDDDDD;
    font-weight: 500;
    transition: color 0.2s ease;
    .cal-option.selected & { color: #FFFFFF; font-weight: 600; text-shadow: 0 0 1px rgba(255,255,255,0.3); }
  }
}

.cal-textarea {
  width: 100%;
  border: 1.5px solid #333333;
  border-radius: 12px;
  padding: 1rem 1.15rem;
  font-family: fonts.$font-secondary;
  font-size: 0.92rem;
  color: #FFFFFF;
  background: #151515;
  resize: vertical;
  outline: none;
  transition: all 0.2s ease;
  line-height: 1.55;
  box-sizing: border-box;
  &::placeholder { color: rgba(255, 255, 255, 0.35); }
  &:focus { 
    border-color: colors.$DIS-GOLD; 
    background: #1a1a1a; 
  }
}

.cal-hint {
  display: block;
  font-size: 0.76rem;
  color: #EEEEEE;
  margin-top: 0.35rem;
}

.cal-error {
  display: block;
  font-size: 0.78rem;
  color: colors.$OS-RED; /* Maybe DIS-RED later */
  margin-top: 0.35rem;
}

.cal-consent {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  cursor: pointer;
  padding: 0.5rem 0;

  input { display: none; }

  &__box {
    width: 20px;
    height: 20px;
    border: 2px solid #555555;
    border-radius: 6px;
    flex-shrink: 0;
    margin-top: 2px;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;

    input:checked ~ & {
      background: colors.$DIS-GOLD;
      border-color: colors.$DIS-GOLD;
      &::after { content: '✓'; color: #000; font-size: 0.8rem; font-weight: 900; }
    }
  }

  &__text {
    font-size: 0.82rem;
    color: #DDDDDD;
    line-height: 1.5;
  }
}

.cal-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  background: colors.$DIS-GOLD;
  color: #000000;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-family: fonts.$font-accent;
  font-size: 0.97rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s ease, transform 0.15s ease;
  box-shadow: 0 4px 16px rgba(colors.$DIS-GOLD, 0.3);
  &:hover:not(:disabled) { background: #FFD25B; transform: translateY(-1px); }
  &:disabled { opacity: 0.65; cursor: not-allowed; }
}
</style>
