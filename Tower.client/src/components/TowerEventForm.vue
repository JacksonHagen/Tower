<template>
  <form @submit.prevent="createTowerEvent()">
    <div class="mb-3 text-start d-flex justify-content-between">
      <div class="d-flex flex-column w-100 me-3">
        <label for="name" class="form-label">Event Name:</label>
        <input
          required
          type="text"
          name="name"
          id="name"
          class="form-control"
          v-model="formData.name"
        />
      </div>
      <div class="d-flex flex-column w-100 ms-3">
        <label for="type" class="form-label">Event Type:</label>
        <select
          required
          class="form-control"
          name="type"
          id="type"
          v-model="formData.type"
        >
          <option disabled selected value="concert">Select a type</option>
          <option value="concert">Concert</option>
          <option value="convention">Convention</option>
          <option value="sport">Sport</option>
          <option value="digital">Digital</option>
        </select>
      </div>
    </div>
    <div class="mb-3 text-start">
      <label for="description" class="form-label">Description:</label>
      <input
        required
        type="text"
        name="description"
        id="description"
        class="form-control"
        v-model="formData.description"
      />
    </div>
    <div class="mb-3 text-start">
      <label for="coverImg" class="form-label">Cover Image Url:</label>
      <input
        required
        type="text"
        name="coverImg"
        id="coverImg"
        class="form-control"
        v-model="formData.coverImg"
      />
    </div>
    <div class="mb-3 text-start">
      <label for="location" class="form-label">Location:</label>
      <input
        required
        type="text"
        name="location"
        id="location"
        class="form-control"
        v-model="formData.location"
      />
    </div>
    <div class="mb-3 text-start d-flex justify-content-between">
      <div class="d-flex flex-column w-100 me-3">
        <label for="capacity" class="form-label">Capacity:</label>
        <input
          required
          type="number"
          name="capacity"
          id="capacity"
          class="form-control"
          v-model="formData.capacity"
        />
      </div>
      <div class="d-flex flex-column w-100 ms-3">
        <label for="startDate" class="form-label">Event Date:</label>
        <input
          required
          type="date"
          name="startDate"
          id="startDate"
          class="form-control"
          v-model="formData.startDate"
        />
      </div>
    </div>
    <button type="submit" class="btn btn-success w-100">Submit</button>
  </form>
</template>


<script>
import { ref } from '@vue/reactivity';
import { towerEventsService } from '../services/TowerEventsService.js'
import Pop from '../utils/Pop.js';
import { useRouter } from 'vue-router';
import { Modal } from 'bootstrap';
export default {
  setup(){
    const router = useRouter()
    const formData = ref({})
    return {
      formData,
      async createTowerEvent(){
        try {
          const towerEvent = await towerEventsService.createTowerEvent(formData.value)
          Modal.getOrCreateInstance(document.getElementById('createEventModal')).toggle()
          router.push({path: '/events/' + towerEvent.id})
        }
        catch(error) {
          console.error("[COULD NOT CREATE TOWER]", error.message);
          Pop.toast(error.message, "error");
        }      
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>