<template>
  <div class="chat-input">
    <InputText
      v-model="message"
      placeholder="Type a message"
      @keyup.enter="sendMessage"
      :disabled="disabled"
    />
    <Button
      icon="pi pi-send"
      @click="sendMessage"
      :disabled="disabled || !message.trim()"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['send-message']);

const message = ref('');

const sendMessage = () => {
  if (message.value.trim() && !props.disabled) {
    emit('send-message', message.value);
    message.value = '';
  }
};
</script>

<style scoped>
.chat-input {
  display: flex;
  padding: 1rem;
  background-color: #f0f0f0;
  border-top: 1px solid #e0e0e0;
}

.p-inputtext {
  flex-grow: 1;
  margin-right: 0.5rem;
}

.p-button {
  background-color: #25D366;
  border: none;
}

.p-button:enabled:hover {
  background-color: #128C7E;
}
</style>