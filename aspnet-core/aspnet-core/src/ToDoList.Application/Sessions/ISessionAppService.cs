using System.Threading.Tasks;
using Abp.Application.Services;
using ToDoList.Sessions.Dto;

namespace ToDoList.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
