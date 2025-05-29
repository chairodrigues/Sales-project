import Util from "@/lib/util";
import { appRouters } from "@/router";

export default {
  namespaced: true,
  state: {
    mainLoading: false,
    cachePage: [],
    lang: "",
    isFullScreen: false,
    openedSubmenuArr: [],
    menuTheme: "dark",
    themeColor: "",
    pageOpenedList: [
      {
        meta: { title: "HomePage" },
        path: "",
        name: "home",
      },
    ],
    currentPageName: "",
    currentPath: [
      {
        meta: { title: "HomePage" },
        path: "",
        name: "home",
      },
    ],
    menuStatus: true,
    menuList: [],
    routers: [],
    tagsList: [],
    messageCount: 0,
    dontCache: [],
    noticeList: [],
    cidades: [],
  },
  mutations: {
    setMainLoading (state, value) {
      state.mainLoading = value
    },
    changeMenuStatus (state) {
      state.menuStatus != state.menuStatus;
    },
    logout () {  
      Util.abp.auth.clearToken();     
      window.location.href = "/";
    },
   
    initCachepage (state) {
      if (localStorage.cachePage) {
        state.cachePage = JSON.parse(localStorage.cachePage);
      }
    },
    updateMenulist (state) {
      let menuList = [];
      appRouters.forEach((item) => {
        if (item.permission !== undefined) {
          let hasPermissionMenuArr = [];
          hasPermissionMenuArr = item.children.filter((child) => {
            if (child.permission !== undefined) {
              if (Util.abp.auth.hasPermission(child.permission)) {
                return child;
              }
            } else {
              return child;
            }
          });
          if (hasPermissionMenuArr.length > 0 && item.meta.ignore !== true) {
            item.children = hasPermissionMenuArr;
            menuList.push(item);
          }
        } else {
          if (item.children.length === 1) {
            menuList.push(item);
          } else {
            let len = menuList.push(item);
            let childrenArr = [];
            childrenArr = item.children.filter((child) => {
              return child;
            });
            let handledItem = JSON.parse(JSON.stringify(menuList[len - 1]));
            handledItem.children = childrenArr;
            menuList.splice(len - 1, 1, handledItem);
          }
        }
      });
      state.menuList = menuList;
    },
    setCurrentPageName (state, name) {
      state.currentPageName = name;
    },
    pageOpenedList (state, get) {
      let openedPage = state.pageOpenedList[get.index];
      if (get.argu) {
        openedPage.argu = get.argu;
      }
      if (get.query) {
        openedPage.query = get.query;
      }
      state.pageOpenedList.splice(get.index, 1, openedPage);
      localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
    },
  },
};
