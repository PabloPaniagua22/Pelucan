import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../views/Inicio.vue";
import IniciarSesion from "../views/inicioSesion.vue";
import Nosotros from "../views/Nosotros.vue";
import Servicios from "../views/Servicios.vue";
import MisMascotas from "../views/MisMascotas.vue";

const routes = [
  { path: "/", component: Inicio },
  { path: "/login", component: IniciarSesion },
  { path: "/nosotros", component: Nosotros },
  { path: "/servicios", component: Servicios },
  { path: "/reservar", component: () => import("@/views/Reserva.vue") },
  { path: "/mascotas", component: MisMascotas },
  { path: "/registro", component: () => import("@/views/RegistroCliente.vue") },
  {
    path: "/micuenta",
    name: "MiCuenta",
    component: () => import("@/views/MiCuenta.vue"),
    meta: { requiresAuth: true },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.meta.requiresAuth && !token) {
    next("/login");
  } else {
    next();
  }
});

export default router;