<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <button v-on:click="ccc">干啥啊</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '然猪来'
    };
  },
  methods: {
    ccc: function (){
      this.msg = "恩你啊干啥啊";
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
