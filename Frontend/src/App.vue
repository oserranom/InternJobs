<script setup>
  import { RouterView } from 'vue-router'
  import Navbar from '@/components/Navbar.vue'
  import Footer from '@/components/Footer.vue'
</script>

<template>
  <div>
    <Navbar />

    <div>
      <RouterView />
    </div>
  </div>

  <Footer />
  
</template>

