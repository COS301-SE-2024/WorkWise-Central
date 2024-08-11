import comp from "/home/jessica/University/WorkWise-Central/docs/.vuepress/.temp/pages/demo3/manuals/userManual.html.vue"
const data = JSON.parse("{\"path\":\"/demo3/manuals/userManual.html\",\"title\":\"User Manual\",\"lang\":\"en-US\",\"frontmatter\":{},\"headers\":[{\"level\":2,\"title\":\"Overview\",\"slug\":\"overview\",\"link\":\"#overview\",\"children\":[]},{\"level\":2,\"title\":\"How to access the system\",\"slug\":\"how-to-access-the-system\",\"link\":\"#how-to-access-the-system\",\"children\":[]},{\"level\":2,\"title\":\"Tutorials\",\"slug\":\"tutorials\",\"link\":\"#tutorials\",\"children\":[]}],\"git\":{\"updatedTime\":1723301086000,\"contributors\":[{\"name\":\"JessicaBloem\",\"email\":\"jessicabloem8@gmail.com\",\"commits\":2}]},\"filePathRelative\":\"demo3/manuals/userManual.md\"}")
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
