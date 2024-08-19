<template>
  <v-dialog
    v-model="membersDialog"
    max-width="400px"
    location="bottom"
    location-strategy="connected"
    opacity="0"
    origin="top center"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        width="100%"
        border="md"
        elevation="5"
        @click="membersDialog = true"
        v-bind="activatorProps"
      >
        Select Employees
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Assigned Employees
        </v-card-title>
        <v-card-text>
          <div class="text-caption pa-3">Select Employees</div>
          <v-select
            v-model="selectedMembers"
            :items="members"
            :item-title="getMembersFullName"
            item-value="_id"
            hint="Select employees to assign to a job"
            label="Select Team Members"
            prepend-icon="fa: fa-solid fa-users"
            multiple
            persistent-hint
            outlined
            dense
            class="my-custom-autocomplete"
            color="primary"
            background-color="#f5f5f5"
            rounded="l"
            variant="solo"
          ></v-select>
        </v-card-text>
        <v-card-actions class="d-flex flex-column">
          <v-btn @click="saveMembers" color="success">Save</v-btn>
          <v-btn @click="isActive.value = false" color="error">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import axios from 'axios'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

const props = defineProps<{
  jobID: string
}>()

const toast = useToast()

// State variables
const membersDialog = ref(false)
const selectedMembers = ref([])
const members = ref([]) // Populate with your states data

// API URLs and config
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}
// Utility functions
const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status < 300 && res.status > 199
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

const showAssignEmployeesSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Assigned employees successfully',
    life: 3000
  })
}

const showAssignEmployeesError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'Failed to assign employees',
    life: 3000
  })
}

const getTeamMembers = async () => {
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(`${apiUrl}employee/detailed/all/${localStorage.getItem('employeeId')}`, config)
    if (response.status > 199 && response.status < 300) {
      console.log(response)
      members.value = response.data.data
      console.log('Members only: ', members.value)
    } else {
      console.log('failed')
    }
  } catch (error) {
    console.log(error)
    console.error('Error updating job:', error)
  }
}

const saveMembers = async () => {
  const apiUrl = getRequestUrl()
  try {
    for (const member of selectedMembers.value) {
      console.log(member)
      const response = await axios.put(`${apiUrl}job/employee`, {
        employeeId: localStorage.getItem('employeeId'),
        employeeToAssignId: member,
        jobId: props.jobID
      }, config)
      if (response.status > 199 && response.status < 300) {
        console.log(response)
        showAssignEmployeesSuccess()
      } else {
        console.log('failed')
        showAssignEmployeesError()
      }
    }

  } catch(error) {
    console.log(error)
  }
}

const getAssignedEmployees = async () => {
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(`${apiUrl}job/id/${props.jobID}`, config)
    if (response.status > 199 && response.status < 300) {
      console.log(response)
      const employees = response.data.data.assignedEmployees.employeeIds
      selectedMembers.value = employees.map(employee => ({
        _id: employee._id,
        userInfo: {
          firstName: employee.userInfo.firstName,
          surname: employee.userInfo.surname
        }
      }))
    } else {
      console.log('failed')
    }
  } catch (error) {
    console.log(error)
    console.error('Error updating job:', error)
  }
}

onMounted(() => {
  getTeamMembers()
  getAssignedEmployees()
})

const getMembersFullName = (item: any) => {
  if (item.userInfo && item.userInfo.firstName && item.userInfo.surname) {
    return `${item.userInfo.firstName} ${item.userInfo.surname}`
  }
  return ''
}
</script>

