<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import { reactive, computed, ref } from 'vue';
    import Alert from '@/components/Alert.vue';
    import { isValidPhone } from '@/helpers';
    import { registerCandidate } from '@/services/authService';

    const router = useRouter(); 

    const company = reactive({
        name: '',
        email: '',
        industry: '',
        description: '',
        company_url: '',
        password: ''
    });

    const confirmPass = ref(''); 

    const alert = reactive({
        type: '',
        message: ''
    }); 

    const maxLength = 2000;

    const restCaracts = computed(()=>{
        return maxLength - company.description.length;
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
        if(Object.values(company).includes('')){
            showAlert('error', 'Todos los campos son requeridos'); 
            return;
        }
        
        if(company.password !== confirmPass.value){
            showAlert('error', 'Password no coincide con la confirmación');
            return; 
        }

        handleSubmit(); 
     
    }

    const handleSubmit = async ()=>{
        try {
            const response = await registerCandidate(company);
            console.log(response); 


            showAlert('success', 'Empresa registrado con éxito');
            setTimeout(() => {
                router.push({ name: 'LoginCompany'}); 
            }, 3500);

            
        } catch (error) {
            console.log(error);
            showAlert('error', error); 
        }
    }


</script>

<template>
    <div class="flex justify-center p-10 text-gray-100">
        <div class="md:w-3/5 rounded-lg bg-gray-900 p-5">

            <div class="flex justify-end mx-3 mb-2">
                <RouterLink
                    :to="{ name: 'CandidateRegister'}"
                    class="text-lg underline text-emerald-400 hover:text-gray-100"
            >
                    Soy candidato
                </RouterLink>
            </div>



            <h1 class="text-2xl font-semibold text-center mb-5 p-2">
                Regístrate como empresa en Intern<span class="text-emerald-500 font-bold">Jobs</span>
            </h1>

            <form
                class="p-5"
                @submit.prevent="formValidation"
            >
                <div class="w-full p-3">
                    <label for="name" class="block font-semibold">Nombre de la empresa: </label>
                    <input 
                        type="text"
                        id="name"
                        placeholder="Nombre de la empresa"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="company.name"
                    >
                </div>

                <div class="w-full p-3">
                    <label for="email" class="block font-semibold">Email corporativo: </label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Email corporativo"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="company.email"
                    >
                </div>

                <div class="w-full p-3">
                    <label for="industry" class="block font-semibold">Sector: </label>
                    <input 
                        type="text"
                        id="industry"
                        placeholder="Sector"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="company.industry"
                    >
                </div>

                <div class="w-full p-3">
                    <label for="company_url" class="block font-semibold">Página web: </label>
                    <input 
                        type="url"
                        id="company_url"
                        placeholder="Enlace a la página web de la empresa"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="company.company_url"
                    >
                </div>

                <div class="w-full p-3">
                    <label for="description" class="block font-semibold">Descripción: </label>
                    <textarea 
                        name="description" 
                        id="description"
                        class="w-full bg-gray-100 rounded text-gray-900 p-2 min-h-40"
                        placeholder="Presente su empresa mediante una descripción"
                        v-model="company.description"
                        :maxlength="maxLength"
                    ></textarea>
                    <p class="text-sm text-right font-semibold">{{ restCaracts }}</p>
                </div>

                <div class="w-full p-3 -mt-2">
                    <label for="password" class="block font-semibold">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="Introduce tu contraseña"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="company.password"
                    >
                </div>

                <div class="w-full p-3 mb-2">
                    <label for="confirmPassword" class="block font-semibold">Confirma Password: </label>
                    <input 
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirma tu contraseña"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="confirmPass"
                    >
                </div>

                <div class="w-full p-3">
                    <input 
                        type="submit"
                        class="bg-emerald-500 hover:bg-emerald-600 rounded w-full  py-2 font-semibold cursor-pointer"
                        value="Crear Cuenta"
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


<style scoped>
    /*Este style solo afecta al desvanecimiento de la Alert*/
    .fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease;
    }
    .fade-enter-from, .fade-leave-to {
    opacity: 0;
    }
</style>