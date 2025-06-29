using Abp.Domain.Entities;

namespace ToDoList.Lista
{
    public class CarrinhoProduto : Entity<long>
    {
        public long ProdutoId { get; set; }
        public long CarrinhoId { get; set; }
        public int Quantidade { get; set; }
        public long UsuarioId { get; set; }

        public virtual Produto Produto { get; set; }
        public virtual CarrinhoSimulado Carrinho { get; set; }
       // public virtual Usuario Usuario { get; set; }
    }
}
