import comp from "/home/jessica/University/WorkWise-Central/docs/.vuepress/.temp/pages/demo3/databaseDocs/dataModel.html.vue"
const data = JSON.parse("{\"path\":\"/demo3/databaseDocs/dataModel.html\",\"title\":\"Data Model\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"User\",\"slug\":\"user\",\"link\":\"#user\",\"children\":[]},{\"level\":2,\"title\":\"Employee\",\"slug\":\"employee\",\"link\":\"#employee\",\"children\":[]},{\"level\":2,\"title\":\"Company\",\"slug\":\"company\",\"link\":\"#company\",\"children\":[]},{\"level\":2,\"title\":\"Client\",\"slug\":\"client\",\"link\":\"#client\",\"children\":[]},{\"level\":2,\"title\":\"Job\",\"slug\":\"job\",\"link\":\"#job\",\"children\":[]},{\"level\":2,\"title\":\"InventoryItem\",\"slug\":\"inventoryitem\",\"link\":\"#inventoryitem\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"demo3/databaseDocs/dataModel.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
