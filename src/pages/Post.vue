<template>
  <q-btn
    flat
    color="primary"
    to="/posts"
    label="Back to posts"
    class="q-mb-sm"
  />
  <h2 v-if="loading" class="text-h2">...Loading</h2>
  <div v-if="!loading && post">
    <h2 class="text-h2 q-ma-none q-mb-sm">{{ post.title }}</h2>
    <h2 class="text-subtitle2 q-ma-none q-mb-sm">Post #{{ post.id }}</h2>
    <p class="text-p">{{ post.text }}</p>
  </div>
  <q-btn
    outline
    color="primary"
    :label="editMode ? 'Cancel' : 'Edit'"
    class="q-mb-sm"
    @click="onEditBtnClick"
  />
  <div v-if="editMode" class="q-py-md">
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

interface Options {
  post: null | Post;
  loading: boolean;
  editMode: boolean;
  title: string;
  text: string;
}

export default defineComponent<
  Record<string, unknown>,
  Record<string, unknown>,
  Options,
  { onEditBtnClick: () => any; onSubmit: () => any; onReset: () => any }
>({
  name: 'Post',
  data() {
    return {
      post: null,
      loading: true,
      editMode: false,
      title: '',
      text: '',
    };
  },

  methods: {
    onEditBtnClick() {
      this.editMode = !this.editMode;
      this.title = this.post?.title || '';
      this.text = this.post?.text || '';
    },
    onSubmit() {
      postsService
        .update(this.post!.id, {
          title: this.title,
          text: this.text,
        })
        .then((res: { data: Post }) => {
          this.post = res.data;
          this.editMode = false;
        })
        .catch((err) => console.log(err));
    },

    onReset() {
      this.title = this.post?.title || '';
      this.text = this.post?.text || '';
    },
  },

  mounted() {
    postsService
      .getPost(this.$route.params.id as string)
      .then((res) => {
        this.post = res.data;
        this.loading = false;
        this.title = this.post.title;
        this.text = this.post.text;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
  },
});
</script>
