<template>
  <v-app>
    <div class="container">
          <component :is="layout">
              <router-view />
          </component>
      </div>
  </v-app>
</template>

<script>
import DefaultLayout from "./layouts/DefaultLayout.vue";
import PageLayout from "./layouts/PageLayout";

const DEFAULT_LAYOUT = "default";

export default {
  components: {
      DefaultLayout,
      PageLayout,
  },
  created() {
  },
  methods: {
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || DEFAULT_LAYOUT}-layout`;
    }
  }
}
</script>
