<template>
  <div>
    <v-row class="mb-3">
      <v-col cols="12">
        <v-card flat height="40"></v-card>
      </v-col>
    </v-row>
    <v-row class="mb-12">
      <v-col cols="12">
        <ClassListWidget @itemSelected="onItemSelected">
          <template v-slot:toolbar>
            <v-hover v-slot:default="{ hover }">
              <v-btn
                :outlined="hover ? false : true"
                :color="hover ? 'primary' : 'primary'"
                class="mb-2 mr-2"
                :to="{ name: 'ClassEditPage', params: { classId: 'new' } }"
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
                  name: 'ClassViewPage',
                  params: { classId: selectedItem ? selectedItem.id : 'none' },
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
                  name: 'ClassEditPage',
                  params: { classId: selectedItem ? selectedItem.id : 'none' },
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
        </ClassListWidget>
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
import ClassListWidget from "@/components/ClassListWidget";
import ConfirmationDialog from "@/components/ConfirmationDialog";

export default {
  name: "ClassesPage",
  components: { ClassListWidget, ConfirmationDialog },
  computed: {},
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
          "Are you sure you would like to delete this class?",
      };
    },
    deleteSelected(action) {
      if (action.submit) {
        this.$store
          .dispatch("classList/deleteSelected", { id: this.selectedItem.id })
          .then(() => {
            this.$snotify.success("Selected class deleted successfully", {
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
