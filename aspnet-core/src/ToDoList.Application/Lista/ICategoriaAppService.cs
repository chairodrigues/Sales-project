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
    public interface ICategoriaAppService : IApplicationService
    {

        PagedResultDto<CategoriaDto> GetAll(RequestDto input);
        CategoriaDto Create(CategoriaDto input);
        CategoriaDto Update(UpdateCategoriaDto input);
        void Delete(EntityDto<long> input);
    }
}
