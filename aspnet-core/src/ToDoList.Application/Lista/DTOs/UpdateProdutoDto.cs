using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoList.Lista.DTOs
{
    [AutoMap(typeof(Produto))]
    public class UpdateProdutoDto : EntityDto<long>
    {
        public string? Nome { get; set; }
        public bool Ativo { get; set; } = true; // Default value for Ativo
        public string Descricao { get; set; }

        public Decimal Preco { get; set; } = 0.0m; // Default value for Preco
        public string ImagemURL { get; set; }

        public DateTime DataCadastro { get; set; } = DateTime.Now; // Default value for DataCadastro
    }
}
