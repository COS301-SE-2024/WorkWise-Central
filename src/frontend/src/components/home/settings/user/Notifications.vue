<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h1>Notification Settings</h1>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row class="mt-0">
      <v-col cols="12" md="8" order-md="0" order="1" class="d-flex flex-column">
        <v-form
          ref="notificationForm"
          @submit.prevent="saveNotificationSettings"
          class="text-center"
        >
          <v-col cols="12" class="w-100">
            <v-divider class="w-100">
              <h5 class="mb-2">Push Notifications</h5>
            </v-divider>
          </v-col>

          <v-card class="mb-4 elevation-0 w-100">
            <v-card-title class="text-h6">Push Notifications</v-card-title>
            <v-card-text>
              <p>Receive notifications directly to your device, even when the app is not open.</p>
              <v-switch
                v-model="notifications.push.enabled"
                label="Enable Push Notifications"
              ></v-switch>
            </v-card-text>
          </v-card>

          <v-col cols="12">
            <v-divider>
              <h5 class="mb-2">In-App Notifications</h5>
            </v-divider>
          </v-col>

          <v-card class="mb-4 elevation-0">
            <v-card-title class="text-h6">In-App Notifications</v-card-title>
            <v-card-text>
              <v-col>
                <p>Get notifications within the app for important updates and alerts.</p>
              </v-col>
              <v-col offset="4">
                <v-switch
                  v-model="notifications.inApp.enabled"
                  label="Enable In-App Notifications"
                ></v-switch>
              </v-col>

            </v-card-text>
          </v-card>

          <v-col cols="12">
            <v-divider>
              <h5 class="mb-2">Email Notifications</h5>
            </v-divider>
          </v-col>
          <v-card class="mb-4 elevation-0">
            <v-card-title class="text-h6">Email Notifications</v-card-title>
            <v-card-text>
              <p>Receive notifications and updates via email.</p>
              <v-switch
                v-model="notifications.email.enabled"
                label="Enable Email Notifications"
              ></v-switch>
              <v-text-field
                v-if="notifications.email.enabled"
                v-model="notifications.email.address"
                label="Email Address"
                :rules="emailRules"
                required
              ></v-text-field>
            </v-card-text>
          </v-card>
          <v-btn color="primary" type="submit"> Save Notification Settings </v-btn>
        </v-form>
      </v-col>
      <v-col cols="12" order-md="1" order="0" md="4" class="pt-11">
        <settingsMenu style="width: 100%" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import settingsMenu from '@/components/home/settings/SettingsMenu.vue'

export default defineComponent({
  name: 'NotificationSettingsPage',
  components: { settingsMenu },
  data() {
    return {
      notifications: {
        push: {
          enabled: true
        },
        inApp: {
          enabled: true
        },
        email: {
          enabled: true,
          address: ''
        }
      },
      emailRules: [(v: string) => (!!v && /.+@.+/.test(v)) || 'E-mail must be valid']
    }
  },
  methods: {
    saveNotificationSettings() {
      // Placeholder method to save notification settings
      console.log('Saving notification settings:', this.notifications)
      // Add logic to save the notification settings here
    }
  }
})
</script>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
}

.settingsMenu {
  width: 100%;
}
</style>
