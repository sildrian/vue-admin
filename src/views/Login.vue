<template>
  <v-app id="login" class="primary">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img v-bind:src="computeLogo" alt="Vue Material Admin" width="120" height="120">
                  <h1 class="flex my-4 primary--text">Material Admin Template</h1>
                </div>                
                <v-form ref="form" v-model="valid" lazy-validation>
                  <!-- <meta ref="csrf-token" name="csrf-token" content=""> -->
                  <v-text-field append-icon="person" label="Login" type="text" v-model="email" :rules="emailRules" required></v-text-field>
                  <v-text-field v-model="password" :append-icon="showPassword ? 'visibility' : 'visibility_off'" :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'" label="Password" id="password" hint="At least 6 characters"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon color="blue">fa fa-facebook-square fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="red">fa fa-google fa-lg</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="light-blue">fa fa-twitter fa-lg</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn block color="primary" @click="login" :loading="loading">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
let urlApi = process.env.VUE_APP_API_URL;
export default {
  data: () => ({
    loading: false,
    valid: true,
    email: '',
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /([a-zA-Z0-9_]{1,})(@)([a-zA-Z0-9_]{2,}).([a-zA-Z0-9_]{2,})+/.test(v) || 'E-mail must be valid'],
    showPassword: false,
    password: '',
    passwordRules: [
        v => !!v || 'Password required.',
        v => (v && v.length >= 3) || 'Min 3 characters',],
  }),

  computed:{
        ...mapGetters({
            user : 'auth/user',
        }),
        computeLogo () {
            return process.env.VUE_APP_API_PUBLIC_PATH+process.env.VUE_APP_IMAGES+'/favicon.ico';
        },
    },

  methods: {
    ...mapActions({
        setAlert : 'alert/set',
        setAuth : 'auth/set',
    }),
    login () {
      this.loading = true;
      // setTimeout(() => {
          if (this.$refs.form.validate()) {
                let formData = {
                  'email' : this.email,
                  'password' : this.password
                }
                this.$http.post(urlApi+'/login', formData)
                // this.$http.get(urlApi+'/masuk?email='+this.email+'&password='+this.password)
                .then( (response) => {
                    let data_user = response.data.data
                    this.setAuth(data_user)
                    if(this.user.id>0){
                        this.setAlert({
                            status : true,
                            text : 'Login success',
                            type : 'success',
                        })

                        this.$router.push('/dashboard');
                        
                        // this.setStatusDialog(false)
                        // if(this.prevUrl.length>0) this.$router.push(this.prevUrl) //tambahkan ini
                        // this.close()
                    }
                    else{
                        this.setAlert({
                          status : true,
                          text : 'Login error',
                          type : 'error',
                        })
                    }
                })
                .catch((error) => {
                    let responses = error.response
                    this.setAlert({
                        status : true,
                        text : responses,
                        type : 'error',
                    })
                })
            }
        // this.$router.push('/dashboard');
      // }, 3000);
    }
  }

};
</script>
<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: 0;
  }
</style>
