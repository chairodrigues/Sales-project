using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using ToDoList.Lista;

namespace ToDoList.Lista.DTOs
{
    [AutoMap(typeof(CarrinhoProduto))]
    public class CarrinhoProdutoDto : EntityDto<long>
    {
        public long ProdutoId { get; set; }
        public long CarrinhoId { get; set; }
        public int Quantidade { get; set; }
        public long UsuarioId { get; set; }
    }
}
