<template>
  <div id="app" class="container center-align">
    <form novalidate class="md-layout" @submit.prevent="updateUser">
      <md-card class="md-layout-item md-small-size-100">
        <md-card-header>
          <img :src="user.avatar" />
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="first-name">Nome</label>
                <md-input name="first-name" class="shadow-box-input" id="first-name" autocomplete="" v-model="user.first_name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.firstName.required">Esse campo precisa ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.firstName.minlength">Nome inválido</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="last-name">Sobrenome</label>
                <md-input class="shadow-box-input" name="last_name" id="last_name" autocomplete="family-name" v-model="user.last_name" :disabled="sending" />
                <span class="md-error" v-if="!$v.form.lastName.required">O campo de sobrenome precisa ser preenchido</span>
                <span class="md-error" v-else-if="!$v.form.lastName.minlength">Sobrenome inválido</span>
              </md-field>
            </div>
          </div>

          <md-field>
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="user.email" :disabled="true" />
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending">Salvar</md-button>
        </md-card-actions>
      </md-card>
    </form>
    <span class="success_warning" v-if="userSaved"> O usuário foi salvo com sucesso</span>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  name: 'editUser',
  mixins: [validationMixin],
  components: {

  },
  data() {
    return {
      user: {
        id: null,
        email: null,
        first_name: null,
        last_name: null,
        avatar: null,
      },
      id:   null,
      sending: false,
      form: {
        firstName: null,
        lastName: null,
        gender: null,
        age: null,
        email: null,
      },
      userSaved: false,
      sending: false,
    }
  },
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      age: {
        required,
        maxLength: maxLength(3)
      },
    }
  },
  created() {
    this.retrieveUser(this.$route.params.id);
  },
  computed: {

  },
  methods: {
    updateUser(){
      var id = this.user.id;
      this.$store.dispatch('updateUser', {
        'id': id,
        'first_name': this.user.first_name,
        'last_name': this.user.last_name,
      }).then((res) =>{
        this.user = res.data.data;
      })
      this.userSaved = true;
    },
    retrieveUser(id){
      this.$store.dispatch('retrieveUser', {
        'id': id
      }).then((res) =>{
        this.user = res.data.data;
      })
    },
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    clearForm () {
      this.$v.$reset()
      this.form.firstName = null
      this.form.lastName = null
      this.form.age = null
      this.form.gender = null
      this.form.email = null
    },
    saveUser () {
      this.sending = true

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`
        this.userSaved = true
        this.sending = false
        this.clearForm()
      }, 1500)
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.saveUser()
      }
    }
  }
}
</script>


<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
.user {
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  float:left;
  &:focus {
    outline: 0;
  }
}

.pagination{
  float:left;
  width:100%;
  margin-bottom:10px;
}

.pagination-item{
  display:inline;
}

.pagination-footer{
  width:100%;
  float:left;
}

.pagination-link{
  height:30px;
  width:30px;
}
.center-align {
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.user-item {
  margin-bottom: 12px;
  display: inline-table;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.3s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}

.success_warning{
  margin-top:10px;
  float:left;
}

.user-item-left {
  display: flex;
  align-items: center;
}

.user-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  padding: 4px;


  &:focus {
    outline: none;
  }
}

.shadow-box-input{
  box-shadow: 0 1px 0 0 red;
}

.md-list {
   width: 320px;
   max-width: 100%;
   display: inline-block;
   vertical-align: top;
   border: 1px solid rgba(#000, .12);
 }
</style>
