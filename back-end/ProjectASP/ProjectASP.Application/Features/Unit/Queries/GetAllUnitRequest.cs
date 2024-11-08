using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using ProjectASP.Application.Wrappers;
using ProjectASP.Domain.Entities;
using ProjectASP.Domain.Settings;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.User;
using System.ComponentModel.DataAnnotations;

namespace ProjectASP.Application.Features.Unit.Queries;
public class GetAllUnitRequest : IRequest<List<Domain.Entities.Unit>>
{
    public Guid? StoreId { get; set; }
}

public class GetAllUnitRequestHandler : IRequestHandler<GetAllUnitRequest, List<Domain.Entities.Unit>>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserProvider _userProvider;

    public GetAllUnitRequestHandler(IUnitOfWork unitOfWork, IUserProvider userProvider)
    {
        _unitOfWork = unitOfWork;
        _userProvider = userProvider;
    }

    public async Task<List<Domain.Entities.Unit>> Handle(GetAllUnitRequest request, CancellationToken cancellationToken)
    {
        try
        {
            var loggedUser = await _userProvider.ProvideAsync(cancellationToken);
            var units = await _unitOfWork.Units
                .Where(a => a.StoreId == loggedUser.StoreId)
                .ToListAsync(cancellationToken);

            return units;
        }
        catch (Exception ex)
        {
            return null;
        }
    }
}