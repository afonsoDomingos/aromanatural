const Preco = require('../models/Preco');

/**
 * @desc    Obter todos os preços ativos (público)
 * @route   GET /api/precos
 * @access  Public
 */
const obterPrecos = async (req, res) => {
    try {
        const precos = await Preco.buscarAtivos();

        res.status(200).json({
            sucesso: true,
            quantidade: precos.length,
            dados: precos,
        });
    } catch (error) {
        console.error('Erro ao obter preços:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar preços',
            erro: error.message,
        });
    }
};

/**
 * @desc    Obter todos os preços (incluindo inativos) - Admin
 * @route   GET /api/precos/admin
 * @access  Private/Admin
 */
const obterTodosPrecos = async (req, res) => {
    try {
        const { busca, categoria, ativo } = req.query;
        let filtro = {};

        // Filtros opcionais
        if (busca) {
            filtro.$text = { $search: busca };
        }
        if (categoria) {
            filtro.categoria = categoria;
        }
        if (ativo !== undefined) {
            filtro.ativo = ativo === 'true';
        }

        const precos = await Preco.find(filtro).sort({ item: 1 });

        res.status(200).json({
            sucesso: true,
            quantidade: precos.length,
            dados: precos,
        });
    } catch (error) {
        console.error('Erro ao obter todos os preços:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar preços',
            erro: error.message,
        });
    }
};

/**
 * @desc    Criar novo preço
 * @route   POST /api/precos
 * @access  Private/Admin
 */
const criarPreco = async (req, res) => {
    try {
        const { item, preco1, preco2, categoria, descricao } = req.body;

        // Verifica se o item já existe
        const itemExiste = await Preco.findOne({ item });
        if (itemExiste) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Este item já existe na tabela de preços',
            });
        }

        const novoPreco = await Preco.create({
            item,
            preco1,
            preco2,
            categoria,
            descricao,
        });

        res.status(201).json({
            sucesso: true,
            mensagem: 'Preço criado com sucesso',
            dados: novoPreco,
        });
    } catch (error) {
        console.error('Erro ao criar preço:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao criar preço',
            erro: error.message,
        });
    }
};

/**
 * @desc    Atualizar preço
 * @route   PUT /api/precos/:id
 * @access  Private/Admin
 */
const atualizarPreco = async (req, res) => {
    try {
        const { id } = req.params;
        const { item, preco1, preco2, categoria, descricao, ativo } = req.body;

        let preco = await Preco.findById(id);

        if (!preco) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Preço não encontrado',
            });
        }

        // Atualiza os campos
        preco.item = item || preco.item;
        preco.preco1 = preco1 !== undefined ? preco1 : preco.preco1;
        preco.preco2 = preco2 !== undefined ? preco2 : preco.preco2;
        preco.categoria = categoria || preco.categoria;
        preco.descricao = descricao !== undefined ? descricao : preco.descricao;
        preco.ativo = ativo !== undefined ? ativo : preco.ativo;

        await preco.save();

        res.status(200).json({
            sucesso: true,
            mensagem: 'Preço atualizado com sucesso',
            dados: preco,
        });
    } catch (error) {
        console.error('Erro ao atualizar preço:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar preço',
            erro: error.message,
        });
    }
};

/**
 * @desc    Deletar preço
 * @route   DELETE /api/precos/:id
 * @access  Private/Admin
 */
const deletarPreco = async (req, res) => {
    try {
        const { id } = req.params;

        const preco = await Preco.findById(id);

        if (!preco) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Preço não encontrado',
            });
        }

        await preco.deleteOne();

        res.status(200).json({
            sucesso: true,
            mensagem: 'Preço deletado com sucesso',
        });
    } catch (error) {
        console.error('Erro ao deletar preço:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao deletar preço',
            erro: error.message,
        });
    }
};

module.exports = {
    obterPrecos,
    obterTodosPrecos,
    criarPreco,
    atualizarPreco,
    deletarPreco,
};
