<template>
  <div class="chat-input">
    <InputText
      v-model="message"
      placeholder="Type a message"
      @keyup.enter="sendMessage"
      :disabled="disabled"
      class="w-full"
    />
    <FileUpload
      mode="basic"
      :maxFileSize="1000000"
      @select="onFileSelect"
      :disabled="disabled"
      :auto="true"
      chooseLabel="Attach"
      class="p-button-rounded p-button-outlined"
    />
    <Button
      icon="pi pi-send"
      @click="sendMessage"
      :disabled="disabled || (!message.trim() && !attachment)"
      class="p-button-rounded"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['send-message']);

const message = ref('');
const attachment = ref(null);

const sendMessage = () => {
  if ((message.value.trim() || attachment.value) && !props.disabled) {
    emit('send-message', {
      content: message.value,
      attachment: attachment.value
    });
    message.value = '';
    attachment.value = null;
  }
};

const onFileSelect = (event) => {
  attachment.value = event.files[0];
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

:deep(.p-fileupload-choose) {
  margin-right: 0.5rem;
}
</style>