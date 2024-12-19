<template>
  <div>
    <header-partial></header-partial>
    <v-main>
      <v-container >
        <!-- fill-height grid-list-xl text-xs-center class="mt-1 pt-5" -->
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import HeaderPartial from "../partials/HeaderPartial.vue";
export default {
  name: "DefaultLayout",
  components: {
    HeaderPartial
  }
};
</script>
