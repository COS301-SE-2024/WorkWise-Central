<template>
  <div class="message-list">
    <div v-for="(message, index) in messages" :key="index" class="message-item" :class="{ 'my-message': message.sentByMe }">
      <Card class="p-mb-2">
        <span class="message-content">{{ message.content }}</span>
        <div class="timestamp">{{ message.timestamp }}</div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Card from 'primevue/card';

const messages = ref([]);

// Receive chat history via props or from a parent component
watch(() => props.selectedUser, (newUser) => {
  if (newUser) {
    messages.value = getChatHistory(newUser.id);  // Load the chat history for the user
  }
});

const getChatHistory = (userId) => {
  // Fetch or mock chat history
  return [
    { content: 'Hey there!', timestamp: '10:30 AM', sentByMe: true },
    { content: 'Hello!', timestamp: '10:32 AM', sentByMe: false },
    // More messages...
  ];
};
</script>

<style scoped>
.message-list {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;
}

.message-item {
  max-width: 60%;
}

.my-message {
  align-self: flex-end;
  background-color: #dcf8c6;
}

.timestamp {
  font-size: 0.75rem;
  text-align: right;
  color: gray;
}
</style>