import { createApp } from "vue";
import App from "./App.vue";
import { createVuetify } from "vuetify";
import "vuetify/styles"; 
import store from "./stores/index";
import router from "./router";

const vuetify = createVuetify();

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(store);

app.mount("#app");
