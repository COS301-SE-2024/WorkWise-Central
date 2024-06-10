import { createApp } from 'vue'
import { createStore, StoreOptions } from 'vuex'

// Define the state type
interface State {
  count: number
  expanded: boolean
}

// Create a new store instance with typed State
const storeOptions: StoreOptions<State> = {
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    increment(state: State) {
      state.count++
    },
    expand(value: boolean, state: State) {
      state.expanded = value
    }
  }
}

const store = createStore<State>(storeOptions)

const app = createApp({
  /* your root component */
})

// Install the store instance as a plugin
app.use(store)
