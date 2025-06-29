import Http from "@/lib/http";
import util from "@/lib/util";
import actionWrapper from "@/lib/helpers/action-wrapper";


export default {
  namespaced: "ModuleCarrinhoSimulado",
  state: {
    carrinhosSimulados: [],
  },
  actions: {
    criarCarrinhoSimulado: actionWrapper({
      async action(context, carrinhoSimulado) {
        return Http.post(`/api/services/app/CarrinhoSimulado/Create`, carrinhoSimulado);
      },
    }),
    carregarCarrinhosSimulados: actionWrapper({
      async action(context, filtro) {
        return Http.get(`/api/services/app/CarrinhoSimulado/GetAll`, {
          params: filtro,
        });
      },
    }),
    getCarrinhoSimuladoById: actionWrapper({
      async action(context, id) {
        return Http.get(`/api/services/app/CarrinhoSimulado/GetById`, { params: { id } });
      },
    }),
    atualizarCarrinhoSimulado: actionWrapper({
      async action(context, carrinhoSimulado) {
        return Http.patch(`/api/services/app/CarrinhoSimulado/Update`, carrinhoSimulado);
      },
    }),
    deletarCarrinhoSimulado: actionWrapper({
      async action(context, id) {
        return Http.delete(`/api/services/app/CarrinhoSimulado/Delete`, { params: { id } });
      },
    }),
  },
};