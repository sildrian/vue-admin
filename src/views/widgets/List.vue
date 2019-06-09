<template>
  <div id="widgets">
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
          <v-flex lg12 sm12 xs12>
            <post-list-card :items="posts"></post-list-card>
          </v-flex>
        </v-layout>
      </v-container>
  </div>
</template>

<script>
import { getPost } from '@/api/post';
import PostListCard from '@/components/widgets/card/PostListCard';
export default {
  components: {
    PostListCard
  },
  data () {
    return {
    };
  },
  computed: {
    posts () {
      return getPost();
    }
  },
  methods: {
    handleClick: (e) => {
      console.log(e);
    }
  },
  
};
</script>