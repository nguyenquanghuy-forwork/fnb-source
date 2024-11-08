using ProjectASP.Common.Models.Facebook;
using ProjectASP.Domain.Entities;
using ProjectASP.Infrastructure;
using MediatR;
using ProjectASP.Domain.Enum;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.Facebook;
using ProjectASP.Interfaces.ISevices.User;
using System;

namespace ProjectASP.Application.Features.Facebook.Commands
{
    public class ConnectAccountRequest : IRequest<bool>
    {
        public string UserId { get; set; }

        public string AccessToken { get; set; }

        public int AccessTokenExpireIn { get; set; }
    }

    public class ConnectAccountRequestHandler : IRequestHandler<ConnectAccountRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserProvider _userProvider;
        private readonly IFacebookService _facebookService;

        public ConnectAccountRequestHandler(
            IUnitOfWork unitOfWork,
            IUserProvider userProvider,
            IFacebookService facebookService)
        {
            _unitOfWork = unitOfWork;
            _userProvider = userProvider;
            _facebookService = facebookService;
        }

        public async Task<bool> Handle(ConnectAccountRequest request, CancellationToken cancellationToken)
        {
            var loggedUser = await _userProvider.ProvideAsync(cancellationToken);
            var accountId = loggedUser.AccountId.HasValue
                ? loggedUser.AccountId.Value
                : Guid.Empty;

            try
            {
                var userProfile = await _facebookService.GetUserProfileAsync(new UserProfileRequest()
                {
                    UserId = request.UserId,
                    AccessToken = request.AccessToken,
                });

                if (userProfile != null)
                {
                    var partner = new Partner()
                    {
                        UserId = userProfile.UserId,
                        Type = EnumPartner.Facebook,
                        Avatar = userProfile.Picture != null
                            ? userProfile.Picture.Data.Url
                            : string.Empty,
                        Name = userProfile.Name,
                        AccountId = accountId,
                        IsConnected = true,
                    };
                    await _unitOfWork.Partners.AddAsync(partner);

                    var token = new Token()
                    {
                        AccessToken = request.AccessToken,
                        PartnerId = partner.Id,
                        AccountId = accountId,
                        Type = EnumPartner.Facebook,
                        AccessTokenExpireIn = request.AccessTokenExpireIn,
                    };
                    await _unitOfWork.Tokens.AddAsync(token);

                    return true;
                }
            }
            catch (Exception ex)
            {
                Serilog.Log.Information(ex.ToString());
            }

            return false;
        }

    }
}
