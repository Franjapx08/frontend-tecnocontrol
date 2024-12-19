<template>
  <v-app-bar color="primary" prominent >
    <!-- <v-app-bar-nav-icon @click="drawer()"></v-app-bar-nav-icon> -->
    <v-toolbar-title>TECNOCONTROL</v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "HeaderPartial",
  methods: {
    ...mapActions(["toggleDrawer"]),
    drawer() {
      this.toggleDrawer(!this.getDrawer);
    }
  },
  computed: {
    ...mapGetters(["getDrawer"]),
  }
};
</script>