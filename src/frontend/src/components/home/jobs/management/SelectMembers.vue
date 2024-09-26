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
        Assigned Employees
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="bg-cardColor">
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
            :disabled="req_loading"
          ></v-select>
        </v-card-text>

        <v-card-actions class="d-flex flex-column">
          <v-container
            ><v-row
              ><v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn @click="saveMembers" color="success" block :loading="req_loading"
                  ><v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon>Save</v-btn
                ></v-col
              ><v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn @click="isActive.value = false" color="error" block :disabled="req_loading"
                  ><v-icon icon="fa:fa-solid fa-cancel" color="error"></v-icon>Cancel</v-btn
                ></v-col
              ></v-row
            ></v-container
          >
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { API_URL } from '@/main'

interface Member {
  _id: string
  userInfo: {
    firstName: string
    surname: string
  }
}

const props = defineProps<{
  jobID: string
}>()

const toast = useToast()

// State variables
const membersDialog = ref(false)
const selectedMembers = ref<Member[]>([])
const members = ref<Member[]>([]) // Populate with your states data
const originalSelectedMembers = ref<Member[]>([])

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
  try {
    const response = await axios.get(
      `${API_URL}employee/detailed/all/${localStorage.getItem('employeeId')}`,
      config
    )
    if (response.status > 199 && response.status < 300) {
      console.log(response)
      members.value = response.data.data.map((employee: any) => ({
        _id: employee._id,
        userInfo: {
          firstName: employee.userInfo.firstName,
          surname: employee.userInfo.surname
        }
      }))
      console.log('Members only: ', members.value)
    } else {
      console.log('failed')
    }
  } catch (error) {
    console.log(error)
    console.error('Error updating job:', error)
  }
}
let req_loading = ref<boolean>(false)

const saveMembers = async () => {
  try {
    req_loading.value = true
    // Find members to remove
    const membersToRemove = originalSelectedMembers.value.filter(
      (originalMember) =>
        !selectedMembers.value.some((selectedMember) => selectedMember._id === originalMember._id)
    )

    // Remove unselected members
    for (const member of membersToRemove) {
      const response = await axios.patch(
        `${API_URL}job/employee`,
        {
          employeeId: localStorage.getItem('employeeId'),
          employeeToAssignId: member._id,
          jobId: props.jobID
        },
        config
      )
      if (response.status > 199 && response.status < 300) {
        console.log(`Removed member: ${member._id}`)
      } else {
        console.log('Failed to remove member', response)
      }
    }

    // Add new selected members
    for (const member of selectedMembers.value) {
      if (
        !originalSelectedMembers.value.some((originalMember) => originalMember._id === member._id)
      ) {
        console.log('Add new member option')
        console.log('Now in selected members', selectedMembers.value)
        console.log('member', member)
        const membervia = {
          employeeId: localStorage.getItem('employeeId'),
          employeeToAssignId: member._id,
          jobId: props.jobID
        }
        console.log('Member view', membervia)
        const response = await axios.put(
          `${API_URL}job/employee`,
          {
            employeeId: localStorage.getItem('employeeId'),
            employeeToAssignId: member,
            jobId: props.jobID
          },
          config
        )
        if (response.status > 199 && response.status < 300) {
          console.log('Member change', response)
          console.log(`Added member: ${member._id}`)
          showAssignEmployeesSuccess()
        } else {
          console.log('Failed to add member', response)
          showAssignEmployeesError()
        }
      }
    }

    // Update the original selected members
    originalSelectedMembers.value = [...selectedMembers.value]
  } catch (error) {
    console.log(error)
    showAssignEmployeesError()
  } finally {
    req_loading.value = false
  }
}

const getAssignedEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}job/id/${props.jobID}`, config)
    if (response.status > 199 && response.status < 300) {
      console.log(response)
      const employees = response.data.data.assignedEmployees.employeeIds
      selectedMembers.value = employees.map((employee: any) => ({
        _id: employee._id,
        userInfo: {
          firstName: employee.userInfo.firstName,
          surname: employee.userInfo.surname
        }
      }))
      console.log('Assigned Employees', selectedMembers.value)
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
  getAssignedEmployees().then(() => {
    originalSelectedMembers.value = [...selectedMembers.value]
  })
})

const getMembersFullName = (item: Member) => {
  if (item.userInfo && item.userInfo.firstName && item.userInfo.surname) {
    return `${item.userInfo.firstName} ${item.userInfo.surname}`
  }
  return ''
}
</script>
