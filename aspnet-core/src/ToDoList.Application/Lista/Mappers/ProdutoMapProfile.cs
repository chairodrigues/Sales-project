using Abp.AutoMapper;
using Abp.Domain.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ToDoList.Lista.DTOs;

namespace ToDoList.Lista.Mappers
{
    public class ProdutoMapProfile : Profile
    {
        public ProdutoMapProfile()
        {
            CreateMap<Produto, ProdutoDto> ();

        }

    }
}