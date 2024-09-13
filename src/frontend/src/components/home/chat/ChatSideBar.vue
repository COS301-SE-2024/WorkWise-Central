<template>
  <aside class="chat-sidebar">
    <h2>Chats</h2>
    <span class="p-input-icon-left w-full mb-3">
      <i class="pi pi-search" />
      <InputText v-model="searchQuery" placeholder="Search chats" class="w-full" />
    </span>
    <Button label="New Chat" icon="pi pi-plus" @click="showNewChatDialog" class="p-button-outlined mb-3 w-full" />

    <ul class="chat-list">
      <li
        v-for="chat in filteredChats"
        :key="chat.id"
        @click="selectChat(chat)"
        :class="{ 'selected': selectedChat && chat.id === selectedChat.id }"
      >
        <Avatar :image="chat.avatar" size="large" shape="circle" />
        <span>{{ chat.name }}</span>
      </li>
    </ul>

    <Dialog v-model:visible="newChatDialogVisible" header="Create New Chat" :style="{ width: '50vw' }">
      <div class="p-fluid">
        <div class="p-field">
          <label for="chatName">Chat Name</label>
          <InputText id="chatName" v-model="newChatName" />
        </div>
        <div class="p-field">
          <label for="participants">Participants</label>
          <MultiSelect id="participants" v-model="selectedParticipants" :options="availableUsers" optionLabel="name" placeholder="Select participants" />
        </div>
      </div>
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="closeNewChatDialog" class="p-button-text" />
        <Button label="Create" icon="pi pi-check" @click="createNewChat" autofocus />
      </template>
    </Dialog>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import MultiSelect from 'primevue/multiselect';

const props = defineProps(['chats', 'selectedChat', 'users']);
const emit = defineEmits(['select-chat', 'create-chat']);

const searchQuery = ref('');
const newChatDialogVisible = ref(false);
const newChatName = ref('');
const selectedParticipants = ref([]);

const filteredChats = computed(() => {
  return props.chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const availableUsers = computed(() => {
  return props.users.filter(user => user.id !== currentUser.id);
});

const selectChat = (chat) => {
  emit('select-chat', chat);
};

const showNewChatDialog = () => {
  newChatDialogVisible.value = true;
};

const closeNewChatDialog = () => {
  newChatDialogVisible.value = false;
  newChatName.value = '';
  selectedParticipants.value = [];
};

const createNewChat = () => {
  if (newChatName.value && selectedParticipants.value.length > 0) {
    emit('create-chat', {
      name: newChatName.value,
      participants: selectedParticipants.value.map(user => user.id)
    });
    closeNewChatDialog();
  }
};
</script>

<style scoped>
.chat-sidebar {
  width: 300px;
  background-color: #f4f4f4;
  border-right: 1px solid #e0e0e0;
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
  width: 100%;
  margin-bottom: 10px;
}
</style>