using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ToDoList.EntityFrameworkCore;
using ToDoList.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace ToDoList.Web.Tests
{
    [DependsOn(
        typeof(ToDoListWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class ToDoListWebTestModule : AbpModule
    {
        public ToDoListWebTestModule(ToDoListEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(ToDoListWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(ToDoListWebMvcModule).Assembly);
        }
    }
}