<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
      <!-- 🔹 Contenido principal -->
      <main class="flex-grow">
        <!-- Hero -->
        <div class="mt-5">
          <div class="bg-cover bg-center bg-no-repeat flex flex-col justify-end
            overflow-hidden bg-white rounded-xl min-h-[320px] md:min-h-80" style="
        background-size: 100%;
        background-position: right 10% bottom 53%;
        background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%),
        url('https://www.shutterstock.com/image-vector/cute-dog-sleeping-lying-on-260nw-2350725375.jpg');">

            <div class="flex p-6 md:p-8">
              <h1 class="text-white tracking-tight text-3xl md:text-4xl font-black leading-tight">
                Los mejores cuidados para tu mejor amigo
              </h1>
            </div>
          </div>
        </div>

        <!-- Sección Servicios -->
        <section class="flex flex-wrap justify-between gap-4 p-4 mt-8">
          <div class="flex min-w-72 flex-col gap-3">
            <p class="text-heading-light dark:text-heading-dark text-4xl font-black">Nuestros Servicios</p>
            <p class="text-text-light dark:text-text-dark">
              Descubre todo lo que podemos hacer por tu mascota. En Pelucan, nos dedicamos a ofrecer servicios de la más
              alta calidad, asegurando el bienestar y la felicidad de tu fiel compañero. Nuestra filosofía se basa en el
              amor y el respeto por los animales, utilizando productos de primera y técnicas adaptadas a cada necesidad.
            </p>
          </div>
        </section>

        <!-- Cards -->
        <div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-4">
          <div v-for="servicio in servicios" :key="servicio.id"
            class="flex flex-col gap-4 p-6 bg-white dark:bg-background-dark rounded-xl shadow-sm hover:shadow-lg transition-shadow">
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-primary text-4xl">{{ servicio.icono }}</span>
              <p class="text-heading-light dark:text-heading-dark text-xl font-bold">{{ servicio.nombre }}</p>
            </div>
            <p class="text-text-light dark:text-text-dark text-sm">{{ servicio.descripcion }}</p>
            <p class="text-primary text-lg font-bold">Desde {{ servicio.precio }}</p>
            <button
              class="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-colors">
              Ver más
            </button>
          </div>
        </div>

        <!-- CTA -->
        <div class="bg-white dark:bg-background-dark rounded-xl p-8 my-10 text-center">
          <h2
            class="text-heading-light dark:text-heading-dark text-2xl md:text-3xl font-black leading-tight tracking-[-0.033em]">
            ¿Listo para mimar a tu mascota?</h2>
          <p
            class="text-text-light dark:text-text-dark text-base font-normal leading-normal mt-3 mb-6 max-w-xl mx-auto">
            Tu compañero peludo merece lo mejor. Dale el cuidado que se merece con nuestros servicios profesionales.
          </p>
          <div class="flex px-4 py-3 justify-center">
            <BotonReservar />
          </div>
        </div>
        <!-- Ante Footer-->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 text-center my-10">
          <div class="flex flex-col items-center gap-2">
            <div class="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mb-2">
              <span class="material-symbols-outlined">health_and_safety</span>
            </div>
            <h3 class="text-heading-light dark:text-heading-dark text-lg font-bold">Productos de Alta Calidad</h3>
            <p class="text-text-light dark:text-text-dark text-sm">Solo usamos productos premium que son seguros y
              efectivos.</p>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mb-2">
              <span class="material-symbols-outlined">groups</span>
            </div>
            <h3 class="text-heading-light dark:text-heading-dark text-lg font-bold">Personal Experto</h3>
            <p class="text-text-light dark:text-text-dark text-sm">Nuestro equipo ama a los animales y está altamente
              capacitado.</p>
          </div>
          <div class="flex flex-col items-center gap-2">
            <div class="flex items-center justify-center size-12 rounded-full bg-primary/10 text-primary mb-2">
              <span class="material-symbols-outlined">sentiment_very_satisfied</span>
            </div>
            <h3 class="text-heading-light dark:text-heading-dark text-lg font-bold">Ambiente Relajado</h3>
            <p class="text-text-light dark:text-text-dark text-sm">Un espacio seguro y tranquilo para que tu mascota se
              sienta a gusto.</p>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import BotonReservar from '../components/BotonReservar.vue'
</script>

<script>
export default {
  name: 'Servicios',
  data() {
    return {
      servicios: [
        {
          id: 1,
          icono: 'content_cut',
          nombre: 'Corte y Estilo',
          descripcion: 'Desde cortes de raza hasta estilos personalizados, dejamos a tu perro luciendo increíble y cómodo.',
          precio: '$25',
        },
        {
          id: 2,
          icono: 'shower',
          nombre: 'Baño y Secado',
          descripcion: 'Utilizamos shampoos y acondicionadores de alta calidad, adecuados para cada tipo de piel y pelaje.',
          precio: '$15',
        },
        {
          id: 3,
          icono: 'spa',
          nombre: 'Tratamientos de Pelaje',
          descripcion: 'Hidratación, nutrición y brillo para un pelaje sano y radiante.',
          precio: '$30',
        },
        {
          id: 4,
          icono: 'pest_control',
          nombre: 'Control de Parásitos',
          descripcion: 'Protegemos a tu mascota de pulgas, garrapatas y otros parásitos con productos seguros y efectivos.',
          precio: '$20',
        },
      ],
    };
  },
};
</script>
