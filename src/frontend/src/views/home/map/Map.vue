<script setup>
//const center = { lat: 40.689247, lng: -74.044502 }
// const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' }
// const pinOptions = { background: '#FBBC04' }
</script>

<template>
  <GoogleMap
    api-key="ABC"
    style="width: 100%; height: 500px"
    :center="{ lat: lat, lng: lng }"
    :zoom="15"
  >
    <!--    <Marker :options="markerOptions" :pin-options="pinOptions" :center="{ lat: lat, lng: lng }" />-->
    <!--    <Marker :options="{ position: { lat: lat + 0.001, lng: lng } }" />-->

    <!-- Company Marker -->
    <Marker v-if="company != null" :options="{ position: companyLocation }">
      <!--      <div style="text-align: center">
        <div style="font-size: 1.125rem">{{ company.name }}</div>
        <img v-if="company.logo" :src="company.logo" style="margin-top: 8px" alt="Company Logo" />
      </div>-->
      <InfoWindow>
        <div id="companyContent">
          <div></div>
          <img
            class="centered"
            v-if="company.logo"
            :src="company.logo"
            style=""
            alt="Company Logo"
          />
          <h6 style="color: black">{{ company.name }}</h6>
          <br />
          <div style="color: black">
            <p><strong>Street:</strong> {{ company.address.street }}</p>
            <p><strong>Suburb:</strong> {{ company.address.suburb }}</p>
            <p><strong>City:</strong> {{ company.address.city }}</p>
            <p><strong>Province:</strong> {{ company.address.province }}</p>
            <p><strong>Postal Code:</strong> {{ company.address.postalCode }}</p>
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
      apiKey: 'ABC',
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
