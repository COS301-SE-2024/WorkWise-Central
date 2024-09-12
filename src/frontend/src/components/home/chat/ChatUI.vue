<template>
  <div class="chat-app">
    <ChatSidebar
      :users="users"
      :selectedUser="selectedUser"
      @select-user="selectUser"
    />
    <div class="chat-main">
      <header v-if="selectedUser" class="chat-header">
        <Avatar :image="selectedUser.avatar" size="large" shape="circle" />
        <h2>{{ selectedUser.name }}</h2>
      </header>
      <ChatMessageList
        v-if="selectedUser"
        :messages="currentMessages"
        :currentUser="currentUser"
      />
      <ChatInput @send-message="sendMessage" :disabled="!selectedUser" v-if="selectedUser" />
      <div v-else class="no-user-selected">
        <img  alt="Message Icon" class="message-icon" />
        <h1>WorkWise Chat</h1>
        <p>Select a user to start a new chat</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ChatSidebar from './ChatSideBar.vue';
import ChatMessageList from './ChatMessageList.vue';
import ChatInput from './ChatInput.vue';
import Avatar from 'primevue/avatar';

// Mock data
const currentUser = ref({ id: 1, name: 'You' });
const users = ref([
  { id: 2, name: 'Alice', avatar: 'path/to/alice-avatar.jpg' },
  { id: 3, name: 'Bob', avatar: 'path/to/bob-avatar.jpg' },
  { id: 4, name: 'Charlie', avatar: 'path/to/charlie-avatar.jpg' },
]);

const selectedUser = ref(null);

const messages = ref({
  2: [
    { id: 1, senderId: 1, receiverId: 2, content: 'Hey Alice!', timestamp: new Date() },
    { id: 2, senderId: 2, receiverId: 1, content: 'Hi there!', timestamp: new Date() },
  ],
  3: [
    { id: 1, senderId: 1, receiverId: 3, content: 'Hello Bob!', timestamp: new Date() },
    { id: 2, senderId: 3, receiverId: 1, content: 'Hey, how are you?', timestamp: new Date() },
  ],
  4: [
    { id: 1, senderId: 4, receiverId: 1, content: 'Hi there!', timestamp: new Date() },
    { id: 2, senderId: 1, receiverId: 4, content: 'Hello Charlie!', timestamp: new Date() },
  ],
});

const currentMessages = computed(() => {
  return selectedUser.value ? messages.value[selectedUser.value.id] || [] : [];
});

const selectUser = (user) => {
  selectedUser.value = user;
};

const sendMessage = (content) => {
  if (selectedUser.value) {
    const newMessage = {
      id: currentMessages.value.length + 1,
      senderId: currentUser.value.id,
      receiverId: selectedUser.value.id,
      content,
      timestamp: new Date()
    };
    messages.value[selectedUser.value.id].push(newMessage);
  }
};
</script>

<style scoped>
.chat-app {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.chat-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}

.chat-header h2 {
  margin-left: 1rem;
  font-size: 1.2rem;
}

.no-user-selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.message-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
}

.no-user-selected h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.no-user-selected p {
  font-size: 1rem;
  color: #888;
}
</style>