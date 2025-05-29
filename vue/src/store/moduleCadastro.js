import Http from "@/lib/http";
import util from "@/lib/util";
import actionWrapper from "@/lib/helpers/action-wrapper";

export default {
  namespaced: "ModuleCadastro",
  state: {
    application: null,
  },
  actions: {
    // init: actionWrapper({
    //   async action(content) {
    //     var tenant = util.abp.multiTenancy.getTenantIdCookie();
    //     const rep = await Http.get(
    //       "/api/services/app/Session/GetCurrentLoginInformations",
    //       {
    //         headers: {
    //           "Abp.TenantId": tenant,
    //         },
    //       }
    //     );

    //     content.state.application = rep.data.result.application;
    //     content.state.nome = rep.data.result.nome;
    //     content.state.ativo = rep.data.result.ativo;

    // //     return rep;
    //   },
    // }),

    criarCategoria: actionWrapper({
      async action(context, product) {
        console.log(product);
        return Http.post(`/api/services/app/Categoria/Create`, product);
      },
    }),

    carregarCategoria: actionWrapper({ 
      async action(context, product) {

        return Http.get(`/api/services/app/Categoria/GetAll`, {
          params: {
            search: product.search,
            take: product.take,
            skip: product.skip,
            orderBy: product.orderBy,
            desc: product.desc,
          },
        });
      },
    }),

    getCategoriaById: actionWrapper({
      async action(context, id) {
        return Http.get(`/api/services/app/Categoria/GetCategoriaById`, {
          params: {
            id: id,
          },
        });
      },
    }),

    atualizarCategoria: actionWrapper({
      async action(context, product) {
        return Http.patch(`/api/services/app/Categoria/Update`, product);
      },
    }),

    deletarCategoria: actionWrapper({
      async action(context, product) {
        return await Http.delete(`/api/services/app/Categoria/Delete`, {
          params: {
            id: product,
          },
        });
      },
    }),
  },
};
