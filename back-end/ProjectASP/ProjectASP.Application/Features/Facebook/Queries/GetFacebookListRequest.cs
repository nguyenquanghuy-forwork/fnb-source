using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Application.Models.Facebook;
using ProjectASP.Domain.Enum;
using ProjectASP.Interfaces;

namespace ProjectASP.Application.Features.Facebook.Queries
{
    public class GetFacebookListRequest : IRequest<GetFacebookListResponse>
    {
    }

    public class GetFacebookListResponse
    {
        public IEnumerable<FacebookModel> FacebookList { get; set; }

        public bool IsSuccess { get; set; }

    }

    public class GetFacebookListRequestHandler : IRequestHandler<GetFacebookListRequest, GetFacebookListResponse>
    {
        private readonly IUnitOfWork _unitOfWork;

        public GetFacebookListRequestHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<GetFacebookListResponse> Handle(GetFacebookListRequest request, CancellationToken cancellationToken)
        {
            var productListResponse = await _unitOfWork.Partners
                .Where(partner => partner.Type == EnumPartner.Facebook)
                .Select(partner => new FacebookModel()
                {
                    Id = partner.Id,
                    UserId = partner.UserId,
                    Avatar = partner.Avatar,
                    Name = partner.Name,
                    AccountId = partner.AccountId,
                    IsConnected = partner.IsConnected,
                }).ToListAsync(cancellationToken);

            var response = new GetFacebookListResponse()
            {
                FacebookList = productListResponse,
                IsSuccess = true
            };

            return response;
        }
    }
}
