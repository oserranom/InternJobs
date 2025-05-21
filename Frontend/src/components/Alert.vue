<script setup>
    import { computed } from 'vue';

    const props = defineProps({
        alert:{
            type: Object,
            required: true
        }
    });

    const isError = computed(()=>{
        return props.alert.type === 'error'
    });

</script>

<template>

    <div class="flex justify-center">
        <div
            :class="[isError ? 'bg-red-500/80' : 'bg-blue-500/80']"
            class="text-gray-50 text-center py-1 uppercase font-semibold rounded w-full"
        >
            {{ alert.message }}
        </div>
    </div>

</template>