using Microsoft.EntityFrameworkCore.Storage;
using ProjectASP.Infrastructure.Repositories;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.IRepositories;

namespace ProjectASP.Infrastructure
{
    /// <summary>
    /// Repository pattern and unit of work
    /// more detail: https://dev.to/moe23/step-by-step-repository-pattern-and-unit-of-work-with-asp-net-core-5-3l92
    /// updated: https://viblo.asia/p/design-pattern-unit-of-work-pattern-bWrZnozQlxw
    /// </summary>
    public class UnitOfWork : IUnitOfWork, IDisposable
    {
        private readonly GoFnbSocialDbContext _dbContext;

        public UnitOfWork(GoFnbSocialDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        private IAccountRepository _accountRepository;
        private IProductRepository _productRepository;
        private IApiConfigRepository _apiConfigRepository;
        private ITokenRepository _tokenRepository;
        private IPartnerRepository _partnerRepository;
        private IStoreRepository _storeRepository;
        private IMaterialRepository _materialRepository;
        private IProductPriceRepository _productPriceRepository;
        private IProductPriceMaterialRepository _productPriceMaterialRepository;
        private IUnitRepository _unitRepository;
        private IOrderItemRepository _orderItemRepository;
        private IOrderRepository __orderRepository;

        public IAccountRepository Accounts { get { return _accountRepository ??= new AccountRepository(_dbContext); } }
        public IProductRepository Products { get { return _productRepository ??= new ProductRepository(_dbContext); } }
        public IApiConfigRepository ApiConfigs { get { return _apiConfigRepository ??= new ApiConfigRepository(_dbContext); } }
        public ITokenRepository Tokens { get { return _tokenRepository ??= new TokenRepository(_dbContext); } }
        public IPartnerRepository Partners { get { return _partnerRepository ??= new PartnerRepository(_dbContext); } }
        public IStoreRepository Stores { get { return _storeRepository ??= new StoreRepository(_dbContext); } }
        public IMaterialRepository Materials { get { return _materialRepository ??= new MaterialRepository(_dbContext); } }
        public IProductPriceRepository ProductPrices { get { return _productPriceRepository ??= new ProductPriceRepository(_dbContext); } }
        public IProductPriceMaterialRepository ProductPriceMaterials { get { return _productPriceMaterialRepository ??= new ProductPriceMaterialRepository(_dbContext); } }
        public IUnitRepository Units { get { return _unitRepository ??= new UnitRepository(_dbContext); } }

        public IOrderItemRepository OrderItems { get { return _orderItemRepository ??= new OrderItemRepository(_dbContext); } }

        public IOrderRepository Orders { get { return __orderRepository ??= new OrderRepository(_dbContext); } }

        public async Task SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            await _dbContext.SaveChangesAsync(cancellationToken);
        }

        public async Task<IDbContextTransaction> BeginTransactionAsync()
        {
            return await _dbContext.Database.BeginTransactionAsync();
        }

        public void Dispose()
        {
            _dbContext.Dispose();
        }
    }
}
