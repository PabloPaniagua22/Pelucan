<template>
    <div class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
        <!-- HEADER -->
        <header class="border-b border-border-light dark:border-border-dark">
            <div class="w-full container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-20">
                    <div class="flex items-center gap-3">
                        <svg class="h-8 w-8 text-foreground-light dark:text-foreground-dark" fill="none"
                            viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.8261 30.5736C16.7203 29.8826 20.2244 29.4783 24 29.4783C27.7756 29.4783 31.2797 29.8826 34.1739 30.5736C36.9144 31.2278 39.9967 32.7669 41.3563 33.8352L24.8486 7.36089C24.4571 6.73303 23.5429 6.73303 23.1514 7.36089L6.64374 33.8352C8.00331 32.7669 11.0856 31.2278 13.8261 30.5736Z"
                                fill="currentColor"></path>
                            <path clip-rule="evenodd" fill-rule="evenodd"
                                d="M39.998 35.764C39.9944 35.7463 39.9875 35.7155 39.9748 35.6706C39.9436 35.5601 39.8949 35.4259 39.8346 35.2825C39.8168 35.2403 39.7989 35.1993 39.7813 35.1602C38.5103 34.2887 35.9788 33.0607 33.7095 32.5189C30.9875 31.8691 27.6413 31.4783 24 31.4783C20.3587 31.4783 17.0125 31.8691 14.2905 32.5189C12.0012 33.0654 9.44505 34.3104 8.18538 35.1832C8.17384 35.2075 8.16216 35.233 8.15052 35.2592C8.09919 35.3751 8.05721 35.4886 8.02977 35.589C8.00356 35.6848 8.00039 35.7333 8.00004 35.7388C8.00004 35.739 8 35.7393 8.00004 35.7388C8.00004 35.7641 8.0104 36.0767 8.68485 36.6314C9.34546 37.1746 10.4222 37.7531 11.9291 38.2772C14.9242 39.319 19.1919 40 24 40C28.8081 40 33.0758 39.319 36.0709 38.2772C37.5778 37.7531 38.6545 37.1746 39.3151 36.6314C39.9006 36.1499 39.9857 35.8511 39.998 35.764Z"
                                fill="currentColor"></path>
                        </svg>
                        <h1 class="text-xl font-bold">Pelucan</h1>
                    </div>
                    <div class="hidden md:flex items-center space-x-8">
                        <a class="text-sm font-medium hover:text-primary transition-colors" href="#">Inicio</a>
                        <a class="text-sm font-medium hover:text-primary transition-colors" href="#">Servicios</a>
                        <a class="text-sm font-medium hover:text-primary transition-colors" href="#">Nosotros</a>
                        <a class="text-sm font-medium hover:text-primary transition-colors" href="#">Contacto</a>
                    </div>
                    <a class="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-bold bg-primary/20 dark:bg-primary/30 hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors"
                        href="inicioSesion.vue">
                        Iniciar Sesión
                    </a>
                </div>
            </div>
        </header>
        <!-- MAIN -->
        <main class="flex-grow flex items-center justify-center w-full min-h-[calc(100vh-5rem)] px-4 sm:px-6 lg:px-8">
            <div
                class="w-full max-w-lg p-10 bg-card-light dark:bg-card-dark rounded-2xl shadow-lg border border-border-light dark:border-border-dark">
                <div class="text-center mb-8">
                    <h2 class="text-4xl font-bold">Bienvenido a Pelucan</h2>
                    <p class="mt-2 text-sm text-subtle-light dark:text-subtle-dark">
                        Inicia sesión para reservar la próxima sesión de mimos de tu mascota.
                    </p>
                </div>
                <!-- FORM -->
                <form @submit.prevent="handleLogin" class="space-y-6">
                    <div>
                        <label class="block text-sm font-medium" for="correo">Correo</label>
                        <input v-model="correo" type="email" id="correo" placeholder="you@example.com"
                            class="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium" for="contrasena">Contraseña</label>
                        <input v-model="contrasena" type="password" id="contrasena" placeholder="••••••••"
                            class="mt-1 w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary" />
                    </div>
                    <div class="flex justify-end text-sm">
                        <a href="#"
                            class="font-medium text-subtle-light dark:text-subtle-dark hover:text-primary dark:hover:text-primary transition-colors">
                            Olvidaste tu contraseña?
                        </a>
                    </div>
                    <button type="submit"
                        class="w-full py-3 bg-primary text-background-dark font-bold rounded-lg hover:bg-primary/90 transition">
                        Iniciar Sesión
                    </button>
                </form>
                <p class="mt-6 text-center text-sm text-subtle-light dark:text-subtle-dark">
                    No tienes una cuenta?
                    <a href="/registro" class="font-medium hover:text-primary dark:hover:text-primary transition-colors">
                        Regístrate
                    </a>
                </p>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const correo = ref('')
const contrasena = ref('')
const router = useRouter()

const handleLogin = async () => {
    try {
        const res = await axios.post('http://localhost:3000/usuarios/login', {
            correo: correo.value,
            contrasena: contrasena.value,
        })
                
        // Guardar el token o ID de usuario si el backend lo envía
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('idUsuario', res.data.usuario.id)
        userStore.setUser(res.data.usuario)
        
        // 🔹 Redirigir a la vista MiCuenta
        router.push('/micuenta')
    } catch (err) {
        alert('Error al iniciar sesión ❌')
        console.error(err)
    }
}
</script>
