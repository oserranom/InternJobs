<script setup>
    import { onMounted, ref, computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { getApplicationById } from '@/services/companyService';
    import { formatDate } from '@/helpers';

    const route = useRoute();
    const application = ref(null);
    const errorMessage = ref('');

    onMounted(async ()=>{
        try {
            application.value = await getApplicationById(route.params.id);
        } catch (error) {
            console.error(error);
            errorMessage.value = error.message; 
        }
    });

    const statusClass = computed(() =>{
        switch (application.value.status){
            case 'applied':
                return 'bg-blue-500';
            case 'interview':
                return 'bg-yellow-600';
            case 'rejected':
                return 'bg-red-500';
            case 'hired':
                return 'bg-emerald-500';
            default:
                return 'bg-gray-500'
        }
    }); 

    const handleSubmit = async (id) => {
        console.log(id); 
    }

</script>

<template>

    <div class="flex justify-center">
        
        <div v-if="application" class="w-full bg-gray-900 rounded p-2">
            <h2 class="text-xl text-center mt-2 font-semibold">{{ application.title }}</h2>

            <div class="md:flex justify-around p-3 mt-3 font-semibold">
                <p>{{ application.name }}</p>
                <p>{{ application.phone_number }}</p>
            </div>

            <div class="md:flex justify-around p-3 font-semibold items-center">
                <p>{{ application.email }}</p>
                <p :class="`${statusClass} rounded px-3 py-1`">{{ application.status }}</p>
            </div>

            <div class="text-center p-3 mt-3">
                <p class="text-lg font-semibold mb-2">Carta de presentación</p>
                <div class="bg-gray-100 rounded text-gray-900 text-start px-3 py-1">{{ application.cover_letter }}</div>
            </div>

            <div class="text-center p-3">
                <p class="text-lg font-semibold mb-2">CV</p>
                <div class="bg-gray-100 rounded text-gray-900 text-start px-3 py-1">{{ application.cv }}</div>
            </div>

            <form 
                @submit="handleSubmit(application.id)"
            >
                <label for="status">Actualiza el estado de la aplicación</label>
                <select name="status" id="status" class="text-gray-900 bg-gray-100 rounded">
                    <option default value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="rejected">Rejected</option>
                    <option value="hired">Hired</option>
                </select>

                <input 
                    type="submit" 
                    value="Actualizar"
                    class="bg-emerald-500 rounded px-3 py-1"
                >
            </form>

        </div>

        <h2 v-else class="text-xl text-center"> No se ha podido obtener la aplicación </h2>

        
    </div>
    
</template>