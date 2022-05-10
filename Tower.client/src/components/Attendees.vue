<template>
  <h4 v-if="tickets?.length > 0" class="text-info">Attendees</h4>
  <div
    v-if="tickets?.length > 0"
    class="col-11 d-flex bg-dark rounded lighten-10 p-2"
  >
    <div v-for="t in tickets" :key="t.id">
      <img
        :src="t.account.picture"
        alt=""
        class="attendee-img rounded-pill mx-2"
        :title="t.account.name"
      />
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import { towerEventsService } from '../services/TowerEventsService.js'
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
export default {

  setup(){
    const route = useRoute()
    return {
      tickets: computed(() => AppState.activeTickets)

    }
  }
}
</script>


<style lang="scss" scoped>
.attendee-img {
  object-fit: contain;
  height: 50px;
  width: 50px;
}
</style>