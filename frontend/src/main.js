import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Criar e montar a aplicação
const app = createApp(App);

app.use(router);

app.mount('#app');
