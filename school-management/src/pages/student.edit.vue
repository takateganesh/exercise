<template>
  <div>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-card flat height="40"></v-card>
      </v-col>
    </v-row>
    <v-card flat>
      <v-card-title> <p class="mb-0">Student Form</p></v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-card-text>
        <StudentFormWidget
          :studentId="studentId"
          @canceled="toPage"
          @submitted="toPage"
        />
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
import StudentFormWidget from "@/components/StudentFormWidget";
import { mapState } from "vuex";

export default {
  name: "StudentEditPage",
  components: {
    StudentFormWidget,
  },
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
    if ("new" == this.studentId) {
      this.$store.dispatch("studentOne/new");
    } else {
      this.$store.dispatch("studentOne/fetchOne", {
        studentId: this.studentId,
      });
    }
  },
  methods: {
    toPage() {
      this.$router.push({
        name: "StudentListPage",
      });
    },
  },
};
</script>