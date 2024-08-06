<template>
  <v-dialog v-model="managerJobCard" :max-height="700" :max-width="1000" scrollable>
    <template v-slot:activator="{ props: activatorProps }">
      <v-defaults-provider :defaults="{ VIcon: { color: 'buttonText' } }">
        <v-btn
          text="Edit"
          prepend-icon="fa:fa-solid fa-pencil"
          color="warning"
          v-bind="activatorProps"
        ></v-btn>
      </v-defaults-provider>
    </template>
    <v-card elevation="14" rounded="md" :min-height="1000" :max-width="900">
      <v-img
        src="https://media.istockphoto.com/id/2162545535/photo/two-male-workers-taking-a-break-at-the-construction-site.jpg?s=612x612&w=is&k=20&c=xceTrLx7-MPKjjLo302DjIw1mGaZiKAceaWIYsRCX0U="
        aspect-ratio="5.75"
      ></v-img>
      <!--      <v-img :src="props.passedInJob.imageUrl" aspect-ratio="2.75"></v-img>-->
      <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
        <h2 class="flex-grow-1">{{ props.passedInJob?.details?.heading }}</h2>
      </v-card-title>
      <v-card-text class="text-center">
        <v-row>
          <v-col xs="12" sm="12" md="8">
            <EditDetails :jobDetails="props?.passedInJob?.details" :jobID="props.passedInJob?._id" />
          </v-col>
          <v-col xs="12" sm="12" md="4">
            <v-col>
              <ChangeClient />
            </v-col>
            <v-col>
              <SelectMembers />
            </v-col>
            <v-col>
              <UpdateJobStatus :passedInJob="props.passedInJob" />
            </v-col>
            <v-col>
<!--              <ChangeDueDate :jobDetails="props.passedInJob?.details" :jobID="props.passedInJob?._id"  />-->
            </v-col>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col class="d-flex flex-column">
          <v-btn class="mb-4" @click="cancelJob" color="error">Cancel</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineProps } from 'vue'
import EditDetails from './EditDetailsJobCard.vue'
import ChangeClient from './ChangeClientDialog.vue'
import SelectMembers from './SelectMembers.vue'
import UpdateJobStatus from './UpdateJobStatus.vue'
import ChangeDueDate from './UpdateDateDialog.vue'

const managerJobCard = ref(false) // Dialog state

const props = defineProps({
  passedInJob: Object
})

const cancelJob = () => {
  managerJobCard.value = false;
}
</script>
