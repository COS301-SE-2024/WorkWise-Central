<template>
  <v-container>
    <!-- Search and Filters Section -->
    <v-row class="d-flex justify-space-between">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="searchQuery"
          label="Search Feedback"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          color="primary"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Filter by Category"
          variant="outlined"
          color="primary"
          clearable
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="selectedSatisfaction"
          :items="satisfactionLevels"
          label="Filter by Satisfaction Level"
          variant="outlined"
          color="primary"
          clearable
        ></v-select>
      </v-col>
    </v-row>

    <v-tabs-items v-model="activeTab">
      <v-tab-item>
        <v-row>
          <v-col
            v-for="(feedback, index) in filteredFeedbacks"
            :key="index"
            cols="12"
            lg="6"
            md="6"
          >
            <v-menu
              v-model="feedbackMenu"
              :close-on-content-click="false"
              :nudge-width="200"
              v-model:return-value="selectedFeedback"
              @click:outside="feedbackMenu = false"
            >
              <template v-slot:activator="{ props }">
                <v-card v-bind="props" class="ma-3 bg-background" border="md">
                  <v-card-title class="bg-background">
                    <span>{{ feedback.employeeName }}</span>
                    <v-spacer></v-spacer>
                    <v-rating
                      v-model="feedback.satisfactionLevel"
                      active-color="blue"
                      color="orange-lighten-1"
                      readonly
                    ></v-rating>
                  </v-card-title>
                  <h6 class="bg-background pa-5 ma-0">{{ feedback.jobDone }}</h6>
                  <v-card-text>{{ feedback.feedback }}</v-card-text>
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
      searchQuery: '',
      selectedCategory: '',
      selectedSatisfaction: null,
      satisfactionLevels: [1, 2, 3, 4, 5],
      categories: ['All Feedback'] as string[],
      categoryName: 'All Feedback',
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
    filteredFeedbacks(): Feedback[] {
      return this.feedbacks.filter((feedback: Feedback) => {
        const matchesCategory = this.selectedCategory
          ? feedback.jobDone === this.selectedCategory
          : true
        const matchesSatisfaction = this.selectedSatisfaction
          ? feedback.satisfactionLevel === this.selectedSatisfaction
          : true
        const matchesSearchQuery = this.searchQuery
          ? feedback.feedback.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            feedback.employeeName.toLowerCase().includes(this.searchQuery.toLowerCase())
          : true

        return matchesCategory && matchesSatisfaction && matchesSearchQuery
      })
    }
  }
})
</script>

<style scoped>
/* Add any custom styles here */
</style>
