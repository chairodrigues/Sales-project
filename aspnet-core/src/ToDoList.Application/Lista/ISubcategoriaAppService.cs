using Abp.Application.Services.Dto;
using Abp.Application.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoList.Lista.DTOs;

namespace ToDoList.Lista
{
    public interface ISubcategoriaAppService : IApplicationService
    {

        PagedResultDto<SubcategoriaDto> GetAll(GetAllSubcategoriaDto input);
        SubcategoriaDto Create(SubcategoriaDto input);
        SubcategoriaDto Update(SubcategoriaDto input);
        void Delete(EntityDto<long> input);
    }
}
