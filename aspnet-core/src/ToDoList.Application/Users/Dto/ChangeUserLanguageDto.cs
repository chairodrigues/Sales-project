using System.ComponentModel.DataAnnotations;

namespace ToDoList.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}