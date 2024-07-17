import comp from "/home/jessica/University/WorkWise-Central/docs/.vuepress/.temp/pages/demo1/index.html.vue"
const data = JSON.parse("{\"path\":\"/demo1/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"home\":true,\"heroImage\":\"/WorkWiseLogo.png\"},\"headers\":[],\"git\":{\"updatedTime\":1719147791000,\"contributors\":[{\"name\":\"JessicaBloem\",\"email\":\"jessicabloem8@gmail.com\",\"commits\":1}]},\"filePathRelative\":\"demo1/README.md\"}")
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
