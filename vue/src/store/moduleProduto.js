import Http from "@/lib/http";
import util from "@/lib/util";
import actionWrapper from "@/lib/helpers/action-wrapper";

export default {
  namespaced: "ModuleProduto",
  state: {
    produtos: [],
  },
  actions: {
    criarProduto: actionWrapper({
      async action(context, produto) {
        return Http.post(`/api/services/app/Produto/Create`, produto);
      },
    }),
    carregarProdutos: actionWrapper({
      async action(context, filtro) {
        return Http.get(`/api/services/app/Produto/GetAll`, {
          params: filtro,
        });
      },
    }),
    getProdutoById: actionWrapper({
      async action(context, id) {
        return Http.get(`/api/services/app/Produto/GetById`, { params: { id } });
      },
    }),
    atualizarProduto: actionWrapper({
      async action(context, produto) {
        return Http.patch(`/api/services/app/Produto/Update`, produto);
      },
    }),
    deletarProduto: actionWrapper({
      async action(context, id) {
        return Http.delete(`/api/services/app/Produto/Delete`, { params: { id } });
      },
    }),
  },
};