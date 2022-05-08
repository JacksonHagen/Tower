<template>
  <header>
    <Navbar />
  </header>
  <main class="container-fluid bg-dark lighten-20">
    <div class="row">
      <div class="col-md-11">
        <router-view />
      </div>
      <div class="col-md-1 bg-dark d-flex flex-column text-center">
        <Sidebar />
      </div>
    </div>
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
export default {
  name: 'App',
  setup() {
    return {
      appState: computed(() => AppState)
    }
  }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
