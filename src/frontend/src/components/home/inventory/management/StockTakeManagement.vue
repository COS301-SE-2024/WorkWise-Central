<template>
  <v-data-iterator :items="inventory" item-value="name">
    <template v-slot:default="{ items, isExpanded, toggleExpand }">
      <v-row>
        <v-col v-for="item in items" :key="item._id" cols="12" md="6" sm="12">
          <v-card>
            <v-card-title class="d-flex align-center">
              <v-icon :color="item.raw.color" :icon="item.raw.icon" size="18" start></v-icon>

              <h4>{{ item.name }}</h4>
            </v-card-title>

            <v-card-text>
              {{ item.description }}
            </v-card-text>

            <div class="px-4">
              <v-switch
                :label="`${isExpanded(item) ? 'Hide' : 'Show'} details`"
                :model-value="isExpanded(item)"
                density="compact"
                inset
                @click="() => toggleExpand(item)"
              ></v-switch>
            </div>

            <v-divider></v-divider>

            <v-expand-transition>
              <div v-if="isExpanded(item)">
                <v-list :lines="false" density="compact">
                  <v-list-item
                    :title="`🔥 CurrentStockLevel: ${item.currentStockLevel}`"
                    active
                  ></v-list-item>
                  <v-list-item :title="`🍔 Reorder Level: ${item.reorderLevel}`"></v-list-item>
                  <v-list-item :title="`🍞 Cost Price: ${item.costPrice}`"></v-list-item>
                </v-list>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>
<script lang="ts">
import axios from 'axios'
interface InventoryItem {
  _id: number
  name: string
  currentStockLevel: number
  description: string
  reorderLevel: number
  costPrice: number
  companyId: number
}
export default {
  data: () => ({
    localUrl: 'http://localhost:3000/',
    remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
    desserts: [
      {
        name: 'Frozen Yogurt',
        description:
          'A tangy and creamy dessert made from yogurt and sometimes fruit, Frozen Yogurt is a lighter alternative to ice cream. Perfect for those who crave a sweet treat but want to keep it on the healthier side.',
        icon: 'mdi-ice-cream',
        color: '#6EC1E4',
        calories: 159,
        fat: 6,
        carbs: 24,
        protein: 4,
        sodium: 87,
        calcium: '14%',
        iron: '1%'
      },
      {
        name: 'Ice cream sandwich',
        description:
          "A classic treat featuring a layer of creamy ice cream sandwiched between two cookies or cake layers. Ideal for those hot summer days when you can't decide between a cookie and ice cream.",
        icon: 'mdi-cookie',
        color: '#F4A261',
        calories: 237,
        fat: 9,
        carbs: 37,
        protein: 4.3,
        sodium: 129,
        calcium: '8%',
        iron: '1%'
      },
      {
        name: 'Eclair',
        description:
          'A small, individual cake topped with frosting and often adorned with sprinkles or other decorations. Great for parties or as a quick indulgence when you need a sugar fix.',
        icon: 'mdi-cake-variant',
        color: '#6D4C41',
        calories: 262,
        fat: 16,
        carbs: 23,
        protein: 6,
        sodium: 337,
        calcium: '6%',
        iron: '7%'
      },
      {
        name: 'Cupcake',
        description:
          'A small, individual cake topped with frosting and often adorned with sprinkles or other decorations. Great for parties or as a quick indulgence when you need a sugar fix.',
        color: '#FFADAD',
        icon: 'mdi-cupcake',
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        sodium: 413,
        calcium: '3%',
        iron: '8%'
      }
    ],
    inventory: [] as InventoryItem[]
  }),
  methods: {
    toggleExpand(item: any) {
      item.expanded = !item.expanded
    },
    isExpanded(item: any) {
      return !!item.expanded
    },
    async getInventoryItems() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      try {
        const apiURL = await this.getRequestUrl()
        const response = await axios.get(
          `${apiURL}inventory/all/${localStorage.getItem('currentCompany')}`,
          config
        )
        console.log(response)
        this.inventory = response.data.data
        console.log('Inventory items:', this.inventory)
      } catch (error) {
        console.error('Error fetching inventory items:', error)
      }
    },
    async isLocalAvailable(localUrl: string) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  },
  mounted() {
    this.getInventoryItems()
  }
}
</script>
