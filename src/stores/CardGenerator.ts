import { defineStore } from "pinia";
import type CardModel from "../Model/CardModel";
import { faker } from "@faker-js/faker";

export const useCardGenerator = defineStore("cardData", {
	state: () => ({
		cards: [] as CardModel[],
	}),
	actions: {
		generateCards(count = 1) {
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
