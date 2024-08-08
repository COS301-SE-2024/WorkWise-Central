<template>
  <v-container>
    <v-row v-for="(image, index) in images" :key="index" class="mb-3">
      <v-col cols="12">
        <v-img :src="image.src" max-height="200" max-width="200" @click="openImageOverlay(index)"></v-img>
        <v-btn @click="openImageActionsDialog(index)">
          <v-icon>
            {{ 'fa: fa-solid fa-ellipsis-h' }}
          </v-icon>
        </v-btn>

        <v-dialog
          v-model="image.dialog"
          max-width="300px"
          location="bottom"
          location-strategy="connected"
          opacity="0"
          origin="top center"
        >
          <template v-slot:default="{ isActive }">
            <v-card>
              <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                Image Actions
              </v-card-title>
              <v-card-actions class="d-flex flex-column">
                <v-btn color="primary" @click="commentOnImage(index)">
                  <v-icon>
                    {{ 'fa: fa-solid fa-comment' }}
                  </v-icon>
                  Comment
                </v-btn>
                <v-btn color="info" @click="changeImage(index)">
                  <v-icon>
                    {{ 'fa: fa-solid fa-sync' }}
                  </v-icon>
                  Change Image
                </v-btn>
                <v-btn color="success" @click="downloadImage(index)">
                  <v-icon>
                    {{ 'fa: fa-solid fa-download' }}
                  </v-icon>
                  Download
                </v-btn>
                <v-btn color="error" @click="deleteImage(index)">
                  <v-icon>
                    {{ 'fa: fa-solid fa-trash' }}
                  </v-icon>
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>

    <v-row cols="12">
      <v-col>
        <v-file-input
          v-model="newFile"
          label="Add an image"
          prepend-icon="fa: fa-solid fa-image"
          accept="image/*"
          @change="handleFileChange"
          variant="solo"
        ></v-file-input>
      </v-col>
    </v-row>

    <v-dialog v-model="imageOverlay" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="imageOverlay = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Image Preview</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text class="d-flex justify-center">
          <v-img :src="overlayImageSrc" max-width="100%" max-height="100%"></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const images = ref([]);
const newFile = ref(null);
const imageOverlay = ref(false);
const overlayImageSrc = ref('');

const handleFileChange = () => {
  const file = newFile.value;
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      images.value.push({
        src: e.target.result,
        dialog: false,
      });
    };
    reader.readAsDataURL(file);
    newFile.value = null;
  }
};

const openImageActionsDialog = (index) => {
  images.value[index].dialog = true;
};

const openImageOverlay = (index) => {
  overlayImageSrc.value = images.value[index].src;
  imageOverlay.value = true;
};

const commentOnImage = (index) => {
  alert(`Comment on Image ${index + 1}`);
};

const changeImage = (index) => {
  images.value[index].dialog = false;
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.onchange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        images.value[index].src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  fileInput.click();
};

const downloadImage = (index) => {
  const link = document.createElement('a');
  link.href = images.value[index].src;
  link.download = `downloaded-image-${index + 1}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const deleteImage = (index) => {
  images.value.splice(index, 1);
};
</script>

<style scoped>
h5 {
  display: flex;
  align-items: center;
}
</style>
