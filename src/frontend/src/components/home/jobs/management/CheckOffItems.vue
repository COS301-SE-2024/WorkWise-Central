<template>
  <v-container>
    <div>{{ progress.toFixed(0) }}%</div>
    <v-progress-linear :model-value="progress" color="primary" :height="10"></v-progress-linear>
    <v-col></v-col>
    <v-row v-for="(item, index) in taskList[0].items" :key="index" class="d-flex align-center mb-3">
      <v-col md="10">
        <v-checkbox
          v-model="item.done"
          :label="item.description"
          :class="{ strikethrough: item.done }"
          class="pt-0 pb-0"
          dense
          hide-details
        ></v-checkbox>
      </v-col>
      <v-col md="2" cols="2">
        <v-row>
          <v-btn @click="openCheckActionsDialog(index)">
            <v-icon right>
              {{ 'fa: fa-solid fa-ellipsis-h' }}
            </v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
    <v-textarea
      v-model="newItemText"
      label="Add an item"
      clearable
      auto-grow
      variant="solo"
      hint="Enter your comment here"
      hide-details
      prepend-icon="fa: fa-solid fa-check"
      rows="3"
    ></v-textarea>
    <v-btn color="success" @click="addItem" prepend-icon="mdi-plus">Add task</v-btn>
  </v-container>
</template>
<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'

// Define props and interfaces
const props = defineProps<{ jobTaskList: TaskList[]; id: string }>()

interface TaskItem {
  description: string
  assignedEmployees: string[]
  dueDate: string
  done: boolean
}

interface TaskList {
  title: string
  items: TaskItem[]
}

// Initialize the task list
const taskList = ref<TaskList[]>([
  {
    title: 'My Task List',
    items: []
  }
])

const newItemText = ref<string>('')

// Compute the progress based on tasks
const progress = computed(() => {
  const firstTaskList = taskList.value[0]
  const totalTasks = firstTaskList.items.length
  const completedTasks = firstTaskList.items.filter((item) => item.done).length
  return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100
})

// Handle actions without the dialog property
const openCheckActionsDialog = (index: number) => {
  // Handle the click without relying on the 'dialog' property
}

function addItem() {
  if (newItemText.value.trim() !== '') {
    taskList.value[0].items.push({
      description: newItemText.value,
      assignedEmployees: [],
      dueDate: new Date().toISOString(),
      done: false
    })
    newItemText.value = ''
  }
}

function deleteItem(index: number) {
  taskList.value[0].items.splice(index, 1)
}

const saveItem = (index: number) => {
  if (taskList.value[0].items.length > 0) {
    // Save the item to the database or handle the save logic
  }
}
</script>

<style scoped>
.strikethrough {
  text-decoration: line-through;
}
</style>
