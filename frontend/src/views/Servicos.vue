<template>
  <div class="servicos-page">
    <!-- Header -->
    <section class="page-header bg-primaria">
      <div class="container">
        <h1 class="fade-in text-black">Nossos Serviços</h1>
        <p class="slide-in-left">Lavand aria ecológica premium com produtos à base de plantas</p>
      </div>
    </section>

    <!-- Introdução -->
    <section class="intro-section">
      <div class="container">
        <div class="intro-content">
          <h2 class="text-black">Cuidado Premium para Suas Roupas</h2>
          <p>
            Na AromaNatural, utilizamos processos ecológicos avançados e produtos naturais
            derivados de plantas para garantir a limpeza profunda das suas roupas, preservando
            suas fibras e cores por muito mais tempo. Nosso compromisso é com a qualidade,
            sustentabilidade e a saúde de nossos clientes.
          </p>
        </div>
      </div>
    </section>

    <!-- Serviços -->
    <section class="servicos-section">
      <div class="container">
        <div class="servicos-grid">
          <!-- Serviço 1 -->
          <div class="servico-card card fade-in">
            <div class="servico-icone">👔</div>
            <h3 class="text-black">Lavagem Padrão Premium</h3>
            <p>
              Nosso serviço principal com produtos ecológicos de alta qualidade.
              Ideal para roupas do dia a dia, garantindo limpeza profunda e
              aroma natural suave.
            </p>
            <ul class="servico-features">
              <li>✓ Produtos 100% naturais</li>
              <li>✓ Secagem controlada</li>
              <li>✓ Dobra perfeita</li>
              <li>✓ Embalagem ecológica</li>
            </ul>
            <router-link to="/precos" class="btn btn-primaria">Ver Preços</router-link>
          </div>

          <!-- Serviço 2 -->
          <div class="servico-card card fade-in" style="animation-delay: 0.1s">
            <div class="servico-icone">✨</div>
            <h3 class="text-black">Tratamento para Tecidos Delicados</h3>
            <p>
              Cuidado especial para peças delicadas como seda, lã, linho e tecidos
              sofisticados. Lavagem suave que preserva a integridade das fibras.
            </p>
            <ul class="servico-features">
              <li>✓ Processo manual delicado</li>
              <li>✓ Sabões específicos naturais</li>
              <li>✓ Secagem natural</li>
              <li>✓ Passagem profissional</li>
            </ul>
            <router-link to="/precos" class="btn btn-primaria">Ver Preços</router-link>
          </div>

          <!-- Serviço 3 -->
          <div class="servico-card card fade-in" style="animation-delay: 0.2s">
            <div class="servico-icone">🧥</div>
            <h3 class="text-black">Casacos e Peças de Inverno</h3>
            <p>
              Especialização em casacos de frio, jaquetas e peças volumosas.
              Limpeza profunda com produtos ecológicos que não danificam o tecido.
            </p>
            <ul class="servico-features">
              <li>✓ Limpeza profunda</li>
              <li>✓ Remoção de manchas</li>
              <li>✓ Sem químicos agressivos</li>
              <li>✓ Preservação de cores</li>
            </ul>
            <router-link to="/precos" class="btn btn-primaria">Ver Preços</router-link>
          </div>

          <!-- Serviço 4 -->
          <div class="servico-card card fade-in" style="animation-delay: 0.3s">
            <div class="servico-icone">🎽</div>
            <h3 class="text-black">Roupas Esportivas</h3>
            <p>
              Tratamento específico para roupas de ginásio e atividades físicas,
              removendo odores e manchas sem danificar as fibras técnicas.
            </p>
            <ul class="servico-features">
              <li>✓ Eliminação de odores</li>
              <li>✓ Preservação de elasticidade</li>
              <li>✓ Secagem rápida</li>
              <li>✓ Produtos antibacterianos naturais</li>
            </ul>
            <router-link to="/precos" class="btn btn-primaria">Ver Preços</router-link>
          </div>

          <!-- Serviço 5 -->
          <div class="servico-card card fade-in" style="animation-delay: 0.4s">
            <div class="servico-icone">👶</div>
            <h3 class="text-black">Roupas Infantis</h3>
            <p>
              Cuidado extra para roupas de bebês e crianças, com produtos
              hipoalergênicos e totalmente seguros para peles sensíveis.
            </p>
            <ul class="servico-features">
              <li>✓ 100% hipoalergênico</li>
              <li>✓ Sem fragrâncias artificiais</li>
              <li>✓ Aprovado por pediatras</li>
              <li>✓ Extra suave</li>
            </ul>
            <router-link to="/precos" class="btn btn-primaria">Ver Preços</router-link>
          </div>

          <!-- Serviço 6 -->
          <div class="servico-card card fade-in" style="animation-delay: 0.5s">
            <div class="servico-icone">🛏️</div>
            <h3 class="text-black">Roupas de Cama e Banho</h3>
            <p>
              Lençóis, toalhas, almofadas e edredons. Limpeza profunda que elimina
              ácaros e bactérias de forma natural e ecológica.
            </p>
            <ul class="servico-features">
              <li>✓ Eliminação de ácaros</li>
              <li>✓ Frescor prolongado</li>
              <li>✓ Maciez natural</li>
              <li>✓ Grande volume</li>
            </ul>
            <router-link to="/precos" class="btn btn-primaria">Ver Preços</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Processo -->
    <section class="processo-section bg-bege">
      <div class="container">
        <h2 class="section-title text-center text-black">Nosso Processo Ecológico</h2>
        <div class="processo-steps">
          <div class="step">
            <div class="step-number">1</div>
            <h4 class="text-black">Recepção e Triagem</h4>
            <p>Análise cuidadosa de cada peça e identificação do melhor tratamento</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h4 class="text-black">Pré-tratamento Natural</h4>
            <p>Aplicação de produtos naturais para remoção de manchas específicas</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h4 class="text-black">Lavagem Ecológica</h4>
            <p>Lavagem com produtos à base de plantas e água purificada</p>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <h4 class="text-black">Secagem Controlada</h4>
            <p>Secagem em temperatura ideal para preservação das fibras</p>
          </div>
          <div class="step">
            <div class="step-number">5</div>
            <h4 class="text-black">Finalização</h4>
            <p>Dobra perfeita e embalagem em materiais recicláveis</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content text-center">
          <h2 class="text-black">Pronto para experimentar nossos serviços?</h2>
          <p>Entre em contato e faça um orçamento personalizado</p>
          <div class="cta-buttons">
            <router-link to="/contato" class="btn btn-primaria btn-grande">
              Entrar em Contato
            </router-link>
            <a href="https://wa.me/258876378443" target="_blank" class="btn btn-secundaria btn-grande">
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Página estática de serviços
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

