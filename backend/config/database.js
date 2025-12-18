const mongoose = require('mongoose');

/**
 * Conecta ao MongoDB usando Mongoose
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Opções já são default no Mongoose 6+
      // useNewUrlParser e useUnifiedTopology não são mais necessários
    });

    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Erro ao conectar ao MongoDB: ${error.message}`);
    process.exit(1); // Encerra a aplicação se falhar
  }
};

// Event listeners para monitoramento da conexão
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose conectado ao MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error(`⚠️ Erro na conexão Mongoose: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose desconectado do MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('👋 Conexão MongoDB encerrada devido ao término da aplicação');
  process.exit(0);
});

module.exports = connectDB;
