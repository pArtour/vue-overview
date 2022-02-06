<template>
  <q-card bordered class="card">
    <q-card-section>
      <div class="text-h6">{{ item.title }}</div>
    </q-card-section>
    <q-card-section> {{ text }} </q-card-section>
    <q-separator dark inset />

    <q-card-actions class="card-actions">
      <q-btn :to="'/posts/' + item.id" color="primary">Show</q-btn>
      <q-btn flat color="primary" @click="$emit('delete', item)">Remove</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Post } from 'src/models/post';

export default defineComponent({
  name: 'PostCard',
  props: ['item'],
  emits: ['delete'],
  computed: {
    text() {
      if ((this.item as Post).text.length > 70) {
        return (this.item as Post).text.substring(0, 70) + '...';
      }
      return (this.item as Post).text;
    },
  },
});
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  display: flex;
  flex-direction: column;

  &-actions {
    margin-top: auto;
  }
  // max-width: 250px;
}
</style>
