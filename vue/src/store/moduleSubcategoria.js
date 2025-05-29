import Http from "@/lib/http";
import util from "@/lib/util";
import actionWrapper from "@/lib/helpers/action-wrapper";

export default {
  namespaced: "ModuleSubcategoria",
  state: {
    application: null,
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
       
        content.state.application = rep.data.result.application;
        content.state.nome = rep.data.result.nome;
        //content.state.ativo = rep.data.result.ativo; 
        content.state.categoriaId = rep.data.result.categoriaId;
        return rep;
      },
    }),

    criarSubcategoria: actionWrapper({
        async action(context, productsub) {
          console.log(productsub);
          return Http.post(`/api/services/app/Subcategoria/Create`, productsub);
        },
      }),
      

    carregarSubcategoria: actionWrapper({
      async action(context, productsub) {
        return Http.get(`/api/services/app/Subcategoria/GetAll`, 
          {
            params: {
              search: productsub.search,
              take: productsub.take,
              skip: productsub.skip,
              orderBy : productsub.orderBy,
              desc : productsub.desc,
              categoriaId : productsub.categoriaId,
            },
          },
        );
      },
    }),

    atualizarSubcategoria: actionWrapper({
        async action(context, productsub) {
          return Http.patch(`/api/services/app/Subcategoria/Update`, productsub);
        },
      }),
 
    deletarSubcategoria: actionWrapper({
        async action(context, productsub) {
          return await Http.delete(`/api/services/app/Subcategoria/Delete`, {
              params: {
                id: productsub,
              },
            },
          );
        },
      }), 
  },
};