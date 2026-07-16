<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import RegistrationModal from '@/components/RegistrationModal.vue'

const router = useRouter()
const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

onMounted(() => {
  sessionStorage.setItem('alu_page_entry', String(Date.now()))
  
  // Clean up any other bg
  document.body.style.backgroundColor = '#0a0f1d'
})
</script>

<template>
  <main class="funnel">
    <div class="funnel__container">
      
      <!-- HEADER -->
      <header class="funnel__header">
        <div class="funnel__logo-wrap">
          <span class="funnel__logo-text">Alma <span class="funnel__logo-accent">Remodelaciones</span></span>
        </div>
      </header>

      <!-- HERO -->
      <section class="funnel__hero">
        <h1 class="funnel__headline">
          ¿Cansado de sobrecostos y retrasos en tu obra? Descubre el método exacto para una <span class="funnel__headline-accent">remodelación integral sin dolores de cabeza</span>
        </h1>
        
        <p class="funnel__hero-sub">
          Si eres dueño de una propiedad residencial o comercial y buscas una renovación con acabados premium y ejecución estructurada, descubre cómo nuestro Método de Sincronización de Espacios Smart blinda tu inversión.
        </p>

        <div class="funnel__content-grid">
          <div class="funnel__vsl-column">
            <!-- VSL Falso (Abre modal) -->
            <div class="funnel__vsl-wrap" @click="openModal">
              <div class="funnel__vsl-overlay">
                <button class="funnel__play-btn" aria-label="Reproducir video">
                  <i class="fa-solid fa-play"></i>
                </button>
                <span class="funnel__vsl-msg">Haz clic para revelar el sistema exacto</span>
              </div>
              <img src="https://fast.wistia.com/embed/medias/nl8brnqhfz/swatch" class="funnel__vsl-thumb" alt="Video de entrenamiento" />
            </div>

            <button class="funnel__cta" @click="openModal">
              <i class="fa-solid fa-play"></i>
              ACCEDER A LA PRESENTACIÓN PRIVADA
            </button>
            <p class="funnel__guarantee">
              <i class="fa-solid fa-lock"></i> 100% gratuito · Sin compromiso · Cupos limitados
            </p>
          </div>
          
          <div class="funnel__bullets-column">
            <div class="funnel__bullets-box">
              <p class="funnel__bullets-title">Método de Sincronización Smart:</p>
              <ul class="funnel__bullets">
                <li><i class="fa-solid fa-circle-check"></i> <strong>Levantamiento técnico y proyección inteligente:</strong> Análisis riguroso y un render de altísima calidad para visualizar el resultado antes de iniciar.</li>
                <li><i class="fa-solid fa-circle-check"></i> <strong>Diseño colaborativo y funcionalidad:</strong> Optimizamos cada m² calculando el flujo, ergonomía e iluminación para crear una máquina de confort.</li>
                <li><i class="fa-solid fa-circle-check"></i> <strong>Ejecución estructurada y transparente:</strong> Esquemas de pagos claros (50-25-25) y logística al milímetro para cumplir el cronograma estrictamente.</li>
                <li><i class="fa-solid fa-circle-check"></i> <strong>Cero improvisación:</strong> Lo que ves en el render es exactamente al milímetro lo que se construye en la vida real.</li>
              </ul>
            </div>
          </div>
        </div>

      </section>

      <!-- STATS SECTION -->
      <section class="funnel__stats">
        <p class="funnel__stats-eyebrow">RESPALDO DE EXCELENCIA</p>
        <div class="funnel__stats-grid">
          <div class="funnel__stats-card">
            <div class="funnel__stats-icon"><i class="fa-solid fa-calendar-check"></i></div>
            <h3 class="funnel__stats-number">+8</h3>
            <p class="funnel__stats-text">años de experiencia técnica transformando espacios con verdadera alma</p>
          </div>
          <div class="funnel__stats-card">
            <div class="funnel__stats-icon"><i class="fa-solid fa-ruler-combined"></i></div>
            <h3 class="funnel__stats-number">100%</h3>
            <p class="funnel__stats-text">de precisión garantizada entre el diseño renderizado y la obra real</p>
          </div>
          <div class="funnel__stats-card">
            <div class="funnel__stats-icon"><i class="fa-solid fa-shield-halved"></i></div>
            <h3 class="funnel__stats-number">0</h3>
            <p class="funnel__stats-text">excusas: ejecución estructurada con total transparencia financiera</p>
          </div>
        </div>
      </section>

      <!-- AUTHORITY SECTION -->
      <section class="funnel__authority" aria-labelledby="authority-heading">
        <div class="funnel__authority-inner">
          <div class="funnel__authority-photo-wrap">
            <div class="funnel__authority-avatar" aria-hidden="true">
              <i class="fa-solid fa-user-tie"></i>
            </div>
          </div>
          <div class="funnel__authority-content">
            <p class="funnel__authority-eyebrow">Fundadora</p>
            <h2 id="authority-heading" class="funnel__authority-name">Sandy Hüello</h2>
            <p class="funnel__authority-role">Especialista en Remodelación Integral — Alma Remodelaciones</p>
            <p class="funnel__authority-bio">
              "A lo largo de mi experiencia he visto de todo. El verdadero problema no es la falta de ideas creativas, es la falta de un sistema técnico unificado. Por eso creé el Método de Sincronización de Espacios Smart: un sistema milimétrico donde el diseño y la construcción trabajan juntos para garantizar que tu inversión aumente el valor de tu propiedad sin dolores de cabeza."
            </p>
          </div>
        </div>
      </section>

      <!-- FINAL CTA -->
      <section class="funnel__final-cta">
        <div class="funnel__logo-wrap funnel__logo-wrap--large">
          <span class="funnel__logo-text">Alma <span class="funnel__logo-accent">Remodelaciones</span>.</span>
        </div>
        <h2 class="funnel__final-title">
          ¿Listo para dejar de lidiar con<br>
          <span class="funnel__final-accent">contratistas informales?</span>
        </h2>
        <p class="funnel__final-sub">
          Accede a nuestra presentación privada y descubre cómo profesionales se encargan de absolutamente todo, de principio a fin.<br><br>
        </p>
        <button class="funnel__cta funnel__cta--pulse" @click="openModal">
          <i class="fa-solid fa-play"></i>
          ¡QUIERO CONOCER EL SISTEMA!
        </button>
        <p class="funnel__guarantee">
          <i class="fa-solid fa-lock"></i> 100% gratuito · Sin compromiso
        </p>
      </section>

    </div>

    <!-- Registration Modal -->
    <RegistrationModal 
      :open="isModalOpen" 
      @close="closeModal" 
    />

    <footer class="funnel__footer">
      <nav class="funnel__footer-links" aria-label="Legal">
        <RouterLink to="/politicas-privacidad">Política de Privacidad</RouterLink>
        <RouterLink to="/aviso-legal">Aviso Legal</RouterLink>
      </nav>
      <p class="funnel__footer-copy">© {{ new Date().getFullYear() }} Alma Remodelaciones. Todos los derechos reservados.</p>
      <p class="funnel__footer-dev">Hecho por <a href="https://github.com/MrKanx" target="_blank" rel="noopener noreferrer">Kankox</a></p>
    </footer>

  </main>
