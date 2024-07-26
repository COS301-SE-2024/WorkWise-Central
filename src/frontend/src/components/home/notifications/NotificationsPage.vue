<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Notifications</h2>
        <v-divider></v-divider>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" lg="2">
        <v-card>
          <v-list>
            <v-list-item v-for="(item, index) in items" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-label>Filters</v-label>
            <v-list-item v-for="(item, index) in filters" :key="index" :value="index" @click="filter(item.title)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
          <v-list>
            <v-label>Companies</v-label>
            <v-list-item v-for="(item, index) in companies" :key="index" :value="index">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" lg="10">
        <v-row>
          <v-col cols="12" lg="10">
            <v-text-field
              v-model="search"
              label="Search"
              outlined
              dense
              hide-details
              @input="searchEmails"
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="2">
            <v-select
              label="Group By"
              :items="groupBy"
              density="compact"
              @change="groupBySelection($event)"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" order="last" justify="center">
            <v-card>
              <v-list class="bg-cardColor" rounded="md">
                <v-label>
                  <v-checkbox v-model="selectAllNotifications" @click="selectAll"> </v-checkbox>
                  Select All
                </v-label>
                <v-divider></v-divider>
                <v-list-item
                  v-for="notification in filteredNotifications"
                  :key="notification.id"
                  @click="handleNotificationClick(notification.id)"
                  :class="{
                    'bg-secondary':
                      clickedNotificationId === notification.id ||
                      clickedNotfiicationIds.includes(notification.id)
                  }"
                >
                  <v-label
                    class="h5 font-weight-regular d-flex justify-center bg-cardColor text-secondary"
                  ></v-label>
                  <v-card-text>
                    <v-icon>{{ notification.icon }}</v-icon>
                    <span>{{ notification.title }}</span>
                    <br />
                    {{ notification.message }}
                    <br />
                    {{ notification.type }}
                    <br />
                    {{ notification.company }}
                    <br />
                    {{ notification.date }}
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
          actionText: 'Action 1',
          type: 'Job Oriented',
          company: 'Wielding Tires',
          date: '2021-09-01'
        },
        {
          id: 2,
          title: 'Notification 2',
          message: 'This is the second notification.',
          icon: 'mdi-bell-outline',
          action: 'action2',
          actionText: 'Action 2',
          type: 'Admin',
          company: 'Plumbing Bros',
          date: '2021-09-02'
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
        { title: 'Job Oriented' },
        { title: 'Admin' }
        // Add more items here
      ],
      companies: [
        { title: 'Wielding Tires' },
        { title: 'Plumbing Bros' },
        { title: 'We Buy Tweaks' }
        // Add more items here
      ],
      groupBy: ['Date', 'Company', 'Type'],
      filteredNotificationsArray: [] as number[],
      search: '',
      clickedNotificationId: 0, // Track the clicked notification ID
      active: true,
      clickedNotfiicationIds: [] as number[],
      selectAllNotifications: false // Track the select all checkbox
    }
  },
  computed: {
    filteredNotifications() {
      // Filter notifications based on the search term and filter selection
      return this.notifications.filter(notification =>
        notification.title.toLowerCase().includes(this.search.toLowerCase()) &&
        (this.filteredNotificationsArray.length === 0 || this.filteredNotificationsArray.includes(notification.id))
      )
    }
  },
  methods: {
    handleNotificationClick(id: number) {
      if (this.clickedNotificationId === id) {
        this.clickedNotificationId = 0
        for (let i = 0; i < this.clickedNotfiicationIds.length; i++) {
          if (this.clickedNotfiicationIds[i] === id) {
            this.clickedNotfiicationIds.splice(i, 1)
          }
        }
      } else {
        this.clickedNotificationId = id
        this.clickedNotfiicationIds.push(id)
      }
    },
    handleAction(action: string) {
      console.log(`Action performed: ${action}`)
    },
    selectAll() {
      this.selectAllNotifications = !this.selectAllNotifications
      if (this.selectAllNotifications) {
        for (let i = 0; i < this.notifications.length; i++) {
          this.clickedNotfiicationIds.push(this.notifications[i].id)
          console.log(this.clickedNotfiicationIds[i])
        }
      } else {
        this.deselectAll()
      }
      console.log('Select All')
    },
    deselectAll() {
      this.selectAllNotifications = false
      this.clickedNotfiicationIds = []
      console.log('Deselect All')
    },
    deleteSelected() {
      for (let i = 0; i < this.clickedNotfiicationIds.length; i++) {
        this.notifications = this.notifications.filter(
          (notification) => notification.id !== this.clickedNotfiicationIds[i]
        )
      }
      this.clickedNotificationId = 0
      console.log('Delete Selected')
    },
    markAsRead() {
      console.log('Mark as Read')
    },
    markAsUnread() {
      console.log('Mark as Unread')
    },
    movetoSaved() {
      console.log('Move to Saved')
    },
    movetoDone() {
      console.log('Move to Done')
    },
    filter(filterType: string) {
      if (filterType === 'Job Oriented') {
        for (let i = 0; i < this.notifications.length; i++) {
          if (this.notifications[i].type === 'Job Oriented') {
            this.filteredNotificationsArray.push(this.notifications[i].id)
          }
        }
      } else if (filterType === 'Admin') {
        for (let i = 0; i < this.notifications.length; i++) {
          if (this.notifications[i].type === 'Admin') {
            this.filteredNotificationsArray.push(this.notifications[i].id)
          }
        }
      }
    },
    filterEmailsBasedOnCompany(company: string) {
      console.log('Filter Emails Based on Company:', company)
    },
    searchEmails() {
      console.log('Search Emails')
    },
    groupBySelection(how: string) {
      console.log(`Group By: ${how}`)
    }
  }
}
</script>

<style scoped>
.highlight {
  background-color: #9e20c4; /* Change to your desired highlight color */
}
</style>
