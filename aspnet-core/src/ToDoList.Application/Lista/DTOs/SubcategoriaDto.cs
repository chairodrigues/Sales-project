using Abp.AutoMapper;
using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoList.Lista.DTOs
{
    [AutoMap(typeof(Subcategoria))]
    public class SubcategoriaDto : Entity<long>
    {
        public string Nome {  get; set; }
        public bool Ativo { get; set; }
        public string Descricao { get; set; }

        public long CategoriaId {  get; set; }
    }
}
