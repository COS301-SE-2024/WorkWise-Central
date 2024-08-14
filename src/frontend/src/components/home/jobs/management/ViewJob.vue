<template>
    <v-card elevation="14" rounded="md" :style="{ backgroundColor: cardBackgroundColor }">
      <v-img :src="imageSrc" aspect-ratio="5.75" @load="() => setCardBackgroundColor(imageSrc)"></v-img>
      <v-row class="position-relative">
        <v-col class="d-flex justify-end">
          <v-btn color="primary" class="position-absolute bottom-right">
            <v-icon left>mdi-image</v-icon>
            <label for="imageInput" class="m-0">Cover</label>
            <input type="file" id="imageInput" @change="changeImage" accept="image/*" style="display: none;" />
          </v-btn>
        </v-col>
      </v-row>
      <v-card-title>
        {{ props.passedInJob?.details?.heading }}
      </v-card-title>
      <v-card-text class="text-center">
        <v-row>
          <v-col sm="12" md="9">
            <v-divider>
              <h5 ref="descriptionSection">Description</h5>
            </v-divider>
            <v-col class="text-center">
              <v-spacer></v-spacer>
              <p>
                {{ props.passedInJob?.details?.description }}
              </p>
            </v-col>
            <v-divider>
              <h5 ref="statusSection">Status</h5>
            </v-divider>
            <v-col class="text-center">
              <v-spacer></v-spacer>
              <p>
                <v-chip :color="getStatusColor(props.passedInJob?.status?.status)" dark>
                  {{ props.passedInJob?.status?.status }}
                </v-chip>
              </p>
            </v-col>

            <v-divider>
              <h5 ref="clientDetailsSection">Client Details</h5>
            </v-divider>

            <v-row>
              <v-col class="text-center" md="4">
                <label class="font-weight-bold">Client Name</label>
                <v-spacer></v-spacer>
                <p>
                  {{
                    props.passedInJob?.clientId?.details?.firstName +
                    ' ' +
                    props.passedInJob?.clientId?.details?.lastName
                  }}
                </p>
              </v-col>
              <v-col class="text-center" md="4">
                <label class="font-weight-bold">Phone</label>
                <v-spacer></v-spacer>
                <p>{{ props.passedInJob?.clientId?.details?.contactInfo?.phoneNumber }}</p>
              </v-col>
              <v-col class="text-center" md="4">
                <label class="font-weight-bold">Email</label>
                <v-spacer></v-spacer>
                <p>{{ props.passedInJob?.clientId?.details?.contactInfo?.email }}</p>
              </v-col>
            </v-row>

            <v-divider>
              <h5 ref="addressSection">Address</h5>
            </v-divider>
            <v-col class="text-center">
              <v-row class="text-center">
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">City</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.city }}
                  </p>
                </v-col>
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">Suburb</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.suburb }}
                  </p>
                </v-col>
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">Street</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.street }}
                  </p>
                </v-col>
              </v-row>
              <v-row>
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">Postal Code</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.postalCode }}
                  </p>
                </v-col>
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">Complex</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{ props.passedInJob?.details?.address?.complex }}
                  </p>
                </v-col>
                <v-col sm="6" md="4">
                  <label class="font-weight-bold">House Number</label>
                  <v-spacer></v-spacer>
                  <p>
                    {{
                      props.passedInJob?.details?.address?.houseNumber ||
                      'House number is not available'
                    }}
                  </p>
                </v-col>
              </v-row>
              <v-divider>
                <h5 ref="commentsSection">Add Job Comments</h5>
              </v-divider>
              <v-row>
                <v-col>
                  <AddComment
                    :jobComments="props.passedInJob?.comments"
                    :id="props.passedInJob?._id"
                  />
                </v-col>
              </v-row>
              <!--              <v-divider>-->
              <!--                <h5 ref="notesSection">Add Job Notes</h5>-->
              <!--              </v-divider>-->
              <!--              <v-row>-->
              <!--                <v-col>-->
              <!--                  <JobNotes :passedInJob="props.passedInJob" />-->
              <!--                </v-col>-->
              <!--              </v-row>-->
              <v-divider>
                <h5 ref="tasksSection">Check Off Tasks</h5>
              </v-divider>
              <v-row>
                <v-col>
                  <CheckOffItems
                    :jobTaskList="props.passedInJob?.taskList"
                    :id="props.passedInJob?._id"
                  />
                </v-col>
              </v-row>
              <v-divider>
                <h5 ref="imagesSection">Attach Images</h5>
              </v-divider>
              <v-col>
                <GetJobImages :attachments="props.passedInJob?.attachments"/>
              </v-col>
              <v-divider>
                <h5 ref="tagsSection">Add Job Tags</h5>
              </v-divider>
              <v-col>
                <JobTags :tags="props.passedInJob?.tags" :jobID="props.passedInJob?._id" />
              </v-col>
              <v-divider>
                <h5 ref="historySection">View Job History</h5>
              </v-divider>
              <v-col>
                <JobHistory />
              </v-col>
            </v-col>
          </v-col>
          <v-col sm="12" md="3">
            <v-col class="pb-0">
              <v-label class="d-flex justify-start pb-0 font-weight-bold">Card Actions</v-label>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('commentsSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-comment' }}
                </v-icon>
                Add Comment
              </v-btn>
            </v-col>
            <!--            <v-col>-->
            <!--              <v-btn-->
            <!--                width="100%"-->
            <!--                class="d-flex justify-start"-->
            <!--                border="md"-->
            <!--                elevation="5"-->
            <!--                @click="scrollToSection('notesSection')"-->
            <!--              >-->
            <!--                <v-icon left>-->
            <!--                  {{ 'fa: fa-solid fa-sticky-note' }}-->
            <!--                </v-icon>-->
            <!--                Add Note-->
            <!--              </v-btn>-->
            <!--            </v-col>-->
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('tasksSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-tasks' }}
                </v-icon>
                Check Off Task
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('imagesSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-upload' }}
                </v-icon>
                Attach Images
              </v-btn>
            </v-col>
