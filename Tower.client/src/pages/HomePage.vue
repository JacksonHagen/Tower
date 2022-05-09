<template>
  <div class="row justify-content-around">
    <div class="col-2 text-center">
      <button class="btn text-light" @click="filterBy.type = ''">All</button>
    </div>
    <div class="col-2 text-center">
      <button class="btn text-light" @click="filterBy.type = 'convention'">
        Conventions
      </button>
    </div>
    <div class="col-2 text-center">
      <button class="btn text-light" @click="filterBy.type = 'sport'">
        Sports
      </button>
    </div>
    <div class="col-2 text-center">
      <button class="btn text-light" @click="filterBy.type = 'digital'">
        Digital
      </button>
    </div>
    <div class="col-2 text-center">
      <button class="btn text-light" @click="filterBy.type = 'concert'">
        Concerts
      </button>
    </div>
  </div>
  <div class="row">
    <TowerEvent v-for="te in filteredList" :key="te.id" :towerEvent="te" />
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { AppState } from '../AppState.js'
import { towerEventsService } from "../services/TowerEventsService.js";
import { onMounted, watchEffect } from '@vue/runtime-core';
export default {
  name: 'Home',
  setup() {
    const filterBy = ref({type: ''})
    const filteredList = ref([])
    onMounted(() => {
      towerEventsService.getAllTowerEvents()
    })
    watchEffect(() => {
      let list = AppState.towerEvents
      if(filterBy.value.type) {
        list = list.filter(te => te.type === filterBy.value.type)
      }
      filteredList.value = list
    })
    return {
      filteredList,
      filterBy,
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
