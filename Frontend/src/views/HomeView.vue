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

  <main class="w-2/3 mx-auto h-170 mt-10">
    <h2 class="text-emerald-400 text-center font-semibold text-2xl">
      De estudiante a profesional, construyendo tu futuro.
    </h2>
    <p class="text-center font-light text-xl mt-2">
      Encuentra prácticas profesionales y formaliza tu experiencia.
    </p>
  </main>
</template>
