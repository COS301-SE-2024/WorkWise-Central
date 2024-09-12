<template>
  <div class="chat-input">
    <InputText v-model="newMessage" placeholder="Type a message" @keyup.enter="sendMessage"></InputText>
    <Button icon="pi pi-send" @click="sendMessage"></Button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

// Define the emit function to allow emitting events to the parent component
const emit = defineEmits(['message-sent']);  // Define the event name

const newMessage = ref('');

// Function to send the message and emit the event
const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    emit('message-sent', newMessage.value);  // Emit the message to the parent component
    newMessage.value = '';  // Clear the input field
  }
};
</script>

<style scoped>
.chat-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
}
</style>
