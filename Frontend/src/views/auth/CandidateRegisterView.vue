<script setup>
    import { RouterLink, useRouter } from 'vue-router';
    import { reactive, computed, ref } from 'vue';
    import Alert from '@/components/Alert.vue';
    import { isValidPhone } from '@/helpers';
    import { registerCandidate } from '@/services/authService';

    const router = useRouter(); 

    const candidate = reactive({
        name: '',
        email: '',
        phone_number: '',
        cv: '',
        password: ''
    });

    const confirmPass = ref(''); 

    const alert = reactive({
        type: '',
        message: ''
    }); 

    const maxLength = 4000;

    const restCaracts = computed(()=>{
        return maxLength - candidate.cv.length;
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
        if(Object.values(candidate).includes('')){
            showAlert('error', 'Todos los campos son requeridos'); 
            return;
        }
        if(!isValidPhone(candidate.phone_number)){
            showAlert('error', 'El formato de teléfono no es válido, solo se permiten números');
            return;
        }
        if(candidate.password.length < 6){
            showAlert('error', 'El password requiere más carácteres')
        }
        if(candidate.password !== confirmPass.value){
            showAlert('error', 'Password no coincide con la confirmación');
            return; 
        }

        handleSubmit(); 
     
    }

    const handleSubmit = async ()=>{
        try {
            const response = await registerCandidate(candidate);
            console.log(response); 

            candidate.name = '';
            candidate.email = '';
            candidate.phone_number = '';
            candidate.cv = '';
            candidate.password = '';
            confirmPass.value = '';

            showAlert('success', 'Candidato registrado con éxito');
            setTimeout(() => {
                router.push({ name: 'LoginCandidate'}); 
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
                    :to="{ name: 'CompanyRegister'}"
                    class="text-lg underline text-emerald-400 hover:text-gray-100"
            >
                    Soy una empresa
                </RouterLink>
            </div>



            <h1 class="text-2xl font-semibold text-center mb-5 p-2">
                Regístrate como candidato en Intern<span class="text-emerald-500 font-bold">Jobs</span>
            </h1>

            <form
                class="p-5"
                @submit.prevent="formValidation"
            >
                <div class="w-full p-3">
                    <label for="name" class="block font-semibold">Nombre: </label>
                    <input 
                        type="text"
                        id="name"
                        placeholder="Nombre"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="candidate.name"
                    >
                </div>

                <div class="w-full p-3">
                    <label for="email" class="block font-semibold">Email: </label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Email"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="candidate.email"
                    >
                </div>

                <div class="w-full p-3">
                    <label for="phone" class="block font-semibold">Teléfono: </label>
                    <input 
                        type="number"
                        id="phone"
                        placeholder="Teléfono"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="candidate.phone_number"
                    >
                </div>

                <div class="w-full p-3">
                    <label for="cv" class="block font-semibold">Currículum en texto: </label>
                    <textarea 
                        name="cv" 
                        id="cv"
                        class="w-full bg-gray-100 rounded text-gray-900 p-2 min-h-50"
                        placeholder="Currículum en texto"
                        v-model="candidate.cv"
                        :maxlength="maxLength"
                    ></textarea>
                    <p 
                        class="text-sm text-right font-semibold"
                        :class="[restCaracts < 100 ? 'text-red-500' : 'text-gray-100']"
                    >{{ restCaracts }}</p>
                </div>

                <div class="w-full p-3 -mt-2">
                    <label for="password" class="block font-semibold">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="Introduce tu contraseña"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="candidate.password"
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