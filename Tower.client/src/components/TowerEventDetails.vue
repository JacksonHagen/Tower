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
                <!-- TODO make something to parse the date -->
                {{ towerEvent.startDate }}
              </h4>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p class="fw-light">{{ towerEvent.description }}</p>
            </div>
          </div>
          <div class="row mt-auto">
            <div class="col-6 d-flex">
              <h3 class="text-primary me-2">
                {{ towerEvent.capacity }}
              </h3>
              <h3>spots left</h3>
            </div>
            <!-- TODO implement the v-if and ticket creation -->
            <div class="col-6 text-end pe-4">
              <button
                class="btn btn-warning"
                @click="createTicket()"
                v-if="!isAttending()"
              >
                Attend
                <i class="mdi mdi-crowd mdi-24px"></i>
              </button>
              <button disabled v-else class="btn btn-info">Attending</button>
            </div>
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
export default {
  props:{
    towerEvent:{
      type: Object,
      required: true
    },
  },
  setup(props){
    onMounted(async () => {
      await ticketsService.getUserTickets()
    })
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.userTickets),
      isAttending() {
        const ticket = this.tickets.find(t => t.accountId === this.account.id)
        if(!ticket) {
          return false
        }
        return true
      },
      async createTicket() {
        try {
          await ticketsService.createTicket({eventId: props.towerEvent.id, accountId: this.account.id})
        }
        catch(error) {
          console.error("[could not create ticket]", error.message);
          Pop.toast(error.message, "error");
        }
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
  width: 33vw;
}
</style>