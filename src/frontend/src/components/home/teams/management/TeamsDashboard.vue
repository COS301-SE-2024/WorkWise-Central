<template>
  <v-container fluid fill-height>
    <v-card
      height="auto"
      class="pa-11 ma-0 bg-cardColor"
      rounded="md"
      :theme="isdarkmode ? 'themes.dark' : 'themes.light'"
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
          :items="teamItemMockData"
          :search="search"
          height="auto"
          class="bg-cardColor"
          :row-props="getRowProps"
        >
          <template v-slot:[`item.currentJobAssignments`] ="{item}">
            <v-chip
              v-for="job in item.currentJobAssignments"
              :key="job.jobId"
              color="primary"
              class="mr-2"
              >{{ job.jobTitle }}</v-chip
            >
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-menu max-width="500px" :theme="isdarkmode === true ? 'dark' : 'light'">
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
                  <UpdateTeam :team_id="selectedItemID" :editedItem="selectedItem" :teamLeaderIds="ids" />
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
      ids:[1,2,4,5,6,7,8,9,10],
      teamHeaders: [
        { title: 'Team Name', value: 'teamName' },
        { title: 'Team Leader', value: 'teamLeaderId' },
        { title: 'Current Job Assignments', value: 'currentJobAssignments' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      teamItems: [],
      teamItemMockData: [
        {
          _id: '1',
          companyId: '1',
          teamName: 'Alpha Team',
          teamMembers: [
            {
              id: '1',
              name: 'John Doe',
              role: 'Software Engineer',
              email: 'johndoe@company.com',
              contactNumber: '123-456-7890'
            },
            {
              id: '2',
              name: 'Jane Doe',
              role: 'UI/UX Designer',
              email: 'janedoe@company.com',
              contactNumber: '234-567-8901'
            },
            {
              id: '3',
              name: 'John Smith',
              role: 'Project Manager',
              email: 'johnsmith@company.com',
              contactNumber: '345-678-9012'
            },
            {
              id: '4',
              name: 'Jane Smith',
              role: 'QA Engineer',
              email: 'janesmith@company.com',
              contactNumber: '456-789-0123'
            }
          ],
          teamLeaderId: '1',
          currentJobAssignments: [
            {
              jobId: '101',
              jobTitle: 'Website Redesign',
              status: 'In Progress'
            },
            {
              jobId: '102',
              jobTitle: 'Mobile App Development',
              status: 'Completed'
            }
          ]
        },
        {
          _id: '2',
          companyId: '1',
          teamName: 'Beta Team',
          teamMembers: [
            {
              id: '5',
              name: 'Emily Davis',
              role: 'Software Engineer',
              email: 'emilydavis@company.com',
              contactNumber: '567-890-1234'
            },
            {
              id: '6',
              name: 'Michael Brown',
              role: 'DevOps Engineer',
              email: 'michaelbrown@company.com',
              contactNumber: '678-901-2345'
            }
          ],
          teamLeaderId: '2',
          currentJobAssignments: [
            {
              jobId: '103',
              jobTitle: 'Cloud Infrastructure Setup',
              status: 'Pending'
            }
          ]
        },
        {
          _id: '3',
          companyId: '1',
          teamName: 'Gamma Team',
          teamMembers: [
            {
              id: '7',
              name: 'Chris Green',
              role: 'Data Scientist',
              email: 'chrisgreen@company.com',
              contactNumber: '789-012-3456'
            }
          ],
          teamLeaderId: '3',
          currentJobAssignments: []
        }
      ],
      isdarkmode: localStorage.getItem('theme') === 'true' ? true : false,
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
      } catch (error) {
        console.error(error)
      }
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
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
