using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Interfaces;

namespace ProjectASP.Application.Features.Facebook.Commands
{
    public class DeleteAccountRequest : IRequest<bool>
    {
        public Guid Id { get; set; }
    }

    public class DeleteAccountRequestHandler : IRequestHandler<DeleteAccountRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;

        public DeleteAccountRequestHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<bool> Handle(DeleteAccountRequest request, CancellationToken cancellationToken)
        {
            var accountFacebook = await _unitOfWork.Partners
                .Where(partner => partner.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (accountFacebook != null)
            {
                accountFacebook.IsDeleted = true;
                await _unitOfWork.Partners.UpdateAsync(accountFacebook);
                return true;
            }

            return false;
        }

    }
}
