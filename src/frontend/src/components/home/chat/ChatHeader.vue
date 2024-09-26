<template>
  <div
    v-if="chat"
    class="chat-header"
    @click="togglePopover"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{ 'hover-orange': hover }"
  >
    <v-col cols="1" class="p-0 m-0">
      <Avatar :image="chat?.image ? chat?.image : defaultChatPic" size="large" shape="circle" />
    </v-col>
    <v-col cols="6" class="p-0 m-0">
      <v-row>
        <h2>{{ chat?.name }}</h2>
      </v-row>
      <!--      <v-row>-->
      <!--        <div v-for="participant in participants" :key="participant._id" class="participant">-->
      <!--          <span>{{ participant.profile.displayName }}</span>-->
      <!--        </div>-->
      <!--      </v-row>-->
    </v-col>
    <v-col cols="5" style="display: flex; flex-direction: row; justify-content: flex-end">
      <AvatarGroup>
        <Avatar
          v-for="participant in participants"
          :image="participant.profile.displayImage"
          :key="participant._id"
          size="large"
          shape="circle"
        />
      </AvatarGroup>
      <ChatHeaderPopover
        class="chat-header"
        :chat="chat"
        :participants="participants"
        ref="childComponentRef"
        @update-chat-popover="passOnChatUpdate"
        @delete-chat-popover="passOnChatDelete"
      ></ChatHeaderPopover>
    </v-col>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'
import Avatar from 'primevue/avatar'
import AvatarGroup from 'primevue/avatargroup'
import ChatHeaderPopover from '@/components/home/chat/ChatHeaderPopover.vue'

let hover = false
const defaultChatPic = 'https://img.icons8.com/?size=100&id=14599&format=png&color=000000'
const props = defineProps(['chat', 'participants'])
const emit = defineEmits(['update-chat', 'delete-chat'])

const passOnChatUpdate = (editedChat) => {
  emit('update-chat', editedChat)
  //console.log('header', editedChat)
}

const passOnChatDelete = (editedChat) => {
  emit('delete-chat', editedChat)
  //console.log('header', editedChat)
}

const childComponentRef = ref()

const togglePopover = (event) => {
  //console.log(childComponentRef)
  childComponentRef.value.toggle(event)
}

const isDarkMode = ref(false)

function toggleTheme() {
  const body = document.body
  if (isDarkMode.value) {
    body.classList.add('dark-mode')
  } else {
    body.classList.remove('dark-mode')
  }
}
</script>

<style scoped>
.chat-header {
  background-color: var(--background); /* Use theme background */
  padding: 10px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--highlighter-color); /* Adapted border for theme */
  transition: background-color 0.3s ease;
}

.chat-header:hover {
  background-color: var(--primary-color); /* Change background on hover */
  cursor: pointer;
}

.chat-header h2 {
  margin-left: 1rem;
  font-size: 1.2rem;
  color: var(--heading-text-color); /* Use theme heading color */
}

.hover-orange {
  background-color: orange;
}

.participant-area {
  margin-left: 40%;
  display: flex;
  align-items: flex-end;
  align-content: end;
}

.participant {
  margin-left: 1%;
  font-size: medium;
  display: flex;
  align-items: flex-end;
  align-content: end;
}

.p-avatar {
  border: 2px solid var(--element-text-color); /* Border for avatar */
}

.p-avatar-group .p-avatar {
  margin-right: 5px; /* Spacing for avatars in the group */
}

.p-avatar-group {
  align-items: center;
}

.p-tooltip {
  background-color: var(--highlighter-color); /* Tooltip background color */
  color: var(--element-text-color); /* Tooltip text color */
}
</style>
