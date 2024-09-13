<template>
  <div class="chat-app">
    <ChatSidebar
      :chats="chats"
      :selectedChat="selectedChat"
      :users="users"
      @select-chat="selectChat"
      @create-chat="createChat"
    />
    <div class="chat-main">
      <header v-if="selectedChat" class="chat-header">
        <Avatar :image="selectedChat.avatar" size="large" shape="circle" />
        <h2>{{ selectedChat.name }}</h2>
      </header>
      <ChatMessageList
        v-if="selectedChat"
        :messages="currentMessages"
        :currentUser="currentUser"
        :users="users"
      />
      <ChatInput @send-message="sendMessage" :disabled="!selectedChat" v-if="selectedChat" />
      <div v-else class="no-chat-selected">
        <img src="@/assets/images/background/WorkWiseChat.png" alt="Chat Icon" class="chat-icon" />
        <h1>WorkWise Chat</h1>
        <p>Select a chat or create a new one to start messaging</p>
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
const currentUser = ref({ id: 1, name: 'You', avatar: '@/assets/images/avatars/you.jpg' });
const users = ref([
  { id: 2, name: 'Alice', avatar: '@/assets/images/avatars/alice.jpg' },
  { id: 3, name: 'Bob', avatar: '@/assets/images/avatars/bob.jpg' },
  { id: 4, name: 'Charlie', avatar: '@/assets/images/avatars/charlie.jpg' },
]);

const chats = ref([
  { id: 1, name: 'General Chat', avatar: '@/assets/images/avatars/group.jpg', participants: [1, 2, 3, 4] },
  { id: 2, name: 'Alice', avatar: '@/assets/images/avatars/alice.jpg', participants: [1, 2] },
  { id: 3, name: 'Bob', avatar: '@/assets/images/avatars/bob.jpg', participants: [1, 3] },
]);

const selectedChat = ref(null);

const messages = ref({
  1: [
    { id: 1, senderId: 2, content: 'Hello everyone!', timestamp: new Date() },
    { id: 2, senderId: 1, content: 'Hi Alice!', timestamp: new Date() },
  ],
  2: [
    { id: 1, senderId: 1, content: 'Hey Alice!', timestamp: new Date() },
    { id: 2, senderId: 2, content: 'Hi there!', timestamp: new Date() },
  ],
  3: [
    { id: 1, senderId: 1, content: 'Hello Bob!', timestamp: new Date() },
    { id: 2, senderId: 3, content: 'Hey, how are you?', timestamp: new Date() },
  ],
});

const currentMessages = computed(() => {
  return selectedChat.value ? messages.value[selectedChat.value.id] || [] : [];
});

const selectChat = (chat) => {
  selectedChat.value = chat;
};

const createChat = (newChat) => {
  const chatId = chats.value.length + 1;
  const chat = {
    id: chatId,
    name: newChat.name,
    avatar: '@/assets/images/avatars/group.jpg', // Default group avatar
    participants: [currentUser.value.id, ...newChat.participants]
  };
  chats.value.push(chat);
  messages.value[chatId] = [];
  selectChat(chat);
};

const sendMessage = ({ content, attachment }) => {
  if (selectedChat.value) {
    const newMessage = {
      id: currentMessages.value.length + 1,
      senderId: currentUser.value.id,
      content,
      attachment,
      timestamp: new Date()
    };
    if (!messages.value[selectedChat.value.id]) {
      messages.value[selectedChat.value.id] = [];
    }
    messages.value[selectedChat.value.id].push(newMessage);
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

.no-chat-selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f9f9f9;
}

.chat-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
}

.no-chat-selected h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.no-chat-selected p {
  font-size: 1rem;
  color: #666;
}
</style>