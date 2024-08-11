<template>
  <v-container>
    <v-container>
      <v-row>
        <v-col v-if="sections.cardMembers && Object.keys(sections.cardMembers).length > 0">
          <h4 style="font-size: 20px; font-weight: lighter">Assigned Members</h4>
        </v-col></v-row
      >

      <v-row align="center">
        <v-col cols="12" v-for="member in sections.cardMembers" :key="member.id">
          <v-card rounded="md" variant="outlined" color="success">
            <v-row align="center" justify="space-between">
              <v-col>
                <v-card-title>{{ member.name }}</v-card-title>
                <v-card-subtitle>{{ member.role }}</v-card-subtitle>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click.stop="moveToTeamMembers(member)" variant="plain" color="black">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col v-if="sections.teamMembers && Object.keys(sections.teamMembers).length > 0">
          <h4 style="font-size: 20px; font-weight: lighter">Unassigned Members</h4>
        </v-col>
      </v-row>

      <v-row align="center">
        <v-col cols="12" v-for="member in sections.teamMembers" :key="member.id">
          <v-row align="center" justify="space-between"
            ><v-col>
              <v-card
                @click="moveToCardMembers(member)"
                rounded="md"
                variant="outlined"
                color="error"
              >
                <v-card-title>{{ member.name }}</v-card-title>
                <v-card-subtitle>{{ member.role }}</v-card-subtitle>
              </v-card></v-col
            ></v-row
          >
          <v-divider></v-divider>
          <v-spacer></v-spacer>
        </v-col> </v-row
    ></v-container>
  </v-container>
</template>

<script>
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
      // Emit an event to notify the parent component to add the member to the cardMembers prop
      this.$emit('addMemberToCard', member)

      // Filter the member out from teamMembers
      this.sections.teamMembers = this.sections.teamMembers.filter((m) => m.id !== member.id)

      // Set the member as selected
      member.selected = true
      this.sections.cardMembers.push(member)
      // Emit an event with the updated member
      this.$emit('update:selectedMembers', this.sections.cardMembers)
    },
    updateAndEmitSelectedMembers(updatedArray) {
      // Emit an event to notify the parent component
      this.sections.cardMembers = updatedArray
      this.$emit('update:selectedMembers', this.teamList)
    },
    moveToTeamMembers(member) {
      this.sections.teamMembers.push(member)
      this.sections.cardMembers = this.sections.cardMembers.filter((m) => m.id !== member.id)
      member.selected = false
      this.$emit('update:selectedMembers', member)
    },
    updateDarkMode(value) {
      // Emit an event to notify the parent component
      this.$emit('update:isDarkMode', value)
    },
    updateTeamList(value) {
      // Emit an event to notify the parent component
      this.$emit('update:teamList', value)
    },
    updateSelectedMembers(value) {
      // Emit an event to notify the parent component
      this.$emit('update:selectedMembers', value)
    }
  },
  mounted() {
    this.sections.teamMembers = this.teamList
  }
})
</script>
