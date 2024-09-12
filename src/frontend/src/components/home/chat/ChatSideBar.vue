<template>
  <Listbox v-model="selectedUser" :options="chatUsers" optionLabel="name" @change="selectUser">
    <template #option="option">
      <div class="user-item">
        <Avatar :image="option.profilePic" size="large" shape="circle" class="mr-2"></Avatar>
        <span>{{ option.name }}</span>
      </div>
    </template>
  </Listbox>
</template>

<script setup>
import { ref } from 'vue';
import Listbox from 'primevue/listbox';
import Avatar from 'primevue/avatar';

// Define the emit function to allow emitting events to the parent component
const emit = defineEmits(['user-selected']);  // Define the event name

const selectedUser = ref(null);
const chatUsers = ref([
  { id: 1, name: 'Alice', profilePic: '/images/alice.jpg' },
  { id: 2, name: 'Bob', profilePic: '/images/bob.jpg' },
  // More users...
]);

const selectUser = (event) => {
  emit('user-selected', event.value);  // Emit the selected user to the parent component
};
</script>

<style scoped>
.user-item {
  display: flex;
  align-items: center;
}
</style>
