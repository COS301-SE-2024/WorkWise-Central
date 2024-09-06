<template>
  <div class="component-class">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>

    <button @click="handleClick">Click Me</button>
  </div>
</template>

<script>
export default {
  name: 'setUpPaymentGateway',
  data() {
    return {
      title: 'Hello Vue!',
      message: 'This is a simple Vue component.'
    };
  },
  methods: {
    handleClick() {
      alert('Button clicked!');
    }
  }
};
</script>

<style scoped>
.component-class {
  text-align: center;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  border: none;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #2c8f76;
}
</style>
