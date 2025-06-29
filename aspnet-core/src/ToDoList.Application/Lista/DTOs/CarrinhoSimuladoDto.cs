using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using ToDoList.Lista;

namespace ToDoList.Lista.DTOs
{
    [AutoMap(typeof(CarrinhoSimulado))]
    public class CarrinhoSimuladoDto : EntityDto<long>
    {
        public DateTime DataCriacao { get; set; } = DateTime.Now;
        public long ProdutoId { get; set; }
        public long UsuarioId { get; set; }
    }
}
