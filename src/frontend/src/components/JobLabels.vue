<template>
  <!-- Labels Dialog Box -->
  <v-dialog v-model="jobDialog" max-width="500" height="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-label"
        variant="elevated"
        v-bind="activatorProps"
      >
        Status
      </v-btn>
    </template>
    <v-sheet elevation="14" rounded="xl" height="auto">
      <v-col cols="12">
        <v-row class="pa-2" align="center">
          <v-col cols="12">
            <h4 class="text-center" style="font-size: 40px; font-weight: lighter"></h4>
          </v-col>
        </v-row>

        <v-spacer></v-spacer>

        <div>
          <v-row>
            <v-col cols="12" v-for="label in jobLabels" :key="label.id">
              <v-row align="center">
                <!-- Add padding for spacing and align items center -->
                <!-- Checkbox on the left -->

                <!-- Card in the middle -->
                <v-col cols="9" offset="2">
                  <!-- Adjust the cols as needed for your design -->
                  <v-card
                    @click="toggleSelection(label)"
                    :class="{ selected: label.isSelected }"
                    :color="label.color"
                    variant="outlined"
                    height="40px"
                    rounded="xl"
                    width="90%"
                  >
                    <v-card-title>{{ label.title }}</v-card-title>
                    <!-- Your card content here -->
                  </v-card>
                </v-col>
              </v-row> </v-col
            ><v-spacer></v-spacer>
          </v-row>
        </div>
        <v-spacer></v-spacer>

        <v-row align="center">
          <v-col cols="8" offset="3">
            <v-btn
              @click="(jobDialog = false), setCurrentLabel(label)"
              variant="text"
              color="primary"
              size="large"
              >Save</v-btn
            >

            <v-btn @click="jobDialog = false" variant="text" color="red" size="large">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-sheet>
  </v-dialog>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'JobLabels',
  props: {
    isDarkMode: Boolean,
    colors: Object
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
        color: 'red', // Example color
        isSelected: false,
        title: 'Not Started'
      },
      {
        id: 2,
        color: 'orange', // Example color
        isSelected: false,
        title: 'In Progress'
      },
      {
        id: 3,
        color: 'green', // Example color
        isSelected: false,
        title: 'Completed'
      }
    ],
    selectedLabels: [],
    isSelected: false
  }),
  methods: {
    toggleSelection(selectedLabel) {
      // Check if the selected label is already selected
      if (selectedLabel.isSelected) {
        // Deselect it
        selectedLabel.isSelected = false
      } else {
        // Proceed to deselect all and select the new one
        this.jobLabels.forEach((label) => {
          label.isSelected = label === selectedLabel
        })
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
