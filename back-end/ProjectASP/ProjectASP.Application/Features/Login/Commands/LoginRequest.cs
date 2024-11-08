using ProjectASP.Common.Exceptions;
using MediatR;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ProjectASP.Domain.Settings;
using ProjectASP.Loging.Serilog;
using System.ComponentModel.DataAnnotations;
using ProjectASP.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using ProjectASP.Domain.Entities;
using ProjectASP.Services.Token;
using ProjectASP.Services.TokenJWT;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.Token;

namespace ProjectASP.Application.Features.Login.Commands
{
    public class LoginRequest : IRequest<LoginResponse>
    {
        [Required]
        public required string Email { get; set; }

        [Required]
        public required string Password { get; set; }
    }

    public class LoginResponse
    {
        public Guid? AccountId { get; set; }

        public string? Token { get; set; }
    }

    public class LoginRequestHandler : IRequestHandler<LoginRequest, LoginResponse>
    {
        private readonly AppSettings _appSettings;
        private readonly string _apiVersion;
        private readonly HttpClient _httpClient;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenJWTService _tokenJWTService;

        public LoginRequestHandler(
            HttpClient httpClient,
            IOptions<AppSettings> appSettings,
            IUnitOfWork unitOfWork,
            ITokenJWTService tokenJWTService
             )
        {
            _appSettings = appSettings.Value;
            _apiVersion = appSettings.Value.APIVersion;
            _httpClient = httpClient;
           _unitOfWork = unitOfWork;
           _tokenJWTService = tokenJWTService;
        }

        public async Task<LoginResponse> Handle(LoginRequest request, CancellationToken cancellationToken)
        {
            var email = request.Email.Trim().ToLower();
            var accounts = await _unitOfWork.Accounts
                   .Where(a => a.Username.Trim().ToLower() == email)
                   .Select(a => new Domain.Entities.Account()
                   {
                       Id = a.Id,
                       StoreId= a.StoreId,
                       Password = a.Password,
                       Username = a.Username,
                       FullName = a.FullName,
                       Code = a.Code,
                   }).ToListAsync();

            var hasher = new PasswordHasher<Domain.Entities.Account>();
            var tasks = accounts.Select(account => Task.Run(() =>
            {
                if (account.Password != null)
                {
                    if (hasher.VerifyHashedPassword(null, account.Password, request.Password) != PasswordVerificationResult.Failed)
                    {
                        return account.Id;
                    }
                }
                return Guid.Empty;
            }));

            var validAccountIdsTask = await Task.WhenAll(tasks);

            var accountsValid = accounts.Where(account => validAccountIdsTask.Where(x => x != Guid.Empty).Contains(account.Id)).ToList();

            if (accountsValid == null || accountsValid.Count <= 0)
            {
                throw new ApiException("Your email or password invalid");
            }

            var account = accountsValid.FirstOrDefault();

            LoginResponse result = new LoginResponse() {
                AccountId = account?.Id,
                Token= await _tokenJWTService.GenerateToken(account.Id, account.StoreId, account.Username, account.Password, account.FullName),
            };
            
            return result;

            //try
            //var jsonRequest = System.Text.Json.JsonSerializer.Serialize(request);
            //var content = new StringContent(jsonRequest, System.Text.Encoding.UTF8, "application/json");
            //var apiUrl = $"{_appSettings.DomainAdminWebApi}/api/{_apiVersion}/social/login";
            //{
            //    HttpResponseMessage response = await _httpClient.PostAsync(apiUrl, content, cancellationToken);
            //    response.EnsureSuccessStatusCode();
            //    string responseBody = await response.Content.ReadAsStringAsync(cancellationToken);
            //}
            //catch (HttpRequestException e)
            //{
            //    e.AddTraceLog(nameof(LoginRequest));
            //    throw new ApiException("Your email or password invalid");
            //}
        }
    }
}
