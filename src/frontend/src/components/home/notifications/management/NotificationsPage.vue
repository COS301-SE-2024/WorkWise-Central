<template>
  <v-container>
    <Toast position="bottom-center" />
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Notifications</h2>
      </v-col>
    </v-row>
    <v-card rounded="md">
      <v-row>
        <v-col cols="12" lg="2">
          <v-card class="pa-0 ma-2">
            <v-list>
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                @click="setInbox(item.title)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-label>Filters</v-label>
              <v-list-item
                v-for="(item, index) in filters"
                :key="index"
                :value="index"
                @click="filter(item.title)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list>
              <v-label>Companies</v-label>
              <v-list-item
                v-for="(item, index) in companies"
                :key="index"
                :value="index"
                @click="switchCompany(item.title)"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="12" lg="10">
          <v-row>
            <v-col cols="12" lg="2">
              <v-btn
                @click="setInbox('Unread')"
                :class="{ 'bg-cardColor': currentInbox === 'Unread' }"
                ><v-icon icon="fa: fa-solid fa-bell"></v-icon>Unread</v-btn
              >
              <v-btn @click="setInbox('Read')" :class="{ 'bg-cardColor': currentInbox === 'Read' }"
                ><v-icon icon="fa: fa-regular fa-bell"></v-icon>Read</v-btn
              >
            </v-col>
            <v-col cols="12" lg="8">
              <v-text-field
                v-model="search"
                label="Search"
                outlined
                dense
                hide-details
                class="pa-0 ma-2"
                @input="searchEmails"
              ></v-text-field>
            </v-col>
            <v-col cols="12" lg="2">
              <v-select
                label="Sort By"
                :items="groupBy"
                density="compact"
                 class="pa-0 ma-2"
                @change="groupBySelection($event)"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" order="last" justify="center">
              <v-card class="pa-0 ma-3">
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
                      'bg-background':
                        clickedNotificationId === notification.id ||
                        clickedNotfiicationIds.includes(notification.id)
                    }"
                  >
                    <v-label
                      class="h5 font-weight-regular d-flex justify-center bg-cardColor text-secondary"
                    ></v-label>
                    <v-card-text>
                      <v-icon
                        :icon="
                          notification.read === false
                            ? 'fa: fa-regular fa-bell'
                            : 'fa: fa-solid fa-bell'
                        "
                      >
                      </v-icon>
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
                    <v-list-item-action>
                      <v-btn
                        v-if="showActionButtons"
                        @click="handleAction('mark as read', notification.id)"
                        color="primary"
                      >
                        <v-icon
                          :icon="
                            notification.read === false
                              ? 'fa: fa-regular fa-bell'
                              : 'fa: fa-solid fa-bell'
                          "
                        >
                        </v-icon>
                      </v-btn>
                      <v-btn
                        v-if="showActionButtons"
                        @click="handleAction('save', notification.id)"
                        color="primary"
                      >
                        <v-icon
                          :icon="
                            notification.saved === false
                              ? 'fa: fa-regular fa-bookmark'
                              : 'fa: fa-solid fa-bookmark'
                          "
                        >
                        </v-icon>
                      </v-btn>
                      <v-btn
                        v-if="showActionButtons"
                        @click="handleAction('add to done', notification.id)"
                        color="primary"
                      >
                        <v-icon
                          :icon="
                            notification.done === false
                              ? 'fa: fa-solid fa-check'
                              : 'fa: fa-solid fa-check'
                          "
                        >
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Toast from 'primevue/toast'
export default {
  data() {
    return {
      notifications: [
        {
          id: 1,
          title: 'Notification 1',
          message: 'This is the first notification.',
          action: 'action1',
          actionText: 'Action 1',
          type: 'Job Oriented',
          company: 'Wielding Tires',
          date: '2021-09-01',
          read: false,
          done: false,
          saved: false
        },
        {
          id: 2,
          title: 'Notification 2',
          message: 'This is the second notification.',
          action: 'action2',
          actionText: 'Action 2',
          type: 'Admin',
          company: 'Plumbing Bros',
          date: '2021-09-02',
          read: false,
          done: false,
          saved: false
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
      selectAllNotifications: false, // Track the select all checkbox
      showActionButtons: false,
      read: [] as number[],
      unread: [] as number[],
      done: [] as number[],
      saved: [] as number[],
      currentInbox: 'Inbox', // Track the current inbox
      currentCompany: '' // Track the current company
    }
  },
  components: { Toast },
  computed: {
    filteredNotifications() {
      // Filter notifications based on the current inbox
      let filtered = this.notifications.filter(
        (notification) =>
          notification.title.toLowerCase().includes(this.search.toLowerCase()) &&
          (this.filteredNotificationsArray.length === 0 ||
            this.filteredNotificationsArray.includes(notification.id))
      )

      if (this.currentInbox === 'Saved') {
        filtered = filtered.filter((notification) => notification.saved)
      } else if (this.currentInbox === 'Done') {
        filtered = filtered.filter((notification) => notification.done)
      } else if (this.currentInbox === 'Read') {
        filtered = filtered.filter((notification) => !notification.read)
      } else if (this.currentInbox === 'Unread') {
        filtered = filtered.filter((notification) => notification.read)
      }

      if (this.currentCompany) {
        filtered = filtered.filter((notification) => notification.company === this.currentCompany)
      }

      return filtered
    }
  },
  methods: {
    setInbox(inbox: string) {
      this.currentInbox = inbox
    },
    switchCompany(company: string) {
      console.log('Switch Company:', company)
      this.currentCompany = company
    },
    handleNotificationClick(id: number) {
      if (this.clickedNotificationId === id) {
        this.clickedNotificationId = 0
        this.showActionButtons = false
        for (let i = 0; i < this.clickedNotfiicationIds.length; i++) {
          if (this.clickedNotfiicationIds[i] === id) {
            this.clickedNotfiicationIds.splice(i, 1)
          }
        }
      } else {
        this.clickedNotificationId = id
        this.clickedNotfiicationIds.push(id)
        this.showActionButtons = true
      }
    },
    handleAction(action: string, id: number) {
      console.log(`Action performed: ${action}`)
      if (action === 'add to done') {
        if (this.notifications.find((notification) => notification.id === id)?.done === true) {
          this.removeFromDone(id)
        } else {
          this.movetoDone(id)
        }
      } else if (action === 'save') {
        if (this.notifications.find((notification) => notification.id === id)?.saved === true) {
          this.removeFromSaved(id)
        } else {
          this.movetoSaved(id)
        }
      } else if (action === 'mark as read') {
        this.notifications.find((notification) => notification.id === id)?.read === false
          ? this.markAsRead(id)
          : this.markAsUnread(id)
      }
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
    markAsRead(id: number) {
      console.log('Mark as Read')
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id === id) {
          this.read.push(this.notifications[i].id)
          this.notifications[i].read = true
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Notification marked as read',
            life: 3000
          })
        }
      }
    },
    markAsUnread(id: number) {
      console.log('Mark as Unread')
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id === id) {
          this.unread.push(this.notifications[i].id)
          this.notifications[i].read = false
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Notification marked as unread',
            life: 3000
          })
        }
      }
    },
    movetoSaved(id: number) {
      console.log('Move to Saved')
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id === id) {
          this.saved.push(this.notifications[i].id)
          this.notifications[i].saved = true
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Notification saved',
            life: 3000
          })
        }
      }
    },
    movetoDone(id: number) {
      console.log('Move to Done')
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id === id) {
          this.done.push(this.notifications[i].id)
          this.notifications[i].done = true
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Notification marked as done',
            life: 3000
          })
        }
      }
    },
    removeFromDone(id: number) {
      console.log('Remove from Done')
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id === id) {
          this.done = this.done.filter((done) => done !== this.notifications[i].id)
          this.notifications[i].done = false
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Notification removed from done',
            life: 3000
          })
        }
      }
    },
    removeFromSaved(id: number) {
      console.log('Remove from Saved')
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i].id === id) {
          this.saved = this.saved.filter((saved) => saved !== this.notifications[i].id)
          this.notifications[i].saved = false
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Notification removed from saved',
            life: 3000
          })
        }
      }
    },
    filter(filterType: string) {
      this.filteredNotificationsArray = []
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
