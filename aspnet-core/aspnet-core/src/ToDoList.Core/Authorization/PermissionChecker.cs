using Abp.Authorization;
using ToDoList.Authorization.Roles;
using ToDoList.Authorization.Users;

namespace ToDoList.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
