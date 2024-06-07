import { createVuetify } from 'vuetify'
import { mount } from 'cypress/vue'
import JobDetailsModal from "./JobDetailsModal.vue"

it("renders job detials", () => {
    const vuetify = createVuetify();
    mount(JobDetailsModal, {
        global: {
        plugins: [vuetify]
        }
    })
});

it("click create Job Button", () => {
    const vuetify = createVuetify();
    mount(JobDetailsModal, {
        global: {
        plugins: [vuetify]
        }
    })
});