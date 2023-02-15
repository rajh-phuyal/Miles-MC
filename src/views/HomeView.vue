<template>
  <div>
    <h1>&nbsp;Welcome back, Captain. 👨🏻‍✈️</h1>
    <div>
      <h2>&nbsp;Here is a joke for you!</h2>
      <p>Q: {{ setup }}</p>
      <p>A: {{ delivery }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeView",
  data() {
    return {
      setup: "",
      delivery: "",
    };
  },
  created() {
    this.fetchQuote();
  },
  methods: {
    async fetchQuote() {
      const response = await fetch("https://v2.jokeapi.dev/joke/Any?safe-mode");
      const data = await response.json();
      this.setup = data.setup;
      this.delivery = data.delivery;
    },
  },
};
</script>
<style>
h1 {
  margin: 1em;
  color: white;
}
p {
  margin: 2em;
  color: white;
  font-size: 20px;
}
</style>