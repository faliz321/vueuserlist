<template>

  <div >
    <div class="centered-container">
    <md-content class="md-elevation-3">

      <div class="title">
        <img src="@/assets/project-logo.png">
        <div class="md-title">Login de usuário</div>
        <div class="md-body-1">Assim que o login for efetuado, será redirecionado para a listagem de usuários</div>
      </div>

      <div class="form">
        <md-field>
          <label>E-mail</label>
          <md-input v-model="email" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Senha</label>
          <md-input v-model="password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <md-button class="md-raised md-primary" @submit.prevent="login" @click="login">Entrar</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
      </div>

    </md-content>
    <div class="background" />
  </div>

  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
      loading: false
    }
  },
  methods: {
    login() {
      this.$store.dispatch('retrieveToken', {
        email: this.email,
        password: this.password,
      })
        .then(response => {
          this.$router.push({ name: 'users' })
        })
    }
  }
}
</script>
<style lang="scss">
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .background {
    background-color: #FAFAFA;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 0;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .md-input{
    -webkit-box-shadow:0px 1px 0px #ccc;
     -moz-box-shadow:0px 1px 0px #ccc;
     box-shadow:0px 1px 0px #ccc;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
