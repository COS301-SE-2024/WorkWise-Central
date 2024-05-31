import comp from "/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/databaseDocs/dbSchema.html.vue"
const data = JSON.parse("{\"path\":\"/databaseDocs/dbSchema.html\",\"title\":\"Database Schema\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":3,\"title\":\"User/Employee\",\"slug\":\"user-employee\",\"link\":\"#user-employee\",\"children\":[]},{\"level\":3,\"title\":\"Company\",\"slug\":\"company\",\"link\":\"#company\",\"children\":[]},{\"level\":3,\"title\":\"Client\",\"slug\":\"client\",\"link\":\"#client\",\"children\":[]},{\"level\":3,\"title\":\"Job\",\"slug\":\"job\",\"link\":\"#job\",\"children\":[]},{\"level\":3,\"title\":\"Appointment\",\"slug\":\"appointment\",\"link\":\"#appointment\",\"children\":[]},{\"level\":3,\"title\":\"InventoryItem\",\"slug\":\"inventoryitem\",\"link\":\"#inventoryitem\",\"children\":[]}],\"git\":{\"updatedTime\":1717183057000,\"contributors\":[{\"name\":\"JessicaBloem\",\"email\":\"jessicabloem8@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"databaseDocs/dbSchema.md\"}")
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
