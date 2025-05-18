<script setup> 
    import { ref, watch, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { searchJobs } from '@/services/seacrhService';
    import SearchBar from '@/components/SearchBar.vue';
    import JobOffer from '@/components/JobOffer.vue';

    const route = useRoute();

    const location = ref('');
    const study_field = ref('');
    const education_level = ref('');
    const jobOffers = ref([]);
    const loading = ref(true);
    const errorMessage = ref('');

    function updateSearchParams(){

        location.value = route.query.location || '';
        study_field.value = route.query.study_field || '';
        education_level.value = route.query.education_level || '';

        fetchSearchResults();
    }

    async function fetchSearchResults(){
        loading.value = true;
        
        //Reset mensaje INDISPENSABLE para rerender
        errorMessage.value = '';  

        try {
            const params = {
                location: location.value,
                study_field: study_field.value,
                education_level: education_level.value
            }

            //Llamada al servicio
            jobOffers.value = await searchJobs(params);
            if(jobOffers.value.length === 0) errorMessage.value = 'No se han encontrado ofertas con esos parámetros de búsqueda';

        } catch (error) {
            console.log(error); 
            errorMessage.value = 'No se han encontrado ofertas con esos parámetros de búsqueda';

        } finally {
            loading.value = false; 
        }
    }

    watch(route, updateSearchParams, { immediate: true }); 

</script>

<template>
    <div class="bg-gray-800 flex-col justify-center p-10">
        <h1 class="text-3xl font-semibold text-gray-100 text-center drop-shadow-lg px-2 rounded">
            Encuentra la mejor oferta para tus prácticas laborales
        </h1>

        <SearchBar class="shadow-none mt-5" />
    </div>

    <main class="flex justify-center">
        <div class="w-full md:w-1/2 mb-3">
            <h2 
                v-if="errorMessage"
                class="text-2xl font-semibold text-center mt-10 mb-100"
            >{{ errorMessage }}</h2>

            <div v-else>
                <JobOffer 
                    v-for="jobOffer in jobOffers"
                    :key="jobOffer.id"
                    :jobOffer="jobOffer"
                />
            </div>
        </div>
        
    </main>

</template>