<script setup>
    import { computed, reactive } from 'vue';
    import { useRouter } from 'vue-router'; 
    import { useCompanyStore } from '@/stores/companies';
    import Alert from '../Alert.vue';
    import { updateCompany } from '@/services/companyService'

    const companyStore = useCompanyStore(); 
    const router = useRouter(); 

    const jobOffer = reactive({
        title: '',
        description: '',
        location: '',
        salary: '',
        education_level: '',
        study_field: ''
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
        if(Object.values(jobOffer).includes('')){
            showAlert('error', 'Todos los campos son requeridos'); 
            return;
        }

        handleSubmit(); 
    }

    const handleSubmit = async ()=>{
        try {
            const response = 1; 
            console.log(response); 

            showAlert('success', 'Datos guardados');
            setTimeout(() => {
                router.push({ name: 'CompanyProfile'});
            }, 3500);

            
        } catch (error) {
            console.log(error);
            showAlert('error', error); 
        }
    }

    const maxLength = 2000;

    const restCaracts = computed(()=>{
        return maxLength - jobOffer.description.length;
    });

    
</script>

<template>
    <h1 class="text-center text-2xl font-semibold">Crea una nueva <span class="text-emerald-500">Oferta</span></h1>
    <div class="flex justify-center text-gray-100 p-6 mt-5">
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
                >
            </div>

            <div class="w-full p-3">
                <label for="location" class="block w-full font-semibold">Localización: </label>
                <select
                    v-model="jobOffer.location"
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
                    v-model="jobOffer.study_field"
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
                    v-model="jobOffer.education_level"
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
                    v-model.number="jobOffer.salary"
                >
            </div>

            <div class="w-full p-3">
                    <label for="description" class="block font-semibold">Descripción de la oferta: </label>
                    <textarea 
                        name="description" 
                        id="description"
                        class="w-full bg-gray-100 rounded text-gray-900 p-2 min-h-40"
                        placeholder="Describe la oferta"
                        v-model="jobOffer.description"
                        :maxlength="maxLength"
                    ></textarea>
                    <p 
                        class="text-sm text-right font-semibold"
                        :class="[restCaracts < 100 ? 'text-red-500' : 'text-gray-100']"
                    >{{ restCaracts }}</p>
            </div>

            <div class="p-3 -mb-2">
                <input 
                    type="submit" 
                    value="Crear Oferta"
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