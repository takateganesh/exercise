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
          <template v-slot:[`item.name`]="{ item }">
            {{ item.firstname }} {{ item.middlename }} {{ item.lastname }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "StudentListPage",
  data() {
    return {
      selectedRec: [],
      itemsPerPage: 10,
      headers: [
        {
          text: "Roll No",
          align: "center",
          sortable: true,
          value: "rollno",
        },
        {
          text: "Name",
          align: "center",
          sortable: true,
          value: "name",
        },
        {
          text: "Join Date",
          align: "center",
          sortable: true,
          value: "dateOfJoining",
        },
      ],
    };
  },
  computed: {
    list: function () {
      return this.$store.state.studentList.list;
    },
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
    this.$store.dispatch("studentList/fetchList");
  },
};
</script>
