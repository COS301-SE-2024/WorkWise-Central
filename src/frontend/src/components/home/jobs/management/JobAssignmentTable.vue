<script>
import AddJob from './AddJob.vue'

// const FakeAPI = {
//   async fetch({ page, itemsPerPage, sortBy }) {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         const start = (page - 1) * itemsPerPage;
//         const end = start + itemsPerPage;
//         const items = desserts.slice();
//
//         if (sortBy.length) {
//           const sortKey = sortBy[0].key;
//           const sortOrder = sortBy[0].order;
//           items.sort((a, b) => {
//             const aValue = a[sortKey];
//             const bValue = b[sortKey];
//             return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
//           });
//         }
//         const paginated = items.slice(start, end);
//         resolve({ items: paginated, total: items.length });
//       }, 500);
//     });
//   },
// };

const mockData = [
  {
    jobTitle: 'Software Engineer',
    client: 'Tech Corp',
    jobDescription: 'Develop and maintain software applications',
    status: 'Active',
    assignedTeam: 'Team Alpha',
    startDate: '2022-01-01',
    endDate: '2022-12-31',
    actions: 'Edit/Delete'
  },
  {
    jobTitle: 'Project Manager',
    client: 'Business Inc',
    jobDescription: 'Manage software development projects',
    status: 'Inactive',
    assignedTeam: 'Team Beta',
    startDate: '2022-02-01',
    endDate: '2022-11-30',
    actions: 'Edit/Delete'
  }
]

export default {
  data: () => ({
    itemsPerPage: 20,
    headers: [
      { text: 'Job Title', value: 'jobTitle', align: 'start' },
      { text: 'Client', value: 'client', align: 'start' },
      { text: 'Job Description', value: 'jobDescription', align: 'start' },
      { text: 'Status', value: 'status', align: 'start' },
      { text: 'Assigned Team', value: 'assignedTeam', align: 'start' },
      { text: 'Start Date', value: 'startDate', align: 'start' },
      { text: 'End Date', value: 'endDate', align: 'start' },
      { text: 'Actions', value: 'actions', align: 'start', sortable: false }
    ],
    search: '',
    serverItems: mockData,
    loading: false,
    totalItems: mockData.length
  }),
  components: {
    AddJob
  },
  methods: {
    // loadItems({ page, itemsPerPage, sortBy }) {},
    // editJob(item) {},
    // deleteJob(item) {}
  },
  created() {}
}
</script>

<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12">
        <v-card-title class="d-flex align-center pe-2">
          <v-icon left class="mr-2">mdi-briefcase</v-icon>
          <span class="title">Your Jobs</span>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-divider></v-divider>

        <v-row class="d-flex justify-space-between mb-4">
          <v-col cols="4">
            <v-spacer></v-spacer>
            <AddJob class="job-details-list" />
          </v-col>
          <v-col cols="4" class="d-flex justify-center">
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
              class="search-bar"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-spacer></v-spacer>
          </v-col>
        </v-row>

        <v-data-table-server
          :search="search"
          :headers="headers"
          :items-per-page="itemsPerPage"
          :items="serverItems"
          :items-length="totalItems"
          :loading="loading"
          item-value="name"
          @update:options="loadItems"
          class="elevation-1 custom-table"
          flat
        >
          <template v-slot:headers>
            <tr>
              <th v-for="header in headers" :key="header.text">
                {{ header.text }}
              </th>
            </tr>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon @click="editJob(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteJob(item)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table-server>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
