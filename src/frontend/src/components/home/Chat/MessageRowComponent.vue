<template>
  <v-list-item two-line>
    <v-list-item-avatar>
      <img :src="chat.user.picture" />
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title class="text-h6">{{ chat.user.firstName }}</v-list-item-title>
      <v-list-item-subtitle class="text-subtitle-2">
        {{ lastMessage }}
      </v-list-item-subtitle>
    </v-list-item-content>

    <v-list-item-action>
      <v-list-item-action-text class="text-body-2">{{ lastMessageTime }}</v-list-item-action-text>
      <v-icon color="grey">mdi-check-all</v-icon>
    </v-list-item-action>
  </v-list-item>

  <v-divider></v-divider>
</template>

<script setup>
// Props to accept chat data
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

// Mocking functions for last message and time
const lastMessage = props.chat.messages.length ? props.chat.messages[props.chat.messages.length - 1].message : 'No messages';
const lastMessageTime = new Date(props.chat.messages[props.chat.messages.length - 1]?.createdAt).toLocaleTimeString();
</script>

<style scoped>
/* Optional styling to match design */
</style>
