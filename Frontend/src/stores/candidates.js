import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { getCandidate } from '@/services/authService';

export const useCandidateStore = defineStore('candidate', ()=>{

  const router = useRouter();
  const candidate = ref({});
  const loading = ref(true);

  async function fetchCandidate(){
    try {
      const data = await getCandidate();
      candidate.value = data.candidate; 
    } catch (error) {
      console.log(error);
      candidate.value = null; 
    }finally {
      loading.value = false; 
    }
    
  } 

  function logout(){
    localStorage.removeItem('AUTH_TOKEN');
    localStorage.removeItem('USER_ROLE');
    candidate.value = null;
    router.push({ name: 'home' }); 
  }
  

  return{
    loading,
    candidate,
    fetchCandidate,
    logout

  }

}); 

