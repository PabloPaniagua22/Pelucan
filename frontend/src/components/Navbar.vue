<template>
  <header class="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">

        <!-- LOGO -->
        <div class="flex items-center gap-2">
          <img :src="logo" alt="Logo" class="h-12 w-auto" />
        </div>

        <!-- NAV LINKS -->
        <nav class="hidden md:flex items-center gap-8 ">
          <RouterLink to="/" class="text-sm font-medium hover:text-primary transition-colors">Inicio</RouterLink>
          <RouterLink to="/servicios" class="text-sm font-medium hover:text-primary transition-colors">Servicios</RouterLink>
          <RouterLink to="/nosotros" class="text-sm font-medium hover:text-primary transition-colors">Nosotros</RouterLink>
        </nav>

        <!-- LOGIN / CUENTA -->
        <div class="flex items-center gap-4">

          <!-- Si NO está logueado -->
          <RouterLink
            v-if="!userStore.user"
            to="/login"
            class="text-sm font-medium hover:text-primary transition-colors"
          >
            Iniciar Sesión
          </RouterLink>

          <!-- Si está logueado -->
          <RouterLink
            v-else
            to="/cuenta"
            class="text-sm font-medium hover:text-primary transition-colors"
          >
            Mi Cuenta
          </RouterLink>

          <!-- BOTÓN reservar -->
          <RouterLink
            :to="userStore.user ? '/reservar' : '/login'"
            class="bg-primary text-black font-bold text-sm px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors">
            Reservar Turno
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import logo from '../assets/logo.png'

// Pinia store
const userStore = useUserStore()
</script>
