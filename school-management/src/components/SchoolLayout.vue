<template>
  <div class="main-body">
   <v-content class="fill-height">
     <v-row no-gutters>
      <v-col cols="12" class="fill-height pa-4">
        <router-view></router-view>
        <vue-snotify />
      </v-col>
     </v-row>
    </v-content>
  </div>
</template>

<script>
export default {
  name: "SchoolLayout",
};
</script>
