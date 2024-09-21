<template>
  <v-container fluid>
    <Toast position="top-center" />

    <!-- Meeting Name -->
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">{{ meetingName }}</h2>
      </v-col>
    </v-row>

    <!-- Layout Toggle Button -->
    <v-card rounded="md" class="bg-background" border="md">
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
            <video
              v-if="participant.cameraOn"
              ref="participant.videoRef"
              :srcObject="participant.videoStream"
              autoplay
              playsinline
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
                <video
                  v-else
                  ref="participant.videoRef"
                  :srcObject="participant.videoStream"
                  autoplay
                  playsinline
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

      <!-- User Controls -->
      <v-row class="d-flex justify-center">
        <v-btn @click="handleMute">Toggle Mute</v-btn>
        <v-btn @click="handleCamera">Toggle Camera</v-btn>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Toast from 'primevue/toast';
interface Participant {
  id: number;
  profilePic: string;
  videoStream: MediaStream | null;
  isMuted: boolean;
  cameraOn: boolean;
  videoRef: any;
}

export default defineComponent({
  name: 'VideoConferencing',
  components: {
    Toast,
  },
  data() {
    return {
      participants: [
        {
          id: 1,
          profilePic: 'https://randomuser.me/api/portraits',
          videoStream: null,
          isMuted: false,
          cameraOn: true,
          videoRef: ref(null),
        },
      ] as Participant[],
      isUserMuted: false,
      isUserCameraOn: true,
      meetingName: 'Weekly Standup Meeting',
      layout: 'grid', // Default layout is grid
      localStream: null as MediaStream | null,
    };
  },
  methods: {
    async initWebRTC() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        this.localStream = stream;
        this.participants.forEach((participant) => {
          participant.videoStream = stream;
          if (participant.videoRef) {
            participant.videoRef.srcObject = stream;
          }
        });
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    },
    toggleMute(participantId: number) {
      const participant = this.participants.find((p) => p.id === participantId);
      if (participant && this.localStream) {
        const audioTrack = this.localStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        participant.isMuted = !audioTrack.enabled;
        this.$toast.add({
          severity: participant.isMuted ? 'info' : 'warn',
          summary: 'Audio',
          detail: participant.isMuted ? 'Muted' : 'Unmuted',
          life: 3000,
        });
      }
    },
    switchCamera(participantId: number) {
      // Implement camera switching logic
    },
    handleMute() {
      if (this.localStream) {
        const audioTrack = this.localStream.getAudioTracks()[0];
        audioTrack.enabled = !audioTrack.enabled;
        this.isUserMuted = !audioTrack.enabled;
      }
    },
    handleCamera() {
      if (this.localStream) {
        const videoTrack = this.localStream.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        this.isUserCameraOn = !videoTrack.enabled;
      }
    },
    toggleLayout() {
      this.layout = this.layout === 'grid' ? 'list' : 'grid';
    },
  },
  mounted() {
    this.initWebRTC();
  },
});
</script>

<style scoped>
.participant-video {
  object-fit: cover;
}
.participant-list-item {
  margin-bottom: 10px;
}
</style>
