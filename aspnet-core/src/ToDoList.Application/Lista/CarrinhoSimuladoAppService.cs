using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using ToDoList.Lista.DTOs;

namespace ToDoList.Lista
{
    public class CarrinhoSimuladoAppService : ToDoListAppServiceBase, ICarrinhoSimuladoAppService
    {
        private readonly IRepository<CarrinhoSimulado, long> _repository;

        public CarrinhoSimuladoAppService(IRepository<CarrinhoSimulado, long> repository)
        {
            _repository = repository;
        }

        public PagedResultDto<CarrinhoSimuladoDto> GetAll(RequestDto input)
        {
            var query = _repository.GetAll();
            var totalCount = query.Count();
            var items = query.Skip(input.Skip).Take(input.Take).ToList();
            var dtos = ObjectMapper.Map<List<CarrinhoSimuladoDto>>(items);
            return new PagedResultDto<CarrinhoSimuladoDto>(totalCount, dtos);
        }

        public CarrinhoSimuladoDto Create(CarrinhoSimuladoDto input)
        {
            var entity = ObjectMapper.Map<CarrinhoSimulado>(input);
            var id = _repository.InsertAndGetId(entity);
            input.Id = id;
            return input;
        }

        public CarrinhoSimuladoDto Update(CarrinhoSimuladoDto input)
        {
            var entity = _repository.Get(input.Id);
            ObjectMapper.Map(input, entity);
            _repository.Update(entity);
            return ObjectMapper.Map<CarrinhoSimuladoDto>(entity);
        }

        public void Delete(EntityDto<long> input)
        {
            _repository.Delete(input.Id);
        }
    }
}
