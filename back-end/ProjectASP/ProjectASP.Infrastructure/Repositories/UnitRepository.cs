using Microsoft.EntityFrameworkCore.Migrations;
using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class UnitRepository : GenericRepository<Unit>, IUnitRepository
    {
        public UnitRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }
        
    }
}
