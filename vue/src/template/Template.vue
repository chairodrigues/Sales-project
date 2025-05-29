<template>
  <div class="d-flex flex-row brighter" style="height: 100%">
    <menu-lateral @isActiveMenu="isActiveMenu = $event"></menu-lateral>
    <div
      class="d-flex flex-column flex-grow-1 wrapperContainer"
      :class="{ active: isActiveMenu }"
    >
      <header-app></header-app>
      <div id="conteudo" class="conteudo">
        <div class="container-limit">
          <transition mode="out-in">
            <router-view :key="$route.path"></router-view>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuLateral from "./menu";
import HeaderApp from "./header";

export default {
  data() {
    return {
      isActiveMenu: false,
    };
  },
  components: {
    MenuLateral,
    HeaderApp,
  },
};
</script>

<style lang="scss" scoped>
.conteudo {
  padding: 0 20px;
  width: 100%;
  height: calc(100vh - 64px);
  overflow: auto;
}
.wrapperContainer {
  width: calc(100vw - 70px);

  &.active {
    width: calc(100vw - 270px);
  }
}
.container-limit {
  width: 100%;
  max-width: 1900px;
}
</style>
