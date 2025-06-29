using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ToDoList.Lista.DTOs;

namespace ToDoList.Lista
{
    public interface ICarrinhoProdutoAppService : IApplicationService
    {
        PagedResultDto<CarrinhoProdutoDto> GetAll(RequestDto input);
        CarrinhoProdutoDto Create(CarrinhoProdutoDto input);
        CarrinhoProdutoDto Update(CarrinhoProdutoDto input);
        void Delete(EntityDto<long> input);
    }
}
