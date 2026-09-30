document.addEventListener('DOMContentLoaded', () => { 
    const containerCards = document.getElementById('container-cards'); 
    const URL_API = '/api/cardapio';

    async function carregarCardapio() { 
        try { 
            const resposta = await fetch(URL_API); 
            const cafes = await resposta.json(); 

            containerCards.innerHTML = '';

            cafes.forEach((cafe) => { 
                const card = document.createElement('article'); 
                card.classList.add('card'); 
                
                card.innerHTML = `
                    <img src="${cafe.imagem}" alt="${cafe.nome}">
                    <h3>${cafe.nome}</h3>
                    <p>${cafe.descricao}</p>
                    <button>Pedir Agora</button>
                `;
                containerCards.appendChild(card);
            });
        } catch (erro) {
            console.error("Erro ao carregar o cardapio", erro);
            containerCards.innerHTML = "<p>Não foi possível carregar o cardapio no momento</p>";
        }
    }

    carregarCardapio();
});

