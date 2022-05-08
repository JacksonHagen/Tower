<template>
  <div class="row" v-if="!activeTowerEvent">
    <div class="col-12 text-center">
      <h1>Loading...</h1>
    </div>
  </div>
  <TowerEventDetails v-else :towerEvent="activeTowerEvent" />
</template>


<script>
import { computed } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { onMounted } from '@vue/runtime-core'
import { towerEventsService } from '../services/TowerEventsService.js'
export default {
  setup(){
    const route = useRoute()
    onMounted(async () => {
      try {
        await towerEventsService.getActiveTowerEvent(route.params.id)
      }
      catch(error) {
        console.error("[couldnt get event]", error.message);
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