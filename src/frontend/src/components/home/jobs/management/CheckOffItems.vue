<template>
  <v-container>
    <!-- Button to create a new task -->
    <v-row class="justify-center mb-4">
      <v-btn color="primary" @click="createNewTask" :disabled="!canCreateNewTask" prepend-icon="mdi-plus">Create New Task</v-btn>
    </v-row>

    <!-- Loop through tasks -->
    <v-row v-for="(task, taskIndex) in taskList" :key="taskIndex" class="mt-4">
      <v-col>
        <!-- Task Title -->
        <v-textarea
          v-model="task.title"
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

        <!-- Only show the rest of the components if the title is set -->
        <template v-if="task.title.trim() !== ''">
          <v-row>
            <v-col>
              <div class="mb-3">{{ getTaskProgress(task).toFixed(0) }}%</div>
              <v-progress-linear
                :model-value="getTaskProgress(task)"
                color="primary"
                :height="10"
                class="mb-4"
              ></v-progress-linear>
            </v-col>
          </v-row>

          <!-- Task Items -->
          <v-row v-for="(item, itemIndex) in task.items" :key="itemIndex" class="d-flex align-center mb-3">
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
                    <v-btn @click="openCheckActionsDialog(itemIndex)" v-bind="activatorProps" class="ml-2">
                      <v-icon left>{{ 'fa: fa-solid fa-ellipsis-h' }}</v-icon>
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
                            <v-icon>{{ 'fa: fa-solid fa-user-plus' }}</v-icon>
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
                                <v-btn color="success" prepend-icon="fa: fa-solid fa-save">
                                  Save
                                </v-btn>
                              </v-defaults-provider>
                              <v-defaults-provider :defaults="{ VIcon: { color: 'error' } }">
                                <v-btn color="error" @click="assignDialog = false" prepend-icon="fa: fa-solid fa-times">
                                  Cancel
                                </v-btn>
                              </v-defaults-provider>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-defaults-provider :defaults="{ VIcon: { color: 'success' } }">
                          <v-btn color="success" class="mb-2">
                            <v-icon>{{ 'fa: fa-solid fa-save' }}</v-icon>
                            Save
                          </v-btn>
                        </v-defaults-provider>
                        <v-defaults-provider :defaults="{ VIcon: { color: 'error' } }">
                          <v-btn color="error" @click="deleteItem(taskIndex, itemIndex)" class="mb-2">
                            <v-icon>{{ 'fa: fa-solid fa-trash' }}</v-icon>
                            Delete
                          </v-btn>
                        </v-defaults-provider>
                        <v-defaults-provider :defaults="{ VIcon: { color: 'warning' } }">
                          <v-btn color="warning" @click="isActive.value = false">
                            <v-icon>{{ 'fa: fa-solid fa-times' }}</v-icon>
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

          <!-- Add Item to Task -->
          <v-row>
            <v-col color="success">
              <v-textarea
                v-model="task.newItemText"
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
              <v-btn color="success" @click="addItem(taskIndex)" prepend-icon="mdi-plus">Add Item</v-btn>
            </v-col>
          </v-row>

          <!-- Save Task Button -->
          <v-defaults-provider :defaults="{ VIcon: { color: 'success' } }">
            <v-row class="justify-center">
              <v-btn v-if="task.isSaveVisible" color="success" @click="saveTask(taskIndex)" prepend-icon="fa: fa-solid fa-save">
                Save Task
              </v-btn>
            </v-row>
          </v-defaults-provider>
        </template>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue';
import axios from 'axios'

// API URLs
const localUrl = 'http://localhost:3000/'
const remoteUrl = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Request Config
const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

const props = defineProps<{
  jobTaskList: TaskList[];
  id: string
}>()

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

interface Task {
  title: string;
  items: TaskItem[];
  newItemText: string;
  isSaveTaskClicked: boolean;
  isSaveVisible: boolean;
}

interface Employee {
  text: string;
  value: number;
}

const taskList = ref<Task[]>([
  {
    title: '',
    items: [],
    newItemText: '',
    isSaveTaskClicked: false,
    isSaveVisible: true,
  },
]);

const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status >= 200 && res.status < 300
  } catch {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

const assignableEmployees = ref<Employee[]>([
  { text: 'John Doe', value: 1 },
  { text: 'Jane Smith', value: 2 },
]);

const selectedEmployees = ref<Employee[]>([]);
const assignDialog = ref(false);

const createNewTask = () => {
  taskList.value.push({
    title: '',
    items: [],
    newItemText: '',
    isSaveTaskClicked: false,
    isSaveVisible: true,
  });
};

const canCreateNewTask = ref(true);

const addItem = async (taskIndex: number) => {
  if (taskList.value[taskIndex].newItemText.trim() !== '') {
    taskList.value[taskIndex].items.push({
      description: taskList.value[taskIndex].newItemText,
      assignedEmployees: [],
      dueDate: new Date().toISOString(),
      done: false,
    });
    taskList.value[taskIndex].newItemText = '';
  }
  const apiUrl = getRequestUrl()
  // try {
  //   const response = await axios.put(`${apiUrl}job/taskItem`, {
  //     employeeId: localStorage.getItem('employeeId'),
  //     jobId: props.id,
  //     taskId: taskList.value[taskIndex]._id,
  //   }, config)
  //   console.log(response)
  // } catch (error) {
  //   console.log(error)
  // }
};

const deleteItem = (taskIndex: number, itemIndex: number) => {
  taskList.value[taskIndex].items.splice(itemIndex, 1);
};

const saveTask = (taskIndex: number) => {
  taskList.value[taskIndex].isSaveTaskClicked = true;
};

const getTaskProgress = (task: Task): number => {
  const totalItems = task.items.length;
  const completedItems = task.items.filter((item) => item.done).length;
  return totalItems === 0 ? 0 : (completedItems / totalItems) * 100;
};

const openCheckActionsDialog = (itemIndex: number) => {
  // Implement dialog actions here
};

onMounted(() => {
  taskList.value = props.jobTaskList.map(task => ({
    ...task,
    newItemText: '',
    isSaveTaskClicked: false,
    isSaveVisible: true,
  }));
  console.log('Task items:', taskList.value);
});
</script>

<style scoped>
.strikethrough {
  text-decoration: line-through;
}

.custom-item-class {
  color: darkseagreen; /* Change this to your desired color */
}
</style>
