using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces;

namespace ProjectASP.Interfaces.IRepositories
{
    public interface IAccountRepository : IGenericRepository<Account>
    {
        IQueryable<Account> GetAllAccountInStore(Guid storeId);

    }
}
