<template>
  <v-card elevation="14" rounded="md" :style="cardStyle" :min-height="900">
    <v-row class="position-relative" :style="rowStyle">
      <v-img
        :src="imageSrc"
        aspect-ratio="5.75"
        @load="(src) => onImageLoad(src)"
        height="120%"
      ></v-img>
      <v-btn color="primary" class="position-absolute bottom-right">
        <v-icon left>mdi-image</v-icon>
        <label for="imageInput" class="m-0">Cover</label>
        <input
          type="file"
          id="imageInput"
          @change="changeImage"
          accept="image/*"
          style="display: none"
        />
      </v-btn>
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
              <v-chip :color="props.passedInJob?.status?.colour" dark>
                {{ props.passedInJob?.status?.status }}
              </v-chip>
            </p>
          </v-col>

          <v-divider v-if="props.passedInJob?.assignedEmployees?.employeeIds.length">
            <h5 ref="assignedEmployeesSection">Assigned Employees</h5>
          </v-divider>

          <v-row>
            <v-col v-for="employee in props.passedInJob?.assignedEmployees?.employeeIds" :key="employee?._id" cols="12">
              <v-row style="padding: 5px; align-items: center; justify-content: center;">
                <v-col cols="auto">
                  <v-avatar color="secondary" style="width: 55px; height: 55px">
                    <img
                        :src="employee?.userInfo?.displayImage"
                        alt="Employee Image"
                        style="width: 100%; height: 100%; object-fit: cover"
                    />
                  </v-avatar>
                </v-col>
                <v-col class="text-center" cols="auto">
                  <span><strong>{{ employee?.userInfo?.displayName }}</strong></span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-divider v-if="selectedTeams.length">
            <h5 ref="assignedTeamsSection">Assigned Teams</h5>
          </v-divider>

          <v-row>
            <v-col v-for="team in selectedTeams" :key="team?._id" cols="12">
              <v-row>
                <v-col>
                  <span>{{ team?.teamName }}</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

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
              <v-col>
                <label class="font-weight-bold">City</label>
                <v-spacer></v-spacer>
                <p>
                  {{ props.passedInJob?.details?.address?.city || 'City is not available' }}
                </p>
              </v-col>
              <v-col>
                <label class="font-weight-bold">Suburb</label>
                <v-spacer></v-spacer>
                <p>
                  {{ props.passedInJob?.details?.address?.suburb || 'Suburb is not available' }}
                </p>
              </v-col>
              <v-col>
                <label class="font-weight-bold">Street</label>
                <v-spacer></v-spacer>
                <p>
                  {{ props.passedInJob?.details?.address?.street || 'Address is not available' }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <label class="font-weight-bold">Postal Code</label>
                <v-spacer></v-spacer>
                <p>
                  {{
                    props.passedInJob?.details?.address?.postalCode ||
                    'Postal code is not available'
                  }}
                </p>
              </v-col>
              <v-col>
                <label class="font-weight-bold">Complex</label>
                <v-spacer></v-spacer>
                <p>
                  {{
                    props.passedInJob?.details?.address?.complex || 'Complex name is not available'
                  }}
                </p>
              </v-col>
              <v-col>
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
              <h5 ref="tasksSection">Task Lists</h5>
            </v-divider>
            <v-row>
              <v-col>
                <CheckOffItems :jobID="props.passedInJob?._id" />
              </v-col>
            </v-row>
            <v-divider>
              <h5 ref="imagesSection">Attach Images</h5>
            </v-divider>
            <v-col>
              <GetJobImages :id="props.passedInJob?._id" />
            </v-col>
            <v-divider>
              <h5 ref="jobStatusSection">Update Job Status</h5>
            </v-divider>
            <v-col>
              <JobStatus :jobID="props.passedInJob?._id" :status="props.passedInJob?.status" />
            </v-col>
            <v-divider>
              <h5 ref="jobTagsSection">Add Job Tags</h5>
            </v-divider>
            <v-col>
              <JobTags :tags="props.passedInJob?.tags" :jobID="props.passedInJob?._id" />
            </v-col>
            <v-divider>
              <h5 ref="jobInventorySection">Log Inventory</h5>
            </v-divider>
            <v-col>
              <LogJobInventory :jobID="props.passedInJob?._id" />
            </v-col>
            <v-divider v-show="checkPermission('generate invoices')">
              <h5 ref="jobInvoiceSection">Generate Invoice</h5>
            </v-divider>
            <v-col v-show="checkPermission('generate invoices')">
              <GenerateInvoice :jobID="props.passedInJob?._id" />
            </v-col>
            <v-divider>
              <h5 ref="jobTimeTrackerSection">Time tracking</h5>
            </v-divider>
            <v-col>
              <JobTimeTracker :jobID="props.passedInJob?._id" />
            </v-col>
            <v-divider>
              <h5 ref="historySection">View Job History</h5>
            </v-divider>
            <v-col>
              <JobHistory
                :jobHistory="props.passedInJob?.history"
                :jobID="props.passedInJob?._id"
              />
            </v-col>
          </v-col>
        </v-col>
        <v-col sm="12" md="3" class="sticky-column">
          <div class="ga-3 position-sticky top-0">
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
                Task Lists
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
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('jobStatusSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-info-circle' }}
                </v-icon>
                Update Status
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('jobTagsSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-tags' }}
                </v-icon>
                Job Tags
              </v-btn>
            </v-col>
            <v-col v-show="checkPermission('generate invoices')">
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('jobInvoiceSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-file-invoice' }}
                </v-icon>
                Generate Invoice
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('jobInventorySection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-boxes' }}
                </v-icon>
                Log Inventory
              </v-btn>
            </v-col>
            <v-col>
              <v-btn
                width="100%"
                class="d-flex justify-start"
                border="md"
                elevation="5"
                @click="scrollToSection('jobTimeTrackerSection')"
              >
                <v-icon left>
                  {{ 'fa: fa-solid fa-clock' }}
                </v-icon>
                Time Tracking
              </v-btn>
            </v-col>
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
          </div>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn color="error" @click="closeView" block
        ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Close</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, ref, type Ref, defineEmits, onMounted, computed } from 'vue'
