<template>
  <v-navigation-drawer app color="sidebar" v-model="drawer" >
    <v-list>
      <v-list-item>
        <v-list-item-avatar>
        </v-list-item-avatar>
        <v-list-item-title style="margin: 10px;">Opciones</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    
    <v-list>
      <div v-for="(item, index) in menuItems">
          <v-list-item :to="item.path" v-if="item.meta.layout">
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SidebarPartial",
  components: {},
  data() {
    return {
      search: "",
      menuItems: [
        {
          title: "Unidades",
          icon: "mdi-truck-outline",
          path: "/",
          meta: {
            layout: 'page'
          }
        },
        {
          title: "Reportes",
          icon: "mdi-file-chart-outline",
          path: "/reports",
          meta: {
            layout: 'page'
          }
        }
      ]
    };
  },
  created(){
    
  },
  methods:{
   
  },
  computed: {
    ...mapGetters(["getDrawer"]),
    drawer: {
      get() {
        return this.getDrawer;
      },
      set(newVal) {
        this.$store.dispatch("toggleDrawer", newVal);
      }
    }
  }
};
</script>

<style>
/*.v-list-logo {
  border-radius: 0;
}
.v-list-group__header {
  padding-left: 16px; 
}

.v-list-item {
  padding-left: 16px; 
}*/
</style>