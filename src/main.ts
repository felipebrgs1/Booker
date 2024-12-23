import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/routes";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
const pinia = createPinia().use(piniaPluginPersistedstate);

app
  .use(pinia)
  .use(router)
  .use(vuetify)
  .mount("#app");