import AddComment from './AddComments.vue'
// import JobNotes from './JobNotes.vue'
import CheckOffItems from './CheckOffItems.vue'
import GetJobImages from './GetJobImages.vue'
import JobTags from './JobTags.vue'
import JobHistory from './JobHistory.vue'
import JobStatus from './JobStatus.vue'
import LogJobInventory from './LogJobInventory.vue'
import GenerateInvoice from './GenerateInvoice.vue'
import JobTimeTracker from './JobTimeTracker.vue'
import ColorThief from 'colorthief'
import axios from 'axios'
import { API_URL } from '@/main'

const props = defineProps<{ passedInJob: any }>()
const emits = defineEmits(['close'])

const commentsSection = ref<HTMLElement | null>(null)
const notesSection = ref<HTMLElement | null>(null)
const tasksSection = ref<HTMLElement | null>(null)
const imagesSection = ref<HTMLElement | null>(null)
const tagsSection = ref<HTMLElement | null>(null)
const historySection = ref<HTMLElement | null>(null)
const jobStatusSection = ref<HTMLElement | null>(null)
const jobTagsSection = ref<HTMLElement | null>(null)
const jobInventorySection = ref<HTMLElement | null>(null)
const jobInvoiceSection = ref<HTMLElement | null>(null)
const jobTimeTrackerSection = ref<HTMLElement | null>(null)
const viewJobDialog = ref(false) // Dialog state
const checklistSection = ref(null)
const inventorySection = ref(null)
const employeePermissions = ref<string[]>([])

const dominantColor = ref('transparent')

const onImageLoad = (src: string | undefined) => {
  if (!src) return

  const img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = src
  img.onload = () => setDominantColor(img)
}

const setDominantColor = async (img: HTMLImageElement) => {
  const colorThief = new ColorThief()
  try {
    const color = colorThief.getColor(img)
    dominantColor.value = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    console.log('Colour:', dominantColor.value)
  } catch (error) {
    console.error('Error getting dominant color:', error)
    dominantColor.value = 'transparent'
  }
}

const cardStyle = computed(() => ({
  backgroundColor: dominantColor.value
}))

const rowStyle = computed(() => ({
  backgroundColor: dominantColor.value
}))

