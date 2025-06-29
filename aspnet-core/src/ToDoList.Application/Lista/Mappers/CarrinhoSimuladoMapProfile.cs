using AutoMapper;
using ToDoList.Lista;
using ToDoList.Lista.DTOs;

namespace ToDoList.Lista.Mappers
{
    public class CarrinhoSimuladoMapProfile : Profile
    {
        public CarrinhoSimuladoMapProfile()
        {
            CreateMap<CarrinhoSimulado, CarrinhoSimuladoDto>();
            CreateMap<CarrinhoSimuladoDto, CarrinhoSimulado>();
        }
    }
}
