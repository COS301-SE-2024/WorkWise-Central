<template>
  <Splitter style="height: 100%">
    <SplitterPanel class="flex items-center justify-center" :size="25" :minSize="10">
      <div class="sidebar">
        <!--        <Image src="https://picsum.photos/200/300" alt="Image" width="100%" height="20%" />-->
        <h2>Fleet Overview</h2>
        <div class="status-cards">
          <div class="status-card active">
            <h3>Active Vehicles</h3>
            <p>{{ activeVehicles }}</p>
          </div>
          <div class="status-card inactive">
            <h3>Inactive Vehicles</h3>
            <p>{{ inactiveVehicles }}</p>
          </div>
        </div>
        <div class="driver-list">
          <h3>Current Drivers</h3>
          <ul>
            <li v-for="driver in currentDrivers" :key="driver.id">
              {{ driver.name }} - {{ driver.vehicleLicensePlate }}
            </li>
          </ul>
        </div>
        <div class="fleet-stats">
          <h3>Fleet Statistics</h3>
          <p>Total Distance Today: {{ totalDistanceToday }} km</p>
          <p>Average Fuel Consumption: {{ averageFuelConsumption }} L/100km</p>
          <p>Vehicles Due for Service: {{ vehiclesDueForService }}</p>
        </div>
        <div class="alerts">
          <h3>Alerts</h3>
          <ul>
            <li v-for="alert in recentAlerts" :key="alert.id" :class="alert.severity">
              {{ alert.message }}
            </li>
          </ul>
        </div>
      </div>
      <div class="card">
        <Button
          label="Show All Vehicle Data"
          icon="pi pi-external-link"
          @click="dialogVisible = true"
        />
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
              <template #editor="{ data, field }">
                <InputText v-model="data.name.make" fluid />
              </template>
            </Column>
            <Column field="name.model" header="Model" style="width: 15%">
              <template #editor="{ data, field }">
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
            <Button label="Close" icon="pi pi-check" @click="dialogVisible = false" />
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
    <Marker :options="{ position: { lat: lat, lng: lng } }">
      <div style="text-align: center">
        <div style="font-size: 1.125rem; color: red"></div>
      </div>
      <InfoWindow>
        <div id="content">
          <div id="siteNotice"></div>
          <h1 id="firstHeading" class="" style="color: black">You Are Here</h1>
          <div id="bodyContent" style="color: black">
            <p></p>
          </div>
        </div>
      </InfoWindow>
    </Marker>

    <Polyline v-if="polyOptions" :options="polyOptions" />
  </GoogleMap>
</template>

<script>
import { GoogleMap, InfoWindow, Marker, Polyline /*, AdvancedMarker*/ } from 'vue3-google-map'
import axios from 'axios'
import { GOOGLE_MAPS_API_KEY } from '@/main'
export default {
  name: 'SystemMap',
  components: {
    GoogleMap,
    // eslint-disable-next-line vue/no-reserved-component-names
    Marker,
    InfoWindow,
    // eslint-disable-next-line vue/no-reserved-component-names
    Polyline
    //AdvancedMarker,
  },
  data() {
    return {
      company: null,
      companyLogo: 'https://http.cat/status/102',
      googleLink: 'https://maps.googleapis.com/maps/api/geocode/json?',
      isDarkMode: localStorage['theme'] !== 'false',
      actionsDialog: false,
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      apiKey: GOOGLE_MAPS_API_KEY,
      companyLocation: null,
      currentLocation: null,
      vehicleLocations: [],
      lat: null,
      lng: null,
      polyOptions: null
    }
  },
  created() {
    this.$getLocation()
      .then((coordinates) => {
        console.log(coordinates)
        this.lat = coordinates.lat
        this.lng = coordinates.lng
      })
      .catch((error) => {
        console.log(error)
      })
  },
  methods: {
    async getCompanyAddress() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const response = await axios.get(
          apiURL + `company/id/${localStorage['currentCompany']}`,
          config
        )
        console.log('Company Data: ', response.data.data)
        this.company = response.data.data
        const addr = response.data.data.address
        const queryString = this.formatAddressForGeocoding(addr)
        const result = await axios.get(
          this.googleLink + `address=${queryString}&key=${this.apiKey}`
        )
        console.log(result.data.results[0].geometry.location)
        this.companyLocation = result.data.results[0].geometry.location
        this.addPolyOptions()
      } catch (error) {
        console.log(error)
      }
    },
    formatAddressForGeocoding(address) {
      const { street, suburb, city, province, postalCode } = address
      return `${street}+${suburb}+${city}+${province}+${postalCode}`.replace(/\s+/g, '+')
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    addPolyOptions() {
      if (this.lat && this.lng && this.company) {
        this.polyOptions = {
          path: [
            { lat: this.lat, lng: this.lng },
            { lat: this.companyLocation.lat, lng: this.companyLocation.lng }
          ],
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        }
        alert('Done')
      }
    },
    async getRequestUrl() {
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    }
  },
  mounted() {
    this.getCompanyAddress()
    this.addPolyOptions()
  }
}
</script>

<style scoped>
.centered {
  display: block;
  margin-left: auto;
  margin-right: auto;
  /*
  //width: 50%;
  */
  margin-top: 8px;
  /*  //object-fit: contain;*/
  max-width: min-content;
}
</style>
