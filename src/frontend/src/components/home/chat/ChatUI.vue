<template>
  <div class="chat-app">
    <div class="sidebar">
      <ChatSidebar @user-selected="handleUserSelected" />
    </div>
    <div class="chat-area">
      <ChatMessageList :selectedUser="selectedUser" />
      <ChatInput @message-sent="handleMessageSent" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatSidebar from './ChatSideBar.vue';
import ChatMessageList from './ChatMessageList.vue';
import ChatInput from './ChatInput.vue';

const selectedUser = ref(null);

const handleUserSelected = (user) => {
  selectedUser.value = user;
};

const handleMessageSent = (message) => {
  // Check if a user is selected before sending the message
  if (selectedUser.value) {
    console.log(`Message sent to ${selectedUser.value.name}: ${message}`);
    // Add logic here to update the chat history or send the message to the server
  } else {
    console.warn('No user selected. Please select a user before sending a message.');
  }
};
</script>

<style scoped>
.chat-app {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 25%;
  background-color: #f4f4f4;
}

.chat-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #e5ddd5;
}
</style>
