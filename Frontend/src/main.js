import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//Stores
/*
import { useCandidateStore } from './stores/candidates';
import { useCompanyStore } from './stores/companies';*/

const app = createApp(App);

app.use(createPinia())
app.use(router)

/*
const initSesion = () =>{
    const role = localStorage.getItem('USER_ROLE');

    if(role === 'candidate'){
        const candidateStore = useCandidateStore();
    }
    if(role === 'company'){
        const companyStore = useCompanyStore(); 
    }
}

initSesion(); */

app.mount('#app')
