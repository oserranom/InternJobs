<script setup>
    import { onMounted, ref, computed, reactive } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { getApplicationById, updateStatus } from '@/services/companyService';
    import Alert from '../Alert.vue';


    const route = useRoute();
    const router = useRouter(); 
    const application = ref(null);
    const errorMessage = ref('');

    const alert = reactive({
        type: '',
        message: ''
    });

    const status = ref('applied');

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


    const deleteAlert = ()=>{
        setTimeout(()=>{
            alert.message = ''
        }, 3000);
    }

    const showAlert = (type, message) =>{
        alert.type = type;
        alert.message = message;

        deleteAlert(); 
    }

    const handleSubmit = async (id, newStatus) => {
        await updateStatus(id, newStatus); 
        application.value.status = newStatus; 
        showAlert('success', 'Estado actualizado');

        setTimeout(() => {
            router.push({ name: 'Applications' }); 
        }, 2500);
    }

</script>

<template>

    <div class="flex justify-center">
        
        <div v-if="application" class="md:w-2/3 bg-gray-900 rounded p-2">
            <h2 class="text-xl text-center mt-2 font-semibold text-emerald-500">{{ application.title }}</h2>

            <div class="lg:flex justify-between py-3 px-25 mt-3 font-semibold">
                <p>{{ application.name }}</p>
                <p>{{ application.phone_number }}</p>
            </div>

            <div class="lg:flex justify-between py-3 px-25 font-semibold items-center">
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
                @submit.prevent="handleSubmit(application.id, status)"
                class="border-t border-white/20 my-5 pt-5"
            >
                <div class="flex flex-col items-center justify-center gap-4">
                    
                    <label for="status" class="font-medium text-lg">Actualiza el estado de la aplicación</label>
                

                    <div>
                        <select name="status" id="status" 
                            class="text-gray-900 bg-gray-100 rounded px-3 py-1 mx-2"
                            v-model="status"
                        >
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="rejected">Rejected</option>
                            <option value="hired">Hired</option>
                        </select>

                        <input 
                            type="submit" 
                            value="Actualizar"
                            class="bg-emerald-500 rounded px-3 py-1 font-semibold mx-2 cursor-pointer hover:bg-emerald-600 transition"
                        >
                    </div>

                </div>

            </form>

            <Alert 
                v-if="alert.message"
                :alert="alert"
            />

        </div>

        <h2 v-else class="text-xl text-center"> No se ha podido obtener la aplicación </h2>

        
    </div>
    
</template>