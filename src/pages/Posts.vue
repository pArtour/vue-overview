<template>
  <div>
    <q-btn
      flat
      color="primary"
      class="q-mb-sm"
      to="/posts/new"
      label="Create new Post"
    />
    <h2 class="text-h2 q-ma-none q-mb-lg">Posts List</h2>
    <div class="grid">
      <post-card
        v-for="post in posts"
        :key="post.id"
        :item="post"
        @delete="deletePost"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Post } from 'src/models/post';
import PostCard from 'src/components/PostCard.vue';
import { defineComponent } from 'vue';
import postsService from 'src/service/posts-service';
export default defineComponent({
  name: 'Posts',
  components: { PostCard },

  data() {
    return {
      posts: [] as Post[],
    };
  },
  mounted() {
    postsService
      .getAll()
      .then((res) => (this.posts = res.data))
      .catch((err) => console.log(err));
  },
  methods: {
    deletePost(post: Post) {
      this.posts = this.posts.filter((item) => item.id !== post.id);
      postsService.delete(post.id).catch((err) => console.log(err));
    },
  },
});
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
</style>
