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
        router.push({ name: 'JobOfferDetail', params: { id: props.application.job_offer_id }}); 
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
        <div class="flex justify-between items-center">
            <span class="mx-2 font-semibold">{{ application.title }}</span>
            <h3 class="text-sm">Fecha de aplicación: <span class="mx-2 text-m">{{ formatDate(application.applied_at) }}</span></h3>
        </div>
        
        <div>
            <span class="mx-2 text-emerald-500">{{ application.company_name }}</span>
        </div>

        <div class="flex justify-between mt-2 mx-1">
            <p :class="`${statusClass} rounded-lg px-2 py-1 text-sm font-bold`"> {{ application.status }}</p>

            <button 
                @click="goToDetail"
                class="bg-emerald-500 text-sm font-bold rounded-lg px-2 py-1 cursor-pointer hover:bg-emerald-600 transition"
            >Ver oferta</button>

        </div>

    </div>
</template>