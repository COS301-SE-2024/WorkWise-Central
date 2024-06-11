<template>
  <main></main>
</template>
<script lang="ts">
export default {
  name: 'ProfilePage',
  data: () => {
    return {
      openAddClient: false,
      isdarkmode: false,
      clientDialog: false,
      light_theme_text_color: 'color: rgb(0, 0, 0); opacity: 65%',
      dark_theme_text_color: 'color: #DCDBDB',
      modal_dark_theme_color: '#2b2b2b',
      modal_light_theme_color: '#FFFFFF',
      headers: [
        {
          title: 'Name',
          align: 'start',
          sortable: true,
          value: 'name',
          key: 'name'
        },
        { title: 'Email', value: 'email', key: 'email' },
        { title: 'Phone', value: 'phone', key: 'phone' },
        { title: 'Address', value: 'address', key: 'address' },
        { title: 'Job Required', value: 'jobRequired', key: 'jobRequired' },
        { title: 'Actions', value: 'actions', key: 'actions' }
      ],
      search: '',
      clients: [
        {
          name: 'John Doe',
          email: ''
        }
      ]
    }
  }
}
</script>
