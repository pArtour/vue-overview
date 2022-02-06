<template>
  <q-page class="row">
    <hero-component></hero-component>
  </q-page>
</template>

<script lang="ts">
import HeroComponent from 'src/components/Hero.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: { HeroComponent },
});
</script>
