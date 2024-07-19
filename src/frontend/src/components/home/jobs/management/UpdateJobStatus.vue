<template>
  <v-dialog
      v-model="statusDialog"
      max-width="400px"
      location="bottom"
      location-strategy="connected"
      opacity="0"
      origin="top center"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn class="mb-2" outlined @click="statusDialog = true" v-bind="activatorProps">
        <v-icon class="d-none d-lg-inline-block mr-2" left>
          {{ 'fa: fa-solid fa-tasks' }}
        </v-icon>
        Update Status
      </v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card>
        <v-card-title class="text-h5 font-weight-regular bg-blue-grey text-center">
          Update Job Status
        </v-card-title>
        <v-card-text>
          <v-radio-group
              v-model="job.status"
              column
              class="my-custom-radio-group"
              row
              background-color="#f5f5f5"
          >
            <v-radio label="Todo" value="todo" :color="colors.todo"></v-radio>
            <v-radio
                label="In progress"
                value="inProgress"
                :color="colors.inProgress"
            ></v-radio>
            <v-radio
                label="Awaiting Invoice"
                value="awaitingInvoice"
                :color="colors.awaitingInvoice"
            ></v-radio>
            <v-radio
                label="Awaiting payment"
                value="awaitingPayment"
                :color="colors.awaitingPayment"
            ></v-radio>
            <v-radio
                label="Awaiting sign off"
                value="awaitingSignOff"
                :color="colors.awaitingSignOff"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions class="d-flex flex-column">
          <v-btn @click="saveStatus" color="success"> Save </v-btn>
          <v-btn @click="isActive.value = false" color="error"> Cancel </v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      statusDialog: false,
      job: {
        status: '',
      },
      colors: {
        todo: 'primary',
        inProgress: 'secondary',
        awaitingInvoice: 'info',
        awaitingPayment: 'warning',
        awaitingSignOff: 'success',
      },
    };
  },
  methods: {
    saveStatus() {
      // Save status logic here
      this.statusDialog = false;
    },
  },
};
</script>

<style scoped>
.my-custom-radio-group {
  /* Custom styles here */
}
</style>
