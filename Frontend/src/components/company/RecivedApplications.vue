<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import { getApplicationsByCompany, getApplicationById } from '@/services/companyService';
    import Application from './Application.vue';
    import ApplicationDetail from './ApplicationDetail.vue';

    const route = useRoute(); 

    const applications = ref([]);
    const applicationDetail = ref(null); 
    const errorMessage = ref('');

    const fetchApplications = async ()=>{
        try {
            applications.value = await getApplicationsByCompany();
            if(applications.value.length === 0) errorMessage.value('No se han recibido aplicaciones todavía'); 
            console.log(applications)
        } catch (error) {
            console.log(error);
            errorMessage.value = error; 
        }
    }

    const fetchApplicationDetail = async (id) =>{
        try {
            applicationDetail.value = await getApplicationById(id); 
        } catch (error) {
            errorMessage.value = 'No se pudo obtener la aplicación'
        }
    }

    onMounted( ()=>{
        if(route.params.id){
            fetchApplicationDetail(route.params.id);
        }else{
            fetchApplications(); 
        }
    });

    watch(()=> route.params.id, (newId) => {
        if(newId){
            fetchApplicationDetail(newId);
        }else{
            fetchApplications(); 
        }
    }); 


</script>

<template>

    <h1 class="text-center text-2xl font-semibold mb-10">Gestiona las <span class="text-emerald-500">aplicaciones</span> recibidas</h1>


    <div v-if="applicationDetail" class="flex justify-center">

        <div class="md:w-3/5">
            <ApplicationDetail 
                :application="applicationDetail"
            />
        </div>
    </div>

    <div v-else class="flex justify-center">

        <h2 v-if="errorMessage" class="text-2xl text-center">{{ errorMessage }}</h2>

        <div v-else class="md:w-3/5">
            <Application 
                v-for="application in applications"
                :key="application.id"
                :application="application"
            />
        </div>
        
    </div>


</template>