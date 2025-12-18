<template>
  <div id="app">
    <!-- Navbar apenas para rotas públicas -->
    <Navbar v-if="!isAdminRoute" />
    
    <!-- Conteúdo das rotas -->
    <router-view />
    
    <!-- Footer apenas para rotas públicas -->
    <Footer v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();

// Verifica se é rota admin
const isAdminRoute = computed(() => route.path.startsWith('/admin'));
</script>

<style>
/* Importa o design system global */
@import './assets/styles.css';

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
