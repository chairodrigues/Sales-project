using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using ToDoList.Configuration.Dto;

namespace ToDoList.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : ToDoListAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
