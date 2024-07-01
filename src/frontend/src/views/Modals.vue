<template>
  <div>
    <h2>Modals</h2>
    <br />
    <RegisterCompanyModal />
    <br />
    <br />

    <AddEmployee />
    <br /><br />
    <ClientDetails />
    <br /><br />
    <JobDetailsList />
  </div>
</template>

<script>
import AddEmployee from '../components/home/employees/management/AddEmployee.vue'
import ClientDetails from '../components/home/clients/management/AddClient.vue'
import JobDetailsList from '../components/home/jobs/management/AddJob.vue'
// import JoinCompanyModal from '../components/JoinCompanyModal.vue'
import RegisterCompanyModal from '../components/signup/RegisterCompanyModal.vue'
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
