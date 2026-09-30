document.addEventListener('DOMContentLoaded', () => {
    const containerProdutos = document.getElementById('container-produtos');
    const URL_API = '/api/produtos';

    // Formata o número como moeda brasileira (ex.: 45 -> R$ 45,00)
    function formatarPreco(valor) {
        return Number(valor).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    }

    async function carregarProdutos() {
        try {
            const resposta = await fetch(URL_API);
            const produtos = await resposta.json();

            containerProdutos.innerHTML = '';

            produtos.forEach((produto) => {
                const card = document.createElement('article');
                card.classList.add('card');

                card.innerHTML = `
                    <img src="${produto.img}" alt="${produto.nome}">
                    <h3>${produto.nome}</h3>
                    <p>${produto.descricao}</p>
                    <p class="preco">${formatarPreco(produto.preco)}</p>
                    <button>Comprar</button>
                `;
                containerProdutos.appendChild(card);
            });
        } catch (erro) {
            console.error('Erro ao carregar os produtos', erro);
            containerProdutos.innerHTML = '<p>Não foi possível carregar os produtos no momento</p>';
        }
    }

    carregarProdutos();
});
