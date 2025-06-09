<script setup>
    import { computed, onMounted, reactive } from 'vue';
    import { useRouter, useRoute } from 'vue-router'; 
    import Alert from '../Alert.vue';
    import { getJobOffer } from '@/services/seacrhService';
    import { updateJobOffer, deleteJobOffer } from '@/services/companyService';


    const router = useRouter(); 
    const route = useRoute();

    const id = route.params.id;

    const oldJobOffer = reactive({
        title: '',
        description: '',
        location: '',
        salary: '',
        education_level: '',
        study_field: ''
    }); 

    const jobOfferUpdated = reactive({
        title: '',
        description: '',
        location: '',
        salary: '',
        education_level: '',
        study_field: ''
    }); 

    onMounted( async ()=>{
        try {
            const response = await getJobOffer(id);
            oldJobOffer.value = response; 
            
            Object.assign(oldJobOffer, response);
            Object.assign(jobOfferUpdated, oldJobOffer); 

        } catch (error) {
            console.log(error);
        }
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


    const formValidation = async ()=>{
        
        const isEmpty = Object.values(jobOfferUpdated).some(val => {
            return String(val).trim() === '' || val === null || val === undefined;
        });

        if(isEmpty){
            showAlert('error', 'Todos los campos son requeridos'); 
            return;
        }

        handleSubmit(); 
    }

    const handleSubmit = async ()=>{
        try {
            const response = await updateJobOffer(id, jobOfferUpdated); 

            showAlert('success', 'La oferta ha sido actualizada');
            setTimeout(() => {
                router.push({ name: 'PublishedOffers' });
            }, 2500);

            
        } catch (error) {
            console.log(error);
            showAlert('error', 'La oferta no ha podido actualizarse'); 
        }
    }

    const maxLength = 2000;

    const restCaracts = computed(()=>{
        return maxLength - jobOfferUpdated.description.length;
    });

    const deleteOffer = async () =>{
        try {
            const response = await deleteJobOffer(id);
            console.log(response);

            showAlert('success', 'La oferta ha sido eliminada');
            setTimeout(() => {
                router.push({ name: 'PublishedOffers' });
            }, 2500);

        } catch (error) {
            console.log(error);
            showAlert('error', 'La oferta no ha podido ser eliminada'); 
        }
    }

    
</script>

<template>
    <h1 class="text-center text-2xl font-semibold">Modifica o elimina una <span class="text-emerald-500">Oferta</span></h1>
    <div class="flex justify-center text-gray-100 p-6 mt-5 mb-10">
        <form
            class="md:w-3/5 rounded-lg bg-gray-900 p-5"
            @submit.prevent="formValidation"
        >
            <div class="w-full p-3">
                <label for="title" class="block w-full font-semibold">Título: </label>
                <input 
                    class="bg-gray-100 rounded w-full p-2 text-gray-900"
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Título para la oferta"
                    v-model="jobOfferUpdated.title"
                >
            </div>

            <div class="w-full p-3">
                <label for="location" class="block w-full font-semibold">Localización: </label>
                <select
                    v-model="jobOfferUpdated.location"
                    class=" bg-gray-100 text-gray-900 w-full rounded p-2"
                    id="location"
                >
                    <option disabled value="">Provincia</option>
                    <option value="Barcelona">Barcelona</option>
                    <option value="Sevilla">Sevilla</option>
                    <option value="Madrid">Madrid</option>
                    <option value="Malaga">Málaga</option>
                    <option value="Valencia">Valencia</option>
                    <option value="Zaragoza">Zaragoza</option>
                </select>
            </div>

            <div class="w-full p-3">
                <label for="study_field" class="block w-full font-semibold">Especialidad: </label>
                <select
                    v-model="jobOfferUpdated.study_field"
                    class=" bg-gray-100 text-gray-900 w-full rounded p-2"
                    id="study_field"
                >
                    <option disabled value="">Rama de estudios</option>
                    <option value="it">Informática y telecomunicaciones</option>
                    <option value="márketing">Comercio y marketing</option>
                    <option value="sanidad">Sanidad</option>
                    <option value="química">Química</option>
                    <option value="electricidad">Eelectricidad</option>
                    <option value="fab/mec">Fabricación y mecánica</option>
                </select>
            </div>


            <div class="w-full p-3">
                <label for="education_level" class="block w-full font-semibold">Titulación: </label>
                <select
                    v-model="jobOfferUpdated.education_level"
                    class=" bg-gray-100 text-gray-900 w-full rounded p-2"
                    id="education_level"
                >
                    <option disabled value="">Nivel de estudios</option>
                    <option value="CFGM">CFGM</option>
                    <option value="CFGS">CFGS</option>
                </select>
            </div>


            <div class="w-full p-3">
                <label for="salary" class="block w-full font-semibold">Incentivo económico: </label>
                <input 
                    class="bg-gray-100 rounded w-full p-2 text-gray-900"
                    type="number" 
                    id="salary" 
                    name="salary" 
                    min="0"
                    max="2000"
                    step="50"
                    required
                    v-model.number="jobOfferUpdated.salary"
                >
            </div>

            <div class="w-full p-3">
                    <label for="description" class="block font-semibold">Descripción de la oferta: </label>
                    <textarea 
                        name="description" 
                        id="description"
                        class="w-full bg-gray-100 rounded text-gray-900 p-2 min-h-40"
                        placeholder="Describe la oferta"
                        v-model="jobOfferUpdated.description"
                        :maxlength="maxLength"
                    ></textarea>
                    <p 
                        class="text-sm text-right font-semibold"
                        :class="[restCaracts < 100 ? 'text-red-500' : 'text-gray-100']"
                    >{{ restCaracts }}</p>
            </div>

            <div class="md:flex justify-between">
                <div class="p-3 -mb-2 w-1/3">
                    <input 
                        type="submit" 
                        value="Actualizar Oferta"
                        class="bg-emerald-500 p-2 rounded font-semibold cursor-pointer w-full  hover:bg-emerald-600 transition"
                    >
                </div>

                <div class="p-3 -mb-2 w-1/3">
                    <button
                        type="button"
                        @click.prevent="deleteOffer"
                        class="bg-red-500 p-2 rounded font-semibold cursor-pointer w-full hover:bg-red-600 transition"
                    >
                        Eliminar Oferta
                    </button>
                </div>
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