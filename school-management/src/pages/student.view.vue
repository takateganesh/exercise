<template>
  <div>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-card flat height="40"></v-card>
      </v-col>
    </v-row>
    <v-card flat>
      <v-card-title>Student Information</v-card-title>
      <v-divider class="mb-0"></v-divider>
      <v-card-text>
        <v-row v-if="one">
          <v-col cols="12" class="pt-0">
            <v-list dense class="pl-4">
              <v-list-item><b>Roll No: </b> {{ one.rollno }}</v-list-item>
              <v-list-item>
                <b>Name: </b> {{ one.firstname }} {{ one.middlename }}
                {{ one.lastname }}
              </v-list-item>
              <v-list-item>
                <b>Joining Date: </b> {{ one.dateOfJoining }}
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn type="button" color="success" small v-on:click="back()"
          >Back</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "StudentView",
  computed: {
    ...mapState({
      one: (state) => state.studentOne.one,
      inProgress: (state) => state.studentOne.inProgress,
    }),
    studentId: function () {
      return this.$route.params.studentId;
    },
  },
  created() {
    this.$store.dispatch("studentOne/fetchOne", {
      studentId: this.studentId,
    });
  },
  methods: {
    back() {
      this.$router.push({
        name: "StudentListPage",
      });
    },
  },
};
</script>