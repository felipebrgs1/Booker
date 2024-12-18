import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Card } from "@prisma/client";

export const useCardStore = defineStore("cardData", {
	state: () => ({
		cards: ref<Card[]>([]),
		currentCardIndex: ref(0),
	}),

	getters: {
		currentCard: (state) => state.cards[state.currentCardIndex],
	},

	actions: {
		async getCards() {
			try {
				const response = await axios.get("http://localhost:3000/cards/get/1");
				this.cards = response.data;
			} catch (error) {
				console.error("Erro ao buscar cards:", error);
			}
		},
		async getFavorite() {
			const response = await axios.get(
				"http://localhost:3000/people/1/favorites",
			);
			this.cards = response.data;
		},
		async getBlacklist() {
			const response = await axios.get(
				"http://localhost:3000/people/1/blacklist",
			);
			this.cards = response.data;
		},
		async postFavorite(_cardId: number, personId = 1) {
			try {
				// Faz a requisição para adicionar aos favoritos
				const response = await axios.post(
					`http://localhost:3000/people/${personId}/favorites/${_cardId}`,
				);

				// Filtra os cards para remover o que foi adicionado aos favoritos
				this.cards = this.cards.filter((card) => card.id !== _cardId);

				console.log("Resposta do servidor:", response.data);
			} catch (error) {
				// Lida com erros na requisição
				console.error("Erro ao adicionar aos favoritos:", error);
			}
		},
		async deleteFavorite(cardId: number, personId: number) {
			try {
				const response = await axios.delete(
					`http://localhost:3000/people/${personId}/favorites/${cardId}`,
				);

				this.cards = response.data;
			} catch (error) {
				console.error("Erro ao buscar cards:", error);
			}
		},
		async postBlacklist(_cardId: number, personId = 1) {
			try {
				const response = await axios.post(
					`http://localhost:3000/people/${personId}/blacklist/${_cardId}`,
				);

				this.cards = this.cards.filter((card) => card.id !== _cardId);

				console.log("Resposta do servidor:", response.data);
			} catch (error) {
				console.error("Erro ao adicionar aos blacklist:", error);
			}
		},
		async deleteBlacklist(cardId: number, personId: number) {
			try {
				const response = await axios.delete(
					`http://localhost:3000/people/${personId}/blacklist/${cardId}`,
				);
				this.cards = response.data;
			} catch (error) {
				console.error("Erro ao buscar cards:", error);
			}
		},
	},
});
