
// import store from './store';
export default [
    {
      name: 'APP_LOGIN_SUCCESS',
      callback: function () {
        this.$router.push({ path: 'dashboard' });
      }
    },
    {
      name: 'APP_LOGOUT',
      callback: function () {
        let url = process.env.VUE_APP_API_URL;
        let goSession = '';
        goSession = JSON.parse(window.localStorage.vuex);
        let config = {
          headers: {
            'Authorization': 'Bearer ' + goSession.auth.user.remember_token,
          },
        }
        //for hit api logout
          this.$http.get(url+'/logout', config)
          .then((response) => {
            // let data_user = response.data.data
              // this.setAuth({}); // kosongkan auth ketika logout
              // this.snackbar = {
              //   show: true,
              //   color: 'green',
              //   text: 'logout successfuly'
              // };
              this.setAlert({
                status : true,
                text : 'logout successfuly',
                type : 'success',
              })
              window.localStorage.removeItem('vuex'); //clear localstorage
              // eslint-disable-next-line no-console
              console.log(response);
          })
          .catch((error) => {
            let responses = error.response;
              this.snackbar = {
                show: true,
                color: 'red',
                text: 'logout failed'
              };
              // eslint-disable-next-line no-console
              console.log(responses);
          })
        //for hit api logout
        this.$router.replace({ path: '/login' });
      }
    },
    {
      name: 'APP_PAGE_LOADED',
      callback: function () {
      }
    },
    {
      name: 'APP_AUTH_FAILED',
      callback: function () {
        this.$router.push('/login');
        this.$message.error('Token has expired');
      }
    },
    {
      name: 'APP_BAD_REQUEST',
      // @error api response data
      callback: function (msg) {
        this.$message.error(msg);
      }
    },
    {
      name: 'APP_ACCESS_DENIED',
      // @error api response data
      callback: function (msg) {
        this.$message.error(msg);
        this.$router.push('/forbidden');
      }
    },
    {
      name: 'APP_RESOURCE_DELETED',
      // @error api response data
      callback: function (msg) {
        this.$message.success(msg);
      }
    },
    {
      name: 'APP_RESOURCE_UPDATED',
      // @error api response data
      callback: function (msg) {
        this.$message.success(msg);
      }
    },
    {
      name: 'APP_PROFILE',
      callback: function () {
        // this.snackbar = {
        //   show: true,
        //   color: 'green',
        //   text: 'This is profile.'
        // };

      }
    }
  ];
  