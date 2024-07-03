import comp from "/home/jessica/University/WorkWise-Central/docs/.vuepress/.temp/pages/demo3/designDocs/styles.html.vue"
const data = JSON.parse("{\"path\":\"/demo3/designDocs/styles.html\",\"title\":\"Style Document\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Description\",\"slug\":\"description\",\"link\":\"#description\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"demo3/designDocs/styles.md\"}")
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
