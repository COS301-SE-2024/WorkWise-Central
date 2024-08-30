<template>
  <v-container>
    <!-- Button to create a new task -->
    <v-row class="justify-center mb-4">
      <v-btn
        color="primary"
        @click="createNewTask"
        prepend-icon="mdi-plus"
        >Create New Task List</v-btn
      >
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
          <v-btn color="error" outlined @click="deleteTask(taskIndex)" class="pl-10 pt-5">
            Delete
          </v-btn>
        </v-row>

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
                    <v-btn
                      @click="openCheckActionsDialog(itemIndex)"
                      v-bind="activatorProps"
                      class="ml-2"
                    >
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
                          <v-btn color="success" class="mb-2">
                            <v-icon>{{ 'fa: fa-solid fa-save' }}</v-icon>
                            Save
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
              <v-btn color="success" @click="addItem(taskIndex)" prepend-icon="mdi-plus"
                >Add Item</v-btn
              >
            </v-col>
          </v-row>

          <!-- Save Task Button -->
          <v-defaults-provider :defaults="{ VIcon: { color: 'success' } }">
            <v-row class="justify-center">
              <v-btn
                v-if="task.isSaveVisible"
                color="success"
                @click="saveTask(taskIndex)"
                prepend-icon="fa: fa-solid fa-save"
              >
                Save Task
              </v-btn>
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

<script>
export default {
  data() {
    return {
      taskList: [
        // Populate with tasks
      ],
      itemsPerPage: 1,
      currentPage: 1,
      assignDialog: false,
      selectedEmployees: [],
      assignableEmployees: []
    }
  },
  computed: {
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      return this.taskList.slice(start, start + this.itemsPerPage)
    },
    pageCount() {
      return Math.ceil(this.taskList.length / this.itemsPerPage)
    },
    canCreateNewTask() {
      return this.taskList.length < this.itemsPerPage * this.pageCount
    }
  },
  methods: {
    createNewTask() {
      this.taskList.push({ title: '', items: [], newItemText: '', isSaveVisible: false })
    },
    getTaskProgress(task) {
      const completedItems = task.items.filter((item) => item.done).length
      return (completedItems / task.items.length) * 100 || 0
    },
    addItem(taskIndex) {
      const task = this.taskList[taskIndex]
      if (task.newItemText.trim() !== '') {
        task.items.push({ description: task.newItemText, done: false })
        task.newItemText = ''
        task.isSaveVisible = true
      }
    },
    saveTask(taskIndex) {
      // Save task logic
    },
    deleteItem(taskIndex, itemIndex) {
      this.taskList[taskIndex].items.splice(itemIndex, 1)
    },
    openCheckActionsDialog(itemIndex) {
      // Handle dialog actions
    }
  }
}
</script>

<style>
.strikethrough {
  text-decoration: line-through;
}
</style>
