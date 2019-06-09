import axios from "axios";
import { mapGetters, mapActions } from 'vuex';

export default {

  // bookAll(url,header) {
  //     return {
  //       // getOne: ({ id }) => this.$http.get(`${url}/${id}`),
  //       getBooks: (path) => this.$http.get(url+path, header)
  //       // update: (toUpdate) =>  axios.put(url,toUpdate),
  //       // create: (toCreate) =>  axios.put(url,toCreate),
  //       // delete: ({ id }) =>  axios.delete(`${url}/${id}`)
  //     }
  //   }

  // bookApi(url,header) {
  bookApi() {
    return {
      // allBook: path
      // allBook: (path) => axios.get(url+path, header)
      // getOne: ({ id }) => this.$http.get(`${url}/${id}`),
      // getBooks: (path) => this.$http.get(url+path, header)
      // update: (toUpdate) =>  axios.put(url,toUpdate),
      // create: (toCreate) =>  axios.put(url,toCreate),
      // delete: ({ id }) =>  axios.delete(`${url}/${id}`)
    }
  },
  computed:{
    ...mapGetters({
        Books : 'books/bookAll',
    }),
  },
  methods: {
    ...mapActions({
        setBooks : 'books/set',
    }),
    getDatas(dataBooks){
      this.setBooks(dataBooks);
    }
  },
  created(){
    let self=this;
    let url = process.env.VUE_APP_API_URL;
    let goSession = '';
    goSession = JSON.parse(window.localStorage.vuex);
    let config = {
      headers: {
        'Authorization': 'Bearer ' + goSession.auth.user.remember_token,
      },
    }
    let bookApi = axios.get(url+'/books/0/0', config);
    // let bookApi = this.$http.get(url+api.bookApi('/books/0/0').allBook,config);
    bookApi.then( (response) => {
      if(response.status == 200){
        // let getResponse = JSON.parse(JSON.stringify(response.data));
        let getResponse = response.data.data;
        self.getDatas(getResponse);
        // this.allBook = JSON.parse(JSON.stringify(getResponse));
      }
    })
    .catch((error) => {
      let responses = error.response
      this.snackbar = {
        show: true,
        color: 'red',
        text: responses
      };
    }); 
  }
 
  }