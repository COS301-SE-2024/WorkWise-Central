import comp from "/home/jessica/University/WorkWise-Central/docs/.vuepress/.temp/pages/demo1/databaseDocs/index.html.vue"
const data = JSON.parse("{\"path\":\"/demo1/databaseDocs/\",\"title\":\"Database Documentation\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"demo1/databaseDocs/README.md\"}")
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
