using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure.Repositories
{
    public class ApiConfigRepository : GenericRepository<ApiConfig>, IApiConfigRepository
    {
        public ApiConfigRepository(GoFnbSocialDbContext dbContext) : base(dbContext) { }

    }
}
