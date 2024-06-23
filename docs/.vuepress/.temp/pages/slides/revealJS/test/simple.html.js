import comp from "/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/slides/revealJS/test/simple.html.vue"
const data = JSON.parse("{\"path\":\"/slides/revealJS/test/simple.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Slide 1.1\",\"slug\":\"slide-1-1\",\"link\":\"#slide-1-1\",\"children\":[]},{\"level\":2,\"title\":\"Slide 1.2\",\"slug\":\"slide-1-2\",\"link\":\"#slide-1-2\",\"children\":[]},{\"level\":2,\"title\":\"Slide 2\",\"slug\":\"slide-2\",\"link\":\"#slide-2\",\"children\":[]}],\"git\":{\"updatedTime\":null,\"contributors\":[]},\"filePathRelative\":\"slides/revealJS/test/simple.md\"}")
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
