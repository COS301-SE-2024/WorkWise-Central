<template>
 <v-dialog persistent v-model="dialog" max-width="500" height="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        rounded="md"
        class="text-none font-weight-regular hello"
        variant="elevated"
        :color="buttonColor ? buttonColor : 'secondary'"
        block
        v-bind="activatorProps"
        >Invite</v-btn
      >
    </template>
    <v-sheet elevation="14" rounded="md" width="500">
      <v-form class="bg-background" v-model="valid">
        <v-col>
          <v-col>
            <h4 class="text-center" style="font-size: 25px; font-weight: lighter">Invite</h4></v-col
          >
          <v-spacer></v-spacer>
          <v-col>
            <v-col>
              <small class="text-caption">Search for the user by email</small>
              <v-text-field
                density="compact"
                label="Email"
                variant="solo"
                color="primary"
                rounded="md"
                v-model="req_obj.emailToInvite"
                @update:modelValue="print"
              >
              </v-text-field>
            </v-col>
            <v-col></v-col>
          </v-col>
        </v-col>
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <v-btn color="error" block @click="close" variant="elevated">Close</v-btn>
            </v-col>
            <v-col cols="12" lg="6">
              <v-btn
                color="secondary"
                block
                @click="inviteUser"
                :disabled="!valid"
                variant="elevated"
                >Invite</v-btn
              >
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-sheet>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import { API_URL } from '@/main'
export default defineComponent({
  data() {
    return {
      dialog: false,
      valid: false,
      buttonColor: 'secondary',
      req_obj: {
        emailToInvite: '',
        employeeId: localStorage.getItem('employeeId'),
        superiorId: localStorage.getItem('employeeId'),
        roleId: localStorage.getItem('roleId')
      }
    }
  },
  methods: {
    print() {},
    handlesubmission() {
      console.log('Invited')
    },
    close() {
      this.dialog = false
    },
    async inviteUser() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      try {
        const body: any = {
          email: this.req_obj.emailToInvite,
          employeeId: this.req_obj.employeeId,
          emailToInvite: this.req_obj.emailToInvite
        }
        // if (this.req_obj.roleId != null) {
        //   body.roleId = this.req_obj.roleId
        // }
        if (this.req_obj.superiorId != null) {
          body.superiorId = this.req_obj.superiorId
        }
        const response = await axios.post(`${API_URL}admin/invite/create`, body, config)
        console.log(response)
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
