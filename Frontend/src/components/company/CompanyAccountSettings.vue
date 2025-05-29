<script setup>
    import { useCompanyStore } from '@/stores/companies';

    const companyStore = useCompanyStore(); 

    
</script>

<template>
    <h1 class="text-center text-2xl font-semibold">Datos de mi <span class="text-emerald-500">Empresa</span></h1>
    <div>
        <form
            class=""
            @submit.prevent=""
        >
            <div class="block">
                <label for="name">Nombre: </label>
                <input type="text" name="name" value="">
            </div>

            <div>
                <label for="email">Email: </label>
                <input type="email" name="email" value="">
            </div>

            <div>
                <label for="company_url">Web Corporativa: </label>
                <input type="url" name="company_url" value="">
            </div>

            <div>
                <label for="description">Descripción: </label>
                <textarea rows="" cols=""></textarea>
            </div>

        </form>
    </div>
</template>