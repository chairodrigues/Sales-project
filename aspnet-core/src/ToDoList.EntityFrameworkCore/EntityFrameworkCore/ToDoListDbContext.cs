using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using ToDoList.Authorization.Roles;
using ToDoList.Authorization.Users;
using ToDoList.MultiTenancy;
using ToDoList.Lista;

namespace ToDoList.EntityFrameworkCore
{
    public class ToDoListDbContext : AbpZeroDbContext<Tenant, Role, User, ToDoListDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Produto> Produto { get; set; } 
        public DbSet<CarrinhoProduto> CarrinhoProdutos { get; set; }  
        public DbSet<CarrinhoSimulado> CarrinhoSimulados { get; set; } 
      

        public ToDoListDbContext(DbContextOptions<ToDoListDbContext> options)
            : base(options)
        {

        }
        protected override void OnModelCreating (ModelBuilder modelBuilder)
        {
            base.OnModelCreating (modelBuilder);
            modelBuilder.Entity<CarrinhoSimulado> ()
                .HasOne(x => x.Produto)
                .WithOne()
                .HasForeignKey<CarrinhoSimulado>(x => x.ProdutoId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }

}
