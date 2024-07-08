// // store/index.js
// import { createStore } from 'vuex'

// const savedDarkMode = sessionStorage.getItem('theme') === 'true' ? true : false

// export default createStore({
//   state: {
//     isDarkMode: savedDarkMode
//   },
//   mutations: {
//     SET_DARK_MODE(state: { isDarkMode: Boolean }, isDarkMode: Boolean) {
//       state.isDarkMode = isDarkMode
//       sessionStorage.setItem('theme', JSON.stringify(isDarkMode))
//     }
//   },
//   actions: {
//     setDarkMode({ commit }: { commit: any }, isDarkMode: Boolean) {
//       commit('SET_DARK_MODE', isDarkMode)
//     }
//   },
//   getters: {
//     isDarkMode: (state: { isDarkMode: Boolean }) => state.isDarkMode
//   }
// })
