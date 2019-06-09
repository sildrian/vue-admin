import Vue from "vue";
import Router from "vue-router";
import paths from "./paths";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
import store from './../store';

Vue.use(Router);
const router = new Router({
  base: "/",
  // mode: "hash",//original file
  mode: 'history',
  // linkActiveClass: "active", //original file
  routes: paths
});
// router gards
// router.beforeEach((to, from, next) => {
//   NProgress.start();
//   next();
// });

// // eslint-disable-next-line no-unused-vars
// router.afterEach((to, from) => {
//   NProgress.done();
// });

router.beforeEach((to, from, next) => {
//   // jika routing ada meta auth-nya maka
  if (to.matched.some(record => record.meta.auth)) {
//     // jika user adalah guest
    if(store.getters['auth/guest']){
//       // tampilkan pesan bahwa harus login dulu
      store.dispatch('alert/set', {
        status : true,
        text : 'Login first',
        type : 'error',
      })
//       // store.dispatch('setPrevUrl', to.path)
//       // tampilkan form login
//       // store.dispatch('dialog/setComponent', 'login')
//       // store.dispatch('dialog/setStatus', true)

      window.localStorage.removeItem('vuex');
      // router.push('/login');//old used
      router.push({ path: '/login' });
    }
    else{
      next()
    }
  }
  else{
    next()
  }
})

export default router;
