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
    <v-col cols="12">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
          <v-icon left class="mr-2">mdi-account</v-icon>
          <span class="title">Team Members</span>
          <v-spacer></v-spacer> </v-card-title
        ><v-spacer></v-spacer>
        <v-card-text>
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
              </v-col> </v-row></v-container
        ></v-card-text>

        <v-card-actions>
          <v-col>
            <v-btn
              color="primary"
              rounded="xl"
              boarder="xl"
              width="85%"
              height="35"
              variant="text"
              @click="teamDialog = false"
            >
              Apply
            </v-btn></v-col
          >
          <v-col>
            <v-btn
              color="error"
              rounded="xl"
              boarder="xl"
              width="85%"
              height="35"
              variant="text"
              @click="teamDialog = false"
            >
              Close
            </v-btn></v-col
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-dialog>
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
