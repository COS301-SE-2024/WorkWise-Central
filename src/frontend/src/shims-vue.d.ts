declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $router: VueRouter
    $route: Route
  }
}
import { Route } from 'vue-router'
import { VueRouter } from 'vue-router'
