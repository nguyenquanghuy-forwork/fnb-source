using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Common.Exceptions;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.User;

namespace ProjectASP.Application.Features.Accounts.Commands;
public class GetMaterialRequest : IRequest<List<Domain.Entities.Material>>
{
    public Guid? Id { get; set; }
}

public class GetMaterialRequestHandler : IRequestHandler<GetMaterialRequest, List<Domain.Entities.Material>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserProvider _userProvider;

    public GetMaterialRequestHandler(IUnitOfWork unitOfWork, IUserProvider userProvider)
    {
        _unitOfWork = unitOfWork;
        _userProvider = userProvider;
    }

    public async Task<List<Domain.Entities.Material>> Handle(GetMaterialRequest request, CancellationToken cancellationToken)
    {
        var loggedUser = await _userProvider.ProvideAsync(cancellationToken);
        var materials = await _unitOfWork.Materials
            .Where(a => a.StoreId == loggedUser.StoreId && (a.Id==request.Id || !request.Id.HasValue))
            .ToListAsync(cancellationToken);
        return materials;
    }
}