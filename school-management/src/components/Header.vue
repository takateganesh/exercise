  <template>
  <v-app-bar
    flat
    :clipped-left="$vuetify.breakpoint.mdAndUp"
    app
    color="teal darken-3"
    dark
  >
    <v-app-bar-nav-icon @click="menuAction()" />
    <v-spacer></v-spacer>
  </v-app-bar>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    menuAction() {
      this.$emit("actionMenu");
    },
  },
};
</script>