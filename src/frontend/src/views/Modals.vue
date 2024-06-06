<template>
  <div>
    <h2>Modals</h2>
    <br>
    <RegisterCompanyModal/>
    <br>    <br>

    <AddEmployee />
    <br><br>
    <ClientDetails />
    <br><br>
    <JobDetailsList />
  </div>
</template>

<script>
import AddEmployee from '../components/AddEmployee.vue'
import ClientDetails from '../components/AddClient.vue'
import JobDetailsList from '../components/JobDetailsList.vue'
// import JoinCompanyModal from '../components/JoinCompanyModal.vue'
import RegisterCompanyModal from '../components/RegisterCompanyModal.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'ModaLs',
  components: {
    RegisterCompanyModal,
    AddEmployee,
    ClientDetails,
    JobDetailsList
  }
})
</script>

<style></style>
