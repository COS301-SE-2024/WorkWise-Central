<template>
  <v-container>
    <v-tabs v-model="activeTab" background-color="primary" bg-color="secondary" dark>
      <v-tab v-for="category in categories" :key="category" @click="selectCategory(category)">
        {{ category }}
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-row>
          <v-col v-for="(feedback, index) in filterCategory" :key="index" cols="12" lg="6" md="6">
            <v-menu
              v-model="feedbackMenu"
              :close-on-content-click="false"
              :nudge-width="200"
              v-model:return-value="selectedFeedback"
              @click:outside="feedbackMenu = false"
            >
              <template v-slot:activator="{ props }">
                <v-card v-bind="props" class="ma-3">
                  <v-card-title>
                    <span>{{ feedback.employeeName }}</span>
                    <v-spacer></v-spacer>
                    <v-rating
                      v-model="feedback.satisfactionLevel"
                      active-color="blue"
                      color="orange-lighten-1"
                      readonly
                    ></v-rating>
                  </v-card-title>
                  <h6 class="bg-cardColor pa-5 ma-0">{{ feedback.jobDone }}</h6>
                  <v-card-text>{{ feedback.feedback }}</v-card-text>
                  <v-card-actions>
                    <v-btn v-bind="props">Details</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-menu>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface Feedback {
  clientName: string
  employeeName: string
  jobDone: string
  satisfactionLevel: number
  feedback: string
}

export default defineComponent({
  data() {
    return {
      activeTab: 0,
      feedbackMenu: false,
      selectedFeedback: null as Feedback | null,
      categories: ['All Feedback'] as string[],
      categoryName: 'All Feedback', // This is the default category
      feedbacks: [
        {
          clientName: 'Alice Brown',
          employeeName: 'John Doe',
          jobDone: 'Plumbing',
          satisfactionLevel: 4,
          feedback: 'Great job, very satisfied with the service.'
        },
        {
          clientName: 'Bob Smith',
          employeeName: 'Jane Smith',
          jobDone: 'Electrical',
          satisfactionLevel: 5,
          feedback: 'Excellent work, highly recommend!'
        },
        {
          clientName: 'Carol White',
          employeeName: 'Michael Johnson',
          jobDone: 'Carpentry',
          satisfactionLevel: 3,
          feedback: 'Good job, but the work took longer than expected.'
        },
        {
          clientName: 'David Black',
          employeeName: 'Emily Davis',
          jobDone: 'Painting',
          satisfactionLevel: 5,
          feedback: 'Fantastic service, very pleased with the results.'
        },
        {
          clientName: 'Eva Green',
          employeeName: 'Chris Lee',
          jobDone: 'Landscaping',
          satisfactionLevel: 4,
          feedback: 'Well done, the garden looks great.'
        },
        {
          clientName: 'Frank Harris',
          employeeName: 'Sara Wilson',
          jobDone: 'Roofing',
          satisfactionLevel: 2,
          feedback: 'Not satisfied with the work, it was poorly done.'
        },
        {
          clientName: 'Grace Hall',
          employeeName: 'David Kim',
          jobDone: 'Flooring',
          satisfactionLevel: 5,
          feedback: 'Amazing job, the floors look beautiful!'
        },
        {
          clientName: 'Henry Clark',
          employeeName: 'Laura Adams',
          jobDone: 'Tiling',
          satisfactionLevel: 3,
          feedback: 'Average work, some tiles were not aligned properly.'
        },
        {
          clientName: 'Isabel Lewis',
          employeeName: 'Mark Allen',
          jobDone: 'Plastering',
          satisfactionLevel: 4,
          feedback: 'Good work, the walls are smooth and even.'
        },
        {
          clientName: 'Jackie Turner',
          employeeName: 'Olivia Scott',
          jobDone: 'HVAC Installation',
          satisfactionLevel: 5,
          feedback: 'Excellent service, the installation was perfect!'
        },
        {
          clientName: 'Kevin Wright',
          employeeName: 'Paul King',
          jobDone: 'Window Installation',
          satisfactionLevel: 3,
          feedback: 'The windows are fine, but there were delays in the project.'
        }
      ] as Feedback[]
    }
  },
  methods: {
    getRowProps(row: Feedback) {
      return {
        class: 'bg-cardColor'
      }
    },
    getFeedbackDetails(feedback: Feedback) {
      console.log(feedback)
    },
    selectCategory(category: string) {
      this.categoryName = category // Update the categoryName
      console.log('Selected Category:', category)
    },
    populateCategories() {
      this.feedbacks.forEach((feedback: Feedback) => {
        if (!this.categories.includes(feedback.jobDone)) {
          this.categories.push(feedback.jobDone)
        }
      })
    }
  },
  mounted() {
    this.populateCategories()
  },
  computed: {
    filterCategory(): Feedback[] {
      console.log('Filtering by:', this.categoryName)
      if (this.categoryName === 'All Feedback') {
        return this.feedbacks
      } else {
        return this.feedbacks.filter((feedback: Feedback) => feedback.jobDone === this.categoryName)
      }
    }
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
