<template>
  <aside class="chat-sidebar">
    <h2>Chats</h2>
    <InputText v-model="searchQuery" placeholder="Search users" class="w-full mb-3" />
    <ul class="user-list">
      <li
        v-for="user in filteredUsers"
        :key="user.id"
        @click="selectUser(user)"
        :class="{ 'selected': selectedUser && user.id === selectedUser.id }"
      >
        <Avatar :image="user.avatar" size="large" shape="circle" />
        <span>{{ user.name }}</span>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue';
import Avatar from 'primevue/avatar';
import InputText from 'primevue/inputtext';

const props = defineProps(['users', 'selectedUser']);
const emit = defineEmits(['select-user']);

const searchQuery = ref('');

const filteredUsers = computed(() => {
  return props.users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const selectUser = (user) => {
  emit('select-user', user);
};
</script>

<style scoped>
.chat-sidebar {
  width: 300px;
  background-color: #f4f4f4;
  border-right: 1px solid #e0e0e0;
  padding: 1rem;
}

.user-list {
  list-style-type: none;
  padding: 0;
}

.user-list li {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.user-list li:hover {
  background-color: #e0e0e0;
}

.user-list li.selected {
  background-color: #d0d0d0;
}

.user-list li span {
  margin-left: 1rem;
}
</style>