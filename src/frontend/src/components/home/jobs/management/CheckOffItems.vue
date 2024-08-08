<template>
  <v-container>
    <div>{{ progress.toFixed(0) }}%</div>
    <v-progress-linear :model-value="progress" color="primary" :height="10"></v-progress-linear>
    <v-col></v-col>
    <v-row v-for="(item, index) in checklistItems" :key="index" class="d-flex align-center mb-3">
      <v-col md="10">
        <v-checkbox
          v-model="item.checked"
          :label="item.text"
          :class="{ 'strikethrough': item.checked }"
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
              <v-btn
                @click="openCheckActionsDialog(index)"
                v-bind="activatorProps"
              >
                <v-icon right>
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
                  <v-btn color="success">
                    <v-icon>
                      {{ 'fa: fa-solid fa-th' }}
                    </v-icon>
                    Convert to card
                  </v-btn>
                  <v-btn color="error" @click="deleteItem(index)">
                    <v-icon>
                      {{ 'fa: fa-solid fa-trash' }}
                    </v-icon>
                    Delete
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
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

<script setup>
import { ref, computed } from 'vue';

const checklistItems = ref([]);
const newItemText = ref('');

const progress = computed(() => {
  const totalTasks = checklistItems.value.length;
  const completedTasks = checklistItems.value.filter(item => item.checked).length;
  return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
});

const openCheckActionsDialog = (index) => {
  checklistItems.value[index].dialog = true;
};

function addItem() {
  if (newItemText.value.trim() !== '') {
    checklistItems.value.push({
      text: newItemText.value,
      checked: false,
      date: new Date().toISOString(),
      dialog: false,
    });
    newItemText.value = '';
  }
}

function deleteItem(index) {
  checklistItems.value.splice(index, 1);
}
</script>

<style scoped>
.strikethrough {
  text-decoration: line-through;
}
</style>
