<script>
import { RouterLink } from 'vue-router';


</script>

<template>
    <nav class="bg-gray-800 sticky top-0 z-10 shadow-[0_4px_6px_-2px_rgba(16,185,129,0.5)]">
        <div class="md:flex justify-between px-15 py-5 items-center">

            <RouterLink
                class="text-3xl font-serif font-bold text-gray-50 hover:text-emerald-400 transition duration-300 ease-in-out"
                :to="{name: 'home'}"
            >
                Intern<span class="font-sans font-extrabold text-emerald-400">JOBS</span>
            </RouterLink>
                

            <div class="md:flex justify-between">
        
               
                <RouterLink 
                    class="text-gray-50 text-lg hover:text-gray-800 mx-2 hover:bg-gray-50 transition duration-300 ease-in-out
                            py-1 px-3 rounded-lg font-semibold"
                >
                    Acceso Empresas
                </RouterLink>
            
                <RouterLink 
                    class="text-gray-50 text-lg hover:text-gray-800 mx-2 hover:bg-gray-50 transition duration-300 ease-in-out
                            py-1 px-3 rounded-lg font-semibold"
                >
                    Acceso Candidatos
                </RouterLink>
            
                <RouterLink 
                    class="text-lg font-bold text-gray-800 bg-emerald-400 mx-2 rounded-lg py-1 px-3 
                        hover:shadow-[0_8px_25px_rgba(16,185,129,0.5)] hover:bg-emerald-300 transition duration-300 ease-in-out"
                >
                    Regístrate
                </RouterLink>
                
            </div>


        </div>
    </nav>
</template>