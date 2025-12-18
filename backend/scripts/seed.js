require('dotenv').config();
const mongoose = require('mongoose');
const Preco = require('../models/Preco');
const Admin = require('../models/Admin');

/**
 * Script para popular o banco de dados com dados iniciais
 * Execute: npm run seed
 */

const precosIniciais = [
    { item: 'Almofada', preco1: 85, categoria: 'acessorio' },
    { item: 'Boneco Normal', preco1: 105, categoria: 'acessorio' },
    { item: 'Blusa', preco1: 145, preco2: 115, categoria: 'roupa' },
    { item: 'Blusa com Prega', preco1: 185, preco2: 135, categoria: 'roupa' },
    { item: 'Blusão', preco1: 135, preco2: 105, categoria: 'roupa' },
    { item: 'Boleiro', preco1: 85, preco2: 55, categoria: 'roupa' },
    { item: 'Boné', preco1: 85, preco2: 65, categoria: 'acessorio' },
    { item: 'Bono', preco1: 85, categoria: 'acessorio' },
    { item: 'Bata', preco1: 105, preco2: 85, categoria: 'roupa' },
    { item: 'Batina', preco1: 135, preco2: 85, categoria: 'roupa' },
    { item: 'Calça', preco1: 105, preco2: 65, categoria: 'roupa' },
    { item: 'Calções', preco1: 85, preco2: 60, categoria: 'roupa' },
    { item: 'Casaco', preco1: 155, preco2: 115, categoria: 'roupa' },
    { item: 'Camisete', preco1: 85, preco2: 55, categoria: 'roupa' },
    { item: 'Casaco de Frio Normal', preco1: 235, preco2: 155, categoria: 'especial' },
    { item: 'Casaco de Frio Comprido', preco1: 285, preco2: 235, categoria: 'especial' },
    { item: 'Casaco de Leda', preco1: 285, preco2: 185, categoria: 'especial' },
];

const seedDatabase = async () => {
    try {
        // Conectar ao MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Conectado ao MongoDB');

        // Limpar dados existentes
        await Preco.deleteMany({});
        await Admin.deleteMany({});
        console.log('🗑️  Dados antigos removidos');

        // Inserir preços
        await Preco.insertMany(precosIniciais);
        console.log(`✅ ${precosIniciais.length} preços inseridos com sucesso`);

        // Criar admin padrão
        const adminPadrao = await Admin.create({
            nome: 'Administrador',
            email: process.env.ADMIN_EMAIL || 'admin@aromanatural.com',
            senha: process.env.ADMIN_PASSWORD || 'Admin@2025',
            role: 'superadmin',
        });
        console.log('✅ Administrador criado com sucesso');
        console.log(`   Email: ${adminPadrao.email}`);
        console.log(`   Senha: ${process.env.ADMIN_PASSWORD || 'Admin@2025'}`);

        console.log('\n🎉 Database populada com sucesso!');
        console.log('\n📋 Próximos passos:');
        console.log('   1. Inicie o servidor: npm run dev');
        console.log('   2. Acesse a API: http://localhost:5000');
        console.log('   3. Faça login no painel admin com as credenciais acima');

        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao popular database:', error);
        process.exit(1);
    }
};

seedDatabase();
