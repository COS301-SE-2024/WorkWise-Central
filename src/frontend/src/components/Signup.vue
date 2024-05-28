<template>
  <div class="modal-backdrop">
    <div class="modal">
      <slot name="header">
        <h3 class="header-title">Create an account</h3>
      </slot>
      <slot name="body">
        <VTextField
          label="First Name"
          type="text"
          aria-placeholder="Enter your first name"
        ></VTextField>
        <VTextField
          label="Last Name"
          type="text"
          aria-placeholder="Enter your last name"
        ></VTextField>

        <VTextField label="Email" type="email" aria-placeholder="Enter tour email"></VTextField>

        <VTextField
          label="Password"
          type="password"
          aria-placeholder="Enter your password"
        ></VTextField>
        <VTextField
          label="Confirm Password"
          type="password"
          aria-placeholder="Confirm your password"
        ></VTextField>
        <VBtn class="elevation-2" style="background-color: 6A99CE; color:">Log in</VBtn>
        <VBtn class="elevation-2" style="background-color: 879898; color:">Sign up</VBtn>
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
    const signup = () => {}
    return { signup }
  },
  components: {
    VAppBar,
    VBtn,
    VTextField
  }
}
</script>
