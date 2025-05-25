<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import Login from '@/components/Login.vue';
    import Alert from '@/components/Alert.vue';
    import { loginCandidate } from '@/services/authService';
    import { useCandidateStore } from '@/stores/candidates';

    const candidateStore = useCandidateStore();

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

    const handleLogin = async(user)=>{
        try {
            //Petición al backend
            const data = await loginCandidate(user);
            //Alert success
            showAlert('success', data.message); 
            //Guardar JWT en el navegador
            localStorage.setItem('AUTH_TOKEN', data.candidate.token);
            localStorage.setItem('USER_ROLE', 'candidate'); 

            //Actualiza el store global
            candidateStore.candidate = data.candidate; 

            //Hacia home
            setTimeout(() => {
                router.push({ name: 'home'})
            }, 3200);

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

<style scoped>
    /*Este style solo afecta al desvanecimiento de la Alert*/
    .fade-enter-active, .fade-leave-active {
    transition: opacity 1s ease;
    }
    .fade-enter-from, .fade-leave-to {
    opacity: 0;
    }
</style>