<template>
  <div class="user">
    <div class="user-item-left">
      <md-card class="md-primary">
      <md-card-header>
          <img v-bind:src="avatar" />
        <md-card-header-text>
          <div class="md-title">#{{ id }}</div>
          <div class="md-subhead">Email: {{ email }}</div>
          <div class="md-subhead">Nome: {{ first_name }}</div>
          <div class="md-subhead">Sobrenome: {{ last_name }}</div>
        </md-card-header-text>
      </md-card-header>

      <md-card-actions>
        <md-button class="md-icon-button" @click="editUser(user.id)">
          <md-icon>edit</md-icon>
        </md-button>
        <md-button class="md-icon-button"  @click="active = true">
          <md-icon>delete</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </div> <!-- end user-item-left -->
  <div>
   <md-dialog-confirm
     :md-active.sync="active"
     md-title="Tem certeza de que deseja deletar esse usuário?"
     md-confirm-text="Sim"
     md-cancel-text="Cancelar"
     @md-cancel="onCancel"
     @md-confirm="onConfirm" />

   <span v-if="value == 'Agreed'">O usuário foi deletado com sucesso!</span>
 </div>
</div> <!-- end user-item -->
</template>

<script>
export default {
  name: 'UserUnit',
  props: {
    user: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      'id': this.user.id,
      'email': this.user.email,
      'first_name': this.user.first_name,
      'last_name': this.user.last_name,
      'avatar': this.user.avatar,
      active: false,
      value: null
    }
  },
  watch: {

  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    removeUser(id) {
      this.$store.dispatch('deleteUser', id)
    },
    editUser(){
      this.$router.push({
        name: "editUser",
        params: {id: this.id}
      })
    },
    onConfirm () {
        this.value = 'Agreed'
        this.removeUser(this.user.id);
      },
      onCancel () {
        this.value = 'Disagreed'
      }
  }
}
</script>
