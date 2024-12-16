import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import type CardModel from "../Model/CardModel";

export const useCardDataStore = defineStore("cardData", () => {
	const cards = ref<CardModel[]>([]);
	const favorite = ref<CardModel[]>([]);
	const blacklist = ref<CardModel[]>([]);
	const currentCardIndex = ref(0);
	const lastGenerated = ref(0);

	const shouldRefreshCache = () => {
		const CACHE_DURATION = 24 * 60 * 60 * 1000;
		const currentTime = Date.now();
		return (
			currentTime - lastGenerated.value > CACHE_DURATION ||
			cards.value.length === 0
		);
	};

	const fetchCardsFromAPI = async (count = 1) => {
		try {
			const requests = [];
			for (let i = 0; i < count; i++) {
				requests.push(axios.get(`http://localhost:3000/${i}`));
			}
			const responses = await Promise.all(requests);
			const data = responses.flatMap((response) => response.data);
			cards.value = data;
			lastGenerated.value = Date.now();
		} catch (error) {
			console.error("Erro ao buscar os cards da API:", error);
		}
	};

	const generateCards = (count = 1) => {
		if (shouldRefreshCache()) {
			fetchCardsFromAPI(count);
		}
	};

	const addCardToFavorites = (card: CardModel) => {
		favorite.value.push(card);
		cards.value = cards.value.filter((c) => c.id !== card.id);
	};

	const addCardToBlacklist = (card: CardModel) => {
		blacklist.value.push(card);
		cards.value = cards.value.filter((c) => c.id !== card.id);
	};
	const logFavoritesAndBlacklist = () => {
		console.log("Favoritos:", favorite.value);
		console.log("Blacklist:", blacklist.value);
	};

	return {
		cards,
		currentCardIndex,
		generateCards,
		addCardToFavorites,
		addCardToBlacklist,
		favorite,
		blacklist,
		logFavoritesAndBlacklist,
	};
});
