<template>
  <div class="precos-page">
    <!-- Header -->
    <section class="page-header bg-primaria">
      <div class="container">
        <h1 class="fade-in text-black">Tabela de Preços</h1>
        <p class="slide-in-left">Serviços de lavandaria ecológica com preços transparentes e justos</p>
      </div>
    </section>

    <!-- Conteúdo -->
    <section class="precos-section">
      <div class="container">
        <!-- Loading -->
        <div v-if="carregando" class="loading">
          <div class="spinner"></div>
          <p>Carregando preços...</p>
        </div>

        <!-- Erro -->
        <div v-else-if="erro" class="erro-message card">
          <p>❌ {{ erro }}</p>
          <button @click="carregarPrecos" class="btn btn-primaria">Tentar Novamente</button>
        </div>

        <!-- Tabela de Preços -->
        <div v-else class="precos-container">
          <!-- Filtros e Busca -->
          <div class="filtros">
            <div class="busca-input">
              <input
                type="text"
                v-model="termoBusca"
                placeholder="Buscar item..."
                class="form-input"
              />
              <span class="busca-icon">🔍</span>
            </div>
            
            <select v-model="categoriaFiltro" class="form-select">
              <option value="">Todas as Categorias</option>
              <option value="roupa">Roupas</option>
              <option value="acessorio">Acessórios</option>
              <option value="especial">Especiais</option>
              <option value="outro">Outros</option>
            </select>
          </div>

          <!-- Info -->
          <div class="info-card card">
            <p>
              <strong>💡 Informação:</strong> Preço 1 refere-se ao serviço padrão premium.
              Preço 2, quando disponível, refere-se ao serviço econômico.
            </p>
          </div>

          <!-- Tabela -->
          <div class="tabela-wrapper">
            <table class="precos-tabela">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Preço Premium (MT)</th>
                  <th>Preço Econômico (MT)</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="preco in precosFiltrados" :key="preco._id" class="fade-in">
                  <td class="item-nome">{{ preco.item }}</td>
                  <td class="preco-valor preco-premium">{{ preco.preco1 }} MT</td>
                  <td class="preco-valor preco-economico">
                    {{ preco.preco2 ? `${preco.preco2} MT` : '—' }}
                  </td>
                </tr>
                
                <!-- Mensagem quando não há resultados -->
                <tr v-if="precosFiltrados.length === 0">
                  <td colspan="3" class="sem-resultados">
                    Nenhum item encontrado para "{{ termoBusca }}"
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Estatísticas -->
          <div class="estatisticas">
            <p>Exibindo <strong>{{ precosFiltrados.length }}</strong> de <strong>{{ precos.length }}</strong> itens</p>
          </div>
        </div>

        <!-- CTA -->
        <div class="cta-box card bg-bege">
          <h3 class="text-black">Tem alguma dúvida sobre nossos serviços?</h3>
          <p>Entre em contato conosco ou faça um orçamento personalizado.</p>
          <div class="cta-buttons">
            <router-link to="/contato" class="btn btn-primaria">
              Entrar em Contato
            </router-link>
            <a href="https://wa.me/258876378443" target="_blank" class="btn btn-secundaria">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { precosAPI } from '../services/api';

const precos = ref([]);
const carregando = ref(true);
const erro = ref(null);
const termoBusca = ref('');
const categoriaFiltro = ref('');

// Computed para filtrar preços
const precosFiltrados = computed(() => {
  let resultado = precos.value;

  // Filtro de busca
  if (termoBusca.value) {
    resultado = resultado.filter(preco =>
      preco.item.toLowerCase().includes(termoBusca.value.toLowerCase())
    );
  }

  // Filtro de categoria
  if (categoriaFiltro.value) {
    resultado = resultado.filter(preco => preco.categoria === categoriaFiltro.value);
  }

  return resultado;
});

