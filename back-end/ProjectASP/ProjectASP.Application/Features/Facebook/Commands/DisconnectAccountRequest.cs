using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Interfaces;

namespace ProjectASP.Application.Features.Facebook.Commands
{
    public class DisconnectAccountRequest : IRequest<bool>
    {
        public Guid Id { get; set; }
    }

    public class DisconnectAccountRequestHandler : IRequestHandler<DisconnectAccountRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DisconnectAccountRequestHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(DisconnectAccountRequest request, CancellationToken cancellationToken)
        {
            var accountFacebook = await _unitOfWork.Partners
                .Where(partner => partner.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (accountFacebook != null)
            {
                accountFacebook.IsConnected = false;
                await _unitOfWork.Partners.UpdateAsync(accountFacebook);
                return true;
            }

            return false;
        }

    }
}
