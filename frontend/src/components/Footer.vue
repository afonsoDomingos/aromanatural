<template>
  <footer class="footer">
    <div class="footer__top">
      <div class="container">
        <div class="footer__grid">
          <!-- Brand Column -->
          <div class="footer__brand">
            <router-link to="/" class="footer__logo">
              <img src="/logo.png" alt="AromaNatural" class="footer__logo-img" />
              <span class="footer__logo-text">AromaNatural</span>
            </router-link>
            <p class="footer__description">
              Lavandaria ecológica premium com tecnologia sustentável. Cuidamos das suas roupas e do planeta.
            </p>
            <div class="footer__social">
              <a 
                v-for="social in socials" 
                :key="social.name"
                :href="social.url" 
                target="_blank" 
                rel="noopener noreferrer"
                class="footer__social-link"
                :aria-label="social.name"
              >
                <component :is="social.icon" />
              </a>
            </div>
          </div>

          <!-- Links Columns -->
          <div v-for="group in linkGroups" :key="group.title" class="footer__column">
            <h4 class="footer__column-title">{{ group.title }}</h4>
            <ul class="footer__links">
              <li v-for="link in group.links" :key="link.label">
                <router-link v-if="link.to" :to="link.to" class="footer__link">
                  {{ link.label }}
                </router-link>
                <a v-else :href="link.href" class="footer__link" target="_blank" rel="noopener">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Contact Column -->
          <div class="footer__column">
            <h4 class="footer__column-title">Contato</h4>
            <ul class="footer__contact">
              <li class="footer__contact-item">
                <span class="footer__contact-icon">📍</span>
                <span>Maputo, Moçambique</span>
              </li>
              <li class="footer__contact-item">
                <span class="footer__contact-icon">📞</span>
                <a href="tel:+258876378443">+258 87 637 8443</a>
              </li>
              <li class="footer__contact-item">
                <span class="footer__contact-icon">✉️</span>
                <a href="mailto:info@aromanatural.com">info@aromanatural.com</a>
              </li>
              <li class="footer__contact-item">
                <span class="footer__contact-icon">🕐</span>
                <span>Seg - Sáb: 8h - 18h</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container footer__bottom-inner">
        <p class="footer__copyright">
          © {{ currentYear }} AromaNatural. Todos os direitos reservados.
        </p>
        <div class="footer__bottom-links">
          <a href="#" class="footer__bottom-link">Privacidade</a>
          <a href="#" class="footer__bottom-link">Termos</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed, h } from 'vue';

const currentYear = computed(() => new Date().getFullYear());

// Social Icons as render functions
const FacebookIcon = () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' })
]);

const InstagramIcon = () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' })
]);

const WhatsAppIcon = () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'currentColor' }, [
  h('path', { d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' })
]);

const socials = [
  { name: 'Facebook', url: 'https://facebook.com', icon: FacebookIcon },
  { name: 'Instagram', url: 'https://instagram.com', icon: InstagramIcon },
  { name: 'WhatsApp', url: 'https://wa.me/258876378443', icon: WhatsAppIcon },
];

const linkGroups = [
  {
    title: 'Navegação',
    links: [
      { label: 'Início', to: '/' },
      { label: 'Serviços', to: '/servicos' },
      { label: 'Preços', to: '/precos' },
      { label: 'Contato', to: '/contato' },
    ]
  },
  {
    title: 'Serviços',
    links: [
      { label: 'Lavagem Ecológica', href: '#' },
      { label: 'Passagem a Ferro', href: '#' },
      { label: 'Limpeza a Seco', href: '#' },
      { label: 'Tingimento', href: '#' },
    ]
  },
];
</script>

<style scoped>
.footer {
  margin-top: auto;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-default);
}

.footer__top {
  padding: var(--space-16) 0 var(--space-12);
}

.footer__grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  gap: var(--space-12);
}

/* Brand */
.footer__brand {
  max-width: 320px;
}

.footer__logo {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  margin-bottom: var(--space-4);
}

.footer__logo-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.footer__logo-text {
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
  color: var(--text-primary);
}

.footer__description {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-6);
}

/* Social Links */
.footer__social {
  display: flex;
  gap: var(--space-2);
}

.footer__social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-out);
}

.footer__social-link:hover {
  background: var(--primary-600);
  color: white;
  transform: translateY(-2px);
}

/* Columns */
.footer__column-title {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.footer__links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__link {
  font-size: var(--text-sm);
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__link:hover {
  color: var(--primary-600);
}

/* Contact */
.footer__contact {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer__contact-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--text-sm);
  color: var(--text-tertiary);
}

.footer__contact-icon {
  flex-shrink: 0;
}

.footer__contact-item a {
  color: var(--text-tertiary);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__contact-item a:hover {
  color: var(--primary-600);
}

/* Bottom */
.footer__bottom {
  padding: var(--space-6) 0;
  border-top: 1px solid var(--border-default);
}

.footer__bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer__copyright {
  font-size: var(--text-sm);
  color: var(--text-muted);
}

.footer__bottom-links {
  display: flex;
  gap: var(--space-6);
}

.footer__bottom-link {
  font-size: var(--text-sm);
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}

.footer__bottom-link:hover {
  color: var(--text-primary);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-8);
  }
  
  .footer__brand {
    grid-column: span 2;
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .footer__top {
    padding: var(--space-10) 0 var(--space-8);
  }
  
  .footer__grid {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  
  .footer__brand {
    grid-column: span 1;
    text-align: center;
  }
  
  .footer__logo {
    justify-content: center;
  }
  
  .footer__social {
    justify-content: center;
  }
  
  .footer__column {
    text-align: center;
  }
  
  .footer__contact-item {
    justify-content: center;
  }
  
  .footer__bottom-inner {
    flex-direction: column;
    gap: var(--space-4);
    text-align: center;
  }
}
</style>
