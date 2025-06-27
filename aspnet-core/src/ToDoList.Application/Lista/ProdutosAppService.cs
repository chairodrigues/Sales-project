using Abp.Application.Services.Dto;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using AutoMapper.Internal.Mappers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using ToDoList.Lista.DTOs;
using Microsoft.EntityFrameworkCore;
using Abp.Linq.Extensions;

namespace ToDoList.Lista
{
    public class ProdutoAppService : ApplicationService, IProdutoAppService
    {
        private readonly IRepository<Produto, long> _repository;

        public ProdutoAppService(IRepository<Produto, long> repository)
        {
            _repository = repository;
        }

        public ProdutoDto Create(ProdutoDto input)
        {
            var Produto = ObjectMapper.Map<Produto>(input);
            Produto = _repository.Insert(Produto);

            return ObjectMapper.Map<ProdutoDto>(Produto);
        }

        [HttpPatch]
        public ProdutoDto Update(UpdateProdutoDto input)
        {
            var Produto = ObjectMapper.Map<Produto>(input);
            Produto = _repository.Update(Produto);

            return ObjectMapper.Map<ProdutoDto>(Produto);
        }

        public PagedResultDto<ProdutoDto> GetAll(RequestDto input)
        {
            var queryProduto = GetQuery(input);
            int totalCount = queryProduto.Count();
            var Produto = queryProduto
                .Skip(input.Skip)
                .Take(input.Take)
                .ToList();

            return new PagedResultDto<ProdutoDto>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<ProdutoDto>>(Produto)
            };
        }

        private IQueryable<Produto> GetQuery(RequestDto request)
        {
            int.TryParse(request.Search, out var idSearch);

            var query = _repository
                .GetAll() 
                .WhereIf(!string.IsNullOrEmpty(request.Search),
                    x => x.Nome.ToUpper().Contains(request.Search.ToUpper()) ||
                    idSearch != 0 && x.Id.ToString().Contains(idSearch.ToString()));



            if (string.IsNullOrEmpty(request.OrderBy))
                return query.OrderByDescending(x => x.Id);

            if (request.OrderBy.Equals("Id", StringComparison.OrdinalIgnoreCase))
            {
                if (request.Desc)
                    query = query.OrderByDescending(x => x.Id);
                else
                    query = query.OrderBy(x => x.Id);
            }
            else if (request.OrderBy.Equals("Produtos", StringComparison.OrdinalIgnoreCase))
            {
                if (request.Desc)
                    query = query.OrderByDescending(x => x.Nome);
                else
                    query = query.OrderBy(x => x.Nome);

            }
            else if (request.OrderBy.Equals("Ativo", StringComparison.OrdinalIgnoreCase))
            {
                if (request.Desc)
                    query = query.OrderByDescending(x => x.Ativo);
                else
                    query = query.OrderBy(x => x.Ativo);
            }
            return query;

        }

        public ProdutoDto GetProdutoById(EntityDto<long> input)
        {
            var Produto = _repository.Get(input.Id);

            return ObjectMapper.Map<ProdutoDto>(Produto);
        }

        public void Delete(EntityDto<long> input)
        {
            _repository.Delete(input.Id);

        }

    }
}
