using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class TokenRepository : GenericRepository<Token>, ITokenRepository
    {
        public TokenRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }

    }
}
