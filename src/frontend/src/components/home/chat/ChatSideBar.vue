<template>
  <aside class="chat-sidebar">
    <h2>Chats</h2>
    <span class="p-input-icon-left w-full mb-3">
      <i class="fa: fa-solid fa-search" />
      <InputText v-model="searchQuery" placeholder="Search chats" class="w-full" />
    </span>
    <Button
      label="New Chat"
      icon="fa: fa-solid fa-plus"
      @click="showNewChatDialog"
      class="p-button-outlined mb-3 w-full"
    />

    <ul class="chat-list">
      <li
        v-for="chat in filteredChats"
        :key="chat._id"
        @click="selectChat(chat)"
        :class="{ selected: selectedChat && chat._id === selectedChat._id }"
      >
        <Avatar
          :image="
            chat.image
              ? chat.image
              : 'https://img.icons8.com/?size=100&id=14599&format=png&color=000000'
          "
          size="large"
          shape="circle"
        />
        <span>{{ chat.name }}</span>
        <div class="card flex justify-center">
          <Menu :model="items" />
        </div>
      </li>
    </ul>

    <Dialog
      v-model:visible="newChatDialogVisible"
      header="Create New Chat"
      :style="{ width: '50vw' }"
      class="new-chat-dialog"
    >
      <div class="p-fluid">
        <div class="p-field">
          <label for="chatName">Chat Name</label>
          <InputText id="chatName" v-model="newChatName" />
        </div>

        <div class="p-field">
          <label for="participants">Participants</label>
          <MultiSelect
            id="participants"
            v-model="selectedParticipants"
            :options="availableUsers"
            optionLabel="systemDetails.username"
            placeholder="Select participants"
          />
        </div>

        <div class="p-field">
          <label for="participants">Chat Image</label>
          <!-- File input for images -->
          <input type="file" accept="image/*" @change="handleFileChange" ref="fileInput" />
        </div>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="fa: fa-solid fa-times"
          @click="closeNewChatDialog"
          class="p-button-text"
        />
        <Button label="Create" icon="fa: fa-solid fa-check" @click="createNewChat" autofocus />
      </template>
    </Dialog>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import MultiSelect from 'primevue/multiselect'
//import FileUpload from 'primevue/fileupload'

const props = defineProps(['chats', 'selectedChat', 'users'])
const emit = defineEmits(['select-chat', 'create-chat'])

const searchQuery = ref('')
const newChatDialogVisible = ref(false)
const newChatName = ref('')
const selectedParticipants = ref([])
const currentUserId = localStorage['id']

const fileInput = ref(null)
const selectedImage = ref(null)
const base64Image = ref(null)

const items = ref([
  { label: 'Delete', icon: 'pi pi-plus' },
  { label: 'Search', icon: 'pi pi-search' }
])

const handleFileChange = (event) => {
  const files = event.target.files
  if (files.length > 0) {
    selectedImage.value = files[0]
    convertToBase64(files[0])
  }
}

const filteredChats = computed(() => {
  return props.chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const availableUsers = computed(() => {
  return props.users.filter((user) => user._id !== currentUserId)
})

const selectChat = (chat) => {
  emit('select-chat', chat)
}

const showNewChatDialog = () => {
  newChatDialogVisible.value = true
}

const closeNewChatDialog = () => {
  newChatDialogVisible.value = false
  newChatName.value = ''
  selectedParticipants.value = []
}

const convertToBase64 = (f) => {
  const file = f
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      base64Image.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

const createNewChat = () => {
  if (newChatName.value && selectedParticipants.value.length > 0) {
    const chatName = newChatName.value
    let participants = [currentUserId]
    for (const vElement of selectedParticipants.value) {
      participants.push(vElement._id)
    }
    if (chatName.length === 0) {
      console.log('No empty chat names allowed')
      //TOOO: Error toast
      return
    }
    //console.log('Test', participants)
    emit('create-chat', {
      name: newChatName.value,
      participants: participants,
      chatImage: base64Image
    })
    closeNewChatDialog()
  }
}
</script>

<style scoped>
.chat-sidebar {
  width: 300px;
  background-color: rgba(172, 211, 223, 0.2);
  border-right: 1px solid #e0e0e0;
  padding: 1rem;
  height: 100%;
}

.new-chat-dialog {
  background-color: #f4f4f4;
  border: 1px solid #e0e0e0;
  padding: 1rem;
}

.chat-list {
  list-style-type: none;
  padding: 0;
}

.chat-list li {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.chat-list li:hover {
  background-color: #e0e0e0;
}

.chat-list li.selected {
  background-color: #d0d0d0;
}

.chat-list li span {
  margin-left: 1rem;
}

:deep(.p-inputtext) {
  background-color: #ffffff;
  color: #495057;
}

.p-inputtext {
  margin-bottom: 12px;
  margin-left: 7px;
}
</style>
