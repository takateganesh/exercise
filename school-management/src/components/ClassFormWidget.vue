<template>
  <div>
    <v-container v-if="!one">
      <v-row class="text-center">
        <v-col cols="12" v-if="inProgress">
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </v-col>
      </v-row>
    </v-container>

    <v-form v-else @submit="onSubmit" ref="form">
      <v-row no-gutters>
        <v-col cols="12" sm="3">Student</v-col>
        <v-col cols="12" sm="9">
          <v-select
            dense
            outlined
            id="stud"
            return-object
            v-model="students"
            :items="studentList"
            item-text="firstname"
            item-value="id"
            multiple
            :rules="commonValidationRules.requiredRules"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="3">School</v-col>
        <v-col cols="12" sm="9">
          <v-select
            dense
            outlined
            id="school"
            v-model="school_id"
            :items="schoolList"
            item-text="name"
            item-value="id"
            :rules="commonValidationRules.requiredRules"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="3">Status</v-col>
        <v-col cols="12" sm="9">
          <v-text-field
            outlined
            dense
            v-model="status"
            name="status"
            type="url"
            id="status"
            :rules="commonValidationRules.requiredRules"
          ></v-text-field>
        </v-col>
      </v-row>

      <div class="form-action">
        <v-btn
          :disabled="inProgress"
          type="submit"
          color="primary"
          class="float-right"
        >
          <v-progress-circular
            :size="20"
            color="primary"
            indeterminate
            v-if="inProgress"
          ></v-progress-circular
          >Submit
        </v-btn>
        <v-btn type="button" v-on:click="cancel()">Cancel</v-btn>
      </div>
    </v-form>
  </div>
</template>

<script>
import { createHelpers } from "vuex-map-fields";
import { commonValidationRules } from "@/services/util.service";
const { mapFields } = createHelpers({
  getterType: "classOne/getField",
  mutationType: "classOne/updateField",
});

export default {
  name: "ClassFormWidget",
  components: {},
  props: ["classId"],
  data() {
    return {
      commonValidationRules
    };
  },
  computed: {
    ...mapFields([
      "one",
      "one.school_id",
      "one.students",
      "one.status",
      "inProgress",
    ]),
    schoolList: function(){
      return this.$store.state.classList.schoolList;
    },
    studentList: function(){
      return this.$store.state.studentList.list;
    },
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
          await this.$store
            .dispatch("classOne/create")
            .then((flag) => {
              let message = ""
              if(flag.new)
              message = "Class created successfully."
              else
                message = "Class updated successfully."

              this.$snotify.success(message, {
                position: "rightTop",
                showProgressBar: false,
              });
              this.$emit("submitted");
            })
            .catch((error) => {
              this.$snotify.error(error, {
                position: "rightTop",
                showProgressBar: false,
              });
              this.$emit("canceled");
            });
      }
    },
    cancel() {
      this.$emit("canceled", this.one.id);
    },
  },
  created() {
    this.$store.dispatch("classList/fetchSchoolList");
    this.$store.dispatch("studentList/fetchList");
    this.$store.dispatch("classList/fetchList");
  },
};
</script>

