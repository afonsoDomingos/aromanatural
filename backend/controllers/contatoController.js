const Contato = require('../models/Contato');

/**
 * @desc    Criar nova mensagem de contato
 * @route   POST /api/contato
 * @access  Public
 */
const criarContato = async (req, res) => {
    try {
        const { nome, email, telefone, mensagem } = req.body;

        const novoContato = await Contato.create({
            nome,
            email,
            telefone,
            mensagem,
        });

        res.status(201).json({
            sucesso: true,
            mensagem: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
            dados: {
                id: novoContato._id,
                nome: novoContato.nome,
                email: novoContato.email,
            },
        });
    } catch (error) {
        console.error('Erro ao criar contato:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao enviar mensagem. Por favor, tente novamente.',
            erro: error.message,
        });
    }
};

/**
 * @desc    Obter todas as mensagens de contato
 * @route   GET /api/contato
 * @access  Private/Admin
 */
const obterContatos = async (req, res) => {
    try {
        const { lido, respondido } = req.query;
        let filtro = {};

        if (lido !== undefined) {
            filtro.lido = lido === 'true';
        }
        if (respondido !== undefined) {
            filtro.respondido = respondido === 'true';
        }

        const contatos = await Contato.find(filtro).sort({ createdAt: -1 });

        res.status(200).json({
            sucesso: true,
            quantidade: contatos.length,
            dados: contatos,
        });
    } catch (error) {
        console.error('Erro ao obter contatos:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao buscar mensagens',
            erro: error.message,
        });
    }
};

/**
 * @desc    Marcar contato como lido
 * @route   PUT /api/contato/:id/lido
 * @access  Private/Admin
 */
const marcarComoLido = async (req, res) => {
    try {
        const { id } = req.params;

        const contato = await Contato.findByIdAndUpdate(
            id,
            { lido: true },
            { new: true }
        );

        if (!contato) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Mensagem não encontrada',
            });
        }

        res.status(200).json({
            sucesso: true,
            mensagem: 'Mensagem marcada como lida',
            dados: contato,
        });
    } catch (error) {
        console.error('Erro ao marcar como lido:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao atualizar mensagem',
            erro: error.message,
        });
    }
};

/**
 * @desc    Deletar mensagem de contato
 * @route   DELETE /api/contato/:id
 * @access  Private/Admin
 */
const deletarContato = async (req, res) => {
    try {
        const { id } = req.params;

        const contato = await Contato.findById(id);

        if (!contato) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Mensagem não encontrada',
            });
        }

        await contato.deleteOne();

        res.status(200).json({
            sucesso: true,
            mensagem: 'Mensagem deletada com sucesso',
        });
    } catch (error) {
        console.error('Erro ao deletar contato:', error);
        res.status(500).json({
            sucesso: false,
            mensagem: 'Erro ao deletar mensagem',
            erro: error.message,
        });
    }
};

module.exports = {
    criarContato,
    obterContatos,
    marcarComoLido,
    deletarContato,
};
