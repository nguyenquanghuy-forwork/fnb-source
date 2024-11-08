using Microsoft.EntityFrameworkCore.Migrations;
using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class MaterialRepository : GenericRepository<Material>, IMaterialRepository
    {
        public MaterialRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }
        
    }
}
