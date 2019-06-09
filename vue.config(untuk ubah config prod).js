module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
      ? 'http://localhost/production_vuelaravel'
      : '/'
  }