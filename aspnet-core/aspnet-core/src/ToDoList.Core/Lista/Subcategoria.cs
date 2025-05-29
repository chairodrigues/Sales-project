using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoList.Lista
{
    public class Subcategoria : Entity<long>
    {
        public string Nome { get; set; }
        public bool Ativo { get; set; }
        public Categoria Categoria { get; set; }
        public long CategoriaId { get; set; }

        public string Descricao { get; set; }
    }
}
