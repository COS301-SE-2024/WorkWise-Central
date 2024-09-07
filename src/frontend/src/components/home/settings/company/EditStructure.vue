<template>
  <v-container>
    <v-card height="1500px">
      <v-card-title class="text-center">Edit Structure </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12" lg="4">
            <v-btn @click="removeNode" block> Remove Node </v-btn>
          </v-col>
          <v-col cols="12" lg="4">
            <v-btn @click="addNode" block> Add Node </v-btn>
          </v-col>
          <v-col cols="12" lg="4">
            <v-btn color="primary" block @click="getEmployeeDetails" :disabled="!selectedItem">
              <v-icon icon="fa: fa-solid fa-pencil" color="primary"></v-icon>Edit</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
      <v-card-text>
        <Toast position="top-center" />
        <v-network-graph
          v-model="graph"
          v-model:selected-nodes="selectedNodes"
          v-model:selected-edges="selectedEdges"
          class="graph"
          :nodes="data.nodes"
          :edges="data.edges"
          :layouts="data.layouts"
          :configs="configs"
          :event-handlers="configs.eventsHandlers"
        >
          <template
            #override-node-label="{ scale, text, x, y, config, textAnchor, dominantBaseline }"
          >
            <text
              x="0"
              y="0"
              :font-size="12 * scale"
              text-anchor="middle"
              dominant-baseline="central"
              fill="#ffffff"
              >{{ text }}</text
            >
            <text
              x="0"
              y="0"
              :font-size="config.fontSize * scale"
              :text-anchor="textAnchor"
              :dominant-baseline="dominantBaseline"
              :fill="config.color"
              :transform="`translate(${x} ${y})`"
            ></text>
          </template>
        </v-network-graph>
      </v-card-text>

      <v-card-actions class="bg-cardColor">
        <v-container>
          <v-row justify="end">
            <v-col align="center" cols="12" lg="6" order="last" order-lg="first">
              <v-btn color="error" @click="cancel" :loading="isDeleting" block>
                <v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Cancel
              </v-btn>
            </v-col>
            <v-col align="center" cols="12" lg="6" order="first" order-lg="last">
              <v-btn color="success" @click="saveChanges" :loading="isDeleting" block>
                <v-icon color="success" icon="fa: fa-solid fa-floppy-disk"></v-icon>Save
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="employeeDialog" max-width="500" height="500">
      <v-card class="bg-cardColor">
        <v-form ref="form" @submit.prevent="validateEdits">
          <v-card-title class="text-center">Edit Employee</v-card-title>
          <v-divider></v-divider>
          <v-card-item>
            <v-row
              ><v-col>
                <h4 class="text-center" style="font-size: 25px; font-weight: lighter">
                  {{
                    selectedEmployee?.firstName.charAt(0).toUpperCase() +
                    selectedEmployee?.firstName.slice(1)
                  }}
                  {{
                    selectedEmployee?.surname.charAt(0).toUpperCase() +
                    selectedEmployee?.surname.slice(1)
                  }}
                </h4>
                <h3 class="text-center">Role: {{ selectedEmployee?.roleName }}</h3>
              </v-col></v-row
            >
            <v-row
              ><v-col :cols="12">
                <v-select
                  clearable
                  label="Company Role"
                  hint="Select the role you'd like to change this employee to"
                  persistent-hint
                  @update:modelValue="change_roles"
                  :items="roleItems"
                  item-value="roleId"
                  item-title="roleName"
                  v-model="req_obj.updateEmployeeDto.roleId"
                  bg-color="background"
                  variant="solo"
                  :loading="loading"
                ></v-select>
              </v-col>
              <v-col :cols="12">
                <v-select
                  clearable
                  label="Subordinates"
                  hint="Select the employees you'd like to be subordinates of this employee"
                  persistent-hint
                  @update:model-value="selected_subordiates"
                  :items="filteredSubordinateNames"
                  v-model="req_obj.updateEmployeeDto.subordinates"
                  item-value="employeeId"
                  item-title="name"
                  bg-color="background"
                  variant="solo"
                  multiple
                  :loading="loading"
                ></v-select> </v-col
              ><v-col :cols="12">
                <v-select
                  clearable
                  label="Superior"
                  hint="Select the employee you'd like to be superior of this employee"
                  persistent-hint
                  @update:modelValue="selected_supirior"
                  :items="filteredSupriorNames"
                  v-model="req_obj.updateEmployeeDto.superiorId"
                  item-value="employeeId"
                  item-title="name"
                  bg-color="background"
                  variant="solo"
                ></v-select> </v-col
            ></v-row>
          </v-card-item>
          <v-card-actions>
            <v-container>
              <v-row>
                <v-col cols="12" lg="6" order="first" order-lg="last">
                  <v-btn
                    color="success"
                    rounded="md"
                    width="100%"
                    height="35"
                    variant="text"
                    type="submit"
                    block
                    :loading="isDeleting"
                  >
                    <v-icon
                      icon="fa:fa-solid fa-floppy-disk"
                      start
                      color="success"
                      size="small"
                    ></v-icon>
                    Save
                  </v-btn>
                </v-col>
                <v-col cols="12" lg="6" order="last" order-lg="first">
                  <v-btn
                    color="error"
                    rounded="md"
                    width="100%"
                    height="35"
                    variant="text"
                    block
                    @click="close"
                    :loading="isDeleting"
                  >
                    <Toast position="top-center" />
                    <v-icon icon="fa:fa-solid fa-cancel" color="error" size="small" start></v-icon
                    >Cancel
                  </v-btn>
                </v-col></v-row
              >
            </v-container>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import * as vNG from 'v-network-graph'
