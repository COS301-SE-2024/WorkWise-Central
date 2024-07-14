<template>
  <div class="avatar-upload">
    <v-avatar
        color="grey"
        rounded="1"
        size="150"
        @click="triggerFileInput"
        class="avatar-wrapper"
    >
      <v-img :src="avatarSrc" cover></v-img>
      <v-icon small class="camera-icon" color="grey">mdi-camera</v-icon>
    </v-avatar>
    <v-file-input
        ref="fileInput"
        accept="image/*"
        class="hidden bg-transparent"
        @change="onFileChange"
    ></v-file-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarSrc: "https://cdn.vuetifyjs.com/images/profiles/marcus.jpg",
    };
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
  },
};
</script>

<style scoped>
.avatar-upload {
  position: relative;
  display: inline-block;
}

.avatar-wrapper {
  cursor: pointer;
  position: relative;
}

.camera-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  padding: 5px;
}

.hidden {
  display: none;
}
</style>
