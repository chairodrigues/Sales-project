using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using ToDoList.Lista.DTOs;

namespace ToDoList.Lista
{
    public class CarrinhoProdutoAppService : ToDoListAppServiceBase, ICarrinhoProdutoAppService
    {
        private readonly IRepository<CarrinhoProduto, long> _repository;

        public CarrinhoProdutoAppService(IRepository<CarrinhoProduto, long> repository)
        {
            _repository = repository;
        }

        public PagedResultDto<CarrinhoProdutoDto> GetAll(RequestDto input)
        {
            var query = _repository.GetAll();
            var totalCount = query.Count();
            var items = query.Skip(input.Skip).Take(input.Take).ToList();
            var dtos = ObjectMapper.Map<List<CarrinhoProdutoDto>>(items);
            return new PagedResultDto<CarrinhoProdutoDto>(totalCount, dtos);
        }

        public CarrinhoProdutoDto Create(CarrinhoProdutoDto input)
        {
            var entity = ObjectMapper.Map<CarrinhoProduto>(input);
            var id = _repository.InsertAndGetId(entity);
            input.Id = id;
            return input;
        }

        public CarrinhoProdutoDto Update(CarrinhoProdutoDto input)
        {
            var entity = _repository.Get(input.Id);
            ObjectMapper.Map(input, entity);
            _repository.Update(entity);
            return ObjectMapper.Map<CarrinhoProdutoDto>(entity);
        }

        public void Delete(EntityDto<long> input)
        {
            _repository.Delete(input.Id);
        }
    }
}
