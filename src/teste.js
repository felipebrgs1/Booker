import axios from 'axios';

// Função para fazer a requisição GET e imprimir o resultado
const fetchCardsFromAPI = async (count = 10) => {
    try {
        const requests = [];
        for (let i = 0; i <= count; i++) {
            requests.push(axios.get(`http://localhost:3000/${i}`));
        }
        
        const responses = await Promise.all(requests);
        const data = responses.flatMap(response => response.data);

        console.log(data);  // Imprime os dados no console
    } catch (error) {
        console.error("Erro ao buscar os cards da API:", error);
    }
};

// Chamar a função para ver o resultado
fetchCardsFromAPI(5);
