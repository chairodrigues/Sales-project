/* eslint-disable */
import Http from "@/lib/http";
import util from "@/lib/util";
import actionWrapper from "@/lib/helpers/action-wrapper";

export default {
  namespaced: true,
  state: {
    application: null,
    user: null,
    tenant: null,
    image: null,
  },
  getters: {
    version: (state) => state.application && state.application.version,
    userFullName: (state) => (state.user ? `${state.user.name}` : ""),
  },
  actions: {
    init: actionWrapper({
      async action(content) {
        var tenant = util.abp.multiTenancy.getTenantIdCookie();
        const rep = await Http.get(
          "/api/services/app/Session/GetCurrentLoginInformations",
          {
            headers: {
              "Abp.TenantId": tenant,
            },
          }
        );
        //  Definir Valores da Sessão
        content.state.application = rep.data.result.application;
        content.state.user = rep.data.result.user;
        content.state.tenant = rep.data.result.tenant;
        return rep;
      },
    }),
    carregarPermissoes: actionWrapper({
      async action(context, payload) {
        return await Http.get("/api/services/app/Session/LoadPermissions");
      },
    }),
  },
};

