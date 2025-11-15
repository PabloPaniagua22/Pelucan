<template>
    <div class="min-h-screen flex flex-col bg-background-light dark:bg-background-dark">
        <!-- MAIN -->
        <main class="flex items-center justify-center px-4 sm:px-6 lg:px-8">
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
