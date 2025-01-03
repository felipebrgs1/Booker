import { PrismaClient } from "@prisma/client";
import { Router, type Request, type Response } from "express";

const prisma = new PrismaClient({});
const router = Router();

router.get("/cards", async (req: Request, res: Response) => {
	const cards = await prisma.card.findMany();
	res.json(cards);
});

router.get("/cards/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const card = await prisma.card.findUnique({ where: { id: Number(id) } });
	res.json(card);
});

router.get("/people/get/:id", async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const cards = await prisma.card.findMany({
			where: {
				NOT: {
					OR: [
						{
							favorite: {
								some: {
									personId: Number(id),
								},
							},
						},
						{
							blacklist: {
								some: {
									personId: Number(id),
								},
							},
						},
					],
				},
			},
		});

		res.json(cards);
	} catch (error) {
		res.status(500).json({ error: "Erro ao buscar os cards" });
	}
});

router.get("/people/:id/blacklist", async (req: Request, res: Response) => {
	const { id } = req.params;
	const blacklist = await prisma.blacklist.findMany({
		where: { personId: Number(id) },
		include: { card: true },
	});
	res.json(blacklist);
});

router.get("/people", async (req: Request, res: Response) => {
  const people = await prisma.person.findMany({
    include: {
      friends: { 
        include: {
          friend: true 
        }
      },
      friendsOf: { 
        include: {
          person: true 
        }
      }
    }
  });
  res.json(
    people.map(person => ({
      id: person.id,
      name: person.name,
      email: person.email,
      friends: [
        ...person.friends.map(friendRelation => friendRelation.friend),
        ...person.friendsOf.map(friendRelation => friendRelation.person)
      ]
    }))
  );
});

router.get("/people/:id/favorites", async (req: Request, res: Response) => {
	const { id } = req.params;
	const favorites = await prisma.favorite.findMany({
		where: { personId: Number(id) },
		include: { card: true },
	});
	res.json(favorites);
});

router.post("/people", async (req: Request, res: Response) => {
	const { name, email } = req.body;
	const person = await prisma.person.create({ data: { name, email } });
	res.json(person);
});

router.post(
	"/people/:id/favorites/:cardId",
	async (req: Request, res: Response) => {
		const { id, cardId } = req.params;

		const favorite = await prisma.favorite.create({
			data: {
				cardId: Number(cardId),
				personId: Number(id),
			},
		});

		res.json(favorite);
	},
);

router.post(
	"/people/:id/blacklist/:cardId",
	async (req: Request, res: Response) => {
		const { id, cardId } = req.params;

		const blacklist = await prisma.blacklist.create({
			data: { cardId: Number(cardId), personId: Number(id) },
		});
		res.json(blacklist);
	},
);

router.post("/people/:id/friends/:id2", async (req: Request, res: Response) => {
	const { id,id2 } = req.params;
	const friend = await prisma.friend.create({
		data: { friendId: Number(id), personId: Number(id2) },include: { person: true },
	});
	res.json(friend);
});

router.delete(
	"/people/:id/blacklist/:cardId",
	async (req: Request, res: Response) => {
		const { id, cardId } = req.params;

		if (Number.isNaN(Number(id)) || Number.isNaN(Number(cardId))) {
			return res.status(400).json({ error: "Invalid id or cardId" });
		}

		try {
			const blacklist = await prisma.blacklist.delete({
				where: {
					personId_cardId: {
						personId: Number(id),
						cardId: Number(cardId),
					},
				},
			});
			res.json(blacklist);
		} catch (error) {
			if (error.code === "P2025") {
				return res.status(404).json({ error: "Blacklist entry not found" });
			}
			res.status(500).json({ error: "Internal server error" });
		}
	},
);

router.delete(
	"/people/:id/favorites/:cardId",
	async (req: Request, res: Response) => {
		const { id, cardId } = req.params;
		const favorite = await prisma.favorite.delete({
			where: {
				personId_cardId: { personId: Number(id), cardId: Number(cardId) },
			},
		});
		res.json(favorite);
	},
);

router.post("/cards", async (req: Request, res: Response) => {
	const data = req.body;
	const card = await prisma.card.create({ data: data });
	res.json(card);
},
);
router.delete("/cards/:id", async (req: Request, res: Response) => {
	const { id } = req.params;
	const response = await prisma.card.delete({ where: { id: Number(id) } });
	res.json(response);
});
router.get("/people/:id", async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const person = await prisma.friend.findMany({
			where: {
				OR: [
					{ personId: Number(id) },
					{ friendId: Number(id) }
				]
			},
			include: {
				person: true, 
				friend: true  
			}
		});

			res.json(person);
	} catch (error) {
			console.error("Erro ao buscar amigos:", error);
			res.status(500).json({ error: "Erro ao buscar amigos" });
	}
});

export default router;
