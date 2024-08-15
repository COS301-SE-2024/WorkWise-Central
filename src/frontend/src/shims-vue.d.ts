declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: VueRouter
    $route: Route
  }
}
declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
import { Route } from 'vue-router'
import { VueRouter } from 'vue-router'
