using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace ToDoList.EntityFrameworkCore
{
    public static class ToDoListDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<ToDoListDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<ToDoListDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
