<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero__bg">
        <div class="hero__gradient"></div>
        <div class="hero__pattern"></div>
      </div>
      
      <div class="container hero__content">
        <div class="hero__text">
          <div class="hero__badge">
            <span class="hero__badge-dot"></span>
            Lavandaria Ecológica Premium
          </div>
          
          <h1 class="hero__title text-black">
            Cuidado profissional.
            <span class="text-gradient">Naturalmente sustentável.</span>
          </h1>
          
          <p class="hero__description">
            Transforme a forma como você cuida das suas roupas. Tecnologia avançada 
            combinada com produtos 100% ecológicos para resultados impecáveis.
          </p>
          
          <div class="hero__actions">
            <router-link to="/servicos" class="btn btn-primary btn-lg">
              Conhecer Serviços
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </router-link>
            <a href="https://wa.me/258876378443" target="_blank" class="btn btn-secondary btn-lg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>
          </div>
          
          <div class="hero__stats">
            <div class="hero__stat">
              <span class="hero__stat-value">5000+</span>
              <span class="hero__stat-label">Clientes Satisfeitos</span>
            </div>
            <div class="hero__stat-divider"></div>
            <div class="hero__stat">
              <span class="hero__stat-value">100%</span>
              <span class="hero__stat-label">Produtos Ecológicos</span>
            </div>
            <div class="hero__stat-divider"></div>
            <div class="hero__stat">
              <span class="hero__stat-value">24h</span>
              <span class="hero__stat-label">Entrega Expressa</span>
            </div>
          </div>
        </div>
        
        <div class="hero__visual">
          <div class="hero__image-wrapper">
            <img src="/images/lavandaria-1.png" alt="Lavandaria Profissional" class="hero__image" />
            <div class="hero__image-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="section features">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Por que nos escolher</span>
          <h2 class="section-title text-black">Excelência em cada detalhe</h2>
          <p class="section-subtitle">
            Combinamos tecnologia de ponta com práticas sustentáveis para oferecer 
            o melhor serviço de lavandaria do mercado.
          </p>
        </div>
        
        <div class="features__grid">
          <div v-for="(feature, index) in features" :key="index" class="feature-card">
            <div class="feature-card__icon">{{ feature.icon }}</div>
            <h3 class="feature-card__title">{{ feature.title }}</h3>
            <p class="feature-card__description">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section class="section gallery">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Nosso Espaço</span>
          <h2 class="section-title text-black">Instalações modernas</h2>
          <p class="section-subtitle">
            Conheça nossa lavandaria equipada com tecnologia de ponta.
          </p>
        </div>
        
        <div class="gallery__slider">
          <div class="gallery__track" :style="{ transform: `translateX(-${galleryIndex * 100}%)` }">
            <div v-for="(image, index) in galleryImages" :key="index" class="gallery__slide">
              <div class="gallery__card">
                <img :src="image.src" :alt="image.alt" class="gallery__image" />
                <div class="gallery__caption">
                  <h4>{{ image.title }}</h4>
                  <p>{{ image.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="gallery__controls">
            <button @click="prevSlide" class="gallery__btn" :disabled="galleryIndex === 0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <div class="gallery__dots">
              <button 
                v-for="(_, index) in galleryImages" 
                :key="index"
                @click="galleryIndex = index"
                class="gallery__dot"
                :class="{ 'gallery__dot--active': galleryIndex === index }"
              ></button>
            </div>
            <button @click="nextSlide" class="gallery__btn" :disabled="galleryIndex === galleryImages.length - 1">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta">
      <div class="container">
        <div class="cta__card">
          <div class="cta__content">
            <h2 class="cta__title text-black">Pronto para experimentar a diferença?</h2>
            <p class="cta__description">
              Junte-se a milhares de clientes satisfeitos. Primeira lavagem com 20% de desconto.
            </p>
          </div>
          <div class="cta__actions">
            <router-link to="/precos" class="btn btn-primary btn-lg">
              Ver Preços
            </router-link>
            <router-link to="/contato" class="btn btn-secondary btn-lg">
              Fale Conosco
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section testimonials">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Depoimentos</span>
          <h2 class="section-title text-black">O que dizem sobre nós</h2>
          <p class="section-subtitle">
            A satisfação dos nossos clientes é a nossa maior conquista.
          </p>
        </div>
        
        <div class="testimonials__grid">
          <div v-for="(testimonial, index) in testimonials" :key="index" class="testimonial-card">
            <div class="testimonial-card__stars">
              <svg v-for="n in 5" :key="n" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <p class="testimonial-card__text">"{{ testimonial.text }}"</p>
            <div class="testimonial-card__author">
              <div class="testimonial-card__avatar">{{ testimonial.author.charAt(0) }}</div>
              <div>
                <div class="testimonial-card__name">{{ testimonial.author }}</div>
                <div class="testimonial-card__role">{{ testimonial.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue';

const features = [
  {
    icon: '🌿',
    title: '100% Ecológico',
    description: 'Produtos naturais à base de plantas, sem químicos agressivos.'
  },
  {
    icon: '✨',
    title: 'Tecnologia Avançada',
    description: 'Equipamentos de última geração para resultados perfeitos.'
  },
  {
    icon: '🛡️',
    title: 'Tecidos Protegidos',
    description: 'Cuidado especial que prolonga a vida das suas roupas.'
  },
  {
    icon: '⚡',
    title: 'Entrega Rápida',
    description: 'Serviço expresso com entrega em até 24 horas.'
  },
  {
    icon: '💧',
    title: 'Água Purificada',
    description: 'Sistema de filtragem que garante máxima qualidade.'
  },
  {
    icon: '🌍',
    title: 'Sustentável',
    description: 'Compromisso real com a preservação ambiental.'
  }
];

const galleryImages = [
  {
    src: '/images/lavandaria-1.png',
    alt: 'Lavandaria Moderna',
    title: 'Equipamentos Modernos',
    description: 'Tecnologia de ponta para o melhor cuidado'
  },
  {
    src: '/images/lavandaria-2.png',
    alt: 'Serviço Profissional',
    title: 'Equipe Qualificada',
    description: 'Profissionais treinados e dedicados'
  },
  {
    src: '/images/roupas-limpas.jpg',
    alt: 'Roupas Limpas',
    title: 'Resultados Impecáveis',
    description: 'Qualidade que você pode ver e sentir'
  }
];

const testimonials = [
  {
    text: 'Serviço excepcional! Minhas roupas nunca estiveram tão bem cuidadas. A qualidade e o atendimento são incomparáveis.',
    author: 'Maria Silva',
    role: 'Cliente há 2 anos'
  },
  {
    text: 'Finalmente encontrei uma lavandaria que se preocupa com o meio ambiente. Produtos ecológicos fazem toda diferença!',
    author: 'João Santos',
    role: 'Cliente Regular'
  },
  {
    text: 'Minha filha tem pele sensível e desde que mudamos para AromaNatural, acabaram as alergias. Muito obrigada!',
    author: 'Ana Costa',
    role: 'Mãe Satisfeita'
  }
];

const galleryIndex = ref(0);

const nextSlide = () => {
  if (galleryIndex.value < galleryImages.length - 1) {
    galleryIndex.value++;
  }
};

const prevSlide = () => {
  if (galleryIndex.value > 0) {
    galleryIndex.value--;
  }
};
</script>

<style scoped>
/* ========================================
   HERO SECTION
   ======================================== */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: var(--space-32) 0 var(--space-16);
  overflow: hidden;
}

.hero__bg {
  position: absolute;
  inset: 0;
  z-index: -1;
}

.hero__gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 80% 50% at 50% -20%, 
    rgba(45, 163, 255, 0.15), 
    transparent
  );
}

[data-theme="dark"] .hero__gradient {
  background: radial-gradient(ellipse 80% 50% at 50% -20%, 
    rgba(45, 163, 255, 0.2), 
    transparent
  );
}

.hero__pattern {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239ca3af' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.hero__content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-16);
  align-items: center;
}

.hero__text {
  max-width: 600px;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  background: var(--success);
  border-radius: var(--radius-full);
  animation: pulse 2s ease-in-out infinite;
}

.hero__title {
  font-size: var(--text-6xl);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: var(--tracking-tighter);
  margin-bottom: var(--space-6);
}

.hero__description {
  font-size: var(--text-xl);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-8);
}

