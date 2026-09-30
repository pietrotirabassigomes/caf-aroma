import express from 'express';
import dados from '../data/data_produtos.js';

const router = express.Router();

// Middleware: verifica se o produto existe e guarda o índice na requisição
function verificarProdutoExiste(req, res, next) {
    const { id } = req.params;
    const index = dados.findIndex((item) => item.id == id);

    if (index < 0) {
        return res.status(404).json({ erro: "Produto não encontrado!" });
    }

    req.id = id;
    req.index = index;
    return next();
}

// GET - lista todos os produtos
router.get('/', (req, res) => {
    res.status(200).json(dados);
});

// POST - cadastra um novo produto
router.post('/', (req, res) => {
    const { id, nome, descricao, img, preco } = req.body;

    if (!nome || !descricao || !img || preco === undefined) {
        return res.status(400).json({ erro: "Os campos nome, descricao, img e preco são obrigatórios!" });
    }

    // Se o id não for enviado, gera o próximo automaticamente
    const novoId = id ? Number(id) : Math.max(0, ...dados.map(p => p.id)) + 1;

    if (dados.some(item => item.id === novoId)) {
        return res.status(400).json({ erro: "Produto já cadastrado com esse id!" });
    }

    const novoProduto = { id: novoId, nome, descricao, img, preco: Number(preco) };
    dados.push(novoProduto);

    res.status(201).json(novoProduto);
});

// PUT - atualiza um produto existente (mantém os valores antigos se o campo não for enviado)
router.put('/:id', verificarProdutoExiste, (req, res) => {
    const { nome, descricao, img, preco } = req.body;
    const index = req.index;

    dados[index] = {
        ...dados[index],
        nome: nome !== undefined ? nome : dados[index].nome,
        descricao: descricao !== undefined ? descricao : dados[index].descricao,
        img: img !== undefined ? img : dados[index].img,
        preco: preco !== undefined ? Number(preco) : dados[index].preco
    };

    res.status(200).json(dados[index]);
});

// DELETE - remove um produto
router.delete('/:id', verificarProdutoExiste, (req, res) => {
    dados.splice(req.index, 1);
    res.status(200).json({ mensagem: `Produto com ID ${req.id} deletado com sucesso!` });
});

export default router;
