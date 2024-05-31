export const redirects = JSON.parse("{}")

export const routes = Object.fromEntries([
  ["/", { loader: () => import(/* webpackChunkName: "index.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/index.html.js"), meta: {"title":""} }],
  ["/architeturalDocs/", { loader: () => import(/* webpackChunkName: "architeturalDocs_index.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/architeturalDocs/index.html.js"), meta: {"title":"Architectural Documentation"} }],
  ["/architeturalDocs/architecturalPatterns.html", { loader: () => import(/* webpackChunkName: "architeturalDocs_architecturalPatterns.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/architeturalDocs/architecturalPatterns.html.js"), meta: {"title":"Architectural Design & Patterns"} }],
  ["/architeturalDocs/constraints.html", { loader: () => import(/* webpackChunkName: "architeturalDocs_constraints.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/architeturalDocs/constraints.html.js"), meta: {"title":"Constraints"} }],
  ["/architeturalDocs/designPatterns.html", { loader: () => import(/* webpackChunkName: "architeturalDocs_designPatterns.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/architeturalDocs/designPatterns.html.js"), meta: {"title":""} }],
  ["/architeturalDocs/qualityRequirements.html", { loader: () => import(/* webpackChunkName: "architeturalDocs_qualityRequirements.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/architeturalDocs/qualityRequirements.html.js"), meta: {"title":"Non-Functional Requirements"} }],
  ["/architeturalDocs/techSpec.html", { loader: () => import(/* webpackChunkName: "architeturalDocs_techSpec.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/architeturalDocs/techSpec.html.js"), meta: {"title":"Technology Choice"} }],
  ["/businessDocs/", { loader: () => import(/* webpackChunkName: "businessDocs_index.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/businessDocs/index.html.js"), meta: {"title":"Business documentation"} }],
  ["/businessDocs/functionalRequirements.html", { loader: () => import(/* webpackChunkName: "businessDocs_functionalRequirements.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/businessDocs/functionalRequirements.html.js"), meta: {"title":"Functional Requirements"} }],
  ["/businessDocs/marketResearch.html", { loader: () => import(/* webpackChunkName: "businessDocs_marketResearch.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/businessDocs/marketResearch.html.js"), meta: {"title":"Market Research"} }],
  ["/businessDocs/serviceContract.html", { loader: () => import(/* webpackChunkName: "businessDocs_serviceContract.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/businessDocs/serviceContract.html.js"), meta: {"title":"Service contract"} }],
  ["/businessDocs/usecaseDiagrams.html", { loader: () => import(/* webpackChunkName: "businessDocs_usecaseDiagrams.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/businessDocs/usecaseDiagrams.html.js"), meta: {"title":"Usecase Diagrams"} }],
  ["/businessDocs/userCharacteristics.html", { loader: () => import(/* webpackChunkName: "businessDocs_userCharacteristics.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/businessDocs/userCharacteristics.html.js"), meta: {"title":"User Characteristics"} }],
  ["/businessDocs/userStories.html", { loader: () => import(/* webpackChunkName: "businessDocs_userStories.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/businessDocs/userStories.html.js"), meta: {"title":"User Stories"} }],
  ["/databaseDocs/ERDiagrams.html", { loader: () => import(/* webpackChunkName: "databaseDocs_ERDiagrams.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/databaseDocs/ERDiagrams.html.js"), meta: {"title":""} }],
  ["/databaseDocs/", { loader: () => import(/* webpackChunkName: "databaseDocs_index.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/databaseDocs/index.html.js"), meta: {"title":"Database Documentation"} }],
  ["/databaseDocs/constraints.html", { loader: () => import(/* webpackChunkName: "databaseDocs_constraints.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/databaseDocs/constraints.html.js"), meta: {"title":""} }],
  ["/databaseDocs/dataModel.html", { loader: () => import(/* webpackChunkName: "databaseDocs_dataModel.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/databaseDocs/dataModel.html.js"), meta: {"title":"Data Model"} }],
  ["/databaseDocs/dbFunctionalRequirements.html", { loader: () => import(/* webpackChunkName: "databaseDocs_dbFunctionalRequirements.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/databaseDocs/dbFunctionalRequirements.html.js"), meta: {"title":""} }],
  ["/databaseDocs/dbNonFunctionalRequirements.html", { loader: () => import(/* webpackChunkName: "databaseDocs_dbNonFunctionalRequirements.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/databaseDocs/dbNonFunctionalRequirements.html.js"), meta: {"title":"Non-Functional Requirements"} }],
  ["/databaseDocs/dbSchema.html", { loader: () => import(/* webpackChunkName: "databaseDocs_dbSchema.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/databaseDocs/dbSchema.html.js"), meta: {"title":"Database Schema"} }],
  ["/designDocs/", { loader: () => import(/* webpackChunkName: "designDocs_index.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/designDocs/index.html.js"), meta: {"title":"Design Documentation"} }],
  ["/designDocs/classDiagrams.html", { loader: () => import(/* webpackChunkName: "designDocs_classDiagrams.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/designDocs/classDiagrams.html.js"), meta: {"title":""} }],
  ["/designDocs/wireframes.html", { loader: () => import(/* webpackChunkName: "designDocs_wireframes.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/designDocs/wireframes.html.js"), meta: {"title":"Wire Frames"} }],
  ["/guide/", { loader: () => import(/* webpackChunkName: "guide_index.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/guide/index.html.js"), meta: {"title":"Introduction"} }],
  ["/404.html", { loader: () => import(/* webpackChunkName: "404.html" */"/home/jessica/WorkWise-Central/docs/.vuepress/.temp/pages/404.html.js"), meta: {"title":""} }],
]);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateRoutes) {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
  }
  if (__VUE_HMR_RUNTIME__.updateRedirects) {
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ routes, redirects }) => {
    __VUE_HMR_RUNTIME__.updateRoutes(routes)
    __VUE_HMR_RUNTIME__.updateRedirects(redirects)
  })
}
