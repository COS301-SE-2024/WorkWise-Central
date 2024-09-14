<template>
  <div class="message-list" ref="messageContainer">
    <div
      v-for="message in messages"
      :key="message._id"
      :class="['message', { sent: message.userId._id === userId }]"
    >
      <Avatar :image="getUserAvatar(message.userId._id)" size="small" shape="circle" />
      <div class="message-content">
        <span class="sender-name">{{ getUserName(message.userId._id) }}</span>
        {{ message.textContent }}
        <span class="timestamp">{{ formatTimestamp(message.createdAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import Avatar from 'primevue/avatar'

const props = defineProps(['messages', 'currentUser', 'users'])

const messageContainer = ref(null)

const userId = localStorage.getItem('id')

const defaultProfilePic = 'http://www.gravatar.com/avatar/?d=mp'

watch(
  () => props.messages.length,
  () => {
    nextTick(() => {
      scrollToBottom()
    })
  }
)

const formatTimestamp = (timestamp) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(new Date(timestamp))
}

const scrollToBottom = () => {
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

const getUserName = (userId) => {
  console.log('Pros for messageList', props)
  for (const u of props.users) {
    console.log('ABC')
    console.log(u)
  }
  const user = props.users.find((u) => u._id === userId)
  return user ? user?.profile?.displayName : 'Unknown User'
}

const getUserAvatar = (userId) => {
  const user = props.users.find((u) => u._id === userId)
  return user ? user?.profile.displayImage : defaultProfilePic
}
</script>

<style scoped>
.message-list {
  flex-grow: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: #e5ddd5;
  /*
  background-image: url('https://images.unsplash.com/photo-1503891617560-5b8c2e28cbf6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
  */
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
