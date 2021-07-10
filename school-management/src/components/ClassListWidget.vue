<template>
  <div>
    <v-row class="mb-12">
      <v-col cols="12">
        <v-row class="pa-3">
          <slot name="toolbar"></slot>
        </v-row>
        <v-data-table
          v-model="selectedRec"
          :headers="headers"
          :items="list"
          item-key="id"
          class="elevation-1"
          show-select
          single-select
          :items-per-page="itemsPerPage"
          @item-selected="itemSelected"
        >
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "ClassListPage",
  data() {
    return {
      selectedRec: [],
      itemsPerPage: 10,
      headers: [
        {
          text: "Id",
          align: "center",
          sortable: true,
          value: "id",
        },
        {
          text: "School Name",
          align: "center",
          sortable: true,
          value: "schoolName",
        },
        {
          text: "Status",
          align: "center",
          sortable: true,
          value: "status",
        },
      ],
    };
  },
  computed: {
    list: function () {
      return this.$store.state.classList.list;
    }
  },
  methods: {
    setSelected(row) {
      this.selectedRec = row;
    },
    itemSelected(e) {
      this.$emit("itemSelected", e);
    },
  },
  created() {
    this.$store.dispatch("classList/fetchList");
  },
};
</script>
