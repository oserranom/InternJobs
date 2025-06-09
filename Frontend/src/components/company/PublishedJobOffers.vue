<script setup>
    import { onMounted, ref } from 'vue';
    import JobOfferComProfile from './JobOfferComProfile.vue';
    import { getJobOffersByCompany } from '@/services/companyService';

    const jobOffers = ref([]);
    const errorMessage = ref('');

    onMounted( async ()=>{
        try {
            jobOffers.value = await getJobOffersByCompany();
            if(jobOffers.value.length === 0) errorMessage.value = 'Aún no se han publicado ofertas'
        } catch (error) {
            console.error(error); 
            errorMessage.value = 'No se han podido obtener ofertas publicadas'
        }
    }); 

</script>

<template>
    <h1 class="text-center text-2xl font-semibold">Gestiona las <span class="text-emerald-500">ofertas</span> publicadas</h1>

    <div class="flex justify-center mt-10">

        <h2 class="text-gray-100 text-2xl" v-if="errorMessage"> {{ errorMessage }} </h2>

        <div 
            v-else  
            class="md:w-3/5"
        >
            <JobOfferComProfile 
                v-for="jobOffer in jobOffers"
                :key="jobOffer.id"
                :jobOffer="jobOffer"
            />
        </div>

    </div>

</template>