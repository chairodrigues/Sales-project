using Abp.Application.Services;
using ToDoList.MultiTenancy.Dto;

namespace ToDoList.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedTenantResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

