<template>
  <div
    class="flex flex-col min-h-screen bg-background-light dark:bg-background-dark font-display text-neutral-800 dark:text-neutral-200">
    <!-- Main -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <div class="max-w-2xl mx-auto bg-white dark:bg-background-dark shadow-lg rounded-xl p-6 md:p-8">
        <h2 class="text-3xl font-bold text-center mb-8">Reservar un turno</h2>

        <!-- FORM -->
        <div class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Servicios -->
            <div>
              <label class="block text-sm font-medium mb-2">Selecciona Servicio</label>
              <select v-model="service" class="form-select w-full h-12 px-4 rounded-lg border border-primary/30">
                <option disabled value="">Elige un servicio</option>
                <option v-for="s in servicios" :key="s.id" :value="s.id">{{ s.nombre }}</option>
              </select>
            </div>

            <!-- Mascotas -->
            <div>
              <label class="block text-sm font-medium mb-2">Selecciona Mascota</label>
              <select v-model="pet" class="form-select w-full h-12 px-4 rounded-lg border border-primary/30">
                <option disabled value="">Elige tu mascota</option>
                <option v-for="m in mascotas" :key="m.id" :value="m.id">{{ m.nombre }}
                </option>
              </select>
            </div>
          </div>

          <!-- Personal -->
          <div>
            <label class="block text-sm font-medium mb-2">Selecciona Peluquero</label>
            <select v-model="groomer" class="form-select w-full h-12 px-4 rounded-lg border border-primary/30">
              <option disabled value="">Elige un peluquero</option>
              <option v-for="p in personal" :key="p.id" :value="p.id">{{ p.nombre }} ({{ p.especialidad }})</option>
            </select>
          </div>

          <!-- Calendario -->
          <div class="pt-4">
            <div class="flex items-center justify-between mb-4">
              <button @click="prevMonth" class="p-2 rounded-full hover:bg-primary/20 transition-colors">
                <span class="material-symbols-outlined">chevron_left</span>
              </button>
              <p class="font-bold text-lg">{{ formattedMonth }}</p>
              <button @click="nextMonth" class="p-2 rounded-full hover:bg-primary/20 transition-colors">
                <span class="material-symbols-outlined">chevron_right</span>
              </button>
            </div>

            <div class="grid grid-cols-7 gap-1 text-center">
              <div v-for="d in daysOfWeek" :key="d" class="font-bold text-sm text-neutral-500">{{ d }}</div>
              <div v-for="n in firstDayOffset" :key="'empty-' + n"></div>
              <button v-for="day in daysInMonth" :key="day" :disabled="isPast(day)" :class="dayClass(day)"
                @click="selectDate(day)">
                {{ day }}
              </button>
            </div>
          </div>


          <!-- Horarios -->
          <div>
            <label for="hora" class="block text-sm font-medium mb-2">Seleccionar horario</label>
            <select id="hora" v-model="time"
              class="form-select w-full h-12 px-4 rounded-lg border border-primary/30 bg-white dark:bg-background-dark">
              <option disabled value="">Selecciona una hora</option>

              <optgroup label="Turno Mañana">
                <option v-for="h in morningTimes" :key="h" :value="h" :disabled="isReserved(h)"
                  :class="{ 'text-gray-400': isReserved(h), 'font-bold': !isReserved(h) }">
                  {{ h }}
                </option>
              </optgroup>

              <optgroup label="Turno Tarde">
                <option v-for="h in afternoonTimes" :key="h" :value="h" :disabled="isReserved(h)"
                  :class="{ 'text-gray-400': isReserved(h), 'font-bold': !isReserved(h) }">
                  {{ h }}
                </option>
              </optgroup>
            </select>
          </div>


          <!-- Resumen -->
          <div class="border-t border-primary/20 pt-6">
            <h3 class="text-lg font-bold mb-4">Resumen de la Cita</h3>
            <div class="space-y-3 text-sm">
              <div class="flex justify-between"><span>Servicio:</span><span>{{ servicioNombre }}</span></div>
              <div class="flex justify-between"><span>Mascota:</span><span>{{ mascotaNombre }}</span></div>
              <div class="flex justify-between"><span>Peluquero:</span><span>{{ peluqueroNombre }}</span></div>
              <div class="flex justify-between"><span>Fecha:</span><span>{{ summaryDate }}</span></div>
              <div class="flex justify-between"><span>Hora:</span><span>{{ time || '-' }}</span></div>
            </div>
          </div>

          <!-- Confirm -->
          <button @click="confirmAppointment" :disabled="!canConfirm"
            class="w-full h-12 rounded-lg bg-primary text-black font-bold hover:opacity-90 disabled:opacity-50">
            Confirmar Cita
          </button>
        </div>
      </div>
    </main>

    <!-- Modal -->
    <div v-if="showModal" class="modal show">
      <div
        class="modal-content bg-white dark:bg-background-dark max-w-md w-full mx-4 rounded-xl p-6 shadow-xl text-center">
        <span class="material-symbols-outlined text-primary text-4xl">check_circle</span>
        <h3 class="text-2xl font-bold mt-4 mb-2">¡Cita Confirmada!</h3>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6">{{ modalMessage }}</p>
        <button @click="closeModal" class="w-full h-12 rounded-lg bg-primary text-black font-bold hover:opacity-90">
          Hecho
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

