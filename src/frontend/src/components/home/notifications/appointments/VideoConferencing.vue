<template>
  <v-container fluid>
    <Toast position="top-center" />
    <!-- Participants Grid -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">{{ meetingName }}</h2>
      </v-col>
      <v-divider></v-divider>
    </v-row>
    <v-row class="d-flex justify-center flex-wrap">
      <v-col
        v-for="participant in participants"
        :key="participant.id"
        cols="12"
        md="6"
        lg="4"
        class="participant-card"
      >
        <v-card>
          <v-img
            v-if="participant.cameraOn"
            :src="participant.videoStream"
            height="200px"
            class="participant-video"
          />
          <v-avatar
            v-else
            size="200"
            class="mx-auto d-flex justify-center align-center"
            color="bg-cardColor"
          >
            <img :src="participant.profilePic" alt="Profile Picture" />
          </v-avatar>

          <v-card-actions>
            <!-- Mute Button -->
            <v-btn icon @click="toggleMute(participant.id)">
              <v-icon v-if="participant.isMuted">mdi-microphone-off</v-icon>
              <v-icon v-else>mdi-microphone</v-icon>
            </v-btn>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="switchCamera(participant.id)">
                  <v-icon>mdi-camera</v-icon>
                </v-btn>
              </template>
              <span>Switch Camera</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Toast Notifications for actions -->
    <Toast ref="toast" />

    <!-- Controls for user -->
    <v-row class="d-flex justify-center">
      <v-btn @click="handleMute">Toggle Mute</v-btn>
      <v-btn @click="handleCamera">Toggle Camera</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'

export default defineComponent({
  name: 'VideoConferencing',
  components: {
    Toast
  },
  data() {
    return {
      participants: [
        {
          id: 1,
          profilePic: 'path/to/profile1.jpg',
          videoStream: 'path/to/video1.mp4',
          cameraOn: true,
          isMuted: false
        },
        {
          id: 2,
          profilePic: 'path/to/profile2.jpg',
          videoStream: 'path/to/video2.mp4',
          cameraOn: false,
          isMuted: true
        },
        {
          id: 3,
          profilePic: 'path/to/profile3.jpg',
          videoStream: 'path/to/video3.mp4',
          cameraOn: true,
          isMuted: false
        },
        {
          id: 4,
          profilePic: 'path/to/profile4.jpg',
          videoStream: 'path/to/video4.mp4',
          cameraOn: true,
          isMuted: true
        },
        {
          id: 5,
          profilePic: 'path/to/profile5.jpg',
          videoStream: 'path/to/video5.mp4',
          cameraOn: false,
          isMuted: false
        },
        {
          id: 6,
          profilePic: 'path/to/profile6.jpg',
          videoStream: 'path/to/video6.mp4',
          cameraOn: true,
          isMuted: true
        },
        {
          id: 7,
          profilePic: 'path/to/profile7.jpg',
          videoStream: 'path/to/video7.mp4',
          cameraOn: false,
          isMuted: false
        },
        {
          id: 8,
          profilePic: 'path/to/profile8.jpg',
          videoStream: 'path/to/video8.mp4',
          cameraOn: true,
          isMuted: true
        },
        {
          id: 9,
          profilePic: 'path/to/profile9.jpg',
          videoStream: 'path/to/video9.mp4',
          cameraOn: false,
          isMuted: false
        },
        {
          id: 10,
          profilePic: 'path/to/profile10.jpg',
          videoStream: 'path/to/video10.mp4',
          cameraOn: true,
          isMuted: false
        },
        {
          id: 11,
          profilePic: 'path/to/profile11.jpg',
          videoStream: 'path/to/video11.mp4',
          cameraOn: false,
          isMuted: true
        },
        {
          id: 12,
          profilePic: 'path/to/profile12.jpg',
          videoStream: 'path/to/video12.mp4',
          cameraOn: true,
          isMuted: false
        }
      ],
      isUserMuted: false,
      isUserCameraOn: true,
      meetingName: 'Weekly Standup Meeting'
    }
  },
  methods: {
    toggleMute(participantId: number) {
      const participant = this.participants.find((p) => p.id === participantId)
      if (participant) {
        participant.isMuted = !participant.isMuted
        this.$toast.add({
          severity: participant.isMuted ? 'info' : 'warn',
          summary: 'Audio',
          detail: participant.isMuted ? 'Muted' : 'Unmuted',
          life: 3000
        })
      }
    },
    switchCamera(participantId: number) {
      const participant = this.participants.find((p) => p.id === participantId)
      if (participant) {
        participant.cameraOn = !participant.cameraOn
        this.$toast.add({
          severity: 'info',
          summary: 'Camera',
          detail: participant.cameraOn ? 'Camera On' : 'Camera Off',
          life: 3000
        })
      }
    },
    handleMute() {
      this.isUserMuted = !this.isUserMuted
    },
    handleCamera() {
      this.isUserCameraOn = !this.isUserCameraOn
    }
  }
})
</script>

<style scoped>
.participant-video {
  object-fit: cover;
}
</style>
