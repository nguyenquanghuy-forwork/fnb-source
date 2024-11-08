using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Interfaces
{
    public interface IUnitOfWork
    {
        Task SaveChangesAsync(CancellationToken cancellationToken = default);

        IAccountRepository Accounts { get; }

        IProductRepository Products { get; }

        IApiConfigRepository ApiConfigs { get; }

        ITokenRepository Tokens { get; }

        IPartnerRepository Partners { get; }

        IStoreRepository Stores { get; }

        IProductPriceRepository ProductPrices { get; }

        IUnitRepository Units { get; }

        IMaterialRepository Materials { get; }

        IProductPriceMaterialRepository ProductPriceMaterials { get; }

        IOrderRepository Orders { get; }

        IOrderItemRepository OrderItems { get; }

    }
}
