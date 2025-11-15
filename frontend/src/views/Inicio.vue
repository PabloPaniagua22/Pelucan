<template>
  <div
    class="min-h-screen font-display bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark flex flex-col">

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
            <BotonReservar />
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

      <!-- TESTIMONIOS-->
      <section class="py-16 sm:py-24 bg-primary/10 dark:bg-primary/5">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">Testimonios</h2>
            <p class="mt-3 max-w-2xl mx-auto text-base text-stone-600 dark:text-stone-400">Nuestros clientes nos aman. Y
              sus mascotas también.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-sm">
              <div class="flex items-start gap-4">
                <div class="w-24 h-24 bg-cover bg-center rounded-full flex-shrink-0"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCUgXztUk0AjhvNeRaT2eGo9pTPhDGrWS3s7RIydnXGElPIqN3kQTxbidWfP0khm1xgRuJ1fQJ_3Ne4exxVSrIIs8C2FryuZ_px41hAW7RbCULNn_53aO7FxUSp0xjWEPQzEmbCc2mqXz4tWJmVilYaQ9mAZDFzdd-YueRgNtR7TJBj_QGGYKZc-Famdea7h4_FxoSp3nFCX2ulkm_aUwxBd8-AglfpVjCEFXzV0jBNEI2iHATNyo19PPhNICI_POkSTn-2ABDwkZ0I");'>
                </div>
                <div>
                  <p class="text-stone-700 dark:text-stone-300">"Max siempre sale contento y con un aspecto increíble.
                    ¡Los recomiendo totalmente!"</p>
                  <p class="mt-4 font-bold text-stone-900 dark:text-white">- Sofia Ramirez</p>
                </div>
              </div>
            </div>
            <div class="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-sm">
              <div class="flex items-start gap-4">
                <div class="w-24 h-24 bg-cover bg-center rounded-full flex-shrink-0"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCOzek1ZktwQyrQ32RRA1hCnRDM59E4jpzoODvqqm1ZH5nwRh6m6lrJxFxO1R5MMu3gJPhNbhXAZCi300gq_fANN7EUX6K-21rfw7Ci4WURVgRXuos_j05o64iKDD8Jo1JyQkypRB1-L6fQZtE1eIuG4MYeaMfLpbAbQSNFKQZzbErQBdpq-34mM9LOWXtChlr1mKapA5HwQe0qFEXrA9_pf9FA8mQxUFG7BXYVWJ1uZNdItx75D7aK7mYLc_CuFg6AtbfJR92NBFF-");'>
                </div>
                <div>
                  <p class="text-stone-700 dark:text-stone-300">"El personal es muy amable y profesional. Se nota que
                    aman a los animales. Mi perrita Luna se siente muy cómoda con ellos."</p>
                  <p class="mt-4 font-bold text-stone-900 dark:text-white">- Carlos Mendoza</p>
                </div>
              </div>
            </div>
            <div class="bg-background-light dark:bg-background-dark p-6 rounded-lg shadow-sm">
              <div class="flex items-start gap-4">
                <div class="w-24 h-24 bg-cover bg-center rounded-full flex-shrink-0"
                  style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDrnKbAMfUxhM02McoVdIIgL9BrJwHkn1UFk4-B3F4geBy3QXIm6YGlogGog9qq_1RjBmzqIK8gvJZSAHVanCdgCzFoK-CLRce-eqQAuD_exFggSJRxi2WVVySi-akczLKfnCR-31Vj_Tg6mN_HtSF2XDa_tkF0-kS24BU12CaUNokJmGzSDFgYqNQfnFq092UDp4yUejrJpKIA36uDaV2AJ2HesPJknIYXAtw8jo_ixhjYMv5xILYUFzneW5GUSIr-pELRIiCUjPKC");'>
                </div>
                <div>
                  <p class="text-stone-700 dark:text-stone-300">"La calidad del servicio es excelente. Mi perro, Rocky,
                    tiene el pelo muy delicado y siempre lo dejan re bien."</p>
                  <p class="mt-4 font-bold text-stone-900 dark:text-white">- Ana Torres</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- BENEFICIOS -->
      <section class="py-16 sm:py-24">
        <div class="container mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">Beneficios de elegirnos</h2>
            <p class="mt-3 max-w-2xl mx-auto text-base text-stone-600 dark:text-stone-400">Cuidado excepcional para tu
              compañero fiel.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex items-start gap-4">
              <div class="bg-primary/20 p-3 rounded-full">
                <span class="material-symbols-outlined text-primary">check_circle</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-stone-900 dark:text-white">Profesionales calificados</h3>
                <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">Nuestro equipo está formado por estilistas
                  caninos con amplia experiencia y pasión por los animales.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="bg-primary/20 p-3 rounded-full">
                <span class="material-symbols-outlined text-primary">health_and_safety</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-stone-900 dark:text-white">Ambiente seguro y relajante</h3>
                <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">Instalaciones diseñadas para garantizar la
                  comodidad y seguridad de tu mascota.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="bg-primary/20 p-3 rounded-full">
                <span class="material-symbols-outlined text-primary">spa</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-stone-900 dark:text-white">Productos de alta calidad</h3>
                <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">Utilizamos productos hipoalergénicos y de
                  marcas reconocidas para cuidar la piel y el pelaje.</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="bg-primary/20 p-3 rounded-full">
                <span class="material-symbols-outlined text-primary">volunteer_activism</span>
              </div>
              <div>
                <h3 class="text-lg font-bold text-stone-900 dark:text-white">Atención personalizada</h3>
                <p class="mt-1 text-sm text-stone-600 dark:text-stone-400">Nos adaptamos a las necesidades específicas
                  de cada mascota, brindando un servicio individualizado.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import BotonReservar from '../components/BotonReservar.vue'
</script>
<script>
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
