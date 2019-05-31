import App from './App'
import Login from './components/auth/Login'
import Logout from './components/auth/Logout'
import EditUser from './components/EditUser';
import PageNotFound from './components/PageNotFound';
const routes = [
  {
    path: '/',
    name: 'home',
    component: App,
    meta: {
      //define que a rota precisa de autenticaçõo
      requiresAuth: true,
    }
  },
  {
    path: '/users',
    name: 'users',
    component: App,
    meta: {
      //define que a rota precisa de autenticaçõo
      requiresAuth: true,
    }
  },
  {
    path: '/users/:id',
    name: 'editUser',
    component: EditUser,
    meta: {
      //define que a rota precisa de autenticaçõo
      requiresAuth: true,
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '*',
    name: '404',
    component: PageNotFound
  },
]

export default routes