import dagre from 'dagre/dist/dagre.min.js'
import axios from 'axios'

const nodeSize = 40

export default defineComponent({
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      color: 'primary',
      selectedItem: '',
      employeeDialog: false,
      data: {
        nodes: {},
        edges: {},
        layouts: reactive({
          nodes: {}
        })
      },
      selectedNodes: [],
      selectedEdges: [],
      nodeSize,
      graph: null,
      configs: vNG.defineConfigs({
        view: {
          autoPanAndZoomOnLoad: 'fit-content',
          onBeforeInitialDisplay: () => this.layout('TB')
        },
        node: {
          selectable: true,
          normal: {
            type: 'circle',
            radius: nodeSize,
            width: 32,
            height: 32,
            borderRadius: 4,
            strokeWidth: 0,
            strokeColor: '#000000',
            strokeDasharray: '0',
            color: '#4466cc'
          },
          label: { direction: 'south', color: '#dd2288' },
          hover: {
            type: 'circle',
            radius: nodeSize,
            width: 32,
            height: 32,
            borderRadius: 4,
            strokeWidth: 0,
            strokeColor: '#000000',
            strokeDasharray: '0',
            color: '#dd2288'
          },
          selected: {
            type: 'circle',
            radius: nodeSize,
            width: 32,
            height: 32,
            borderRadius: 4,
            strokeWidth: 0,
            strokeColor: '#000000',
            strokeDasharray: '0',
            color: '#4466cc'
          }
        },
        edge: {
          normal: {
            color: '#F0984D',
            width: 3
          },
          margin: 4,
          marker: {
            target: {
              type: 'arrow',
              width: 4,
              height: 4
            }
          }
        },
        eventsHandlers: {
          'node:click': this.onNodeClick
        }
      }),
      selectedEmployee: '',
      req_obj: {
        currentEmployeeId: localStorage['employeeId'],
        updateEmployeeDto: {
          roleId: '',
          subordinates: [],
          superiorId: ''
        }
      }
    }
  },
  computed: {
    filteredSubordinateNames() {
      return this.subordinateItemNames.filter(
        (sub) =>
          !(
            this.req_obj?.updateEmployeeDto.superiorId &&
            this.req_obj?.updateEmployeeDto.superiorId === sub.employeeId
          )
      )
    },
    filteredSupriorNames() {
      return this.subordinateItemNames.filter(
        (sub) =>
          !this.req_obj?.updateEmployeeDto.subordinates?.some(
            (selected) => selected === sub.employeeId
          )
      )
    }
  },
  methods: {
    layout(direction) {
      if (Object.keys(this.data.nodes).length <= 1 || Object.keys(this.data.edges).length == 0) {
        return
      }

      const g = new dagre.graphlib.Graph()
      g.setGraph({
        rankdir: direction,
        nodesep: this.nodeSize * 2,
        edgesep: this.nodeSize,
        ranksep: this.nodeSize * 2
      })
      g.setDefaultEdgeLabel(() => ({}))

      Object.entries(this.data.nodes).forEach(([nodeId, node]) => {
        g.setNode(nodeId, { label: node.name, width: this.nodeSize, height: this.nodeSize })
      })

      Object.values(this.data.edges).forEach((edge) => {
        g.setEdge(edge.source, edge.target)
      })

      dagre.layout(g)

      g.nodes().forEach((nodeId) => {
        const x = g.node(nodeId).x
        const y = g.node(nodeId).y
        this.data.layouts.nodes[nodeId] = { x, y }
      })
    },
    viewEmployee() {
      console.log()
    },
    removeNode() {
      const nodeIds = Object.keys(this.data.nodes)
      if (nodeIds.length === 0) return
      // Implement your logic for removing a node here
    },
    addNode() {
      const newNodeId = `node${Object.keys(this.data.nodes).length + 1}`
      this.data.nodes[newNodeId] = { name: 'New Node' }
    },
    async downloadAsSvg() {
      if (!this.graph) return
      const text = await this.graph.exportAsSvgText()
      const url = URL.createObjectURL(new Blob([text], { type: 'octet/stream' }))
      const a = document.createElement('a')
      a.href = url
      a.download = 'network-graph.svg' // filename to download
      a.click()
      window.URL.revokeObjectURL(url)
    },

    onNodeClick(event) {
      console.log(event.node)
      console.log(this.data.nodes)

      if (event.node) {
        // Traverse nodes using for...in loop
        for (const nodeId in this.data.nodes) {
          const node = this.data.nodes[nodeId]
          console.log(nodeId)
          if (nodeId === event.node) {
            console.log(this.selectedItem)
            this.selectedItem = node
            break // Exit the loop once the node is found
          }
        }

        console.log('Node clicked:', this.selectedItem)
      } else {
        console.log('No node clicked')
      }
    },

    async getGraphView() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }
      }
      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      try {
        const response = await axios.get(
          `${apiURL}employee/graphViewData/${localStorage.getItem('employeeId')}`,
          config
        )
        console.log(response)
        this.data.nodes = response.data.data.nodes
        this.data.edges = response.data.data.edges
      } catch (error) {
        console.error(error)
      }
    },
    async getEmployeeDetails() {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        },
        params: {
          currentEmployeeId: localStorage.getItem('employeeId')
        }
      }
      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      try {
        const response = await axios.get(
          `${apiURL}employee/detailed/id/${this.selectedItem.id}`,
          config
        )
        console.log(response)
        this.selectedEmployee = response.data.data
        this.employeeDialog = true
      } catch (error) {
        console.error(error)
      }
    },
    async validateEdits() {
      if (
        this.req_obj.updateEmployeeDto.roleId === '' &&
        this.req_obj.updateEmployeeDto.subordinates?.length === 0 &&
        this.req_obj.updateEmployeeDto.superiorId === ''
      ) {
        this.$toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Please select at least one field to update',
          life: 3000
        })
        return
      }

      const form = this.$refs.form
      const validate = await form.validate()
      this.req_obj.updateEmployeeDto.subordinates ||
        delete this.req_obj.updateEmployeeDto.subordinates
      this.req_obj.updateEmployeeDto.superiorId || delete this.req_obj.updateEmployeeDto.superiorId
      this.req_obj.updateEmployeeDto.roleId || delete this.req_obj.updateEmployeeDto.roleId

      if (validate) await this.savechanges()
    },
    async loadSubordinates() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` },
        params: { currentEmployeeId: localStorage['employeeId'] }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const sub_res = await axios.get(
          apiURL + `employee/listPotentialSubordinates/${this.editedItem.employeeId}`,
          config
        )
        console.log(sub_res)
        this.loading = false
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async loadSuperiors() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage['access_token']}` },
        params: { currentEmployeeId: localStorage['employeeId'] }
      }
      const apiURL = await this.getRequestUrl()
      try {
        const sup_res = await axios.get(
          apiURL + `employee/listPotentialSuperiors/${this.editedItem.employeeId}`,
          config
        )
        console.log(sup_res)
        this.loading = false
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async loadRoles() {
      const config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      const apiURL = await this.getRequestUrl()
      console.log(apiURL)
      try {
        let roles_response = await axios.get(
          apiURL + `role/all/${localStorage['currentCompany']}`,
          config
        )
        let roles_data = roles_response.data.data
        for (let i = 0; i < roles_data.length; i++) {
          if (
            roles_data[i].roleName === this.localEditedItem.roleName ||
            roles_data[i].roleName === 'Owner'
          )
            continue
          this.roleItems.push({
            roleName: roles_data[i].roleName,
            roleId: roles_data[i]._id
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    close() {
      this.employeeDialog = false
    },
    async savechanges() {
      this.isDeleting = true // Indicate the start of the deletion process
      console.log(this.req_obj)
      let config = { headers: { Authorization: `Bearer ${localStorage['access_token']}` } }
      let apiURL = await this.getRequestUrl()
      console.log(this.localEditedItem.employeeId)
      axios
        .patch(apiURL + `employee/${this.localEditedItem.employeeId}`, this.req_obj, config)
        .then((res) => {
          this.$toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Employee updated successfully',
            life: 3000
          })
          console.log(res)
          this.employeeDialog = false
          setTimeout(() => {
            this.isDeleting = false
            this.employeeDialog = false
          }, 1500)
        })
        .catch((error) => {
          this.$toast.add({
            severity: 'error',
            summary: 'Error',
            detail: 'An error occurred while updating the employee',
            life: 3000
          })
          console.log(error)
        })
    },
    async getRequestUrl() {
      console.log(this.localUrl)
      console.log(this.remoteUrl)
      const localAvailable = await this.isLocalAvailable(this.localUrl)
      return localAvailable ? this.localUrl : this.remoteUrl
    },
    async isLocalAvailable(localUrl) {
      try {
        const res = await axios.get(localUrl)
        return res.status < 300 && res.status > 199
      } catch (error) {
        return false
      }
    },
    updateLayout(direction) {
      this.layout(direction)
    },
    saveChanges() {
      console.log('Save changes')
    },
    cancel() {
      console.log('Cancel')
    }
  },
  mounted() {
    this.layout('LR')
    this.getGraphView()
  }
})
</script>

<style scoped>
.graph {
  height: 700px;
}
.darkModeText {
  color: white;
}
.lightModeText {
  color: black;
}
</style>
