import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/routes";
import { createPinia } from "pinia";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");