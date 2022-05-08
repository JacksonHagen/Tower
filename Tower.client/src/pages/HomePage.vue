<template>
  <div class="row">
    <TowerEvent v-for="te in towerEvents" :key="te.id" :towerEvent="te" />
  </div>
</template>

<script>
import { computed } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { towerEventsService } from "../services/TowerEventsService.js";
import { onMounted } from '@vue/runtime-core';
export default {
  name: 'Home',
  setup() {
    onMounted(() => {
      towerEventsService.getAllTowerEvents()
    })
    return{
      towerEvents: computed(() => AppState.towerEvents)
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;
  .home-card {
    width: 50vw;
    > img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
