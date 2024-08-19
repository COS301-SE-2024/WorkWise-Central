<template>
  <v-card elevation="14" rounded="md">
    <!--      <v-img :src="props.passedInJob.imageUrl" aspect-ratio="2.75"></v-img>-->
    <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
      <h2 class="flex-grow-1">{{ props.passedInJob?.details?.heading }}</h2>
    </v-card-title>
    <v-card-text class="text-center">
      <v-row>
        <v-col xs="12" sm="12" md="9">
          <EditDetails :jobDetails="props?.passedInJob?.details" :jobID="props.passedInJob?._id" />
        </v-col>
        <v-col xs="12" sm="12" md="3">
          <v-col>
            <ChangeClient :jobID="props.passedInJob?._id" />
          </v-col>
          <v-col>
            <SelectMembers :jobID="props.passedInJob?._id"/>
          </v-col>
<!--          <v-col>-->
<!--            <UpdateJobStatus :passedInJob="props.passedInJob" />-->
<!--          </v-col>-->
          <v-col>
            <!--              <ChangeDueDate :jobDetails="props.passedInJob?.details" :jobID="props.passedInJob?._id"  />-->
          </v-col>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions class="d-flex flex-column">
      <v-col class="d-flex flex-column">
        <v-btn class="mb-4" @click="cancelJob" color="error"
          ><v-icon icon="fa: fa-solid fa-cancel"></v-icon>Close</v-btn
        >
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
import { defineProps } from 'vue'
import EditDetails from './EditDetailsJobCard.vue'
import ChangeClient from './ChangeClientDialog.vue'
import SelectMembers from './SelectMembers.vue'
import UpdateJobStatus from './UpdateJobStatus.vue'
// import ChangeDueDate from './UpdateDateDialog.vue'

const emits = defineEmits(['close'])
const props = defineProps<{ passedInJob: any }>()
const cancelJob = () => {
  emits('close')
}
</script>
