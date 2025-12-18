<template>
  <div class="contato-page">
    <!-- Header -->
    <section class="page-header bg-primaria">
      <div class="container">
        <h1 class="fade-in">Entre em Contato</h1>
        <p class="slide-in-left">Estamos prontos para atender você</p>
      </div>
    </section>

    <!-- Conteúdo -->
    <section class="contato-section">
      <div class="container">
        <div class="contato-grid">
          <!-- Informações de Contato -->
          <div class="contato-info">
            <h2>Fale Conosco</h2>
            <p>
              Tem alguma dúvida ou precisa de um orçamento? Entre em contato
              através de nossos canais de atendimento.
            </p>

            <div class="info-items">
              <div class="info-item card">
                <div class="info-icon">📞</div>
                <div class="info-content">
                  <h4>Telefones</h4>
                  <a href="tel:+258876378443">+258 87 637 8443</a><br>
                  <a href="tel:+258853853747">+258 85 385 3747</a>
                </div>
              </div>

              <div class="info-item card">
                <div class="info-icon">✉️</div>
                <div class="info-content">
                  <h4>Email</h4>
                  <a href="mailto:contato@aromanatural.com">contato@aromanatural.com</a>
                </div>
              </div>

              <div class="info-item card">
                <div class="info-icon">📍</div>
                <div class="info-content">
                  <h4>Endereço</h4>
                  <p>Mercado de Nkobe, Matola<br>Moçambique</p>
                </div>
              </div>

              <div class="info-item card">
                <div class="info-icon">⏰</div>
                <div class="info-content">
                  <h4>Horário de Funcionamento</h4>
                  <p>Segunda a Sexta: 8h - 18h<br>Sábado: 8h - 14h</p>
                </div>
              </div>
            </div>

            <!-- WhatsApp -->
            <a href="https://wa.me/258876378443" target="_blank" class="whatsapp-button btn btn-primaria btn-grande">
              <span class="whatsapp-icon">💬</span>
              Falar no WhatsApp
            </a>
          </div>

          <!-- Formulário de Contato -->
          <div class="contato-form-wrapper card">
            <h3>Envie uma Mensagem</h3>
            
            <!-- Sucesso -->
            <div v-if="enviado" class="sucesso-message">
              <p>✅ Mensagem enviada com sucesso!</p>
              <p>Entraremos em contato em breve.</p>
              <button @click="resetarFormulario" class="btn btn-secundaria">
                Enviar Nova Mensagem
              </button>
            </div>

            <!-- Formulário -->
            <form v-else @submit.prevent="enviarMensagem">
              <div class="form-group">
                <label for="nome" class="form-label">Nome Completo *</label>
                <input
                  type="text"
                  id="nome"
                  v-model="formulario.nome"
                  class="form-input"
                  :class="{ erro: erros.nome }"
                  required
                />
                <span v-if="erros.nome" class="erro-texto">{{ erros.nome }}</span>
              </div>

              <div class="form-group">
                <label for="email" class="form-label">Email *</label>
                <input
                  type="email"
                  id="email"
                  v-model="formulario.email"
                  class="form-input"
                  :class="{ erro: erros.email }"
                  required
                />
                <span v-if="erros.email" class="erro-texto">{{ erros.email }}</span>
              </div>

              <div class="form-group">
                <label for="telefone" class="form-label">Telefone</label>
                <input
                  type="tel"
                  id="telefone"
                  v-model="formulario.telefone"
                  class="form-input"
                  placeholder="+258 XX XXX XXXX"
                />
              </div>

              <div class="form-group">
                <label for="mensagem" class="form-label">Mensagem *</label>
                <textarea
                  id="mensagem"
                  v-model="formulario.mensagem"
                  class="form-textarea"
                  :class="{ erro: erros.mensagem }"
                  rows="6"
                  required
                ></textarea>
                <span v-if="erros.mensagem" class="erro-texto">{{ erros.mensagem }}</span>
              </div>

              <!-- Erro Geral -->
              <div v-if="erroGeral" class="erro-message">
                {{ erroGeral }}
              </div>

              <button type="submit" class="btn btn-primaria btn-grande" :disabled="enviando">
                {{ enviando ? 'Enviando...' : 'Enviar Mensagem' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Mapa (Placeholder) -->
        <div class="mapa-section">
          <h2 class="text-center">Nossa Localização</h2>
          <div class="mapa-placeholder card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3585.2345678!2d32.4585!3d-25.9625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDU3JzQ1LjAiUyAzMsKwMjcnMzAuNiJF!5e0!3m2!1spt-PT!2smz!4v1234567890"
              width="100%"
              height="400"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { contatoAPI } from '../services/api';

const formulario = reactive({
  nome: '',
  email: '',
  telefone: '',
  mensagem: '',
});

const erros = reactive({
  nome: '',
  email: '',
  mensagem: '',
});

const enviando = ref(false);
const enviado = ref(false);
const erroGeral = ref('');

const validarFormulario = () => {
  let valido = true;
  erros.nome = '';
  erros.email = '';
  erros.mensagem = '';

  if (formulario.nome.length < 2) {
    erros.nome = 'Nome deve ter no mínimo 2 caracteres';
    valido = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formulario.email)) {
    erros.email = 'Email inválido';
    valido = false;
  }

  if (formulario.mensagem.length < 10) {
    erros.mensagem = 'Mensagem deve ter no mínimo 10 caracteres';
    valido = false;
  }

  return valido;
};

const enviarMensagem = async () => {
  if (!validarFormulario()) {
    return;
  }

  try {
    enviando.value = true;
    erroGeral.value = '';

    const response = await contatoAPI.enviar(formulario);

    if (response.data.sucesso) {
      enviado.value = true;
    } else {
      erroGeral.value = 'Erro ao enviar mensagem. Tente novamente.';
    }
  } catch (error) {
    console.error('Erro ao enviar contato:', error);
    erroGeral.value = 'Erro ao enviar mensagem. Verifique sua conexão e tente novamente.';
  } finally {
    enviando.value = false;
  }
};

const resetarFormulario = () => {
  formulario.nome = '';
  formulario.email = '';
  formulario.telefone = '';
  formulario.mensagem = '';
  enviado.value = false;
  erroGeral.value = '';
};
</script>

<style scoped>
.page-header {
  padding: var(--espaco-3xl) 0;
  text-align: center;
  color: var(--cor-branco);
  background: linear-gradient(135deg, var(--cor-primaria-escura), var(--cor-primaria));
}

.page-header h1 {
  color: var(--cor-branco);
  font-size: var(--texto-4xl);
  margin-bottom: var(--espaco-md);
}

.page-header p {
  font-size: var(--texto-lg);
  color: rgba(255, 255, 255, 0.9);
}

.contato-section {
  padding: var(--espaco-3xl) 0;
}

.contato-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--espaco-3xl);
  margin-bottom: var(--espaco-3xl);
}

