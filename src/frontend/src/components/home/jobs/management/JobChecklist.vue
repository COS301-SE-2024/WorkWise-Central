<template>
  <v-dialog v-model="checklistDialog" max-width="500" height="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          rounded="md"
          class="mb-2"
          prepend-icon="mdi-list-box"
          variant="elevated"
          v-bind="activatorProps"
      >
        Checklist
      </v-btn>
    </template>
    <v-sheet elevation="14" rounded="md" width="500" height="auto">
      <v-col cols="12">
        <v-row class="pa-2" align="center">
          <v-col cols="12">
            <v-card variant="">
              <v-card-title class="text-h5 font-weight-regular bg-blue-grey">
                <v-icon left class="mr-2">mdi-list-box</v-icon>
                <span class="title"> Checklist</span>
                <v-spacer></v-spacer>
              </v-card-title>
            </v-card>
          </v-col>

          <!-- Close button on the right -->
        </v-row>
        <v-spacer></v-spacer>

        <v-col cols="12"
        ><v-label>Title</v-label>
          <v-text-field
              v-model="newChecklistItemTitle"
              :label="newChecklistItemTitle ? newChecklistItemTitle : 'Checklist'"
              variant="outlined"
              hide-details
              width="95%"
              border="md"
              density="compact"
          ></v-text-field> </v-col
        ><v-spacer></v-spacer>

        <v-col cols="12" v-for="item in checklist" :key="item.id">
          <v-row>
            <v-col cols="10">
              <v-label>{{ item.title }}</v-label>
            </v-col>
            <v-col cols="2">
              <v-btn color="red" @click="removeChecklistItem(item.id)" variant="plain"
              >Remove</v-btn
              >
            </v-col>
          </v-row>
        </v-col>
        <v-row align="center">
          <v-col cols="auto" justify="center"
          ><v-btn variant="plain" size="large" color="blue" @click="addChecklist"
          >Add</v-btn
          ></v-col
          ></v-row
        >
      </v-col>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    checklistProp: Array
  },
  name: 'JobChecklist',
  data: () => ({
    checklistDialog: false,
    newChecklistItemTitle: '',
    checklist: []
  }),
  methods: {
    addChecklist() {
      if (this.newChecklistItemTitle.trim() !== '') {
        const newItem = {
          id: Date.now(), // Simple way to generate a unique id
          title: this.newChecklistItemTitle
        }

        this.$emit('addItemToList', newItem) // Emit an event with the new item
        this.checklist.push(newItem)

        this.newChecklistItemTitle = '' // Reset input field after adding
        this.$emit('itemAdded', this.checklist) // Emit an event with the new item
      }
    },
    removeChecklistItem(itemId) {
      this.checklist = this.checklist.filter((item) => item.id !== itemId)
      this.$emit('itemRemoved', itemId) // Emit an event with the removed item id
    }
  }
})
</script>