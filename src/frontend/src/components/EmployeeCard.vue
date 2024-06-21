<template>
  <v-container>
    <v-row>
      <v-col v-for="employee in employees" :key="employee.id" cols="12" sm="6" md="4" lg="3">
        <v-card>
          <v-card-text>
            <v-list two-line>
              <v-list-item-avatar>
                <v-img
                  :src="employee.profile.displayImage"
                  height="100"
                  alt="Profile image"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ employee.profile.displayName }}</v-list-item-title>
                <v-list-item-subtitle>
                  <div>
                    <strong>Role:</strong> {{ employee.role.role }}
                    <span v-if="employee.role.permissions.length > 0">
                      ( {{ formattedPermissions(employee.role.permissions) }} )
                    </span>
                  </div>
                  <div v-if="employee.availability">
                    <v-icon v-if="employee.availability.status === 'Available'">mdi-check</v-icon>
                    <v-icon v-else>mdi-alert</v-icon>
                    <strong>Status:</strong> {{ employee.availability.status }}
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-chip-group>
              <v-chip v-if="employee.skills.length > 0" color="primary" text-color="white">
                <strong>Skills:</strong>
                <span v-for="(skill, idx) in employee.skills.slice(0, 2)" :key="idx">{{
                  skill.skillName
                }}</span>
                <span v-if="employee.skills.length > 2">
                  + {{ employee.skills.length - 2 }} more</span
                >
              </v-chip>
              <v-chip
                v-if="employee.currentJobAssignments.length > 0"
                color="secondary"
                text-color="white"
              >
                Assignments ({{ employee.currentJobAssignments.length }})
              </v-chip>
            </v-chip-group>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      employees: [
        {
          profile: {
            displayImage:
              'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fblack-man-face&psig=AOvVaw3tTPSAhX8pBZPvzJxYQQe9&ust=1718972540927000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPirqO-V6oYDFQAAAAAdAAAAABAE',
            displayName: 'John Doe'
          },
          role: {
            role: 'admin',
            permissions: ['read', 'write', 'delete']
          },
          availability: {
            status: 'Available',
            schedule: {
              Monday: '9:00-17:00',
              Tuesday: '9:00-17:00'
              // Add more days as needed
            }
          },
          skills: [{ skillName: 'JavaScript' }, { skillName: 'Python' }],
          currentJobAssignments: ['60d21b4667d0d8992e610c87']
        },
        {
          profile: {
            displayImage: 'https://example.com/profile1.jpg',
            displayName: 'John Doe'
          },
          role: {
            role: 'admin',
            permissions: ['read', 'write', 'delete']
          },
          availability: {
            status: 'Available',
            schedule: {
              Monday: '9:00-17:00',
              Tuesday: '9:00-17:00'
              // Add more days as needed
            }
          },
          skills: [{ skillName: 'JavaScript' }, { skillName: 'Python' }],
          currentJobAssignments: ['60d21b4667d0d8992e610c87']
        }
        // Add more employees as needed
      ]
    }
  },
  computed: {
    formattedPermissions() {
      return (permissions) => permissions.join(', ')
    }
  }
}
</script>

<style scoped>
/* Add custom styles here */
</style>
