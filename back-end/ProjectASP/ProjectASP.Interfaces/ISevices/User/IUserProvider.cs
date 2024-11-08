using ProjectASP.Common.Models.User;

namespace ProjectASP.Interfaces.ISevices.User
{
    public interface IUserProvider : IProvider<LoggedUserModel>
    {
        LoggedUserModel Provide();

        LoggedUserModel GetLoggedUserModelFromJwt(string token);

        string GetPlatformId();

        Guid? GetStoreId();

        DateTime? GetRequestLocalTime();

        /// <summary>
        /// The difference in minutes between the UTC time zone and the local time zone.
        /// </summary>
        int? GetTimezoneOffset();

        string GetOperatingSystem();

    }
}
