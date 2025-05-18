<script setup>
    import formatDate from '@/helpers/dates';

    defineProps({
        jobOffer:{
            type: Object
        }
    });
</script>

<template>
    <div 
        class="bg-gray-900 text-gray-100 my-3 rounded-lg py-2 px-5 cursor-pointer border border-gray-200"
    >   
        <div class="md:flex justify-between">
            <h3 class="text-2xl font-semibold">{{ jobOffer.title }}</h3>
            <p class="text-xl font-light">{{ formatDate(jobOffer.created_at) }}</p>
        </div>
        
        <div class="md:flex justify-between mb-2">
            <p class="text-xl font-light text-emerald-300">{{ jobOffer.company_name }}</p>
            <p class="font-semibold">{{ jobOffer.location }}</p>
        </div>
        <p class="mb-2">{{ jobOffer.description }}</p>

        <div class="flex justify-start gap-2 mb-1">
            <div class="bg-gray-100 text-gray-800 px-2 rounded-lg font-semibold uppercase">{{ jobOffer.study_field }}</div>
            <div class="bg-gray-100 text-gray-800 px-2 rounded-lg font-semibold">{{ jobOffer.education_level }}</div>
            <div 
                v-if="jobOffer.salary > 0"
                class="bg-emerald-100 text-gray-800 px-2 rounded-lg font-semibold">
                {{ jobOffer.salary }}€
            </div>
        </div>

    </div>
</template>