<template>
  <v-container fluid>
    <Toast position="top-center" />

    <!-- Meeting Name -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">{{ meetingName }}</h2>
      </v-col>
      <v-divider></v-divider>
    </v-row>

    <!-- Add this below the meeting name -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <div id="jitsi-container" style="height: 500px; width: 100%"></div>
      </v-col>
    </v-row>

    <!-- Layout Toggle Button -->
    <v-row class="d-flex justify-center">
      <v-btn @click="toggleLayout">{{
        layout === 'grid' ? 'Switch to List View' : 'Switch to Grid View'
      }}</v-btn>
    </v-row>

    <!-- Participants Grid or List -->
    <v-row class="d-flex justify-center flex-wrap" v-if="layout === 'grid'">
      <v-col
        v-for="participant in participants"
        :key="participant.id"
        cols="12"
        md="6"
        lg="4"
        class="participant-card"
      >
        <v-card border="md">
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
              <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props" @click="switchCamera(participant.id)">
                  <v-icon>mdi-camera</v-icon>
                </v-btn>
              </template>
              <span>Switch Camera</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Participants List -->
    <v-row class="d-flex justify-center" v-else>
      <v-col
        cols="12"
        v-for="participant in participants"
        :key="participant.id"
        class="participant-list-item"
      >
        <v-card>
          <v-row>
            <v-col cols="2">
              <v-avatar
                v-if="!participant.cameraOn"
                size="75"
                class="mx-auto d-flex justify-center align-center"
                color="bg-cardColor"
              >
                <img :src="participant.profilePic" alt="Profile Picture" />
              </v-avatar>
              <v-img
                v-else
                :src="participant.videoStream"
                height="75px"
                class="participant-video"
              />
            </v-col>
            <v-col cols="8" class="d-flex align-center">
              <span>{{ participant.id }} - {{ participant.isMuted ? 'Muted' : 'Unmuted' }}</span>
            </v-col>
            <v-col cols="2" class="d-flex align-center">
              <v-btn icon @click="toggleMute(participant.id)">
                <v-icon v-if="participant.isMuted">mdi-microphone-off</v-icon>
                <v-icon v-else>mdi-microphone</v-icon>
              </v-btn>
              <v-btn icon @click="switchCamera(participant.id)">
                <v-icon>mdi-camera</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Toast Notifications -->

    <!-- User Controls -->
    <v-row class="d-flex justify-center">
      <v-btn @click="handleMute">Toggle Mute</v-btn>
      <v-btn @click="handleCamera">Toggle Camera</v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Toast from 'primevue/toast'

interface Participant {
  id: number
  profilePic: string
  videoStream: string
  isMuted: boolean
  cameraOn: boolean
}

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
          profilePic: 'https://randomuser.me/api/portraits',
          videoStream: 'https://source.unsplash.com/random/800x600',
          isMuted: false,
          cameraOn: true
        }
      ] as Participant[],
      isUserMuted: false,
      isUserCameraOn: true,
      meetingName: 'Weekly Standup Meeting',
      layout: 'grid', // Default layout is grid
      jitsiApi: null
    }
  },
  mounted() {
    if (window.JitsiMeetExternalAPI) {
      this.initializeJitsi()
    } else {
      const script = document.createElement('script')
      script.src = 'https://meet.jit.si/external_api.js'
      script.onload = () => this.initializeJitsi()
      document.body.appendChild(script)
    }
  },
  methods: {
    initializeJitsi() {
      const domain = 'meet.jit.si'
      const options = {
        roomName: 'WeeklyStandupMeeting',
        width: '100%',
        height: 500,
        parentNode: document.querySelector('#jitsi-container'),
        configOverwrite: {
          disableSimulcast: false
        },
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false
        }
      }
      this.jitsiApi = new JitsiMeetExternalAPI(domain, options)
    },
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
    },
    toggleLayout() {
      this.layout = this.layout === 'grid' ? 'list' : 'grid'
    }
  },
  beforeUnmount() {
    if (this.jitsiApi) {
      this.jitsiApi.dispose()
    }
  }
})
</script>

<style scoped>
.participant-video {
  object-fit: cover;
}
.participant-list-item {
  margin-bottom: 10px;
}
</style>
