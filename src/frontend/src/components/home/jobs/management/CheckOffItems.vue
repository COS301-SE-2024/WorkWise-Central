<template>
  <v-container>
    <v-row>
      <v-col>
        <v-textarea
          v-model="taskList[0].title"
          label="Task Title"
          clearable
          auto-grow
          variant="solo"
          hint="Enter your task title"
          hide-details
          prepend-icon="fa: fa-solid fa-tasks"
          rows="1"
          class="mb-4"
        ></v-textarea>
      </v-col>
    </v-row>

    <!-- Only show the rest of the components if the title is set -->
    <template v-if="taskList[0].title.trim() !== ''">
      <v-row>
        <v-col>
          <div class="mb-3">{{ progress.toFixed(0) }}%</div>
          <v-progress-linear :model-value="progress" color="primary" :height="10" class="mb-4"></v-progress-linear>
        </v-col>
      </v-row>

      <v-row v-for="(item, index) in taskList[0].items" :key="index" class="d-flex align-center mb-3">
        <v-col md="10" class="pr-4">
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
            <v-dialog
              v-model="item.dialog"
              max-width="300px"
              location="bottom"
              location-strategy="connected"
              opacity="0"
              origin="top center"
            >
              <template v-slot:activator="{ props: activatorProps }">
                <v-btn @click="openCheckActionsDialog(index)" v-bind="activatorProps" class="ml-2">
                  <v-icon left>
                    {{ 'fa: fa-solid fa-ellipsis-h' }}
                  </v-icon>
                </v-btn>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                    Item actions
                  </v-card-title>
                  <v-card-actions class="d-flex flex-column">
                    <v-defaults-provider :defaults="{ VIcon: { color: 'info' } }">
                      <v-btn color="info" @click="assignDialog = true">
                        <v-icon>
                          {{ 'fa: fa-solid fa-user-plus' }}
                        </v-icon>
                        Assign
                      </v-btn>
                    </v-defaults-provider>
                    <v-dialog v-model="assignDialog" max-width="400px">
                      <v-card>
                        <v-card-title class="text-h5">Assign Employees</v-card-title>
                        <v-card-text class="text-center">
                          <v-label>Assigned Employees</v-label>
                          <v-select
                            label="Select"
                            :items=assignableEmployees
                            multiple
                            variant="solo"
                            hide-details
                          ></v-select>
                        </v-card-text>
                        <v-card-actions class="d-flex flex-column">
                          <v-spacer></v-spacer>
                          <v-btn color="success" @click="assignDialog = false">Save</v-btn>
                          <v-btn color="error" @click="assignDialog = false">Cancel</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-defaults-provider :defaults="{ VIcon: { color: 'success' } }">
                      <v-btn color="success" @click="saveItem(index)" class="mb-2">
                        <v-icon>
                          {{ 'fa: fa-solid fa-save' }}
                        </v-icon>
                        Save
                      </v-btn>
                    </v-defaults-provider>
                    <v-defaults-provider :defaults="{ VIcon: { color: 'error' } }">
                      <v-btn color="error" @click="deleteItem(index)" class="mb-2">
                        <v-icon>
                          {{ 'fa: fa-solid fa-trash' }}
                        </v-icon>
                        Delete
                      </v-btn>
                    </v-defaults-provider>
                    <v-defaults-provider :defaults="{ VIcon: { color: 'warning' } }">
                      <v-btn color="warning" @click="isActive.value=false">
                        <v-icon>
                          {{ 'fa: fa-solid fa-times' }}
                        </v-icon>
                        Cancel
                      </v-btn>
                    </v-defaults-provider>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-row>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
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
            class="mb-4"
          ></v-textarea>
          <v-btn color="success" @click="addItem" prepend-icon="mdi-plus">Add Item</v-btn>
        </v-col>
      </v-row>
      <v-defaults-provider :defaults="{ VIcon: { color: 'success' } }">
        <v-row class="justify-center">
          <v-btn color="success" @click="putTask(index)" prepend-icon="fa: fa-solid fa-save">Save Task</v-btn>
        </v-row>
      </v-defaults-provider>
    </template>
  </v-container>
</template>


<script setup lang="ts">
import { ref, computed, defineProps, onMounted } from 'vue'
import axios from 'axios'
// Define props and interfaces
const props = defineProps<{ jobTaskList: TaskList[]; id: string }>()
// Dialog
const assignDialog = ref(false)
// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'
// Request Config
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

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
    title: 'Create a new task list',
    items: []
  }
])

// Utility functions
const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status < 300 && res.status > 199
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

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

const getEmployees = async () => {

}

const putTask = async (index: number) => {
  try {
    const apiUrl = await getRequestUrl()
    const payload = {
      employeeId: localStorage.getItem('employeeId') || '',
      jobId: props.id,
      title: taskList.value[0].title
    }
    console.log('Payload', payload)
    const response = await axios.put(`${apiUrl}job/task`, payload, config)
    console.log('Task updated successfully', response.data)
    if (response.status > 199 && response.status < 300) {
      if (taskList.value[0].items.length > 0) {
        console.log('smile')
      }
    }
  } catch (error) {
    console.error('Error updating task', error)
  }
}

const saveTask = async (index: number) => {

}

onMounted(() => {
  console.log('Tasklist: ', props.jobTaskList)
  if (props.jobTaskList && props.jobTaskList.length > 0) {
    taskList.value = props.jobTaskList
  }
})
</script>

<style scoped>
.strikethrough {
  text-decoration: line-through;
}
</style>
