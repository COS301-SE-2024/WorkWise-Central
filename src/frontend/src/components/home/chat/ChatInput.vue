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

const newMessage = ref('');

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    emit('message-sent', newMessage.value);
    newMessage.value = '';  // Clear input
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