<template>
  <v-container>
    <Toast position="top-center" />
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Notifications</h2>
      </v-col>
    </v-row>
    <v-card rounded="md" class="bg-background" border="md">
      <v-row>
        <v-col cols="12" lg="10">
          <v-row>
            <v-col cols="12" lg="2">
              <v-row
                ><v-col cols="12"
                  ><v-btn
                    @click="setInbox('All')"
                    :class="{ 'bg-secondary': currentInbox === 'All' }"
                    color=""
                    variant="text"
                    ><v-icon icon="fa: fa-solid fa-inbox" color="primary"></v-icon>All</v-btn
                  ></v-col
                >
                <v-col cols="12">
                  <v-btn
                    @click="setInbox('Read')"
                    :class="{ 'bg-secondary': currentInbox === 'Read' }"
                    color=""
                    variant="text"
                    ><v-icon icon="fa: fa-regular fa-bell" color="primary"></v-icon>Read</v-btn
                  ></v-col
                >
                <v-col cols="12"
                  ><v-btn
                    @click="setInbox('Unread')"
                    :class="{ 'bg-secondary': currentInbox === 'Unread' }"
                    color=""
                    variant="text"
                    ><v-icon icon="fa: fa-solid fa-bell" color="primary"></v-icon>Unread</v-btn
                  ></v-col
                >
              </v-row>
            </v-col>
            <v-col cols="12" lg="10">
              <v-text-field
                v-model="search"
                label="Search"
                elevation="1"
                variant="outlined"
                dense
                color="primary"
                hide-details
                class="pa-0 ma-2"
                @input="searchEmails"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" order="last" justify="center">
              <v-card class="pa-0 ma-3 bg-background" elevation="0">
                <v-card-title class="text-h4 bg-background">{{ currentInbox }}</v-card-title>
                <v-divider></v-divider>
                <v-card-text class="bg-background">
                  <v-list class="bg-background" rounded="md">
                    <v-list-item
                      v-for="(notification, i) in notifications"
                      :key="i"
                      @click="handleNotificationClick(notification._id)"
                    >
                      <Panel class="bg-background">
                        <template #header>
                          <div class="flex items-center gap-2">
                            <v-badge v-if="!notification.isRead" dot color="green" overlap>
                              <v-icon icon="fa: fa-regular fa-bell"></v-icon>
                            </v-badge>
                            <v-icon icon="fa: fa-regular fa-bell" v-else></v-icon>

                            <span class="font-bold h6 notification-title" style="color: #f0984d">{{
                              notification.message.title
                            }}</span>
                          </div>
                        </template>
                        <template #footer>
                          <div class="flex flex-wrap items-center justify-between gap-4">
                            <div class="flex items-center gap-2"></div>
                            <span class="text-surface-500 dark:text-surface-400">
                              {{ format(new Date(notification.createdAt), 'dd MMMM yyyy') }}</span
                            >
                          </div>
                        </template>
                        <template #icons>
                          <v-menu>
                            <template #activator="{ props }">
                              <v-btn icon v-bind="props">
                                <v-icon icon="fa: fa-solid fa-ellipsis-v" color="primary"></v-icon>
                              </v-btn>
                            </template>
                            <v-list>
                              <v-list-item @click="handleAction('mark as read', notification._id)">
                                <v-btn color="success" block>
                                  <v-icon
                                    icon="fa:fa-solid fa-envelope-open"
                                    color="success"
                                  ></v-icon>
                                  Mark as Read
                                </v-btn>
                              </v-list-item>
                              <v-list-item @click="handleAction('delete', notification._id)">
                                <v-btn color="error" block>
                                  <v-icon icon="fa:fa-solid fa-trash" color="error"></v-icon>
                                  Delete
                                </v-btn>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </template>
                        <p class="m-0" :theme="true">
                          {{ notification.message.body }}
                        </p>
                      </Panel>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="2">
          <v-card class="pa-0 ma-2 bg-background" elevation="0" border="sm">
            <v-list class="bg-background">
              <v-list-item
                v-for="(item, index) in items"
                :key="index"
                :value="index"
                @click="setInbox(item.title)"
                :class="{ 'bg-secondary': currentInbox === item.title }"
              >
                <v-list-item-title
                  ><v-icon :icon="item.icon" start color="primary"></v-icon
                  >{{ item.title }}</v-list-item-title
                >
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list class="bg-background">
              <v-label>Filters</v-label>
              <v-list-item
                v-for="(item, index) in filters"
                :key="index"
                :value="index"
                @click="filterOn ? filter(item.title) : filter(item.title)"
                :class="{ 'bg-secondary': currentFilter === item.title }"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list class="bg-background">
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
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Toast from 'primevue/toast'
import Panel from 'primevue/panel'
import { format } from 'date-fns'
import axios from 'axios'
import { API_URL } from '@/main'

