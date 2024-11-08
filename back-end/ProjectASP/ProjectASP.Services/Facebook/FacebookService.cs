using ProjectASP.Common.Attributes;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ProjectASP.Common.Models.Facebook;
using ProjectASP.Domain.Settings;
using ProjectASP.Interfaces.ISevices.Facebook;

namespace ProjectASP.Services.Facebook
{
    [AutoService(typeof(IFacebookService), Lifetime = ServiceLifetime.Scoped)]
    public class FacebookService : IFacebookService
    {
        private readonly HttpClient _httpClient;
        private readonly AppSettings _appSettings;
        public Domain.Settings.Facebook _facebookSettings;

        public FacebookService(HttpClient httpClient, IOptions<AppSettings> appSettings)
        {
            _httpClient = httpClient;
            _appSettings = appSettings.Value;
            _facebookSettings = _appSettings.Socials.Facebook;
        }

        public async Task<UserProfileResponse> GetUserProfileAsync(UserProfileRequest request)
        {
            var endpoint = $"{_facebookSettings.FacebookAPIUrl}/{_facebookSettings.Version}/{request.UserId}";
            var queries = new Dictionary<string, string>()
            {
                ["access_token"] = request.AccessToken,
                ["fields"] = "id,name,email,birthday,picture{url}",
            };
            var uri = QueryHelpers.AddQueryString(endpoint, queries);
            var httpResponse = await HttpClientGetAsync<UserProfileResponse>(uri);
            return httpResponse;
        }

        private async Task<T> HttpClientGetAsync<T>(string uri)
        {
            try
            {
                HttpResponseMessage httpResponseMessage = await _httpClient.GetAsync(uri);
                var responseMessage = await httpResponseMessage.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<T>(responseMessage);
            }
            catch (Exception ex)
            {
                Serilog.Log.Information(uri);
                Serilog.Log.Information(ex.Message);
                Serilog.Log.Information(JsonConvert.SerializeObject(ex));
                return default;
            }
        }
    }
}
