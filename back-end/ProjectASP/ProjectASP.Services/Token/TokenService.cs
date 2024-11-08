using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using ProjectASP.Common.Attributes;
using ProjectASP.Common.Extensions;
using ProjectASP.Domain.Enum;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.Token;

namespace ProjectASP.Services.Token
{
    [AutoService(typeof(ITokenService), Lifetime = ServiceLifetime.Scoped)]
    public class TokenService : ITokenService
    {
        private readonly IUnitOfWork _unitOfWork;
        public TokenService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task<Domain.Entities.Token> AddTokenAsync(Domain.Entities.Token data)
        {
            var token = await _unitOfWork.Tokens.AddAsync(data);
            return token;
        }

        public async Task<Domain.Entities.Token> GetTokenAsync(Guid partnerId)
        {
            var currentTime = DateTime.Now.ToTimestamp();

            var dataToken = await _unitOfWork.Tokens.GetAll()
                .Where(e => e.PartnerId == partnerId && e.Type == EnumPartner.Tiktok)
                .ToListAsync();
            var token = dataToken.Where(e => e.AccessTokenExpireIn > currentTime).FirstOrDefault();
            if (token == null)
            {
                var firstToken = dataToken.First();
                token = await GetNewTokenTiktokAsync(partnerId, firstToken.RefreshToken);
            }
            return token;
        }
        #region Private Method
        private async Task<Domain.Entities.Token> GetNewTokenTiktokAsync(Guid partnerId, string refreshToken)
        {
            var resToken = new Domain.Entities.Token();
            return resToken;
        }
        #endregion
    }
}
