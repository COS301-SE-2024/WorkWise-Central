import comp from "/home/jessica/University/WorkWise-Central/docs/.vuepress/.temp/pages/demo1/databaseDocs/dbSchema.html.vue"
const data = JSON.parse("{\"path\":\"/demo1/databaseDocs/dbSchema.html\",\"title\":\"Database Schema\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"User/Employee\",\"slug\":\"user-employee\",\"link\":\"#user-employee\",\"children\":[]},{\"level\":3,\"title\":\"Company\",\"slug\":\"company\",\"link\":\"#company\",\"children\":[]},{\"level\":3,\"title\":\"Client\",\"slug\":\"client\",\"link\":\"#client\",\"children\":[]},{\"level\":3,\"title\":\"Job\",\"slug\":\"job\",\"link\":\"#job\",\"children\":[]},{\"level\":3,\"title\":\"Appointment\",\"slug\":\"appointment\",\"link\":\"#appointment\",\"children\":[]},{\"level\":3,\"title\":\"InventoryItem\",\"slug\":\"inventoryitem\",\"link\":\"#inventoryitem\",\"children\":[]}],\"git\":{\"updatedTime\":1719147791000,\"contributors\":[{\"name\":\"JessicaBloem\",\"email\":\"jessicabloem8@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"demo1/databaseDocs/dbSchema.md\"}")
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
