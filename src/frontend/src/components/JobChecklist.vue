<template>
  <v-dialog v-model="checklistDialog" max-width="500" height="auto">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        prepend-icon="mdi-list-box"
        variant="elevated"
        v-bind="activatorProps"
      >
        Checklist
      </v-btn>
    </template>
    <v-sheet elevation="14" rounded="xl" width="500" height="auto">
      <v-col>
        <v-row class="pa-2" align="center">
          <!-- Add padding for spacing and align items center -->

          <!-- Label in the middle -->
          <v-col cols="10">
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">Add Checklist</h4>
          </v-col>

          <!-- Close button on the right -->
          <v-col cols="2">
            <v-btn @click="checklistDialog = false" variant="plain">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
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
        <v-col cols="auto"
          ><v-btn variant="elevated" size="large" color="blue" @click="addChecklist">Add</v-btn></v-col
        >
      </v-col>
    </v-sheet>
  </v-dialog>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
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
        this.checklist.push(newItem)
        this.newChecklistItemTitle = '' // Reset input field after adding
      }
    },
    removeChecklistItem(itemId) {
      this.checklist = this.checklist.filter((item) => item.id !== itemId)
    }
  }
})
</script>