/* Informações */
.contato-info h2 {
  color: var(--cor-primaria);
  margin-bottom: var(--espaco-lg);
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: var(--espaco-lg);
  margin: var(--espaco-2xl) 0;
}

.info-item {
  display: flex;
  gap: var(--espaco-lg);
  padding: var(--espaco-lg);
  transition: transform var(--transicao-normal);
}

.info-item:hover {
  transform: translateX(5px);
}

.info-icon {
  font-size: 2.5rem;
}

.info-content h4 {
  color: var(--cor-primaria);
  margin-bottom: var(--espaco-sm);
}

.info-content a {
  color: var(--cor-cinza);
  font-weight: 600;
}

.info-content a:hover {
  color: var(--cor-primaria);
}

.info-content p {
  margin: 0;
  color: var(--cor-cinza);
}

.whatsapp-button {
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
  gap: var(--espaco-md);
}

.whatsapp-icon {
  font-size: var(--texto-2xl);
}

/* Formulário */
.contato-form-wrapper {
  padding: var(--espaco-2xl);
}

.contato-form-wrapper h3 {
  color: var(--cor-primaria);
  margin-bottom: var(--espaco-xl);
}

.form-input.erro,
.form-textarea.erro {
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

.sucesso-message {
  text-align: center;
  padding: var(--espaco-2xl);
  background-color: #E8F5E9;
  border-radius: var(--radius-lg);
}

.sucesso-message p:first-child {
  font-size: var(--texto-xl);
  font-weight: 700;
  color: var(--cor-sucesso);
  margin-bottom: var(--espaco-md);
}

.sucesso-message button {
  margin-top: var(--espaco-lg);
}

/* Mapa */
.mapa-section {
  margin-top: var(--espaco-3xl);
}

.mapa-section h2 {
  margin-bottom: var(--espaco-xl);
  color: var(--cor-primaria);
}

.mapa-placeholder {
  overflow: hidden;
  padding: 0;
}

.mapa-placeholder iframe {
  display: block;
}

/* Responsividade */
@media (max-width: 968px) {
  .contato-grid {
    grid-template-columns: 1fr;
    gap: var(--espaco-2xl);
  }
}
</style>
