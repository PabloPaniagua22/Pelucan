<template>
  <div class="flex min-h-screen">
    <!-- 🔹 Sidebar -->
    <aside class="w-64 bg-background-light dark:bg-background-dark p-6 flex flex-col justify-between">
      <div>
        <!-- 🔸 Usuario -->
        <div class="flex items-center gap-3 mb-8">
          <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12"
            :style="`background-image: url('${usuario.imagen || defaultAvatar}')`"></div>
          <h1 class="text-background-dark dark:text-background-light text-lg font-bold">
            {{ usuario.nombre }}
          </h1>
        </div>

        <!-- 🔸 Navegación -->
        <nav class="flex flex-col gap-2">

          <!-- Panel de control -->
          <RouterLink to="/micuenta"
            class="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/20 text-background-dark font-bold">
            <span class="material-symbols-outlined">home</span>
            <span>Panel de control</span>
          </RouterLink>
          <!-- Reservar turno (ruta hija de /micuenta) -->
          <RouterLink to="/reservar"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined">history</span>
            <span>Reservar Turno</span>
          </RouterLink>
          <!-- Próximas citas (si ya tenés la ruta /citas definida) -->
          <RouterLink to="/#"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined">event</span>
            <span>Próximas citas</span>
          </RouterLink>
          <!-- Mis Mascotas -->
          <RouterLink to="/mascotas"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined">pets</span>
            <span>Mis Mascotas</span>
          </RouterLink>
          <button @click="logout"
            class="mt-6 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
            <span class="material-symbols-outlined">logout</span>
            <span>Cerrar sesión</span>
          </button>
        </nav>
    </div>
      <RouterLink to="/" class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-primary/10 transition-colors">
        <span>Volver a inicio</span>
      </RouterLink>
  </aside>

    <!-- 🔹 Contenido principal -->
    <main class="flex-1 p-8 bg-background-light dark:bg-background-dark/50">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl font-bold mb-8 text-background-dark dark:text-white">
          Panel de control
        </h1>

        <!-- 🔸 Próximas citas -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold mb-6">Próximas citas</h2>

          <div v-if="citas.length === 0" class="text-center">
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              No hay citas próximas
            </p>
            <RouterLink to="/reservar"
              class="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition">
              Reservar una cita
            </RouterLink>
          </div>

          <ul v-else class="space-y-4">
            <li v-for="(cita, index) in citas" :key="index" class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p><strong>Fecha:</strong> {{ formatearFecha(cita.fecha) }}</p>
              <p><strong>Hora:</strong> {{ cita.hora }}</p>
              <p><strong>Servicio:</strong> {{ cita.servicio?.nombre || 'No disponible' }}</p>
            </li>
          </ul>
        </section>

        <!-- 🔸 Historial -->
        <section class="mb-12">
          <h2 class="text-2xl font-bold mb-6">Historial de servicios</h2>

          <div v-if="historial.length === 0" class="text-center">
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              No hay historial disponible.
            </p>
          </div>

          <ul v-else class="space-y-4">
            <li v-for="(item, index) in historial" :key="index" class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p><strong>Fecha:</strong> {{ formatearFecha(item.fecha) }}</p>
              <p><strong>Servicio:</strong> {{ item.servicio?.nombre || 'No disponible' }}</p>
              <p><strong>Estado:</strong> {{ item.estado }}</p>
            </li>
          </ul>
        </section>

        <!-- 🔸 Mis Mascotas (botón directo) -->
        <section>
          <h2 class="text-2xl font-bold mb-6">Mis Mascotas</h2>
          <div v-if="mascotas.length === 0" class="text-center mb-4">
            <p class="text-gray-600 dark:text-gray-300">No tenés mascotas registradas.</p>
          </div>
          <ul v-else class="space-y-4 mb-4">
            <li v-for="m in mascotas" :key="m.id" class="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
              <p><strong>Nombre:</strong> {{ m.nombre }}</p>
              <p><strong>Raza:</strong> {{ m.raza }}</p>
              <p><strong>Edad:</strong> {{ m.edad }}</p>
            </li>
          </ul>
          <RouterLink to="/mascotas" class="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition">
            Administrar Mascotas
          </RouterLink>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MiCuenta",
  data() {
    return {
      usuario: {},
      mascotas: [],
      citas: [],
      historial: [],
      defaultAvatar: "https://cdn-icons-png.flaticon.com/512/847/847969.png",
    };
  },
  methods: {
    formatearFecha(fechaISO) {
      const fecha = new Date(fechaISO);
      return fecha.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    async obtenerDatos() {
      try {
        const token = localStorage.getItem("token");
        const idUsuario = localStorage.getItem("idUsuario");

        if (!token || !idUsuario) {
          this.$router.push("/login");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const [userRes, citasRes, histRes, mascotasRes] = await Promise.all([
          axios.get(`http://localhost:3000/usuarios/${idUsuario}`, { headers }),
          axios.get(`http://localhost:3000/turnos/usuario/${idUsuario}`, { headers }),
          axios.get(`http://localhost:3000/turnos/historial/${idUsuario}`, { headers }),
          axios.get(`http://localhost:3000/mascotas/usuario/${idUsuario}`, { headers })
        ]);

        this.usuario = userRes.data;
        this.citas = citasRes.data;
        this.historial = histRes.data;
        this.mascotas = mascotasRes.data;
      } catch (error) {
        console.error("Error cargando datos:", error);
        this.$router.push("/login");
      }
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("idUsuario");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.obtenerDatos();
  },
};
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 100, "GRAD" 0, "opsz" 24;
}
</style>
