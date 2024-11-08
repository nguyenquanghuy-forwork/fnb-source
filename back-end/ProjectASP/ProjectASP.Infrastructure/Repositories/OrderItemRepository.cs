using Microsoft.EntityFrameworkCore.Migrations;
using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class OrderItemRepository : GenericRepository<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }
        
    }
}
