<script setup>
    import { onMounted, reactive } from 'vue';
    import { useCompanyStore } from '@/stores/companies';
    import Alert from '../Alert.vue';

    const companyStore = useCompanyStore(); 

    const company = reactive({
        name: '',
        email: '',
        company_url: '',
        description: ''
    }); 

    onMounted(async ()=>{
        try {
            const data = await companyStore.fetchCompany();

            company.name = data.name; 
            company.email = data.email; 
            company.company_url = data.company_url;
            company.description = data.description; 

        } catch (error) {
            console.log(error); 
        }
    });

    
</script>

<template>
    <h1 class="text-center text-2xl font-semibold">Datos de mi <span class="text-emerald-500">Empresa</span></h1>
    <div class="flex justify-center text-gray-100 p-6 mt-5">
        <form
            class="md:w-3/5 rounded-lg bg-gray-900 p-5"
            @submit.prevent=""
        >
            <div class="w-full p-3">
                <label for="name" class="block w-full font-semibold">Nombre: </label>
                <input 
                    class="bg-gray-100 rounded w-full p-2 text-gray-900"
                    type="text" 
                    id="name" 
                    name="name" 
                    v-model="company.name"
                >
            </div>

            <div class="w-full p-3">
                <label for="email" class="block w-full font-semibold">Email: </label>
                <input 
                    class="bg-gray-100 rounded w-full p-2 text-gray-900"
                    type="email" 
                    id="email" 
                    name="email" 
                    v-model="company.email"
                >
            </div>

            <div class="w-full p-3">
                <label for="company_url" class="block w-full font-semibold">Web Corporativa: </label>
                <input 
                    class="bg-gray-100 rounded w-full p-2 text-gray-900"
                    type="url" 
                    id="company_url" 
                    name="company_url" 
                    v-model="company.company_url"
                >
            </div>

            <div class="w-full p-3">
                <label 
                    for="description"
                    class="block w-full font-semibold"
                >
                    Descripción: 
                </label>
                <textarea 
                    class="bg-gray-100 rounded w-full p-2 text-gray-900 min-h-30"
                    name="description"
                    id="description"
                    v-model="company.description"
                >
                </textarea>
            </div>

            <div class="p-3">
                <input 
                    type="submit" 
                    value="Guardar Cambios"
                    class="bg-emerald-500 py-1 px-2 rounded font-semibold cursor-pointer w-full  hover:bg-emerald-600 transition"
                >
            </div>


        </form>
    </div>
</template>