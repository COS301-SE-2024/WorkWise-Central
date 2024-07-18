<template>
  <div>
    <v-divider></v-divider>
    <h3 class="pt-5">Add a comment</h3>
    <v-textarea
        label="Comment"
        clearable prepend-icon="fa: fa-solid fa-comment"
        variant="solo"
        hint="Enter your comment"
        class="pt-4"
        hide-details
    >
    </v-textarea>
    <v-btn color="success" @click="comment">Comment</v-btn>
  </div>
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