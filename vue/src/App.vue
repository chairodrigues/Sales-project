<template>
  <v-app>
    <MenuLateral/>
    <v-main>
      <router-view class="pa-0 mt-4 ma-0 px-4"></router-view>
    </v-main>
  </v-app>
</template>


<script>
import MenuLateral from "@/components/shared/menuLateral.vue";
export default {
  name: "App",
  components: { MenuLateral },
  data: () => ({}),
};
</script>



<style lang="scss">

.v-enter,
.v-leave-to {
  transform: translate3d(-5px, 0, 0);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #813a83;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #5f2661;
}

.titulo {
  color: #3a5383;
  font-size: 24px;
  font-family: Open Sans;
  font-weight: 700;
}

/*
input[type="text"] {
  text-transform: capitalize;
}

 .textarea-uppercase textarea {
  text-transform: uppercase;
}
*/
.v-btn {
  text-transform: unset !important;
}
</style>
