using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Common.Exceptions;
using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.User;

namespace ProjectASP.Application.Features.Configuration.Queries
{
    public class GetApiConfigurationsRequest : IRequest<GetConfigurationsResponse>
    {
    }

    public class GetConfigurationsResponse
    {
        public IEnumerable<ApiConfig> ApiConfigs { get; set; }

    }

    public class GetConfigurationsRequestHandler : IRequestHandler<GetApiConfigurationsRequest, GetConfigurationsResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserProvider _userProvider;

        public GetConfigurationsRequestHandler(
            IUnitOfWork unitOfWork,
            IUserProvider userProvider
            )
        {
            _unitOfWork = unitOfWork;
            _userProvider = userProvider;
        }

        public async Task<GetConfigurationsResponse> Handle(GetApiConfigurationsRequest request, CancellationToken cancellationToken)
        {
            var loggedUser = await _userProvider.ProvideAsync(cancellationToken);
            ThrowError.Against(!loggedUser.AccountId.HasValue, "Cannot find AccountId information");

            var apiConfigByIds = await _unitOfWork.ApiConfigs
                .Where(x => x.AccountId == loggedUser.AccountId.Value)
                .ToListAsync(cancellationToken);

            if (!apiConfigByIds.Any())
            {
                var newConfigs = new List<ApiConfig>
                {
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000001"), ApiConfigGroupName = "Branch callback APIs", Name = "GET branches", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000001"), ApiConfigGroupName = "Branch callback APIs", Name = "GET branch detail", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000002"), ApiConfigGroupName = "Product callback APIs", Name = "GET product list", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000003"), ApiConfigGroupName = "CRM callback APIs", Name = "GET customer list", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000003"), ApiConfigGroupName = "CRM callback APIs", Name = "UPDATE customer", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000003"), ApiConfigGroupName = "CRM callback APIs", Name = "GET customer detail", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000003"), ApiConfigGroupName = "CRM callback APIs", Name = "GET customer segment list", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000003"), ApiConfigGroupName = "CRM callback APIs", Name = "CREATE customer", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000003"), ApiConfigGroupName = "CRM callback APIs", Name = "CREATE customer segment", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000004"), ApiConfigGroupName = "Promotion callback APIs", Name = "GET promotion list", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000004"), ApiConfigGroupName = "Promotion callback APIs", Name = "GET promotion detail", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000005"), ApiConfigGroupName = "Tax & Fee callback APIs", Name = "GET tax list", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000005"), ApiConfigGroupName = "Tax & Fee callback APIs", Name = "GET fee list", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000005"), ApiConfigGroupName = "Tax & Fee callback APIs", Name = "GET tax detail", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000005"), ApiConfigGroupName = "Tax & Fee callback APIs", Name = "GET fee detail", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000006"), ApiConfigGroupName = "Payment callback APIs", Name = "GET payment method list", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000007"), ApiConfigGroupName = "Order callback APIs", Name = "GET payment summary", IsDeleted = false, AccountId = loggedUser.AccountId },
                    new ApiConfig { Id = Guid.NewGuid(), ApiConfigGroupId = Guid.Parse("6C626154-5065-7265-6D69-737300000007"), ApiConfigGroupName = "Order callback APIs", Name = "CREATE order", IsDeleted = false, AccountId = loggedUser.AccountId },
                };
                await _unitOfWork.ApiConfigs.AddRangeAsync(newConfigs);
            }

            var apiConfigs = await _unitOfWork.ApiConfigs
                .Where(x => x.AccountId == loggedUser.AccountId)
                .OrderBy(x => x.ApiConfigGroupId)
                .ToListAsync(cancellationToken);

            var response = new GetConfigurationsResponse
            {
                ApiConfigs = apiConfigs
            };

            return response;

        }
    }
}