</template>

<style lang="scss" scoped>
@use '@/styles/colorVariables.module.scss' as colors;
@use '@/styles/fonts.modules.scss' as fonts;

.funnel {
  min-height: 100vh;
  background-color: colors.$BG-BASE;
  background-image: radial-gradient(circle at top right, rgba(224, 106, 65, 0.05) 0%, transparent 40%),
                    radial-gradient(circle at bottom left, rgba(23, 23, 23, 0.8) 0%, transparent 40%);
  color: #ffffff;
  font-family: fonts.$font-secondary;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.funnel__container {
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  flex: 1;
}

.funnel__header {
  display: flex;
  justify-content: center;
  padding: 2rem 0 1rem;
}

.funnel__logo-text {
  font-family: fonts.$font-principal;
  font-size: clamp(1.4rem, 4vw, 1.8rem);
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -0.5px;
}

.funnel__logo-accent {
  color: colors.$DIS-GOLD;
}

.funnel__hero {
  text-align: center;
  margin-top: 1rem;
}

.funnel__headline {
  font-family: fonts.$font-principal;
  font-size: clamp(1.6rem, 6vw, 3.5rem);
  font-weight: 800;
  line-height: 1.1;
  color: #ffffff;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

.funnel__headline-accent {
  color: colors.$DIS-GOLD;
}

.funnel__hero-sub {
  font-size: clamp(0.95rem, 3vw, 1.1rem);
  color: #a0aec0;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  line-height: 1.5;
}

.funnel__content-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 2rem;
  align-items: start;
  text-align: left;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
}

.funnel__vsl-column {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.funnel__vsl-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  background: colors.$BG-SURFACE;
  backdrop-filter: blur(10px);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
  border: 1px solid colors.$BG-BORDER;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px rgba(colors.$DIS-GOLD, 0.15);

    .funnel__play-btn {
      transform: scale(1.1);
      background: colors.$DIS-GOLD;
      color: #000;
    }
  }
}

