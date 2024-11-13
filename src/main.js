import { createApp } from 'vue'
import './assets/css/main.css'
import App from './App.vue'
import '@fortawesome/fontawesome-free/css/all.css';
import router from "./router/index"
import {registerLicense} from '@syncfusion/ej2-base';
registerLicense("ORg4AjUWIQA/Gnt2VFhiQlhPcEBAX3xLflF1VWJbdVpxflZEcDwsT3RfQF5jT3xRdkJmUX1YdHJTTg==") 

const app = createApp(App);
app.use(router);
app.mount('#app');
