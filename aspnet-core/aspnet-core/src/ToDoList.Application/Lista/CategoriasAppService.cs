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
    public class CategoriaAppService : ApplicationService, ICategoriaAppService
    {
        private readonly IRepository<Categoria, long> _repository;

        public CategoriaAppService(IRepository<Categoria, long> repository)
        {
            _repository = repository;
        }

        public CategoriaDto Create(CategoriaDto input)
        {
            var categoria = ObjectMapper.Map<Categoria>(input);
            categoria = _repository.Insert(categoria);

            return ObjectMapper.Map<CategoriaDto>(categoria);
        }

        [HttpPatch]
        public CategoriaDto Update(UpdateCategoriaDto input)
        {
            var categoria = ObjectMapper.Map<Categoria>(input);
            categoria = _repository.Update(categoria);

            return ObjectMapper.Map<CategoriaDto>(categoria);
        }

        public PagedResultDto<CategoriaDto> GetAll(RequestDto input)
        {
            var queryCategoria = GetQuery(input);
            int totalCount = queryCategoria.Count();
            var categoria = queryCategoria
                .Skip(input.Skip)
                .Take(input.Take)
                .ToList();

            return new PagedResultDto<CategoriaDto>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<CategoriaDto>>(categoria)
            };
        }

        private IQueryable<Categoria> GetQuery(RequestDto request)
        {
            int.TryParse(request.Search, out var idSearch);

            var query = _repository
                .GetAll()
                .Include(x => x.Subcategorias)
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
            else if (request.OrderBy.Equals("Categorias", StringComparison.OrdinalIgnoreCase))
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

        public CategoriaDto GetCategoriaById(EntityDto<long> input)
        {
            var categoria = _repository.Get(input.Id);

            return ObjectMapper.Map<CategoriaDto>(categoria);
        }

        public void Delete(EntityDto<long> input)
        {
            _repository.Delete(input.Id);

        }

    }
}