export default {
  data() {
    return {
      menu: false,
      notifications: [] as any[],
      allNotifications: [] as any[],
      items: [
        { title: 'Inbox', icon: 'fa: fa-solid fa-inbox' }
        // Add more items here
      ],
      filters: [
        { title: 'Job Oriented' },
        { title: 'Admin' }
        // Add more items here
      ],
      companies: [] as any[],
      currentPage: 1,
      pages: 10,

      groupBy: ['Date', 'Company', 'Type'],
      filteredNotificationsArray: [] as any[],
      search: '',
      clickedNotificationId: '', // Track the clicked notification ID
      active: true,
      clickedNotfiicationIds: [] as string[],
      selectAllNotifications: false, // Track the select all checkbox
      showActionButtons: false,
      read: [] as string[],
      joinedCompanies: [] as any[],
      joinedCompaniesNames: [] as any[],
      joinedCompaniesIds: [] as string[],
      joinedCompaniesEmployeeIds: [] as string[],
      companyName: '',
      unread: [] as string[],
      // done: [] as number[],
      // saved: [] as number[],
      filterOn: false,
      currentInbox: 'Inbox', // Track the current inbox
      currentCompany: '', // Track the current company
      currentFilter: '', // Track the current filter
      apply: false
    }
  },
  components: { Toast, Panel },
  computed: {
    filteredNotifications() {
      // Filter notifications based on the current inbox
      console.log(this.notifications)
      if (this.notifications == null) {
        console.log('Notifications are null')
        return []
      }

      let filtered = this.notifications.filter(
        (notification) =>
          notification.message.title.toLowerCase().includes(this.search.toLowerCase()) &&
          (this.filteredNotificationsArray.length === 0 ||
            this.filteredNotificationsArray.includes(notification._id))
      )

      if (this.currentInbox === 'Read') {
        filtered = filtered.filter((notification) => !notification.isRead)
      } else if (this.currentInbox === 'Unread') {
        filtered = filtered.filter((notification) => notification.isRead)
      } else if (this.currentInbox === 'All' || this.currentInbox === 'Inbox') {
        return filtered
      }

      if (this.currentCompany) {
        filtered = filtered.filter(
          (notification) => notification.companyName === this.currentCompany
        )
      }

      return filtered
    }
  },
  mounted() {
    this.getCompanies()
    this.populateCompanies()
    this.getNotifications()
  },
  methods: {
    format,
    async getCompanies() {
      console.log('Get Companies')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      const user_id = localStorage.getItem('id')
      await axios
        .get(`${API_URL}users/id/${user_id}`, config)
        .then((response) => {
          console.log('Response from fetch', response.data.data.joinedCompanies)
          console.log(response.data.data.joinedCompanies)
          console.log(response.data.data)
          this.joinedCompanies = response.data.data.joinedCompanies
          this.joinedCompanies.forEach((company) => {
            this.joinedCompaniesNames.push(company.companyName)
            this.joinedCompaniesIds.push(company.companyId)
            this.joinedCompaniesEmployeeIds.push(company.employeeId)
          })
          const currentCompanyID = localStorage.getItem('currentCompany')
          console.log(this.joinedCompanies.length)
          console.log(this.joinedCompanies[0].companyId)
          console.log(currentCompanyID)
          for (let i = 0; i < this.joinedCompanies.length; i++) {
            if (this.joinedCompaniesIds[i] == currentCompanyID) {
              this.companyName = this.joinedCompaniesNames[i]
              console.log(this.companyName)
            } /*else {
              this.companyName = 'No company selected'
              console.log(this.companyName)
            }*/
          }
        })
        .catch((error) => {
          console.log(error)
        })
      this.populateCompanies()
    },
    setInbox(inbox: string) {
      this.currentInbox = inbox
      if (inbox === 'Unread') {
        this.notifications = this.allNotifications.filter((n) => n.isRead === false)
      } else if (inbox === 'Read') {
        this.notifications = this.allNotifications.filter((n) => n.isRead === true)
      } else {
        this.notifications = this.allNotifications
      }
    },
    switchCompany(company: string) {
      console.log('Switch Company:', company)
      this.currentCompany = company
    },
    populateCompanies() {
      console.log('Populate Companies')
      for (let i = 0; i < this.joinedCompanies.length; i++) {
        this.companies.push({ title: this.joinedCompaniesNames[i] })
      }
    },
    handleNotificationClick(_id: string) {
      if (this.clickedNotificationId === _id) {
        //this.clickedNotificationId = 0
        this.showActionButtons = false
        for (let i = 0; i < this.clickedNotfiicationIds.length; i++) {
          if (this.clickedNotfiicationIds[i] === _id) {
            this.clickedNotfiicationIds.splice(i, 1)
          }
        }
      } else {
        this.clickedNotificationId = _id
        this.clickedNotfiicationIds.push(_id)
        this.showActionButtons = true
      }
    },
    handleAction(action: string, _id: string) {
      console.log(`Action performed: ${action}`)
      if (action === 'mark as read') {
        this.notifications.find((notification) => notification._id === _id)?.isRead === false
          ? this.markAsRead(_id)
          : this.markAsUnread(_id)
      } else if (action === 'delete') {
        this.$toast.add({
          severity: 'error',
          summary: 'Success',
          detail: 'Notification deleted',
          life: 3000
        })
        this.removeFromInbox(_id)
      }
    },
    selectAll() {
      this.selectAllNotifications = !this.selectAllNotifications
      if (this.selectAllNotifications) {
        for (let i = 0; i < this.notifications.length; i++) {
          this.clickedNotfiicationIds.push(this.notifications[i]._id)
          console.log(this.clickedNotfiicationIds[i])
        }
      } else {
        this.deselectAll()
      }
      console.log('Select All')
    },
    removeFromInbox(_id: string) {
      this.notifications = this.notifications.filter((notification) => notification._id !== _id)
      console.log('Remove from Inbox')
    },
    deselectAll() {
      this.selectAllNotifications = false
      this.clickedNotfiicationIds = []
      console.log('Deselect All')
    },
    deleteSelected() {
      for (let i = 0; i < this.clickedNotfiicationIds.length; i++) {
        this.notifications = this.notifications.filter(
          (notification) => notification._id !== this.clickedNotfiicationIds[i]
        )
      }
      //this.clickedNotificationId = 0
      console.log('Delete Selected')
    },
    async markAsRead(_id: string) {
      console.log('Mark as Read')
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i]._id === _id) {
          this.read.push(this.notifications[i]._id)
          this.notifications[i].isRead = true

          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }

          try {
            await axios.patch(`${API_URL}notification/markAsRead/${_id}`, {}, config)
            for (let i = 0; i < this.notifications.length; i++) {
              if (this.notifications[i]._id === _id) {
                this.read.push(this.notifications[i]._id)
                this.notifications[i].isRead = true
                this.$toast.add({
                  severity: 'info',
                  summary: 'Success',
                  detail: 'Notification marked as read',
                  life: 3000
                })
              }
            }
          } catch (error) {
            console.error(error)
          }

          this.$toast.add({
            severity: 'info',
            summary: 'Success',
            detail: 'Notification marked as read',
            life: 3000
          })
        }
      }
    },
    async markAsUnread(_id: string) {
      console.log('Mark as Unread')
      for (let i = 0; i < this.notifications.length; i++) {
        if (this.notifications[i]._id === _id) {
          this.unread.push(this.notifications[i]._id)
          this.notifications[i].isRead = false

          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          }

          try {
            await axios.patch(`${API_URL}notification/markAsUnread/${_id}`, {}, config)
            for (let i = 0; i < this.notifications.length; i++) {
              if (this.notifications[i]._id === _id) {
                this.read.push(this.notifications[i]._id)
                this.notifications[i].isRead = true
                this.$toast.add({
                  severity: 'info',
                  summary: 'Success',
                  detail: 'Notification marked as read',
                  life: 3000
                })
              }
            }
          } catch (error) {
            console.error(error)
          }
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Notification marked as unread',
            life: 3000
          })
        }
      }
    },
    filter(filterType: string) {
      this.filteredNotificationsArray = []
      this.apply = !this.apply
      console.log('Filter:', this.apply)
      this.currentFilter = filterType
      this.applyFilter(this.apply)
      if (this.filterOn) {
        if (filterType === 'Job Oriented') {
          for (let i = 0; i < this.notifications.length; i++) {
            this.notifications = this.allNotifications.filter((n) => n.isJobRelated)
          }
        } else if (filterType === 'Admin') {
          this.notifications = this.allNotifications.filter((n) => !n.isJobRelated)
        }
      } else {
        this.notifications = this.allNotifications
      }
    },
    applyFilter(apply: boolean) {
      this.filterOn = apply
    },

    filterEmailsBasedOnCompany(company: string) {
      console.log('Filter Emails Based on Company:', company)
    },
    searchEmails() {
      console.log('Search Emails')
    },
    groupBySelection(how: string) {
      console.log(`Group By: ${how}`)
    },
    async getNotifications() {
      console.log('Get Notifications')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      const user_id = localStorage.getItem('id')
      try {
        const res = await axios.get(`${API_URL}notification/user?userId=${user_id}`, config)
        console.log('User Notifications', res.data.data)
        //this.items = res.data.data
        for (const datum of res.data.data) {
          this.notifications.push(datum)
          this.allNotifications.push(datum)
        }

        for (const datum of res.data.data) {
          axios.patch(`${API_URL}notification/markAsRead/${datum._id}`, {}, config).then(() => {
            console.log('message marked as red')
          })
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.highlight {
  background-color: #9e20c4; /* Change to your desired highlight color */
}

.notification-title {
  margin-left: 10px; /* Small space between the icon and the text */
}
</style>
