using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.User;

namespace ProjectASP.Application.Features.Accounts.Commands;
public class DeleteMaterialRequest : IRequest<Domain.Entities.Material>
{
    public Guid Id { get; set; }
}

public class DeleteMaterialRequestHandler : IRequestHandler<DeleteMaterialRequest, Domain.Entities.Material>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserProvider _userProvider;

    public DeleteMaterialRequestHandler(IUnitOfWork unitOfWork, IUserProvider userProvider)
    {
        _unitOfWork = unitOfWork;
        _userProvider = userProvider;
    }

    public async Task<Domain.Entities.Material> Handle(DeleteMaterialRequest request, CancellationToken cancellationToken)
    {
        var loggedUser = await _userProvider.ProvideAsync(cancellationToken);
        var material = await _unitOfWork.Materials
            .Where(a => a.StoreId == loggedUser.StoreId && a.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (material != null)
        {
            material.IsDeleted = true;
            await _unitOfWork.Materials.ModifyAsync(material);
            await _unitOfWork.SaveChangesAsync();
        }

        return material;
    }
}