import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import App from "@/store/app.js";
import Session from "@/store/session.js";
import ModuleCadastro  from "@/store/moduleCadastro.js"; 
import ModuleSubcategoria  from "@/store/moduleSubcategoria.js";

export default new Vuex.Store({
  state: {
    globalLoading: false,
    filterIsOpen: false,
    barraTopoItems: [],
  },
  mutations: {
    OPEN_FILTER(state) {
      state.filterIsOpen = true;
    },

    CLOSE_FILTER(state) {
      state.filterIsOpen = false;
    },
  },
  actions: {
    updateTopBarItems(context, payload) {
      context.state.barraTopoItems = payload;
    },
    changeGlobalLoading(context, payload) {
      context.state.globalLoading = payload;
    },
    handleFilter(context, payload) {
      if (payload == "open") {
        context.commit("OPEN_FILTER");
      }

      if (payload == "close") {
        context.commit("CLOSE_FILTER");
      }
    },
  },
  modules: {
    App,
    Session,
    ModuleCadastro, 
    ModuleSubcategoria,
  },
});
