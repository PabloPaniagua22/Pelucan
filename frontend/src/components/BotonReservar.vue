<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>

<template>
  <RouterLink
    :to="userStore.user ? '/reservar' : '/login'"
    class="mt-8 inline-block bg-primary text-black font-bold text-base px-8 py-3 rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50"
  >
    Reservar Turno
  </RouterLink>
</template>
