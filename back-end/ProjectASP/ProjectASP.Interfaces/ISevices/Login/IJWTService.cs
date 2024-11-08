using ProjectASP.Common.Models.User;
using System.IdentityModel.Tokens.Jwt;

namespace ProjectASP.Interfaces.ISevices.Login
{
    public interface IJWTService
    {
        string GenerateAccessToken(LoggedUserModel user);

        JwtSecurityToken ValidateToken(string token);
    }
}
