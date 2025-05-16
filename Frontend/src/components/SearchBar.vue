<script setup>
import { reactive } from 'vue';

const searchForm = reactive({
  provincia: '',
  rama: '',
  nivel: '',
});

function handleSubmit() {
  console.log('Datos del formulario:', searchForm);
}
</script>

<template>
  <div
    class="relative w-full h-[250px] md:h-[400px] bg-[url('/img/office.webp')] bg-cover bg-center md:bg-[center_bottom_40%] 
          bg-no-repeat flex items-center justify-center"
  >
    <h1 class="absolute top-5 text-4xl font-semibold text-gray-900 text-center drop-shadow-lg">
      Portal de ofertas para prácticas laborales
    </h1>

    <form
      @submit.prevent="handleSubmit"
      class="absolute w-full md:w-2/3 bg-gray-800/90 p-5 rounded-lg shadow-md flex flex-col md:flex-row gap-3 md:gap-5"
    >
      <!-- Select Provincia -->
      <select
        v-model="searchForm.provincia"
        class="w-full md:flex-1 p-2 rounded-lg bg-gray-100 text-gray-800"
      >
        <option disabled value="">Provincia</option>
        <option value="MAD">Madrid</option>
        <option value="BCN">Barcelona</option>
        <option value="VAL">Valencia</option>
        <option value="MAL">Málaga</option>
      </select>

      <!-- Select Rama de estudios -->
      <select
        v-model="searchForm.rama"
        class="w-full md:flex-1 p-2 rounded-lg bg-gray-100 text-gray-800"
      >
        <option disabled value="">Rama de estudios</option>
        <option value="it">Informática y telecomunicaciones</option>
        <option value="marketing">Comercio y marketing</option>
        <option value="sanidad">Sanidad</option>
        <option value="quimica">Química</option>
        <option value="electricidad">Eelectricidad</option>

      </select>

      <!-- Select Nivel de estudios -->
      <select
        v-model="searchForm.nivel"
        class="w-full md:flex-1 p-2 rounded-lg bg-gray-100 text-gray-800"
      >
        <option disabled value="">Nivel de estudios</option>
        <option value="CFGM">CFGM</option>
        <option value="CFGS">CFGS</option>
      </select>

      <button
        type="submit"
        class="w-full md:w-auto p-2 rounded-lg bg-emerald-500 text-gray-50 hover:bg-emerald-600 transition duration-300"
      >
        Buscar Prácticas
      </button>
    </form>
  </div>
</template>