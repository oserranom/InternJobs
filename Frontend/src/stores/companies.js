import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { getCompany } from '@/services/authService';

export const useCompanyStore = defineStore('companie', ()=>{

  const router = useRouter();
  const company = ref({});
  const loading = ref(false);

  async function fetchCompany(){

    loading.value = true;

    try {
      const data = await getCompany();
      company.value = data.company; 
      return data.company; 

    } catch (error) {
      console.log(error);
      company.value = {}; 
      return null; 
      
    }finally {
      loading.value = false; 
    }
  }

  function logout(){
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_ROLE'); 
    company.value = null;
    router.push({ name: 'home' }); 
  }

  return{
    company,
    loading,
    fetchCompany,
    logout,
  }

}); 

