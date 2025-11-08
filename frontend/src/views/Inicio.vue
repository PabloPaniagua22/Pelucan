<template>
  <div
    class="min-h-screen font-display bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark flex flex-col">

    <!-- HEADER -->
    <header class="sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          <div class="flex items-center gap-2">
            <svg class="h-8 w-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            <h2 class="text-2xl font-bold text-stone-900 dark:text-white">Pelucan</h2>
          </div>

          <nav class="hidden md:flex items-center gap-8">
            <RouterLink to="/" class="text-sm font-medium hover:text-primary transition-colors">Inicio</RouterLink>
            <RouterLink to="/servicios" class="text-sm font-medium hover:text-primary transition-colors">Servicios</RouterLink>
            <RouterLink to="/nosotros" class="text-sm font-medium hover:text-primary transition-colors">Nosotros</RouterLink>
            <RouterLink to="/contacto" class="text-sm font-medium hover:text-primary transition-colors">Contacto</RouterLink>
          </nav>

          <div class="flex items-center gap-4">
            <RouterLink
              to="/reservar"
              class="bg-primary text-black font-bold text-sm px-6 py-2.5 rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background-light dark:focus:ring-offset-background-dark">
              Reservar Turno
            </RouterLink>
            <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5chTuiW6o0O0XeikTsxV4U2E29Asj1M5MCbDgUwonCneiXiALEPzdul9WAHjJuDwIZbpMs9UKpHZlR3gSCIxeSAUicWrA38-SunycYHyMYhxUSfPQsMVkFwS9vbo_z-MLdz4_1UkDDyPCLgv1hlRnUnEBSIDOKEYyiWhXW88y-KNIfvQSJbDR-aXFhz4nVJfu6n0wlawte6eLecJD1r-tat5OhW00yGklhghUNk0rnuBnO3z1NEVQdJ10V8nMyIqIqGisx29TO0qI");'>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-grow">
      <!-- HERO -->
      <section class="relative">
        <div class="absolute inset-0 bg-black/50 z-0"></div>
        <div class="min-h-[60vh] md:min-h-[75vh] bg-cover bg-center bg-no-repeat flex items-center justify-center"
          style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCCItJSuPQ7gp4bhf9pf0AyubBTJAsThtbJZ08Bvuz4DeI1zapDsYrFlJ9w4IB379Bzb7kaFgDgIPYDRhkU1vaOwm8TEFPkT8WMTX0jjdmkzo59wCj-T2edI6zHylQ0H5UFmXTkX-OxC1EXMD-RuorP4B9_oazIi5eIPQ9TCoAvRpAXlljHBCa2ESrTl74Y-i5oE51itGqUrMLEFTqisLCmDfsSU4yA-rXedYGLhp77o4vQUPVwgjtmI044aUoTdbRrbLKCFyBZRys6");'>
          <div class="relative z-10 text-center text-white px-4">
            <h1 class="text-4xl md:text-6xl font-black leading-tight tracking-tight">
              Mimos y estilo para tu mejor amigo
            </h1>
            <p class="mt-4 max-w-2xl mx-auto text-base md:text-lg font-light">
              En Pelucan, consentimos a tu mascota con servicios de peluquería canina de primera calidad.
              ¡Reserva ahora y dale a tu perro el cuidado que se merece!
            </p>
            <RouterLink
              to="/reservar"
              class="mt-8 inline-block bg-primary text-black font-bold text-base px-8 py-3 rounded-full hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black/50">
              Reservar Turno
            </RouterLink>
          </div>
        </div>
      </section>

      <!-- SERVICIOS -->
      <section class="py-16 sm:py-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">Nuestros Servicios</h2>
            <p class="mt-3 max-w-2xl mx-auto text-base text-stone-600 dark:text-stone-400">
              Todo lo que tu mascota necesita para lucir y sentirse genial.
            </p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="(servicio, index) in servicios" :key="index"
              class="flex flex-col bg-white/5 dark:bg-black/10 p-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div class="w-full aspect-square bg-cover bg-center rounded-lg mb-4"
                :style="`background-image: url('${servicio.img}')`"></div>
              <h3 class="text-lg font-bold text-stone-900 dark:text-white">{{ servicio.titulo }}</h3>
              <p class="text-sm text-stone-600 dark:text-stone-400 mt-2 flex-grow">{{ servicio.descripcion }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="bg-background-light dark:bg-background-dark border-t border-stone-200 dark:border-stone-800">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-2">
            <svg class="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
            </svg>
            <h2 class="text-lg font-bold text-stone-900 dark:text-white">Pelucan</h2>
          </div>
          <p class="text-sm text-stone-500 dark:text-stone-500">
            © 2024 Pelucan. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
const servicios = [
  {
    titulo: "Baño y cepillado",
    descripcion: "Un baño relajante con productos de alta calidad, seguido de un cepillado profesional.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAEf6IK0E84Pbj7uMzZzxkpDouEsB5Mkh8nROjCOeU3Wt9HRtrAi1ob-WeHJxNqH4Y9GB0Tb6KXn5ZZhjQKu_w6RUgfCMCb3B74QYyZeVL58zs6Hvz9DeVNhR3yZXMI-fGgzMTklChU473hoFjuzKRUULOE1IxTNZHy0RubJvUcu0-uPEAZMBGLQwBSKbEq7cKw8d0BdZHj94jqAQUk5_qys12HF0aP415WsS5yqM8egvileeP5PZqDAfmesVT0IuXbHKe9mFfd-8ik"
  },
  {
    titulo: "Corte de pelo",
    descripcion: "Cortes personalizados por estilistas caninos expertos.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsw6poHZ3aVdhXsOCDU9T_DNB5Af2waTbhyOtGDOmWrwZprnIiDu-eEu_e6bMi0IH3nK_8NxsN2LmKXcNxDyRsz0bqiJlCOFyu7pozsroSe6ey44IJLXzQ-zi4_4UC4jPFIx45_RkUnDvCgF1WOstY75Sk8EqAywZHR74bgFonoifAZ0JPC5J-8cMFNdN4eQKtrGcOQp8QH2L_yAe0smSUqd99hVYr-9sN5RMCaxUO0tTymFZ1mg3obJ8J8i9H3VJsCwCVqyIs9lju"
  },
  {
    titulo: "Tratamientos especiales",
    descripcion: "Cuidados para la piel, control de pulgas y más.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYVcLwY8t-_8vkVD452dwI4CGXNul1fczfxWunw6DLzpL6CJjLtutBx1SGe_zyu7qqDJp51egcuK2czvt7ngEUjNje2dyP00Au6GLcOB8E96pyuhvcT-qpev6gOOKT1BwFsJTeJUy5zLdkrmqWyCW7jqArZfrZbWvkDqAvYL0WwtpKtHC94jrhUHGhEhb1LjEV-fPdynR_AN8-t_lS0WjNiFPgvmk0DlHJjX4YBif0HMLK0EgQnfU9Y7LUS2RqWUSBm4Lvr6bbQFyC"
  },
  {
    titulo: "Spa para mascotas",
    descripcion: "Un día de spa completo con masajes y aromaterapia.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZULJFV-6YMZrNue_bd9yYdgc0Fk46eqCQgmHDkBTFGnVabgqf6uoLHo3pZ25qW7pn4Xr7O9ambzhtAfhFBxPs_AlhiLJdNO5imJbiGedOryvHdbA6Dje3zrYIaUPV-2MBZg6d1jPpn4AC4qvxpAII8BqzmXqeiAmhXLCl7D3gAb5yBcbyzdOXy1ZynfUR3TPX1eJo3IjK0cNL7dj6Vemsr8yzeQPbVUKQbfsUP8dKRrXC94Qo_ckuw0q-RRb4xJT-YjaG2wbdx-pP"
  }
];
</script>
