using Abp.Application.Services;
using Abp.Application.Services.Dto;
using ToDoList.Lista.DTOs;

namespace ToDoList.Lista
{
    public interface ICarrinhoSimuladoAppService : IApplicationService
    {
        PagedResultDto<CarrinhoSimuladoDto> GetAll(RequestDto input);
        CarrinhoSimuladoDto Create(CarrinhoSimuladoDto input);
        CarrinhoSimuladoDto Update(CarrinhoSimuladoDto input);
        void Delete(EntityDto<long> input);
    }
}
