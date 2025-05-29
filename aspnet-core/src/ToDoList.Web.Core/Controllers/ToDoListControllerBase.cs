using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace ToDoList.Controllers
{
    public abstract class ToDoListControllerBase: AbpController
    {
        protected ToDoListControllerBase()
        {
            LocalizationSourceName = ToDoListConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
