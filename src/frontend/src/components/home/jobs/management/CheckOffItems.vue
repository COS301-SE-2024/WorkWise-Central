<template>
  <v-container>
    <!-- Button to create a new task -->
    <v-row class="justify-center mb-4">
<!--      <v-btn color="primary" @click="createNewTask" prepend-icon="mdi-plus"-->
<!--        >Create New Task List</v-btn-->
<!--      >-->
      <Button label="Create New Task List" icon="fa: fa-solid fa-plus" @click="createNewTask" class="p-button-success" />
    </v-row>

    <!-- Loop through tasks with pagination -->
    <v-row v-for="(task, taskIndex) in paginatedTasks" :key="taskIndex" class="mt-4">
      <v-col>
        <!-- Task Title -->
        <v-row>
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
          <template v-if="task.title.trim() !== ''">
<!--            <v-btn color="error" outlined class="pl-10 pt-5" @click="deleteTask(taskIndex)">-->
<!--              <v-icon color="error">{{ 'fa: fa-solid fa-trash' }}</v-icon>-->
<!--            </v-btn>-->
              <v-col cols="1">
                <Button icon="fa: fa-solid fa-trash" @click="deleteTask(taskIndex)" class="p-button-danger" />
              </v-col>
          </template>
        </v-row>

        <!-- Only show the rest of the components if the title is set -->
        <template v-if="task.title.trim() !== ''">
          <v-row>
            <v-col
                v-if="!isSaveButtonVisible"
            >
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
          <v-row
            v-for="(item, itemIndex) in task.items.slice(0, 5)"
            :key="itemIndex"
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
                @change="handleCheckboxChange(taskIndex, itemIndex)"
              >
              </v-checkbox>
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
                    <v-btn
                      @click="openCheckActionsDialog(itemIndex)"
                      v-bind="activatorProps"
                      class="ml-2"
                    >
                      <v-icon left>{{ 'fa: fa-solid fa-ellipsis-h' }}</v-icon>
                    </v-btn>
                  </template>

                  <template v-slot:default="{ isActive }">
                    <v-card class="bg-cardColor">
                      <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
                        Item actions
                      </v-card-title>
                      <v-card-actions class="d-flex flex-column">
                        <v-defaults-provider :defaults="{ VIcon: { color: 'info' } }">
                          <v-btn color="info" @click="openAssignDialog(taskIndex, itemIndex)">
                            <v-icon>{{ 'fa: fa-solid fa-user-plus' }}</v-icon>
                            Assign
                          </v-btn>
                        </v-defaults-provider>
                        <v-dialog v-model="assignDialog" max-width="400px">
                          <v-card class="bg-cardColor">
                            <v-card-title class="text-h5">Assign Employees</v-card-title>
                            <v-card-text class="text-center">
                              <v-label>Assigned Employees</v-label>
                              <v-select
                                label="Select"
                                :items="members"
                                :item-title="member => getMemberFullName(member)"
                                item-value="_id"
                                item-class="custom-item-class"
                                multiple
                                variant="solo"
                                hide-details
                                v-model="selectedMembers"
                                return-object
                                color="primary"
                                background-color="#f5f5f5"
                              ></v-select>
                            </v-card-text>
                            <v-card-actions class="d-flex flex-column">
                              <v-defaults-provider :defaults="{ VIcon: { color: 'success' } }">
                                <v-btn
                                  color="success"
                                  prepend-icon="fa: fa-solid fa-save"
                                  @click="saveMembers(taskIndex, itemIndex)"
                                >
                                  Save
                                </v-btn>
                              </v-defaults-provider>
                              <v-defaults-provider :defaults="{ VIcon: { color: 'error' } }">
                                <v-btn
                                  color="error"
                                  @click="assignDialog = false"
                                  prepend-icon="fa: fa-solid fa-times"
                                >
                                  Cancel
                                </v-btn>
                              </v-defaults-provider>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                        <v-defaults-provider :defaults="{ VIcon: { color: 'success' } }">
                          <v-btn color="success" class="mb-2" @click="convertCard(taskIndex, itemIndex)">
                            <v-icon>{{ 'fa: fa-solid fa-exchange-alt' }}</v-icon>
                            Convert Card
                          </v-btn>
                        </v-defaults-provider>
                        <v-defaults-provider :defaults="{ VIcon: { color: 'error' } }">
                          <v-btn
                            color="error"
                            @click="deleteItem(taskIndex, itemIndex)"
                            class="mb-2"
                          >
                            <v-icon>{{ 'fa: fa-solid fa-trash' }}</v-icon>
                            Delete
                          </v-btn>
                        </v-defaults-provider>
                        <v-defaults-provider :defaults="{ VIcon: { color: 'warning' } }">
                          <v-btn color="warning" @click="isActive.value = false">
                            <v-icon>{{ 'fa: fa-solid fa-cancel' }}</v-icon>
                            Close
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
            <v-col
                color="success"
                v-if="!isSaveButtonVisible"
            >
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
<!--              <v-btn color="success" @click="addItem(taskIndex)" prepend-icon="mdi-plus"-->
<!--                >Add Item</v-btn-->
<!--              >-->
              <Button label="Add Item" icon="fa: fa-solid fa-plus" @click="addItem(taskIndex)" class="p-button-success" />
            </v-col>
          </v-row>

          <!-- Save Task Button -->
          <v-defaults-provider :defaults="{ VIcon: { color: 'success' } }">
            <v-row class="justify-center">
