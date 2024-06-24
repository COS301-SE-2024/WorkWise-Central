<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ManagerEditEmployee',
  data() {
    return {
      role_change: false,
      firstName: '',
      surName: '',
      clientDetails: [
        {
          id: 59,
          firstName: 'Michael',
          surname: 'Brown',
          clientInfo: {
            phoneNumber: '+1230984567',
            email: 'michael.brown@example.com',
            address: {
              street: '101 Pine St',
              suburb: 'Old Town',
              city: 'Central City',
              postalCode: '45678',
              complex: 'Forest Complex',
              houseNumber: '10D'
            }
          }
        },
        {
          id: 87,
          firstName: 'Emily',
          surname: 'Clark',
          clientInfo: {
            phoneNumber: '+3216549870',
            email: 'emily.clark@example.com',
            address: {
              street: '202 Cedar St',
              suburb: 'Riverdale',
              city: 'Metropolis',
              postalCode: '98765',
              complex: 'Lakeview Complex',
              houseNumber: '20E'
            }
          },
          preferred_Language: 'Italian'
        },
        {
          id: 63,
          firstName: 'David',
          surname: 'White',
          clientInfo: {
            phoneNumber: '+4567891230',
            email: 'david.white@example.com',
            address: {
              street: '303 Birch St',
              suburb: 'Southside',
              city: 'Gotham',
              postalCode: '87654',
              complex: 'Mountain Complex',
              houseNumber: '30F'
            }
          },
          preferred_Language: 'Japanese',
          role: 'Data Analyst'
        },
        {
          id: 34,
          firstName: 'Laura',
          surname: 'Davis',
          clientInfo: {
            phoneNumber: '+5678901234',
            email: 'laura.davis@example.com',
            address: {
              street: '404 Spruce St',
              suburb: 'Westside',
              city: 'Star City',
              postalCode: '76543',
              complex: 'Hilltop Complex',
              houseNumber: '40G'
            }
          },
          preferred_Language: 'Chinese',
          role: 'HR Manager'
        },
        {
          id: 41,
          firstName: 'Sarah',
          surname: 'Miller',
          clientInfo: {
            phoneNumber: '+6789012345',
            email: 'sarah.miller@example.com',
            address: {
              street: '505 Maple St',
              suburb: 'Eastside',
              city: 'Central City',
              postalCode: '65432',
              complex: 'Riverside Complex',
              houseNumber: '50H'
            }
          },
          preferred_Language: 'Portuguese',
          role: 'Marketing Specialist'
        },
        {
          id: 12,
          firstName: 'James',
          surname: 'Jones',
          clientInfo: {
            phoneNumber: '+7890123456',
            email: 'james.jones@example.com',
            address: {
              street: '606 Willow St',
              suburb: 'Northside',
              city: 'Metropolis',
              postalCode: '54321',
              complex: 'Seaside Complex',
              houseNumber: '60I'
            }
          },
          preferred_Language: 'Korean',
          role: 'Finance Manager'
        },
        {
          id: 441,
          firstName: 'Amelia',
          surname: 'Taylor',
          clientInfo: {
            phoneNumber: '+8901234567',
            email: 'amelia.taylor@example.com',
            address: {
              street: '707 Cherry St',
              suburb: 'Central Park',
              city: 'Gotham',
              postalCode: '43210',
              complex: 'Parkview Complex',
              houseNumber: '70J'
            }
          },
          preferred_Language: 'Russian',
          role: 'Operations Manager'
        }
      ]
    }
  },
  methods: {
    change_roles() {
      console.log('hELLO')
      this.role_change = true
    },
    rolebtnclick() {
      alert('Role changed successfully')
      this.$router.push('/manager-employees-t')
    },
    client_details_id(val: number) {
      for (let i = 0; i < this.clientDetails.length; i++) {
        if (this.clientDetails[i].id === val) {
          this.firstName = this.clientDetails[i].firstName
          this.surName = this.clientDetails[i].surname
        }
      }
    }
  },
  mounted: function () {
    this.client_details_id(Number(localStorage['edit_roles_id']))
  }
})
</script>

<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col>
        <v-col :cols="12">
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
            {{ firstName }} {{ surName }}
          </h4></v-col
        >
        <v-spacer></v-spacer>
      </v-col>
      <v-col :cols="12">
        <v-select
          clearable
          label="Company Role"
          @update:modelValue="change_roles"
          :items="['Administrator', 'Manager', 'Technician']"
        ></v-select>
      </v-col>
      <v-col cols="12" align="center">
        <v-btn
          size="x-large"
          :max-width="50"
          color="#5A82AF"
          block
          @click="rolebtnclick"
          :disabled="!role_change"
          >Button</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
