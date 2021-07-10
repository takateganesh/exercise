<template>
  <div>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-card flat height="40"></v-card>
      </v-col>
    </v-row>
    <v-row class="mb-12">
      <v-col cols="12">
        <StudentListWidget @itemSelected="onItemSelected">
          <template v-slot:toolbar>
            <v-hover v-slot:default="{ hover }">
              <v-btn
                :outlined="hover ? false : true"
                :color="hover ? 'primary' : 'primary'"
                class="mb-2 mr-2"
                :to="{ name: 'StudentEditPage', params: { studentId: 'new' } }"
                tile
                >New</v-btn
              >
            </v-hover>

            <v-hover v-slot:default="{ hover }">
              <v-btn
                :outlined="hover ? false : true"
                :color="hover ? 'primary' : 'primary'"
                :disabled="selectedItem == null"
                class="mb-2 mr-2"
                :to="{
                  name: 'StudentViewPage',
                  params: {
                    studentId: selectedItem ? selectedItem.id : 'none',
                  },
                }"
                tile
                >View</v-btn
              >
            </v-hover>

            <v-hover v-slot:default="{ hover }">
              <v-btn
                :disabled="selectedItem == null"
                :outlined="hover ? false : true"
                :color="hover ? 'primary' : 'primary'"
                class="mb-2 mr-2"
                :to="{
                  name: 'StudentEditPage',
                  params: {
                    studentId: selectedItem ? selectedItem.id : 'none',
                  },
                }"
                tile
                >Edit</v-btn
              >
            </v-hover>
            <v-hover v-slot:default="{ hover }">
              <v-btn
                :disabled="selectedItem == null"
                :outlined="hover ? false : true"
                :color="hover ? 'error' : 'error'"
                class="mb-2 mr-2"
                @click="confirmDelete()"
                tile
                >Delete</v-btn
              >
            </v-hover>
          </template>
        </StudentListWidget>
      </v-col>
    </v-row>
    <ConfirmationDialog
      :confirmation-dialog="confirmationDialogFlag"
      :confirmation-details="confirmation"
      @action-remove="deleteSelected"
    ></ConfirmationDialog>
  </div>
</template>

<script>
import StudentListWidget from "@/components/StudentListWidget";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default {
  name: "StudentsPage",
  components: { StudentListWidget, ConfirmationDialog },
  data() {
    return {
      selectedItem: null,
      confirmationDialogFlag: false,
      confirmation: {
        confirmationMessage: "",
      },
    };
  },
  methods: {
    onItemSelected(selectionEvent) {
      this.selectedItem = selectionEvent.value ? selectionEvent.item : null;
    },
    confirmDelete() {
      this.confirmationDialogFlag = true;
      this.confirmation = {
        confirmationMessage:
          "Are you sure you would like to delete this student?",
      };
    },
    deleteSelected(action) {
      if (action.submit) {
        this.$store
          .dispatch("studentList/deleteSelected", { id: this.selectedItem.id })
          .then(() => {
            this.$snotify.success("Selected student deleted successfully", {
              position: "rightTop",
              showProgressBar: false,
            });
            this.selectedItem = null;
          })
          .catch((error) => {
            this.$snotify.error(error);
          });
      }
      this.confirmationDialogFlag = false;
      this.confirmation = {
        confirmationMessage: "",
      };
    },
  },
};
</script>
