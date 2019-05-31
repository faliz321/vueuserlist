<template>
  <div id="app" class="container">
    <md-toolbar>
      <h3 class="md-title">Listagem de usuários</h3>
    </md-toolbar>
    <users></users>
  </div>
</template>

<script>
import Users from './components/Users';

export default {
  name: 'App',
  components: {
    Users,
  }
}
</script>

<style>

.container {
  max-width: 100%;
  margin: 0 auto;
  text-align:center;
}

.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}
</style>
