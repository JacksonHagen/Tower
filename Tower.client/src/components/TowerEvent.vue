<template>
  <div class="col-md-3 d-flex flex-column align-items-center my-3">
    <div
      class="card bg-dark p-1 pointer"
      @click="goToPage('/events/' + towerEvent.id)"
    >
      <img :src="towerEvent.coverImg" class="coverImg" alt="..." />
      <div class="card-img-overlay d-flex align-items-end pb-0">
        <p class="bg-trans rounded px-3 py-2 w-100 fw-bold">
          {{ towerEvent.name }}
        </p>
      </div>
    </div>
  </div>
</template>


<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    towerEvent: {
      type: Object,
      required: true
    },
  },
  setup(){
    const router = useRouter()
    return {
      goToPage(path) {
        router.push({path})
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.coverImg {
  object-fit: cover;
  height: 40vh;
  width: 100%;
}
.bg-trans {
  background-color: rgba(255, 255, 255, 0.563);
  backdrop-filter: blur(2px);
}
</style>