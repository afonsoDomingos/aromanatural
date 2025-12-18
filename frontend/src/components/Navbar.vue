<template>
  <header class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="container navbar__inner">
      <!-- Logo -->
      <router-link to="/" class="navbar__logo">
        <img src="/logo.png" alt="AromaNatural" class="navbar__logo-img" />
        <span class="navbar__logo-text text-black">AromaNatural</span>
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="navbar__nav">
        <router-link 
          v-for="link in navLinks" 
          :key="link.to" 
          :to="link.to" 
          class="navbar__link"
          :class="{ 'navbar__link--active': $route.path === link.to }"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <!-- Actions -->
      <div class="navbar__actions">
        <!-- Theme Toggle -->
        <button 
          @click="toggleTheme" 
          class="theme-toggle" 
          :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
        >
          <div class="theme-toggle__track">
            <span class="theme-toggle__icon theme-toggle__icon--sun">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </span>
            <span class="theme-toggle__icon theme-toggle__icon--moon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
              </svg>
            </span>
            <span class="theme-toggle__thumb" :class="{ 'theme-toggle__thumb--dark': isDark }"></span>
          </div>
        </button>

        <!-- CTA Button -->
        <router-link to="/contato" class="btn btn-primary navbar__cta">
          Fale Conosco
        </router-link>

        <!-- Mobile Menu Button -->
        <button 
          class="navbar__mobile-btn" 
          @click="toggleMobile"
          :aria-expanded="isMobileOpen"
          aria-label="Menu"
        >
          <span class="navbar__mobile-icon" :class="{ 'navbar__mobile-icon--open': isMobileOpen }">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="isMobileOpen" class="navbar__mobile" @click.self="closeMobile">
        <nav class="navbar__mobile-nav">
          <router-link 
            v-for="link in navLinks" 
            :key="link.to" 
            :to="link.to" 
            class="navbar__mobile-link"
            @click="closeMobile"
          >
            <span class="navbar__mobile-link-icon">{{ link.icon }}</span>
            {{ link.label }}
          </router-link>
          
          <div class="navbar__mobile-divider"></div>
          
          <router-link to="/admin" class="navbar__mobile-link navbar__mobile-link--admin" @click="closeMobile">
            <span class="navbar__mobile-link-icon">👤</span>
            Área Admin
          </router-link>
        </nav>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const navLinks = [
  { to: '/', label: 'Início', icon: '🏠' },
  { to: '/servicos', label: 'Serviços', icon: '✨' },
  { to: '/precos', label: 'Preços', icon: '💰' },
  { to: '/contato', label: 'Contato', icon: '📧' },
];

const isScrolled = ref(false);
const isMobileOpen = ref(false);
const isDark = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

const toggleMobile = () => {
  isMobileOpen.value = !isMobileOpen.value;
  document.body.style.overflow = isMobileOpen.value ? 'hidden' : '';
};

const closeMobile = () => {
  isMobileOpen.value = false;
  document.body.style.overflow = '';
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

const initTheme = () => {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  isDark.value = saved ? saved === 'dark' : prefersDark;
  document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light');
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  initTheme();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  document.body.style.overflow = '';
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-light);
  transition: all var(--duration-normal) var(--ease-out);
}

[data-theme="dark"] .navbar {
  background: rgba(10, 10, 11, 0.8);
}

.navbar--scrolled {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-sm);
}

[data-theme="dark"] .navbar--scrolled {
  background: rgba(10, 10, 11, 0.95);
}

.navbar__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;
}

/* Logo */
.navbar__logo {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  text-decoration: none;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.navbar__logo:hover {
  opacity: 0.8;
}

.navbar__logo-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.navbar__logo-text {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: var(--tracking-tight);
}

/* Navigation */
.navbar__nav {
  display: flex;
  align-items: center;
  gap: var(--space-1);
}

.navbar__link {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius-lg);
  transition: all var(--duration-fast) var(--ease-out);
}

.navbar__link:hover {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.navbar__link--active {
  color: var(--primary-600);
  background: var(--primary-50);
}

[data-theme="dark"] .navbar__link--active {
  background: rgba(45, 163, 255, 0.15);
  color: var(--primary-400);
}

/* Actions */
.navbar__actions {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.navbar__cta {
  font-size: var(--text-sm);
}

/* Theme Toggle */
.theme-toggle {
  position: relative;
  display: flex;
  align-items: center;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.theme-toggle__track {
  position: relative;
  width: 56px;
  height: 28px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-full);
  transition: all var(--duration-normal) var(--ease-out);
}

.theme-toggle__track:hover {
  border-color: var(--border-strong);
}

.theme-toggle__icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: var(--text-tertiary);
  transition: all var(--duration-normal) var(--ease-out);
}

.theme-toggle__icon--sun {
  left: 6px;
}

.theme-toggle__icon--moon {
  right: 6px;
}

.theme-toggle__thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  background: var(--text-primary);
  border-radius: var(--radius-full);
  transition: all var(--duration-normal) var(--ease-out);
  box-shadow: var(--shadow-sm);
}

.theme-toggle__thumb--dark {
  left: calc(100% - 23px);
}

/* Mobile Button */
.navbar__mobile-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
}

.navbar__mobile-icon {
  position: relative;
  width: 20px;
  height: 14px;
}

.navbar__mobile-icon span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: var(--radius-full);
  transition: all var(--duration-normal) var(--ease-out);
}

.navbar__mobile-icon span:nth-child(1) { top: 0; }
.navbar__mobile-icon span:nth-child(2) { top: 50%; transform: translateY(-50%); }
.navbar__mobile-icon span:nth-child(3) { bottom: 0; }

.navbar__mobile-icon--open span:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.navbar__mobile-icon--open span:nth-child(2) {
  opacity: 0;
}

.navbar__mobile-icon--open span:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

/* Mobile Menu */
.navbar__mobile {
  position: fixed;
  inset: 72px 0 0;
  background: var(--bg-primary);
  overflow-y: auto;
  z-index: 999;
}

.navbar__mobile-nav {
  display: flex;
  flex-direction: column;
  padding: var(--space-6);
  gap: var(--space-2);
}

.navbar__mobile-link {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  font-size: var(--text-lg);
  font-weight: 500;
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius-xl);
  transition: all var(--duration-fast) var(--ease-out);
}

.navbar__mobile-link:hover,
.navbar__mobile-link.router-link-active {
  color: var(--text-primary);
  background: var(--bg-hover);
}

.navbar__mobile-link-icon {
  font-size: var(--text-xl);
}

.navbar__mobile-divider {
  height: 1px;
  background: var(--border-default);
  margin: var(--space-4) 0;
}

.navbar__mobile-link--admin {
  background: linear-gradient(135deg, var(--primary-600), var(--primary-700));
  color: white !important;
}

.navbar__mobile-link--admin:hover {
  background: linear-gradient(135deg, var(--primary-500), var(--primary-600));
}

/* Mobile Menu Transition */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all var(--duration-normal) var(--ease-out);
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Responsive */
@media (max-width: 768px) {
  .navbar__nav,
  .navbar__cta {
    display: none;
  }
  
  .navbar__mobile-btn {
    display: flex;
  }
  
  .navbar__inner {
    height: 64px;
  }
  
  .navbar__mobile {
    top: 64px;
  }
}
</style>
