<template>
  <div>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-card flat height="40"></v-card>
      </v-col>
    </v-row>
    <v-card flat>
      <v-card-title>Class Information</v-card-title>
      <v-divider class="mb-0"></v-divider>
      <v-card-text>
        <v-row v-if="one">
          <v-col cols="12" class="pt-0">
            <h4>Class :</h4>
            <p class="mb-0 pl-4"><b>School Name:</b> {{ one.schoolName }}</p>
            <p class="mb-0 pl-4"><b>Status:</b> {{ one.status }}</p>
            <v-divider></v-divider>
            <h4>Students :</h4>
            <ol type="number" class="pl-4">
              <li v-for="(item, index) in one.studentsInfo" :key="index">
                <p class="mb-0"><b>Roll No:</b> {{ item.rollno }}</p>
                <p class="mb-0">
                  <b>Name:</b> {{ item.firstname }} {{ item.lastname }}
                </p>
                <p class="mb-1">
                  <b>Joining Date:</b> {{ item.dateOfJoining }}
                </p>
                <v-divider></v-divider>
              </li>
            </ol>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn type="button" color="success" small v-on:click="back()">Back</v-btn>
      </v-card-actions>
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
    classId: function () {
      return this.$route.params.classId;
    },
  },
  created() {
    this.$store.dispatch("classOne/fetchRecordForView", {
      classId: this.classId,
    });
  },
  methods: {
    back() {
      this.$router.push({
        name: "ClassListPage",
      });
    },
  },
};
</script>