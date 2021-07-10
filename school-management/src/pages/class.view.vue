<template>
  <div>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-card flat height="40"></v-card>
      </v-col>
    </v-row>
    <v-card flat>
      <v-card-title> <p class="mb-0">Class Information</p></v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-row no-gutters>
        <v-col cols="12" sm="8">
          <p><b>School Name:</b> </p>
          <p><b>Status:</b> </p>
        <v-divider></v-divider>
        <h3>Class Students</h3>
        <v-divider></v-divider>
        <div>
          <p><b>Roll No:</b> </p>
          <p><b>Name:</b> </p>
          <p><b>Joining Date:</b> </p>
        </div>
      </v-col>
    </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ClassView",
  computed: {
    ...mapState({
      one: (state) => state.classOne.one,
      inProgress: (state) => state.classOne.inProgress,
    }),
    classId: function(){
      return this.$route.params.classId
    }
  },
  created() {
    /*eslint-disable*/
    debugger
    this.$store.dispatch("classOne/fetchRecordForView", {
      classId: this.classId
    });
  },
};
</script>