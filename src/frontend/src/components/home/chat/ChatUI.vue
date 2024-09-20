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
            selectedChat?.image ? selectedChat?.image : defaultChatPic
          "
          size="large"
          shape="circle"
        />
        <h2>{{ selectedChat?.name }}</h2>
        <div class="participant-area">
          <div
            v-for="participant in selectedChat?.participants"
            :key="participant._id"
            class="participant"
          >
            <Avatar :image="participant.profile.displayImage" size="small" shape="circle" />
            <span>{{ participant.profile.displayName }}</span>
          </div>
        </div>
      </header>
      <ChatMessageList
        v-if="selectedChat"
        :messages="currentMessages"
        :users="users"
        @edit-message="editMessage"
        @delete-message="deleteMessage"
      />
      <ChatInput
        @send-message="sendMessageWithSockets"
        :disabled="!selectedChat"
        v-if="selectedChat"
      />
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
import { io } from 'socket.io-client'
import { API_URL } from '@/main'

const socket = io(`${API_URL}chat-space`, {
  autoConnect: true,
  transports: ['websocket', 'polling', 'flashsocket']
})

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
      //currentUser: { id: 1, name: 'You', avatar: '@/assets/images/avatars/you.jpg' },
      users: [],
      chats: [],
      selectedChat: null,
      messages: [],
      server_url: API_URL
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

    socket.connect()

    socket.on('connect', async () => {
      console.log('Socket connected')
      await this.setupSockets()
    })

    socket.on('disconnect', () => {
      console.log('Socket disconnected')
    })

    socket.on('init-chat', (data) => {
      console.log('User Joined rooms', data)
    })

    socket.on('new-message', (data) => {
      this.handleNewMessage(data)
    })

    socket.on('update-message', (data) => {
      this.handleUpdateMessage(data)
    })

    socket.on('delete-message', (data) => {
      this.handleDeleteMessage(data)
    })

    socket.on('delete-chat', () => {
      this.handleDeleteChat(data)
    })
  },
  methods: {
    getAllUsers() {
      console.log('Get all Users')
      //console.log(API_URL)
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
      this.createNewChatHelper(newChat.name, newChat.participants, newChat.chatImage)
    },
    async createNewChatHelper(chatName, userIdsForChat, chatImage) {
      console.log(chatImage)
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      userIdsForChat.push(localStorage['id'])

      const spreadElements = {
        chatName: chatName,
        participants: userIdsForChat
      }
      if (chatImage != null) {
        spreadElements.chatImage = chatImage.value
      }
      const result = await axios.post(
        `${this.server_url}chat/create`,
        { ...spreadElements },
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

      const result = await axios.post(
        `${this.server_url}chat/add-users`,
        {
          chatId: chatId,
          userIds: userIds
        },
        config
      )
      console.log(result)

      if (result.status >= 200 && result.status < 300) {
        //console.log('new chat', result.data.data)
        if (result.data.data._id) {
          //this.chats.push(result.data.data)
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Action was successful',
            life: 3000
          })
        }
      } else {
        console.log('Error adding users')
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: `There is probably something wrong with the server. Please try again later.`,
          life: 3000
        })
      }
    },
    async getUserChats() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const result = await axios.get(`${this.server_url}chat/user-chats`, config)
      console.log('Get All User Chats', result)
      if (result.status >= 200 && result.status < 300) {
        console.log('new chat', result.data.data)
        if (result.data.data) {
          const chats = result.data.data
          for (const chat of chats) {
            this.chats.push(chat)
          }
          /*this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Chat created successfully',
            life: 3000
          })*/
        }
      } else {
        console.log('Error Retrieving chats')
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
          life: 3000
        })
      }
    },
    async getMessagesInChat(chatId) {
      console.log('chatId is', chatId)
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const result = await axios.get(`${this.server_url}chat/chat-messages/${chatId}`, config)
      console.log('Result of FetchMessages', result)
      if (result.status >= 200 && result.status < 300) {
        console.log('Fetching Messages', result.data.data)
        if (result.data.data) {
          const messages = result.data.data
          for (const message of messages) {
            if (!this.messages[chatId]) {
              this.messages[chatId] = []
            }
            this.messages[chatId].push(message)
          }
          /*this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Chat created successfully',
            life: 3000
          })*/
        }
      } else {
        console.log('Error Retrieving Messages')
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Something went wrong',
          life: 3000
        })
      }
    },
    async sendMessageWithSockets({ content, attachments }) {
      if (this.selectedChat) {
        //console.log('sending', content, attachments)
        socket
          .emitWithAck('new-message', {
            jwt: localStorage['access_token'],
            chatId: this.selectedChat._id,
            textContent: content ? content : '##image_only##',
            attachments: attachments
          })
          .then((data) => {
            console.log('Message success', data)
          })
      }
    },
    // async sendMessageHelper(content, attachments) {}
    async setupSockets() {
      console.log('Init chat')
      socket.emitWithAck('init-chat', { jwt: localStorage['access_token'] }).then((data) => {
        console.log('Init chat data', data)
      })
    },
    handleNewMessage(data) {
      console.log('New message received', data)
      if (!this.messages[data.chatId]) {
        //chat not found
        console.log('Chat not found')
        this.messages[data.chatId] = []
      }
      this.messages[data.chatId].push(data)
    },
    handleDeleteMessage(data) {
      console.log('Delete message received', data)
      if (!this.messages[data.chatId]) {
        //chat not found
        //console.log('Chat not found')
        //this.messages[data.chatId] = []
        return
      }
      const index = this.messages[data.chatId].findIndex((m) => m._id === data._id)
      if (index !== -1) {
        this.messages[data.chatId].splice(index, 1)
      }
    },
    handleUpdateMessage(data) {
      console.log('Update message received', data)
      if (!this.messages[data.chatId]) {
        return
      }
      const index = this.messages[data.chatId].findIndex((m) => m._id === data._id)
      if (index !== -1) {
        this.messages[data.chatId][index].textContent = data.textContent

        if (data.attachments) {
          this.messages[data.chatId][index].attachments = data.attachments
        }
      }
    },
    handleDeleteChat() {
      console.log('Delete chat received', data)
      const index = this.chats.findIndex((c) => c._id === data.chatId)
      if (index !== -1) {
        this.chats.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.participant-area {
  margin-left: 40%;
  display: flex;
  align-items: flex-end;
  align-content: end;
  left: 0;
}

.participant {
  margin-left: 1%;
  font-size: medium;
  display: flex;
  align-items: flex-end;
  align-content: end;
}

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
