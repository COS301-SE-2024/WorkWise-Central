<template>
  <!-- Labels Dialog Box -->
  <v-dialog v-model="jobDialog" max-width="500" height="auto">
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
    <v-sheet elevation="14" rounded="md" height="auto">
      <v-col cols="12">
        <v-col cols="12">
          <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
            <v-icon left class="mr-2">mdi-label</v-icon>
            <span class="title">Status of the Job</span>
            <v-spacer></v-spacer>
          </v-card-title>
        </v-col>

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
                    <v-card-actions>
                      <!-- Your card actions here -->
                      <v-btn
                        @click="(jobDialog = false), setCurrentLabel(label)"
                        variant="text"
                        color="primary"
                        size="large"
                        >Save</v-btn
                      >

                      <v-btn @click="jobDialog = false" variant="text" color="red" size="large"
                        >Cancel</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-col>
              </v-row> </v-col
            ><v-spacer></v-spacer>
          </v-row>
        </div>
        <v-spacer></v-spacer>
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