const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('access_token')}`
  }
}

function scrollToSection(
  section:
    | 'commentsSection'
    | 'notesSection'
    | 'tasksSection'
    | 'imagesSection'
    | 'tagsSection'
    | 'historySection'
    | 'jobStatusSection'
    | 'jobTagsSection'
    | 'jobInventorySection'
    | 'jobInvoiceSection'
    | 'jobTimeTrackerSection'
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
  } else if (section === 'jobStatusSection') {
    sectionRef = jobStatusSection
  } else if (section === 'jobTagsSection') {
    sectionRef = jobTagsSection
  } else if (section === 'jobInventorySection') {
    sectionRef = jobInventorySection
  } else if (section === 'jobInvoiceSection') {
    sectionRef = jobInvoiceSection
  } else if (section === 'jobTimeTrackerSection') {
    sectionRef = jobTimeTrackerSection
  }

  if (sectionRef && sectionRef.value) {
    sectionRef.value.scrollIntoView({ behavior: 'smooth' })
  }
}

const closeView = () => {
  emits('close')
}

const imageSrc = ref('')
const cardBackgroundColor = ref('transparent')

const changeImage = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = async (e) => {
      imageSrc.value = e.target?.result as string
      onImageLoad(imageSrc.value)
      try {
        console.log('Image src value:', imageSrc.value)
        console.log('Passed in job:', props.passedInJob)
        console.log('Job id:', props.passedInJob._id)
        await axios.patch(
          `${API_URL}job/update/${props.passedInJob._id}`,
          {
            coverImage: imageSrc.value
          },
          config
        )
        console.log('Image updated successfully')
      } catch (error) {
        console.error('Error updating image:', error)
      }
    }
    reader.readAsDataURL(input.files[0])
  }
}

const checkPermission = (permission: any) => {
  console.log('Employee permissions:', employeePermissions.value)
  console.log(
    ' employeePermissions.value.includes(permission): ',
    employeePermissions.value.includes(permission)
  )
  return employeePermissions.value.includes(permission)
}

const setCardBackgroundColor = (src: string) => {
  const img = new Image()
  img.crossOrigin = 'Anonymous' // This allows loading images from other domains
  img.src = src
  img.onload = () => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (context) {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
      const imageData = context.getImageData(0, 0, img.naturalWidth, img.naturalHeight).data

      let r = 0,
        g = 0,
        b = 0,
        count = 0
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
  const setImageAndBackground = () => {
    if (props.passedInJob.coverImage === '') {
      imageSrc.value =
        'https://media.istockphoto.com/id/2162545535/photo/two-male-workers-taking-a-break-at-the-construction-site.jpg?s=612x612&w=is&k=20&c=xceTrLx7-MPKjjLo302DjIw1mGaZiKAceaWIYsRCX0U='
    } else {
      imageSrc.value = props.passedInJob.coverImage
    }
    onImageLoad(imageSrc.value)
  }
  setImageAndBackground()
  //TODO: Ask Kumbi and Thando
  /*  const img = new Image()
  img.src =
    props.passedInJob.coverImage ||
    'https://media.istockphoto.com/id/2162545535/photo/two-male-workers-taking-a-break-at-the-construction-site.jpg?s=612x612&w=is&k=20&c=xceTrLx7-MPKjjLo302DjIw1mGaZiKAceaWIYsRCX0U='
  img.onload = setImageAndBackground*/

  const config1 = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('access_token')}`
    },
    params: {
      currentEmployeeId: localStorage.getItem('employeeId')
    }
  }
  axios
    .get(`${API_URL}employee/detailed/id/${localStorage.getItem('employeeId')}`, config1)
    .then((response) => {
      console.log(response.data.data.role.permissionSuite)
      employeePermissions.value.push(...response.data.data.role.permissionSuite)
    })
    .catch((error) => {
      console.error('Failed to fetch employees:', error)
    })
  getAssignedTeams()
})


const selectedTeams = ref<[]>([])
const getAssignedTeams = async () => {
  try {
    const response = await axios.get(`${API_URL}team/all/${localStorage.getItem('currentCompany')}`, config)
    if (response.status > 199 && response.status < 300) {
      const allTeams = response.data.data;
      const assignedTeamIds = props.passedInJob?.assignedEmployees?.teamIds || [];

      // Filter and map the assigned teams
      selectedTeams.value = allTeams.filter((team: any) => assignedTeamIds.includes(team._id));
      console.log('All Teams', allTeams)
      console.log('Assigned Teams', selectedTeams.value);
    } else {
      console.log('failed');
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
}
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

.sticky-column {
  position: sticky;
  top: 0; /* Adjust as needed */
  z-index: 1000; /* Ensure it stays above other content */
}
</style>
