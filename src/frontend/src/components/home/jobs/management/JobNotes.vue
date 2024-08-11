<template>
  <div>
    <v-container>
      <v-row v-for="(note, index) in notes" :key="index" class="d-flex align-center mb-3">
        <v-col cols="11">
          <v-text-field
            v-model="note.text"
            label="Note"
            dense
            readonly
            :clearable="false"
            class="pt-4"
            hide-details
            prepend-icon="fa: fa-solid fa-sticky-note"
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-btn @click="deleteNote(index)">
            <v-icon color="red" class="fa fa-trash pt-4"></v-icon>
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
        hide-details
        prepend-icon="fa: fa-solid fa-sticky-note"
        rows="3"
      ></v-textarea>
      <v-btn color="success" @click="addNote" prepend-icon="mdi-note-plus">Add Note</v-btn>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Placeholder types
interface Note {
  text: string
}

// Reactive properties
const notes = ref<Note[]>([])
const newNote = ref<string>('')

// Placeholder methods
const addNote = () => {
  if (newNote.value.trim()) {
    notes.value.push({ text: newNote.value })
    newNote.value = ''
  }
}

const deleteNote = (index: number) => {
  notes.value.splice(index, 1)
}
</script>
