using ProjectASP.Common.Models.Facebook;

namespace ProjectASP.Interfaces.ISevices.Facebook
{
    public interface IFacebookService
    {
        Task<UserProfileResponse> GetUserProfileAsync(UserProfileRequest request);
    }
}
