<template>
  <div class="row">
    <div class="col-12 text-center">
      <h1>Welcome {{ account.name }}</h1>
      <button class="btn btn-info w-25 mb-5" @click="openModal()">
        Edit Account
      </button>
    </div>
  </div>
  <div class="row mb-5 justify-content-around">
    <h4 class="text-success text-center">My Events</h4>
    <TowerEvent v-for="te in userTowerEvents" :key="te.id" :towerEvent="te" />
  </div>
  <h4 class="text-success text-center">Upcoming Events</h4>
  <Ticket v-for="t in tickets" :key="t.id" :ticket="t" />
  <!-- MODAL -->
  <Modal id="editAccountModal">
    <template #title> Edit Account </template>
    <template #body>
      <EditAccountForm :account="account" />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { Modal } from 'bootstrap'
import { ticketsService } from '../services/TicketsService.js'
import { towerEventsService } from '../services/TowerEventsService.js'
export default {
  name: 'Account',
  setup() {
    onMounted(async () => {
      await towerEventsService.getAllTowerEvents()
      await ticketsService.getUserTickets()
    })
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.userTickets),
      userTowerEvents: computed(() => {
        let acc = AppState.account.id
        return AppState.towerEvents.filter(t => t.creatorId === acc)
        }),
      openModal() {
        Modal.getOrCreateInstance(document.getElementById('editAccountModal')).toggle()
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
