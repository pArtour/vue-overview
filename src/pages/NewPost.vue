<template>
  <div>
    <q-btn
      flat
      color="primary"
      class="q-mb-sm"
      to="/posts"
      label="Back to posts"
    />
    <h2 class="text-h2 q-ma-none q-mb-ms">Create new post</h2>
  </div>
  <div class="q-pa-md">
    <q-form ref="form" @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        v-model="title"
        label="Title *"
        hint="Post title"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        type="textarea"
        v-model="text"
        label="Text *"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { Post } from 'src/models/post';
import postsService from 'src/service/posts-service';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NewPost',
  data() {
    return {
      title: '',
      text: '',
    };
  },

  methods: {
    onSubmit() {
      postsService
        .createPost({
          title: this.title,
          text: this.title,
        })
        .then((res: { data: Post }) =>
          this.$router.push(`/posts/${res.data.id}`)
        )
        .catch((err) => console.log(err));
    },

    onReset() {
      this.title = '';
      this.text = '';
    },
  },
});
</script>
