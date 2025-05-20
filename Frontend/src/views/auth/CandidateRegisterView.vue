<script setup>
    import { RouterLink } from 'vue-router';


</script>

<template>
    <div class="flex justify-center p-10 text-gray-100">
        <div class="md:w-3/5 rounded-lg bg-gray-900 p-5">

            <div class="flex justify-end mx-3 mb-2">
                <RouterLink
                    :to="{ name: 'CompanyRegister'}"
                    class="text-lg underline text-emerald-400 hover:text-gray-100"
            >
                    Soy una empresa
                </RouterLink>
            </div>



            <h1 class="text-2xl font-semibold text-center mb-5 p-2">
                Regístrate como candidato en Intern<span class="text-emerald-500 font-bold">Jobs</span>
            </h1>

            <form
                class="p-5"
                @submit.prevent="validar"
            >
                <div class="w-full p-3">
                    <label for="name" class="block font-semibold">Nombre: </label>
                    <input 
                        type="text"
                        id="name"
                        placeholder="Nombre"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                    >
                </div>

                <div class="w-full p-3">
                    <label for="email" class="block font-semibold">Email: </label>
                    <input 
                        type="email"
                        id="email"
                        placeholder="Email"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                    >
                </div>

                <div class="w-full p-3">
                    <label for="phone" class="block font-semibold">Teléfono: </label>
                    <input 
                        type="number"
                        id="phone"
                        placeholder="Teléfono"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                    >
                </div>

                <div class="w-full p-3">
                    <label for="cv" class="block font-semibold">Currículum en texto: </label>
                    <textarea 
                        name="cv" 
                        id="cv"
                        class="w-full bg-gray-100 rounded text-gray-900 p-2 min-h-50"
                        placeholder="Currículum en texto"
                    ></textarea>
                </div>

                <div class="w-full p-3 mb-2">
                    <label for="password" class="block font-semibold">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        placeholder="Introduce tu contraseña"
                        class="w-full p-2 bg-gray-100 rounded text-gray-900"
                    >
                </div>

            </form>

        </div>

    </div>
</template>