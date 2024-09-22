<template>
  <v-container>
    <v-card class="bg-cardColor">
      <v-card-text
        ><v-row>
          <v-col cols="12" md="6" lg="3" class="local-video">
            <video
              :ref="
                (el) => {
                  if (el) localVideo = el as HTMLVideoElement
                }
              "
              autoplay
              muted
              playsinline
            ></video>
          </v-col>

          <v-col v-for="peer in peers" :key="peer.id" cols="12" md="6" lg="3" class="remote-video">
            <video
              :ref="
                (el) => {
                  if (el) remoteVideos[peer.id] = el as HTMLVideoElement
                }
              "
              autoplay
              playsinline
            ></video>
          </v-col> </v-row
      ></v-card-text>

      <v-card-actions
        ><v-container
          ><v-row>
            <v-col cols="12" lg="3">
              <v-btn @click="toggleAudio" :color=" isAudioEnabled ? 'success' : 'error'" block>
                <v-icon
                  :icon="
                    isAudioEnabled ? 'fa: fa-solid fa-volume-high' : 'fa: fa-solid fa-volume-xmark'
                  "
                  :color=" isAudioEnabled ? 'success' : 'error'"
                ></v-icon>
                {{ isAudioEnabled ? 'Mute' : 'Unmute' }}
              </v-btn>
            </v-col>
            <v-col cols="12" lg="3">
              <v-btn @click="toggleVideo" :color="isVideoEnabled ? 'error' : 'success'" block>
                <v-icon
                  :icon="isVideoEnabled ? 'fa: fa-solid fa-video-slash' : 'fa: fa-solid fa-video'"
                  :color="isVideoEnabled ? 'error' : 'success'"
                ></v-icon
                >{{ isVideoEnabled ? 'Stop Video' : 'Start Video' }}
              </v-btn>
            </v-col>
            <v-col cols="12" lg="3">
              <v-btn @click="toggleScreenShare" :color="isScreenSharing ? 'error' : 'success'" block>
                <v-icon icon="fa: fa-solid fa-share" :color="isScreenSharing ? 'error' : 'success'"></v-icon
                >{{ isScreenSharing ? 'Stop Sharing' : 'Share Screen' }}
              </v-btn>
            </v-col>
            <v-col cols="12" lg="3">
              <v-btn @click="endCall" color="error" block
                ><v-icon icon="fa: fa-solid fa-door-open" color="error"></v-icon> End Call
              </v-btn>
            </v-col>
          </v-row></v-container
        ></v-card-actions
      >
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, nextTick } from 'vue'
import axios from 'axios'
import { io, Socket } from 'socket.io-client'
import { props } from 'node_modules/cypress/types/bluebird';

