<template>
  <v-card class="pa-4" height="auto">
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
          @click.stop="openEditDialog(item)"
        >
          {{ item.title }}
        </v-chip>
      </template>
    </v-combobox>
<!--    &lt;!&ndash; Label List &ndash;&gt;-->
<!--    <v-list class="no-background">-->
<!--      <v-list-item-->
<!--        v-for="label in filteredLabels"-->
<!--        :key="label.label"-->
<!--        class="d-flex align-center no-background"-->
<!--      >-->
<!--        <v-row align="center" no-gutters class="w-100">-->
<!--          &lt;!&ndash; Color Block with Label Text &ndash;&gt;-->
<!--          <v-col cols="auto">-->
<!--            <div-->
<!--              :style="{ backgroundColor: label.color }"-->
<!--              class="mr-4 d-flex justify-center align-center"-->
<!--              style="width: 600px; height: 40px; border-radius: 4px; position: relative"-->
<!--            >-->
<!--              <span-->
<!--                class="text-center"-->
<!--                style="-->
<!--                  position: absolute;-->
<!--                  width: 100%;-->
<!--                  height: 100%;-->
<!--                  display: flex;-->
<!--                  justify-content: center;-->
<!--                  align-items: center;-->
<!--                  color: white;-->
<!--                  font-weight: bold;-->
<!--                "-->
<!--              >-->
<!--                {{ label.label }}-->
<!--              </span>-->
<!--            </div>-->
<!--          </v-col>-->

<!--          &lt;!&ndash; Edit Icon &ndash;&gt;-->
<!--          <v-col cols="auto">-->
<!--            <v-icon @click="openEditDialog(label)">mdi-pencil</v-icon>-->
<!--          </v-col>-->

<!--          &lt;!&ndash; Delete Icon &ndash;&gt;-->
<!--          <v-col cols="auto">-->
<!--            <v-icon color="error" @click="deleteLabel(label)">mdi-delete</v-icon>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-list-item>-->
<!--    </v-list>-->

    <!-- Create Label Button -->
    <v-btn color="success" @click="saveTags"> Save Tags</v-btn>
    <v-btn color="success" class="mt-4" @click="openCreateDialog" block> Create Tag </v-btn>

    <!-- Label Creation/Edit Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-card-title>{{ dialogTitle }}</v-card-title>

        <v-card-text>
          <!-- Title Input -->
          <v-label class="pb-0">Title</v-label>
          <v-text-field v-model="labelTitle" outlined dense class="mt-4 pt-0"></v-text-field>

          <!-- Color Palette -->
          <v-row>
            <v-col
              v-for="color in colorOptions"
              :key="color"
              cols="2"
              class="d-flex justify-center"
            >
              <v-btn
                :style="{ backgroundColor: color }"
                class="ma-1"
                @click="selectedColor = color"
                :outlined="selectedColor !== color"
                style="width: 40px; height: 40px; border-radius: 4px"
              ></v-btn>
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

        <v-card-actions>
          <v-btn color="success" @click="saveLabel">
            {{ dialogTitle === 'Create Label' ? 'Create' : 'Save' }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
  <Toast/>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, onMounted } from 'vue'
import axios from 'axios'
import Toast from 'primevue/toast'
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

const searchQuery = ref<string>('')
const dialog = ref<boolean>(false)
const dialogTitle = ref<string>('Create Label')
const labelTitle = ref<string>('')
const selectedColor = ref<string>('#ffffff')
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

const colorOptions = ref<string[]>([
  '#FFB74D',
  '#FFD54F',
  '#FFF176',
  '#AED581',
  '#81C784',
  '#4DB6AC',
  '#4DD0E1',
  '#4FC3F7',
  '#64B5F6',
  '#7986CB',
  '#BA68C8',
  '#DCE775',
  '#FFF59D',
  '#FFEB3B',
  '#FFCA28',
  '#FF7043',
  '#FF8A65',
  '#A1887F',
  '#90A4AE',
  '#78909C',
  '#EF5350',
  '#EC407A',
  '#AB47BC',
  '#8E24AA',
  '#7B1FA2',
  '#42A5F5',
  '#26A69A',
  '#66BB6A',
  '#9CCC65',
  '#FFEE58'
])

const filteredLabels = computed<Label[]>(() =>
  labels.value.filter((label) =>
    label.label.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const openCreateDialog = () => {
  dialogTitle.value = 'Create Label'
  labelTitle.value = ''
  selectedColor.value = '#ffffff'
  dialog.value = true
}

const openEditDialog = (label: any) => {
  dialogTitle.value = 'Edit Label'
  labelTitle.value = label.label
  selectedColor.value = label.colour
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

const addTagSuccess = () => {
  toast.add({
    severity: 'success',
    summary: 'Tag added successfully',
    detail: 'Tag added successfully',
    life: 300
  })
}

const addTagFailure = () => {
  toast.add({
    severity: 'error',
    summary: 'Failed to add tag',
    detail: 'Failed to add tag',
    life: 300
  })
}

const deleteLabel = (label: Label) => {
  labels.value = labels.value.filter((l) => l.label !== label.label)
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
