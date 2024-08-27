<template>
  <v-container>
    <v-card height="1500px">
      <v-card-title class="text-center">Edit Structure </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row>
          <v-col cols="12" lg="6">
            <v-btn @click="updateLayout('TB')"> Top-Bottom </v-btn>
          </v-col>
          <v-col cols="12" lg="6">
            <v-btn @click="updateLayout('LR')"> Left-Right </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-card-text>
        <Toast position="top-center" />
        <v-network-graph
          v-model="graph"
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
        <v-container
          ><v-row justify="end">
            <v-col align="center" cols="12" lg="6" order="last" order-lg="first">
              <v-btn color="error" @click="cancel" :loading="isDeleting" block
                ><v-icon icon="fa: fa-solid fa-cancel" color="error"></v-icon>Cancel</v-btn
              >
            </v-col>
            <v-col align="center" cols="12" lg="6" order="first" order-lg="last">
              <v-btn color="success" @click="saveChanges" :loading="isDeleting" block
                ><v-icon color="success" icon="fa: fa-solid fa-floppy-disk"></v-icon>Save</v-btn
              >
            </v-col>
          </v-row></v-container
        >
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
      data: {
        nodes: {
          // node1: { name: 'Joe' },
          // node2: { name: 'Alice' },
          // node3: { name: 'Bob' },
          // node4: { name: 'Carol' },
          // node5: { name: 'Dave' },
          // node6: { name: 'Eve' },
          // node7: { name: 'Frank' }
        },
        edges: {
          // edge1: { source: 'node1', target: 'node2' },
          // edge2: { source: 'node2', target: 'node3' },
          // edge3: { source: 'node3', target: 'node4' },
          // edge4: { source: 'node3', target: 'node5' },
          // edge5: { source: 'node2', target: 'node6' },
          // edge6: { source: 'node6', target: 'node7' }
        },
        layouts: reactive({
          nodes: {}
        })
      },
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
            // for type is "rect" -->
            width: 32,
            height: 32,
            borderRadius: 4,
            // <-- for type is "rect"
            strokeWidth: 0,
            strokeColor: '#000000',
            strokeDasharray: '0',
            color: '#4466cc'
          },
          label: { direction: 'south', color: '#dd2288' },
          hover: {
            type: 'circle',
            radius: nodeSize,
            // for type is "rect" -->
            width: 32,
            height: 32,
            borderRadius: 4,
            // <-- for type is "rect"
            strokeWidth: 0,
            strokeColor: '#000000',
            strokeDasharray: '0',
            color: '#dd2288'
          },
          selected: {
            type: 'circle',
            radius: nodeSize,
            // for type is "rect" -->
            width: 32,
            height: 32,
            borderRadius: 4,
            // <-- for type is "rect"
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
          'node:click': this.onNodeClick()
        }
      })
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
    onNodeClick() {
      console.log('Node clicked:')
    },
    viewEmployee() {
      console.log()
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
