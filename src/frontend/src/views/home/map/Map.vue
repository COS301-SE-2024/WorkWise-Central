<template>
  <Splitter style="height: 100%">
    <SplitterPanel class="flex items-center justify-center" :size="25" :minSize="10">
      <div>
        <!--        <Image src="https://picsum.photos/200/300" alt="Image" width="100%" height="20%" />-->
        <div class="fleet-overview text-center">
          <h2>Fleet Overview</h2>

          <div class="status-cards">
            <Card class="status-card active">
              <template #title>Active Vehicles</template>
              <template #content>
                <h1>{{ activeVehicles }}</h1>
              </template>
            </Card>
            <Card class="status-card inactive">
              <template #title>Inactive Vehicles</template>
              <template #content>
                <h1>{{ inactiveVehicles }}</h1>
              </template>
            </Card>
          </div>

          <Panel header="Current Drivers" class="text-center">
            <DataView :value="currentDrivers">
              <template #list="slotProps">
                <div class="driver-item">
                  {{ slotProps.data.profile.displayName }}
                </div>
              </template>
            </DataView>
          </Panel>

          <Panel header="Fleet Statistics">
            <div class="fleet-stats">
              <div class="p-grid">
                <div class="p-col-4">
                  <strong>Total Distance Today:</strong> {{ totalDistanceToday }} km
                </div>
                <div class="p-col-4">
                  <strong>Average Fuel Consumption:</strong> {{ averageFuelConsumption }} L/100km
                </div>
                <div class="p-col-4">
                  <strong>Vehicles Due for Service:</strong> {{ vehiclesDueForService }}
                </div>
              </div>
            </div>
          </Panel>

          <Panel header="Alerts">
            <DataView :value="recentAlerts">
              <template #list="slotProps">
                <Message :severity="slotProps.data.severity" :text="slotProps.data.message" />
              </template>
            </DataView>
          </Panel>
        </div>
      </div>
      <div class="card">
        <div class="text-center pt-10">
          <Button
              label="Show All Vehicle Data"
              icon="fa: fa-solid fa-external-link"
              @click="dialogVisible = true"
              class="p-button-success"
          />
        </div>
        <Dialog
          v-model:visible="dialogVisible"
          header="Flex Scroll"
          :style="{ width: '75vw' }"
          maximizable
          modal
          :contentStyle="{ height: '300px' }"
        >
          <DataTable
            v-model:editingRows="editingRows"
            :value="vehicles"
            editMode="row"
            dataKey="_id"
            @row-edit-save="onRowEditSave"
            :pt="{
              table: { style: 'min-width: 50rem' },
              column: {
                bodycell: ({ state }) => ({
                  style: state['d_editing'] && 'padding-top: 0.75rem; padding-bottom: 0.75rem'
                })
              }
            }"
          >
            <Column field="name.make" header="Make" style="width: 15%">
              <template #editor="{ data /*, field*/ }">
                <InputText v-model="data.name.make" fluid />
              </template>
            </Column>
            <Column field="name.model" header="Model" style="width: 15%">
              <template #editor="{ data /*, field*/ }">
                <InputText v-model="data.name.model" fluid />
              </template>
            </Column>
            <Column field="modelYear" header="Year" style="width: 10%">
              <template #editor="{ data, field }">
                <InputNumber v-model="data[field]" fluid />
              </template>
            </Column>
            <Column header="Image">
              <!--TODO: Add Image Column Properly-->
              <template #body="slotProps">
                <img
                  :src="`https://primefaces.org/cdn/primevue/images/product/${slotProps.data.image}`"
                  :alt="slotProps.data.image"
                  class="w-24 rounded"
                />
              </template>
            </Column>
            <Column field="licensePlate" header="License Plate" style="width: 15%">
              <template #editor="{ data, field }">
                <InputText v-model="data[field]" fluid />
              </template>
            </Column>
            <Column field="availability.status" header="Status" style="width: 15%">
              <template #editor="{ data }">
                <Select
                  v-model="data.availability.status"
                  :options="availabilityStatuses"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select Status"
                  fluid
                >
                  <template #option="slotProps">
                    <Tag
                      :value="slotProps.option.value"
                      :severity="getStatusSeverity(slotProps.option.value)"
                    />
                  </template>
                </Select>
              </template>
              <template #body="slotProps">
                <Tag
                  :value="slotProps.data.availability.status"
                  :severity="getStatusSeverity(slotProps.data.availability.status)"
                />
              </template>
            </Column>
            <Column field="mileage" header="Mileage" style="width: 15%">
              <template #editor="{ data, field }">
                <InputNumber v-model="data[field]" fluid />
              </template>
            </Column>
            <Column field="fuelType" header="Fuel Type" style="width: 15%">
              <template #editor="{ data, field }">
                <Select
                  v-model="data[field]"
                  :options="fuelTypes"
                  optionLabel="label"
                  optionValue="value"
                  placeholder="Select Fuel Type"
                  fluid
                />
              </template>
            </Column>
            <Column
              :rowEditor="true"
              style="width: 10%; min-width: 8rem"
              bodyStyle="text-align:center"
            ></Column>
          </DataTable>
          <template #footer>
            <Button label="Close" class="p-button-danger" icon="fa: fa-solid fa-check" @click="dialogVisible = false" />
          </template>
        </Dialog>
      </div>
    </SplitterPanel>
    <SplitterPanel class="flex items-center justify-center" :size="75">
      <GoogleMap :api-key="apiKey" style="width: 100%; height: 100%" :center="mapCenter" :zoom="12">
        <!-- Company Marker -->
        <Marker v-if="company" :options="{ position: companyLocation }">
          <InfoWindow>
            <div id="companyContent">
              <img class="centered" v-if="company.logo" :src="company.logo" alt="Company Logo" />
              <h6 style="color: black">{{ company.name }}</h6>
              <div style="color: black">
                <p><strong>Address:</strong> {{ formatAddress(company.address) }}</p>
              </div>
            </div>
          </InfoWindow>
        </Marker>

        <!-- Current Location Marker -->
        <Marker :options="{ position: currentLocation }">
          <InfoWindow>
            <div id="content">
              <h1 id="firstHeading" style="color: black">You Are Here</h1>
            </div>
          </InfoWindow>
        </Marker>

        <!-- Vehicle Markers -->
        <Marker
          v-for="vehicle in vehicles"
          :key="vehicle.id"
          :options="{ position: vehicle.location, label: vehicle.driver }"
        >
          <InfoWindow>
            <div style="color: black">
              <h4>{{ vehicle.name.make }} {{ vehicle.name.model }}</h4>
              <p><strong>Driver:</strong> {{ vehicle.employeeId }}</p>
              <p><strong>Status:</strong> {{ vehicle.availability.status }}</p>
              <p>Mileage: {{ vehicle.mileage }} km</p>
            </div>
          </InfoWindow>
        </Marker>

        <Polyline v-if="routePolyline" :options="routePolyline" />
      </GoogleMap>
    </SplitterPanel>
  </Splitter>