/* Introdução */
.intro-section {
  padding: var(--espaco-3xl) 0;
}

.intro-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.intro-content h2 {
  color: var(--cor-primaria);
  margin-bottom: var(--espaco-lg);
}

/* Serviços */
.servicos-section {
  padding: var(--espaco-3xl) 0;
}

.servicos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--espaco-xl);
}

.servico-card {
  text-align: center;
  padding: var(--espaco-2xl);
  display: flex;
  flex-direction: column;
}

.servico-icone {
  font-size: 4rem;
  margin-bottom: var(--espaco-lg);
}

.servico-card h3 {
  color: var(--cor-primaria);
  margin-bottom: var(--espaco-md);
}

.servico-card > p {
  margin-bottom: var(--espaco-lg);
  flex-grow: 1;
}

.servico-features {
  list-style: none;
  text-align: left;
  margin-bottom: var(--espaco-xl);
}

.servico-features li {
  padding: var(--espaco-sm) 0;
  color: var(--cor-cinza);
}

.servico-card .btn {
  margin-top: auto;
}

/* Processo */
.processo-section {
  padding: var(--espaco-3xl) 0;
}

.section-title {
  font-size: var(--texto-4xl);
  color: var(--cor-primaria);
  margin-bottom: var(--espaco-2xl);
}

.processo-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--espaco-xl);
  margin-top: var(--espaco-2xl);
}

.step {
  text-align: center;
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--cor-primaria-escura), var(--cor-primaria));
  color: var(--cor-branco);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--texto-2xl);
  font-weight: 700;
  margin: 0 auto var(--espaco-lg);
}

.step h4 {
  color: var(--cor-primaria);
  margin-bottom: var(--espaco-sm);
}

.step p {
  color: var(--cor-cinza);
  font-size: var(--texto-sm);
}

/* CTA */
.cta-section {
  padding: var(--espaco-3xl) 0;
}

.cta-content h2 {
  color: var(--cor-primaria);
  margin-bottom: var(--espaco-lg);
}

.cta-buttons {
  display: flex;
  gap: var(--espaco-lg);
  justify-content: center;
  margin-top: var(--espaco-xl);
  flex-wrap: wrap;
}

/* Responsividade */
@media (max-width: 768px) {
  .servicos-grid {
    grid-template-columns: 1fr;
  }
  
  .processo-steps {
    grid-template-columns: 1fr;
  }
}
</style>
