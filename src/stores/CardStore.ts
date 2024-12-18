import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type { Card } from "@prisma/client";

export const useCardStore = defineStore("cardData", {
	state: () => ({
		cards: [] as Card[],
		currentCardIndex: ref(0),
	}),

	getters: {
		currentCard: (state) => state.cards[state.currentCardIndex],
	},

	actions: {
		async getCards() {
			const response = await axios.get("http://localhost:3000/people/get/1");
			this.cards = response.data;
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
				const response = await axios.post(
					`http://localhost:3000/people/${personId}/favorites/${_cardId}`,
				);

				this.cards = this.cards.filter((card) => card.id !== _cardId);

				console.log("Resposta do servidor:", response.data);
			} catch (error) {
				console.error("Erro ao adicionar aos favoritos:", error);
			}
		},
		async deleteFavorite(cardId: number, personId: number) {
			try {
				await axios.delete(
					`http://localhost:3000/people/${personId}/favorites/${cardId}`,
				);

				await this.getFavorite();
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
				await axios.delete(
					`http://localhost:3000/people/${personId}/blacklist/${cardId}`,
				);

				await this.getBlacklist();
			} catch (error) {
				console.error("Erro ao buscar cards:", error);
			}
		},
	},
});
