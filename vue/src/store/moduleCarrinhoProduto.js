import Http from "@/lib/http";
import util from "@/lib/util";
import actionWrapper from "@/lib/helpers/action-wrapper";


export default {
  namespaced: "ModuleCarrinhoProduto",
  state: {
    carrinhoProdutos: [],
  },
  actions: {
    criarCarrinhoProduto: actionWrapper({
      async action(context, carrinhoProduto) {
        return Http.post(`/api/services/app/CarrinhoProduto/Create`, carrinhoProduto);
      },
    }),
    carregarCarrinhoProdutos: actionWrapper({
      async action(context, filtro) {
        return Http.get(`/api/services/app/CarrinhoProduto/GetAll`, {
          params: filtro,
        });
      },
    }),
    getCarrinhoProdutoById: actionWrapper({
      async action(context, id) {
        return Http.get(`/api/services/app/CarrinhoProduto/GetById`, { params: { id } });
      },
    }),
    atualizarCarrinhoProduto: actionWrapper({
      async action(context, carrinhoProduto) {
        return Http.patch(`/api/services/app/CarrinhoProduto/Update`, carrinhoProduto);
      },
    }),
    deletarCarrinhoProduto: actionWrapper({
      async action(context, id) {
        return Http.delete(`/api/services/app/CarrinhoProduto/Delete`, { params: { id } });
      },
    }),
  },
};