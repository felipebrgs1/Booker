import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/routes";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
	components,
	directives,
});

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
pinia.use(piniaPluginPersistedstate);
app.use(router);
app.use(vuetify);
app.mount("#app");
