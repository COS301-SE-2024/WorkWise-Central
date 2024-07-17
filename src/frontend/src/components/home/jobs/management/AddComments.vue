<template>
  <v-btn @click="commentSection = true">Add comment</v-btn>
  <v-dialog v-model="commentSection" max-width="500px">
    <v-card class="text-center">
      <v-card-title>Add comment to the job</v-card-title>
      <v-card-text>
        <label class="pb-2">Comment below</label>
        <v-textarea
            label="Comment"
            clearable prepend-icon="fa: fa-solid fa-comment"
            variant="solo"
            hint="Enter your comment"
        >
        </v-textarea>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn color="success" @click="comment">Comment</v-btn>
        <v-btn color="error" @click="commentSection = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>
<script setup lang="ts">
  import {ref} from 'vue'
  const commentSection = ref(false)

  const comment = () => {
    commentSection.value = false
    // should propogate the comment to the backend when as well as push the user's initials to the view job card where a avatar and readonly text area will be rendered

  }

</script>
<style></style>