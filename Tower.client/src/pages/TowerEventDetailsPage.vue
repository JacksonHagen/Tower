<template>
  <div class="row" v-if="!activeTowerEvent">
    <div class="col-12 text-center">
      <h1>Loading...</h1>
    </div>
  </div>
  <span v-else>
    <TowerEventDetails :towerEvent="activeTowerEvent" />
    <div class="row justify-content-center mt-4 text-center">
      <Attendees />
    </div>
    <div class="container mt-5">
      <CommentThread />
    </div>
  </span>
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { onMounted, watchEffect } from '@vue/runtime-core'
import { towerEventsService } from '../services/TowerEventsService.js'
export default {
  setup(){
    const route = useRoute()
    // NOTE change to watcheffect and add in everything that needs to be done on the page
    watchEffect(async () => {
      try {
        await towerEventsService.getActiveTowerEvent(route.params.id)
        await towerEventsService.getTowerEventComments(route.params.id)
        await towerEventsService.getTowerEventTickets(route.params.id)
      }
      catch(error) {
        console.error("[could not load]", error.message);
        Pop.toast(error.message, "error");
      }
    })
    return {
      activeTowerEvent: computed(() => AppState.activeTowerEvent)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>