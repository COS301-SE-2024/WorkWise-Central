<template>
  <div>
    <v-divider></v-divider>
    <h3>Add job notes</h3>
    <v-container>
      <v-row v-for="(note, index) in notes" :key="index" class="d-flex align-center mb-3">
        <v-col cols="11">
          <v-text-field
              v-model="note.text"
              label="Note"
              dense
              readonly
              :clearable="false"
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
      <v-btn color="success" @click="addNote">Add Note</v-btn>
    </v-container>
  </div>
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
