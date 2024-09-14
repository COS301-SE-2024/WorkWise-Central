<template>
  <div class="chat-app">
    <ChatSidebar
      :chats="chats"
      :selectedChat="selectedChat"
      :users="users"
      @select-chat="selectChat"
      @create-chat="createChat"
    />
    <div class="chat-main">
      <header v-if="selectedChat" class="chat-header">
        <Avatar
          :image="
            /*TODO: Fix later */
            selectedChat?.displayImage ? selectedChat?.displayImage : defaultProfilePic
          "
          size="large"
          shape="circle"
        />
        <h2>{{ selectedChat?.name }}</h2>
      </header>
      <ChatMessageList
        v-if="selectedChat"
        :messages="currentMessages"
        :currentUser="currentUser"
        :users="users"
      />
      <ChatInput @send-message="sendMessage" :disabled="!selectedChat" v-if="selectedChat" />
      <div v-else class="no-chat-selected">
        <img src="@/assets/images/background/WorkWiseChat.png" alt="Chat Icon" class="chat-icon" />
        <h1>WorkWise Chat</h1>
        <p>Select a chat or create a new one to start messaging</p>
      </div>
    </div>
  </div>
</template>

<script>
import ChatSidebar from './ChatSideBar.vue'
import ChatMessageList from './ChatMessageList.vue'
import ChatInput from './ChatInput.vue'
import Avatar from 'primevue/avatar'
import axios from 'axios'

export default {
  components: {
    ChatSidebar,
    ChatMessageList,
    ChatInput,
    Avatar
  },
  data() {
    return {
      defaultProfilePic: 'http://www.gravatar.com/avatar/?d=mp',
      currentUser: { id: 1, name: 'You', avatar: '@/assets/images/avatars/you.jpg' },
      users: [],
      chats: [],
      selectedChat: null,
      messages: [],
      server_url: import.meta.env.VITE_SERVER_API
    }
  },
  computed: {
    currentMessages() {
      return this.selectedChat ? this.messages[this.selectedChat._id] || [] : []
    }
  },
  mounted() {
    this.getUserChats()
      .then(() => {
        //console.log('User chats', this.chats)
        for (const chat of this.chats) {
          console.log('Fetching messages for chat', chat)
          this.getMessagesInChat(chat._id)
        }
      })
      .then(() => {
        console.log('All messages fetched')
      })
    this.getAllUsers()
  },
  methods: {
    getAllUsers() {
      console.log('Get all Users')
      const temp = import.meta.env.VITE_SERVER_API
      console.log(temp)
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      axios
        .get(`${this.server_url}users/all`, config)
        .then((res) => {
          if (res.data.status >= 200 && res.data.status < 300) {
            console.error('Failed to get all users')
            //TODO: Display Toast for error
            return
          }
          console.log('All users', res)
          for (const datum of res.data.data) {
            this.users.push(datum)
          }
          //this.users = res.data.data
        })
        .catch((err) => {
          console.error(err)
        })
    },
    selectChat(chat) {
      this.selectedChat = chat
    },
    createChat(newChat) {
      this.createNewChatHelper(newChat.name, newChat.participants)
      /*      const chatId = this.chats.length + 1
      const chat = {
        id: chatId,
        name: newChat.name,
        avatar: '@/assets/images/avatars/group.jpg', // Default group avatar
        participants: [this.currentUser.id, ...newChat.participants]
      }

      this.chats.push(chat)
      this.$set(this.messages, chatId, [])
      this.selectChat(chat)*/
    },
    async createNewChatHelper(chatName, userIdsForChat) {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      userIdsForChat.push(localStorage['id'])

      const result = await axios.post(
        `${this.server_url}chat/create`,
        {
          chatName: chatName,
          participants: userIdsForChat
        },
        config
      )
      console.log(result)

      if (result.status >= 200 && result.status < 300) {
        console.log('new chat', result.data.data)
        if (result.data.data._id) {
          this.chats.push(result.data.data)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Chat created successfully',
            life: 3000
          })
          const chat = result.data.data
          this.selectChat(chat)
          this.$set(this.messages, chat._id, [])
          this.selectChat(chat)
        }
      } else {
        console.log('Error creating chat')
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to create chat',
          life: 3000
        })
      }
    },
    async addNewUsersToChat(chatId, userIds) {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }

const sendMessage = ({ content, attachment }) => {
  if (selectedChat.value) {
    const newMessage = {
      id: currentMessages.value.length + 1,
      senderId: currentUser.value.id,
      content,
      attachment,
      timestamp: new Date()
    };
    if (!messages.value[selectedChat.value.id]) {
      messages.value[selectedChat.value.id] = [];
    }
    messages.value[selectedChat.value.id].push(newMessage);
  }
};
</script>

<style scoped>
.chat-app {
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
}

.chat-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}

.chat-header h2 {
  margin-left: 1rem;
  font-size: 1.2rem;
}

.no-chat-selected {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #f9f9f9;
}

.chat-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
}

.no-chat-selected h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.no-chat-selected p {
  font-size: 1rem;
  color: #666;
}
</style>