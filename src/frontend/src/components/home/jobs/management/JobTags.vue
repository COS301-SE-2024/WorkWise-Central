<template>
    <v-combobox
      v-model="selectedTags"
      :items="companyLabels"
      item-value="_id"
      item-title="label"
      label="Select some tags you would like to assign to this job"
      multiple
      required
      color="primary"
      variant="solo"
      clearable
      data-testid="tags-multi-select"
      searchable
    >
      <template #selection="{ item }">
        <v-chip
          :style="{ backgroundColor: item.raw.colour, color: getContrastingColor(item.raw.colour) }"
          @click="openEditDialog(item)"
        >
          {{ item.title }}
        </v-chip>
      </template>
    </v-combobox>

  <v-btn color="success" width="100%" @click="saveTags">
    <v-icon class="fas fa-save"></v-icon>
    Save Tags
  </v-btn>
  <v-btn color="success" class="mt-4" @click="openCreateDialog" block>
    <v-icon class="fas fa-plus"></v-icon>
    Create Tag
  </v-btn>
    <!-- Label Creation/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card class="bg-cardColor">
        <v-card-title>{{ dialogTitle }}</v-card-title>

        <v-card-text>
          <!-- Title Input -->
          <v-label class="pb-0">Title</v-label>
          <v-text-field
            v-model="labelTitle"
            label="Label Title"
            outlined
            dense
            class="mt-4 pt-0"
            hint="Enter the title for the label"
            persistent-hint
          ></v-text-field>

          <!-- Color Palette -->
            <!-- Color Picker -->
            <v-row cols="12" class="pt-4">
              <v-col cols="12" class="d-flex justify-center">
                <v-color-picker
                  v-model="selectedColor"
                  show-swatches
                  hide-inputs
                ></v-color-picker>
              </v-col>
            </v-row>

          <!-- Selected Color Block with Label Title -->
          <div
            v-if="labelTitle"
            class="d-flex justify-center align-center mt-4"
            :style="{
              backgroundColor: selectedColor,
              color: getContrastingColor(selectedColor),
              width: '100%',
              height: '100px',
              borderRadius: '8px'
            }"
          >
            <span style="font-size: 24px">{{ labelTitle }}</span>
          </div>
        </v-card-text>

        <v-card-actions class="d-flex flex-column">
          <v-btn color="success" @click="handleClick">
            <v-icon class="fas fa-save"></v-icon>
            {{ dialogTitle === 'Create Label' ? 'Create' : 'Save' }}
          </v-btn>
          <v-btn v-if="dialogTitle === 'Edit Label'" color="error" @click="deleteLabel">
            <v-icon class="fas fa-trash"></v-icon>
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

// Define types for the label and color
interface Label {
  companyId: string
  label: string
  colour: string
  _id: string
}

const props = defineProps<{ tags: Label[]; jobID: string }>()

const dialog = ref<boolean>(false)
const dialogTitle = ref<string>('Create Label')
const labelTitle = ref<string>('')
const selectedColor = ref<string>('#ffffff')
const selectedTagId = ref<string>('')
const selectedTags = ref<Label[]>([])
const labels = ref<Label[]>([])
const companyLabels = ref<Label[]>([])

// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

// Utility functions
const isLocalAvailable = async (url: string): Promise<boolean> => {
  try {
    const res = await axios.get(url)
    return res.status < 300 && res.status > 199
  } catch (error) {
    return false
  }
}

const getRequestUrl = async (): Promise<string> => {
  const localAvailable = await isLocalAvailable(localUrl)
  return localAvailable ? localUrl : remoteUrl
}

