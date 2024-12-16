export default interface CardModel {
	id: number;
	title: string;
	genre: string;
	image: string;
	description: string;
	author: string;
	friends: string[];
	favorite: string[] | null;
	blacklist: string[] | null;
}
