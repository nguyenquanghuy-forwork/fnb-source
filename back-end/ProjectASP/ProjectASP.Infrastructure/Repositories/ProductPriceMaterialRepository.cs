using Microsoft.EntityFrameworkCore.Migrations;
using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class ProductPriceMaterialRepository : GenericRepository<ProductPriceMaterial>, IProductPriceMaterialRepository
    {
        public ProductPriceMaterialRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }
        
    }
}
