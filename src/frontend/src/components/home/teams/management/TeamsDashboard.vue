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
          :items="teamItems"
          :search="search"
          height="auto"
          class="bg-cardColor"
          :row-props="getRowProps"
        >
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
                  <UpdateTeam :team_id="selectedItemID" :team="selectedItem" />
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
interface Team {
  id: string
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
        { text: 'Team Name', value: 'teamName' },
        { text: 'Team Leader', value: 'teamLeaderId' },
        { text: 'Current Job Assignments', value: 'currentJobAssignments' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      teamItems: [
        {
          id: 1,
          companyId: 1,
          teamName: 'Development Team',
          teamMembers: [
            /* Member objects here */
          ],
          teamLeaderId: 101,
          currentJobAssignments: [
            /* Assignment objects here */
          ]
        },
        {
          id: 2,
          companyId: 1,
          teamName: 'Marketing Team',
          teamMembers: [
            /* Member objects here */
          ],
          teamLeaderId: 102,
          currentJobAssignments: [
            /* Assignment objects here */
          ]
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
      this.selectedItemID = item.id
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
