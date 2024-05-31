import comp from "/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/businessDocs/index.html.vue"
const data = JSON.parse("{\"path\":\"/businessDocs/\",\"title\":\"Business documentation\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Purpose\",\"slug\":\"purpose\",\"link\":\"#purpose\",\"children\":[{\"level\":3,\"title\":\"Please Note\",\"slug\":\"please-note\",\"link\":\"#please-note\",\"children\":[]}]}],\"git\":{\"updatedTime\":1717183057000,\"contributors\":[{\"name\":\"JessicaBloem\",\"email\":\"jessicabloem8@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"businessDocs/README.md\"}")
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
