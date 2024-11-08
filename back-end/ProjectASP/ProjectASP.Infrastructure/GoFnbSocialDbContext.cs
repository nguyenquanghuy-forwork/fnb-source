using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using ProjectASP.Common.Constants;
using ProjectASP.Common.Extensions;
using ProjectASP.Domain;
using ProjectASP.Domain.Entities;
using Serilog;
using System.Linq.Expressions;

namespace ProjectASP.Infrastructure
{
    public class GoFnbSocialDbContext : DbContext
    {

        private readonly IHttpContextAccessor _httpContextAccessor;

        public GoFnbSocialDbContext(DbContextOptions<GoFnbSocialDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public DbSet<Account> Accounts { get; set; }

        public DbSet<Product> Products { get; set; }

        public DbSet<ApiConfig> ApiConfigs { get; set; }

        public DbSet<Partner> Partners { get; set; }

        public DbSet<Token> Tokens { get; set; }

        public DbSet<Unit> Units { get; set; }

        public DbSet<Material> Materials { get; set; }

        public DbSet<ProductPriceMaterial> ProductPriceMaterials { get; set; }

        public DbSet<ProductPrice> ProductPrices { get; set; }

        public DbSet<Store> Stores { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<OrderItem> OrderItems { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            Expression<Func<BaseEntity, bool>> filterExpr = x => !x.IsDeleted;
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                // Check if current entity type is child of BaseEntity
                if (entityType.ClrType.IsAssignableTo(typeof(BaseEntity)))
                {
                    // Modify expression to handle correct child type
                    var parameter = Expression.Parameter(entityType.ClrType);
                    var body = ReplacingExpressionVisitor.Replace(filterExpr.Parameters.First(), parameter, filterExpr.Body);
                    var lambdaExpression = Expression.Lambda(body, parameter);

                    // Set filter
                    entityType.SetQueryFilter(lambdaExpression);
                }
            }

            base.OnModelCreating(modelBuilder);
        }
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            var claimAccountId = _httpContextAccessor.HttpContext == null
                ? null
                : _httpContextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.ACCOUNT_ID);
            var accountId = claimAccountId?.Value.ToGuid();

            if (accountId == null)
            {
                //In case accountId is null, CreatedUser and LastSavedUser will not be overwritten
                Log.Information("accountId null");
            }

            foreach (var entry in ChangeTracker.Entries<BaseEntity>())
            {
                switch (entry.State)
                {
                    case EntityState.Added:
                        entry.Entity.CreatedTime = DateTime.UtcNow;
                        entry.Entity.LastSavedTime = DateTime.UtcNow;

                        if (accountId != null)
                        {
                            entry.Entity.CreatedUser = accountId;
                            entry.Entity.LastSavedUser = accountId;
                        }

                        entry.CurrentValues["IsDeleted"] = false;
                        break;

                    case EntityState.Modified:
                        entry.Entity.LastSavedTime = DateTime.UtcNow;
                        entry.Entity.LastSavedUser = accountId;
                        if (accountId != null)
                        {
                            entry.Entity.LastSavedUser = accountId;
                        }
                        break;

                    case EntityState.Deleted:
                        entry.State = EntityState.Modified;
                        entry.Entity.LastSavedTime = DateTime.UtcNow;
                        if (accountId != null)
                        {
                            entry.Entity.LastSavedUser = accountId;
                        }
                        entry.CurrentValues["IsDeleted"] = true;
                        break;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }

    }
}