<!--            <v-col>-->
<!--              <v-btn-->
<!--                width="100%"-->
<!--                class="d-flex justify-start"-->
<!--                border="md"-->
<!--                elevation="5"-->
<!--                @click="scrollToSection('tagsSection')"-->
<!--              >-->
<!--                <v-icon left>-->
<!--                  {{ 'fa: fa-solid fa-box' }}-->
<!--                </v-icon>-->
<!--                Log Inventory-->
<!--              </v-btn>-->
<!--            </v-col>-->
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('historySection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-eye' }}
                </v-icon>
                View History
              </v-btn>
            </v-col>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="closeView" width="100%">Close</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script setup lang="ts">
import { defineProps, ref, type Ref, defineEmits, onMounted } from 'vue'
import AddComment from './AddComments.vue'
// import JobNotes from './JobNotes.vue'
import CheckOffItems from './CheckOffItems.vue'
import GetJobImages from './GetJobImages.vue'
import JobTags from './JobTags.vue'
import JobHistory from './JobHistory.vue'
import axios from 'axios'

const props = defineProps<{ passedInJob: any }>()
const emits = defineEmits(['close'])

const commentsSection = ref<HTMLElement | null>(null)
const notesSection = ref<HTMLElement | null>(null)
const tasksSection = ref<HTMLElement | null>(null)
const imagesSection = ref<HTMLElement | null>(null)
const tagsSection = ref<HTMLElement | null>(null)
const historySection = ref<HTMLElement | null>(null)
const viewJobDialog = ref(false) // Dialog state
const checklistSection = ref(null)
const inventorySection = ref(null)
// API URLs
const localUrl: string = 'http://localhost:3000/'
const remoteUrl: string = 'https://tuksapi.sharpsoftwaresolutions.net/'

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

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

function scrollToSection(
  section:
    | 'commentsSection'
    | 'notesSection'
    | 'tasksSection'
    | 'imagesSection'
    | 'tagsSection'
    | 'historySection'
) {
  let sectionRef = null

  if (section === 'commentsSection') {
    sectionRef = commentsSection
  } else if (section === 'notesSection') {
    sectionRef = notesSection
  } else if (section === 'tasksSection') {
    sectionRef = tasksSection
  } else if (section === 'imagesSection') {
    sectionRef = imagesSection
  } else if (section === 'tagsSection') {
    sectionRef = tagsSection
  } else if (section === 'historySection') {
    sectionRef = historySection
  }

  if (sectionRef && sectionRef.value) {
    sectionRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'to do':
      return 'blue'
    case 'in progress':
      return 'yellow'
    case 'awaiting invoice':
      return 'orange'
    case 'awaiting payment':
      return 'red'
    case 'awaiting sign off':
      return 'green'
    default:
      return 'grey'
  }
}

const closeView = () => {
  emits('close')
}

const imageSrc = ref('')
const cardBackgroundColor = ref('')

const changeImage = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = async (e) => {
      imageSrc.value = e.target?.result as string
      setCardBackgroundColor(imageSrc.value)
      const apiUrl = getRequestUrl()
      try {
        console.log('Image src value:', imageSrc.value)
        console.log('Passed in job:', props.passedInJob)
        console.log('Job id:', props.passedInJob._id)
        await axios.patch(`${apiUrl}job/update/${props.passedInJob._id}`, {
          coverImage: imageSrc.value
        }, config)
        console.log('Image updated successfully')
      } catch (error) {
        console.error('Error updating image:', error)
      }
    }
    reader.readAsDataURL(input.files[0])
  }
}


const setCardBackgroundColor = (src: string) => {
  const img = new Image()
  img.src = src
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (context) {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
      const imageData = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data

      let r = 0, g = 0, b = 0, count = 0
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i]
        g += imageData[i + 1]
        b += imageData[i + 2]
        count++
      }

      r = Math.floor(r / count)
      g = Math.floor(g / count)
      b = Math.floor(b / count)

      cardBackgroundColor.value = `rgb(${r}, ${g}, ${b})`
    }
  }
}

onMounted(() => {
  if (props.passedInJob.coverImage === '') {
    imageSrc.value = 'https://media.istockphoto.com/id/2162545535/photo/two-male-workers-taking-a-break-at-the-construction-site.jpg?s=612x612&w=is&k=20&c=xceTrLx7-MPKjjLo302DjIw1mGaZiKAceaWIYsRCX0U='
  } else {
    imageSrc.value = props.passedInJob.coverImage
  }
  setCardBackgroundColor(imageSrc.value)
})

</script>

<style scoped>
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.bottom-right {
  bottom: 0;
  right: 0;
  margin-bottom: 8px; /* Adjust as needed */
  margin-right: 8px; /* Adjust as needed */
}
</style>
