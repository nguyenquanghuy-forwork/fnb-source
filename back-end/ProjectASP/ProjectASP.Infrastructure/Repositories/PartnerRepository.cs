using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class PartnerRepository : GenericRepository<Partner>, IPartnerRepository
    {
        public PartnerRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }
    }
}
