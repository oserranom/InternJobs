import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { getCompany } from '@/services/authService';

export const useCompanyStore = defineStore('companie', ()=>{

  const router = useRouter();
  const company = ref({});
  const loading = ref(true);

  onMounted(async() =>{
    try {
      const data = await getCompany();
      company.value = data.company; 
    } catch (error) {
      console.log(error);
    }finally {
      loading.value = false; 
    }
    
  }); 

  function logout(){
    localStorage.removeItem('AUTH_TOKEN');
    company.value = null;
    router.push({ name: 'home' }); 
  }

  return{
    company,
    logout,

  }

}); 

