import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

//Stores
import { useCandidateStore } from './stores/candidates';
import { useCompanyStore } from './stores/companies';

const app = createApp(App);

app.use(createPinia())
app.use(router)

//Sincronizar store para no perder el estado al refrescar
const initSesion = async () =>{
    const role = localStorage.getItem('USER_ROLE');
    const token = localStorage.getItem('AUTH_TOKEN'); 

    if (!role || !token) return;

    if(role === 'candidate'){
        const candidateStore = useCandidateStore();
        await candidateStore.fetchCandidate();
    } else {
        const companyStore = useCompanyStore();
        await companyStore.fetchCompany();
    }
}


initSesion().finally(()=>{
    app.mount('#app')
}); 


