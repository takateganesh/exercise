<template>
  <div>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-card flat height="40"></v-card>
      </v-col>
    </v-row>
    <v-card flat>
      <v-card-title> <p class="mb-0">Class Form</p></v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-card-text>
        <ClassFormWidget
          :classId="classId"
          @canceled="toPage"
          @submitted="toPage"
        />
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import ClassFormWidget from "@/components/ClassFormWidget";
import { mapState } from "vuex";

export default {
  name: "ClassEditPage",
  components: {
    ClassFormWidget,
  },
  computed: {
    ...mapState({
      one: (state) => state.classOne.one,
      inProgress: (state) => state.classOne.inProgress,
    }),
    classId: function () {
      return this.$route.params.classId;
    },
  },
  created() {
    if ("new" == this.classId) {
      this.$store.dispatch("classOne/new");
    } else {
      this.$store.dispatch("classOne/fetchOne", {
        classId: this.classId,
      });
    }
  },
  methods: {
    toPage() {
      this.$router.push({
        name: "ClassListPage",
      });
    },
  },
};
</script>