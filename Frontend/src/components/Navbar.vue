<script>
import { RouterLink } from 'vue-router';


</script>

<template>
    <nav>
        <div class="md:flex justify-between px-10 py-5 items-center">

            <RouterLink
                :to="{name: 'home'}"
            >
                <img src="/Logo/ijlogo.svg" alt="Tu logo" class="h-20 w-auto" />
            </RouterLink>
                

            <div class="md:flex justify-between">
        
                <div class="group hover:bg-gray-50 mx-5 py-2 px-3 rounded-lg font-bold text-sm transition">
                    <RouterLink class=" text-gray-50 font-bold text-sm group-hover:text-gray-800">Acceso Empresas</RouterLink>
                </div>

                <div class="group hover:bg-gray-50 mx-5 py-2 px-3 rounded-lg font-bold text-sm transition" >
                    <RouterLink class="text-gray-50 font-bold text-sm group-hover:text-gray-800">Acceso Candidatos</RouterLink>
                </div>

                <div class="bg-emerald-300 mx-5 py-2 px-3 rounded-lg font-bold text-sm hover:bg-emerald-500 transition">
                    <RouterLink class=" text-gray-800">Regístrate</RouterLink>
                </div>
                
            </div>


        </div>
    </nav>
</template>