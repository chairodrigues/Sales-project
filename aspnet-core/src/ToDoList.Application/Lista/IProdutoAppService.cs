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
    public interface IProdutoAppService : IApplicationService
    {

        PagedResultDto<ProdutoDto> GetAll(RequestDto input);
        ProdutoDto Create(ProdutoDto input);
        ProdutoDto Update(UpdateProdutoDto input);
        void Delete(EntityDto<long> input);
    }
}
