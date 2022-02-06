<template>
  <div>
    <h1>Hello! Welcome to blog app!</h1>
    <q-btn to="posts" label="See posts" outline color="primary" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeroComponent',
});
</script>
