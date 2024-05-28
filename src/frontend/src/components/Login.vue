<template>
  <div class="modal-backdrop">
    <div class="modal">
      <slot name="header">
        <h3 class="header-title">Log into existing account</h3>
      </slot>
      <slot name="body">
        <VTextField
          label="Email"
          type="email"
          aria-placeholder="Enter tour email"
          width="500"
        ></VTextField>
        <VTextField
          label="Password"
          type="password"
          aria-placeholder="Enter your password"
          width="500"
        ></VTextField>
        <div>
          <VBtn class="elevation-2" style="background-color: 6A99CE" width="100">Log in</VBtn>
        </div>
        <div>
          <VBtn class="elevation-2" style="background-color: 879898" width="100">Sign up</VBtn>
        </div>
      </slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<style scoped>
.header-title {
  font-size: 30px;
  font: 'Lato';
}
</style>
<script lang="ts">
import { VAppBar, VBtn, VTextField } from 'vuetify/components'
export default {
  setup() {
    const login = () => {}
    return { login }
  },
  components: {
    VAppBar,
    VBtn,
    VTextField
  }
}
</script>
