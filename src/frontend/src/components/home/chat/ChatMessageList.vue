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
              <InputText
                v-model="editedText"
                @keyup.enter="saveEdit(message.chatId, message._id)"
                @keyup.escape="cancelEdit"
                autofocus
              />
            </template>
            <template v-else>
              {{ message.textContent !== hiddenText ? message.textContent : '' }}
            </template>
          </div>
          <div class="attachments" v-if="message.attachments && message.attachments.length > 0">
            <Carousel
              v-if="getImageAttachments(message.attachments).length > 0"
              :value="getImageAttachments(message.attachments)"
              :numVisible="3"
              :numScroll="2"
              :showIndicators="true"
            >
              <template #item="slotProps">
                <div class="image-item">
                  <Image
                    :src="slotProps.data"
                    :alt="getFileName(slotProps.data)"
                    style="width: 100px; height: 100px; object-fit: fill"
                    preview
                  />
                  <Button
                    icon="pi pi-download"
                    @click="downloadAttachment(slotProps.data)"
                    class="p-button-rounded p-button-text"
                  />
                </div>
              </template>
            </Carousel>
            <div
              v-for="(attachment, index) in getRegularAttachments(message.attachments)"
              :key="index"
              class="attachment"
            >
              <template v-if="editingMessageId === message._id">
                <InputText
                  v-model="editedAttachments[index]"
                  @keyup.enter="saveEdit(message.chatId, message._id)"
                  @keyup.escape="cancelEdit"
                />
              </template>
              <template v-else>
                <i class="pi pi-paperclip" style="font-size: 0.8rem"></i>
                <a href="#" @click.prevent="downloadAttachment(attachment)">
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
import ConfirmPopup from 'primevue/confirmpopup'
import { useConfirm } from 'primevue/useconfirm'
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Image from 'primevue/image'

const confirm = useConfirm()
const editingMessageId = ref(null)
const editedText = ref('')
const editedAttachments = ref([])
const emit = defineEmits(['edit-message', 'delete-message'])

const hiddenText = '##image_only##'

const items = ref([
  {
    label: 'Edit',
    icon: 'pi pi-refresh'
  },
  {
    label: 'Delete',
    icon: 'pi pi-upload'
  }
])

const getFileName = (attachment) => {
  let tempName = attachment.split('/').pop()
  return tempName.substring(37)
}

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

const startEdit = (messageId) => {
  const message = props.messages.find((m) => m._id === messageId)
  if (message) {
    editingMessageId.value = messageId
    editedText.value = message.textContent
    editedAttachments.value = [...message.attachments]
  }
}

const saveEdit = (chatId, messageId) => {
  emit('edit-message', {
    messageId: messageId,
    chatId: chatId,
    action: 'Edit',
    textContent: editedText.value,
    attachments: editedAttachments.value
  })
  cancelEdit()
}

const cancelEdit = () => {
  editingMessageId.value = null
  editedText.value = ''
  editedAttachments.value = []
}

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
  const user = props.users.find((u) => u._id === userId)
  return user ? user?.profile?.displayName : 'Unknown User'
}

const getUserAvatar = (userId) => {
  const user = props.users.find((u) => u._id === userId)
  return user ? user?.profile.displayImage : defaultProfilePic
}

const handleItemClick = (event, messageId, chatId, label) => {
  if (label === 'Delete') {
    confirm.require({
      target: event.currentTarget,
      message: 'Are you sure you want to delete this message?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        performAction(messageId, chatId, label)
      },
      reject: () => {}
    })
  } else {
    performAction(messageId, chatId, label)
  }
}

const performAction = (messageId, chatId, action) => {
  if (action === 'Edit') {
    startEdit(messageId)
  } else if (action === 'Delete') {
    emit('delete-message', {
      messageId: messageId,
      chatId: chatId,
      action: action
    })
  }
}

const getImageAttachments = (attachments) => {
  return attachments.filter((attachment) => /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(attachment))
}

const getRegularAttachments = (attachments) => {
  return attachments.filter((attachment) => !/\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(attachment))
}

const downloadAttachment = (url) => {
  const link = document.createElement('a')
  link.href = url
  link.download = getFileName(url)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
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
  background-color: #b6afa9;
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
  background-color: #f1bd91;
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

.image-item {
  position: relative;
}

.image-item .p-button {
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
}

:deep(.p-carousel .p-carousel-indicators) {
  display: none;
}
</style>
