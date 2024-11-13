import { createApp } from "vue";
import "./assets/css/main.css";
import App from "./App.vue";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./router/index";
import { registerLicense } from "@syncfusion/ej2-base";
import { Auth0Plugin, createAuth0 } from "@auth0/auth0-vue";
registerLicense(
  "ORg4AjUWIQA/Gnt2VFhiQlhPcEBAX3xLflF1VWJbdVpxflZEcDwsT3RfQF5jT3xRdkJmUX1YdHJTTg=="
);

const app = createApp(App);
app.use(
  createAuth0({
    domain: "dev-l8dr6eczn2njqll6.us.auth0.com",
    clientId: "6Jc5lAxl7WBgP8uncFvx6hC8QbRKiPAV",
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
  })
);
app.use(router);
app.mount("#app");
