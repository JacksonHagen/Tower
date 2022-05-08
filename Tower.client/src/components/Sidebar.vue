<template>
  <Login />
  <button @click="sendToPage('Home')" class="btn text-light">home</button>
  <span v-if="user.isAuthenticated">
    <button @click="sendToPage('Account')" class="btn text-light">
      account
    </button>
    <button class="btn btn-success px-1" @click="openCreateEventModal()">
      new event
    </button>
    <button class="btn mt-3 text-light" @click="logout()">logout</button>
  </span>
  <Modal id="createEventModal">
    <template #title> Create a New Tower Event </template>
    <template #body>
      <TowerEventForm />
    </template>
  </Modal>
</template>


<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { useRouter } from 'vue-router'
import { Modal } from 'bootstrap'
import { AuthService } from '../services/AuthService.js'
export default {
  setup(){
    const router = useRouter()
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      sendToPage(name) {
        router.push({name})
      },
      openCreateEventModal() {
        Modal.getOrCreateInstance(document.getElementById('createEventModal')).toggle()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>