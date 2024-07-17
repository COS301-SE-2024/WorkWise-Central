<template>
  <v-btn @click="noteSection = true">View/Add Notes</v-btn>
  <v-dialog v-model="noteSection">
    <v-card class="text-center">
      <v-card-title>Notes for the Job</v-card-title>
      <v-card-text>
        <label class="pb-2">Notes</label>
        <v-container>
          <v-row v-for="(note, index) in notes" :key="index" class="d-flex align-center mb-3">
            <v-col cols="11">
              <v-text-field
                  v-model="note.text"
                  label="Note"
                  dense
                  readonly
              ></v-text-field>
            </v-col>
            <v-col cols="1">
              <v-btn icon @click="deleteNote(index)">
                <v-icon color="red" class="fa fa-trash"></v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-textarea
              v-model="newNote"
              label="Add a new note"
              clearable
              auto-grow
              variant="solo"
              hint="Add a job note"
          ></v-textarea>
          <v-btn color="primary" @click="addNote">Add Note</v-btn>
        </v-container>
      </v-card-text>
      <v-card-actions class="d-flex flex-column">
        <v-btn color="success" @click="saveNotes">Save</v-btn>
        <v-btn color="error" @click="cancel">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const noteSection = ref(false);
const notes = ref([{ text: 'Initial note' }]);
const newNote = ref('');

const addNote = () => {
  if (newNote.value.trim() !== '') {
    notes.value.push({ text: newNote.value.trim() });
    newNote.value = '';
  }
};

const deleteNote = (index: number) => {
  notes.value.splice(index, 1);
};

const saveNotes = () => {
  // Logic to save notes data
  noteSection.value = false;
};

const cancel = () => {
  noteSection.value = false;
};
</script>

<style></style>
