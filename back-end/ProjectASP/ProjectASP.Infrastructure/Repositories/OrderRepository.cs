using Microsoft.EntityFrameworkCore.Migrations;
using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }
        
    }
}
