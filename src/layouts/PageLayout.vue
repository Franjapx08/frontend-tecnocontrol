<template>
  <div>
    <!-- <sidebar-partial class="sidebar"></sidebar-partial> -->
    <header-partial>
    </header-partial>
    <v-main>
      <v-container fluid>
        <!-- <breadcrumbs></breadcrumbs> -->
        <slot />
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import HeaderPartial from "../partials/HeaderPartial.vue";
import SidebarPartial from "../partials/SidebarPartial.vue";

export default {
  name: "PageLayout",
  components: {
    HeaderPartial,
    SidebarPartial,
  },
  data() {
    return {
      search: ""
    };
  },
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
