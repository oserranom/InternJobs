<script setup>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter(); 

  const searchForm = reactive({
    location: '',
    study_field: '',
    education_level: '',
  });

  function handleSubmit() {
    router.push({ 
      name: 'search',
      query: {
        location: searchForm.location,
        study_field: searchForm.study_field,
        education_level: searchForm.education_level
      } 

    });
  }

</script>

<template>
 
  <form
    @submit.prevent="handleSubmit"
    class=" bg-gray-800/90 p-5 rounded-lg shadow-md flex flex-col md:flex-row gap-3 md:gap-5"
  >
    <!-- Select Provincia -->
    <select
      v-model="searchForm.location"
      class="w-full md:flex-1 p-2 rounded-lg bg-gray-100 text-gray-800"
    >
      <option disabled value="">Provincia</option>
      <option value="Barcelona">Barcelona</option>
      <option value="Sevilla">Sevilla</option>
      <option value="Madrid">Madrid</option>
      <option value="Malaga">Málaga</option>
      <option value="Valencia">Valencia</option>
      <option value="Zaragoza">Zaragoza</option>
    </select>

    <!-- Select Rama de estudios -->
    <select
      v-model="searchForm.study_field"
      class="w-full md:flex-1 p-2 rounded-lg bg-gray-100 text-gray-800"
    >
      <option disabled value="">Rama de estudios</option>
      <option value="it">Informática y telecomunicaciones</option>
      <option value="márketing">Comercio y marketing</option>
      <option value="sanidad">Sanidad</option>
      <option value="química">Química</option>
      <option value="electricidad">Eelectricidad</option>
      <option value="fab/mec">Fabricación y mecánica</option>

    </select>

    <!-- Select Nivel de estudios -->
    <select
      v-model="searchForm.education_level"
      class="w-full md:flex-1 p-2 rounded-lg bg-gray-100 text-gray-800"
    >
      <option disabled value="">Nivel de estudios</option>
      <option value="CFGM">CFGM</option>
      <option value="CFGS">CFGS</option>
    </select>

    <button
      type="submit"
      class="w-full md:w-auto p-2 rounded-lg bg-emerald-500 text-gray-50 cursor-pointer hover:bg-emerald-600 transition duration-300"
    >
      Buscar Prácticas
    </button>

  </form>

</template>