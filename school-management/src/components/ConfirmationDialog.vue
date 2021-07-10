<template>
  <v-container class="py-0 my-0">
    <v-dialog
      v-model="confirmDialog"
      origin="left top"
      hide-overlay
      persistent
      max-width="550px"
      flat
    >
      <v-card tile>
        <v-card-title>
          <v-row no-gutters class="d-flex align-center">
            <v-col cols="11">
              <span
                class="mt-1 mb-0"
              >{{ confirmationDetails.confirmationMessage }}</span>
            </v-col>
            <v-col cols="1" class="text-right">
              <router-link to class="text-decoration-none black--text">
                <div @click="onAction(false)">X</div>
              </router-link>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-actions class="px-4">
          <v-row no-gutters>
            <v-col cols="12">
              <v-hover v-slot="{ hover }">
                <v-btn
                  class="text-uppercase ma-2"
                  tile
                  depressed
                  :outlined="hover"
                  :color="hover?'white':'primary'"
                  :class="hover?'primary--text':'white--text'"
                  @click="onAction(false)"
                >CANCEL</v-btn>
              </v-hover>
              <v-hover v-slot="{ hover }">
                <v-btn
                  class="text-uppercase ma-2"
                  :outlined="hover"
                  :color="hover?'white':'error'"
                  :class="hover?'error--text':'white--text'"
                  tile
                  depressed
                  @click="onAction(true)"
                >OK</v-btn>
              </v-hover>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: 'ConfirmationDialog',
  components: {},
  props: ['confirmationDialog', 'confirmationDetails'],
  computed: {
    confirmDialog: function() {
      return this.confirmationDialog
    }
  },
  methods: {
    onAction: function(action) {
      this.$emit('action-remove', { submit: action })
    }
  }
}
</script>
