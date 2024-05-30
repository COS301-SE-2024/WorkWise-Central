import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import "vuetify/styles";

const vuetify = createVuetify({
    components,
    directives,
})
createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
