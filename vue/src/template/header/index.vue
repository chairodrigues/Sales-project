<template>
  <div class="header d-flex flex-row flex-grow px-6 elevation-3 white">
    <v-btn
      :disabled="show"
      class="flexcol"
      fab
      icon
      medium
      @click="$router.go(-1)"
    >
      <v-icon>mdi-arrow-left</v-icon>
      <span style="font-size: 10px">Voltar</span>
    </v-btn>

    <v-btn
      v-ripple="false"
      v-for="(item, i) in barraTopoItems"
      :key="i"
      class="px-8 mt-2 flexcol"
      text
      fab
      small
      @click="item.clickFunction()"
      :disabled="(item.hasDisabled && item.disabledFunction()) || disableIcons"
    >
      <v-icon :color="item.color">{{ item.icon }}</v-icon>
      <span style="font-size: 10px">{{ item.nome }}</span>
    </v-btn>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    show: true,
    disableIcons: true,
  }),

  computed: {
    barraTopoItems() {
      var icons = this.$store.state.barraTopoItems;
      if (icons == "close") this.disableIcons = true;
      else this.disableIcons = false;
      return icons;
    },
  },

  watch: {
    $route(to, from) {
      to.name === "ViewAdministracao" ? this.show = true : this.show = false;
      this.updateTopBarItems([]);
    },
  },

  mounted() {
    this.$route.name == "ViewAdministracao"
      ? (this.show = true)
      : (this.show = false);
  },
  methods: {
    ...mapActions(["updateTopBarItems"]),
  }
};
</script>

<style lang="scss">
.flexcol .v-btn__content {
  flex-direction: column;
}

.v-btn::before {
  background-color: transparent !important;
}

.header {
  z-index: 500;
}
</style>