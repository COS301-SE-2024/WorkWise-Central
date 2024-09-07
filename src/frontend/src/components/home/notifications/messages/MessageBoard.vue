<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Message Board</h2>
      </v-col>
    </v-row>
    <v-card class="bg-cardColor">
      <v-row>
        <v-col cols="12" lg="2">
          <v-card class="bg-cardColor">
            <v-card-title>Chats</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                variant="outlined"
                color="primary"
              ></v-text-field>
              <v-list>
                <v-list-item
                  v-for="message in filteredMessages"
                  :key="message.id"
                  two-line
                  @click="selectMessage(message)"
                >
                  <v-row
                    ><v-col cols="12" lg="8"
                      ><v-list-item-avatar>
                        <v-avatar :src="person.avatar"></v-avatar>
                        <v-label>{{ message.from }}</v-label>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>{{ message.title }}</v-list-item-title>
                        <v-list-item-subtitle>{{ message.message }}</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text>{{ message.date }}</v-list-item-action-text>
                      </v-list-item-action></v-col
                    >
                    <v-col cols="12" lg="4"><v-chip color="primary">6</v-chip></v-col></v-row
                  >

                  <v-divider></v-divider>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" lg="10">
          <v-card class="bg-cardColor">
            <v-card-title>
              <v-avatar :src="selectedPerson.avatar"></v-avatar>
              <h4>{{ selectedPerson.name }}</h4>
              <v-btn><v-icon icon="fa:fa-solid fa-phone"></v-icon></v-btn>
              <v-btn><v-icon icon="fa:fa-solid fa-magnifying-glass"></v-icon></v-btn>
              <v-btn @click="openMore"><v-icon icon="fa: fa-solid fa-ellipsis"></v-icon></v-btn>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-list>
                <v-list-item v-for="chat in filteredChatBoard" :key="chat.id" two-line>
                  <v-list-item-content>
                    <v-sheet
                      :class="{
                        'sent-message': chat.from === person.name,
                        'received-message': chat.from !== person.name
                      }"
                    >
                      <v-list-item-title>{{ chat.from }}</v-list-item-title>
                      <v-list-item-subtitle>{{ chat.message }}</v-list-item-subtitle>
                      <v-list-item-action-text>{{ chat.date }}</v-list-item-action-text>
                    </v-sheet>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="bg-cardColor">
              <v-btn><v-icon icon="fa:fa-regular fa-face-smile"></v-icon></v-btn>
              <v-btn><v-icon icon="fa:fa-solid fa-paperclip"></v-icon></v-btn>
              <v-text-field
                v-model="text"
                single-line
                hide-details
                variant="outlined"
                color="primary"
              ></v-text-field>
              <v-btn><v-icon icon="fa: fa-solid fa-paper-plane"></v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <!-- <v-col cols="12" lg="2" v-if="open === true">
          <v-card >
            <v-card-title>Chats</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                variant="outlined"
                color="primary"
              ></v-text-field>
            </v-card-text>
          </v-card>
        </v-col> -->
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MessageBoard',
  data() {
    return {
      search: '',
      text: '',
      open: false,
      person: {
        name: 'John Doe',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        email: 'johndoe@gmail.com'
      },
      selectedPerson: {
        name: '',
        avatar: ''
      },
      messages: [
        {
          id: 1,
          from: 'John Doe',
          title: 'Message 1',
          message: 'This is message 1',
          date: '2021-09-01',
          time: '12:00'
        },
        {
          id: 2,
          from: 'John Doe',
          title: 'Message 2',
          message: 'This is message 2',
          date: '2021-09-02',
          time: '12:00'
        },
        {
          id: 3,
          title: 'Message 3',
          from: 'John Doe',
          message: 'This is message 3',
          date: '2021-09-03',
          time: '12:00'
        },
        {
          id: 4,
          from: 'John Doe',
          title: 'Message 4',
          message: 'This is message 4',
          date: '2021-09-04',
          time: '12:00'
        },
        {
          id: 5,
          from: 'John Doe',
          title: 'Message 5',
          message: 'This is message 5',
          date: '2021-09-05',
          time: '12:00'
        },
        {
          id: 6,
          from: 'John Doe',
          title: 'Message 6',
          message: 'This is message 6',
          date: '2021-09-06',
          time: '12:00'
        },
        {
          id: 7,
          from: 'John Doe',
          title: 'Message 7',
          message: 'This is message 7',
          date: '2021-09-07',
          time: '12:00'
        },
        {
          id: 8,
          from: 'John Doe',
          title: 'Message 8',
          message: 'This is message 8',
          date: '2021-09-08',
          time: '12:00'
        },
        {
          id: 9,
          from: 'John Doe',
          title: 'Message 9',
          message: 'This is message 9',
          date: '2021-09-09',
          time: '12:00'
        },
        {
          id: 10,
          from: 'John Doe',
          title: 'Message 10',
          message: 'This is message 10',
          date: '2021-09-10',
          time: '12:00'
        }
      ],
      chatBoard: [
        {
          id: 1,
          from: 'John Doe',
          to: 'Jane Doe',
          message: 'This is message 1',
          date: '2021-09-01'
        },
        {
          id: 2,
          from: 'Jane Doe',
          to: 'John Doe',
          message: 'This is a reply',
          date: '2021-09-01'
        }
      ]
    }
  },
  methods: {
    openMore() {
      this.open = !this.open
    },
    selectMessage(message: any) {
      this.selectedPerson.name = message.from
      this.selectedPerson.avatar = this.person.avatar // Set the avatar accordingly
    }
  },
  computed: {
    filteredMessages() {
      return this.messages.filter(
        (message) =>
          message.title.toLowerCase().includes(this.search.toLowerCase()) ||
          message.message.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    filteredChatBoard() {
      return this.chatBoard.filter(
        (chat) =>
          (chat.from === this.selectedPerson.name && chat.to === this.person.name) ||
          (chat.to === this.selectedPerson.name && chat.from === this.person.name)
      )
    }
  }
})
</script>

<style>
.sent-message {
  background-color: #e1ffc7;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  align-self: flex-end;
  max-width: 70%;
}

.received-message {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  align-self: flex-start;
  max-width: 70%;
}

.v-list-item-content {
  display: flex;
  flex-direction: column;
}
</style>
