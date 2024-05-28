<template>
  <div>
    <h1><span class="header-title">Work</span><span class="color2">Wise</span></h1>
  </div>
  <div class=".bodyAlignment">
    <h1>
      Welcome to <span class="header-title">Work</span
      ><span class="header-title2">Wise</span> Central
    </h1>
    <VBtn class="elevation-2" style="color">Log in</VBtn>
    <span></span>
    <VBtn class="elevation-2" style="color2">Sign up</VBtn>
    <span></span>
  </div>
  <div class="imageAlignment">
    <img
      src="C:\Users\Kumbirai\OneDrive\Documents\GitHub\WorkWise-Central\src\frontend\img\splash.jpg"
      alt="work chat"
    />
  </div>
</template>

<style scoped>
.bodyAlignment {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  height: 100vh;
}

.imageAlignment {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  height: 100vh;
}
.input {
  font-size: 12px;
  font-family: Lato;
  font-weight: normal;
}
.header-title {
  font-size: 36px;
  font-family: 'Lato';
  font-weight: normal;
  color: #6a99ce;
}
.header-title2 {
  font-size: 36px;
  font-family: 'Lato';
  font-weight: normal;
  color: 879898;
}

.color2 {
  color: #879898;
}
.color {
  color: #6a99ce;
}
</style>
<script lang="ts">
import { VAppBar, VBtn, VSpacer } from 'vuetify/lib/components/index.mjs'
export default {
  components: {
    VAppBar,
    VBtn,
    VSpacer
  }
}
</script>
