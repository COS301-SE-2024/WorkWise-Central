<template>
  <v-list-item two-line>
    <v-list-item-avatar>
      <img :src="chat.user.picture" alt="User Avatar" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title class="text-h6">{{ chat.user.firstName }}</v-list-item-title>
      <v-list-item-subtitle class="text-subtitle-2">
        {{ lastMessage }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-list-item-action-text class="text-body-2">{{ lastMessageTime }}</v-list-item-action-text>
      <v-icon color="grey">{{ chat.sub1HasViewed && chat.sub2HasViewed ? 'mdi-check-all' : 'mdi-checkbox-blank-outline' }}</v-icon>
    </v-list-item-action>
  </v-list-item>

  <v-divider></v-divider>
</template>

<script setup>
import { computed } from 'vue';

// Props to accept chat data
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

// Computed properties for last message and time
const lastMessage = computed(() => {
  const messages = Array.isArray(props.chat.messages) ? props.chat.messages : [];
  return messages.length ? messages[messages.length - 1].message : 'No messages';
});

const lastMessageTime = computed(() => {
  const messages = Array.isArray(props.chat.messages) ? props.chat.messages : [];
  return messages.length ? new Date(messages[messages.length - 1].createdAt).toLocaleTimeString() : '';
});
</script>

<style scoped>
/* Optional styling to match design */
</style>