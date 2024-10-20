<template>
  <!-- Labels Dialog Box -->
 <v-dialog persistent v-model="jobDialog" max-width="500" height="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="mb-2"
        prepend-icon="mdi-label"
        variant="elevated"
        v-bind="activatorProps"
      >
        Status
      </v-btn>
    </template>

    <v-col cols="12">
      <v-card
        ><v-card-title class="text-h5 font-weight-regular bg-blue-grey">
          <v-icon left class="mr-2">mdi-label</v-icon>
          <span class="title">Select a Job Status</span>
          <v-spacer></v-spacer>
        </v-card-title>
        <v-spacer></v-spacer>
        <v-card-text
          ><v-spacer></v-spacer>

          <v-row>
            <v-col cols="12">
              <v-row>
                <v-radio-group v-model="selectedRadio">
                  <v-radio
                    v-for="label in jobLabels"
                    :key="label.id"
                    :label="label.title"
                    :value="label.id"
                    :color="label.color"
                    @click="toggleSelection(label)"
                    variant="outlined"
                    height="40px"
                    rounded="xl"
                    width="90%"
                  >
                  </v-radio>
                </v-radio-group>
              </v-row> </v-col
            ><v-spacer></v-spacer>
          </v-row>

          <v-spacer></v-spacer>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row>
              <v-col cols="12" lg="6" order="last" order-lg="first">
                <v-btn
                  color="primary"
                  rounded="xl"
                  boarder="xl"
                  width="85%"
                  height="35"
                  variant="text"
                  block
                  @click="addSelectedLabels"
                  >Add</v-btn
                ></v-col
              >
              <v-col cols="12" lg="6" order="first" order-lg="last">
                ><v-btn
                  color="error"
                  rounded="xl"
                  boarder="xl"
                  width="85%"
                  height="35"
                  variant="text"
                  block
                  @click="jobDialog = false"
                  >Close</v-btn
                ></v-col
              ></v-row
            ></v-container
          >
        </v-card-actions>
      </v-card>
    </v-col>
  </v-dialog>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'JobLabels',
  props: {
    isDarkMode: Boolean,
    colors: Object,
    Status: Object
  },
  data: () => ({
    jobDialog: false,
    createLabelDialog: false,
    search: '',
    newLabelItemTitle: '',
    newLabelItemColor: '',
    currentLabel: {
      id: 0,
      title: '',
      color: ''
    },
    jobLabels: [
      {
        id: 1,
        color: 'error', // Example color
        isSelected: false,
        title: 'Not Started'
      },
      {
        id: 2,
        color: 'warning', // Example color
        isSelected: false,
        title: 'In Progress'
      },
      {
        id: 3,
        color: 'success', // Example color
        isSelected: false,
        title: 'Completed'
      }
    ],
    selectedLabels: [],
    isSelected: false,
    status: ''
  }),
  methods: {
    toggleSelection(selectedLabel) {
      if (selectedLabel.isSelected) {
        selectedLabel.isSelected = false
      } else {
        this.jobLabels.forEach((label) => {
          label.isSelected = label === selectedLabel
        })
        // Emit an event instead of modifying the prop directly
        if (selectedLabel.isSelected) {
          this.$emit('update:status', selectedLabel)
          this.$emit('add:status', selectedLabel)
        } else {
          this.$emit('update:status', '')
        }
      }
      console.log(selectedLabel.isSelected) // Logs the current state of the selected/deselected label
    },
    addNewLabel() {
      if (this.newLabelItemTitle && this.newLabelItemColor) {
        const item = {
          id: this.jobLabels.length + 1,
          color: this.newLabelItemColor,
          isSelected: false,
          title: this.newLabelItemTitle
        }
        this.jobLabels.push(item)
        console.log(this.jobLabels)
        this.newLabelItemTitle = ''
        this.newLabelItemColor = ''
        this.createLabelDialog = false
        this.jobDialog = true
      }
    },
    addSelectedLabels() {
      this.selectedLabels = this.jobLabels.filter((label) => label.isSelected)
    },
    saveChanges() {
      const index = this.jobLabels.findIndex((label) => label.id === this.currentLabel.id)
      if (index !== -1) {
        this.jobLabels.splice(index, 1, { ...this.currentLabel })
      }
      this.editLabelDialog = false
    },
    deleteLabel() {
      const index = this.jobLabels.findIndex((label) => label.id === this.currentLabel.id)
      if (index !== -1) {
        this.jobLabels.splice(index, 1)
      }
      this.editLabelDialog = false
    },
    setCurrentLabel(label) {
      this.currentLabel = { ...label }
    }
  }
})
</script>
<style scoped>
.selected {
  border: 2px solid #42b983; /* Example highlight color */
  box-shadow: 0 0 8px #42b983; /* Adds a shadow for more emphasis */
}
</style>
