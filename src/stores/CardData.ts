import { defineStore } from "pinia";
import type CardModel from "../Model/CardModel";
import { faker } from "@faker-js/faker";

export const useCardDataStore = defineStore("cardData", {
	state: () => ({
		cards: [] as CardModel[],
		favorite: [] as CardModel[],
		blacklist: [] as CardModel[],
	}),
	actions: {
		addCard(card: CardModel) {
			if (!this.favorite.some((c) => c.title === card.title)) {
				this.favorite.push(card);
			}

			this.cards = this.cards.filter((c) => c.title !== card.title);
		},
		blacklistCard(card: CardModel) {
			if (!this.blacklist.some((c) => c.title === card.title)) {
				this.blacklist.push(card);
			}

			this.cards = this.cards.filter((c) => c.title !== card.title);
		},
		nextCard(): CardModel | null {
			return this.cards.length > 0
				? this.cards[Math.floor(Math.random() * this.cards.length)]
				: null;
		},
		generateCards(count = 10) {
			this.cards = Array.from({ length: count }, () => ({
				id: faker.number.int(),
				title: faker.book.title(),
				image: faker.image.avatarGitHub(),
				genre: faker.book.genre(),
				description: faker.lorem.paragraph(),
				author: faker.person.fullName(),
				blacklist: [],
				favorite: [],
				friends: Array.from(
					{ length: faker.number.int({ min: 0, max: 5 }) },
					() => faker.person.fullName(),
				),
			}));
		},
	},
});
