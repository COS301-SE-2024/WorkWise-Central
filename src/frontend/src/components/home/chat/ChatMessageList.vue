<template>
  <div class="message-list" ref="messageContainer">
    <div
      v-for="message in messages"
      :key="message.id"
      :class="['message', { 'sent': message.senderId === currentUser.id }]"
    >
      <div class="message-content">
        {{ message.content }}
        <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const props = defineProps(['messages', 'currentUser']);

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
</script>

<style scoped>
.message-list {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.message {
  max-width: 70%;
  margin-bottom: 1rem;
  align-self: flex-start;
}

.message.sent {
  align-self: flex-end;
}

.message-content {
  background-color: #f0f0f0;
  border-radius: 12px;
  padding: 0.5rem 1rem;
  position: relative;
}

.message.sent .message-content {
  background-color: #dcf8c6;
}

.timestamp {
  font-size: 0.75rem;
  color: #888;
  position: absolute;
  bottom: -1.2rem;
  right: 0.5rem;
}
</style>