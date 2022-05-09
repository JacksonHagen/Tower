<template>
  <div class="row card bg-dark lighten-30">
    <img :src="towerEvent.coverImg" class="cover-img details-img" alt="" />
    <div class="card-img-overlay">
      <div class="row">
        <div class="col-md-5 d-flex align-items-center ps-5">
          <img
            :src="towerEvent.coverImg"
            class="overlay-img border border-light border-3 rounded elevation-5"
            alt=""
          />
        </div>
        <div class="col-md-7 d-flex flex-column">
          <div class="row justify-content-between">
            <div class="col-6">
              <h3 class="text-light">
                {{ towerEvent.name }}
              </h3>
              <h5 class="text-primary lighten-20 fw-light">
                {{ towerEvent.location }}
              </h5>
            </div>
            <div class="col-6 text-end">
              <h4 class="text-primary lighten-20 fw-light p-2">
                {{ getDateString() }}
              </h4>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p class="fw-light">{{ towerEvent.description }}</p>
            </div>
          </div>
          <div class="row mt-auto justify-content-between">
            <div class="col-6 d-flex">
              <h3 class="text-primary me-2">
                {{ eventCapacity }}
              </h3>
              <h3>spots left</h3>
            </div>
            <div
              class="col-2 text-end d-flex flex-column pe-4 w-25"
              v-if="user.isAuthenticated"
            >
              <button
                class="btn btn-danger"
                disabled
                v-if="towerEvent.isCanceled"
              >
                Canceled
              </button>
              <button
                class="btn btn-danger"
                v-else-if="towerEvent.capacity <= 0"
                disabled
              >
                Sold out
              </button>
              <button
                class="btn btn-warning"
                @click="createTicket()"
                v-else-if="!isAttending()"
              >
                Attend
                <i class="mdi mdi-crowd mdi-24px"></i>
              </button>
              <button disabled v-else class="btn btn-info">Attending</button>
              <button
                class="btn btn-danger mt-4"
                v-if="
                  account.id === towerEvent.creatorId && !towerEvent.isCanceled
                "
                @click="cancelEvent()"
              >
                Cancel
              </button>
            </div>
            <div class="col-6" v-else></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState.js';
import { ticketsService } from "../services/TicketsService.js";
import { onMounted } from '@vue/runtime-core';
import { towerEventsService } from '../services/TowerEventsService.js';
import Pop from '../utils/Pop.js';
export default {
  props:{
    towerEvent:{
      type: Object,
      required: true
    },
  },
  setup(props){
    onMounted(async () => {
      if(!AppState.activeTowerEvent) {
        await towerEventsService.getActiveTowerEvent(props.towerEvent.id)
      }
      await ticketsService.getUserTickets()
    })
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.userTickets),
      eventCapacity: computed(() => AppState.capacity),
      user: computed(() => AppState.user),
      isAttending() {
        const ticket = this.tickets.find(t => t.eventId === props.towerEvent.id)
        if(!ticket) {
          return false
        }
        return true
      },
      async cancelEvent() {
        try {
          await towerEventsService.cancelEvent(props.towerEvent.id)
        }
        catch(error) {
          console.error("[could not cancel event]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      async createTicket() {
        try {
          await ticketsService.createTicket({eventId: props.towerEvent.id, accountId: this.account.id})
        }
        catch(error) {
          console.error("[could not create ticket]", error.message);
          Pop.toast(error.message, "error");
        }
      },
      getDateString() {
        const date = new Date(props.towerEvent.startDate).toString()
        let arr = date.split(' ')
        return `${arr[0]}, ${arr[1]} ${arr[2]}, ${arr[3]}`
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.details-img {
  object-fit: cover;
  height: 60vh;
  filter: blur(4px);
  mix-blend-mode: multiply;
}
.overlay-img {
  object-fit: cover;
  height: auto;
  width: 25vw;
}
</style>