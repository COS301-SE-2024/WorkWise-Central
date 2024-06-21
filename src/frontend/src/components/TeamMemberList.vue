<template>
  <v-dialog v-model="teamDialog" max-width="500" height="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-account"
        variant="elevated"
        v-bind="activatorProps"
      >
        Members
      </v-btn>
    </template>
    <v-sheet elevation="14" rounded="xl" width="500" height="auto">
      <v-col
        ><v-col>
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">Members</h4>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            :label="search ? search : 'Search Members'"
            variant="outlined"
            hide-details
            width="95%"
            border="md"
            density="compact"
          ></v-text-field
        ></v-col>

        <v-spacer></v-spacer>
        <v-col v-if="sections.cardMembers && Object.keys(sections.cardMembers).length > 0">
          <h4 style="font-size: 15px; font-weight: lighter">Card Members</h4>
        </v-col>

        <div>
          <v-row>
            <v-col cols="12" v-for="member in sections.cardMembers" :key="member.id">
              <v-card>
                <v-row align="center" justify="space-between">
                  <v-col>
                    <v-card-title>{{ member.name }}</v-card-title>
                    <v-card-subtitle>{{ member.role }}</v-card-subtitle>
                  </v-col>
                  <v-col cols="auto">
                    <v-btn icon @click.stop="moveToTeamMembers(member)" variant="plain">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
        </div>
        <v-spacer></v-spacer>
        <v-col v-if="sections.teamMembers && Object.keys(sections.teamMembers).length > 0">
          <h4 style="font-size: 15px; font-weight: lighter">Team Members</h4>
        </v-col>
        <div>
          <v-row>
            <v-col cols="12" v-for="member in sections.teamMembers" :key="member.id">
              <v-card @click="moveToCardMembers(member)">
                <v-card-title>{{ member.name }}</v-card-title>
                <v-card-subtitle>{{ member.role }}</v-card-subtitle>
                <v-avatar>
                  <v-img :src="member.avatar"></v-img>
                </v-avatar>
              </v-card>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TeamMemberList',
  components: {},
  data: () => ({
    teamDialog: false,
    sections: {
      cardMembers: [],
      teamMembers: [
        {
          id: 1,
          name: 'John Doe',
          role: 'Software Engineer',
          avatar: 'https://randomuser.me/api/port',
          status: 'active'
        },
        {
          id: 2,
          name: 'Jane Doe',
          role: 'Software Engineer',
          avatar: 'https://randomuser.me/api/port',
          status: 'active'
        },
        {
          id: 3,
          name: 'John Doe',
          role: 'Software Engineer',
          avatar: 'https://randomuser.me/api/port',
          status: 'active'
        },
        {
          id: 4,
          name: 'Jane Doe',
          role: 'Software Engineer',
          avatar: 'https://randomuser.me/api/port',
          status: 'active'
        },
        {
          id: 5,
          name: 'John Doe',
          role: 'Software Engineer',
          avatar: 'https://randomuser.me/api/port',
          status: 'active'
        }
      ]
    },
    search: ''
  }),
  methods: {
    moveToCardMembers(member) {
      this.sections.cardMembers.push(member)
      this.sections.teamMembers = this.sections.teamMembers.filter((m) => m.id !== member.id)
    },
    moveToTeamMembers(member) {
      this.sections.teamMembers.push(member)
      this.sections.cardMembers = this.sections.cardMembers.filter((m) => m.id !== member.id)
    }
  }
})
</script>
