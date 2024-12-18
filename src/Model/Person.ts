import type CardModel from "./CardModel";
interface IPerson {
	id: number;
	name: string;
	email: string;
	friends: IPerson[];
	favorite: CardModel[];
	blacklist: CardModel[];
}

class PersonModel implements IPerson {
	id: number;
	name: string;
	email: string;
	friends: IPerson[];
	favorite: CardModel[];
	blacklist: CardModel[];

	constructor(obj: IPerson) {
		this.id = obj.id;
		this.name = obj.name;
		this.email = obj.email;
		this.friends = obj.friends || [];
		this.favorite = obj.favorite || [];
		this.blacklist = obj.blacklist || [];
	}
}
export default PersonModel;
