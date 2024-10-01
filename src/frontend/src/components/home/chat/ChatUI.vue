<template>
  <div class="chat-app">
    <ChatSidebar
      :chats="chats"
      :selectedChat="selectedChat"
      :users="users"
      :typing-users="typingUsers"
      @select-chat="selectChat"
      @create-chat="createChat"
    />
    <div class="chat-main">
      <ChatHeader
        v-if="selectedChat"
        :chat="selectedChat"
        :participants="selectedChat?.participants"
        @update-chat="updateChat"
        @delete-chat="deleteChat"
      >
        <!--        <ChatHeaderPopover v-if="selectedChat"></ChatHeaderPopover>-->
      </ChatHeader>
      <ChatMessageList
        v-if="selectedChat"
        :messages="currentMessages"
        :users="users"
        @edit-message="editMessage"
        @delete-message="deleteMessage"
      />
      <ChatInput
        @send-message="sendMessageWithSockets"
        @typing="sendTyping"
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
import axios from 'axios'
import { io } from 'socket.io-client'
import { API_URL } from '@/main'
import ChatHeader from '@/components/home/chat/ChatHeader.vue'
import { ref } from 'vue'

const socket = io(`${API_URL}chat-space`, {
  autoConnect: true,
  transports: ['websocket', 'polling', 'flashsocket']
})

