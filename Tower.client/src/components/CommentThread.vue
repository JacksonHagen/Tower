<template>
  <div class="row justify-content-center">
    <div class="col-md-8 rounded bg-dark lighten-10">
      <div class="text-center pt-3">
        <h4 class="text-info">Comments</h4>
      </div>
      <CommentForm v-if="user.isAuthenticated" />
      <Comment v-for="c in comments" :key="c.id" :comment="c" />
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from '@vue/runtime-core'
import { commentsService } from '../services/CommentsService.js'
import { towerEventsService } from '../services/TowerEventsService.js'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
export default {
  setup(){
    const route = useRoute()
    return {
      user: computed(() => AppState.user ),
      comments: computed(() => AppState.comments)
    }
  }
}
</script>


<style lang="scss" scoped>
</style>