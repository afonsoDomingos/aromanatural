<template>
  <div class="admin-dashboard">
    <!-- Header Admin -->
    <header class="admin-header">
      <div class="container">
        <div class="header-content">
          <div class="logo-section">
            <h1>🌿 AromaNatural</h1>
            <span class="badge">Admin</span>
          </div>
          <div class="user-section">
            <span class="welcome">Olá, {{ admin?.nome }}</span>
            <button @click="sair" class="btn btn-secundaria btn-small">Sair</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="admin-main">
      <div class="container">
        <div class="dashboard-header">
          <h2>Gestão de Preços</h2>
          <button @click="abrirModalCriar" class="btn btn-primaria">
            + Adicionar Novo Item
          </button>
        </div>

        <!-- Filtros -->
        <div class="filtros-admin">
          <input
            type="text"
            v-model="termoBusca"
            placeholder="Buscar item..."
            class="form-input"
          />
          <select v-model="categoriaFiltro" class="form-select">
            <option value="">Todas as Categorias</option>
            <option value="roupa">Roupas</option>
            <option value="acessorio">Acessórios</option>
            <option value="especial">Especiais</option>
            <option value="outro">Outros</option>
          </select>
          <select v-model="statusFiltro" class="form-select">
            <option value="">Todos</option>
            <option value="true">Ativos</option>
            <option value="false">Inativos</option>
          </select>
        </div>

        <!-- Loading -->
        <div v-if="carregando" class="loading">
          <div class="spinner"></div>
          <p>Carregando preços...</p>
        </div>

        <!-- Tabela de Preços -->
        <div v-else class="tabela-admin-wrapper">
          <table class="tabela-admin">
            <thead>
              <tr>
                <th>Item</th>
                <th>Categoria</th>
                <th>Preço 1 (MT)</th>
                <th>Preço 2 (MT)</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="preco in precosFiltrados" :key="preco._id">
                <td class="item-nome">{{ preco.item }}</td>
                <td>
                  <span class="categoria-badge" :class="`cat-${preco.categoria}`">
                    {{ traduzirCategoria(preco.categoria) }}
                  </span>
                </td>
                <td class="preco-valor">{{ preco.preco1 }} MT</td>
                <td class="preco-valor">{{ preco.preco2 ? `${preco.preco2} MT` : '—' }}</td>
                <td>
                  <span class="status-badge" :class="{ ativo: preco.ativo, inativo: !preco.ativo }">
                    {{ preco.ativo ? 'Ativo' : 'Inativo' }}
                  </span>
                </td>
                <td class="acoes">
                  <button @click="abrirModalEditar(preco)" class="btn-icone btn-editar" title="Editar">
                    ✏️
                  </button>
                  <button @click="confirmarDeletar(preco)" class="btn-icone btn-deletar" title="Deletar">
                    🗑️
                  </button>
                </td>
              </tr>
              <tr v-if="precosFiltrados.length === 0">
                <td colspan="6" class="sem-resultados">
                  Nenhum item encontrado
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Estatísticas -->
        <div class="estatisticas-admin">
          <p>Total de itens: <strong>{{ precos.length }}</strong> | Exibindo: <strong>{{ precosFiltrados.length }}</strong></p>
        </div>
      </div>
    </main>

    <!-- Modal Criar/Editar -->
    <div v-if="modalAberto" class="modal-overlay" @click.self="fecharModal">
      <div class="modal-content card">
        <div class="modal-header">
          <h3>{{ modoEdicao ? 'Editar Item' : 'Novo Item' }}</h3>
          <button @click="fecharModal" class="btn-fechar">✕</button>
        </div>
        
        <form @submit.prevent="salvarItem">
          <div class="form-group">
            <label class="form-label">Nome do Item *</label>
            <input
              type="text"
              v-model="itemForm.item"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">Categoria *</label>
            <select v-model="itemForm.categoria" class="form-select" required>
              <option value="roupa">Roupa</option>
              <option value="acessorio">Acessório</option>
              <option value="especial">Especial</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Preço Premium (MT) *</label>
              <input
                type="number"
                v-model="itemForm.preco1"
                class="form-input"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div class="form-group">
              <label class="form-label">Preço Econômico (MT)</label>
              <input
                type="number"
                v-model="itemForm.preco2"
                class="form-input"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Descrição</label>
            <textarea
              v-model="itemForm.descricao"
              class="form-textarea"
              rows="3"
            ></textarea>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="itemForm.ativo" />
              <span>Item ativo (visível no site público)</span>
            </label>
          </div>

          <div v-if="erroModal" class="erro-message">
            {{ erroModal }}
          </div>

          <div class="modal-actions">
            <button type="button" @click="fecharModal" class="btn btn-secundaria">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primaria" :disabled="salvando">
              {{ salvando ? 'Salvando...' : 'Salvar' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Confirmar Deletar -->
    <div v-if="modalDeletarAberto" class="modal-overlay" @click.self="modalDeletarAberto = false">
      <div class="modal-content modal-small card">
        <h3>Confirmar Exclusão</h3>
        <p>Tem certeza que deseja deletar o item <strong>"{{ itemParaDeletar?.item }}"</strong>?</p>
        <p class="aviso">⚠️ Esta ação não pode ser desfeita.</p>
        
        <div class="modal-actions">
          <button @click="modalDeletarAberto = false" class="btn btn-secundaria">
            Cancelar
          </button>
          <button @click="deletarItem" class="btn btn-primaria" :disabled="deletando" style="background-color: var(--cor-erro)">
            {{ deletando ? 'Deletando...' : 'Deletar' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { precosAPI, logout, obterAdmin } from '../../services/api';

const router = useRouter();
const admin = ref(obterAdmin());

// Estado
const precos = ref([]);
const carregando = ref(true);
const termoBusca = ref('');
const categoriaFiltro = ref('');
const statusFiltro = ref('');

// Modal
const modalAberto = ref(false);
const modoEdicao = ref(false);
const salvando = ref(false);
const erroModal = ref('');

// Deletar
const modalDeletarAberto = ref(false);
const itemParaDeletar = ref(null);
const deletando = ref(false);

const itemForm = reactive({
  id: null,
  item: '',
  categoria: 'roupa',
  preco1: '',
  preco2: '',
  descricao: '',
  ativo: true,
});

// Computed
const precosFiltrados = computed(() => {
  let resultado = precos.value;

  if (termoBusca.value) {
    resultado = resultado.filter(p =>
      p.item.toLowerCase().includes(termoBusca.value.toLowerCase())
    );
  }

  if (categoriaFiltro.value) {
    resultado = resultado.filter(p => p.categoria === categoriaFiltro.value);
  }

  if (statusFiltro.value) {
    resultado = resultado.filter(p => p.ativo === (statusFiltro.value === 'true'));
  }

  return resultado;
});

// Métodos
const carregarPrecos = async () => {
  try {
    carregando.value = true;
    const response = await precosAPI.obterTodos();
    if (response.data.sucesso) {
      precos.value = response.data.dados;
    }
  } catch (error) {
    console.error('Erro ao carregar preços:', error);
  } finally {
    carregando.value = false;
  }
};

const abrirModalCriar = () => {
  modoEdicao.value = false;
  resetarForm();
  modalAberto.value = true;
};

const abrirModalEditar = (preco) => {
  modoEdicao.value = true;
  itemForm.id = preco._id;
  itemForm.item = preco.item;
  itemForm.categoria = preco.categoria;
  itemForm.preco1 = preco.preco1;
  itemForm.preco2 = preco.preco2 || '';
  itemForm.descricao = preco.descricao || '';
  itemForm.ativo = preco.ativo;
  modalAberto.value = true;
};

const fecharModal = () => {
  modalAberto.value = false;
  erroModal.value = '';
  resetarForm();
};

const resetarForm = () => {
  itemForm.id = null;
  itemForm.item = '';
  itemForm.categoria = 'roupa';
  itemForm.preco1 = '';
  itemForm.preco2 = '';
  itemForm.descricao = '';
  itemForm.ativo = true;
};

const salvarItem = async () => {
  try {
    salvando.value = true;
    erroModal.value = '';

    const dados = {
      item: itemForm.item,
      categoria: itemForm.categoria,
      preco1: parseFloat(itemForm.preco1),
      preco2: itemForm.preco2 ? parseFloat(itemForm.preco2) : null,
      descricao: itemForm.descricao,
      ativo: itemForm.ativo,
    };

    if (modoEdicao.value) {
      await precosAPI.atualizar(itemForm.id, dados);
    } else {
      await precosAPI.criar(dados);
    }

    await carregarPrecos();
    fecharModal();
  } catch (error) {
    console.error('Erro ao salvar:', error);
    erroModal.value = error.response?.data?.mensagem || 'Erro ao salvar item';
  } finally {
    salvando.value = false;
  }
};

const confirmarDeletar = (preco) => {
  itemParaDeletar.value = preco;
  modalDeletarAberto.value = true;
};

const deletarItem = async () => {
  try {
    deletando.value = true;
    await precosAPI.deletar(itemParaDeletar.value._id);
    await carregarPrecos();
    modalDeletarAberto.value = false;
    itemParaDeletar.value = null;
  } catch (error) {
    console.error('Erro ao deletar:', error);
    alert('Erro ao deletar item');
  } finally {
    deletando.value = false;
  }
};

const traduzirCategoria = (cat) => {
  const traducoes = {
    roupa: 'Roupa',
    acessorio: 'Acessório',
    especial: 'Especial',
    outro: 'Outro',
  };
  return traducoes[cat] || cat;
};

const sair = () => {
  if (confirm('Deseja realmente sair?')) {
    logout();
  }
};

onMounted(() => {
  if (!admin.value) {
    router.push('/admin/login');
  } else {
    carregarPrecos();
  }
});
</script>

<style scoped>
/* Admin Header */
.admin-header {
  background-color: var(--cor-branco);
  box-shadow: var(--sombra-md);
  padding: var(--espaco-lg) 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--espaco-md);
}

.logo-section h1 {
  font-size: var(--texto-xl);
  color: var(--cor-primaria);
  margin: 0;
}

.badge {
  background-color: var(--cor-primaria);
  color: var(--cor-branco);
  padding: var(--espaco-xs) var(--espaco-sm);
  border-radius: var(--radius-sm);
  font-size: var(--texto-xs);
  font-weight: 700;
}

.user-section {
  display: flex;
  align-items: center;
  gap: var(--espaco-lg);
}

.welcome {
  color: var(--cor-cinza);
}

.btn-small {
  padding: var(--espaco-sm) var(--espaco-md);
  font-size: var(--texto-sm);
}

/* Main */
.admin-main {
  padding: var(--espaco-3xl) 0;
  min-height: calc(100vh - 100px);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--espaco-2xl);
}

.dashboard-header h2 {
  color: var(--cor-primaria);
}

/* Filtros */
.filtros-admin {
  display: flex;
  gap: var(--espaco-lg);
  margin-bottom: var(--espaco-xl);
  flex-wrap: wrap;
}

.filtros-admin .form-input,
.filtros-admin .form-select {
  flex: 1;
  min-width: 200px;
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

/* Tabela */
.tabela-admin-wrapper {
  overflow-x: auto;
  margin-bottom: var(--espaco-xl);
  box-shadow: var(--sombra-md);
  border-radius: var(--radius-lg);
}

.tabela-admin {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--cor-branco);
}

.tabela-admin thead {
  background-color: var(--cor-primaria);
  color: var(--cor-branco);
}

.tabela-admin th {
  padding: var(--espaco-md);
  text-align: left;
  font-weight: 600;
}

.tabela-admin td {
  padding: var(--espaco-md);
  border-bottom: 1px solid var(--cor-cinza-claro);
}

.item-nome {
  font-weight: 600;
}

.categoria-badge {
  display: inline-block;
  padding: var(--espaco-xs) var(--espaco-sm);
  border-radius: var(--radius-sm);
  font-size: var(--texto-xs);
  font-weight: 600;
}

.cat-roupa { background-color: #E3F2FD; color: #1976D2; }
.cat-acessorio { background-color: #F3E5F5; color: #7B1FA2; }
.cat-especial { background-color: #FFF3E0; color: #F57C00; }
.cat-outro { background-color: #F1F8E9; color: #388E3C; }

.status-badge {
  display: inline-block;
  padding: var(--espaco-xs) var(--espaco-sm);
  border-radius: var(--radius-sm);
  font-size: var(--texto-xs);
  font-weight: 600;
}

.status-badge.ativo {
  background-color: #E8F5E9;
  color: var(--cor-sucesso);
}

.status-badge.inativo {
  background-color: #FFEBEE;
  color: var(--cor-erro);
}

.acoes {
  display: flex;
  gap: var(--espaco-sm);
}

.btn-icone {
  background: none;
  border: none;
  font-size: var(--texto-lg);
  cursor: pointer;
  padding: var(--espaco-xs);
  transition: transform var(--transicao-rapida);
}

.btn-icone:hover {
  transform: scale(1.2);
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: var(--espaco-2xl);
}

.modal-small {
  max-width: 400px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--espaco-xl);
}

.modal-header h3 {
  color: var(--cor-primaria);
  margin: 0;
}

.btn-fechar {
  background: none;
  border: none;
  font-size: var(--texto-2xl);
  cursor: pointer;
  color: var(--cor-cinza);
}

.btn-fechar:hover {
  color: var(--cor-erro);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--espaco-lg);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--espaco-sm);
  cursor: pointer;
}

.modal-actions {
  display: flex;
  gap: var(--espaco-lg);
  justify-content: flex-end;
  margin-top: var(--espaco-xl);
}

.aviso {
  color: var(--cor-aviso);
  font-weight: 600;
}

.erro-message {
  background-color: #FEE;
  border: 2px solid var(--cor-erro);
  color: var(--cor-erro);
  padding: var(--espaco-md);
  border-radius: var(--radius-md);
  margin: var(--espaco-lg) 0;
}

.sem-resultados {
  text-align: center;
  padding: var(--espaco-2xl);
  color: var(--cor-cinza);
}

.estatisticas-admin {
  text-align: center;
  color: var(--cor-cinza);
}

/* Responsividade */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: var(--espaco-md);
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--espaco-md);
  }

  .filtros-admin {
    flex-direction: column;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .modal-actions {
    flex-direction: column;
  }
}
</style>