// Carregar preços da API
const carregarPrecos = async () => {
  try {
    carregando.value = true;
    erro.value = null;
    
    const response = await precosAPI.obterPublicos();
    
    if (response.data.sucesso) {
      precos.value = response.data.dados;
    } else {
      erro.value = 'Erro ao carregar preços';
    }
  } catch (err) {
    console.error('Erro ao buscar preços:', err);
    erro.value = 'Não foi possível carregar os preços. Verifique sua conexão e tente novamente.';
  } finally {
    carregando.value = false;
  }
};

onMounted(() => {
  carregarPrecos();
});
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

.precos-section {
  padding: var(--espaco-3xl) 0;
}

/* Loading */
.loading {
  text-align: center;
  padding: var(--espaco-3xl);
}

.spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto var(--espaco-lg);
  border: 4px solid var(--cor-cinza-claro);
  border-top-color: var(--cor-primaria);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Erro */
.erro-message {
  text-align: center;
  padding: var(--espaco-2xl);
  background-color: #FEE;
  border: 2px solid var(--cor-erro);
}

/* Filtros */
.filtros {
  display: flex;
  gap: var(--espaco-lg);
  margin-bottom: var(--espaco-xl);
  flex-wrap: wrap;
}

.busca-input {
  position: relative;
  flex: 1;
  min-width: 250px;
}

.busca-icon {
  position: absolute;
  right: var(--espaco-md);
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--texto-lg);
  pointer-events: none;
}

.form-select {
  min-width: 200px;
}

/* Info Card */
.info-card {
  margin-bottom: var(--espaco-xl);
  background-color: #E8F5E9;
  border-left: 4px solid var(--cor-primaria);
}

.info-card p {
  margin: 0;
  color: var(--cor-primaria-escura);
}

/* Tabela */
.tabela-wrapper {
  overflow-x: auto;
  margin-bottom: var(--espaco-xl);
  box-shadow: var(--sombra-md);
  border-radius: var(--radius-lg);
}

.precos-tabela {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--cor-branco);
}

.precos-tabela thead {
  background: linear-gradient(135deg, var(--cor-primaria-escura), var(--cor-primaria));
  color: var(--cor-branco);
}

.precos-tabela th {
  padding: var(--espaco-lg);
  text-align: left;
  font-weight: 600;
  font-size: var(--texto-base);
}

.precos-tabela td {
  padding: var(--espaco-lg);
  border-bottom: 1px solid var(--cor-cinza-claro);
}

.precos-tabela tbody tr {
  transition: background-color var(--transicao-rapida);
}

.precos-tabela tbody tr:hover {
  background-color: #F1F8F4;
}

.item-nome {
  font-weight: 600;
  color: var(--cor-preto);
}

.preco-valor {
  font-weight: 700;
  font-size: var(--texto-lg);
}

.preco-premium {
  color: var(--cor-primaria-escura);
}

.preco-economico {
  color: var(--cor-terroso);
}

.sem-resultados {
  text-align: center;
  padding: var(--espaco-2xl);
  color: var(--cor-cinza);
  font-style: italic;
}

/* Estatísticas */
.estatisticas {
  text-align: center;
  color: var(--cor-cinza);
  margin-bottom: var(--espaco-2xl);
}

/* CTA Box */
.cta-box {
  text-align: center;
  padding: var(--espaco-2xl);
  margin-top: var(--espaco-3xl);
}

.cta-box h3 {
  color: var(--cor-primaria-escura);
  margin-bottom: var(--espaco-md);
}

.cta-buttons {
  display: flex;
  gap: var(--espaco-lg);
  justify-content: center;
  margin-top: var(--espaco-lg);
  flex-wrap: wrap;
}

/* Responsividade */
@media (max-width: 768px) {
  .filtros {
    flex-direction: column;
  }
  
  .busca-input,
  .form-select {
    width: 100%;
  }
  
  .precos-tabela th,
  .precos-tabela td {
    padding: var(--espaco-md);
    font-size: var(--texto-sm);
  }
  
  .preco-valor {
    font-size: var(--texto-base);
  }
}
</style>
