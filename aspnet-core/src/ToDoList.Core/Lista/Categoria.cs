using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoList.Lista
{
    public class Categoria : Entity<long>
    {
        public string Nome { get; set; }
        public bool Ativo { get; set; }
        public List<Subcategoria> Subcategorias { get; set; }
        public string Descricao { get; set; }

        public string Texto { get; set; }

        public string Detalhamento { get; set; }

        public int SubcategoriasCount { get; set; }
    }
}