export default defineComponent({
  props: {
    roomId: {
      type: String,
      required: true
    }
  },
  setup(props, { emit }) {
    const title = ref('')
    const scheduledTime = ref('')
    const inCall = ref(false)
    const isAudioEnabled = ref(true)
    const isVideoEnabled = ref(true)
    const isScreenSharing = ref(false)
    const localVideo = ref<HTMLVideoElement | null>(null)
    const remoteVideos = ref<{ [key: string]: HTMLVideoElement }>({})
    const peers = ref<{ id: string; connection: RTCPeerConnection }[]>([])
    let socket: Socket
    let localStream: MediaStream | null = null
    const localUrl = 'http://localhost:3000/'
    const remoteUrl = 'https://tuksapi.sharpsoftwaresolutions.net/'
    const roomId = props.roomId
    const employeeId = ref('employee-id')

    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' } //STUN server
        //TURN server - none found
      ]
    }

    onMounted(() => {
      socket = io('http://localhost:3000', {
        withCredentials: true,
        transports: ['websocket', 'polling'],
        extraHeaders: {
          'Access-Control-Allow-Origin': 'http://localhost:5173'
        }
      })

      socket.on('user-joined', (employeeId: string) => {
        createPeerConnection(employeeId, true)
      })

      socket.on('user-left', (employeeId: string) => {
        removePeerConnection(employeeId)
      })

      socket.on('offer', async ({ offer, offerSenderId }) => {
        const peerConnection = createPeerConnection(offerSenderId, false)
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        const answer = await peerConnection.createAnswer()
        await peerConnection.setLocalDescription(answer)
        socket.emit('answer', { target: offerSenderId, answer })
      })

      socket.on('answer', async ({ answer, answerSenderId }) => {
        const peerConnection = peers.value.find((p) => p.id === answerSenderId)?.connection
        if (peerConnection) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer))
        }
      })

      socket.on('ice-candidate', async ({ candidate, candidateSenderId }) => {
        const peerConnection = peers.value.find((p) => p.id === candidateSenderId)?.connection
        if (peerConnection) {
          await peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
        }
      })

      joinCall()
    })

    onUnmounted(() => {
      if (socket) {
        socket.disconnect()
      }
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
    })
    const getRequestUrl = async () => {
      const localAvailable = await isLocalAvailable(localUrl)
      return localAvailable ? localUrl : remoteUrl
    }

    const isLocalAvailable = async (localUrl: string) => {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    }

    const scheduleCall = async () => {
      console.log('Scheduled time:', new Date(scheduledTime.value))
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await getRequestUrl()
      try {
        await axios.post(
          `${apiURL}video-calls/schedule`,
          {
            title: title.value,
            scheduledTime: new Date(scheduledTime.value)
          },
          config
        )
        alert('Call scheduled successfully!')
      } catch (error) {
        console.error('Failed to schedule call:', error)
      }
    }

    const joinCall = async () => {
      try {
        await navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((stream) => {
            console.log('Stream:', stream)
            if (localVideo.value) {
              localVideo.value.srcObject = stream // Set the video source here
            }
          })
          .catch((err) => {
            console.error('Error accessing media devices.', err)
          })
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })

        console.log('Local stream:', localStream)

        if (localStream) {
          const videoTracks = localStream.getVideoTracks()
          const audioTracks = localStream.getAudioTracks()

          console.log('Video Tracks:', videoTracks)
          console.log('Audio Tracks:', audioTracks)
        }

        await nextTick()

        if (localVideo.value) {
          localVideo.value.srcObject = localStream
        }
        
        socket.emit('join-room', roomId) // Replace with actual room ID
        inCall.value = true

        // Emit user joined event
        socket.emit('user-joined', employeeId.value) // Replace with actual user ID
      } catch (error) {
        console.error('Failed to join call:', error)
      }
    }

    const createPeerConnection = (employeeId: string, isInitiator: boolean) => {
      const peerConnection = new RTCPeerConnection(configuration)
      peers.value.push({ id: employeeId, connection: peerConnection })

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('ice-candidate', { target: employeeId, candidate: event.candidate })
        }
      }

      peerConnection.ontrack = (event) => {
        const [remoteStream] = event.streams
        if (remoteVideos.value[employeeId]) {
          remoteVideos.value[employeeId].srcObject = remoteStream
        } else {
          // If the video element is not yet available, we'll set it in the next render cycle
          setTimeout(() => {
            if (remoteVideos.value[employeeId]) {
              remoteVideos.value[employeeId].srcObject = remoteStream
            }
          }, 0)
        }
      }

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream!)
        })
      }

      if (isInitiator) {
        peerConnection
          .createOffer()
          .then((offer) => peerConnection.setLocalDescription(offer))
          .then(() => {
            socket.emit('offer', { target: employeeId, offer: peerConnection.localDescription })
          })
          .catch((error) => console.error('Error creating offer:', error))
      }

      return peerConnection
    }

    const removePeerConnection = (employeeId: string) => {
      const index = peers.value.findIndex((p) => p.id === employeeId)
      if (index !== -1) {
        peers.value[index].connection.close()
        peers.value.splice(index, 1)
      }
      delete remoteVideos.value[employeeId]
    }

    const toggleAudio = () => {
      if (localStream) {
        const audioTrack = localStream.getAudioTracks()[0]
        audioTrack.enabled = !audioTrack.enabled
        isAudioEnabled.value = audioTrack.enabled
      }
    }

    const toggleVideo = () => {
      if (localStream) {
        const videoTrack = localStream.getVideoTracks()[0]
        videoTrack.enabled = !videoTrack.enabled
        isVideoEnabled.value = videoTrack.enabled
      }
    }

    const toggleScreenShare = async () => {
      if (isScreenSharing.value) {
        if (localStream) {
          const screenTrack = localStream.getVideoTracks().find((track) => track.label === 'screen')
          if (screenTrack) {
            localStream.removeTrack(screenTrack)
            screenTrack.stop()
          }
          const cameraTrack = await navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => stream.getVideoTracks()[0])
          localStream.addTrack(cameraTrack)
          updateTrackForAllPeers(cameraTrack)
        }
      } else {
        try {
          const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true })
          const screenTrack = screenStream.getVideoTracks()[0]
          if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0]
            localStream.removeTrack(videoTrack)
            localStream.addTrack(screenTrack)
            updateTrackForAllPeers(screenTrack)
          }
        } catch (error) {
          console.error('Failed to share screen:', error)
        }
      }
      isScreenSharing.value = !isScreenSharing.value
    }

    const updateTrackForAllPeers = (newTrack: MediaStreamTrack) => {
      peers.value.forEach((peer) => {
        const sender = peer.connection.getSenders().find((s) => s.track?.kind === newTrack.kind)
        if (sender) {
          sender.replaceTrack(newTrack)
        }
      })
    }

    const endCall = () => {
      socket.emit('leave-room', 'room-id') // Replace with actual room ID
      peers.value.forEach((peer) => peer.connection.close())
      peers.value = []
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop())
      }
      inCall.value = false
      emit('return')
    }

    return {
      title,
      scheduledTime,
      inCall,
      isAudioEnabled,
      isVideoEnabled,
      isScreenSharing,
      localVideo,
      remoteVideos,
      peers,
      scheduleCall,
      joinCall,
      toggleAudio,
      toggleVideo,
      toggleScreenShare,
      endCall
    }
  }
})
</script>

<style scoped>
.video-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: calc(100vh - 60px); /* Leaving space for the controls */
}

.local-video,
.remote-video {
  width: 100%;
  height: 100%;
  max-width: 400px; /* Adjust max size of video */
  max-height: 300px;
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.controls {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
