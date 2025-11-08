<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
    <div class="layout-container flex h-full grow flex-col">
      <!-- 🔹 Header -->
      <header class="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 px-4 sm:px-10 py-3">
        <div class="flex items-center gap-4 text-heading-light dark:text-heading-dark">
          <div class="size-6 text-primary">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path clip-rule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z" fill="currentColor" fill-rule="evenodd" />
            </svg>
          </div>
          <h2 class="text-xl font-bold leading-tight tracking-[-0.015em]">Pelucan</h2>
        </div>

        <!-- 🔹 Menú Desktop -->
        <nav class="hidden md:flex flex-1 justify-end gap-8">
          <div class="flex items-center gap-9">
            <RouterLink to="/" class="text-text-light dark:text-text-dark hover:text-primary text-sm font-medium leading-normal">Inicio</RouterLink>
            <RouterLink to="/nosotros" class="text-text-light dark:text-text-dark hover:text-primary text-sm font-medium leading-normal">Nosotros</RouterLink>
            <RouterLink to="/servicios" class="text-primary text-sm font-bold leading-normal">Servicios</RouterLink>
            <RouterLink to="/reservar" class="text-text-light dark:text-text-dark hover:text-primary text-sm font-medium leading-normal">Reservar</RouterLink>
          </div>
          <button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-secondary text-white text-sm font-bold leading-normal hover:bg-secondary/90 transition-colors">
            <span>Mi Cuenta</span>
          </button>
        </nav>

        <!-- 🔹 Menú Mobile -->
        <button class="md:hidden p-2 rounded-md text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </header>

      <!-- 🔹 Contenido principal -->
      <main class="flex-grow">
        <!-- Hero -->
        <div class="mt-5">
          <div class="bg-cover bg-center flex flex-col justify-end overflow-hidden bg-white rounded-xl min-h-[320px] md:min-h-80"
            style="background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuCjCRW-aQcTZ5LCQ0Kpg187fae23iJ72jemkY-qa_58oJ1PSgxHZTxiMokHS2PbonFNhlOW8X1UviDH12sGbfmGSBof2lzCX5T4q2JKHEBedVkGNXT2cqV55D5v2MCtJ9iUoxjaDBM_3p0YUbcvNWX3Ai9JNAuOUjRfEcxPpqZ22izLZ1SX1hoJzAr_bAAkMdvZmyZqsLOO-WjIoa5AvxXYuY_rt6vYs-gtGhrcV6cKquLHS32dnBkOdL1wAXOhhvQpqJtF_zREcLEt');">
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
            <p class="text-text-light dark:text-text-dark text-base max-w-2xl">
              Descubre todo lo que podemos hacer por tu mascota. En Pelucan, nos dedicamos a ofrecer servicios de la más alta calidad.
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
            <button class="mt-2 flex w-full cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-colors">
              Ver más
            </button>
          </div>
        </div>

        <!-- CTA -->
        <div class="bg-white dark:bg-background-dark rounded-xl p-8 my-10 text-center">
          <h2 class="text-heading-light dark:text-heading-dark text-2xl md:text-3xl font-black">¿Listo para mimar a tu mascota?</h2>
          <p class="text-text-light dark:text-text-dark text-base mt-3 mb-6 max-w-xl mx-auto">
            Tu compañero peludo merece lo mejor. Dale el cuidado que se merece con nuestros servicios profesionales.
          </p>
          <RouterLink
            to="/reservar"
            class="inline-block rounded-xl h-12 px-6 bg-secondary text-white font-bold hover:bg-secondary/90 transform hover:scale-105 transition">
            ¡Reserva tu cita ahora!
          </RouterLink>
        </div>
      </main>

      <!-- 🔹 Footer -->
      <footer class="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 pb-4 px-4 text-center">
        <p class="text-heading-light dark:text-heading-dark font-bold text-lg">Pelucan</p>
        <p class="text-text-light dark:text-text-dark text-sm">El mejor cuidado para tu mejor amigo.</p>
        <p class="mt-6 text-sm text-text-light dark:text-text-dark">© 2024 Pelucan. Todos los derechos reservados.</p>
      </footer>
    </div>
  </div>
</template>

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
