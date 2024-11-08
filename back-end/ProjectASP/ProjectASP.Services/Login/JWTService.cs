using ProjectASP.Common.Attributes;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ProjectASP.Domain.Settings;
using ProjectASP.Interfaces.ISevices.Login;
using ProjectASP.Common.Models.User;
using ProjectASP.Common.Constants;

namespace ProjectASP.Services.Login
{
    [AutoService(typeof(IJWTService), Lifetime = ServiceLifetime.Scoped)]
    public class JWTService : IJWTService
    {
        private readonly JWTSettings _jwtSettings;

        public JWTService(IOptions<JWTSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }


        /// <summary>
        /// This method is used to generate a new string of tokens to access our API(s).
        /// </summary>
        /// <returns>The token string</returns>
        public string GenerateAccessToken(LoggedUserModel user)
        {

            if ((string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.Password)) &&
                string.IsNullOrWhiteSpace(user.PhoneNumber)
             )
            {
                return null;
            }

            var tokenExpires = _jwtSettings.AccessTokenExpirationInMinutes;

            if (user.NeverExpires)
            {
                // 10 years.
                tokenExpires = 5256000;
            }

            // 1. Create Security Token Handler
            var tokenHandler = new JwtSecurityTokenHandler();

            // 2. Private Key to Encrypted
            var tokenKey = _jwtSettings.SecretBytes;

            // 3. Create JwtSecurityToken
            var claims = new List<Claim>
            {
                new Claim(ClaimTypesConstants.ID, user.Id.ToString()),
                new Claim(ClaimTypesConstants.ACCOUNT_ID, user.AccountId.ToString()),
            };

            if (!string.IsNullOrWhiteSpace(user.FullName))
            {
                claims.Add(new Claim(ClaimTypesConstants.FULL_NAME, user.FullName));
            }

            if (!string.IsNullOrWhiteSpace(user.AccountType))
            {
                claims.Add(new Claim(ClaimTypesConstants.ACCOUNT_TYPE, user.AccountType));
            }

            if (user.StoreId.HasValue)
            {
                claims.Add(new Claim(ClaimTypesConstants.STORE_ID, $"{user.StoreId.Value}"));
            }

            if (!string.IsNullOrWhiteSpace(user.Email))
            {
                claims.Add(new Claim(ClaimTypesConstants.EMAIL, user.Email));
            }

            if (!string.IsNullOrWhiteSpace(user.PhoneNumber))
            {
                claims.Add(new Claim(ClaimTypesConstants.PHONE_NUMBER, user.PhoneNumber));
            }

            if (user.CountryId.HasValue)
            {
                claims.Add(new Claim(ClaimTypesConstants.COUNTRY_ID, $"{user.CountryId.Value}"));
            }

            if (!string.IsNullOrWhiteSpace(user.CountryCode))
            {
                claims.Add(new Claim(ClaimTypesConstants.COUNTRY_CODE, user.CountryCode));
            }

            if (!string.IsNullOrWhiteSpace(user.CurrencyCode))
            {
                claims.Add(new Claim(ClaimTypesConstants.CURRENCY_CODE, user.CurrencyCode));
            }

            if (!string.IsNullOrWhiteSpace(user.CurrencySymbol))
            {
                claims.Add(new Claim(ClaimTypesConstants.CURRENCY_SYMBOL, user.CurrencySymbol));
            }

            var signingCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature);
            var twtToken = new JwtSecurityToken(
                _jwtSettings.Issuer,
                _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(tokenExpires),
                signingCredentials: signingCredentials);

            // 4. Return Token from method
            var jwtToken = tokenHandler.WriteToken(twtToken);
            return jwtToken;

        }


        public JwtSecurityToken ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(_jwtSettings.SecretBytes);

            try
            {
                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = securityKey,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                return jwtToken;
            }
            catch (Exception)
            {
                return null;
            }

        }

    }
}
