using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using ProjectASP.Common.Attributes;
using ProjectASP.Interfaces.ISevices.Token;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProjectASP.Services.TokenJWT
{
    [AutoService(typeof(ITokenJWTService), Lifetime = ServiceLifetime.Scoped)]
    public class TokenJWTService : ITokenJWTService
    {
        private const string SecretKey = "HuyNguyenQuang-Panda-hL3kD5b8sDf7eR5kG8uJ2wQ1yZ6sX3aL9dE7gF6kH1vN4uT7mP4sQ1tX9rG3bS5a";
        public Task<string> GenerateToken(Guid? id, Guid? storeId, string username, string password, string fullname)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(SecretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim("Id", id.ToString()),
                new Claim("StoreId", storeId.ToString()),
                new Claim("Username", username),
                new Claim("Password", password),
                new Claim("Fullname", fullname)
            }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return Task.FromResult(tokenString);
        }
    }

}
