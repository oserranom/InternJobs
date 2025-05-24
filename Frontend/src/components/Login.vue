<script setup>
    import { reactive, defineEmits } from 'vue';
    import Alert from '@/components/Alert.vue'; 
    

    const user = reactive({
        email : '',
        password : ''
    });

    const alert = reactive({
        type: '',
        message: ''
    }); 

    //Definimos emit hacia la vista
    const emit = defineEmits(['submit']); 

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

    const formValidation = ()=>{
        if(Object.values(user).includes('')){
            showAlert('error', 'Todos los campos son requeridos'); 
            return; 
        }

            //Emitimos a la vista
        emit('submit', {...user}); 
    }
    

</script>

<template>
    <div class="flex justify-center p-5 text-gray-100">
        <div class="md:w-2/5 rounded-lg bg-gray-900 p-5">
            <form
                class="p-5 pb-0"
                @submit.prevent="formValidation"
            >

                <div class="w-full p-3">
                    <label for="email" class="block font-semibold">Email: </label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Email"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="user.email"
                    >
                </div>


                <div class="w-full p-3 -mt-2">
                    <label for="password" class="block font-semibold">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="Introduce tu contraseña"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                        v-model="user.password"
                    >
                </div>

                <div class="w-full p-3">
                    <input 
                        type="submit"
                        class="bg-emerald-500 hover:bg-emerald-600 rounded w-full py-2 font-semibold cursor-pointer"
                        value="Entrar a mi cuenta"
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