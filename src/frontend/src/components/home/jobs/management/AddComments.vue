<template>
  <div>
    <v-divider></v-divider>
    <h3 class="pt-4">Add job comments</h3>
    <v-container>
      <v-row v-for="(comment, index) in comments" :key="index" class="d-flex align-center mb-3">
        <v-col cols="2" class="pt-6">
          <v-avatar color="secondary" style="width: 38px; height: 36px" >
            <span class="text-h6">{{ user.initials }}</span>
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <v-text-field
              v-model="comment.text"
              label="Comment"
              dense
              readonly
              :clearable="false"
              class="pt-4"
              hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn icon @click="deleteComment(index)">
            <v-icon color="red" class="fa fa-trash pt-4" ></v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-textarea
          v-model="newComment"
          label="Add a comment"
          clearable
          auto-grow
          variant="solo"
          hint="Enter your comment here"
          hide-details
          prepend-icon="fa: fa-solid fa-comment"
      ></v-textarea>
      <v-btn color="success" @click="comment">Comment</v-btn>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const user = {
  initials: 'JD',
  fullName: 'John Doe',
  email: 'john.doe@doe.com'
}
const comments = ref([{ text: 'Initial comment' }]);
const newComment = ref('');

const comment = () => {
  if (newComment.value.trim() !== '') {
    comments.value.push({ text: newComment.value.trim() });
    newComment.value = '';
    // make the update job api request here with the comments as the patch
  }
};

const deleteComment = (index: number) => {
  comments.value.splice(index, 1);
  // make update job api request here with the comments as the patch
};

</script>

<style></style>


