<template>
  <div id="editBooks">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <v-widget title="Edit Book">
            <div slot="widget-content">
              <v-container>
                <v-layout row>
                  <v-form ref="form">
                    <v-layout row>
                      <!-- <v-flex xs4>
                        <v-subheader>Title</v-subheader>
                      </v-flex> -->
                      <v-flex xs12>
                        <v-text-field
                          label="Title"
                          v-model="title"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <!-- <v-flex xs2>
                        <v-subheader>Slug</v-subheader>
                      </v-flex> -->
                      <v-flex xs12>
                        <v-text-field
                          label="Slug"
                          v-model="slug"
                        ></v-text-field>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <v-flex xs2>
                        <v-subheader>Book Image</v-subheader>
                      </v-flex>
                      <!-- <v-flex xs10> -->
                        <v-card>
                          <img v-if="bookImage" :src="bookImage" height="400" width="500"/>
                          <div>
                            <v-text-field label="Select Image" readonly @click='pickFile' v-model='imageName' prepend-icon='attach_file'></v-text-field>
                            <input
                              type="file"
                              style="display: none"
                              ref="image"
                              accept="image/*"
                              @change="onSelectFile"
                            >
                            <!-- <input
                              ref="fileInput"
                              type="file"
                              @change="onSelectFile"
                            > -->
                          </div>
                        </v-card>
                      <!-- </v-flex> -->
                      
                    </v-layout>

                    <v-layout row>
                      <v-flex xs12>
                          <v-card-text>
                            <v-autocomplete
                              v-model="select"
                              :loading="loading"
                              :items="items"
                              :search-input.sync="search"
                              cache-items
                              class="mx-3"
                              flat
                              hide-no-data
                              hide-details
                              label="What state are you from?"
                              solo-inverted
                            ></v-autocomplete>
                          </v-card-text>
                      </v-flex>
                    </v-layout>

                    <v-layout row>
                      <!-- <v-flex xs2>
                        <v-subheader>Description </v-subheader>
                      </v-flex> -->
                      <v-flex xs12>
                        <quill-editor 
                            class="quill"
                            :options="editorOption"
                            v-model="content"
                        >
                        </quill-editor> 
                      </v-flex>
                    </v-layout>
                    <br>
                    <br>
                    <!-- <v-divider class="mt-5"></v-divider> -->
                    <v-card-actions>
                      <v-btn text @click="backMenu">Cancel</v-btn>
                      <!-- <v-spacer></v-spacer> -->
                      <!-- <v-slide-x-reverse-transition>
                        <v-tooltip
                          v-if="formHasErrors"
                          left
                        >
                          <template v-slot:activator="{ on }">
                            <v-btn
                              icon
                              class="my-0"
                              @click="resetForm"
                              v-on="on"
                            >
                              <v-icon>refresh</v-icon>
                            </v-btn>
                          </template>
                          <span>Refresh form</span>
                        </v-tooltip>
                      </v-slide-x-reverse-transition> -->
                      <v-btn color="primary" text @click="submit">Submit</v-btn>
                    </v-card-actions>
                  </v-form>  
                </v-layout>                                 
              </v-container>
            </div>
          </v-widget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import VWidget from '@/components/VWidget';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import { mapActions } from 'vuex';
