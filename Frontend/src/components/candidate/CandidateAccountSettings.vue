<script setup>
    import { onMounted, reactive, computed } from 'vue';
    import { useRouter } from 'vue-router'; 
    import { useCandidateStore } from '@/stores/candidates';
    import Alert from '../Alert.vue';
    import { updateCandidate } from '@/services/candidateService';


    const candidateStore = useCandidateStore(); 
    const router = useRouter(); 

    const candidate = reactive({
        name: '',
        email: '',
        phone_number: '',
        cv: ''
    }); 

    const alert = reactive({
        type: '',
        message: ''
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

    onMounted(async ()=>{
        try {
            const data = await candidateStore.fetchCandidate();

            candidate.name = data.name; 
            candidate.email = data.email; 
            candidate.phone_number = data.phone_number;
            candidate.cv = data.cv; 

        } catch (error) {
            console.log(error); 
        }
    });


    const formValidation = async ()=>{
        if(Object.values(candidate).includes('')){
            showAlert('error', 'Todos los campos son requeridos'); 
            return;
        }

        handleSubmit(); 
    }

    const handleSubmit = async ()=>{
        try {
            const response = await updateCandidate(candidate); 
            console.log(response); 

            showAlert('success', 'Datos guardados');
            setTimeout(() => {
                router.push({ name: 'CandidateProfile'});
            }, 3500);

            
        } catch (error) {
            console.log(error);
            showAlert('error', error); 
        }
    }

    const maxLength = 4000;

    const restCaracts = computed(()=>{
        return maxLength - candidate.cv.length;
    });
    
</script>

<template>
    <h1 class="text-center text-2xl font-semibold">Modifica los datos de tu <span class="text-emerald-500">Perfil</span></h1>
    <div class="flex justify-center text-gray-100 p-6 mt-5">
        <form
            class="md:w-3/5 rounded-lg bg-gray-900 p-5"
            @submit.prevent="formValidation"
        >
            <div class="w-full p-3">
                <label for="name" class="block w-full font-semibold">Nombre: </label>
                <input 
                    class="bg-gray-100 rounded w-full p-2 text-gray-900"
                    type="text" 
                    id="name" 
                    name="name" 
                    v-model="candidate.name"
                >
            </div>

            <div class="w-full p-3">
                <label for="email" class="block w-full font-semibold">Email: </label>
                <input 
                    class="bg-gray-100 rounded w-full p-2 text-gray-900"
                    type="email" 
                    id="email" 
                    name="email" 
                    v-model="candidate.email"
                >
            </div>

            <div class="w-full p-3">
                <label for="phone_number" class="block w-full font-semibold">Teléfono: </label>
                <input 
                    class="bg-gray-100 rounded w-full p-2 text-gray-900"
                    type="number" 
                    id="phone_number" 
                    name="phone_number" 
                    v-model="candidate.phone_number"
                >
            </div>

            <div class="w-full p-3">
                <label 
                    for="cv"
                    class="block w-full font-semibold"
                >
                    CV: 
                </label>
                <textarea 
                    class="bg-gray-100 rounded w-full p-2 text-gray-900 min-h-40"
                    name="cv"
                    id="cv"
                    v-model="candidate.cv"
                    :maxlength="maxLength"
                >
                </textarea>
                <p 
                    class="text-right text-sm"
                    :class="[restCaracts < 100 ? 'text-red-500' : 'text-gray-100']"
                >{{ restCaracts }}
                </p>
            </div>

            <div class="p-3 -mb-2">
                <input 
                    type="submit" 
                    value="Guardar Cambios"
                    class="bg-emerald-500 p-2 rounded font-semibold cursor-pointer w-full  hover:bg-emerald-600 transition"
                >
            </div>

            <div class="p-3 block -mb-2">
                <Transition name="fade">
                    <Alert 
                        v-if="alert.message"
                        :alert="alert"
                    />
                </Transition>
            </div>

        </form>

    </div>

</template>

<style scoped>
    /*Este style solo afecta al desvanecimiento de la Alert*/
    .fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease;
    }
    .fade-enter-from, .fade-leave-to {
    opacity: 0;
    }
</style>