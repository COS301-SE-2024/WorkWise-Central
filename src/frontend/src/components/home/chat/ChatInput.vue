<template>
  <div class="chat-input">
    <InputText
      v-model="message"
      placeholder="Type a message"
      @keyup.enter="sendMessage"
      :disabled="disabled"
      class="w-full"
    />
    <Button
      icon="fa: fa-solid fa-paper-plane"
      @click="sendMessage"
      :disabled="disabled || !message.trim()"
      class="p-button-rounded"
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
  align-items: center;
  padding: 1rem;
  background-color: #f0f0f0;
  border-top: 1px solid #e0e0e0;
  position: sticky;
  bottom: 0;
}

.p-inputtext {
  flex-grow: 1;
  margin-right: 0.5rem;
}

:deep(.p-inputtext) {
  background-color: #ffffff;
  color: #495057;
}

.p-button {
  background-color: #25D366;
  color: #ffffff;
}

.p-button:enabled:hover {
  background-color: #128C7E;
}

.p-button:disabled {
  background-color: #a0a0a0;
  color: #ffffff;
}
</style>