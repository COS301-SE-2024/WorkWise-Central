<template>
  <div class="mb-4">
    <Button :label="isCheckedIn ? 'Check Out' : 'Check In'" @click="toggleCheckIn" class="mr-2" :class="{ 'p-button-success': !isCheckedIn, 'p-button-danger': isCheckedIn }" />
  </div>
  <div class="text-h6 mb-4">{{ formattedTime }}</div>
  <div>
    <Button :label="isRunning ? 'Pause' : 'Start'" @click="toggleTimer" :disabled="!isCheckedIn" class="mr-2" :class="{ 'p-button-warning': isRunning, 'p-button-success': !isRunning }" />
    <Button label="Stop" @click="stopTimer" :disabled="!isCheckedIn || !isRunning" class="p-button-danger" />
  </div>
</template>

<script setup>
import {ref, computed, defineProps} from 'vue';
import Button from 'primevue/button';

const props = defineProps<{ jobID: string }>()
const isCheckedIn = ref(false);
const isRunning = ref(false);
const elapsedTime = ref(0);
let timerInterval = null;

const formattedTime = computed(() => {
  const hours = Math.floor(elapsedTime.value / 3600);
  const minutes = Math.floor((elapsedTime.value % 3600) / 60);
  const seconds = elapsedTime.value % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const toggleCheckIn = () => {
  isCheckedIn.value = !isCheckedIn.value;
  if (!isCheckedIn.value) {
    stopTimer();
  }
};

const toggleTimer = () => {
  if (isRunning.value) {
    clearInterval(timerInterval);
  } else {
    timerInterval = setInterval(() => {
      elapsedTime.value++;
    }, 1000);
  }
  isRunning.value = !isRunning.value;
};

const stopTimer = () => {
  clearInterval(timerInterval);
  isRunning.value = false;
  elapsedTime.value = 0;
};
</script>

<style scoped>
.p-button {
  margin-right: 0.5rem;
}
</style>