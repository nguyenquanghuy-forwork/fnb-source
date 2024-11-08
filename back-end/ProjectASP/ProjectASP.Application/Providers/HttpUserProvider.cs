using ProjectASP.Common.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using ProjectASP.Common.Constants;
using ProjectASP.Common.Extensions;
using ProjectASP.Common.Models.User;
using ProjectASP.Interfaces.ISevices.User;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
namespace ProjectASP.Application.Providers
{
    public class HttpUserProvider : IUserProvider
    {
        private readonly ILogger<HttpUserProvider> _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HttpUserProvider(
            ILogger<HttpUserProvider> logger,
            IHttpContextAccessor httpContextAccessor
        )
        {
            _logger = logger;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task<LoggedUserModel> ProvideAsync(CancellationToken cancellationToken = default)
        {
            string tokenAuthor = _httpContextAccessor.HttpContext.Request.Headers["Authorization"].ToString();

            //var identifier = GetLoggedUserModelFromJwt("null") ;

            // Remove "Bearer " prefix if present
            if (tokenAuthor.StartsWith("Bearer "))
            {
                tokenAuthor = tokenAuthor.Substring(7);
            }

            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(tokenAuthor) as JwtSecurityToken;

            if (jsonToken != null)
            {
                Console.WriteLine("ID: " + jsonToken.Claims.First(claim => claim.Type == "Id").Value);
                Console.WriteLine("StoreId: " + jsonToken.Claims.First(claim => claim.Type == "StoreId").Value);
                Console.WriteLine("Username: " + jsonToken.Claims.First(claim => claim.Type == "Username").Value);
                Console.WriteLine("Fullname: " + jsonToken.Claims.First(claim => claim.Type == "Fullname").Value);
                Console.WriteLine("Not Before: " + jsonToken.Claims.First(claim => claim.Type == "nbf").Value);
                Console.WriteLine("Expiration: " + jsonToken.Claims.First(claim => claim.Type == "exp").Value);
                Console.WriteLine("Issued At: " + jsonToken.Claims.First(claim => claim.Type == "iat").Value);
            }

            LoggedUserModel loggedUser = new LoggedUserModel(){
                AccountId= Guid.Parse(jsonToken.Claims.First(claim => claim.Type == "Id").Value),
                StoreId= Guid.Parse(jsonToken.Claims.First(claim => claim.Type == "StoreId").Value),
                UserName= jsonToken.Claims.First(claim => claim.Type == "Username").Value,
                FullName= jsonToken.Claims.First(claim => claim.Type == "Fullname").Value,
            };
            if (loggedUser == null)
            {
                _logger.LogWarning("object identifier is null for the user");
                //throw new UnauthorisedException(); handle after add JWTSetting in appsettings
            }

            return Task.FromResult(loggedUser);
        }

        public LoggedUserModel Provide()
        {
            var identifier = GetLoggedUserModelFromJwt(_httpContextAccessor.HttpContext.User);
            if (identifier == null)
            {
                _logger.LogWarning("object identifier is null for the user");
                throw new UnauthorisedException();
            }

            return identifier;
        }

        public LoggedUserModel GetLoggedUserModelFromJwt(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jwtSecurityToken = handler.ReadJwtToken(token);

            var accountId = jwtSecurityToken.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.ACCOUNT_ID);
            var fullName = jwtSecurityToken.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.FULL_NAME);
            var email = jwtSecurityToken.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.EMAIL);

            var loggedUser = new LoggedUserModel()
            {
                AccountId = accountId.Value.ToGuid(),
                FullName = fullName?.Value,
                Email = email?.Value
            };

            return loggedUser;
        }

        private static LoggedUserModel GetLoggedUserModelFromJwt(ClaimsPrincipal claimsPrincipal)
        {
            var accountId = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.ACCOUNT_ID);
            var fullName = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.FULL_NAME);
            var email = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.EMAIL);
            var phoneNumber = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.PHONE_NUMBER);

            if (accountId == null) return null;


            var loggedUser = new LoggedUserModel()
            {
                AccountId = accountId.Value.ToGuid(),
                FullName = fullName?.Value,
                Email = email?.Value,
                PhoneNumber = phoneNumber?.Value,
            };

            return loggedUser;
        }

        public string GetPlatformId()
        {
            var platform = _httpContextAccessor.HttpContext.Request.Headers[DefaultConstants.PLATFORM_ID];
            return platform;
        }

        #region Gofood App

        public LoggedUserModel GetLoggedCustomer()
        {
            var identifier = GetLoggedCustomerModelFromJwt(_httpContextAccessor.HttpContext.User);
            if (identifier == null)
            {
                _logger.LogWarning("object identifier is null for the user");
                throw new UnauthorisedException();
            }

            return identifier;
        }

        private static LoggedUserModel GetLoggedCustomerModelFromJwt(ClaimsPrincipal claimsPrincipal)
        {
            var id = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.ID);
            var accountId = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.ACCOUNT_ID);
            var fullName = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.FULL_NAME);
            var email = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.EMAIL);
            var phoneNumber = claimsPrincipal.Claims.FirstOrDefault(x => x.Type == ClaimTypesConstants.PHONE_NUMBER);

            if (id == null) return null;

            var loggedUser = new LoggedUserModel()
            {
                Id = id.Value.ToGuid(),
                AccountId = accountId.Value.ToGuid(),
                FullName = fullName?.Value,
                Email = email?.Value,
                PhoneNumber = phoneNumber.Value,
            };

            return loggedUser;
        }

        public Guid? GetStoreId()
        {
            string storeIdFromHeader = _httpContextAccessor.HttpContext.Request.Headers[DefaultConstants.STORE_ID];
            if (Guid.TryParse(storeIdFromHeader, out Guid storeId))
            {
                return storeId;
            }
            else
            {
                return null;
            };
        }

        public DateTime? GetRequestLocalTime()
        {
            string timezoneOffsetFromHeader = _httpContextAccessor.HttpContext.Request.Headers[DefaultConstants.X_TIMEZONE_OFFSET];
            if (int.TryParse(timezoneOffsetFromHeader, out int timezoneOffset))
            {
                return DateTime.UtcNow.AddMinutes(-timezoneOffset);
            }
            else
            {
                return null;
            };
        }

        public int? GetTimezoneOffset()
        {
            string timezoneOffsetFromHeader = _httpContextAccessor.HttpContext.Request.Headers[DefaultConstants.X_TIMEZONE_OFFSET];
            if (int.TryParse(timezoneOffsetFromHeader, out int timezoneOffset))
            {
                return timezoneOffset;
            }
            else
            {
                return null;
            };
        }

        public string GetOperatingSystem()
        {
            var platform = _httpContextAccessor.HttpContext.Request.Headers[DefaultConstants.X_OS];
            return platform;
        }
        #endregion
    }
}
