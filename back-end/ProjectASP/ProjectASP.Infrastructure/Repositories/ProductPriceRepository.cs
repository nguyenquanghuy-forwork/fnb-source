using Microsoft.EntityFrameworkCore.Migrations;
using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class ProductPriceRepository : GenericRepository<ProductPrice>, IProductPriceRepository
    {
        public ProductPriceRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }
        
    }
}
