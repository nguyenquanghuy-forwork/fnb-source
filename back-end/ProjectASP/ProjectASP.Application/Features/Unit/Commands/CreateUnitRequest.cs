using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using ProjectASP.Common.Exceptions;
using ProjectASP.Domain.Settings;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.Token;
using ProjectASP.Interfaces.ISevices.User;

namespace ProjectASP.Application.Features.Unit.Commands
{
    public class CreateUnitRequest : IRequest<List<Domain.Entities.Unit>>
    {
        public Guid? StoreId { get; set; }

        public string Name { get; set; }
    }


    public class CreateUnitRequestHandler : IRequestHandler<CreateUnitRequest, List<Domain.Entities.Unit>>
    {
        private readonly AppSettings _appSettings;
        private readonly string _apiVersion;
        private readonly HttpClient _httpClient;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ITokenJWTService _tokenJWTService;
        private readonly IUserProvider _userProvider;

        public CreateUnitRequestHandler(
            HttpClient httpClient,
            IOptions<AppSettings> appSettings,
            IUnitOfWork unitOfWork,
            ITokenJWTService tokenJWTService, IUserProvider userProvider
             )
        {
            _appSettings = appSettings.Value;
            _apiVersion = appSettings.Value.APIVersion;
            _httpClient = httpClient;
            _unitOfWork = unitOfWork;
            _tokenJWTService = tokenJWTService;
            _userProvider = userProvider;
        }

        public async Task<List<Domain.Entities.Unit>> Handle(CreateUnitRequest request, CancellationToken cancellationToken)
        {
            var loggedUser = await _userProvider.ProvideAsync(cancellationToken);
            var units = await _unitOfWork.Units
                .Where(a => a.StoreId == loggedUser.StoreId && a.Name.ToLower() == request.Name.ToLower())
                .ToListAsync(cancellationToken);

            if (units.Count > 0)
            {
                throw new ApiException("Your Unit was existed");
            }

            Domain.Entities.Unit unit = new Domain.Entities.Unit()
            {
                StoreId = loggedUser.StoreId ?? Guid.Parse("STOREID0-0000-0000-0000-000000000001"),
                Name = request.Name,
            };
            
            await _unitOfWork.Units.AddAsync(unit);

            var unitsReturn = await _unitOfWork.Units
                                .Where(a => a.StoreId == loggedUser.StoreId)
                                .ToListAsync(cancellationToken);

            return unitsReturn;

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
