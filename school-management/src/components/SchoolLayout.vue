<template>
  <div class="main-body">
    <v-navigation-drawer
      v-model="showMenu"
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
      color="teal darken-3"
      class="white--text"
      :mini-variant="mini"
      :permanent="$vuetify.breakpoint.mdAndUp"
    >
      <v-list class="background-transparent">
        <router-link
          class="sidebar-router-link d-block text-decoration-none my-1"
          to="#"
        >
          <v-list-item class="px-4">
            <v-icon class="white--text">mdi-school</v-icon>
            <v-list-item-title class="ml-3 white--text"
              >School</v-list-item-title
            >
          </v-list-item>
        </router-link>

          <v-hover v-slot:default="{ hover }">
            <router-link
              class="sidebar-router-link d-block text-decoration-none my-1"
              :to="{ name: 'ClassListPage' }"
            >
              <v-list-item
                class="px-4"
                :class="hover ? ' background-purple-light' : 'white--text'"
              >
                <v-icon class="white--text">mdi-home</v-icon>
                <v-list-item-title class="ml-3 white--text"
                  >Class</v-list-item-title
                >
              </v-list-item>
            </router-link>
          </v-hover>
          <v-hover v-slot:default="{ hover }">
            <router-link
              class="sidebar-router-link d-block text-decoration-none my-1"
              :to="{ name: 'StudentListPage' }"
            >
              <v-list-item
                class="px-4"
                :class="hover ? ' background-purple-light' : 'white--text'"
              >
                <v-icon class="white--text">mdi-account-multiple</v-icon>
                <v-list-item-title class="ml-3 white--text"
                  >Students</v-list-item-title
                >
              </v-list-item>
            </router-link>
          </v-hover>
      </v-list>
    </v-navigation-drawer>
    <Header @actionMenu="onAction" />
    <v-content class="fill-height">
      <v-row no-gutters>
        <v-col cols="12" class="fill-height pa-4">
          <router-view></router-view>
          <vue-snotify />
        </v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script>
import Header from "./Header";
export default {
  components: {
    Header,
  },
  name: "SchoolLayout",
  data: () => ({
    showMenu: false,
    mini: false,
  }),
  methods: {
    onAction() {
      this.mini = !this.mini;
    },
  },
};
</script>
<style scoped>
.sidebar-router-link.router-link-exact-active.router-link-active {
  background-color: rgba(213, 213, 218, 0.5) !important;
}

.background-purple-light {
  background-color: rgba(213, 213, 218, 0.5) !important;
}

.background-transparent {
  background-color: transparent !important;
}
</style>
