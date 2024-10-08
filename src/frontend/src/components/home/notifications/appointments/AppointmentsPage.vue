<template>
  <v-container fluid fill-height>
    <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
      >
        <v-row align="center" justify="space-between">
          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-icon icon="fa:fa-solid fa-video"></v-icon>
            <v-label
              class="ms-2 h2 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Meetings</v-label
            >
          </v-col>

          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-text-field
              v-model="search"
              density="compact"
              label="Search Meetings"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              flat
              color="primary"
              width="100%"
              hide-details="auto"
              single-line
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="4" class="d-flex align-center">
            <v-btn
              color="secondary"
              block
              @click="openCreate"
              variant="elevated"
              style="color: white !important"
            >
              <v-icon icon="fa: fa-solid fa-video" color="white"></v-icon>
              Create New Meeting
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="meetingHeaders"
          :items="appointments"
          :search="search"
          height="auto"
          rounded="xl"
          class="bg-cardColor"
          item-key="_id"
          min-width="100%"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-menu max-width="500px">
              <template v-slot:activator="{ props }">
                <v-btn rounded="xl" variant="plain" v-bind="props">
                  <v-icon color="primary">mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list class="bg-background">
                <v-list-item>
                  <v-btn @click.stop="joiningRoom(item)" color="success">
                    <v-icon
                      icon="fa:fa-solid fa-right-to-bracket"
                      color="success"
                      size="small"
                    ></v-icon>
                    Join Room
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn
                    color="warning"
                    width="100%"
                    @click.stop="openEditDialog(), selectItem(item)"
                  >
                    <v-icon
                      icon="fa:fa-solid fa-pencil"
                      start
                      color="warning"
                      size="small"
                    ></v-icon>
                    Edit
                  </v-btn>
                </v-list-item>
                <v-list-item>
                  <v-btn color="error" width="100%" @click.stop="openDeleteDialog(item._id)">
                    <v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>
                    Delete
                  </v-btn>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template v-slot:[`item.date`]="{ item }">
            {{ formatDate(item.date) }}
          </template>
          <template v-slot:[`item.startTime`]="{ item }">
            {{ item.startTime }}
          </template>
          <template v-slot:[`item.endTime`]="{ item }">
            {{ item.endTime }}
          </template>

          <template v-slot:no-data>
            <v-row>
              <v-col class="text-center">
                <v-icon large color="grey">mdi-alert-outline</v-icon>
                <div>No meetings available.</div>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>

  <!-- Confirmation Dialog -->
  <v-dialog v-model="deleteDialog" max-width="500px" :opacity="0.1">
    <v-card class="bg-cardColor">
      <v-card-title>
        <v-icon>mdi-delete</v-icon>
        <span>Delete Appointment</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <p class="font-weight-regular">
              Are you sure you want to delete this appointment? This action cannot be reversed.
            </p>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-container>
          <v-row justify="end">
            <v-col cols="12" lg="6" order="last" order-lg="first">
              <v-btn label="Cancel" color="secondary" @click="closeDeleteDialog" block>
                <v-icon icon="fa:fa-solid fa-cancel" color="secondary" size="small"></v-icon>Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6" order="first" order-lg="last">
              <v-btn
                label="Delete"
                color="error"
                :loading="isDeleting"
                block
                @click="confirmDelete"
              >
                <v-icon icon="fa:fa-solid fa-trash" start color="error" size="small"></v-icon>Delete
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Creating the appointment  -->
  <v-dialog v-model="showCreate" persistent max-width="800px">
    <v-card class="bg-cardColor">
      <v-card-title>
        <span class="headline">{{ 'Create Appointment' }}</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <h6>Meeting Title</h6>
                <v-text-field
                  v-model="newAppointment.title"
                  label="Title"
                  :rules="titleRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <h6>Meeting Date</h6>
                <v-text-field
                  type="date"
                  v-model="newAppointment.date"
                  header="Meeting start date"
                  border="md"
                  width="unset"
                  max-width="350"
                  elevation="5"
                  :rules="startDateRule"
                  :min="minDate"
                  class="mb-4"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <h6>Start Time</h6>
                <v-text-field
                  type="time"
                  v-model="newAppointment.startTime"
                  format="24hr"
                  :allowed-hours="allowedHours"
                  :allowed-minutes="allowedMinutes"
                  class="mb-4"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <h6>End Time</h6>
                <v-text-field
                  type="time"
                  v-model="newAppointment.endTime"
                  format="24hr"
                  :allowed-hours="allowedHours2"
                  :allowed-minutes="allowedMinutes2"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <h6>Details</h6>
                <v-text-field v-model="newAppointment.details" label="Details"></v-text-field>
              </v-col>

              <v-col cols="12">
                <h6>Choose Participants</h6>
                <v-select
                  v-model="newAppointment.participants"
                  :items="employeeList"
                  item-value="employeeId"
                  item-title="name"
                  clearable
                  variant="solo"
                  multiple
                  chips
                  label="Participants"
                  hint="Select the employee you'd like to join the meeting"
                  persistent-hint
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-btn color="error" @click="showCreate = false" block>
                <v-icon icon="fa: fa-solid fa-cancel" color="error" start></v-icon>
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6">
              <v-btn
                color="success"
                @click="createAppointment"
                block
                :loading="isGenerating"
                :disabled="!valid"
              >
                <v-icon icon="fa: fa-solid fa-floppy-disk" color="success" start></v-icon>
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Editing the appointment -->
  <v-dialog v-model="showEdit" persistent max-width="800px">
    <v-card class="bg-cardColor">
      <v-card-title>
        <span class="headline">{{ 'Edit Appointment' }}</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12">
                <h6>Meeting Title</h6>
                <v-text-field
                  v-model="selectedAppointment.title"
                  label="Title"
                  :rules="titleRules"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <h6>Meeting Date</h6>
                <v-text-field
                  type="date"
                  v-model="selectedAppointment.date"
                  header="Meeting start date"
                  border="md"
                  width="unset"
                  max-width="350"
                  elevation="5"
                  :rules="startDateRule"
                  :min="minDate"
                  class="mb-4"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <h6>Start Time</h6>
                <v-text-field
                  type="time"
                  v-model="selectedAppointment.startTime"
                  format="24hr"
                  :allowed-hours="allowedHours"
                  :allowed-minutes="allowedMinutes"
                  class="mb-4"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <h6>End Time</h6>
                <v-text-field
                  type="time"
                  v-model="selectedAppointment.endTime"
                  format="24hr"
                  :allowed-hours="allowedHours2"
                  :allowed-minutes="allowedMinutes2"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <h6>Details</h6>
                <v-text-field v-model="selectedAppointment.details" label="Details"></v-text-field>
              </v-col>

              <v-col cols="12">
                <h6>Choose Participants</h6>
                <v-select
                  v-model="selectedAppointment.participants"
                  :items="employeeList"
                  item-value="employeeId"
                  item-title="name"
                  clearable
                  variant="solo"
                  multiple
                  chips
                  label="Participants"
                  hint="Select the employee you'd like to join the meeting"
                  persistent-hint
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-btn color="error" @click="showEdit = false" block>
                <v-icon icon="fa: fa-solid fa-cancel" color="error" start></v-icon>
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" lg="6">
              <v-btn
                color="success"
                @click="editAppointment(selectedAppointment)"
                block
                :loading="isGenerating"
                :disabled="!valid"
              >
                <v-icon icon="fa: fa-solid fa-floppy-disk" color="success" start></v-icon>
                Save
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import { API_URL } from '@/main'
import axios from 'axios'

