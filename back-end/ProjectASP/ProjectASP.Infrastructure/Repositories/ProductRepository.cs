using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }

        public IQueryable<Product> GetAllProductsInStore(Guid storeId)
        {
            //var products = dbSet.Where(s => s.StoreId == storeId);
            var products = dbSet;

            return products;
        }
    }
}
