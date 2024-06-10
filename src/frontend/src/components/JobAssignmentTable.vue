<script>
  import JobDetailsList from "../components/AddJob.vue";
  import {ref} from 'vue';
  const showAddJobModal = ref(false);


  const desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
      fat: 6.0,
      carbs: 24,
      protein: 4.0,
      iron: '1',
    },
    {
      name: 'Jelly bean',
      calories: 375,
      fat: 0.0,
      carbs: 94,
      protein: 0.0,
      iron: '0',
    },
    {
      name: 'KitKat',
      calories: 518,
      fat: 26.0,
      carbs: 65,
      protein: 7,
      iron: '6',
    },
    {
      name: 'Eclair',
      calories: 262,
      fat: 16.0,
      carbs: 23,
      protein: 6.0,
      iron: '7',
    },
    {
      name: 'Gingerbread',
      calories: 356,
      fat: 16.0,
      carbs: 49,
      protein: 3.9,
      iron: '16',
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
      fat: 9.0,
      carbs: 37,
      protein: 4.3,
      iron: '1',
    },
    {
      name: 'Lollipop',
      calories: 392,
      fat: 0.2,
      carbs: 98,
      protein: 0,
      iron: '2',
    },
    {
      name: 'Cupcake',
      calories: 305,
      fat: 3.7,
      carbs: 67,
      protein: 4.3,
      iron: '8',
    },
    {
      name: 'Honeycomb',
      calories: 408,
      fat: 3.2,
      carbs: 87,
      protein: 6.5,
      iron: '45',
    },
    {
      name: 'Donut',
      calories: 452,
      fat: 25.0,
      carbs: 51,
      protein: 4.9,
      iron: '22',
    },
  ];

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
        { text: 'Prioriy', value: 'fat', align: 'end' },
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
          <v-btn icon @click="showAddJobModal = true">
            <v-icon>mdi-plus</v-icon>
            <JobDetailsList v-if="showAddJobModal" @close="showAddJobModal= false"/>
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-row justify="end">
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
  