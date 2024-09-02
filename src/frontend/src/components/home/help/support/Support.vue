<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-col :cols="12">
          <h4 class="text-center" style="font-size: 25px; font-weight: lighter">SUPPORT</h4></v-col
        >
      </v-col>
      <v-col :cols="12">
        <v-tabs v-model="tab" align-tabs="center" color="primary" bg-color="secondary">
          <v-tab :value="1">FAQ</v-tab>
          <v-tab :value="2">TUTORIAL</v-tab>
        </v-tabs>
        <v-tabs-window v-model="tab" height="auto">
          <v-tabs-window-item :value="1">
            <v-col :cols="12">
              <v-sheet rounded class="w-lg-screen" elevation="0">
                <v-text-field
                  v-model="searchQuery"
                  placeholder="Search..."
                  prepend-inner-icon="mdi-magnify"
                  clearable
                />
                <v-expansion-panels class="my-4" variant="accordion">
                  <v-expansion-panel
                    v-for="i in filteredItems"
                    :key="i.id"
                    :theme="isDarkMode ? 'dark' : 'light'"
                    style="font-family: Nunito, sans-serif"
                  >
                    <v-expansion-panel-title color="faqQuestion"
                      ><b>{{ i.question }}</b></v-expansion-panel-title
                    >
                    <v-expansion-panel-text>{{
                      i.answer
                    }}</v-expansion-panel-text></v-expansion-panel
                  >
                </v-expansion-panels>
              </v-sheet>
            </v-col>
          </v-tabs-window-item>
          <v-tabs-window-item :value="2">
            <Tut />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Tut from '@/components/home/help/tutorial/Tutorial.vue'
export default defineComponent({
  name: 'SupportComponent',
  components: { Tut },
  data() {
    return {
      isDarkMode: sessionStorage['theme'] === 'true',
      tab: null,
      searchQuery: '',
      faqs: [
        {
          id: 1,
          question: 'What is the purpose of this app?',
          answer:
            'Our app is designed to help service delivery companies and other specialized teams, such as those in network setup and IT technician spaces with git, manage their jobs efficiently. It offers features similar to Monday.com and Trello, enabling teams to track progress, assign jobs, collaborate, and streamline workflows.'
        },
        {
          id: 2,
          question: 'How do I create a new project in the app?',
          answer:
            "To create a new project, click on the 'New Project' button on the dashboard. Enter the project details, set deadlines, assign team members, and add any relevant notes or files. Once done, click 'Create' to get started."
        },
        {
          id: 3,
          question: 'Can I integrate this app with other tools we use?',
          answer:
            "Yes, our app supports integration with various tools commonly used in project support, such as Slack, Google Drive, and Microsoft Teams. You can find these integration options in the 'Settings' menu under 'Integrations.'"
        },
        {
          id: 4,
          question: 'How do I assign jobs to team members?',
          answer:
            "To assign jobs, navigate to your project, click on the 'Tasks' tab, and select 'Add Task.' Enter the job details, set the priority, and use the dropdown menu to assign the job to a specific team member. Click 'Save' to assign the job."
        },
        {
          id: 5,
          question: 'Is there a way to track the time spent on each job?',
          answer:
            "Yes, our app includes a time-tracking feature. When you start a job, click the 'Start Timer' button. Once you finish, click 'Stop Timer.' The time spent will be logged automatically, and you can view time reports under the 'Reports' section."
        },
        {
          id: 6,
          question: 'How do I add comments or updates to a job?',
          answer:
            "To add comments or updates, open the specific job you want to update. There is a 'Comments' section where you can type your message. Click 'Post' to add your comment. Team members assigned to the job will be notified of your update."
        },
        {
          id: 7,
          question: 'Can I customize the project workflow?',
          answer:
            "Absolutely! You can customize workflows to fit your team's specific needs. Go to the 'Workflow' tab within your project, where you can add, remove, or rename stages. Drag and drop jobs between stages to reflect their progress."
        },
        {
          id: 8,
          question: 'How do I generate a project report?',
          answer:
            "To generate a project report, navigate to the 'Reports' section from the main menu. Select the project and the type of report you need (e.g., job completion, time tracking, resource allocation). Click 'Generate Report' to download or view it online."
        },
        {
          id: 9,
          question: 'What should I do if I encounter a technical issue?',
          answer:
            "If you experience any technical issues, please contact our support team through the 'help' section in the app. You can submit a ticket detailing your problem, and our support staff will assist you as soon as possible."
        },
        {
          id: 10,
          question: 'How secure is our data in this app?',
          answer:
            'Data security is our top priority. Our app uses advanced encryption methods to protect your data. Regular security audits are conducted, and we comply with industry standards to ensure your information is safe and secure.'
        },
        {
          id: 11,
          question: 'Can I set up recurring jobs?',
          answer:
            "Yes, you can set up recurring jobs by selecting the 'Recurring' option when creating or editing a job. Choose the frequency (daily, weekly, monthly) and the app will automatically generate the job at the specified intervals."
        },
        {
          id: 12,
          question: 'How can I invite new team members to the app?',
          answer:
            "To invite new team members, go to the 'Team' section and click on 'Invite Members.' Enter the email addresses of the people you want to invite, assign them roles, and click 'Send Invitation.' They will receive an email with instructions to join your team."
        },
        {
          id: 13,
          question: 'Is there a mobile version of the app?',
          answer:
            'Yes, our app is available on both iOS and Android devices. You can download it from the App Store or Google Play Store to manage your projects on the go.'
        },
        {
          id: 14,
          question: 'How do I update my account information?',
          answer:
            "To update your account information, click on your profile icon and select 'Account Settings.' Here, you can change your personal details, update your password, and manage notification preferences."
        },
        {
          id: 15,
          question: 'Can I view all jobs assigned to me across different projects?',
          answer:
            "Yes, you can view all jobs assigned to you by clicking on the 'My Tasks' section from the dashboard. This view consolidates jobs from all projects, making it easier for you to manage your workload."
        }
      ]
    }
  },
  computed: {
    filteredItems() {
      if (this.searchQuery) {
        return this.faqs.filter((item) =>
          item.question.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      return this.faqs
    }
  }
})
</script>

<style scoped></style>
