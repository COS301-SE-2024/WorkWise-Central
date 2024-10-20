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
        Assigned Teams
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card class="bg-cardColor">
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Assigned Teams
        </v-card-title>
        <v-card-text>
          <div class="text-caption pa-3">Select Teams</div>
          <v-select
              v-model="selectedTeams"
              :items="teams"
              item-title="teamName"
              item-value="_id"
              hint="Select teams to assign to a job"
              label="Select Teams"
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
          <v-container>
            <v-row>
              <v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn @click="saveTeams" color="success" block :loading="req_loading">
                  <v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon>Save
                </v-btn>
              </v-col>
              <v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn @click="isActive.value = false" color="error" block :disabled="req_loading">
                  <v-icon icon="fa:fa-solid fa-cancel" color="error"></v-icon>Cancel
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
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

interface Team {
  _id: string
  teamName: string
  teamMembers: any[]
  teamLeaderId: string
  currentJobAssignments: any[]
}

const props = defineProps<{
  jobID: string
}>()

const toast = useToast()

// State variables
const membersDialog = ref(false)
const selectedTeams = ref<Team[]>([])
const teams = ref<Team[]>([]) // Populate with your states data
const originalSelectedTeams = ref<Team[]>([])

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

const showAssignTeamsSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Assigned teams successfully',
    life: 3000
  })
}

const showAssignTeamsError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'Failed to assign teams',
    life: 3000
  })
}

const getTeams = async () => {
  try {
    const response = await axios.get(
        `${API_URL}team/detailed/table/all/${localStorage.getItem('currentCompany')}?employeeId=${localStorage.getItem('employeeId')}`,
        config
    )
    if (response.status > 199 && response.status < 300) {
      console.log(response)
      teams.value = response.data.data.map((team: any) => ({
        _id: team._id,
        teamName: team.teamName,
        teamMembers: team.teamMembers,
        teamLeaderId: team.teamLeaderId,
        currentJobAssignments: team.currentJobAssignments
      }))
      console.log('Teams only: ', teams.value)
    } else {
      console.log('failed')
    }
  } catch (error) {
    console.log(error)
    console.error('Error fetching teams:', error)
  }
}
let req_loading = ref<boolean>(false)

const saveTeams = async () => {
  try {
    req_loading.value = true
    // Find teams to remove
    const teamsToRemove = originalSelectedTeams.value.filter(
        (originalTeam) =>
            !selectedTeams.value.some((selectedTeam) => selectedTeam._id === originalTeam._id)
    )

    // Remove unselected teams
    for (const team of teamsToRemove) {
      const response = await axios.patch(
          `${API_URL}job/team`,
          {
            employeeId: localStorage.getItem('employeeId'),
            teamId: team._id,
            jobId: props.jobID
          },
          config
      )
      if (response.status > 199 && response.status < 300) {
        console.log(`Removed team: ${team}`)
      } else {
        console.log('Failed to remove team', response)
      }
    }

    // Add new selected teams
    for (const team of selectedTeams.value) {
      if (
          !originalSelectedTeams.value.some((originalTeam) => originalTeam._id === team._id)
      ) {
        console.log('Add new team option')
        console.log('Now in selected teams', selectedTeams.value)
        console.log('team', team)
        const response = await axios.put(
            `${API_URL}job/team`,
            {
              employeeId: localStorage.getItem('employeeId'),
              teamId: team,
              jobId: props.jobID
            },
            config
        )
        if (response.status > 199 && response.status < 300) {
          console.log('Team change', response)
          console.log(`Added team: ${team._id}`)
          showAssignTeamsSuccess()
        } else {
          console.log('Failed to add team', response)
          showAssignTeamsError()
        }
      }
    }

    // Update the original selected teams
    originalSelectedTeams.value = [...selectedTeams.value]
    membersDialog.value = false
  } catch (error) {
    console.log(error)
    showAssignTeamsError()
  } finally {
    req_loading.value = false
  }
}

const getAssignedTeams = async () => {
  try {
    const response = await axios.get(`${API_URL}job/id/${props.jobID}`, config)
    if (response.status > 199 && response.status < 300) {
      console.log(response)
      const teamIds = response.data.data.assignedEmployees.teamIds
      selectedTeams.value = teams.value.filter((team: any) => teamIds.includes(team._id))
      console.log('Assigned Teams', selectedTeams.value)
    } else {
      console.log('failed')
    }
  } catch (error) {
    console.log(error)
    console.error('Error fetching assigned teams:', error)
  }
}


onMounted(() => {
  getTeams()
  getAssignedTeams().then(() => {
    originalSelectedTeams.value = [...selectedTeams.value]
  })
})
</script>