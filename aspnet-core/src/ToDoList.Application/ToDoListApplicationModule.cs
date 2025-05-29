using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using ToDoList.Authorization;

namespace ToDoList
{
    [DependsOn(
        typeof(ToDoListCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class ToDoListApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<ToDoListAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(ToDoListApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
