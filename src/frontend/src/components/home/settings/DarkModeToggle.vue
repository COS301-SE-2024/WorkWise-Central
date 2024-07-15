<template>
  <div>
    <label>
      <input type="checkbox" v-model="isDarkMode" @change="toggleDarkMode" />
      Dark Mode
    </label>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isDarkMode'])
  },
  methods: {
    ...mapActions(['setDarkMode']),
    toggleDarkMode() {
      this.setDarkMode(this.isDarkMode)
      console.log(this.isDarkMode)
    }
  }
}
</script>
