namespace ProjectASP.Interfaces.ISevices.Token
{
    public interface ITokenJWTService
    {
        Task<string> GenerateToken(Guid? id, Guid? storeId, string username, string password, string fullname);
    }
}
