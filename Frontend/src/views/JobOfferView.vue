<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { getJobOffer } from '@/services/seacrhService';
    import { formatDate } from '@/helpers';
    import { useCandidateStore } from '@/stores/candidates';

    const route = useRoute();
    const jobOffer = ref({});
    const errorMessage = ref('');
    

    const loadJobOffer = async ()=>{
        try {
            jobOffer.value = await getJobOffer(route.params.id);
        } catch (error) {
            console.log(error);
            errorMessage.value = error.message || 'No se ha obtenido oferta'
        }
    }

    onMounted(loadJobOffer);

    const candidateStore = useCandidateStore();

    const isLoggedIn = computed(()=>{
        const candidate = candidateStore.candidate; 
        //Doble negación para tranformar en booleano stricto
        //Se evalúa el objeto entero así como id por un tema de carga y posibles errores
        return !!candidateStore.candidate && !!candidateStore.candidate.id; 
    }); 

</script>

<template>
    <div class="md:flex justify-center py-10 text-gray-100">
        <div v-if="errorMessage" class="text-3xl font-semibold">
            {{ errorMessage }}
        </div>

        <main 
            v-else
            class="md:w-2/3 md:min-h-160"
        >
            <div class=" bg-gray-900 rounded-lg p-5 my-3">
                <div>
                    <h1 class="text-2xl font-semibold">{{ jobOffer.title }}</h1>
                    <p class="font-light text-xl text-emerald-400 mb-2">{{ jobOffer.company_name }}</p>
                </div>

                <div class="grid grid-cols-2 grid-rows-2 gap-2 mb-3">

                    <div class="p-2 flex justify-start items-center">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="22"  height="22"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-map-pin"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg>
                        <p class="mx-2">{{ jobOffer.location }}</p>
                    </div>

                    <div class="p-2 flex justify-start items-center">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-microscope"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 21h14" /><path d="M6 18h2" /><path d="M7 18v3" /><path d="M9 11l3 3l6 -6l-3 -3z" /><path d="M10.5 12.5l-1.5 1.5" /><path d="M17 3l3 3" /><path d="M12 21a6 6 0 0 0 3.715 -10.712" /></svg>
                        <p class="mx-2 uppercase">{{ jobOffer.study_field }}</p>
                    </div>

                    <div class="p-2 flex justify-start items-center">
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-cash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 15h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v3" /><path d="M7 9m0 1a1 1 0 0 1 1 -1h12a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-12a1 1 0 0 1 -1 -1z" /><path d="M12 14a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /></svg>

                        <p 
                            v-if="jobOffer.salary > 0"
                            class="mx-2"
                        >
                            {{ jobOffer.salary }}€
                        </p>

                        <p class="mx-2" v-else>Incentivo no disponible</p>
                    </div>

                    <div class="p-2 flex justify-start items-center"> 
                        <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-school"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" /><path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" /></svg>
                        <p class="mx-2">{{ jobOffer.education_level }}</p>
                    </div>

                </div>

                <p class="text-sm">Publicada: <span>{{ formatDate(jobOffer.created_at) }}</span></p>

            </div>

            <div class="bg-gray-900 rounded-lg p-5 my-3">
                <h1 class="text-2xl font-semibold mb-2">Descripción: </h1>
                <p class="mb-5">{{ jobOffer.description }}</p>
                
                <button
                    type="submit"
                    class="bg-emerald-500 w-full md:w-1/3 py-1 rounded-lg font-semibold cursor-pointer hover:bg-emerald-600"
                    :disabled="!isLoggedIn"
                >
                    Inscribirme
                </button>
            </div>

        </main>
    </div>
</template>