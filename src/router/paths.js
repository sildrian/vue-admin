export default [

  
  // {
  //   path: '*',
  //   meta: {
  //     public: true,
  //   },
  //   redirect: {
  //     path: '/404'
  //   }
  // },  
  {
    path: '*',
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: '/404',
    meta: {
      public: true,
    },
    name: 'NotFound',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/NotFound.vue`
    )
  },
  // {
  //   path: '/403',
  //   meta: {
  //     public: true,
  //   },
  //   name: 'AccessDenied',
  //   component: () => import(
  //     /* webpackChunkName: "routes" */
  //     `@/views/Deny.vue`
  //   )
  // },
  // {
  //   path: '/500',
  //   meta: {
  //     public: true,
  //   },
  //   name: 'ServerError',
  //   component: () => import(
  //     /* webpackChunkName: "routes" */
  //     `@/views/Error.vue`
  //   )
  // },
  {
    path: '/login',
    meta: {
      public: true,
    },
    name: 'Login',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Login.vue`
    )
  },
  {
    path: '/',
    meta: { },
    name: 'Root',
    redirect: {
      name: 'Dashboard'
    }
  },
  {
    path: '/dashboard',
    meta: { breadcrumb: true, auth: true },
    name: 'Dashboard',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Dashboard.vue`
    )
  },
  {
    path: '/media',
    meta: { breadcrumb: true, auth: true },
    name: 'Media',
    // props: (route) => ({ type: route.query.type }),
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Media.vue`
    )
  },  
  {
    path: '/widgets/chart',
    meta: { breadcrumb: true, auth: true },
    name: 'widgets/chart',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/widgets/Chart.vue`
    )
  },
  {
    path: '/widgets/list',
    meta: { breadcrumb: true, auth: true },
    name: 'widgets/list',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/widgets/List.vue`
    )
  },
  {
    path: '/books/list',
    meta: { breadcrumb: true, auth: true },
    name: 'books/list',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/books/List.vue`
    )
  },
  {
    path: '/books/edit/:Bid',
    meta: { breadcrumb: true, auth: true },
    name: 'books/edit',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/books/Edit.vue`
    )
  },
  
];

