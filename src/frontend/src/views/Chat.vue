<template>
  <div class="chat">
    <div class="chat-header">
      <span>Nest Chat App</span>
      <button class="button" @click="handleLogout">Logout</button>
    </div>
    <div class="chat-message-list">
      <div
        v-for="(message, idx) in messages"
        :key="idx"
        :class="['chat-message', { outgoing: currentUser === message.author }]"
      >
        <div class="chat-message-wrapper">
          <span class="chat-message-author">{{ message.author }}</span>
          <div class="chat-message-bubble">
            <span class="chat-message-body">{{ message.body }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-composer">
      <input
        class="chat-composer-input"
        placeholder="Type message here"
        v-model="inputValue"
        @keydown.enter="handleSendMessage"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

const SystemMessage = {
  id: 1,
  body: 'Welcome to the Nest Chat app',
  author: 'Bot'
}

const socket = io('http://localhost:3000', { autoConnect: false })

export default {
  props: {
    currentUser: String,
    onLogout: Function
  },
  setup(props) {
    const inputValue = ref('')
    const messages = ref([SystemMessage])

    onMounted(() => {
      socket.connect()

      socket.on('connect', () => {
        console.log('Socket connected')
      })

      socket.on('disconnect', () => {
        console.log('Socket disconnected')
      })

      socket.on('chat', (newMessage) => {
        console.log('New message added', newMessage)
        messages.value.push(newMessage)
      })
    })

    onUnmounted(() => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('chat')
    })

    const handleSendMessage = () => {
      if (inputValue.value.trim().length === 0) return

      socket.emit('chat', { author: props.currentUser, body: inputValue.value.trim() })
      inputValue.value = ''
    }

    const handleLogout = () => {
      socket.disconnect()
      props.onLogout()
    }

    return {
      inputValue,
      messages,
      handleSendMessage,
      handleLogout
    }
  }
}
</script>

<style scoped></style>
