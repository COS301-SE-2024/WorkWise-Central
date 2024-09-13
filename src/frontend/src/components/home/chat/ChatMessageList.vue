<template>
  <div class="message-list" ref="messageContainer">
    <div
      v-for="message in messages"
      :key="message.id"
      :class="['message', { 'sent': message.senderId === currentUser.id }]"
    >
      <Avatar :image="getUserAvatar(message.senderId)" size="small" shape="circle" />
      <div class="message-content">
        <span class="sender-name">{{ getUserName(message.senderId) }}</span>
        {{ message.content }}
        <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';
import Avatar from 'primevue/avatar';

const props = defineProps(['messages', 'currentUser', 'users']);

const messageContainer = ref(null);

watch(() => props.messages.length, () => {
  nextTick(() => {
    scrollToBottom();
  });
});

const formatTimestamp = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date(timestamp));
};

const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight;
  }
};

const getUserName = (userId) => {
  const user = props.users.find(u => u.id === userId);
  return user ? user.name : 'Unknown User';
};

const getUserAvatar = (userId) => {
  const user = props.users.find(u => u.id === userId);
  return user ? user.avatar : '';
};
</script>

<style scoped>
.message-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: #e5ddd5;
}

.message {
  display: flex;
  align-items: flex-start;
  max-width: 70%;
  margin-bottom: 1rem;
  align-self: flex-start;
}

.message.sent {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.message-content {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin-left: 0.5rem;
}

.message.sent .message-content {
  background-color: #dcf8c6;
  margin-left: 0;
  margin-right: 0.5rem;
}

.sender-name {
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 0.2rem;
  display: block;
}

.timestamp {
  font-size: 0.75rem;
  color: #888;
  position: absolute;
  bottom: -1.2rem;
  right: 0.5rem;
}
</style>