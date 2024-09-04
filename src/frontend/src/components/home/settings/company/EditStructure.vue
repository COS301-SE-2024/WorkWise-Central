<template>
  <v-container>
    <v-card height="1500px">
      <v-card-title class="text-center">Edit Structure </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12" lg="4">
            <v-btn @click="removeNode"> Remove Node </v-btn>
          </v-col>
          <v-col cols="12" lg="4">
            <v-btn @click="addNode"> Add Node </v-btn>
          </v-col>
          <v-col cols="12" lg="4">
            <EditEmployee :Disabled="selectedNodes.length === 0" :editedItem="selectedItem" />
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
  </v-container>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import * as vNG from 'v-network-graph'
import dagre from 'dagre/dist/dagre.min.js'
import axios from 'axios'
import EditEmployee from '../../employees/management/EditEmployee.vue'

const nodeSize = 40

export default defineComponent({
  data() {
    return {
      localUrl: 'http://localhost:3000/',
      remoteUrl: 'https://tuksapi.sharpsoftwaresolutions.net/',
      color: 'primary',
      selectedItem: '',
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
      })
    }
  },
  components: {
    EditEmployee
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
    EditEmployee(employeeId) {
      console.log(employeeId)
    },
    onNodeClick(event) {
      console.log(event.node)
      console.log(this.data.nodes)

      if (event.node) {
        // Traverse nodes using for...in loop
        for (const nodeId in this.data.nodes) {
          if (this.data.nodes.hasOwnProperty(nodeId)) {
            const node = this.data.nodes[nodeId]
            console.log(nodeId)
            if (nodeId === event.node) {
              console.log(this.selectedItem)
              this.selectedItem = node
              break // Exit the loop once the node is found
            }
          }
        }
        console.log('Node clicked:', this.selectedItem)
      } else {
        console.log('No node clicked')
      }
    },

    editEmployee() {
      if (this.selectedItem) {
        console.log(`Editing employee with ID: ${this.selectedItem}`)
        // Add your logic to edit the employee here
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
