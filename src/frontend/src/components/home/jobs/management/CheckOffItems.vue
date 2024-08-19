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
      <v-row v-if="!isSaveTaskClicked">
        <v-col>
          <div class="mb-3">{{ progress.toFixed(0) }}%</div>
          <v-progress-linear
            :model-value="progress"
            color="primary"
            :height="10"
            class="mb-4"
          ></v-progress-linear>
        </v-col>
      </v-row>

      <v-row
        v-for="(item, index) in taskList[0].items"
        :key="index"
        class="d-flex align-center mb-3"
      >
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
                      <v-btn
                        color="info"
                        @click="assignDialog = true"
                      >
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
                            :items="assignableEmployees"
                            item-title="text"
                            item-value="value"
                            item-class="custom-item-class"
                            multiple
                            variant="solo"
                            hide-details
                            v-model="selectedEmployees"
                          ></v-select>
                        </v-card-text>
                        <v-card-actions class="d-flex flex-column">
                          <v-defaults-provider :defaults="{ VIcon: { color: 'success' } }">
                            <v-btn
                              color="success"
                              prepend-icon="fa: fa-solid fa-save"
                              @click="createEmployeeAssignmentObjects()"
                              >Save</v-btn
                            >
                          </v-defaults-provider>
                          <v-defaults-provider :defaults="{ VIcon: { color: 'error' } }">
                            <v-btn
                              color="error"
                              @click="assignDialog = false"
                              prepend-icon="fa: fa-solid fa-times"
                              >Cancel</v-btn
                            >
                          </v-defaults-provider>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <v-defaults-provider :defaults="{ VIcon: { color: 'success' } }">
                      <v-btn color="success" class="mb-2">
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
                      <v-btn color="warning" @click="isActive.value = false">
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
        <v-col v-if="!isSaveTaskClicked" color="success">
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
          <v-btn v-if="isSaveVisible" color="success" @click="handleSaveTaskClick" prepend-icon="fa: fa-solid fa-save"
            >Save Task</v-btn
          >
        </v-row>
      </v-defaults-provider>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onMounted, watch } from 'vue'
import axios from 'axios'

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

// Reactive variables
const assignDialog = ref(false)
const assignableEmployees = ref([])
const selectedEmployees = ref([])
const newItemText = ref<string>('')
const taskList = ref<TaskList[]>([
  {
    title: 'Create a new task list',
    items: []
  }
])
const isSaveTaskClicked = ref(true)
const isSaveVisible = ref(true)
const taskId = ref('')

// API URLs and Config
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

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

// Task-related functions
const addItem = () => {
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

const deleteItem = (index: number) => {
  taskList.value[0].items.splice(index, 1)
}

const handleSaveTaskClick = async () => {
  await putTask()
  isSaveTaskClicked.value = false
  isSaveVisible.value = false
}

const putTaskItem = async () => {
  try {
    const apiUrl = await getRequestUrl()
    const payload = {
      employeeId: localStorage.getItem('employeeId') || '',
      jobId: props.id,
      taskId: taskId.value
    }
    const response = await axios.put(`${apiUrl}job/taskItem`, payload, config)
    console.log('Task item updated successfully', response.data)
  } catch (error) {
    console.error('Error updating task item', error)
  }
}

const putTask = async () => {
  try {
    const apiUrl = await getRequestUrl()
    const payload = {
      employeeId: localStorage.getItem('employeeId') || '',
      jobId: props.id,
      title: taskList.value[0].title
    }
    const response = await axios.put(`${apiUrl}job/task`, payload, config)
    console.log('Task updated successfully', response.data)
    if (response.status > 199 && response.status < 300) {
      console.log('smile')
    }
  } catch (error) {
    console.error('Error updating task', error)
  }
}

// Employee-related functions
const getEmployees = async () => {
  try {
    const apiUrl = await getRequestUrl()
    const employeeId = localStorage.getItem('employeeId')
    if (!employeeId) {
      throw new Error('Employee ID not found in localStorage')
    }
    const response = await axios.get(`${apiUrl}employee/detailed/all/${employeeId}`, config)
    assignableEmployees.value = response.data.data.map((employee: any) => ({
      text: `${employee.userId.personalInfo.firstName} ${employee.userId.personalInfo.surname}`,
      value: employee._id
    }))
    console.log(assignableEmployees.value)
    console.log('Employees fetched successfully', response.data)
  } catch (error) {
    console.error('Error fetching employees', error)
  }
}

const createEmployeeAssignmentObjects = () => {
  const jobId = props.id
  const taskId = 'someTaskId' // Replace with actual task ID
  const itemId = 'someItemId' // Replace with actual item ID
  const employeeId = localStorage.getItem('employeeId') || ''

  const assignments = selectedEmployees.value.map((selectedEmployee: { text: string, value: string }) => ({
    employeeId,
    employeeToAssignId: selectedEmployee.value,
    jobId,
    taskId,
    itemId
  }))

  console.log(assignments)
}

// Computed properties
const progress = computed(() => {
  const firstTaskList = taskList.value[0]
  const totalTasks = firstTaskList.items.length
  const completedTasks = firstTaskList.items.filter((item) => item.done).length
  return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100
})

// Watchers
let initialLength = taskList.value[0].items.length
watch(
  () => taskList.value[0].items.length,
  async (newLength, oldLength) => {
    if (newLength > initialLength) {
      initialLength = newLength
      await putTaskItem()
    }
  }
)

// Lifecycle hooks
onMounted(() => {
  console.log('Tasklist: ', props.jobTaskList)
  if (props.jobTaskList && props.jobTaskList.length > 0) {
    taskList.value = props.jobTaskList
    if (taskList.value[0].items.length < 0) {
      isSaveTaskClicked.value = false
    }
  }
  getEmployees()
})

// Handle actions without the dialog property
const openCheckActionsDialog = (index: number) => {
  // Handle the click without relying on the 'dialog' property
}

const saveTask = async (index: number) => {
  // Implement save logic here
}

</script>


<style scoped>
.strikethrough {
  text-decoration: line-through;
}

.custom-item-class {
  color: darkseagreen; /* Change this to your desired color */
}
</style>