export default {
  components: {
    ChatSidebar,
    ChatHeader,
    ChatMessageList,
    ChatInput
  },
  data() {
    return {
      defaultChatPic: 'https://img.icons8.com/?size=100&id=105326&format=png&color=000000',
      defaultProfilePic: 'http://www.gravatar.com/avatar/?d=mp',
      //currentUser: { id: 1, name: 'You', avatar: '@/assets/images/avatars/you.jpg' },
      users: [],
      typingUsers: [],
      chats: [],
      chatMessageCount: [],
      selectedChat: null,
      messages: ref([]),
      server_url: API_URL,
      unreadCount: [],
      intervalId: null
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
        console.log('User chats', this.chats)
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

    socket.on('delete-chat', (data) => {
      this.handleDeleteChat(data)
    })

    socket.on('update-chat', (data) => {
      this.handleUpdateChat(data)
    })

    socket.on('typing', (data) => {
      this.handleTyping(data)
    })

    socket.on('unread-messages', (data) => {
      this.handleUnreadMessages(data)
    })

    this.getNumberUnreadMessages()
    this.startInterval()
  },
  beforeUnmount() {
    this.clearInterval()
  },
  methods: {
    getAllUsers() {
      console.log('Get all Users')
      console.log(API_URL)
      const companyId = localStorage['currentCompany']
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      axios
        .get(`${this.server_url}users/all/company/${companyId}`, config) //All in company
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
      socket.emit('reading-chat', { jwt: localStorage['access_token'], chatId: chat._id })
    },
    createChat(newChat) {
      this.createNewChatHelper(
        newChat.name,
        newChat.participants,
        newChat.chatImage,
        newChat.chatDescription
      )
    },
    async createNewChatHelper(chatName, userIdsForChat, chatImage, chatDescription) {
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
      if (chatDescription != null) {
        spreadElements.description = chatDescription.value
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

          // this.$set(this.messages, chat._id, [])
          // this.selectChat(chat)
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
        console.log('new chat', result.data.data)
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
        console.log('sending', content, attachments)
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
      // window.console.log('Delete message received', JSON.stringify(data))
      // window.console.log('messages is', this.messages)
      // window.console.log('data is', JSON.stringify(data))
      if (!this.messages[data.chatId]) {
        //chat not found
        console.log('Message not found')
        this.messages[data.chatId] = []
        return
      }
      const index = this.messages[data.chatId].findIndex((m) => m._id === data.messageId)
      if (index !== -1) {
        this.messages[data.chatId].splice(index, 1)
        console.log('Done filtering')
      } else {
        console.log('Could not locate in array')
        console.log(data)
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
    handleDeleteChat(data) {
      console.log('Delete chat received', data)
      const index = this.chats.findIndex((c) => c._id === data._id)
      if (index !== -1) {
        this.chats.splice(index, 1)
      }
    },
    handleUpdateChat(data) {
      console.log('Update chat received', data)
      const index = this.chats.findIndex((c) => c._id === data.chatId)
      if (index !== -1) {
        this.chats[index] = { ...this.chats[index], ...data }
      }
    },
    async editMessage({ messageId, chatId, action, textContent, attachments }) {
      console.log(messageId)
      console.log(action)
      socket
        .emitWithAck('update-message', {
          jwt: localStorage['access_token'],
          chatId: chatId,
          messageId: messageId,
          body: textContent,
          attachments: attachments
        })
        .then((data) => {
          console.log('Edit message success', data)
          // if (data.success === true) {
          //   //show toast
          // }
        })
    },
    async deleteMessage({ messageId, chatId, action }) {
      console.log(messageId)
      console.log(action)
      socket
        .emitWithAck('delete-message', {
          jwt: localStorage['access_token'],
          chatId: chatId,
          messageId: messageId
        })
        .then((data) => {
          console.log('Delete message success', data)
          console.log(this.messages)
          //this.messages = this.messages.filter((m) => m._id === data?.messageId)
          // if (data.success === true) {
          //   //show toast
          // }
        })
    },
    async updateChat(updatedChatData) {
      let args = {
        jwt: localStorage['access_token'],
        chatId: updatedChatData._id
      }
      if (updatedChatData.name) {
        args.name = updatedChatData.name
      }
      if (updatedChatData.image) {
        args.image = updatedChatData.image
      }
      if (updatedChatData.description) {
        args.description = updatedChatData.description
      }
      if (updatedChatData.admin) {
        args.admin = updatedChatData.admin
      }
      if (updatedChatData.participants) {
        args.participants = updatedChatData.participants
      }
      console.log(args)
      socket.emitWithAck('update-chat', args).then((data) => {
        console.log('Edit message success', data)
        // if (data.success === true) {
        //   //show toast
        // }
      })
    },
    async deleteChat(updatedChatData) {
      socket
        .emitWithAck('delete-chat', {
          jwt: localStorage['access_token'],
          chatId: updatedChatData._id
        })
        .then((data) => {
          console.log('Delete chat success', data)
          this.chats = this.chats.filter((chat) => chat._id !== updatedChatData._id)
          this.selectedChat = null
        })
        .catch((error) => {
          console.error('Delete chat error', error)
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to delete chat',
            life: 3000
          })
        })
    },
    async sendTyping() {
      if (this.selectedChat) {
        socket.emit('typing', {
          jwt: localStorage['access_token'],
          chatId: this.selectedChat._id
        })
      }
    },
    async getNumberUnreadMessages() {
      for (const chat of this.chats) {
        socket.emit('unread-messages', {
          jwt: localStorage['access_token'],
          chatId: chat._id
        })
      }
    },
    handleTyping(data) {
      console.log('handlingTyping ', data)
      this.typingUsers.push(data)
      if (this.typingUsers.length > 50) {
        this.typingUsers.splice(1, 47)
      }
    },
    handleUnreadMessages(data) {
      console.log('unread-messages', data)
      for (const datum of data.data) {
        this.chatMessageCount[datum.chatId] = datum.unreadCount
        this.chats['unreadCount'] = datum.unreadCount
      }
    },
    startInterval() {
      this.intervalId = setInterval(this.getNumberUnreadMessages, 5000)
    },
    clearInterval() {
      clearInterval(this.intervalId)
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
  height: 93vh;
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
}

.chat-icon {
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
}

.no-chat-selected h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.no-chat-selected p {
  font-size: 1rem;
}
</style>
