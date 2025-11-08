<template>
    <div class="bg-background-light dark:bg-background-dark font-display text-text-dark dark:text-gray-200">
        <!-- HEADER -->
        <header
            class="flex items-center justify-between whitespace-nowrap border-b border-secondary dark:border-gray-700 px-10 py-3">
            <div class="flex items-center gap-4 text-text-dark dark:text-white">
                <div class="size-6 text-primary">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" d="M24 4H42V17.3333V30.6667H24V44H6V30.6667V17.3333H24V4Z"
                            fill="currentColor" fill-rule="evenodd" />
                    </svg>
                </div>
                <h2 class="text-xl font-bold leading-tight tracking-[-0.015em]">Pelucan</h2>
            </div>

            <div class="flex flex-1 justify-end gap-8">
                <nav class="hidden md:flex items-center gap-9">
                    <RouterLink to="/" class="text-sm font-medium leading-normal">Inicio</RouterLink>
                    <RouterLink to="/reservar" class="text-sm font-medium leading-normal">Reservar Turno</RouterLink>
                    <RouterLink to="/servicios" class="text-sm font-medium leading-normal">Servicios</RouterLink>
                    <RouterLink to="/contacto" class="text-sm font-medium leading-normal">Contacto</RouterLink>
                    <RouterLink to="/nosotros" class="text-sm font-medium leading-normal">Nosotros</RouterLink>
                </nav>
                <button
                    class="flex items-center justify-center rounded-xl h-10 px-4 bg-accent text-white text-sm font-bold hover:bg-opacity-90 transition">
                    Login
                </button>
            </div>
        </header>

        <!-- HERO -->
        <section
            class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 text-center"
            style="background-image: linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBo2YAQOSmcck3vIwCPkLzUqPq0OTWjtAdaBxVciKy9vPIytv7PvpXMu5LcNwhL31oooFmaNd9eQKduwKJpWgjB8u2b5ny7BBbJxEnvdH_e35xIVK6gJh73X1XyqXdPoWJIuRXB-Yc5kQfcQ5MfdhOtOTjt7gh0AaYR_ROj21ZL2lgGQdDfXLa5jlJ1QrSCOrKs-j9DUrbmCvJ5pPwEVoJRYN9H43Mo4gb7rwfDTT234YpILIdQy3BR7IhCRZV-1bE9ZT29PlttbEOP');">
            <h1 class="text-white text-4xl md:text-5xl font-black">Nuestra Pasión: El Bienestar de tu Mascota</h1>
            <p class="text-white text-sm md:text-base max-w-2xl">
                En Pelucan, cada corte de pelo es una obra de arte y cada perro es tratado con amor y respeto.
            </p>
        </section>

        <!-- HISTORIA -->
        <section class="p-4 md:p-10">
            <h2 class="text-[22px] font-bold text-text-dark dark:text-white mb-6">Nuestra Historia</h2>
            <div class="flex flex-col md:flex-row gap-8 items-stretch">
                <div class="flex flex-col gap-2 flex-[2_2_0px]">
                    <p class="text-base font-bold">El Origen de Pelucan</p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">
                        Pelucan nació de la pasión de un grupo de amigos por los animales. Desde nuestros humildes
                        comienzos en un
                        pequeño local, hemos crecido hasta convertirnos en un referente en el cuidado canino, siempre
                        manteniendo
                        nuestro compromiso con el bienestar animal como pilar fundamental.
                    </p>
                </div>
                <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
                    style="background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuAQIU02QUnYOi-Nmq5xJ3eagd92awnyA9887p_m46fa3pCRd3D5HrhPidrPRaQYofeAsEHtFkuwW3ipos9-SdcTvlmLgT9zlE_X11FLCSP2km978GcB-5vhrhppU3rs5i1d25L6rAqV3qv5JYvLgUVjrx-KH6v_9QhtLWD1-nVMjX-0xuHsicOYPHC-uI3rJDObAhD5K2TvbN0oBKMWqJQQuVXk4rzJr4yNUN0ZZxt-JvUgLHRd6ntixb7QAtr8LZw-_8_xMnejRKzE');">
                </div>
            </div>
        </section>

        <!-- MISIÓN, VISIÓN Y VALORES -->
        <section class="flex flex-col gap-10 px-4 md:px-14 py-10 bg-secondary dark:bg-background-dark">
            <div>
                <h1 class="text-[32px] font-bold text-text-dark dark:text-white mb-2">Nuestra Misión, Visión y Valores
                </h1>
                <p class="text-gray-600 dark:text-gray-400 max-w-[720px]">Estos son los pilares que guían nuestro
                    trabajo.</p>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div v-for="(item, i) in pilares" :key="i"
                    class="flex flex-col gap-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-background-light dark:bg-gray-800 p-4">
                    <div class="text-primary text-3xl material-symbols-outlined">{{ item.icono }}</div>
                    <h2 class="font-bold text-text-dark dark:text-white">{{ item.titulo }}</h2>
                    <p class="text-gray-600 dark:text-gray-400 text-sm">{{ item.descripcion }}</p>
                </div>
            </div>
        </section>

        <!-- EXPERTOS -->
        <section class="p-4 md:p-10">
            <h2 class="text-[22px] font-bold text-center text-text-dark dark:text-white mb-8">Conoce a Nuestros Expertos
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(persona, i) in equipo" :key="i"
                    class="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:scale-105 transition-transform">
                    <div
                        class="w-24 h-24 rounded-full bg-primary/10 text-primary mb-4 flex items-center justify-center text-xl font-bold">
                        {{ persona.iniciales }}
                    </div>
                    <h3 class="text-lg font-bold text-text-dark dark:text-white">{{ persona.nombre }}</h3>
                    <p class="text-sm text-primary font-medium">{{ persona.rol }}</p>
                    <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">{{ persona.descripcion }}</p>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <div class="text-center py-12">
            <RouterLink to="/reservar"
                class="inline-flex items-center justify-center rounded-xl h-12 px-6 bg-accent text-white font-bold hover:bg-opacity-90 transition">
                Reservar un Turno Ahora
            </RouterLink>
        </div>

        <!-- FOOTER -->
        <footer
            class="bg-secondary dark:bg-background-dark p-10 border-t border-gray-200 dark:border-gray-700 text-center md:text-left">
            <div class="flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-sm text-gray-600 dark:text-gray-400">© 2024 Pelucan. Todos los derechos reservados.</p>
                <div class="flex gap-4">
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">Facebook</a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">Instagram</a>
                    <a href="#" class="text-gray-600 dark:text-gray-400 hover:text-primary">Twitter</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<script setup>
const pilares = [
    {
        icono: "favorite",
        titulo: "Misión",
        descripcion: "Brindar el mejor cuidado y estilismo para perros en un ambiente seguro y amoroso."
    },
    {
        icono: "trending_up",
        titulo: "Visión",
        descripcion: "Ser el centro de estética canina de referencia, reconocido por nuestra excelencia y amor por los animales."
    },
    {
        icono: "shield",
        titulo: "Valores",
        descripcion: "Pasión, Profesionalismo, Seguridad y Cariño."
    }
];

const equipo = [
    {
        iniciales: "AR",
        nombre: "Adriano Raffaulte",
        rol: "Peluquero Principal",
        descripcion: "Aporta una visión artística con años de experiencia en cortes de raza y estilismo avanzado."
    },
    {
        iniciales: "VF",
        nombre: "Valentín Festorazzi",
        rol: "Estilista Canino",
        descripcion: "Destacado por su creatividad y atención al detalle, ideal para estilos personalizados."
    },
    {
        iniciales: "PP",
        nombre: "Pablo Paniagua",
        rol: "Especialista en Cachorros",
        descripcion: "Experto en socialización y cuidado de cachorros, creando experiencias positivas."
    }
];
</script>