import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/js/bootstrap.js"
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import bus from './utils/Events'
import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
window.bootstrap = bootstrap;
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App);

axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');

library.add(faMagnifyingGlass, faFacebookF, faGoogle, faTwitter, faInstagram, faHome, faPhone, faEnvelope, faApple, faUser, faUserSolid, faRightFromBracket, faPeopleGroup);

app.config.globalProperties.eventBus = bus;

app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');