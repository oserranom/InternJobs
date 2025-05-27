<script setup>
    import { ref, computed, reactive } from 'vue';
    import { useRoute, useRouter } from 'vue-router'; 
    import { applyToJobOffer } from '@/services/applicationService';
    import Alert from '@/components/Alert.vue';


    const includeCl = ref(false);

    const route = useRoute();
    const router = useRouter(); 

    const jobOfferId = route.params.id; 

    const cover_letter = ref('');
    const maxLength = 2000;

    const restCaracts = computed(()=>{
        return maxLength - cover_letter.value.length;
    });

    const alert = reactive({
        type: '',
        message: ''
    });

    const deleteAlert = ()=>{
        setTimeout(()=>{
            alert.message = ''
        }, 2000);
    }

    const showAlert = (type, message) =>{
        alert.type = type;
        alert.message = message;

        deleteAlert(); 
    }

    const apply = async ()=>{
        try {
            const response = await applyToJobOffer(jobOfferId, cover_letter.value);
            console.log(response);

            showAlert('success', 'Inscripsión confirmada');

            setTimeout(() => {
                router.push({ name: 'home' }); 
            }, 2200);

        } catch (error) {
            console.error(error);
            showAlert('error', error); 
        }
    }


</script>

<template>
    <div class="flex justify-center items-center text-gray-100 min-h-180 bg-gray-800">

        <div class="md:w-2/5 rounded-lg bg-gray-900 p-5 -mt-25">
            <form
                class="p-5 pb-0"
                @submit.prevent="apply"
            >
                <h1 class="text-center text-2xl font-semibold">Confirma tu <span class="text-emerald-500"> Inscripción</span></h1>

                <select name="includeCL" id="includeCL"
                    class="w-full text-center p-2 mt-5 bg-gray-100 text-gray-900 rounded"
                    v-model="includeCl"
                >
                    <option :value=false>No incluir carta de presentación</option>
                    <option :value=true>Incluir carta de presentación</option>
                </select>

                <div v-if="includeCl">

                    <textarea  
                        name="cover_letter" 
                        id="cover_letter"
                        placeholder="Escribe aquí tu carta de presentación"
                        class="w-full mt-5 p-2 bg-gray-100 text-gray-900 rounded min-h-60"
                        :maxlength="maxLength"
                        v-model="cover_letter"
                    ></textarea>

                    <p 
                        class="text-right text-sm mb-2"
                        :class="[restCaracts < 100 ? 'text-red-500' : 'text-gray-100']"
                    >{{ restCaracts }}</p>

                </div>


                <div class="w-full p-3">
                    <input 
                        type="submit"
                        class="bg-emerald-500 hover:bg-emerald-600 rounded w-full py-2 font-semibold cursor-pointer"
                        value="Confirmar mi inscripción"
                    >
                </div>

            </form>

            <!--Añadiendo transition-->
            <div class="p-7 -mt-5">
                <Transition name="fade">
                    <Alert 
                        v-if="alert.message"
                        :alert="alert"
                    />
                </Transition>
            </div>

        </div>
    </div>
</template>