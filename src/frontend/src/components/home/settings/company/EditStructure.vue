<template>
  <v-container>
    <v-card>
      <v-card-title class="text-center">Edit Roles</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <OrganizationChart :value="orgData" @nodeDrop="onNodeDrop" draggable />
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="bg-cardColor">
        <v-col align="center">
          <v-btn color="success" @click="saveChanges">Save</v-btn>
        </v-col>
        <v-col align="center">
          <v-btn color="error" @click="cancel">Cancel</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-container>
</template>


<script>
import OrganizationChart from 'primevue/organizationchart'
import Toast from 'primevue/toast'

export default {
  components: {
    OrganizationChart,
    Toast
  },
  data() {
    return {
      orgData: {
        name: 'CEO',
        children: [
          {
            name: 'CTO',
            children: [
              { name: 'Dev Manager', children: [{ name: 'Developer' }] },
              { name: 'QA Manager', children: [{ name: 'QA Tester' }] }
            ]
          },
          {
            name: 'CFO',
            children: [{ name: 'Account Manager', children: [{ name: 'Accountant' }] }]
          },
          {
            name: 'COO',
            children: [{ name: 'Operations Manager', children: [{ name: 'Operations Staff' }] }]
          }
        ]
      }
    }
  },
  methods: {
    updateOrgData(newData) {
      this.orgData = newData
    },
    saveChanges() {
      // Logic to save changes
      console.log('Changes saved:', this.orgData)
    },
    cancel() {
      // Logic to cancel changes
      console.log('Changes canceled')
    }
  }
}
</script>

<style scoped>
.bg-cardColor {
  background-color: #f5f5f5;
}
</style>
