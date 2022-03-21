import { createApp } from "vue";
import App from "./App.vue";
import moment from "moment";
// eslint-disable-next-line no-unused-vars
import ru from "moment/dist/locale/ru";

const app = createApp(App);

app.config.globalProperties.$moment = moment;

app.mount("#app");
