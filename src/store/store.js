import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
axios.defaults.baseURL = 'https://reqres.in/api/'

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('access_token') || null,
    filter: 'all',
    users: [],
    user: []
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    },
    remaining(state) {
      return state.users
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0
    },
    userList(state) {
      return state.users
    },
  },
  mutations: {
    updateUser(state, user) {
      const index = state.users.findIndex(item => item.id == user.id)
      state.users.splice(index, 1, {
        'id': user.id,
        'email': user.email,
      })
    },
    deleteUser(state, id) {
      const index = state.users.findIndex(item => item.id == id)
      state.users.splice(index, 1)
    },
    retrieveUsers(state, users) {
      state.users = users
    },
    retrieveUser(state, user) {
      state.user = user
    },
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
  },
  actions: {
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token

      if (context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post('/logout')
            .then(response => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              resolve(response)
            })
            .catch(error => {
              localStorage.removeItem('access_token')
              context.commit('destroyToken')
              reject(error)
            })
        })
      }
    },
    retrieveToken(context, credentials) {

      return new Promise((resolve, reject) => {
        axios.post('/login', {
          email: credentials.email,
          password: credentials.password,
        })
          .then(response => {
            const token = response.data.access_token

            localStorage.setItem('access_token', token)
            context.commit('retrieveToken', token)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(error)
          })
        })
    },
    retrieveUsers(context, page) {
      return new Promise((resolve, reject) => {
        if(page == null){
          page = 1;
        }
        //bearer token
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        axios.get('/users?page='+page)
          .then(response => {
            context.commit('retrieveUsers', response.data)
            resolve(response)
          })
          .catch(error => {
            console.log(error)
          })
      })
    },
    retrieveUser(context, user) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        axios.get('/users/' + user.id)
          .then(response => {
            context.commit('retrieveUser', response.data.data)
            resolve(response);
          })
          .catch(error => {
            console.log(error)
          })
      });
    },
    updateUser(context, user) {
      return new Promise((resolve, reject) => {
        axios.post('/user/' + user.id, {
          first_name: user.first_name,
          last_name: user.last_name,
        })
          .then(response => {
            context.commit('updateUser', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        })
    },
    deleteUser(context, id) {
      axios.delete('/user/' + id)
        .then(response => {
          context.commit('deleteUser', id)
        })
        .catch(error => {
          console.log(error)
        })
    },

  }
})
