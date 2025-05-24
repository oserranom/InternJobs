import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { getCandidate } from '@/services/authService';

export const useCandidateStore = defineStore('candidate', ()=>{

  const router = useRouter();
  const candidate = ref({});
  const loading = ref(true);

  onMounted(async() =>{
    try {
      const data = await getCandidate();
      candidate.value = data.candidate; 
    } catch (error) {
      console.log(error);
    }finally {
      loading.value = false; 
    }
    
  }); 

  function logout(){
    localStorage.removeItem('AUTH_TOKEN');
    candidate.value = null;
    router.push({ name: 'home' }); 
  }

  return{
    candidate,
    logout,

  }

}); 