<!--              <v-btn-->
<!--                color="success"-->
<!--                @click="saveTask(taskIndex)"-->
<!--                prepend-icon="fa: fa-solid fa-save"-->
<!--              >-->
<!--                Save Task-->
<!--              </v-btn>-->
              <Button
                  v-if="isSaveButtonVisible"
                  label="Save Task"
                  icon="fa: fa-solid fa-save"
                  @click="handleSaveTask(taskIndex)"
                  class="p-button-success"
              />
            </v-row>
          </v-defaults-provider>
        </template>
      </v-col>
    </v-row>

    <!-- Pagination -->
    <v-row class="justify-center mt-4">
      <v-pagination
        v-model:page="currentPage"
        :length="pageCount"
        total-visible="5"
        color="primary"
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onMounted } from 'vue'
import Button from 'primevue/button'
import axios from 'axios'
import { API_URL } from '@/main'

interface Task {
  title: string
  items: { description: string; done: boolean; _id: string }[]
  newItemText: string
  isSaveVisible: boolean
  _id: string
}

interface Member {
  _id: string
  userInfo: {
    firstName: string
    surname: string
  }
}
const props = defineProps<{ jobID: string }>()

const taskList = ref<Task[]>([])
const itemsPerPage = ref(1)
const currentPage = ref(1)
const assignDialog = ref(false)
const selectedEmployees = ref<string[]>([])
const selectedMembers = ref<Member[]>([])
const members = ref<Member[]>([]) // Populate with your states data
const originalSelectedMembers = ref<Member[]>([])
const isSaveButtonVisible = ref(true)

function handleSaveTask(taskIndex: number) {
  saveTask(taskIndex);
  isSaveButtonVisible.value = taskList.value.length === 0;
}

//API URLS
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

const paginatedTasks = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return taskList.value.slice(start, start + itemsPerPage.value)
})

const pageCount = computed(() => {
  return Math.ceil(taskList.value.length / itemsPerPage.value)
})

const canCreateNewTask = computed(() => {
  return taskList.value.length < itemsPerPage.value * pageCount.value
})

function createNewTask() {
  taskList.value.push({ title: '', items: [], newItemText: '', isSaveVisible: false, _id: '' })
}

function getTaskProgress(task: Task) {
  const completedItems = task.items.filter((item) => item.done).length
  return (completedItems / task.items.length) * 100 || 0
}

function getMemberFullName(member: Member): string {
  return `${member.userInfo.firstName} ${member.userInfo.surname}`
}

const openAssignDialog = async (taskIndex: number, itemIndex: number) => {
  assignDialog.value = true
  await getAssignedEmployees(taskIndex, itemIndex)
  originalSelectedMembers.value = [...selectedMembers.value]
}

