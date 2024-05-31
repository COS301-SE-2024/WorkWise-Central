<template>
  <v-dialog max-width="500" :height="300">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="Show Job Details"
        variant="flat"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Job Details">
        <v-card-text>Name of Client {{ job.name }} </v-card-text>
        <divider></divider>
        <v-card-text>Location: {{ job.location }} </v-card-text>
        <divider></divider>
        <v-card-text>Phone Number: {{ job.phone }} </v-card-text>
        <divider></divider>
        <v-card-text>Email: {{ job.email }} </v-card-text>
        <v-card-text>Date of job {{ job.date_of_job }} </v-card-text>
        <v-card-actions>
          <v-btn text="CANCEL" @click="isActive.value = false"></v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn text="ASSIGN" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
  <br />
  <br />

  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        color="surface-variant"
        text="Show Job Details"
        variant="flat"
      ></v-btn>
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Job Details">
        <v-card-text>Name of Client {{ job.name }} </v-card-text>
        <divider></divider>
        <v-card-text>Location: {{ job.location }} </v-card-text>
        <divider></divider>
        <v-card-text>Phone Number: {{ job.phone }} </v-card-text>
        <divider></divider>
        <v-card-text>Email: {{ job.email }} </v-card-text>
        <v-card-text>Date of job {{ job.date_of_job }} </v-card-text>
        <v-card-actions>
          <v-btn text="CANCEL" @click="isActive.value = false"></v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn text="ASSIGN" @click="isActive.value = false"></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  name: 'JobDetailsModal',
  data() {
    return {
      job: {
        name: 'John ',
        email: 'exmaple@gmail.com',
        phone: '1234567890',
        location: '1234 Main St, City, State, 12345',
        jobType: 'Plumbing',
        date_of_job: '2021-09-01',
        click_create_client: false,
        isdarkmode: true,
        light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
        dark_theme_text_color: 'color: #DCDBDB',
        modal_dark_theme_color: '#2b2b2b',
        modal_light_theme_color: '#FFFFFF'
      }
    }
  },

  methods: {
    takes_login() {
      let json = this.job
    },

    validate() {}
  }
}
</script>
