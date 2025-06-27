using AutoMapper;
using ToDoList.Lista;
using ToDoList.Lista.DTOs;

namespace ToDoList.Lista.Mappers
{
    public class CarrinhoProdutoMapProfile : Profile
    {
        public CarrinhoProdutoMapProfile()
        {
            CreateMap<CarrinhoProduto, CarrinhoProdutoDto>();
            CreateMap<CarrinhoProdutoDto, CarrinhoProduto>();
        }
    }
}
