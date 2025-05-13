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
                <RouterLink class="mx-5">Acceso Empresas</RouterLink>
                <RouterLink class="mx-5">Acceso Candidatos</RouterLink>
                <RouterLink class="mx-5">Regístrate</RouterLink>
            </div>
        </div>
    </nav>
</template>