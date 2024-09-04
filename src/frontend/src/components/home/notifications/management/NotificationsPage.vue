<template>
  <v-container>
    <Toast position="top-center" />
    <v-row class="justify-center align-center">
      <v-col cols="12" class="text-center">
        <h2 class="text-xl font-semibold">Notifications</h2>
      </v-col>
    </v-row>
    <v-card rounded="md" class="bg-cardColor">
      <v-row>
        <v-col cols="12" lg="10">
          <v-row>
            <v-col cols="12" lg="2">
              <v-row
                ><v-col cols="12"
                  ><v-btn
                    @click="setInbox('All')"
                    :class="{ 'bg-cardColor': currentInbox === 'All' }"
                    ><v-icon icon="fa: fa-solid fa-inbox"></v-icon>All</v-btn
                  ></v-col
                >
                <v-col cols="12">
                  <v-btn
                    @click="setInbox('Unread')"
                    :class="{ 'bg-cardColor': currentInbox === 'Unread' }"
                    ><v-icon icon="fa: fa-regular fa-bell"></v-icon>Unread</v-btn
                  ></v-col
                >
                <v-col cols="12"
                  ><v-btn
                    @click="setInbox('Read')"
                    :class="{ 'bg-cardColor': currentInbox === 'Read' }"
                    ><v-icon icon="fa: fa-solid fa-bell"></v-icon>Read</v-btn
                  ></v-col
                >
              </v-row>
            </v-col>
            <v-col cols="12" lg="8">
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
              <v-card class="pa-0 ma-3" elevation="0">
                <v-card-title class="text-h4">{{ currentInbox }}</v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-list class="bg-cardColor" rounded="md">
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
                      <Panel style="background-color:">
                        <template #header>
                          <div class="flex items-center gap-2">
                            <v-icon
                              :icon="
                                notification.read === false
                                  ? 'fa: fa-regular fa-bell'
                                  : 'fa: fa-solid fa-bell'
                              "
                            >
                            </v-icon>
                            <span class="font-bold">{{ notification.title }}</span>
                          </div>
                        </template>
                        <template #footer>
                          <div class="flex flex-wrap items-center justify-between gap-4">
                            <div class="flex items-center gap-2"></div>
                            <span class="text-surface-500 dark:text-surface-400">
                              {{ notification.date }}</span
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
                              <v-list-item @click="handleAction('add to done', notification.id)">
                                <v-btn color="success" block>
                                  <v-icon icon="fa:fa-solid fa-check" color="success"></v-icon>
                                  Done
                                </v-btn>
                              </v-list-item>
                              <v-list-item @click="handleAction('save', notification.id)">
                                <v-btn color="primary" block>
                                  <v-icon icon="fa:fa-solid fa-bookmark" color="primary"></v-icon>
                                  Save
                                </v-btn>
                              </v-list-item>
                              <v-list-item @click="handleAction('mark as read', notification.id)">
                                <v-btn color="secondary" block>
                                  <v-icon
                                    icon="fa:fa-solid fa-envelope-open"
                                    color="secondary"
                                  ></v-icon>
                                  Mark as Read
                                </v-btn>
                              </v-list-item>
                              <v-list-item @click="handleAction('delete', notification.id)">
                                <v-btn color="error" block>
                                  <v-icon icon="fa:fa-solid fa-trash" color="error"></v-icon>
                                  Delete
                                </v-btn>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </template>
                        <p class="m-0">
                          <span>{{ notification.title }}</span>
                          <br />
                          {{ notification.message }}
                          <br />
                          {{ notification.type }}
                          <br />
                          {{ notification.company }}
                        </p>
                      </Panel>
                    </v-list-item>
                  </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-row>
                    <v-col cols="12" lg="6">
                      <v-pagination
                        v-model="currentPage"
                        :length="pages"
                        color="primary"
                      ></v-pagination>
                    </v-col>
                  </v-row>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" lg="2">
          <v-card class="pa-0 ma-2" elevation="0" border="sm">
            <v-list class="bg-cardColor">
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
            <v-list class="bg-cardColor">
              <v-label>Filters</v-label>
              <v-list-item
                v-for="(item, index) in filters"
                :key="index"
                :value="index"
                @click="filterOn === true ? filter(item.title, false) : filter(item.title, false)"
                :class="{ 'bg-secondary': currentFilter === item.title }"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
            <v-divider></v-divider>
            <v-list class="bg-cardColor">
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

