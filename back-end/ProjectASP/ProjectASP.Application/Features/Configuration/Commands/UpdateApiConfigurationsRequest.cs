using ProjectASP.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Interfaces;

namespace ProjectASP.Application.Features.Configuration.Commands
{
    public class UpdateApiConfigurationsRequest : IRequest<bool>
    {
        public List<ApiConfigurationsModel> listApiConfig { get; set; }
    }

    public class ApiConfigurationsModel
    {
        public Guid ApiConfigId { get; set; }
        public string Url { get; set; }

    }

    public class UpdateApiConfigurationsRequestHandler : IRequestHandler<UpdateApiConfigurationsRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public UpdateApiConfigurationsRequestHandler(

            IUnitOfWork unitOfWork
        )
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(UpdateApiConfigurationsRequest request, CancellationToken cancellationToken)
        {

            var apiConfigsToUpdate = await _unitOfWork.ApiConfigs
                .Where(x => request.listApiConfig.Select(c => c.ApiConfigId).Contains(x.Id)).ToListAsync(cancellationToken);

            if (!apiConfigsToUpdate.Any()) return false;

            foreach (var updatedConfig in request.listApiConfig)
            {
                var apiConfig = apiConfigsToUpdate.FirstOrDefault(x => x.Id == updatedConfig.ApiConfigId);
                if (apiConfig != null)
                {
                    apiConfig.URL = updatedConfig.Url;
                }
            }

            await _unitOfWork.ApiConfigs.UpdateRangeAsync(apiConfigsToUpdate);

            return true;
        }


    }
}
