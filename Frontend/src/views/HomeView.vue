<script setup>
  import SearchBar from '@/components/SearchBar.vue'
</script>

<template>
  <div
    class="relative w-full h-[250px] md:h-[400px] bg-[url('/img/office.webp')] bg-cover bg-center md:bg-[center_bottom_40%] 
          bg-no-repeat flex items-center justify-center"
  >
    <h1 class="absolute top-5 text-4xl font-semibold text-gray-900 text-center drop-shadow-lg">
      Portal de ofertas para prácticas laborales
    </h1>

    <SearchBar />

  </div>

  <main class="w-2/3 mx-auto mt-10 mb-25">
    <h2 class="text-emerald-400 text-center font-semibold text-2xl">
      De estudiante a profesional, construyendo tu futuro.
    </h2>
    <p class="text-center font-light text-xl mt-2">
      Encuentra prácticas profesionales y formaliza tu experiencia.
    </p>

    <div class="flex items-center mt-15 gap-5">

      <div class="flex flex-col items-center flex-1 rounded-lg p-6 text-gray-200 bg-gray-900" > 
        <svg  xmlns="http://www.w3.org/2000/svg"  width="46"  height="46"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
          class="icon icon-tabler icons-tabler-outline icon-tabler-search text-center"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
          <path d="M21 21l-6 -6" />
        </svg>

        <h3 class="mt-4 text-lg font-semibold">BÚSQUEDA</h3>
        <p class="mt-2 text-center">Busca entre más de XXXX ofertas de prácticas laborales.</p>

      </div>

      <div class="flex flex-col items-center flex-1 rounded-lg p-6 text-gray-200 bg-gray-900" > 
        <svg  xmlns="http://www.w3.org/2000/svg"  width="46"  height="46"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
            class="icon icon-tabler icons-tabler-outline icon-tabler-contract"
          >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M8 21h-2a3 3 0 0 1 -3 -3v-1h5.5" />
          <path d="M17 8.5v-3.5a2 2 0 1 1 2 2h-2" />
          <path d="M19 3h-11a3 3 0 0 0 -3 3v11" />
          <path d="M9 7h4" /><path d="M9 11h4" />
          <path d="M18.42 12.61a2.1 2.1 0 0 1 2.97 2.97l-6.39 6.42h-3v-3z" />
        </svg>

        <h3 class="mt-4 text-lg font-semibold">CONVENIO DE COLABORACIÓN</h3>
        <p class="mt-2 text-center">Formaliza tu convenio de prácticas con la empresa interesada.</p>

      </div>

      <div class="flex flex-col items-center flex-1 rounded-lg p-6 text-gray-200 bg-gray-900" > 
        <svg  xmlns="http://www.w3.org/2000/svg"  width="46"  height="46"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  
          class="icon icon-tabler icons-tabler-outline icon-tabler-trending-up"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M3 17l6 -6l4 4l8 -8" />
          <path d="M14 7l7 0l0 7" />
        </svg>

        <h3 class="mt-4 text-lg font-semibold">TITULACIÓN</h3>
        <p class="mt-2 text-center">Consigue tu titulación y proyecta tu carrera profesional.</p>

      </div>

    </div>
  </main>
</template>
