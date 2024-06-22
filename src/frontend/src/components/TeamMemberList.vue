<template>
  <v-dialog v-model="teamDialog" max-width="500" height="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="mb-2"
        prepend-icon="mdi-account"
        variant="elevated"
        v-bind="activatorProps"
      >
        Members
      </v-btn>
    </template>
    <v-sheet elevation="14" rounded="xl" height="auto">
      <v-col cols="12"
        ><v-col cols="12">
          <h4 class="text-center" style="font-size: 30px; font-weight: lighter">Members</h4>
        </v-col>

        <v-spacer></v-spacer>
        <v-col v-if="sections.cardMembers && Object.keys(sections.cardMembers).length > 0">
          <h4 style="font-size: 20px; font-weight: lighter">Assigned Members</h4>
        </v-col>

        <div>
          <v-row>
            <v-col cols="12" v-for="member in sections.cardMembers" :key="member.id">
              <v-card rounded="md" variant="outlined" color="primary" width="90%">
                <v-row align="center" justify="space-between">
                  <v-col>
                    <v-card-title>{{ member.name }}</v-card-title>
                    <v-card-subtitle>{{ member.role }}</v-card-subtitle>
                  </v-col>
                  <v-col cols="2">
                    <v-btn
                      icon
                      @click.stop="moveToTeamMembers(member)"
                      variant="plain"
                      color="black"
                    >
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </div>

        <v-col v-if="sections.teamMembers && Object.keys(sections.teamMembers).length > 0">
          <h4 style="font-size: 20px; font-weight: lighter">Unassigned Members</h4>
        </v-col>
        <div>
          <v-row>
            <v-col cols="12" v-for="member in sections.teamMembers" :key="member.id">
              <v-row align="center" justify="space-between"
                ><v-col>
                  <v-card
                    @click="moveToCardMembers(member)"
                    rounded="md"
                    variant="plain"
                    color="red"
                    width="90%"
                  >
                    <v-card-title>{{ member.name }}</v-card-title>
                    <v-card-subtitle>{{ member.role }}</v-card-subtitle>
                    <v-avatar>
                      <v-img :src="member.avatar"></v-img>
                    </v-avatar> </v-card></v-col
              ></v-row>
              <v-divider></v-divider>
              <v-spacer></v-spacer>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { select } from '@syncfusion/ej2-base'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TeamMemberList',
  props: {
    isDarkMode: Boolean,
    teamList: Array,
    selectedMembers: Array
  },
  components: {},
  data: () => ({
    teamDialog: false,
    sections: {
      cardMembers: [],
      teamMembers: []
    },
    search: ''
  }),
  methods: {
    moveToCardMembers(member) {
      this.sections.cardMembers.push(member)
      this.sections.teamMembers = this.sections.teamMembers.filter((m) => m.id !== member.id)
      member.selected = true
      this.selectedMembers.push(member)
    },
    moveToTeamMembers(member) {
      this.sections.teamMembers.push(member)
      this.sections.cardMembers = this.sections.cardMembers.filter((m) => m.id !== member.id)
    }
  },
  mounted() {
    this.sections.teamMembers = this.teamList
  }
})
</script>
