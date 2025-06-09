<script setup>
    import { computed } from 'vue';
    import { useRouter } from 'vue-router';
    import { formatDate } from '@/helpers';

    const router = useRouter(); 

    const props = defineProps({
        application:{
            type: Object
        }
    });

    const goToDetail = () =>{
        router.push({ name: 'ApplicationDetail', params: { id: props.application.id }}); 
    }

    //Clases de estilo dinámicas para multiples opciones 
    const statusClass = computed(() =>{
        switch (props.application.status){
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


</script>

<template>
    <div 
        class="bg-gray-900 text-gray-100 my-3 rounded-lg py-3 px-5 cursor-pointer border border-gray-200 text-lg"
    >   
        <div class="flex justify-between">
            <h3 class="">Nombre: <span class="mx-2 font-semibold">{{ application.name }}</span></h3>
            <h3>Aplicó el: <span class="mx-2 text-m">{{ formatDate(application.applied_at) }}</span></h3>
        </div>

        <div>
            <h3>Aplicó a: <span class="mx-2 font-semibold">{{ application.title }}</span></h3>
        </div>
        
        <div>
            <h3>Email: <span class="mx-2 font-semibold">{{ application.email }}</span></h3>
        </div>

        <div class="flex justify-between mt-2">
            <p :class="`${statusClass} rounded-lg px-2 py-1 text-sm font-bold`"> {{ application.status }}</p>

            <button 
                @click="goToDetail"
                class="bg-emerald-500 font-bold rounded-lg text-sm px-2 py-1 cursor-pointer hover:bg-emerald-600 transition"
            >Gestionar aplicación</button>
        </div>

    </div>
</template>