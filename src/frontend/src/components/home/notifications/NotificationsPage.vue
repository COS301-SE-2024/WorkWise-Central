<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="3"> 
        <v-card>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item v-for="(item, index) in filters" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-list-item v-for="(item, index) in companies" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" lg="9">
        <v-row>
          <v-col cols="12" lg="10">
            <v-text-field
              v-model="search"
              label="Search"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="2">
            <v-select label="Group By" :items="groupBy" density="compact"> </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" order="last" justify="center">
            <v-card>
              <v-card-title>
                <v-icon>mdi-bell</v-icon>
                Notifications
              </v-card-title>
              <v-divider></v-divider>
              <v-list class="bg-cardColor" rounded="md">
                <v-label> <v-radio></v-radio>Select All </v-label>
                <v-divider></v-divider>
                <v-list-item
                  v-for="notification in notifications"
                  :key="notification.id"
                  @click="handleNotificationClick(notification.id)"
                  :class="{ 'bg-primary': clickedNotificationId === notification.id }"
                >
                  <v-label
                    class="h5 font-weight-regular d-flex justify-center bg-cardColor text-secondary"
                  ></v-label>
                  <v-card-text>
                    <v-icon>{{ notification.icon }}</v-icon>
                    <span>{{ notification.title }}</span>
                    <br />
                    {{ notification.message }}
                    <v-btn @click="handleAction(notification.action)" color="primary" text
                      ><v-icon color="primary">mdi-dots-horizontal</v-icon></v-btn
                    >
                  </v-card-text>
                  <v-divider></v-divider>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  data() {
    return {
      notifications: [
        {
          id: 1,
          title: 'Notification 1',
          message: 'This is the first notification.',
          icon: 'mdi-bell',
          action: 'action1',
          actionText: 'Action 1'
        },
        {
          id: 2,
          title: 'Notification 2',
          message: 'This is the second notification.',
          icon: 'mdi-bell-outline',
          action: 'action2',
          actionText: 'Action 2'
        }
        // Add more notifications here
      ],
      items: [
        { title: 'Inbox' },
        { title: 'Saved' },
        { title: 'Done' }

        // Add more items here
      ],
      filters: [
        { title: 'Inbox' },
        { title: 'Saved' },
        { title: 'Done' }

        // Add more items here
      ],
      companies: [
        { title: 'Wielding Tires' },
        { title: 'Plumbing Bros' },
        { title: 'We Buy Tweaks' }

        // Add more items here
      ],
      groupBy: ['Date', 'Company', 'Type'],
      search: '',
      clickedNotificationId: 0, // Track the clicked notification ID
      active: true
    }
  },
  methods: {
    handleNotificationClick(id: number) {
      this.clickedNotificationId = id // Set the clicked notification ID
    },
    handleAction(action: string) {
      // Handle the action when the button is clicked
      console.log(`Action performed: ${action}`)
    }
  }
}
</script>

<style scoped>
.highlight {
  background-color: #f5f5f5; /* Change to your desired highlight color */
}
</style>