export default defineComponent({
  name: 'AppointmentsPage',
  components: {},
  data() {
    return {
      meetingHeaders: [
        { title: 'Title', value: 'title' },
        { title: 'Date', value: 'date' },
        { title: 'Start Time', value: 'startTime' },
        { title: 'End Time', value: 'endTime' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      deleteDialog: false,
      isDeleting: false,
      appointmentId: '',
      selectedAppointment: {},
      showEdit: false,
      showDialog: false,
      search: '',
      showCreate: false,
      selectedRoom: {},
      selectedItem: {},
      isEditing: false,
      joinRoom: true,
      conference: false,
      teamLeaderIds: [],
      teamMemberNames: [],
      participants: [],
      editIndex: 0,
      valid: false,
      isGenerating: false,
      participantsItemNames: [],
      req_obj: {
        participants: []
      },
      newAppointment: {},
      appointments: [],
      companyId: '',
      minDate: new Date().toISOString().substr(0, 10),
      selectedDate: '',
      selectedTime: '',
      allowedHours: (hour) => true,
      allowedMinutes: (minute) => true,
      allowedHours2: (hour) => true,
      allowedMinutes2: (minute) => true,
      titleRules: [(v) => !!v || 'Title is required'],
      startDateRule: [
        (v) => !!v || 'Date is required',
        (v) => v >= new Date().toISOString().substr(0, 10) || 'Date cannot be in the past'
      ],
      employeeList: [] // list of employees
    }
  },
  methods: {
    openDeleteDialog(appointmentId) {
      this.appointmentId = appointmentId
      this.deleteDialog = true
    },
    closeDeleteDialog() {
      this.deleteDialog = false
      this.appointmentId = ''
    },
    openEditDialog() {
      this.showEdit = true
    },
    selectItem(item) {
      console.log(item)
      this.selectedAppointment = item
    },
    closeEditDialog() {
      this.showEdit = false
    },
    async confirmDelete() {
      this.isDeleting = true
      await this.deleteAppointment(this.appointmentId)
        .then(() => {
          this.closeDeleteDialog()
          this.isDeleting = false
        })
        .catch((error) => {
          this.isDeleting = false
          console.error('Error deleting appointment:', error)
        })
    },
    async getRequests() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      try {
        const response = await axios.get(
          `${API_URL}employee/all/${localStorage.getItem('employeeId')}`,
          config
        )
        for (const employee of response.data.data) {
          this.employeeList.push({ name: employee.userInfo.displayName, employeeId: employee._id })
          this.teamMemberNames.push(employee.userInfo.displayName)
          this.teamLeaderIds.push(employee._id)
        }
        this.companyId = response.data.data[0].companyId
      } catch (error) {
        console.error(error)
      }
      try {
        const response = await axios.get(
          `${API_URL}videoCalls/forEmployee/${localStorage.getItem('employeeId')}`,
          config
        )
        for (const appointment of response.data.data) {
          // const participants = appointment.participants.map((participant) => participant.name)
          this.appointments.push({
            _id: appointment._id,
            title: appointment.title,
            date: appointment.date,
            startTime: appointment.startTime,
            endTime: appointment.endTime,
            details: appointment.details,
            participants: appointment.participants,
            roomId: appointment.roomId
          })
        }
      } catch (error) {
        console.error(error)
      }
    },
    formatDate(date) {
      return new Date(date).toDateString()
    },
    formatTime(time) {
      return new Date(time).toLocaleTimeString()
    },
    openCreate() {
      this.showCreate = true
    },
    joiningRoom(appointment) {
      this.selectedRoom = appointment
      localStorage.setItem('RoomId', this.selectedRoom.roomId)
      localStorage.setItem('RoomName', this.selectedRoom.title)
      this.$router.push('/video-meetings')
      this.joinRoom = false
      this.conference = true
    },
    clearFields() {
      this.newAppointment = {
        _id: '',
        title: '',
        date: '',
        startTime: '',
        endTime: '',
        details: '',
        participants: []
      }
      this.req_obj.participants = []
    },
    leavingRoom() {
      this.joinRoom = true
      this.conference = false
    },
    formatStartDateAndTime(date, time) {
      const [hrs, min] = time.split(':').map(Number)
      date.setHours(hrs)
      date.setMinutes(min)
      return date.toISOString()
    },
    formatEndDateAndTime(date, time) {
      const [hrs, min] = time.split(':').map(Number)
      date.setHours(hrs)
      date.setMinutes(min)
      return date.toISOString()
    },
    async editAppointment(appointment) {
      //checking if the current user is removed form the participants list and removing the appointment
      if (!appointment.participants.includes(localStorage.getItem('employeeId'))) {
        this.appointments = this.appointments.filter((app) => app._id !== appointment._id)
      }
      this.isGenerating = true
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      if (localStorage.getItem('currentCompany') !== null) {
        this.companyId = localStorage.getItem('currentCompany')
      }

      const data = {
        title: appointment.title,
        date: appointment.date,
        startTime: appointment.startTime,
        endTime: appointment.endTime,
        details: appointment.details,
        participants: appointment.participants,
        companyId: this.companyId
      }
      console.log(data)
      const id = appointment._id
      await axios
        .patch(`${API_URL}videoCalls/${id}`, data, config)
        .then((response) => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Meeting created successfully'
          })
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'failure',
            summary: 'failure',
            detail: 'Creating meeting failed'
          })
        })

      this.showEdit = false
      this.isGenerating = false
      this.clearFields()
    },
    async createAppointment() {
      this.isGenerating = true
      const appointment = { ...this.newAppointment }
      //checking if the current employee is in the participants list
      if (this.newAppointment.participants.includes(localStorage.getItem('employeeId'))) {
        this.appointments.push(appointment)
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }

      const data = {
        title: this.newAppointment.title,
        date: this.newAppointment.date,
        startTime: this.newAppointment.startTime,
        endTime: this.newAppointment.endTime,
        details: this.newAppointment.details,
        participants: this.newAppointment.participants,
        companyId: this.companyId
      }
      console.log('data: ', data)
      await axios
        .post(`${API_URL}videoCalls/create`, data, config)
        .then((response) => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Meeting created successfully'
          })
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'failure',
            summary: 'failure',
            detail: 'Creating meeting failed'
          })
          console.error(error)
        })

      this.showCreate = false
      this.isGenerating = false
      this.clearFields()
    },
    convertToISOString(dateString) {
      const date = new Date(dateString)

      if (isNaN(date.getTime())) {
        throw new Error('Invalid date string')
      }
      return date.toISOString()
    },
    convertTo24HourFormat(timeString) {
      const [time, modifier] = timeString.split(' ')
      let [hours, minutes] = time.split(':')

      if (modifier === 'PM' && hours !== '12') {
        hours = (parseInt(hours, 10) + 12).toString()
      } else if (modifier === 'AM' && hours === '12') {
        hours = '00'
      }
      return `${hours.padStart(2, '0')}:${minutes}`
    },
    cancel() {
      this.showDialog = false
      this.clearFields()
    },
    async deleteAppointment(id) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      axios
        .delete(`${API_URL}videoCalls/${id}`, config)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.error(error)
        })

      this.appointments = this.appointments.filter((appointment) => appointment._id !== id)
    },
    async selectTeamMembers() {
      console.log('newAppointment.participants', this.newAppointment.participants)
      if (Array.isArray(this.newAppointment.participants)) {
        for (const member of this.newAppointment.participants) {
          this.participants.push(
            this.teamLeaderIds[this.newAppointment.participants.indexOf(member)]
          )
        }
      } else {
        console.error('participants is not an array', this.newAppointment.participants)
      }

      return this.participants
    }
  },
  mounted() {
    this.getRequests()
  }
})
</script>

<style scoped>
h1,
h2 {
  margin-bottom: 20px;
}
</style>
