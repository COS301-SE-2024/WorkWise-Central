<template>
  <v-container class="d-flex pa-0" fluid>
    <v-row>
      <!-- Header Section -->
      <v-col cols="12" sm="4" class="fixed z-10 pa-0">
        <v-app-bar app color="#F0F0F0" flat>
          <v-row>
            <v-col class="d-flex align-center pl-5" cols="2">
              <v-avatar size="50" color="red" image="">
              </v-avatar>
            </v-col>
            <v-col class="d-flex justify-center align-center" offset="1" cols="2">
              <v-icon color="#515151">mdi-account-group</v-icon>
            </v-col>
          </v-row>
        </v-app-bar>

        <v-row no-gutters class="px-2 py-2 pt-5 pb-2">
          <v-text-field
            v-model="search"
            placeholder="Start a new chat"
            solo-inverted
            hide-details
            class="pa-0"
            @click="showFindFriends = !showFindFriends"
            append-icon="mdi-magnify"
          ></v-text-field>
        </v-row>
        <v-divider class="pt-3"></v-divider>
      </v-col>
      <!-- Main Content Section -->
      <v-col class="pt-28">
        <v-container fluid>
          <v-row>
            <v-col>
              <div v-if="showFindFriends">
                <!--                <FindFriendsView :userComputed="users"/>-->
              </div>
              <div v-else>
                <ChatsView />
              </div>
            </v-col>

            <!-- Chat View Section -->
            <v-col cols="12" sm="8" class="fixed ml-auto pa-0">
              <div v-if="userDataForChat.length">
                <!--                <MessageView />-->
              </div>
              <div v-else>
                <v-container fluid class="fill-height d-flex align-center justify-center grey lighten-3">
                  <div class="text-center">
                    <v-icon size="48px" color="grey">mdi-chat</v-icon>
                    <h1 class="font-weight-light grey--text text--darken-2">WorkWise Chat</h1>
                    <p class="grey--text text--darken-1">Send and receive messages to colleagues</p>
                  </div>
                </v-container>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import FindFriendsView from './FindFriendsView.vue'
import ChatsView from './ChatsView.vue'
import MessageView from './MessageView.vue'

const showFindFriends = ref(false);
const search = ref('');
const userDataForChat = ref([]); // You can replace with actual data

// Mock data
const users = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    picture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    picture: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    picture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    picture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
];
</script>