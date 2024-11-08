namespace ProjectASP.Interfaces.ISevices.Token
{
    public interface ITokenService
    {
        Task<Domain.Entities.Token> AddTokenAsync(Domain.Entities.Token data);

        Task<Domain.Entities.Token> GetTokenAsync(Guid partnerId);

    }
}
