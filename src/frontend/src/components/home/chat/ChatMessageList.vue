<template>
  <div class="message-list" ref="messageContainer">
    <div
      v-for="message in messages"
      :key="message._id"
      :class="['message', { sent: message.userId._id === userId || message?.userId === userId }]"
    >
      <Avatar :image="getUserAvatar(message.userId._id)" size="small" shape="circle" />

      <div class="message-content">
        <div class="message-header">
          <span class="sender-name">{{ getUserName(message.userId._id) }}</span>
          <div class="three-dots" v-if="message.userId._id === userId">
            <ConfirmPopup></ConfirmPopup>
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  @click="handleItemClick($event, message._id, message.chatId, item.label)"
                >
                  <v-list-item-title>{{ item.label }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
        <div class="message-body">
          <div class="message-text">
            <template v-if="editingMessageId === message._id && message.textContent !== hiddenText">
              <v-text-field
                v-model="editedText"
                @keyup.enter="saveEdit(message.chatId, message._id)"
                @keyup.esc="cancelEdit"
                autofocus
              ></v-text-field>
            </template>
            <template v-else>
              {{ message.textContent !== hiddenText ? message.textContent : '' }}
            </template>
          </div>
          <div class="attachments" v-if="message.attachments && message.attachments.length > 0">
            <div v-for="(attachment, index) in message.attachments" :key="index" class="attachment">
              <template v-if="editingMessageId === message._id">
                <v-text-field
                  v-model="editedAttachments[index]"
                  @keyup.enter="saveEdit(message.chatId, message._id)"
                  @keyup.esc="cancelEdit"
                  dense
                ></v-text-field>
              </template>
              <template v-else>
                <v-icon small>mdi-paperclip</v-icon>
                <a :href="attachment" download>
                  {{ getFileName(attachment) }}
                </a>
              </template>
            </div>
          </div>
        </div>
        <span class="timestamp">{{ formatTimestamp(message.createdAt) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import Avatar from 'primevue/avatar'

const props = defineProps(['messages', 'users'])

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
  //console.log('Pros for messageList', props)
  // for (const u of props.users) {
  //   console.log('ABC')
  //   console.log(u)
  // }
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.message.sent .message-content {
  background-color: #dcf8c6;
  margin-left: 0;
  margin-right: 0.5rem;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.2rem;
}

.sender-name {
  font-weight: bold;
  font-size: 0.8rem;
}

.three-dots {
  align-self: flex-start;
  margin-left: 0.5rem;
}

.message-body {
  display: flex;
  flex-direction: column;
}

.message-text {
  text-align: left;
  margin-bottom: 0.2rem;
}

.timestamp {
  font-size: 0.8em;
  color: #888;
  align-self: flex-end;
}

.attachments {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 5px;
  margin-top: 5px;
}

.attachment {
  display: flex;
  align-items: center;
  margin-bottom: 3px;
}

.attachment a {
  margin-left: 5px;
  text-decoration: none;
  color: #007bff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}
</style>
