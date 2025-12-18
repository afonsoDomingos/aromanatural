import { createRouter, createWebHistory } from 'vue-router';
import { estaAutenticado } from '../services/api';

// Views Públicas
import Home from '../views/Home.vue';
import Servicos from '../views/Servicos.vue';
import Precos from '../views/Precos.vue';
import Contato from '../views/Contato.vue';

// Views Admin
import AdminLogin from '../views/admin/AdminLogin.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';

const routes = [
    // Rotas Públicas
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: { title: 'AromaNatural - Limpeza Pura. Naturalmente.' },
    },
    {
        path: '/servicos',
        name: 'Servicos',
        component: Servicos,
        meta: { title: 'Nossos Serviços - AromaNatural' },
    },
    {
        path: '/precos',
        name: 'Precos',
        component: Precos,
        meta: { title: 'Tabela de Preços - AromaNatural' },
    },
    {
        path: '/contato',
        name: 'Contato',
        component: Contato,
        meta: { title: 'Contato - AromaNatural' },
    },

    // Rotas Admin
    {
        path: '/admin',
        redirect: '/admin/dashboard',
    },
    {
        path: '/admin/login',
        name: 'AdminLogin',
        component: AdminLogin,
        meta: { title: 'Login Admin - AromaNatural', requiresGuest: true },
    },
    {
        path: '/admin/dashboard',
        name: 'AdminDashboard',
        component: AdminDashboard,
        meta: { title: 'Dashboard Admin - AromaNatural', requiresAuth: true },
    },

    // 404
    {
        path: '/:pathMatch(.*)*',
        redirect: '/',
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0, behavior: 'smooth' };
        }
    },
});

// Guards de Navegação
router.beforeEach((to, from, next) => {
    // Atualiza título da página
    document.title = to.meta.title || 'AromaNatural';

    // Verifica autenticação
    const autenticado = estaAutenticado();

    if (to.meta.requiresAuth && !autenticado) {
        // Rota protegida, mas usuário não autenticado
        next('/admin/login');
    } else if (to.meta.requiresGuest && autenticado) {
        // Rota de guest, mas usuário já está autenticado
        next('/admin/dashboard');
    } else {
        next();
    }
});

export default router;
