using System.Threading.Tasks;
using ToDoList.Configuration.Dto;

namespace ToDoList.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
