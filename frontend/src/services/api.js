import axios from 'axios';

// URL base da API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Instância do Axios com configurações padrão
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token JWT em requisições protegidas
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratamento de respostas
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Tratamento de erros global
        if (error.response) {
            // Erro retornado pelo servidor
            console.error('Erro da API:', error.response.data);

            // Se token inválido/expirado, redireciona para login
            if (error.response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('admin');
                // Redirecionar para login se estiver em rota protegida
                if (window.location.pathname.includes('/admin')) {
                    window.location.href = '/admin/login';
                }
            }
        } else if (error.request) {
            // Erro de rede
            console.error('Erro de rede:', error.request);
        } else {
            console.error('Erro:', error.message);
        }
        return Promise.reject(error);
    }
);

/**
 * Serviços da API
 */

// ==================== PREÇOS ====================
export const precosAPI = {
    // Obter preços públicos (ativos)
    obterPublicos: () => api.get('/precos'),

    // Obter todos os preços (admin)
    obterTodos: (filtros = {}) => api.get('/precos/admin', { params: filtros }),

    // Criar novo preço
    criar: (dados) => api.post('/precos', dados),

    // Atualizar preço
    atualizar: (id, dados) => api.put(`/precos/${id}`, dados),

    // Deletar preço
    deletar: (id) => api.delete(`/precos/${id}`),
};

// ==================== AUTENTICAÇÃO ====================
export const authAPI = {
    // Login do admin
    login: (credenciais) => api.post('/auth/login', credenciais),

    // Obter perfil do admin autenticado
    obterPerfil: () => api.get('/auth/me'),

    // Alterar senha
    alterarSenha: (dados) => api.put('/auth/senha', dados),
};

// ==================== CONTATO ====================
export const contatoAPI = {
    // Enviar mensagem de contato (público)
    enviar: (dados) => api.post('/contato', dados),

    // Obter todas as mensagens (admin)
    obterTodas: (filtros = {}) => api.get('/contato', { params: filtros }),

    // Marcar como lido
    marcarLido: (id) => api.put(`/contato/${id}/lido`),

    // Deletar mensagem
    deletar: (id) => api.delete(`/contato/${id}`),
};

// ==================== AUXILIARES ====================

/**
 * Verifica se o usuário está autenticado
 */
export const estaAutenticado = () => {
    return !!localStorage.getItem('token');
};

/**
 * Faz logout removendo dados do localStorage
 */
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    window.location.href = '/admin/login';
};

/**
 * Salva dados do admin no localStorage
 */
export const salvarAdmin = (admin, token) => {
    localStorage.setItem('admin', JSON.stringify(admin));
    localStorage.setItem('token', token);
};

/**
 * Obtém dados do admin do localStorage
 */
export const obterAdmin = () => {
    const admin = localStorage.getItem('admin');
    return admin ? JSON.parse(admin) : null;
};

export default api;
