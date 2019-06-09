<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <!-- <v-flex sm12>
            <h3>Book List</h3>
            </v-flex>         -->
            <v-flex lg12>
            <v-card>
                <v-toolbar card color="white">
                <v-text-field
                flat
                solo
                prepend-icon="search"
                placeholder="Type something"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
                ></v-text-field>     
                <v-btn icon>
                    <v-icon>filter_list</v-icon>
                </v-btn>         
                </v-toolbar>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                <v-data-table
                    :headers="complex.headers"
                    :search="search"
                    :items="complex.items"
                    :rows-per-page-items="[10,25,50,{text:'All','value':-1}]"
                    class="elevation-1"
                    item-key="title"
                    select-all
                    v-model="complex.selected"
                    >
                    <template slot="items" slot-scope="props">
                    <td>
                    <v-checkbox
                        primary
                        hide-details
                        v-model="props.selected"
                    ></v-checkbox>
                    </td>              
                    <td>
                        <v-avatar size="32">
                        <img :src="getImage(props.item.cover)" alt="">
                        </v-avatar> 
                    </td>
                    <td>{{ props.item.title }}</td>
                    <td>{{ props.item.description.replace(/<\/?[^>]+(>|$)/g, "") }}</td>
                    <td>{{ props.item.author }}</td>
                    <td>
                        <v-btn depressed outline icon fab dark color="primary" @click="edit(props.item.id)" small>
                        <v-icon>edit</v-icon>
                        </v-btn>
                        <v-btn depressed outline icon fab dark color="pink" small>
                        <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                    </template>
                </v-data-table>
                </v-card-text>
            </v-card>
            </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
// import { Items as Users } from '@/api/user';
// import store from '@/store';

export default {
  data () {
    return {
      search: '',
      complex: {
        selected: [],
        headers: [
          {
            text: 'Cover',
            value: 'cover'
          },
          {
            text: 'Title',
            value: 'title'
          },
          {
            text: 'Description',
            value: 'description'
          },
          {
            text: 'Author',
            value: 'author'
          },
          {
            text: 'Action',
            value: ''
          },
        ],
        items: [] 
        // items: Users
      }
    };
  },
  mounted() {
    let url = process.env.VUE_APP_API_URL;
    let goSession = '';
    goSession = JSON.parse(window.localStorage.vuex);
    let config = {
      headers: {
        'Authorization': 'Bearer ' + goSession.auth.user.remember_token,
      },
    }
    this.$http.get(url+'/books/0/0', config).then(res => {
        this.complex.items = res.data.data
    })
  },
  methods:{
    edit(bookId){
      this.$router.push({name:'books/edit',params:{Bid:bookId}});
    }
  }  
};
</script>