.funnel__vsl-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
}

.funnel__vsl-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.funnel__play-btn {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(4px);
  border: 2px solid colors.$DIS-GOLD;
  color: colors.$DIS-GOLD;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 1rem;
}

.funnel__vsl-msg {
  font-family: fonts.$font-interface;
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
  letter-spacing: 1px;
  text-transform: uppercase;
  background: rgba(0,0,0,0.6);
  padding: 4px 12px;
  border-radius: 20px;
}

.funnel__cta {
  margin-top: 2rem;
  width: 100%;
  background: colors.$DIS-GOLD;
  color: #000000;
  font-family: fonts.$font-accent;
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  padding: 18px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 10px 20px rgba(colors.$DIS-GOLD, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(colors.$DIS-GOLD, 0.4);
    background-color: #FB923C;
  }
}

.funnel__cta--pulse {
  background: linear-gradient(90deg, #C2410C 0%, #FB923C 100%);
  margin-top: 2.5rem;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 0 25px rgba(colors.$DIS-GOLD, 0.4);
  animation: pulse 2s infinite;

  &:hover {
    animation: none;
    box-shadow: 0 0 35px rgba(colors.$DIS-GOLD, 0.6);
    background: linear-gradient(90deg, #FB923C 0%, #FDBA74 100%);
  }
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 15px rgba(colors.$DIS-GOLD, 0.3); }
  50% { transform: scale(1.02); box-shadow: 0 0 35px rgba(colors.$DIS-GOLD, 0.5); }
  100% { transform: scale(1); box-shadow: 0 0 15px rgba(colors.$DIS-GOLD, 0.3); }
}

.funnel__guarantee {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #718096;
  font-family: fonts.$font-interface;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  
  i {
    color: colors.$DIS-GOLD;
  }
}

.funnel__bullets-box {
  background: colors.$BG-SURFACE;
  backdrop-filter: blur(12px);
  border: 1px solid colors.$BG-BORDER;
  border-radius: 16px;
  padding: 2.5rem;
  height: 100%;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
}

.funnel__bullets-title {
  font-family: fonts.$font-interface;
  font-size: 0.9rem;
  font-weight: 600;
  color: #cbd5e0;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 1.5rem;
}

.funnel__bullets {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  li {
    font-size: clamp(0.95rem, 2.5vw, 1.05rem);
    line-height: 1.4;
    color: #e2e8f0;
    display: flex;
    align-items: flex-start;
    gap: 12px;

    i {
      color: colors.$DIS-GOLD;
      font-size: 1.2rem;
      margin-top: 3px;
      flex-shrink: 0;
    }
  }
}

.funnel__stats {
  margin-top: 6rem;
  padding: 4rem 0;
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(23, 23, 23, 0.4);

  @media (max-width: 768px) {
    padding: 2.5rem 0;
    margin-top: 4rem;
  }
}

.funnel__stats-eyebrow {
  text-align: center;
  font-family: fonts.$font-interface;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: colors.$DIS-GOLD;
  text-transform: uppercase;
  margin-bottom: 2rem;
}

.funnel__stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.funnel__stats-card {
  background: colors.$BG-SURFACE;
  backdrop-filter: blur(8px);
  border: 1px solid colors.$BG-BORDER;
  border-radius: 16px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  transition: transform 0.3s;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }

  &:hover {
    transform: translateY(-5px);
    border-color: rgba(colors.$DIS-GOLD, 0.3);
  }
}