export default {
  components: {
    VWidget,
    quillEditor
  },
  data () {
    return {
      dataBooks:{},
      bookImage:'',
      title: '',
      slug: '',
      imageName: '',
      imageUrl: '',
      imageFile: '',
      // rules: {
      //   required: (value) => !!value || 'Required.',
      //   email: (value) => {
      //     const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //     return pattern.test(value) || 'Invalid e-mail.';
      //   }    
      // },
      content: 'Insert Description...',
      editorOption: {

      },
      // formHasErrors: false,
      //additional
      loading: false,
        items: [],
        search: null,
        select: null,
        states: [],
        allCities:[],
    };
  },
  mounted() {
    this.getBookData();
    this.getCitiesData();
    // this.getId();
  },
  computed: {
  },  
  methods: {
    // resetForm () {
    //   this.errorMessages = []
    //   this.formHasErrors = false

    //   Object.keys(this.form).forEach(f => {
    //     this.$refs[f].reset()
    //   })
    // },
    pickFile () {
        this.$refs.image.click ()
    },
    ...mapActions({
        setAlert : 'alert/set',
    }),
    getBookData(){
      let url = process.env.VUE_APP_API_URL;
      let goSession = '';
      goSession = JSON.parse(window.localStorage.vuex);
      let config = {
        headers: {
          'Authorization': 'Bearer ' + goSession.auth.user.remember_token,
        },
      }
      this.$http.get(url+'/detailBooks/'+this.$route.params.Bid, config).then(res => {
          if(res.status == 200){
              this.title = res.data.data.title
              this.slug = res.data.data.slug
              this.content = res.data.data.description
              this.bookImage = process.env.VUE_APP_API_PUBLIC_PATH+process.env.VUE_APP_IMAGES+res.data.data.cover
          }
      });
    },
    getCitiesData(){
      let url = process.env.VUE_APP_API_URL;
      let goSession = '';
      goSession = JSON.parse(window.localStorage.vuex);
      let config = {
        headers: {
          'Authorization': 'Bearer ' + goSession.auth.user.remember_token,
        },
      }
      this.$http.get(url+'/cities', config).then(res => {
          if(res.status == 200){
              let dataTempCities = res.data.data
              // this.allCities = JSON.parse(JSON.stringify(res.data.data))
              this.allCities = res.data.data
              // this.states = res.data.data//for state
              for(let i=0;i<dataTempCities.length;i++){
                  this.states[i] = dataTempCities[i].city_name
              }
          }
      });
    },
    submit () {
      let url = process.env.VUE_APP_API_URL;
      let goSession = '';
      goSession = JSON.parse(window.localStorage.vuex);
      let config = {
        headers: {
          'Authorization': 'Bearer ' + goSession.auth.user.remember_token,
          'Content-Type': 'multipart/form-data'
        },
      }
      //cek for id
        let idSelect = '';
        for(let i=0;i<this.allCities.length;i++){
            if(this.select == this.allCities[i].city_name){
              idSelect = this.allCities[i].id
            }
        }
        //cek for id
      let formData = new FormData();
        formData.set('title', this.title);
        formData.set('slug', this.slug);
        formData.set('description', this.content);
        formData.set('id', this.dataBooks.id);
        formData.set('city', idSelect);
        formData.append('book_cover', this.imageFile); 
      this.$http.post(url+'/updateBook', formData, config).then( (res) => {
          if(res.status == 200){
            this.setAlert({
              status : true,
              text : res.message,
              type : 'success',
            })
            this.$router.push('/books/list');
          }else{
            this.setAlert({
              status : true,
              text : res.message,
              type : 'failed',
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
          // console.log(responses)
      })
    },
    backMenu(){
      this.$router.push('/books/list');
    },
    onSelectFile(e) {
      // const file = e.target.files[0];
      // this.uploadImage = e.target.files[0];
      // this.bookImage = URL.createObjectURL(file);
      const files = e.target.files;
      if(files[0] !== undefined) {
        this.imageName = files[0].name
        this.bookImage = URL.createObjectURL(files[0]);//used
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
					this.imageFile = files[0] // this is an image file that can be sent to server... used
				})
			}else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
    },
    querySelections (v) {
      this.loading = true
      // Simulated ajax query
      setTimeout(() => {
        this.items = this.states.filter(e => {//old used
          return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
        });
        this.loading = false
      }, 5000)
    }

  },
  created(){
    let url = process.env.VUE_APP_API_URL;
    let goSession = '';
    goSession = JSON.parse(window.localStorage.vuex);
    let config = {
      headers: {
        'Authorization': 'Bearer ' + goSession.auth.user.remember_token,
      },
    }
    this.$http.get(url+'/detailBooks/'+this.$route.params.Bid, config).then(res => {
        if(res.status == 200){
          this.dataBooks = res.data.data
          // console.log(process.env.VUE_APP_API_PUBLIC_PATH+process.env.VUE_APP_IMAGES+this.dataBooks.cover);
        }
    });
  },
  watch:{
    search (val) {
        val && val !== this.select && this.querySelections(val)
      }
  }
};
</script>
<style lang="stylus" scoped>
  .quill
    height : 220px
</style>