const getJobTags = async () => {
  const apiUrl = await getRequestUrl()
  try {
    const response = await axios.get(
      `${apiUrl}job/tags/${localStorage.getItem('currentCompany')}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    )
    if (response.status > 199 && response.status < 300) {
      companyLabels.value = response.data.data
      console.log('Returned tags:', companyLabels.value)
      selectedTags.value = props.tags
    }
  } catch (error) {
    console.log('Failed to get tags', error)
  }
}

const saveTags = async () => {
  const apiUrl = await getRequestUrl()
  try {
    const updatedTags = selectedTags.value.map((tag) => tag._id)
    console.log('Selected tags:', updatedTags)
    const response = await axios.patch(
      `${apiUrl}job/update/${props.jobID}`,
      { tags: updatedTags },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    )
    console.log('Selected Tags:', selectedTags)
    console.log(response)
  } catch (error) {
    console.log('Selected Tags:', selectedTags)
    console.log(error)
  }
}

const handleClick = () => {
  if (dialogTitle.value === 'Create Label') {
    saveLabel()
  } else if (dialogTitle.value === 'Edit Label') {
    editLabel()
  }
}

const editLabel = async () => {
  const apiUrl = await getRequestUrl()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  try {
    const body = {
      companyId: localStorage.getItem('currentCompany') || '',
      label: labelTitle.value,
      colour: selectedColor.value,
      tagId: selectedTagId.value
    }
    const response = await axios.patch(`${apiUrl}job/tags`, body, config)
    editTagSuccess()
    console.log('Edit tag:', response)
    // Update the selectedTags array with the new values
    const tagIndex = selectedTags.value.findIndex(tag => tag._id === selectedTagId.value)
    if (tagIndex !== -1) {
      selectedTags.value[tagIndex].label = labelTitle.value
      selectedTags.value[tagIndex].colour = selectedColor.value
    }
  } catch (error) {
    editTagFailure()
    console.log(error)
  }
  labelTitle.value = ''
  selectedColor.value = ''
  selectedTagId.value = ''
  dialog.value = false
}

const openCreateDialog = () => {
  dialogTitle.value = 'Create Label'
  labelTitle.value = ''
  selectedColor.value = '#ffffff'
  dialog.value = true
}

const openEditDialog = async (label: any) => {
  dialogTitle.value = 'Edit Label'
  console.log('Selected label', label)
  labelTitle.value = label.raw.label
  selectedColor.value = label.raw.colour
  selectedTagId.value = label.raw._id
  dialog.value = true
}

const saveLabel = async () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  const apiUrl = await getRequestUrl()

  if (dialogTitle.value === 'Create Label') {
    try {
      const tag = {
        companyId: localStorage.getItem('currentCompany') || '',
        label: labelTitle.value,
        colour: selectedColor.value
      }
      const response = await axios.post(`${apiUrl}job/tags/add`, tag, config)
      const updatedTags = [...props.tags.map(tag => tag._id), response.data.data._id]
      console.log(response)
      if (response.status > 199 && response.status < 300) {
        // labels.value.push(tag)
        try {
          console.log('Job id', props.jobID)
          console.log('Tag body', tag)
          let response = await axios.patch(
            `${apiUrl}job/update/${props.jobID}`,
            { tags: updatedTags },
            config
          )
          if (response.status > 199 && response.status < 300) {
            addTagSuccess()
            selectedTags.value.push({
              companyId: localStorage.getItem('currentCompany') || '',
              label: labelTitle.value,
              colour: selectedColor.value,
              _id: updatedTags[updatedTags.length - 1]
            })
            console.log('Tag added to the job', response)
          } else {
            console.log('Failed to add tag to job', response)
          }
        } catch (error) {
          addTagFailure()
          console.log(error)
        }
      } else {
        addTagFailure()
      }
    } catch (error) {
      console.log('Failed to create tag', error)
    }
  } else {
    // Find the label being edited by its name and update its properties
    const label = labels.value.find((l) => l.label === labelTitle.value)
    if (label) {
      label.label = labelTitle.value
      label.colour = selectedColor.value
    }
  }
  dialog.value = false
}


const deleteLabel = async () => {
  const apiUrl = await getRequestUrl()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }
  try {
    const body = {
      tagId: selectedTagId.value,
      companyId: localStorage.getItem('currentCompany')
    }
    const response = await axios.delete(`${apiUrl}job/tags`, {
      data: body,
      headers: config.headers
    })
    deleteTagSuccess()
    console.log('Delete tag:', response)
    // Remove the deleted tag from the selectedTags array
    selectedTags.value = selectedTags.value.filter(tag => tag._id !== selectedTagId.value)
  } catch (error) {
    deleteTagFailure()
    console.log(error)
  }
  labelTitle.value = ''
  selectedColor.value = ''
  selectedTagId.value = ''
  dialog.value = false
}

const editTagFailure = () => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Failed to edit tag',
    life: 3000
  })
}

const addTagFailure = () => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Failed to add tag',
    life: 3000
  })
}

const deleteTagFailure = () => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: 'Failed to delete tag',
    life: 3000
  })
}

const addTagSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Tag added successfully',
    life: 3000
  })
}

const editTagSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Tag edited successfully',
    life: 3000
  })
}

const deleteTagSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: 'Tag deleted successfully',
    life: 3000
  })
}

// Utility function to determine the best text color for the selected background
const getContrastingColor = (bgColor: string): string => {
  if (!bgColor || typeof bgColor !== 'string') {
    return '#000'; // Default to black if bgColor is not defined or not a string
  }
  const color = bgColor.slice(1) // Remove '#'
  const rgb = parseInt(color, 16) // Convert hex to RGB
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 125 ? '#000' : '#fff' // Return black or white
}

onMounted(() => {
  getJobTags()
})
</script>

<style scoped>
.no-background {
  background-color: transparent !important;
}
</style>
