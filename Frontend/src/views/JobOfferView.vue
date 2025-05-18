<script setup>
    import { ref, onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { getJobOffer } from '@/services/seacrhService';

    const route = useRoute();
    const jobOffer = ref(null);
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

</script>

<template>
    <div class="md:flex justify-center mx-auto py-10 text-gray-100 md:min-h-200">
        <div v-if="errorMessage" class="text-3xl font-semibold">
            {{ errorMessage }}
        </div>

        <main 
            v-else
            class="text-center md:w-2/3 bg-gray-900 rounded"
        >
            <h1>{{ jobOffer.title }}</h1>
        </main>
    </div>
</template>