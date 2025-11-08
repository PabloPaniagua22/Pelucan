<template>
  <div class="container mx-auto p-6 max-w-md">
    <h1 class="text-3xl font-bold mb-6 text-center">Registro de Cliente</h1>

    <form @submit.prevent="registrarCliente" class="space-y-4">
      <div>
        <label class="block mb-1 font-medium">Nombre</label>
        <input type="text" v-model="form.nombre" class="w-full border rounded-lg px-3 py-2" required>
      </div>

      <div>
        <label class="block mb-1 font-medium">Apellido</label>
        <input type="text" v-model="form.apellido" class="w-full border rounded-lg px-3 py-2" required>
      </div>

      <div>
        <label class="block mb-1 font-medium">Correo</label>
        <input type="email" v-model="form.correo" class="w-full border rounded-lg px-3 py-2" required>
      </div>

      <div>
        <label class="block mb-1 font-medium">Contraseña</label>
        <input type="password" v-model="form.contrasena" class="w-full border rounded-lg px-3 py-2" required minlength="8">
      </div>

      <div>
        <label class="block mb-1 font-medium">Teléfono</label>
        <input type="text" v-model="form.telefono" class="w-full border rounded-lg px-3 py-2" placeholder="+549123456789">
      </div>

      <button type="submit" class="w-full bg-primary text-black font-bold py-2 px-4 rounded-lg hover:opacity-90">
        Registrarse
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = ref({
  nombre: '',
  apellido: '',
  correo: '',
  contrasena: '',
  telefono: ''
})

async function registrarCliente() {
  try {
    const payload = { ...form.value }

    const response = await axios.post('http://localhost:3000/usuarios', payload)
    alert('Cliente registrado con éxito')

    // Limpiar formulario
    form.value = { nombre: '', apellido: '', correo: '', contrasena: '', telefono: '' }

    // Opcional: redirigir a login
    router.push('/login')
  } catch (error) {
    console.error('Error registrando cliente:', error.response?.data || error)
    alert(error.response?.data?.message || 'No se pudo registrar el cliente')
  }
}
</script>