</template>

<script>
import { GoogleMap, InfoWindow, Marker, Polyline } from 'vue3-google-map'
import axios from 'axios'
import { API_URL, GOOGLE_MAPS_API_KEY } from '@/main'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import Dialog from 'primevue/dialog'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Card from 'primevue/card';
import Panel from 'primevue/panel';
import DataView from 'primevue/dataview';
import Message from 'primevue/message'
// import Image from 'primevue/image'
import { VehicleAvailabilityEnum, FuelType } from './models/vehicles'

export default {
  name: 'SystemMap',
  components: {
    GoogleMap,
    // eslint-disable-next-line vue/no-reserved-component-names
    Marker,
    InfoWindow,
    // eslint-disable-next-line vue/no-reserved-component-names
    Polyline,
    Splitter,
    SplitterPanel,
    // eslint-disable-next-line vue/no-reserved-component-names
    Dialog,
    DataTable,
    Column,
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
    //Image
    Card,
    Panel,
    DataView,
    Message
  },
  data() {
    return {
      apiKey: GOOGLE_MAPS_API_KEY,
      apiUrl: API_URL,
      company: null,
      companyLocation: null,
      currentLocation: null,
      mapCenter: { lat: 0, lng: 0 },
      routePolyline: null,
      dialogVisible: false,
      vehicles: [],
      editingRows: [],
      availabilityStatuses: Object.entries(VehicleAvailabilityEnum).map(([key, value]) => ({
        label: value,
        value: value
      })),
      fuelTypes: Object.entries(FuelType).map(([key, value]) => ({ label: value, value: value })),
      currentDrivers: [],
      recentAlerts: [],
      totalDistanceToday: 0,
      averageFuelConsumption: 0,
      vehiclesDueForService: 0
    }
  },
  created() {
    this.getCurrentLocation()
    this.getCompanyData()
    this.getVehiclesData().then(() => this.loadFleetData())
    //this.loadFleetData()
  },
  mounted() {
    //VehicleService.getVehicles().then((data) => (this.vehicles = data))
  },
  computed: {
    activeVehicles() {
      return this.vehicles.filter((v) => v.availability.status === VehicleAvailabilityEnum.IN_USE)
        .length
    },
    inactiveVehicles() {
      return this.vehicles.length - this.activeVehicles
    }
  },
  methods: {
    async getCurrentLocation() {
      try {
        const coordinates = await this.$getLocation()
        this.currentLocation = { lat: coordinates.lat, lng: coordinates.lng }
        this.mapCenter = this.currentLocation
      } catch (error) {
        console.error('Error getting current location:', error)
      }
    },
    async getCompanyData() {
      try {
        const response = await axios.get(
          `${this.apiUrl}company/id/${localStorage['currentCompany']}`,
          this.getAuthConfig()
        )
        this.company = response.data.data
        this.companyLocation = await this.getGeocode(this.company.address)
        //console.log('Company', this.company)
      } catch (error) {
        console.error('Error fetching company data:', error)
      }
    },
    async getVehiclesData() {
      try {
        const response = await axios.get(
          `${this.apiUrl}fleet/all/${localStorage['currentCompany']}`,
          this.getAuthConfig()
        )
        this.vehicles = await Promise.all(
          response.data.data.map(async (vehicle) => ({
            ...vehicle,
            location: vehicle?.location
          }))
        )
        console.log(vehicles)
      } catch (error) {
        console.error('Error fetching vehicles data:', error)
      }
    },
    async getGeocode(address) {
      const queryString = this.formatAddressForGeocoding(address)
      try {
        const result = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${queryString}&key=${this.apiKey}`
        )
        return result.data.results[0].geometry.location
      } catch (error) {
        console.error('Error geocoding address:', error)
        return null
      }
    },
    formatAddressForGeocoding(address) {
      return Object.values(address).join('+').replace(/\s+/g, '+')
    },
    formatAddress(address) {
      return Object.values(address).join(', ')
    },
    getAuthConfig() {
      return {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
    },
    onRowEditSave(event) {
      let { newData, index } = event
      this.vehicles[index] = newData
      this.updateVehicle(newData)
    },
    getStatusSeverity(status) {
      switch (status) {
        case VehicleAvailabilityEnum.AVAILABLE:
          return 'success'
        case VehicleAvailabilityEnum.IN_USE:
          return 'info'
        case VehicleAvailabilityEnum.IN_MAINTENANCE:
          return 'warn'
        case VehicleAvailabilityEnum.OUT_OF_SERVICE:
          return 'danger'
        default:
          return null
      }
    },
    async loadFleetData() {
      try {
        // const data = await VehicleService.getFleetData()
        // this.vehicles = data.vehicles
        for (const v of this.vehicles) {
          this.currentDrivers.push(v.availability.assignedTo)
        }
        //this.currentDrivers = data.currentDrivers
        //this.recentAlerts = data.recentAlerts //TODO: remove
        //this.totalDistanceToday = data.totalDistanceToday
        //this.averageFuelConsumption = data.averageFuelConsumption
        //this.vehiclesDueForService = data.vehiclesDueForService
        //this.updateMapCenter()
      } catch (error) {
        console.error('Error loading fleet data:', error)
      }
    },
    getVehicleIcon(status) {
      switch (status) {
        case VehicleAvailabilityEnum.IN_USE:
          return '⛔ Vehicle is In Use'
        case VehicleAvailabilityEnum.AVAILABLE:
          return '✔️ Vehicle is Available'
        case VehicleAvailabilityEnum.IN_MAINTENANCE:
          return '🛠 Vehicle is in Maintenance'
        default:
          return '❓'
      }
    },
    async updateVehicle(vehicle) {
      vehicle['currentEmployeeId'] = localStorage['currentCompany']
      vehicle['vehicleId'] = vehicle._id
      axios
        .post(`${this.apiUrl}fleet/update`, vehicle, this.getAuthConfig())
        .then((res) => {
          console.log(res.data.data)
        })
        .catch((error) => {
          console.error('Error updating vehicle:', error)
        })
    }
  }
}
</script>

<style scoped>
.centered {
  display: block;
  margin: 8px auto;
  max-width: 100%;
  height: auto;
}

.fleet-overview {
  max-width: 1200px;
  margin: 0 auto;
}

.status-cards {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.status-card {
  flex: 1;
  margin: 0 0.5rem;
}

.status-card.active :deep(.p-card) {
  background-color: #c8e6c9;
}

.status-card.inactive :deep(.p-card) {
  background-color: #ffcdd2;
}

.driver-item {
  padding: 0.5rem;
  border-bottom: 1px solid #e0e0e0;
}

.driver-item:last-child {
  border-bottom: none;
}

.fleet-stats {
  padding: 1rem;
}

.panel-header-center .p-panel-header {
  text-align: center;
}
</style>
