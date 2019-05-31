<template>
  <div class="users_container">
    <UserUnit v-for="user in users" :key="user.id" :user="user" >
    </UserUnit>
    <v-pagination v-if="page" v-on:change="changeCallback" v-model="page" :page-count="total_pages"></v-pagination>
    <div class="pagination-footer"><p>Página {{ page }} de {{total_pages}} (mostrando {{per_page}} de {{total}} users)</p></div>
  </div>
</template>

<script>
import UserUnit from './UserUnit'
import vPagination from 'vue-plain-pagination'
export default {
  name: 'users',
  components: {
    UserUnit,
    vPagination
  },
  data() {
    return {
      users: [],
      page: null,
      per_page: null,
      total: null,
      total_pages: null,
    }
  },
  created() {
    this.retrieveUsers();
  },
  computed: {

  },
  methods: {
    retrieveUsers(page){
      this.$store.dispatch('retrieveUsers', page).then((res) =>{
        this.users = res.data.data;
        this.page  = res.data.page;
        this.per_page  = res.data.per_page;
        this.total  = res.data.total;
        this.total_pages  = res.data.total_pages;
      })
    },
    changeCallback(){
      this.users = [];
      this.retrieveUsers(this.page);
    },

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

.users_container{
  width:100%;
  display:block;
  margin:0 auto;
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

.md-dialog{
  background:#fff;
}

.md-list {
   width: 320px;
   max-width: 100%;
   display: inline-block;
   vertical-align: top;
   border: 1px solid rgba(#000, .12);
 }
</style>
