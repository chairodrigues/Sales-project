using Abp.AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ToDoList.Lista.DTOs
{
    [AutoMap(typeof(Subcategoria))]
    public class GetAllSubcategoriaDto : RequestDto
    {
        public long CategoriaId { get; set; }
    }
}