.funnel__stats-icon {
  width: 50px;
  height: 50px;
  margin: 0 auto 1rem;
  background: rgba(colors.$DIS-GOLD, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    font-size: 1.5rem;
    color: colors.$DIS-GOLD;
  }
}

.funnel__stats-number {
  font-family: fonts.$font-principal;
  font-size: 2.5rem;
  font-weight: 900;
  color: #fff;
  margin: 0 0 0.5rem;
}

.funnel__stats-text {
  font-size: 0.95rem;
  color: #a0aec0;
  margin: 0;
  line-height: 1.5;
}

/* AUTHORITY */
.funnel__authority {
  margin-top: 6rem;
  padding: 3.5rem;
  background: colors.$BG-SURFACE;
  backdrop-filter: blur(12px);
  border: 1px solid colors.$BG-BORDER;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.4);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    margin-top: 4rem;
  }
}

.funnel__authority-inner {
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 650px) {
    flex-direction: column;
    text-align: center;
  }
}

.funnel__authority-avatar {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 3px solid colors.$DIS-GOLD;
  box-shadow: 0 4px 20px rgba(224, 106, 65, 0.2);
  background: colors.$BG-BASE;
  display: flex;
  align-items: center;
  justify-content: center;

  i {
    color: colors.$DIS-GOLD;
    font-size: 2.5rem;
  }
}

.funnel__authority-eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: colors.$DIS-GOLD;
  letter-spacing: 0.05em;
  margin: 0 0 0.4rem;
}

.funnel__authority-name {
  @include fonts.heading-font(800);
  font-size: 1.8rem;
  color: #ffffff;
  margin: 0 0 0.25rem;
}

.funnel__authority-role {
  font-size: 0.9rem;
  color: #CCCCCC;
  margin: 0 0 1rem;
}

.funnel__authority-bio {
  font-size: 0.95rem;
  color: #a0aec0;
  line-height: 1.6;
  margin: 0;

  strong {
    color: #ffffff;
  }
}

/* FINAL CTA */
.funnel__final-cta {
  margin-top: 6rem;
  margin-bottom: 4rem;
  text-align: center;
  padding: 4rem 2rem;
  background: radial-gradient(circle at center, rgba(colors.$DIS-GOLD, 0.05) 0%, transparent 60%);

  @media (max-width: 768px) {
    padding: 2.5rem 1.5rem;
    margin-top: 4rem;
  }
}

.funnel__logo-wrap--large {
  margin-bottom: 1.5rem;

  .funnel__logo-text {
    font-size: 3.5rem;
    letter-spacing: -1.5px;
  }
}

.funnel__final-title {
  font-family: fonts.$font-principal;
  font-size: clamp(1.6rem, 6vw, 3rem);
  font-weight: 900;
  color: #ffffff;
  margin: 0 0 1.5rem;
  line-height: 1.1;
}

.funnel__final-accent {
  color: colors.$DIS-GOLD;
}

.funnel__final-sub {
  font-size: 1.1rem;
  color: #a0aec0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
}

/* FOOTER */
.funnel__footer {
  width: 100%;
  padding: 2.5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: colors.$BG-BASE;
}

.funnel__footer-links {
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

.funnel__footer-copy {
  font-size: 0.75rem;
  color: #718096;
  margin: 0;
}

.funnel__footer-dev {
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
</style>
