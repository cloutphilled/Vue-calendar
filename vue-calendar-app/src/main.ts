import { createApp, ref } from 'vue';
import './less/global.less';
import App from './App.vue'; 
import { state, dispatch } from './store';

const date = ref({date: {
        str: new Date(),
        dateString: new Date().toDateString()
    }})
    createApp(App)
        .provide('store', { state, dispatch })
        .mount('#app')


