// types/vue-kanban.d.ts
declare module 'vue-kanban' {
  import { PluginObject } from 'vue'
  const VueKanban: PluginObject<any>
  export default VueKanban

  export class useKanban {}
}
