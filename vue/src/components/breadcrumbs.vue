<template>
  <v-row no-gutters >
    <v-breadcrumbs :items="breadcrumbList" divider=">" large class="ma-0 pa-0" self-align/>
  </v-row>
</template>
  
  <script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      breadcrumbList: [],
    };
  },
  mounted() {
    this.updateList();
  },
  watch: {
    $router() {
      this.updateList();
    },
  },
  methods: {
    routeTo(pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link)
        this.$router.push(this.breadcrumbList[pRouteTo].link);
    },
    updateList() {
      this.breadcrumbList = this.$router.currentRoute.meta.breadcrumb;
    },
  },
};
</script>
 
