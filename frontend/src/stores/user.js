import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,       // datos del usuario
    mascotas: []      // array de mascotas del usuario
  }),
  actions: {
    setUser(userData) {
      this.user = userData
    },
    setMascotas(mascotasArray) {
      this.mascotas = mascotasArray
    }
  }
})
