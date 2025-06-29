using System;

namespace ToDoList.Lista.Dto
{
    public class UsuarioDto
    {
        public long Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public DateTime DataCriacao { get; set; }
        public TipoUsuario Tipo { get; set; }
    }
}
