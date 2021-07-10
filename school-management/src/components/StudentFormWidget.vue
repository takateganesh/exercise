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
        <v-col cols="12" sm="3">Roll No</v-col>
        <v-col cols="12" sm="9">
          <v-text-field
            outlined
            dense
            v-model="rollno"
            name="rollno"
            type="text"
            id="rollno"
            :rules="commonValidationRules.requiredRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">First Name</v-col>
        <v-col cols="12" sm="9">
          <v-text-field
            outlined
            dense
            v-model="firstname"
            name="firstname"
            type="text"
            id="firstname"
            :rules="commonValidationRules.requiredRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">Middle Name</v-col>
        <v-col cols="12" sm="9">
          <v-text-field
            outlined
            dense
            v-model="middlename"
            name="middlename"
            type="url"
            id="middlename"
            :rules="commonValidationRules.requiredRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">Last Name</v-col>
        <v-col cols="12" sm="9">
          <v-text-field
            outlined
            dense
            v-model="lastname"
            name="lastname"
            type="url"
            id="lastname"
            :rules="commonValidationRules.requiredRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="3">Date Of Joining</v-col>
        <v-col cols="12" sm="9">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dateOfJoining"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateOfJoining"
                append-icon="mdi-calendar"
                readonly
                outlined
                dense
                v-bind="attrs"
                v-on="on"
                :rules="commonValidationRules.requiredRules"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateOfJoining" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(dateOfJoining)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
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
  getterType: "studentOne/getField",
  mutationType: "studentOne/updateField",
});

export default {
  name: "StudentFormWidget",
  data() {
    return {
      commonValidationRules,
      menu: false,
    };
  },
  computed: {
    ...mapFields([
      "one",
      "one.rollno",
      "one.lastname",
      "one.middlename",
      "one.firstname",
      "one.dateOfJoining",
      "inProgress",
    ]),
  },
  methods: {
    async onSubmit(e) {
      e.preventDefault();
      if (this.$refs.form.validate()) {
        await this.$store
          .dispatch("studentOne/create")
          .then((flag) => {
            let message = "";
            if (flag.new)
              message = "Student created successfully. Please see the console";
            else message = "Student updated successfully.";

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
};
</script>