import axios from 'axios'
export default {
  data() {
    return {
      menu: false,
      notifications: [
        {
          id: 1,
          title: 'Job Assignment: Tire Replacement at Warehouse',
          message:
            'You have been assigned to replace tires on all forklifts at the Wielding Tires warehouse.',
          action: 'viewJobDetails',
          actionText: 'View Job Details',
          type: 'Job Oriented',
          company: 'Wielding Tires',
          date: '2021-09-01',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 2,
          title: 'Admin: System Maintenance Scheduled',
          message:
            'Scheduled system maintenance will occur on September 3rd from 2:00 AM to 4:00 AM. Please ensure all critical tasks are completed beforehand.',
          action: 'reviewSchedule',
          actionText: 'Review Schedule',
          type: 'Admin',
          company: 'Plumbing Bros',
          date: '2021-09-02',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 3,
          title: 'Job Assignment: Replace HVAC System',
          message: 'You have been assigned to replace the HVAC system at Sunrise Apartments.',
          action: 'viewDetails',
          actionText: 'View Details',
          type: 'Job Oriented',
          company: 'Sunrise Apartments',
          date: '2021-09-03',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 4,
          title: 'Admin: Quarterly Report Submission',
          message: 'Reminder to submit the quarterly financial report by the end of the week.',
          action: 'submitReport',
          actionText: 'Submit Report',
          type: 'Admin',
          company: 'Urban Developments Inc.',
          date: '2021-09-04',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 5,
          title: 'Job Update: Electrical Wiring Inspection',
          message: 'Electrical wiring inspection has been completed at Midtown Office Complex.',
          action: 'viewReport',
          actionText: 'View Report',
          type: 'Job Oriented',
          company: 'Midtown Office Complex',
          date: '2021-09-05',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 6,
          title: 'Admin: Staff Meeting Reminder',
          message: 'Staff meeting scheduled for tomorrow at 10:00 AM in Conference Room B.',
          action: 'addToCalendar',
          actionText: 'Add to Calendar',
          type: 'Admin',
          company: 'Plumbing Bros',
          date: '2021-09-06',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 7,
          title: 'Job Assignment: Roof Repair',
          message: 'Assigned to repair the roof at Grandview Shopping Center.',
          action: 'viewDetails',
          actionText: 'View Details',
          type: 'Job Oriented',
          company: 'Grandview Shopping Center',
          date: '2021-09-07',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 8,
          title: 'Admin: Client Feedback Request',
          message: 'Request feedback from clients after completion of recent jobs.',
          action: 'sendRequest',
          actionText: 'Send Request',
          type: 'Admin',
          company: 'Wielding Tires',
          date: '2021-09-08',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 9,
          title: 'Job Completion: Plumbing Repair',
          message: 'Plumbing repair completed at Lakeside Residential.',
          action: 'viewInvoice',
          actionText: 'View Invoice',
          type: 'Job Oriented',
          company: 'Lakeside Residential',
          date: '2021-09-09',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 10,
          title: 'Admin: New Policy Update',
          message: 'Please review the updated company policies regarding health and safety.',
          action: 'reviewPolicy',
          actionText: 'Review Policy',
          type: 'Admin',
          company: 'Urban Developments Inc.',
          date: '2021-09-10',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 11,
          title: 'Job Assignment: Install Security System',
          message: 'You have been assigned to install a security system at Riverside Mall.',
          action: 'viewDetails',
          actionText: 'View Details',
          type: 'Job Oriented',
          company: 'Riverside Mall',
          date: '2021-09-11',
          read: false,
          done: false,
          saved: false,
          trash: false
        },
        {
          id: 12,
          title: 'Admin: Payroll Processing Deadline',
          message: 'Ensure payroll is processed by Friday to meet the payment schedule.',
          action: 'processPayroll',
          actionText: 'Process Payroll',
          type: 'Admin',
          company: 'Plumbing Bros',
          date: '2021-09-12',
          read: false,
          done: false,
          saved: false,
          trash: false
        }
      ],
      items: [
        { title: 'Inbox', icon: 'fa: fa-solid fa-inbox' },

        { title: 'Saved', icon: 'fa: fa-solid fa-bookmark' },
        { title: 'Done', icon: 'fa: fa-solid fa-check' }

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
      filteredNotificationsArray: [] as number[],
      search: '',
      clickedNotificationId: 0, // Track the clicked notification ID
      active: true,
      clickedNotfiicationIds: [] as number[],
      selectAllNotifications: false, // Track the select all checkbox
      showActionButtons: false,
      read: [] as number[],
      joinedCompanies: [] as any[],
      joinedCompaniesNames: [] as any[],
      joinedCompaniesIds: [] as string[],
      joinedCompaniesEmployeeIds: [] as number[],
      companyName: '',
      unread: [] as number[],
      done: [] as number[],
      saved: [] as number[],
      filterOn: false,
      currentInbox: 'Inbox', // Track the current inbox
      currentCompany: '', // Track the current company
      currentFilter: '', // Track the current filter
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
    }
  },
  components: { Toast, Panel },
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
      } else if (this.currentInbox === 'All' || this.currentInbox === 'Inbox') {
        return filtered
      }

      if (this.currentCompany) {
        filtered = filtered.filter((notification) => notification.company === this.currentCompany)
      }

      return filtered
    }
  },
  mounted() {
    this.getNotifications()
    this.getCompanies()
    this.populateCompanies()
  },
  methods: {
    async getCompanies() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      const user_id = localStorage.getItem('id')
      await axios
        .get(`${apiURL}users/id/${user_id}`, config)
        .then((response) => {
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
            } else {
              this.companyName = 'No company selected'
              console.log(this.companyName)
            }
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    setInbox(inbox: string) {
      this.currentInbox = inbox
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
      for (let j = 0; j < this.notifications.length; j++) {
        if (!this.companies.find((company) => company.title === this.notifications[j].company)) {
          this.companies.push({ title: this.notifications[j].company })
        }
      }
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
      } else if (action === 'delete') {
        this.$toast.add({
          severity: 'error',
          summary: 'Success',
          detail: 'Notification deleted',
          life: 3000
        })
        this.removeFromInbox(id)
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
    removeFromInbox(id: number) {
      this.notifications = this.notifications.filter((notification) => notification.id !== id)
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
            severity: 'info',
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
            severity: 'warn',
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
            severity: 'error',
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
    filter(filterType: string, apply: boolean) {
      this.filteredNotificationsArray = []
      console.log('Filter:', apply)
      this.currentFilter = filterType
      if (this.filterOn) {
        this.applyFilter(apply)
      } else {
        this.applyFilter(apply)
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
      const apiURL = await this.getRequestUrl()
      const user_id = localStorage.getItem('id')
      try {
        const res = await axios.get(`${apiURL}notification/employee?userId=${user_id}`, config)
        console.log(res)
        this.items = res.data.data
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
</style>
