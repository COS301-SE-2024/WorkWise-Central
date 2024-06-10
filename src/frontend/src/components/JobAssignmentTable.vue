<script>
  import { defineComponent } from 'vue'
  import JobDetailsList from '../components/AddJob.vue';

  const FakeAPI = {
    async fetch({ page, itemsPerPage, sortBy }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const start = (page - 1) * itemsPerPage;
          const end = start + itemsPerPage;
          const items = desserts.slice();

          if (sortBy.length) {
            const sortKey = sortBy[0].key;
            const sortOrder = sortBy[0].order;
            items.sort((a, b) => {
              const aValue = a[sortKey];
              const bValue = b[sortKey];
              return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
            });
          }
          const paginated = items.slice(start, end);
          resolve({ items: paginated, total: items.length });
        }, 500);
      });
    },
  };

  export default {
    data: () => ({
      itemsPerPage: 20,
      headers: [
        { text: 'Assigned Employees', value: 'name', align: 'start', sortable: false },
        { text: 'Job Name', value: 'calories', align: 'end' },
        { text: 'Client Name', value: 'fat', align: 'end' },
        { text: 'Carbs (g)', value: 'carbs', align: 'end' },
        { text: 'Protein (g)', value: 'protein', align: 'end' },
        { text: 'Iron (%)', value: 'iron', align: 'end' },
        { text: 'Actions', value: 'actions', align: 'end' },
      ],
      search: '',
      serverItems: [],
      loading: true,
      totalItems: 0,
    }),
    components: {
      JobDetailsList
    },
    methods: {
      loadItems({ page, itemsPerPage, sortBy }) {
        this.loading = true;
        FakeAPI.fetch({ page, itemsPerPage, sortBy }).then(({ items, total }) => {
          this.serverItems = items;
          this.totalItems = total;
          this.loading = false;
        });
      },
      toggleDropdown(value) {
        // Add your dropdown logic here
      },
      editCell() {
        // Add your edit cell logic here
      },
      groupBy() {
        // Add your group by logic here
      },
      sortByAsc() {
        // Add your sort by ascending logic here
      },
      pinColumn() {
        // Add your pin column logic here
      },
      editJob(item) {
        // Add your edit job logic here
      },
      deleteJob(item) {
        // Add your delete job logic here
      },
    },
    created() {
      this.loadItems({ page: 1, itemsPerPage: this.itemsPerPage, sortBy: [] });
    },
  };
</script>

<template>
<v-container fluid>
    <v-row justify="center">
      <v-col 
        cols="9"
        offset="2"
      >
        <v-card-title class="d-flex align-center pe-2">
          <v-icon left class="mr-2">mdi-briefcase</v-icon>
          <span>Job Management</span>
          <v-spacer></v-spacer>
        </v-card-title>

        <v-divider></v-divider>

        <v-row class="d-flex justify-space-between">
          <v-col cols="4">
            <JobDetailsList class="job-details-list" />
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
            ></v-text-field>
          </v-col>  
        </v-row>

        <v-data-table-server
          :search="search"
          :items-per-page="itemsPerPage"
          :headers="headers"
          :items="serverItems"
          :items-length="totalItems"
          :loading="loading"
          item-value="name"
          @update:options="loadItems"
          class="elevation-1"
          flat
        >
          <template v-slot:header>
            <tr>
              <th
                v-for="header in headers"
                :key="header.text"
                :class="{ 'text-left': header.value !== 'actions', 'text-right': header.value === 'actions' }"
                @click="toggleDropdown(header.value)"
              >
                {{ header.text }}
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon v-bind="attrs" v-on="on">mdi-dots-vertical</v-icon>
                  </template>
                  <v-list>
                    <v-list-item @click="editCell">Edit</v-list-item>
                    <v-list-item @click="groupBy">Group By</v-list-item>
                    <v-list-item @click="sortByAsc">Sort By Asc (Ascending)</v-list-item>
                    <v-list-item @click="pinColumn">Pin Column</v-list-item>
                  </v-list>
                </v-menu>
              </th>
            </tr>
          </template>
          <template v-slot:item.actions="{ item }">
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

  
  <style scoped>
  /* Add your custom styles here */
  .mr-2 {
    margin-right: 10px; /* Adjust as needed */
  }
  </style>
  