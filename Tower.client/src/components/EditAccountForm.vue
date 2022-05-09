<template>
  <form @submit.prevent="editAccount()" id="editAccountForm">
    <div class="d-flex flex-column w-100 me-3 mb-3">
      <label for="name" class="form-label ms-1">Name:</label>
      <input
        required
        type="text"
        name="name"
        id="name"
        class="form-control"
        v-model="editable.name"
      />
    </div>
    <div class="d-flex flex-column w-100 me-3">
      <label for="picture" class="form-label ms-1">Profile Picture Url:</label>
      <input
        required
        type="text"
        name="picture"
        id="picture"
        class="form-control"
        v-model="editable.picture"
      />
    </div>
    <button class="btn btn-success w-100 mt-4" type="submit">Submit</button>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
import { accountService } from '../services/AccountService.js'
import { Modal } from 'bootstrap'
export default {
  props:{
    account:{
      type: Object,
      required: true
    },
  },
  setup(props){
    const editable = ref({})
    watchEffect(() => {
      editable.value = {...props.account}
    })
    return {
      editable,
      async editAccount() {
        try { 
          Modal.getOrCreateInstance(document.getElementById('editAccountModal')).toggle()
          await accountService.editAccount(editable.value)
        }
        catch(error) {
          console.error("[Could not edit account]", error.message);
          Pop.toast(error.message, "error");
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>