using System.Threading.Tasks;
using ToDoList.Models.TokenAuth;
using ToDoList.Web.Controllers;
using Shouldly;
using Xunit;

namespace ToDoList.Web.Tests.Controllers
{
    public class HomeController_Tests: ToDoListWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}