import fs from "node:fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
	console.log("Start seeding...");
	await seedCards();
	await createPerson();
	console.log("Seeding finished.");
}

main().catch((e) => {
	process.exit(1);
});

async function seedCards() {
	const jsonData = JSON.parse(fs.readFileSync("db.json", "utf-8")) as {
		id: number;
		title: string;
		genre: string;
		image: string;
		description: string;
		author: string;
	}[];

	for (const book of jsonData) {
		await prisma.card.create({
			data: {
				id: book.id,
				title: book.title,
				genre: book.genre,
				image: book.image,
				description: book.description,
				author: book.author,
			},
		});
	}
}
async function createPerson() {
	await prisma.person.createMany({
		data: [
			{
				name: "John",
				email: "john@example.com",
			},
			{
				name: "Jane",
				email: "jane@example.com",
			},
		],
	});
}
async function createfriend() {
	await prisma.person.update({
		where: { email: "jane@example.com" },
		data: {
			friends: {
				connect: { email: "john@example.com" },
			},
		},
	});
}
