<template>
 <v-dialog persistent v-model="dialog" max-width="500px">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        class="text-none font-weight-regular hello"
        color="error"
        v-bind="activatorProps"
        variant="elevated"
        @click="dialog = true"
        block
      >
        <v-icon icon="fa:fa-solid fa-truck-front" start color="success" size="small"></v-icon>
        Log Stock Movement
      </v-btn>
    </template>

    <v-card class="bg-cardColor">
      <v-card-title>
        <span class="text-h6">Log Stock Movement</span>
      </v-card-title>

      <v-card-text>
        <v-form v-model="valid">
          <!-- Item Input -->
          <v-text-field
            v-model="stockMovement.item"
            label="Item"
            :rules="[(v) => !!v || 'Item is required']"
            required
          ></v-text-field>

          <!-- Reason Input -->
          <v-text-field
            v-model="stockMovement.reason"
            label="Reason"
            :rules="[(v) => !!v || 'Reason is required']"
            required
          ></v-text-field>

          <!-- Quantity Input -->
          <v-text-field
            v-model="stockMovement.quantity"
            label="Quantity"
            type="number"
            :rules="[(v) => v > 0 || 'Quantity must be greater than zero']"
            required
          ></v-text-field>

          <!-- Employee Input -->
          <v-text-field
            v-model="stockMovement.employee"
            label="Employee"
            :rules="[(v) => !!v || 'Employee is required']"
            required
          ></v-text-field>

          <!-- Date Input -->
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="stockMovement.date"
                label="Date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="stockMovement.date" no-title scrollable>
              <v-container>
                <v-row
                  ><v-col cols="12" lg="6">
                    <v-btn text color="error" @click="menu = false" block
                      ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Cancel</v-btn
                    ></v-col
                  >
                  <v-col cols="12" lg="6">
                    <v-btn text color="success" @click="$refs.menu.save(stockMovement.date)" block
                      ><v-icon icon="fa: fa-solid fa-floppy-disk" color="success"></v-icon>OK</v-btn
                    ></v-col
                  ></v-row
                ></v-container
              >
            </v-date-picker>
          </v-menu>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-container
          ><v-row
            ><v-col cols="12" lg="6">
              <v-btn text color="error" @click="dialog = false" block
                ><v-icon icon="fa:fa-solid fa-cancel" color="error" size="small" start></v-icon
                >Cancel</v-btn
              ></v-col
            ><v-col cols="12" lg="6"
              ><v-btn text color="success" @click="logStockMovement" :disabled="!valid" block
                ><v-icon icon="fa:fa-solid fa-plus" color="success" size="small" start></v-icon>Log
                Movement</v-btn
              ></v-col
            ></v-row
          ></v-container
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      valid: false,
      menu: false,
      stockMovement: {
        item: '',
        reason: '',
        quantity: null,
        employee: '',
        date: ''
      }
    }
  },
  methods: {
    logStockMovement() {
      // Perform the action to log the stock movement
      console.log('Stock Movement:', this.stockMovement)

      // Reset form and close dialog
      this.dialog = false
      this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
