<template>
  <v-card class="pa-4" height="auto">
    <!-- Search Bar -->
    <v-text-field
      v-model="searchQuery"
      label="Search labels"
      prepend-inner-icon="mdi-magnify"
      outlined
      dense
    ></v-text-field>

    <!-- Label List -->
    <v-list>
      <v-list-item v-for="label in filteredLabels" :key="label.id" class="d-flex align-center">
        <v-row align="center" no-gutters class="w-100">
          <!-- Checkbox -->
          <v-col cols="auto">
            <v-checkbox
              v-model="label.active"
              class="ma-0"
              @change="toggleLabel(label)"
              hide-details
            ></v-checkbox>
          </v-col>

          <!-- Color Block with Label Text -->
          <v-col cols="auto">
            <div
              :style="{ backgroundColor: label.color }"
              class="mr-4 d-flex justify-center align-center"
              style="width: 400px; height: 40px; border-radius: 4px; position: relative"
            >
              <span
                class="text-center"
                style="
                  position: absolute;
                  width: 100%;
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: white;
                  font-weight: bold;
                "
              >
                {{ label.title }}
              </span>
            </div>
          </v-col>

          <!-- Edit Icon -->
          <v-col cols="auto">
            <v-icon @click="openEditDialog(label)">mdi-pencil</v-icon>
          </v-col>

          <!-- Delete Icon -->
          <v-col cols="auto">
            <v-icon color="error" @click="deleteLabel(label)">mdi-delete</v-icon>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>

    <!-- Create Label Button -->
    <v-btn color="success" class="mt-4" @click="openCreateDialog" block> Create Label </v-btn>

    <!-- Label Creation/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>{{ dialogTitle }}</v-card-title>

        <v-card-text>
          <!-- Title Input -->
          <v-label class="pb-0">Title</v-label>
          <v-text-field v-model="labelTitle" outlined dense class="mt-4 pt-0"></v-text-field>

          <!-- Color Palette -->
          <v-row>
            <v-col
              v-for="color in colorOptions"
              :key="color"
              cols="2"
              class="d-flex justify-center"
            >
              <v-btn
                :style="{ backgroundColor: color }"
                class="ma-1"
                @click="selectedColor = color"
                :outlined="selectedColor !== color"
                style="width: 40px; height: 40px; border-radius: 4px"
              ></v-btn>
            </v-col>
          </v-row>

          <!-- Selected Color Block with Label Title -->
          <div
            v-if="labelTitle"
            class="d-flex justify-center align-center mt-4"
            :style="{
              backgroundColor: selectedColor,
              color: getContrastingColor(selectedColor),
              width: '100%',
              height: '100px',
              borderRadius: '8px'
            }"
          >
            <span style="font-size: 24px">{{ labelTitle }}</span>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="success" @click="saveLabel">
            {{ dialogTitle === 'Create Label' ? 'Create' : 'Save' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')
const dialog = ref(false)
const dialogTitle = ref('Create Label')
const labelTitle = ref('')
const selectedColor = ref('#ffffff')

const labels = ref([
  { id: 1, title: 'Label 1', color: '#ff0000', active: false },
  { id: 2, title: 'Label 2', color: '#00ff00', active: true }
  // Add more labels here
])

const colorOptions = ref([
  '#FFB74D',
  '#FFD54F',
  '#FFF176',
  '#AED581',
  '#81C784',
  '#4DB6AC',
  '#4DD0E1',
  '#4FC3F7',
  '#64B5F6',
  '#7986CB',
  '#BA68C8',
  '#DCE775',
  '#FFF59D',
  '#FFEB3B',
  '#FFCA28',
  '#FF7043',
  '#FF8A65',
  '#A1887F',
  '#90A4AE',
  '#78909C',
  '#EF5350',
  '#EC407A',
  '#AB47BC',
  '#8E24AA',
  '#7B1FA2',
  '#42A5F5',
  '#26A69A',
  '#66BB6A',
  '#9CCC65',
  '#FFEE58'
])

const filteredLabels = computed(() =>
  labels.value.filter((label) =>
    label.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const openCreateDialog = () => {
  dialogTitle.value = 'Create Label'
  labelTitle.value = ''
  selectedColor.value = '#ffffff'
  dialog.value = true
}

const openEditDialog = (label) => {
  dialogTitle.value = 'Edit Label'
  labelTitle.value = label.title
  selectedColor.value = label.color
  dialog.value = true
}

const saveLabel = () => {
  if (dialogTitle.value === 'Create Label') {
    labels.value.push({
      id: labels.value.length + 1,
      title: labelTitle.value,
      color: selectedColor.value,
      active: false
    })
  } else {
    // Find the label being edited and update its properties
    const label = labels.value.find((l) => l.id === labels.value.length + 1)
    if (label) {
      label.title = labelTitle.value
      label.color = selectedColor.value
    }
  }
  dialog.value = false
}

const toggleLabel = (label) => {
  label.active = !label.active
}

const deleteLabel = (label) => {
  labels.value = labels.value.filter((l) => l.id !== label.id)
}

// Utility function to determine the best text color for the selected background
const getContrastingColor = (bgColor) => {
  const color = bgColor.slice(1) // Remove '#'
  const rgb = parseInt(color, 16) // Convert hex to RGB
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 125 ? '#000' : '#fff' // Return black or white
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
