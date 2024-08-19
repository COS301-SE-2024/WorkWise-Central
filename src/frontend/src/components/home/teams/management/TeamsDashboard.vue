<template>
  <v-container fluid fill-height>
    <v-card
      height="auto"
      class="pa-11 ma-0 bg-cardColor"
      rounded="md"
      :theme="isDarkMode ? 'themes.dark' : 'themes.light'"
      border="md"
    >
      <v-card-title
        class="d-flex align-center pe-2 text-h5 font-weight-regular"
        height="auto"
        width="100%"
      >
        <v-row align="center" justify="space-between">
          <v-col cols="12" md="4" sm="6" xs="12" class="d-flex align-center">
            <v-icon icon="fa: fa-solid fa-users"></v-icon>
            <v-label
              class="ms-2 h4 font-family-Nunito text-headingTextColor"
              height="auto"
              width="auto"
              >Teams</v-label
            >
          </v-col>

          <v-col cols="12" md="4" sm="6" xs="12">
            <v-text-field
              v-model="search"
              density="compact"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              flat
              color="primary"
              width="100%"
              hide-details="auto"
              single-line
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4" sm="12" xs="12" class="d-flex justify-end">
            <CreateTeam />
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table
          :headers="teamHeaders"
          :items="teamItems"
          :search="search"
          height="auto"
          class="bg-cardColor"
          :row-props="getRowProps"
        >
          <template v-slot:[`item.currentJobAssignments`]="{ item }">
            <v-chip v-for="job in item.currentJobAssignments" :key="job">
              {{ job }}
            </v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-menu max-width="500px" :theme="isDarkMode === true ? 'dark' : 'light'">
              <template v-slot:activator="{ props }">
                <v-btn rounded="xl" variant="plain" v-bind="props" @click="selectItem(item)">
                  <v-icon color="primary">mdi-dots-horizontal</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <ViewTeam :team="selectedItem" />
                </v-list-item>
                <v-list-item>
                  <UpdateTeam :teamId="selectedItemID" :editedItem="selectedItem" />
                </v-list-item>
                <v-list-item>
                  <DeleteTeam :team_id="selectedItemID" :teamName="selectedItemName" />
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CreateTeam from './CreateTeam.vue'
import ViewTeam from './ViewTeam.vue'
import UpdateTeam from './UpdateTeam.vue'
import DeleteTeam from './DeleteTeam.vue'
import axios from 'axios'
interface Team {
  _id: string
  companyId: string
  teamName: string
  teamMembers: []
  teamLeaderId: string
  currentJobAssignments: []
}

export default defineComponent({
  name: 'TeamDashboard',
  components: { CreateTeam, ViewTeam, UpdateTeam, DeleteTeam },
  data() {
    return {
      search: '',

      teamHeaders: [
        { title: 'Team Name', value: 'teamName' },
        { title: 'Team Leader', value: 'teamLeaderId' },
        { title: 'Current Job Assignments', value: 'currentJobAssignments' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      teamItems: [] as Team[],
      teamTable: [
        {
          teamName: 'Team 1',
          teamLeader: 'John Doe',
          currentJobAssignments: ['Job 1', 'Job 2']
        }
      ],
      teamLeaderId: '',
      teamLeaderName: '',
      teamMemberNames: [] as string[],
      isDarkMode: localStorage.getItem('theme') === 'true' ? true : false,
      selectedItem: {},
      selectedItemName: '',
      selectedItemID: '',
      actionsMenu: false,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/'
    }
  },
  methods: {
    getRowProps(index: number) {
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    },
    populateTeamTable() {
      for (const team of this.teamItems) {
        this.teamTable.push({
          teamName: team.teamName,
          teamLeader: this.teamLeaderName,
          currentJobAssignments: team.currentJobAssignments
        })
      }
    },
    selectItem(item: Team) {
      console.log(item)
      this.selectedItem = item
      this.selectedItemName = item.teamName
      this.selectedItemID = item._id
    },
    async getTeams() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(`${apiURL}team/all`, config)
        console.log(response.data.data)
        this.teamItems = response.data.data
        this.teamLeaderId = response.data.data.teamLeaderId
      } catch (error) {
        console.error(error)
      }
    },
    async getEmployees() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(
          `${apiURL}employee/all/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response.data.data)
        for (const employee of response.data.data) {
          this.teamMemberNames.push(employee.userInfo.displayName)
        }
      } catch (error) {
        console.error(error)
      }
    },
    async getTeamLeaderName() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      axios
        .get(`${apiURL}employee/detailed/id/${this.teamLeaderId}`, config)
        .then((response) => {
          console.log(response.data.data.userInfo.displayName)
          this.teamLeaderName = response.data.data.userInfo.displayName
        })
        .catch((error) => {
          console.error('Failed to fetch employees:', error)
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
    }
  },
  mounted() {
    this.getTeams()
    this.populateTeamTable()
    this.getTeamLeaderName()
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
