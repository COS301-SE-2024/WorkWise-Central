<template>
  <aside class="chat-sidebar">
    <h2>Chats</h2>
    <span class="p-input-icon-left w-full mb-3">
      <i class="fa: fa-solid fa-search" />
      <InputText v-model="searchQuery" placeholder="Search chats" class="w-full" />
    </span>

    <Button
      label="Create New Chat"
      icon="fa: fa-solid fa-plus"
      @click="showNewChatDialog"
      class="custom-button"
      style="padding-right: 27.8%"
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
        <!-- New typing indicator -->
        <span
          v-if="currentlyTyping.chatId === chat._id && theKidIsNotMySon(currentlyTyping.userId)"
          class="typing-text"
        >
          {{ currentlyTyping.name }} is typing...
        </span>
        <div class="card flex justify-center">
          <Menu :model="items" />
        </div>
        <v-row v-if="chat.unreadCount > 0"
          ><OverlayBadge severity="danger">
            <i class="pi pi-envelope" style="font-size: 2rem" />
            {{ chat.unreadCount }}</OverlayBadge
          ></v-row
        >
      </li>
    </ul>

    <Dialog
      v-model:visible="newChatDialogVisible"
      header="Create New Chat"
      :style="{ width: '40vw' }"
      class="new-chat-dialog"
    >
      <div class="p-fluid pt-5 pb-5">
        <v-row>
          <v-col>
            <label for="chatName">Chat Name<span style="color: red">*</span></label>
          </v-col>
          <v-col>
            <InputText id="chatName" v-model="newChatName" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <label for="participants">Participants<span style="color: red">*</span></label>
          </v-col>
          <v-col>
            <MultiSelect
              id="participants"
              v-model="selectedParticipants"
              :options="availableUsers"
              optionLabel="systemDetails.username"
              placeholder="Select participants"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <label for="participants">Chat Image</label>
          </v-col>
          <v-col>
            <input
              type="file"
              accept="image/*"
              @change="handleFileChange"
              ref="fileInput"
              style="margin-left: 13%"
            />
          </v-col>
        </v-row>
        <!-- File input for images -->

        <v-row>
          <v-col>
            <label for="chatDescription">Chat Description</label>
          </v-col>
          <v-col>
            <Textarea
              id="chatDescription"
              v-model="newChatDescription"
              autoResize
              rows="5"
              cols="50"
            />
          </v-col>
        </v-row>
      </div>

      <template #footer>
        <div class="pt-5">
          <Button
            label="Cancel"
            icon="fa: fa-solid fa-times"
            @click="closeNewChatDialog"
            class="p-button-text"
            style="background-color: red; outline-color: red; color: white; margin-right: 5px"
          />
          <Button
            label="Create"
            icon="fa: fa-solid fa-check"
            class="custom-button"
            @click="createNewChat"
          />
        </div>
      </template>
    </Dialog>
  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Avatar from 'primevue/avatar'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import MultiSelect from 'primevue/multiselect'
//import FileUpload from 'primevue/fileupload'
import OverlayBadge from 'primevue/overlaybadge'
import Textarea from 'primevue/textarea'

const props = defineProps(['chats', 'selectedChat', 'users', 'typingUsers'])
const emit = defineEmits(['select-chat', 'create-chat'])

const searchQuery = ref('')
const newChatDialogVisible = ref(false)
const newChatName = ref('')
const newChatDescription = ref('')
const selectedParticipants = ref([])
const currentUserId = localStorage['id']

const fileInput = ref(null)
const selectedImage = ref(null)
const base64Image = ref(null)
let currentlyTyping = ref({})
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
    ////console.log('Test', participants)
    emit('create-chat', {
      name: newChatName.value,
      participants: participants,
      chatImage: base64Image,
      chatDescription: newChatDescription
    })
    closeNewChatDialog()
  }
}

watch(props.typingUsers, () => updateTypingUsers())
const updateTypingUsers = () => {
  console.log('Typing users', props.typingUsers)

  const len = props.typingUsers.length - 1
  if (len > 0) {
    currentlyTyping.value = props.typingUsers[len]
    console.log(currentlyTyping.value)
    setTimeout(() => {
      currentlyTyping.value = {}
    }, 7000)
  }
}

const theKidIsNotMySon = (userId) => {
  //HeeHee
  return userId !== currentUserId
}
</script>

<style scoped>
.custom-button {
  background-color: #4c9fc3;
  outline-color: #4c9fc3;
  border: none; /* Add this line to remove the green outline */
}

.custom-button:hover {
  background-color: #4c9fc3 !important; /* Ensure hover color matches */
  border: none !important; /* Add this line to remove the green outline */
}

.chat-sidebar {
  width: 300px;
  padding: 1rem;
  height: 100%;
}

.new-chat-dialog {
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
  background-color: grey; /* Use theme highlighter color */
}

.chat-list li.selected {
}

.chat-list li span {
  margin-left: 1rem;
}

:deep(.p-inputtext) {
}

.p-inputtext {
  margin-bottom: 12px;
  margin-left: 7px;
}

.typing-text {
  color: #31864d; /*TODO: Make into dynamic/visible colour*/
  font-style: italic;
  font-size: smaller;
}
</style>