.hero__actions {
  display: flex;
  gap: var(--space-4);
  margin-bottom: var(--space-12);
}

.hero__stats {
  display: flex;
  align-items: center;
  gap: var(--space-8);
  padding: var(--space-6);
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
}

.hero__stat {
  text-align: center;
}

.hero__stat-value {
  display: block;
  font-size: var(--text-2xl);
  font-weight: 700;
  color: var(--text-primary);
}

.hero__stat-label {
  font-size: var(--text-xs);
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.hero__stat-divider {
  width: 1px;
  height: 40px;
  background: var(--border-default);
}

/* Hero Visual */
.hero__visual {
  position: relative;
  display: flex;
  justify-content: center;
}

.hero__image-wrapper {
  position: relative;
  width: 100%;
  max-width: 500px;
}

.hero__image {
  width: 100%;
  height: auto;
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-2xl);
}

.hero__image-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, var(--primary-500), transparent 70%);
  opacity: 0.3;
  filter: blur(60px);
  z-index: -1;
}

/* ========================================
   FEATURES SECTION
   ======================================== */
.features {
  background: var(--bg-secondary);
}

.features__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.feature-card {
  padding: var(--space-8);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
  transition: all var(--duration-normal) var(--ease-out);
}

.feature-card:hover {
  border-color: var(--primary-500);
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.feature-card__icon {
  font-size: 2.5rem;
  margin-bottom: var(--space-4);
}

.feature-card__title {
  font-size: var(--text-lg);
  font-weight: 600;
  margin-bottom: var(--space-2);
}

.feature-card__description {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  margin: 0;
}

/* ========================================
   GALLERY SECTION  
   ======================================== */
.gallery__slider {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-2xl);
}

