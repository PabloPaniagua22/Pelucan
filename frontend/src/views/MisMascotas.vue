<template>
  <div class="container mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6 text-center">Mis Mascotas</h1>

    <!-- Botón agregar mascota -->
    <div class="flex justify-end mb-4">
      <button @click="openForm()"
              class="bg-primary text-black font-bold px-4 py-2 rounded-lg hover:opacity-90">
        Agregar Mascota
      </button>
    </div>

    <!-- Tabla de mascotas -->
    <table class="w-full table-auto border border-primary/30 rounded-lg overflow-hidden">
      <thead class="bg-primary/20 text-left">
        <tr>
          <th class="px-4 py-2">Nombre</th>
          <th class="px-4 py-2">Especie</th>
          <th class="px-4 py-2">Raza</th>
          <th class="px-4 py-2">Edad</th>
          <th class="px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="m in mascotas" :key="m.id" class="border-t border-primary/20">
          <td class="px-4 py-2">{{ m.nombre }}</td>
          <td class="px-4 py-2">{{ m.especie }}</td>
          <td class="px-4 py-2">{{ m.raza }}</td>
          <td class="px-4 py-2">{{ m.edad }}</td>
          <td class="px-4 py-2 space-x-2">
            <button @click="openForm(m)"
                    class="text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600">
              Editar
            </button>
            <button @click="deleteMascota(m.id)"
                    class="text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Form Mascota -->
    <div v-if="showForm" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-background-light dark:bg-background-dark p-6 rounded-xl w-full max-w-md shadow-lg">
        <h2 class="text-xl font-bold mb-4">{{ editingMascota ? 'Editar Mascota' : 'Agregar Mascota' }}</h2>

        <form @submit.prevent="saveMascota" class="space-y-4">
          <div>
            <label class="block mb-1 font-medium">Nombre</label>
            <input type="text" v-model="form.nombre" class="w-full border border-primary/30 rounded-lg px-3 py-2" required>
          </div>
        <div>
        <label class="block mb-1 font-medium">Especie</label>
        <select v-model="form.especie" class="w-full border border-primary/30 rounded-lg px-3 py-2" required>
            <option disabled value="">Seleccioná una especie</option>
            <option value="Perro">Perro</option>
            <option value="Gato">Gato</option>
            <option value="Loro">Loro</option>
            <option value="Conejo">Conejo</option>
            <option value="Otro">Otro</option>
        </select>
        </div>
          <div>
            <label class="block mb-1 font-medium">Raza</label>
            <input type="text" v-model="form.raza" class="w-full border border-primary/30 rounded-lg px-3 py-2" required>
          </div>
          <div>
            <label class="block mb-1 font-medium">Edad</label>
            <input type="number" v-model="form.edad" min="0" class="w-full border border-primary/30 rounded-lg px-3 py-2" required>
          </div>

          <div class="flex justify-end space-x-2 mt-4">
            <button type="button" @click="closeForm" class="px-4 py-2 rounded-lg border border-primary/30 hover:bg-primary/10">
              Cancelar
            </button>
            <button type="submit" class="px-4 py-2 rounded-lg bg-primary text-black font-bold hover:opacity-90">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const mascotas = ref([])
const showForm = ref(false)
const editingMascota = ref(null)

const form = ref({
  nombre: '',
  especie: '',
  raza: '',
  edad: null
})

// Abrir formulario para nueva mascota o editar existente
function openForm(m = null) {
  if (m) {
    editingMascota.value = m
    form.value = { nombre: m.nombre, especie: m.especie, raza: m.raza, edad: m.edad }
  } else {
    editingMascota.value = null
    form.value = { nombre: '', especie: '', raza: '', edad: null }
  }
  showForm.value = true
}

// Cerrar formulario
function closeForm() {
  showForm.value = false
  editingMascota.value = null
  form.value = { nombre: '', raza: '', edad: null }
}

// Traer mascotas del usuario
async function loadMascotas() {
  if (!userStore.user?.id) return
  try {
    const res = await axios.get(`http://localhost:3000/mascotas/usuario/${userStore.user.id}`)
    mascotas.value = res.data
  } catch (error) {
    console.error('Error cargando mascotas:', error)
  }
}

// Guardar o actualizar mascota
async function saveMascota() {
  if (!userStore.user?.id) return alert('Usuario no logueado')

  if (!form.value.nombre || !form.value.raza || form.value.edad === null) {
    return alert('Completá todos los campos')
  }

const payload = {
  nombre: form.value.nombre.trim(),
  especie: form.value.especie.trim(), // <--- agregá esto
  raza: form.value.raza.trim() || null,
  edad: form.value.edad ? Number(form.value.edad) : null,
  dueno_id: userStore.user.id // <--- el nombre correcto según el DTO
}

  console.log('Payload a enviar:', payload)

  try {
    if (editingMascota.value) {
      await axios.put(`http://localhost:3000/mascotas/${editingMascota.value.id}`, payload)
    } else {
      await axios.post('http://localhost:3000/mascotas', payload)
    }

    closeForm()
    await loadMascotas()
  } catch (error) {
    console.error('Error guardando mascota:', error.response?.data || error)
    alert('No se pudo guardar la mascota.')
  }
}


// Eliminar mascota
async function deleteMascota(id) {
  if (!confirm('¿Querés eliminar esta mascota?')) return
  try {
    await axios.delete(`http://localhost:3000/mascotas/${id}`)
    await loadMascotas()
  } catch (error) {
    console.error('Error eliminando mascota:', error.response?.data || error)
    alert('No se pudo eliminar la mascota.')
  }
}

onMounted(loadMascotas)
</script>