const addItem = async (taskIndex: number) => {
  const task = taskList.value[taskIndex]
  if (task.newItemText.trim() !== '') {
    task.items.push({ description: task.newItemText, done: false, _id: '' })
    task.newItemText = ''
    task.isSaveVisible = true
  }

  try {
    const body = {
      employeeId: localStorage.getItem('employeeId') || '',
      jobId: props.jobID,
      taskId: taskList.value[taskIndex]._id
    }
    const response = await axios.put(`${API_URL}job/taskItem`, body, config)
    console.log(response.data.data)
    if (response.status > 199 && response.status < 300) {
      const currentDate = new Date().toISOString()
      console.log(currentDate)
      const itemId =
        response.data.data.taskList[taskIndex].items[
          response.data.data.taskList[taskIndex].items.length - 1
        ]._id
      taskList.value[taskIndex].items[taskList.value[taskIndex].items.length - 1]._id = itemId
      console.log('Item id', itemId)
      const body2 = {
        employeeId: localStorage.getItem('employeeId') || '',
        jobId: props.jobID,
        taskId: taskList.value[taskIndex]._id,
        description:
          taskList.value[taskIndex].items[taskList.value[taskIndex].items.length - 1].description,
        done: taskList.value[taskIndex].items[taskList.value[taskIndex].items.length - 1].done,
        itemId: itemId,
        dueDate: currentDate
      }
      console.log('Description', body2.description)
      console.log(body2)
      const response2 = await axios.patch(`${API_URL}job/taskItem`, body2, config)
      console.log(response2.data.data)
    }
  } catch (error) {
    console.log(error)
  }
}

const getJobTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}job/id/${props.jobID}`)
    const tasks = response.data.data.taskList.map((task: any) => ({
      title: task.title,
      items: task.items,
      newItemText: '',
      isSaveVisible: false,
      _id: task._id
    }))
    console.log('Tasks:', tasks)
    taskList.value = tasks
    console.log('Mapped tasks:', taskList.value)
  } catch (error) {
    console.log('Failed to retrieve tasks', error)
  }
}

const createTaskIntegration = async (taskIndex: number) => {
  const body = {
    employeeId: localStorage.getItem('employeeId') || '',
    jobId: props.jobID,
    title: taskList.value[taskIndex].title
  }
  const response = await axios.put(`${API_URL}job/task`, body, config)
  taskList.value[taskIndex]._id =
    response.data.data.taskList[response.data.data.taskList.length - 1]._id
  console.log('New task called', response.data.data)
}

const updateTaskIntegration = async (taskIndex: number) => {
  const body = {
    employeeId: localStorage.getItem('employeeId') || '',
    jobId: props.jobID,
    taskId: taskList.value[taskIndex]._id,
    title: taskList.value[taskIndex].title
  }
  const response = await axios.patch(`${API_URL}job/task`, body, config)
  console.log('Task updated', response.data.data)
}

const saveTask = async (taskIndex: number) => {
  try {
    if (taskList.value[taskIndex]._id === '') {
      await createTaskIntegration(taskIndex)
    } else {
      await updateTaskIntegration(taskIndex)
    }
  } catch (error) {
    console.log(error)
  }
}

const convertCard = async (taskIndex: number, itemIndex: number) => {
  try {
    const body = {
      currentEmployeeId: localStorage.getItem('employeeId') || '',
      jobId: props.jobID,
      taskId: taskList.value[taskIndex]._id,
      taskItemId: taskList.value[taskIndex].items[itemIndex]._id
    }
    const response = await axios.patch(`${API_URL}job/convert`, body, config)
    if (response.status > 199 && response.status < 300) {
      console.log('Card converted successfully', response.data)
    } else {
      console.log('Failed to convert card', response)
    }
  } catch (error) {
    console.log('Error converting card', error)
  }
  assignDialog.value = false
}

const handleCheckboxChange = async (taskIndex: number, itemIndex: number) => {
  const task = taskList.value[taskIndex];
  const item = task.items[itemIndex];
  const body = {
    employeeId: localStorage.getItem('employeeId') || '',
    jobId: props.jobID,
    taskId: task._id,
    itemId: item._id,
    description: item.description,
    dueDate: new Date().toISOString(),
    done: item.done
  };
  try {
    const response = await axios.patch(`${API_URL}job/taskItem`, body, config);
    if (response.status > 199 && response.status < 300) {
      console.log('Item updated successfully', response.data);
    } else {
      console.log('Failed to update item', response);
    }
  } catch (error) {
    console.log('Error updating item', error);
  }
};

const getTeamMembers = async () => {
  try {
    const response = await axios.get(
      `${API_URL}employee/detailed/all/${localStorage.getItem('employeeId')}`,
      config
    )
    if (response.status > 199 && response.status < 300) {
      console.log(response)
      members.value = response.data.data.map((employee: any) => ({
        _id: employee._id,
        userInfo: {
          firstName: employee.userInfo.firstName,
          surname: employee.userInfo.surname
        }
      }))
      console.log('Members only: ', members.value)
    } else {
      console.log('failed')
    }
  } catch (error) {
    console.log(error)
    console.error('Error updating job:', error)
  }
}

const saveMembers = async (taskIndex: number, itemIndex: number) => {
  try {
    // Find members to remove
    const membersToRemove = originalSelectedMembers.value.filter(
        (originalMember) =>
            !selectedMembers.value.some((selectedMember) => selectedMember._id === originalMember._id)
    );

    // Remove unselected members
    for (const member of membersToRemove) {
      try {
        const response = await axios.patch(
            `${API_URL}job/employee/taskItem`,
            {
              employeeId: localStorage.getItem('employeeId'),
              employeeToAssignId: member._id,
              jobId: props.jobID,
              taskId: taskList.value[taskIndex]._id,
              itemId: taskList.value[taskIndex].items[itemIndex]._id
            },
            config
        );
        if (response.status >= 200 && response.status < 300) {
          console.log(`Removed member: ${member._id}`);
        } else {
          console.log('Failed to remove member', response);
        }
      } catch (error) {
        console.error(`Error removing member ${member._id}:`, error);
      }
    }

    // Add new selected members
    for (const member of selectedMembers.value) {
      if (
          !originalSelectedMembers.value.some((originalMember) => originalMember._id === member._id)
      ) {
        try {
          const response = await axios.put(
              `${API_URL}job/employee/taskItem`,
              {
                employeeId: localStorage.getItem('employeeId'),
                employeeToAssignId: member._id,
                jobId: props.jobID,
                taskId: taskList.value[taskIndex]._id,
                itemId: taskList.value[taskIndex].items[itemIndex]._id
              },
              config
          );
          if (response.status >= 200 && response.status < 300) {
            console.log(`Added member: ${member._id}`);
          } else {
            console.log('Failed to add member', response);
          }
        } catch (error) {
          console.error(`Error adding member ${member._id}:`, error);
        }
      }
    }

    // Update the original selected members
    originalSelectedMembers.value = [...selectedMembers.value];
  } catch (error) {
    console.error('Error in saveMembers function:', error);
  }
  assignDialog.value = false;
};

const getAssignedEmployees = async (taskIndex: number, itemIndex: number) => {
  try {
    const response = await axios.get(`${API_URL}job/id/${props.jobID}`, config);
    if (response.status >= 200 && response.status < 300) {
      console.log(response);
      const task = response.data.data.taskList[taskIndex];
      console.log('Task', task)
      const item = task.items[itemIndex];
      console.log('Item', item)
      const employees = item.assignedEmployees || [];
      console.log('Employees', employees)
      selectedMembers.value = employees.map((employee: any) => ({
        _id: employee._id,
        userInfo: {
          firstName: employee.userInfo.firstName,
          surname: employee.userInfo.surname
        }
      }));
      console.log('Assigned Employees', selectedMembers.value);
    } else {
      console.log('Failed to retrieve assigned employees', response);
    }
  } catch (error) {
    console.log(error);
    console.error('Error retrieving assigned employees:', error);
  }
}

const getMembersFullName = (item: Member) => {
  if (item.userInfo && item.userInfo.firstName && item.userInfo.surname) {
    return `${item.userInfo.firstName} ${item.userInfo.surname}`
  }
  return ''
}

function deleteItem(taskIndex: number, itemIndex: number) {
  taskList.value[taskIndex].items.splice(itemIndex, 1)
}

function openCheckActionsDialog(itemIndex: number) {
  // Handle dialog actions
}

const deleteTask = async (taskIndex: number) => {
  try {
    const body = {
      employeeId: localStorage.getItem('employeeId') || '',
      jobId: props.jobID,
      taskId: taskList.value[taskIndex]._id
    }
    const response = await axios.delete(`${API_URL}job/task`, {
      headers: config.headers,
      data: body
    })
    console.log('Delete successful', response)
    if (response.status > 199 && response.status < 300) {
      taskList.value.splice(taskIndex, 1)
    }
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getJobTasks().then(() => {
    taskList.value.forEach(task => {
      if (task.items.length > 0) {
        isSaveButtonVisible.value = false;
      }
    });
  });
  getTeamMembers()
});
</script>

<style scoped>
.strikethrough {
  text-decoration: line-through;
}
</style>
