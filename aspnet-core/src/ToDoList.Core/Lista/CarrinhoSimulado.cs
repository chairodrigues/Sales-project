using Abp.Domain.Entities;
using System;

namespace ToDoList.Lista
{
    public class CarrinhoSimulado : Entity<long>
    {
        public DateTime DataCriacao { get; set; }
        public long ProdutoId { get; set; }
        public long UsuarioId { get; set; }

        public virtual Produto Produto { get; set; }
        //public virtual Usuario Usuario { get; set; }
    }
}
