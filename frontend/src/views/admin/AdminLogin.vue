<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-card card">
        <div class="login-header">
          <h1>🌿 AromaNatural</h1>
          <h2>Painel Administrativo</h2>
          <p>Faça login para acessar o sistema</p>
        </div>

        <form @submit.prevent="fazerLogin">
          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="credenciais.email"
              class="form-input"
              :class="{ erro: erros.email }"
              placeholder="admin@aromanatural.com"
              required
            />
            <span v-if="erros.email" class="erro-texto">{{ erros.email }}</span>
          </div>

          <div class="form-group">
            <label for="senha" class="form-label">Senha</label>
            <input
              type="password"
              id="senha"
              v-model="credenciais.senha"
              class="form-input"
              :class="{ erro: erros.senha }"
              placeholder="••••••••"
              required
            />
            <span v-if="erros.senha" class="erro-texto">{{ erros.senha }}</span>
          </div>

          <div v-if="erroGeral" class="erro-message">
            {{ erroGeral }}
          </div>

          <button type="submit" class="btn btn-primaria btn-grande" :disabled="carregando">
            {{ carregando ? 'Entrando...' : 'Entrar no Painel' }}
          </button>
        </form>

        <div class="login-footer">
          <router-link to="/" class="link-voltar">← Voltar ao Site</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { authAPI, salvarAdmin } from '../../services/api';

const router = useRouter();

const credenciais = reactive({
  email: '',
  senha: '',
});

const erros = reactive({
  email: '',
  senha: '',
});

const carregando = ref(false);
const erroGeral = ref('');

const validarFormulario = () => {
  let valido = true;
  erros.email = '';
  erros.senha = '';

  if (!credenciais.email) {
    erros.email = 'Email é obrigatório';
    valido = false;
  }

  if (!credenciais.senha) {
    erros.senha = 'Senha é obrigatória';
    valido = false;
  } else if (credenciais.senha.length < 6) {
    erros.senha = 'Senha deve ter no mínimo 6 caracteres';
    valido = false;
  }

  return valido;
};

const fazerLogin = async () => {
  if (!validarFormulario()) {
    return;
  }

  try {
    carregando.value = true;
    erroGeral.value = '';

    const response = await authAPI.login(credenciais);

    if (response.data.sucesso) {
      // Salva token e dados do admin
      salvarAdmin(response.data.admin, response.data.token);
      
      // Redireciona para dashboard
      router.push('/admin/dashboard');
    } else {
      erroGeral.value = 'Credenciais inválidas';
    }
  } catch (error) {
    console.error('Erro no login:', error);
    if (error.response && error.response.status === 401) {
      erroGeral.value = 'Email ou senha incorretos';
    } else {
      erroGeral.value = 'Erro ao fazer login. Tente novamente.';
    }
  } finally {
    carregando.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--cor-primaria-escura), var(--cor-primaria), var(--cor-primaria-clara));
  padding: var(--espaco-lg);
}

.login-container {
  width: 100%;
  max-width: 450px;
}

.login-card {
  padding: var(--espaco-3xl);
  background-color: var(--cor-branco);
  box-shadow: var(--sombra-xl);
}

.login-header {
  text-align: center;
  margin-bottom: var(--espaco-2xl);
}

.login-header h1 {
  font-size: var(--texto-3xl);
  color: var(--cor-primaria);
  margin-bottom: var(--espaco-sm);
}

.login-header h2 {
  font-size: var(--texto-xl);
  color: var(--cor-preto);
  margin-bottom: var(--espaco-sm);
}

.login-header p {
  color: var(--cor-cinza);
  font-size: var(--texto-sm);
}

.form-input.erro {
  border-color: var(--cor-erro);
}

.erro-texto {
  color: var(--cor-erro);
  font-size: var(--texto-sm);
  margin-top: var(--espaco-xs);
  display: block;
}

.erro-message {
  background-color: #FEE;
  border: 2px solid var(--cor-erro);
  color: var(--cor-erro);
  padding: var(--espaco-md);
  border-radius: var(--radius-md);
  margin-bottom: var(--espaco-lg);
  text-align: center;
}

.btn-grande {
  width: 100%;
  justify-content: center;
  margin-top: var(--espaco-md);
}

.login-footer {
  text-align: center;
  margin-top: var(--espaco-xl);
}

.link-voltar {
  color: var(--cor-cinza);
  font-size: var(--texto-sm);
}

.link-voltar:hover {
  color: var(--cor-primaria);
}
</style>
