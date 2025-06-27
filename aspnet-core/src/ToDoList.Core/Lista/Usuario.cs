using Abp.Domain.Entities;
using System;

namespace ToDoList.Lista
{
    public class Usuario : Entity<long>
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public DateTime DataCriacao { get; set; }
        public TipoUsuario Tipo { get; set; }
    }

    public enum TipoUsuario
    {
        Administrador,
        Cliente,
        Suporte
    }
}
