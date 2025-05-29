<template>
  <v-navigation-drawer
    app
    mini-variant
    mini-variant-width="46"
    permanent
    expand-on-hover
  ><v-row
        class="d-flex flex-row mb-6"
        ></v-row>
    <v-list-item>
      <v-list-item-avatar>
        <v-img src="@/assets/Dwight_Schrute.png"> </v-img>
      </v-list-item-avatar>
      <v-list-item-title> Dwight Schrute </v-list-item-title> 
      <v-icon> chevron_left</v-icon>
    </v-list-item>
    <div></div>
    <v-list nav dense>
      <router-link class="routerDecoration" to="/">
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>settings</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Cadastros</v-list-item-title>
        </v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>


<script>
export default {
  name: "App",
  components: {},
  data: () => ({}),
};
</script>

<style scoped>
.routerDecoration {
  text-decoration: none;
}
</style>