<template>
  <div class="row justify-content-center mb-5">
    <div class="col-md-8 bg-dark lighten-10 rounded">
      <div class="row">
        <div class="col-4 ps-0">
          <img
            :src="ticket.event.coverImg"
            class="ticket-img img-fluid rounded-start"
            alt=""
          />
        </div>
        <div class="col-4 pt-3">
          <h5 class="text-light py-1">{{ ticket.event.name }}</h5>
          <h6 class="text-info py-1">{{ ticket.event.location }}</h6>
          <h6 class="text-info py-1">{{ getDate() }}</h6>
        </div>
        <div class="col-4 pt-4 text-end pe-4">
          <button class="btn btn-danger" @click="deleteTicket()">
            not going
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { ticketsService } from '../services/TicketsService.js'
import Pop from '../utils/Pop.js'
export default {
  props:{
    ticket:{
      type: Object,
      required: true
    },
  },
  setup(props){
    return {
      getDate() {
        const date = new Date(props.ticket.event.startDate).toString()
        let arr = date.split(' ')
        return `${arr[0]}, ${arr[1]} ${arr[2]}, ${arr[3]}`
      },
      async deleteTicket() {
        try {
          if(await Pop.confirm()) {
            await ticketsService.deleteTicket(props.ticket.id)
            Pop.toast('Ticket deleted', 'success')
          }
        }
        catch(error) {
          console.error("[Could not delete ticket]", error.message);
          Pop.toast(error.message, "error");
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.ticket-img {
  object-fit: cover;
}
</style>