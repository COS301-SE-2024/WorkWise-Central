<template>
  <v-container id="Messages" class="pt-1 z-0 overflow-auto fixed" style="height: calc(100vh - 100px); width: 420px;">
    <v-list>
      <v-list-item
        v-for="chat in chats"
        :key="chat.id"
        @click="openChat(chat)"
        class="cursor-pointer"
      >
        <MessageRowComponent :chat="chat" />
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MessageRowComponent from '@/components/home/Chat/MessageRowComponent.vue';

// Mock data for chats
const chats = ref([
  {
    id: 1,
    user: {
      firstName: 'John',
      lastName: 'Doe',
      picture: 'https://via.placeholder.com/48',
      sub: '123',
    },
    sub1: '123',
    sub2: '456',
    sub1HasViewed: true,
    sub2HasViewed: false,
    messages: [
      {
        message: 'Hello, how are you?',
        createdAt: '2023-08-21T10:45:00',
      },
    ],
  },
  {
    id: 2,
    user: {
      firstName: 'Jane',
      lastName: 'Smith',
      picture: 'https://via.placeholder.com/48',
      sub: '456',
    },
    sub1: '123',
    sub2: '456',
    sub1HasViewed: false,
    sub2HasViewed: true,
    messages: [
      {
        message: 'Good to hear from you!',
        createdAt: '2023-08-21T11:00:00',
      },
    ],
  },
]);

// Simulate the user store
const sub = ref('123');
const userDataForChat = ref([]);

// Simulate fetching chat data by ID
const userStore = {
  async getChatById(chatId) {
    console.log('Fetching chat with ID:', chatId);
    // Simulate delay for fetching chat data
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
  async hasReadMessage(data) {
    console.log('Marking messages as read with data:', data);
    // Simulate delay for marking messages as read
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
};

onMounted(async () => {
  if (userDataForChat.value.length) {
    await userStore.getChatById(userDataForChat.value[0].id);
  }
});

const openChat = async (chat) => {
  userDataForChat.value = [
    {
      id: chat.id,
      sub1: chat.sub1,
      sub2: chat.sub2,
      firstName: chat.user.firstName,
      picture: chat.user.picture,
    },
  ];

  try {
    await userStore.getChatById(chat.id);

    let data = {
      id: chat.id,
      key1: 'sub1HasViewed',
      val1: false,
      key2: 'sub2HasViewed',
      val2: false,
    };

    if (chat.sub1 === sub.value || chat.sub2 === sub.value) {
      data.val1 = true;
      data.val2 = true;
    }

    await userStore.hasReadMessage(data);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scoped>
</style>
