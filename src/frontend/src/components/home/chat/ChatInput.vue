<template>
  <div class="chat-input">
    <InputText
      v-model="message"
      placeholder="Type a message"
      @keyup.enter="sendMessage"
      @input="handleInput"
      :disabled="disabled"
      class="w-full"
    />

    <!--        <FileUpload-->
    <!--          mode="basic"-->
    <!--          :maxFileSize="1000000"-->
    <!--          @select="onFileSelect"-->
    <!--          :disabled="disabled"-->
    <!--          :auto="true"-->
    <!--          chooseLabel="Attach"-->
    <!--          class="p-button-rounded p-button-outlined"-->
    <!--        />-->
    <FileUpload
      mode="basic"
      :multiple="true"
      @select="handleFileChange"
      @clear="clearFiles"
      :auto="true"
      chooseLabel="Attach Files"
      :customUpload="true"
      :showCancelButton="false"
      :showUploadButton="false"
      :class="{ 'p-button p-button-rounded p-button-outlined': true }"
    >
      <template #chooseicon>
        <i class="fas fa-file"></i>
      </template>
    </FileUpload>

    <v-col cols="1">
      <Button
        icon="fa: fa-solid fa-paper-plane"
        @click="sendMessage"
        :disabled="disabled || (!message.trim() && attachments.length === 0)"
        class="p-button-rounded p-button"
      />
    </v-col>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import axios from 'axios'
import { API_URL } from '@/main'
import { useToast } from 'primevue/usetoast'
import FileUpload from 'primevue/fileupload'
import { defineProps, defineEmits } from 'vue'
import debounce from 'lodash/debounce'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  chatId: String
})

const emit = defineEmits(['send-message', 'typing'])
const toast = useToast()
const message = ref('')
//const attachment = ref(null)

const attachments = ref([])
//const newFile = ref(null)
const newFiles = ref([])
const sendMessage = () => {
  if ((message.value.trim() || attachments.value.length > 0) && !props.disabled) {
    console.log('Emtting', message.value, attachments.value)
    emit('send-message', {
      content: message.value,
      attachments: attachments.value
    })
    message.value = ''
    attachments.value = []
  }
}

const emitTyping = debounce(() => {
  emit('typing')
}, 400)

onUnmounted(() => {
  emitTyping.cancel()
})

const handleInput = () => {
  emitTyping()
}

const handleFileChange = async (event) => {
  const files = event.files
  if (files && files.length > 0) {
    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    }

    const url = `${API_URL}chat/add/attachments`

    try {
      const response = await axios.put(url, formData, config)
      if (response.status === 200) {
        console.log(response)
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Files uploaded successfully',
          life: 3000
        })

        for (const em of response.data.data) {
          attachments.value.push(em)
          console.log('Pushed', em)
        }

        return response.data.data
      }
    } catch (error) {
      console.error(error)
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to upload File(s)',
        life: 3000
      })
      console.log(url)
    }
  }
}

const clearFiles = () => {
  attachments.value = []
}
</script>

<style scoped>
.p-fileupload-choose {
  width: 100%;
}

.chat-input {
  display: flex;
  align-items: center;
  padding: 1rem;
  position: sticky;
  bottom: 0;
}

.p-inputtext {
  flex-grow: 1;
  margin-right: 0.5rem;
}

.p-button {
}

.p-button:enabled:hover {
  opacity: 0.8; /* Subtle hover effect */
}

.p-button:disabled {
}

/* Deep selectors for third-party components */
:deep(.p-inputtext) {
}

:deep(.p-fileupload-choose) {
  margin-right: 0.5rem;
}
</style>
