using ProjectASP.Interfaces;
using MediatR;
using Microsoft.Extensions.Options;
using ProjectASP.Domain.Settings;

namespace ProjectASP.Application.Features.Login.Commands
{

    public class AuthenticateByTokenRequest : IRequest<AuthenticateByTokenResponse>
    {
        public string Token { get; set; }

    }
    public class AuthenticateByTokenResponse
    {

        public string Token { get; set; }

        public bool isSuccess { get; set; }
    }

    public class AuthenticateByTokenRequestHandler : IRequestHandler<AuthenticateByTokenRequest, AuthenticateByTokenResponse>
    {
        private readonly AppSettings _appSettings;


        public AuthenticateByTokenRequestHandler(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public async Task<AuthenticateByTokenResponse> Handle(AuthenticateByTokenRequest request, CancellationToken cancellationToken)
        {
            var response = new AuthenticateByTokenResponse()
            {
                Token = request.Token
            };

            var jsonRequest = System.Text.Json.JsonSerializer.Serialize(request);
            var content = new StringContent(jsonRequest, System.Text.Encoding.UTF8, "application/json");
            using var httpClient = new HttpClient();
            var apiUrl = $"{_appSettings.DomainAdminWebApi}/api/{_appSettings.APIVersion}/login/authenticate-by-token";
            var responseToken = await httpClient.PostAsync(apiUrl, content);
            if (responseToken.IsSuccessStatusCode)
            {
                var jsonResponse = await responseToken.Content.ReadAsStringAsync();
                if (bool.Parse(jsonResponse) == true)
                {
                    response.isSuccess = true;
                }
                else
                {
                    response.isSuccess = false;
                }
            }
            else
            {
                response.isSuccess = false;
            }

            return response;
        }

    }
}
