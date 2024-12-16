import { defineStore } from "pinia";
import type CardModel from "../Model/CardModel";
import { faker } from "@faker-js/faker";
import { computed, ref } from "vue";

export const useCardDataStore = defineStore(
	"cardData",
	() => {
		const cards = ref<CardModel[]>([]);
		const favorite = ref<CardModel[]>([]);
		const blacklist = ref<CardModel[]>([]);
		const lastGenerated = ref(0);
		const currentCardIndex = ref(0);

		const CurrentCard = computed(() => {
			return cards.value.length > 0
				? [cards.value[currentCardIndex.value]]
				: [];
		});

		const shouldRefreshCache = () => {
			const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
			const currentTime = Date.now();
			return (
				currentTime - lastGenerated.value > CACHE_DURATION ||
				cards.value.length === 0
			);
		};

		const addCard = (card: CardModel) => {
			if (!favorite.value.some((c) => c.title === card.title)) {
				favorite.value.push(card);
			}

			cards.value = cards.value.filter((c) => c.title !== card.title);
		};

		const blacklistCard = (card: CardModel) => {
			if (!blacklist.value.some((c) => c.title === card.title)) {
				blacklist.value.push(card);
			}

			cards.value = cards.value.filter((c) => c.title !== card.title);
		};

		const nextCard = (): CardModel | null => {
			return cards.value.length > 0
				? cards.value[Math.floor(Math.random() * cards.value.length)]
				: null;
		};

		const generateCards = (count = 10) => {
			if (shouldRefreshCache()) {
				cards.value = Array.from({ length: count }, () => ({
					id: faker.number.int(),
					title: faker.book.title(),
					image: faker.image.avatarGitHub(),
					genre: faker.book.genre(),
					description: faker.lorem.paragraph(),
					author: faker.person.fullName(),
					friends: Array.from({ length: faker.number.int({ min: 0, max: 5 }) }),
					favorite: [],
					blacklist: [],
				}));

				lastGenerated.value = Date.now();
			}
		};

		const clearCache = () => {
			cards.value = [];
			favorite.value = [];
			blacklist.value = [];
			lastGenerated.value = 0;
			localStorage.removeItem("card-data");
		};

		const forceRegenerateCards = (count = 10) => {
			lastGenerated.value = 0;
			generateCards(count);
		};

		const isCacheValid = computed(() => {
			const CACHE_DURATION = 24 * 60 * 60 * 1000;
			return (
				Date.now() - lastGenerated.value <= CACHE_DURATION &&
				cards.value.length > 0
			);
		});

		return {
			cards,
			favorite,
			blacklist,
			lastGenerated,
			addCard,
			blacklistCard,
			nextCard,
			generateCards,
			clearCache,
			forceRegenerateCards,
			isCacheValid,
			shouldRefreshCache,
			CurrentCard,
		};
	},
	{
		persist: {
			enabled: true,
			strategies: [
				{
					key: "card-data",
					storage: localStorage,
					paths: ["cards", "favorite", "blacklist", "lastGenerated"],
				},
			],
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		} as any,
	},
);
