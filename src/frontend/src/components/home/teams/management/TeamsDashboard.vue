<template>
  <v-app :style="isDarkMode === true ? 'dark' : 'light'">
    <v-container fluid fill-height>
      <v-card height="auto" class="pa-11 ma-0 bg-cardColor" rounded="md" border="md">
        <v-card-title
          class="d-flex align-center pe-2 text-h5 font-weight-regular"
          height="auto"
          width="100%"
        >
          <v-row align="center" justify="space-between">
            <v-col cols="12" lg="4" class="d-flex align-center">
              <v-icon icon="fa: fa-solid fa-people-group"></v-icon>
              <v-label
                class="ms-2 h4 font-family-Nunito text-headingTextColor"
                height="auto"
                width="auto"
                >Teams</v-label
              >
            </v-col>

            <v-col cols="12" lg="4">
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

            <v-col
              cols="12"
              lg="4"
              class="d-flex justify-end"
              v-if="checkPermission('add new teams')"
            >
              <CreateTeam @teamCreated="getTeams" />
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
            :header-props="{ class: 'bg-secondRowColor h6' }"
          >
            <template v-slot:[`item.`]> </template>
            <template v-slot:[`item.currentJobAssignments`]="{ item }">
              <v-chip :color="chipColor(item.currentJobAssignments.length)">
                {{ item.currentJobAssignments.length }}
              </v-chip>
            </template>

            <!-- Actions slot -->
            <template v-slot:[`item.actions`]="{ item }">
              <v-menu max-width="500px" v-bind="menuProps">
                <template v-slot:activator="{ props }">
                  <v-btn
                    rounded="xl"
                    variant="plain"
                    v-bind="props"
                    @click="selectItem(item)"
                    v-show="
                      checkPermission('view teams') ||
                      checkPermission('view my teams') ||
                      checkPermission('edit teams') ||
                      checkPermission('delete teams')
                    "
                  >
                    <v-icon color="primary" style="font-size: 25px; padding: 8px">
                      mdi-dots-horizontal
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                    v-show="checkPermission('view teams') || checkPermission('view my teams')"
                  >
                    <ViewTeam :team="selectedItem" />
                  </v-list-item>
                  <v-list-item v-show="checkPermission('edit teams')">
                    <UpdateTeam
                      @teamUpdated="getTeams"
                      :teamId="selectedItemID"
                      :editedItem="selectedItem"
                    />
                  </v-list-item>
                  <v-list-item v-show="checkPermission('delete teams')">
                    <DeleteTeam
                      @teamDeleted="getTeams"
                      :team_id="selectedItemID"
                      :teamName="selectedItemName"
                    />
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CreateTeam from './CreateTeam.vue'
import ViewTeam from './ViewTeam.vue'
import UpdateTeam from './UpdateTeam.vue'
import DeleteTeam from './DeleteTeam.vue'
import axios from 'axios'
import { API_URL } from '@/main'

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
      menuVisible: false,
      teamHeaders: [
        { title: 'Team Name', value: 'teamName' },
        { title: 'Team Leader', value: 'teamLeaderId.userInfo.displayName' },
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
      isDarkMode: true,
      selectedItem: {},
      selectedItemName: '',
      selectedItemID: '',
      actionsMenu: false,
      employeePermissions: [] as string[]
    }
  },
  computed: {
    menuProps() {
      return {
        'v-model': this.menuVisible // Bind the visibility state using v-bind
      }
    }
  },
  methods: {
    getRowProps(index: any) {
      console.log(index)
      return {
        class: index % 2 ? 'bg-secondRowColor' : ''
      }
    },
    async getEmployeePermissions() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      axios
        .get(`${API_URL}employee/detailed/id/${localStorage.getItem('employeeId')}`, config)
        .then((response) => {
          console.log(response.data.data.role.permissionSuite)
          this.employeePermissions = response.data.data.role.permissionSuite
        })
        .catch((error) => {
          console.error('Failed to fetch employees:', error)
        })
    },
    checkPermission(permission: string) {
      return this.employeePermissions.includes(permission)
    },
    updateTeamInList(updatedTeam: Team) {
      const index = this.teamItems.findIndex((team) => team._id === updatedTeam._id)
      if (index !== -1) {
        this.teamItems.splice(index, 1, updatedTeam)
      }
    },
    removeTeamFromList(deletedTeamId: String) {
      const index = this.teamItems.findIndex((team) => team._id === deletedTeamId)
      if (index !== -1) {
        this.teamItems.splice(index, 1)
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
      this.menuVisible = true // Open the menu
    },
    chipColor(numAssignments: number) {
      if (numAssignments > 0) {
        return 'success'
      } else {
        return 'error'
      }
    },
    async getTeams() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      try {
        const response = await axios.get(
          `${API_URL}team/detailed/table/all/${localStorage.getItem('currentCompany')}?employeeId=${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response.data.data)
        this.teamItems = response.data.data
        this.teamLeaderId = response.data.data.teamLeaderId
      } catch (error) {
        console.error(error)
      }
      this.menuVisible = false
    },
    addTeam(newTeam: Team) {
      this.teamItems.push(newTeam)
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
      axios
        .get(`${API_URL}employee/detailed/id/${this.teamLeaderId}`, config)
        .then((response) => {
          console.log(response.data.data.userInfo.displayName)
          this.teamLeaderName = response.data.data.userInfo.displayName
        })
        .catch((error) => {
          console.error('Failed to fetch employees:', error)
        })
    }
  },
  mounted() {
    this.getTeams()
    this.populateTeamTable()
    // this.getTeamLeaderName()
    this.isDarkMode = localStorage.getItem('theme') === 'true' ? true : false
    this.getEmployeePermissions()
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
