<template>
  <div class="col-md-3 d-flex flex-column align-items-center my-3">
    <div
      class="card bg-dark p-1 pointer cardLoad"
      @click="goToPage('/events/' + towerEvent.id)"
    >
      <img :src="towerEvent.coverImg" class="coverImg" alt="..." />
      <div
        class="
          card-img-overlay
          d-flex
          flex-column
          justify-content-end
          pb-1
          px-1
        "
      >
        <div class="bg-trans px-3 py-2 w-100 text-dark lighten-10">
          {{ towerEvent.name }}
          <p class="text-dark">{{ towerEvent.capacity }} spots</p>
          <hr />
          {{ towerEvent.location }}
          <br />
          {{ getDateString() }}
        </div>
        <div class="bg-danger text-center py-2" v-if="towerEvent.capacity <= 0">
          Sold out
        </div>
        <div
          class="bg-danger text-center py-2"
          v-else-if="towerEvent.isCanceled"
        >
          Canceled
        </div>
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
  setup(props){
    const router = useRouter()
    return {
      goToPage(path) {
        router.push({path})
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
.coverImg {
  object-fit: cover;
  height: 100%;
  width: 100%;
}
.cardLoad {
  height: 40vh;
  width: 100%;
}
.coverImgDisabled {
  filter: blur(4px);
}
.bg-trans {
  background-color: rgba(255, 255, 255, 0.563);
  backdrop-filter: blur(2px);
}
</style>