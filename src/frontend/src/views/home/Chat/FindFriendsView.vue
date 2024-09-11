<template>
  <v-container id="FindFriends" fluid class="pa-0 pt-12 overflow-auto fixed fill-height">
    <v-row v-for="user in props.usersComputed" :key="user.id" class="pa-0">
      <v-col cols="12" class="pa-0">
        <v-list-item
          v-if="hideMe(user)"
          @click="createNewChat(user)"
          class="cursor-pointer"
        >
          <v-list-item-avatar>
            <v-avatar size="48" :src="user.picture" color="red"></v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="text-subtitle-2 text--grey">{{ user.firstName }} {{ user.lastName }}</v-list-item-title>
            <v-list-item-subtitle class="text-body-2 grey--text">Hi, let's chat!</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { computed } from 'vue';

// Props
const props = defineProps({
  usersComputed: {
    type: Array,
  },
});

// Methods
const hideMe = (user) => {
  // Logic to decide whether to hide a user
  return false; // For testing, show all users
};

const createNewChat = (user) => {
  // Logic for creating a new chat
  console.log("Creating chat with", user);
};
</script>
