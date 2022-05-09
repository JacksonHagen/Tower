<template>
  <div class="row justify-content-center">
    <hr />
    <div class="col-2">
      <img :src="comment.creator.picture" alt="" class="pp rounded-pill" />
    </div>
    <div class="col-9">
      <p class="fw-bold">{{ comment.creator.name }}</p>
      <p>{{ comment.body }}</p>
    </div>
    <div class="col-1 text-end">
      <i
        v-if="comment.creatorId === account.id"
        class="mdi mdi-delete-outline mdi-24px text-danger"
        @click="deleteComment(comment.id)"
      ></i>
    </div>
  </div>
</template>


<script>
import { computed } from '@vue/reactivity'
import Pop from '../utils/Pop.js'
import { commentsService } from '../services/CommentsService.js'
import { AppState } from '../AppState.js'
export default {
  props:{
    comment:{
      type: Object,
      required: true
    },
  },
  setup(){
    return {
      account: computed(() => AppState.account),
      async deleteComment(id){
        try {
          if(Pop.confirm()) {
            await commentsService.deleteComment(id)
            Pop.toast('Comment Deleted!', 'success')
          }
        }
        catch(error) {
          console.error("[could not delete comment]", error.message);
          Pop.toast(error.message, "error");
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.pp {
  width: 100px;
  height: 100px;
  object-fit: cover;
}
</style>