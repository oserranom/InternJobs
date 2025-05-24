<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import Login from '@/components/Login.vue';
    import Alert from '@/components/Alert.vue';

    const router = useRouter(); 

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

    const handleLogin = async()=>{
        try {
            showAlert('success', 'Hola'); 
        } catch (error) {
            console.log(error);
            showAlert('error', error); 
        }
    }

</script>

<template>
    <div class="md:mb-60">
        <h2 class="text-center text-3xl font-semibold mt-20">Acceso candidatos</h2>

        <Login 
            @submit="handleLogin"
        />

        <div class="flex justify-center px-37">
            <Transition name="fade">
                <Alert 
                    class="md:w-1/2"
                    v-if="alert.message"
                    :alert="alert"
                />
            </Transition>
        </div>

    </div>


</template>