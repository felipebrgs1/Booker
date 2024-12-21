import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("../views/Home/index.vue"), // Crie um componente Home.vue em "views"
	},
	{
		path: "/favorite",
		name: "favorite",
		component: () => import("../views/Favorites/index.vue"), // Crie um componente About.vue em "views"
	},
	{
		path: "/friends",
		name: "friends",
		component: () => import("../views/Friends/index.vue"), // Crie um componente About.vue em "views"
	},
	{
		path: "/blacklist",
		name: "blacklist",
		component: () => import("../views/Blacklist/index.vue"), // Crie um componente About.vue em "views"
	},
	{
		path: "/manage",
		name: "manage",
		component: () => import("../views/CardManager/index.vue"),
	},
	{
		path: "/cadastro",
		name: "cadastro",
		component: () => import("../views/Cadastro/index.vue"),
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
