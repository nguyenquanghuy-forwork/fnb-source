using Microsoft.EntityFrameworkCore.Migrations;
using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class StoreRepository : GenericRepository<Store>, IStoreRepository
    {
        public StoreRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }
        
    }
}
