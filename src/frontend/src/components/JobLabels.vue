<template>
  <v-dialog v-model="jobDialog" max-width="500" height="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-label"
        variant="elevated"
        v-bind="activatorProps"
      >
        Labels
      </v-btn>
    </template>
    <v-sheet elevation="14" rounded="xl" width="500" height="auto">
      <v-col>
        <v-row class="pa-2" align="center">
          <!-- Add padding for spacing and align items center -->
        
          <!-- Label in the middle -->
          <v-col cols="10">
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">Labels</h4>
          </v-col>

          <!-- Close button on the right -->
          <v-col cols="2">
            <v-btn @click="editLabelDialog = false" variant="plain">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <v-text-field
            v-model="search"
            :label="search ? search : 'Search labels...'"
            variant="outlined"
            hide-details
            width="95%"
            border="md"
            density="compact"
          ></v-text-field
        ></v-col>

        <v-spacer></v-spacer>
        <v-col>
          <h4 style="font-size: 15px; font-weight: lighter">Labels</h4>
        </v-col>
        <div>
          <v-row>
            <v-col cols="11" v-for="label in jobLabels" :key="label.id">
              <v-row align="center">
                <!-- Add padding for spacing and align items center -->
                <!-- Checkbox on the left -->
                <v-col cols="1">
                  <!-- Adjust the cols as needed for your design -->
                  <v-checkbox v-model="label.isSelected"></v-checkbox>
                </v-col>

                <!-- Card in the middle -->
                <v-col cols="10">
                  <!-- Adjust the cols as needed for your design -->
                  <v-card
                    @click="toggleSelection"
                    :class="{ selected: label.isSelected }"
                    :style="{ backgroundColor: label.color }"
                    height="40px"
                  >
                    <v-card-title>{{ label.title }}</v-card-title>
                    <!-- Your card content here -->
                  </v-card>
                </v-col>

                <!-- Button on the right -->
                <v-col cols="1">
                  <!-- Adjust the cols as needed for your design -->
                  <v-btn variant="plain" @click="(editLabelDialog = true), (jobDialog = false)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-col cols="8" offset="3" align="center">
            <v-row align="center">
              <v-btn variant="plain" @click="(createLabelDialog = true), (jobDialog = false)">
                <v-icon>mdi-plus</v-icon>
                Create a new Label
              </v-btn>
            </v-row></v-col
          >
        </div>
      </v-col>
    </v-sheet>
  </v-dialog>

  <v-dialog v-model="createLabelDialog" max-width="500" height="auto">
    <v-sheet elevation="14" rounded="xl" width="500" height="auto">
      <v-col cols="12">
        <v-row class="pa-2" align="center">
          <!-- Add padding for spacing and align items center -->
          <!-- Back button on the left -->
          <v-col cols="2">
            <v-btn @click="(jobDialog = true), (createLabelDialog = false)" variant="plain">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>

          <!-- Label in the middle -->
          <v-col cols="8">
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">Create label</h4>
          </v-col>

          <!-- Close button on the right -->
          <v-col cols="2">
            <v-btn @click="createLabelDialog = false" variant="plain">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12">
        <v-label>Title</v-label>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="title"
          variant="outlined"
          hide-details
          width="100%"
          border="md"
          density="compact"
        ></v-text-field>
      </v-col>
      <div>
        <v-col cols="12">
          <v-label>Select a color</v-label>
          <v-color-picker v-model="c2" show-swatches></v-color-picker>
        </v-col>
      </div>
    </v-sheet>
  </v-dialog>

  <v-dialog v-model="editLabelDialog" max-width="500" height="auto">
    <v-sheet elevation="14" rounded="xl" width="500" height="auto">
      <v-col cols="12">
        <v-row class="pa-2" align="center">
          <!-- Add padding for spacing and align items center -->
          <!-- Back button on the left -->
          <v-col cols="2">
            <v-btn @click="(jobDialog = true), (editLabelDialog = false)" variant="plain">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>

          <!-- Label in the middle -->
          <v-col cols="8">
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">Edit label</h4>
          </v-col>

          <!-- Close button on the right -->
          <v-col cols="2">
            <v-btn @click="editLabelDialog = false" variant="plain">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-spacer></v-spacer>
      <v-col cols="12">
        <v-label>Title</v-label>
        <v-spacer></v-spacer>

        <v-text-field
          v-model="title"
          variant="outlined"
          hide-details
          width="100%"
          border="md"
          density="compact"
        ></v-text-field>
      </v-col>
      <div>
        <v-col cols="12">
          <v-label>Select a color</v-label>
          <v-color-picker v-model="c2"></v-color-picker>
          <!-- Add this line -->
        </v-col>
      </div>
      <div>
        <v-row align="center">
          <v-btn @click="c2 = ''" variant="plain"
            ><v-icon>mdi-close</v-icon>Remove Color</v-btn
          ></v-row
        >
      </div>
      <v-divider></v-divider>
      <div>
        <v-row class="pa-2" align="center">
          <v-col cols="6"> <v-btn variant="plain">Save Changes</v-btn></v-col>
          <v-col cols="6"
            ><v-btn @click="editLabelDialog = false" variant="plain">Delete Label</v-btn></v-col
          ></v-row
        >
      </div>
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
    jobLabels: [
      {
        id: 1,
        color: 'red', // Example color
        isSelected: false,
        title: ''
      },
      {
        id: 2,
        color: 'blue', // Example color
        isSelected: false,
        title: ''
      },
      {
        id: 3,
        color: 'green', // Example color
        isSelected: false,
        title: ''
      },
      {
        id: 4,
        color: 'yellow', // Example color
        isSelected: false,
        title: ''
      }
    ],
    selectedLabels: [],
    isSelected: false
  }),
  methods: {
    toggleSelection() {
      this.isSelected = !this.isSelected
    }
  }
})
</script>
