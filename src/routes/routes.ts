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
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
