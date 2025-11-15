<template>
  <Navbar />

  <main class="min-h-screen">
    <RouterView />
  </main>

  <Footer />
</template>

<script setup>
import Navbar from "./components/Navbar.vue"
import Footer from "./components/Footer.vue"
</script>

<style>
html, body, #app {
  height: 100%;
  margin: 0;
}
</style>