.gallery__track {
  display: flex;
  transition: transform var(--duration-slow) var(--ease-out);
}

.gallery__slide {
  flex: 0 0 100%;
  padding: 0 var(--space-2);
}

.gallery__card {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-2xl);
}

.gallery__image {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.gallery__caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-8);
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
}

.gallery__caption h4 {
  font-size: var(--text-xl);
  margin-bottom: var(--space-1);
  color: white;
}

.gallery__caption p {
  font-size: var(--text-sm);
  color: rgba(255,255,255,0.8);
  margin: 0;
}

.gallery__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.gallery__btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.gallery__btn:hover:not(:disabled) {
  background: var(--bg-hover);
  border-color: var(--primary-500);
}

.gallery__btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.gallery__dots {
  display: flex;
  gap: var(--space-2);
}

.gallery__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  background: var(--border-strong);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--duration-fast) var(--ease-out);
}

.gallery__dot--active {
  width: 24px;
  background: var(--primary-500);
}

/* ========================================
   CTA SECTION
   ======================================== */
.cta__card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
  padding: var(--space-12);
  background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
  border-radius: var(--radius-2xl);
}

.cta__title {
  font-size: var(--text-3xl);
  color: white;
  margin-bottom: var(--space-2);
}

.cta__description {
  font-size: var(--text-lg);
  color: rgba(255,255,255,0.9);
  margin: 0;
}

.cta__actions {
  display: flex;
  gap: var(--space-4);
  flex-shrink: 0;
}

.cta__actions .btn-primary {
  background: white;
  color: var(--primary-700);
}

.cta__actions .btn-primary:hover {
  background: var(--gray-100);
}

.cta__actions .btn-secondary {
  background: transparent;
  color: white;
  border-color: rgba(255,255,255,0.3);
}

.cta__actions .btn-secondary:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.5);
}

/* ========================================
   TESTIMONIALS SECTION
   ======================================== */
.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}

.testimonial-card {
  padding: var(--space-8);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-xl);
}

.testimonial-card__stars {
  display: flex;
  gap: var(--space-1);
  color: var(--warning);
  margin-bottom: var(--space-4);
}

.testimonial-card__text {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

.testimonial-card__author {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.testimonial-card__avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-500), var(--accent-500));
  color: white;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.testimonial-card__name {
  font-weight: 600;
  color: var(--text-primary);
}

.testimonial-card__role {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 1024px) {
  .hero__content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero__text {
    max-width: 100%;
  }
  
  .hero__actions {
    justify-content: center;
  }
  
  .hero__stats {
    justify-content: center;
  }
  
  .hero__visual {
    display: none;
  }
  
  .features__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cta__card {
    flex-direction: column;
    text-align: center;
  }
  
  .testimonials__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hero {
    padding: var(--space-24) 0 var(--space-12);
  }
  
  .hero__title {
    font-size: var(--text-4xl);
  }
  
  .hero__description {
    font-size: var(--text-base);
  }
  
  .hero__actions {
    flex-direction: column;
  }
  
  .hero__stats {
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .hero__stat-divider {
    width: 60px;
    height: 1px;
  }
  
  .features__grid {
    grid-template-columns: 1fr;
  }
  
  .gallery__image {
    height: 300px;
  }
  
  .cta__card {
    padding: var(--space-8);
  }
  
  .cta__actions {
    flex-direction: column;
    width: 100%;
  }
}
</style>
