<script setup>
    import { onMounted, ref } from 'vue';
    import { getApplicationsByCandidate } from '@/services/candidateService';
    import CandidateApplication from './CandidateApplication.vue';

    const applications = ref([]);
    const error = ref(true); 

    onMounted(async()=>{
        try {
            applications.value = await getApplicationsByCandidate();
            error.value = false;
        } catch (error) {
            console.error(error);
            error.value = true; 
        }
    });


</script>

<template>
    <div class="flex flex-col items-center justify-center mt-5">

        <h2 class="text-center text-xl font-semibold">Consulta el estado de tus <span class="text-emerald-500">Candidaturas</span></h2>

        <p class="mt-5" v-if="error">No se han podido obtener candidaturas</p>

        <div v-else class="my-5 lg:w-1/2">
            
            <CandidateApplication 
                v-for="application in applications"
                :key="application.job_offer_id"
                :application="application"
            />

        </div>
        


    </div>
</template>