<template>
  <v-container>
    <v-tabs bg-color="secondary" dark>
      <v-tab v-for="tab in tabs" :key="tab" @click="changeSection(tab)">
        {{ tab }}
      </v-tab>
    </v-tabs>

    <v-tab-item>
      <Toast position="top-center" />
      <v-card class="bg-cardColor">
        <v-card-title
          class="d-flex align-center pe-2 text-h5 font-weight-regular"
          height="auto"
          width="100%"
          ><v-row align="center" justify="space-between"
            ><v-col cols="12" lg="6">
              <v-label
                class="ms-2 h2 font-family-Nunito text-headingTextColor"
                height="auto"
                width="auto"
                >{{ currentTab }}</v-label
              ></v-col
            ><v-col cols="12" lg="6"></v-col
          ></v-row>
        </v-card-title>
        <v-card-text>
          <v-tab-item v-if="currentTab === 'Employees'"
            ><v-data-table
              :headers="employeeHeaders"
              :items="employees"
              item-key="id"
              class="bg-cardColor"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn @click="openEmployeeDialog(item)" color="primary">
                  <v-icon>mdi-dots-horizontal</v-icon></v-btn
                >
              </template>
            </v-data-table></v-tab-item
          >

          <v-tab-item v-if="currentTab === 'Roles'">
            <v-data-table
              :headers="roleHeaders"
              :items="roleUpdates"
              item-key="id"
              class="bg-cardColor"
            >
              <template v-slot:[`item.actions`]="{ item }">
                <v-btn @click="openRoleDialog(item)" color="primary">
                  <v-icon color="primary">mdi-dots-horizontal</v-icon></v-btn
                >
              </template>
            </v-data-table>
          </v-tab-item>
        </v-card-text>
      </v-card>
    </v-tab-item>

    <!-- Employee Edit Dialog -->
    <v-dialog v-model="employeeDialog" max-width="500px">
      <v-card class="bg-cardColor">
        <v-card-title>Edit Employee's Hourly Rate</v-card-title>
        <v-card-subtitle>
          <v-text-field
            v-model="currentEmployee.userInfo.firstName"
            label="First Name"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="currentEmployee.userInfo.surname"
            label="Last Name"
            readonly
          ></v-text-field>
          <v-text-field
            v-model="currentEmployee.hourlyRate"
            label="Hourly Rate"
            type="number"
          ></v-text-field>
        </v-card-subtitle>
        <v-card-actions>
          <v-container
            ><v-row
              ><v-col cols="12" lg="6" order="first" order-lg="last"
                ><v-btn @click="updateHourlyRateEmployee" block color="success"
                  ><v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon>Save</v-btn
                ></v-col
              ><v-col cols="12" lg="6"
                ><v-btn @click="employeeDialog = false" block color="error"
                  ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Cancel</v-btn
                ></v-col
              ></v-row
            ></v-container
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Role Edit Dialog -->
    <v-dialog v-model="roleDialog" max-width="500px">
      <v-card class="bg-cardColor">
        <v-card-title>Edit Role's Hourly Rate</v-card-title>
        <v-card-subtitle>
          <v-text-field v-model="currentRole.roleName" label="Role Name" readonly></v-text-field>
          <v-text-field
            v-model="currentRole.hourlyRate"
            label="Hourly Rate"
            type="number"
          ></v-text-field>
        </v-card-subtitle>
        <v-card-actions>
          <v-container
            ><v-row
              ><v-col cols="12" lg="6" order="first" order-lg="last"
                ><v-btn @click="saveRoleChanges" block color="success"
                  ><v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon>Save</v-btn
                ></v-col
              ><v-col cols="12" lg="6"
                ><v-btn @click="roleDialog = false" block color="error"
                  ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Cancel</v-btn
                ></v-col
              ></v-row
            ></v-container
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import axios from 'axios'
import { API_URL } from '@/main'

export default {
  name: 'HourlyRate',

  data() {
    return {
      currentTab: 'Employees',
      tabs: ['Employees', 'Roles'],
      employeeHeaders: [
        { title: 'First Name', value: 'userInfo.firstName' },
        { title: 'Last Name', value: 'userInfo.surname' },
        { title: 'Hourly Rate', value: 'hourlyRate' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      roleHeaders: [
        { title: 'Role Name', value: 'roleName' },
        { title: 'Hourly Rate', value: 'hourlyRate' },
        { title: 'Actions', value: 'actions', sortable: false }
      ],
      employees: [
        { id: 1, firstName: 'John', lastName: 'Doe', hourlyRate: 30 },
        { id: 2, firstName: 'Jane', lastName: 'Smith', hourlyRate: 25 }
      ],
      roles: [
        { id: 1, roleName: 'Developer', hourlyRate: 50 },
        { id: 2, roleName: 'Designer', hourlyRate: 40 }
      ],
      employeeDialog: false,
      roleDialog: false,
      currentEmployee: {} as any,
      currentRole: {} as any,
      roleUpdates: [] as any,
      roleIds: [] as any,
      selectedItem: {} as any
    }
  },
  methods: {
    openEmployeeDialog(employee: any) {
      this.currentEmployee = { ...employee }
      this.employeeDialog = true
    },
    openRoleDialog(role: any) {
      this.currentRole = { ...role }
      this.roleDialog = true
    },
    saveEmployeeChanges() {
      const index = this.employees.findIndex((e: any) => e.id === this.currentEmployee.id)
      if (index !== -1) {
        this.employees[index] = { ...this.currentEmployee }
      }
      this.employeeDialog = false
    },
    saveRoleChanges() {
      const index = this.roles.findIndex((r: any) => r.id === this.currentRole.id)
      if (index !== -1) {
        this.roles[index] = { ...this.currentRole }
      }
      this.roleDialog = false
    },
    changeSection(section: string) {
      this.currentTab = section
    },
    async getRoles() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      await axios
        .get(`${API_URL}role/all/${localStorage.getItem('currentCompany')}`, config)
        .then((response) => {
          console.log(response.data.data.length)

          for (let i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].roleName) {
              this.roleUpdates.push({
                _id: response.data.data[i]._id,
                roleName: response.data.data[i].roleName,
                permissionSuite: response.data.data[i].permissionSuite
              })
              this.roleIds.push(response.data.data[i]._id)
            }
          }

          console.log(this.roleUpdates)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async updateHourlyRateEmployee() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        data: {
          currentEmployeeId: localStorage.getItem('employeeId'),
          hourlyRate: this.currentEmployee.hourlyRate
        }
      }
      try {
        const response = await axios.patch(
          `${API_URL}employee/${this.currentEmployee.employeeId}`,
          config
        )
        console.log(response.data.data)
        this.employees = response.data.data
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
      try {
        const response = await axios.get(
          `${API_URL}employee/all/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response.data.data)
        this.employees = response.data.data
      } catch (error) {
        console.error(error)
      }
    },
    selectItem(item: any) {
      console.log(item)
      this.selectedItem = item
    }
  },
  mounted() {
    this.getEmployees()
    this.getRoles()
  }
}
</script>

<style scoped>
/* Add your styles here */
</style>