const service = ref('')
const pet = ref('')
const groomer = ref('')
const selectedDate = ref(null)
const time = ref('')
const showModal = ref(false)
const modalMessage = ref('')

// Datos dinámicos
const servicios = ref([])
const mascotas = ref([])
const personal = ref([])
const turnos = ref([]) // TODOS los turnos del backend
const userStore = useUserStore()

// Computed para mostrar nombres
const servicioNombre = computed(() => {
  const s = servicios.value.find(x => x.id === service.value)
  return s ? s.nombre : '-'
})
const mascotaNombre = computed(() => {
  const m = mascotas.value.find(x => x.id === pet.value)
  return m ? m.nombre : '-'
})
const peluqueroNombre = computed(() => {
  const p = personal.value.find(x => x.id === groomer.value)
  return p ? `${p.nombre} (${p.especialidad})` : '-'
})

// Traer datos al montar
onMounted(async () => {
  if (!userStore.user || !userStore.user.id) {
    console.error("Usuario no logueado")
    return
  }

  const userId = userStore.user.id
  try {
    const [resServicios, resMascotas, resPersonal, resTurnos] = await Promise.all([
      axios.get('http://localhost:3000/servicios'),
      axios.get(`http://localhost:3000/mascotas/usuario/${userId}`),
      axios.get('http://localhost:3000/personal'),
      axios.get('http://localhost:3000/turnos'),
    ])
    servicios.value = resServicios.data
    mascotas.value = resMascotas.data
    personal.value = resPersonal.data
    turnos.value = resTurnos.data
  } catch (error) {
    console.error('Error cargando datos:', error)
  }
})

// Calendario
const viewDate = ref(new Date())
const daysOfWeek = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
const firstDayOffset = computed(() => new Date(viewDate.value.getFullYear(), viewDate.value.getMonth(), 1).getDay())
const daysInMonth = computed(() => new Date(viewDate.value.getFullYear(), viewDate.value.getMonth() + 1, 0).getDate())
const formattedMonth = computed(() => viewDate.value.toLocaleString(undefined, { month: 'long', year: 'numeric' }))
const summaryDate = computed(() => selectedDate.value ? selectedDate.value.toLocaleDateString() : '-')
const canConfirm = computed(() => service.value && pet.value && groomer.value && selectedDate.value && time.value)

function selectDate(day) {
  selectedDate.value = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth(), day)
}

// Horarios definidos
const morningTimes = ['08:00', '09:00', '10:00', '11:00', '12:00']
const afternoonTimes = ['17:00', '18:00', '19:00', '20:00']

// 🔹 Verificar si un horario está reservado para el día seleccionado
function isReserved(hora) {
  if (!selectedDate.value) return false
  const fechaISO = selectedDate.value.toISOString().split('T')[0]
  return turnos.value.some(t => t.fecha === fechaISO && t.hora === hora)
}

// Funciones de calendario
function prevMonth() {
  viewDate.value.setMonth(viewDate.value.getMonth() - 1)
  viewDate.value = new Date(viewDate.value)
}
function nextMonth() {
  viewDate.value.setMonth(viewDate.value.getMonth() + 1)
  viewDate.value = new Date(viewDate.value)
}
function isPast(day) {
  const date = new Date(viewDate.value.getFullYear(), viewDate.value.getMonth(), day)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}
function dayClass(day) {
  const base = 'h-10 w-10 flex items-center justify-center rounded-full transition-colors'
  if (isPast(day)) return `${base} text-neutral-400 cursor-not-allowed`
  if (selectedDate.value && selectedDate.value.getDate() === day && selectedDate.value.getMonth() === viewDate.value.getMonth()) {
    return `${base} bg-primary text-black font-bold`
  }
  return `${base} hover:bg-primary/20`
}

// Confirmar cita
async function confirmAppointment() {
  if (!selectedDate.value) {
    alert("Seleccioná una fecha primero")
    return
  }

  try {
    const fechaISO = selectedDate.value.toISOString().split('T')[0]

    const nuevaReserva = {
      servicio_id: service.value,
      mascota_id: pet.value,
      peluquero_id: groomer.value,
      fecha: fechaISO,
      hora: time.value,
      usuario_id: userStore.user.id,
      estado: 'Pendiente' // ✅ estado por defecto
    }

    await axios.post('http://localhost:3000/turnos', nuevaReserva)

    // Modal
    modalMessage.value = `Tu cita de ${servicioNombre.value} para ${mascotaNombre.value} con ${peluqueroNombre.value} fue confirmada el ${fechaISO} a las ${time.value}.`
    showModal.value = true

    // Refrescar turnos para que los horarios ocupados se actualicen
    const resTurnos = await axios.get('http://localhost:3000/turnos')
    turnos.value = resTurnos.data

  } catch (error) {
    console.error('Error al confirmar cita:', error.response?.data || error)
    alert('No se pudo confirmar la cita. Revisá los datos ingresados.')
  }
}

function closeModal() {
  showModal.value = false
  service.value = pet.value = groomer.value = time.value = ''
  selectedDate.value = null
}
</script>


<style scoped>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
}

.modal-content {
  animation: modalSlideIn 0.3s ease-out;
}

@keyframes modalSlideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
