<template>
  <div class="row">
    <div class="col-12 p-4 text-end">
      <p class="text-info">join the conversation</p>
      <form @submit.prevent="createComment()" id="commentForm">
        <textarea
          name="body"
          id="body"
          cols=""
          rows="4"
          class="form-control w-100"
          v-model="editable.body"
        ></textarea>
        <button class="btn btn-success my-3" type="submit">post comment</button>
      </form>
    </div>
  </div>
</template>


<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState.js'
import { commentsService } from "../services/CommentsService.js";
import Pop from '../utils/Pop.js';
export default {
  setup(){ 
    const route = useRoute()
    const editable = ref({eventId: route.params.id})
    return {
      editable,
      async createComment() {
        try {
          await commentsService.createComment(editable.value)
          document.getElementById('commentForm').reset()
          Pop.toast('Comment Created!', 'success')
        }
        catch(error) {
          console.error("[Couldnt create comment]", error.message);
          Pop.toast(error.message, "error");
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>