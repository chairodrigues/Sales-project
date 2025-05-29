using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoList.Lista.DTOs
{
    [AutoMap(typeof(Categoria))]
    public class UpdateCategoriaDto : EntityDto<long>
    {
        public string Nome { get; set; }
        public bool Ativo {  get; set; }

        public string Descricao {  get; set; }

        public string Texto { get; set; }

        public string Detalhamento { get; set; }
    }
}
