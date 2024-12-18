interface ICardModel {
	id: number;
	title: string;
	genre: string;
	image: string;
	description: string;
	author: string;
}

export default class CardModel implements ICardModel {
	id: number;
	title: string;
	genre: string;
	image: string;
	description: string;
	author: string;
	constructor(obj: CardModel) {
		this.id = obj.id;
		this.title = obj.title;
		this.genre = obj.genre;
		this.image = obj.image;
		this.description = obj.description;
		this.author = obj.author;
	}
}
