using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class AccountRepository : GenericRepository<Account>, IAccountRepository
    {
        public AccountRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }

        public IQueryable<Account> GetAllAccountInStore(Guid storeId)
        {
            //var products = dbSet.Where(s => s.StoreId == storeId);
            var products = dbSet;

            return products;
        }
    }
}
