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
using Abp.Linq.Extensions;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;
using Abp.Application.Services.Dto;
using Microsoft.AspNetCore.Mvc;
using Abp.Linq.Extensions;
using System; 
using Microsoft.EntityFrameworkCore;

namespace ToDoList.Lista
{
    public class SubcategoriaAppService : ApplicationService, ISubcategoriaAppService
    {
        private readonly IRepository<Subcategoria, long> _repository;


        public SubcategoriaAppService(IRepository<Subcategoria, long> repository)
        {
            _repository = repository;
        }

        public SubcategoriaDto Create(SubcategoriaDto input)
        {
            var subcategoria = ObjectMapper.Map<Subcategoria>(input);
            subcategoria = _repository.Insert(subcategoria);

            return ObjectMapper.Map<SubcategoriaDto>(subcategoria);
        }

        [HttpPatch]
        public SubcategoriaDto Update(SubcategoriaDto input)
        {
            var subcategoria = ObjectMapper.Map<Subcategoria>(input);
            subcategoria = _repository.Update(subcategoria);

            return ObjectMapper.Map<SubcategoriaDto>(subcategoria);
        }

        public PagedResultDto<SubcategoriaDto> GetAll(GetAllSubcategoriaDto input)
        {
            var querySubcategoria = GetQuery(input);
            int totalCount = querySubcategoria.Count();
            var Subcategoria = querySubcategoria
                .Skip(input.Skip)
                .Take(input.Take)
                .ToList();

            return new PagedResultDto<SubcategoriaDto>
            {
                TotalCount = totalCount,
                Items = ObjectMapper.Map<List<SubcategoriaDto>>(Subcategoria)

            };
        }

        private IQueryable<Subcategoria> GetQuery(GetAllSubcategoriaDto request)
        {
            int.TryParse(request.Search, out var idSearch);

            var query = _repository
                .GetAll()
                .AsNoTracking()
                .Where(x => x.CategoriaId == request.CategoriaId)
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
            else if (request.OrderBy.Equals("Subcategoria", StringComparison.OrdinalIgnoreCase))
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


        public void Delete(EntityDto<long> input)
        {
            _repository.Delete(input.Id);

        }


        private IQueryable<Subcategoria> Subcategorias(RequestDto input)
        {
            var query = _repository
                .GetAll()
                .WhereIf(!string.IsNullOrEmpty(input.Search),
                    x => x.Nome.ToString()
                    .Contains(input.Search));

            if (input.OrderBy.Equals("Subcategoria", StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderBy(x => x.Nome);
            }
            return query;
        }




    }
}
