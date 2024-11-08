using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Common.Exceptions;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.User;

namespace ProjectASP.Application.Features.Accounts.Commands;
public class CreateOrUpdateMaterialRequest : IRequest<Domain.Entities.Material>
{
    public Guid? Id { get; set; }
    public Decimal Cost { get; set; }
    public string? Description { get; set; }
    public object? Images { get; set; }
    public required string Name { get; set; }
    public Decimal? QuantityMaterial { get; set; }
    public Guid? Unit { get; set; }
}

public class CreateOrUpdateMaterialRequestHandler : IRequestHandler<CreateOrUpdateMaterialRequest, Domain.Entities.Material>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserProvider _userProvider;

    public CreateOrUpdateMaterialRequestHandler(IUnitOfWork unitOfWork, IUserProvider userProvider)
    {
        _unitOfWork = unitOfWork;
        _userProvider = userProvider;
    }

    public async Task<Domain.Entities.Material> Handle(CreateOrUpdateMaterialRequest request, CancellationToken cancellationToken)
    {
        var loggedUser = await _userProvider.ProvideAsync(cancellationToken);
        if (!request.Id.HasValue)
        {
            var materialQuery = await _unitOfWork.Materials
                                        .Where(a => a.StoreId == loggedUser.StoreId
                                                    && a.Name.ToLower() == request.Name.ToLower())
                                        .FirstOrDefaultAsync(cancellationToken);
            if (materialQuery != null)
            {
                throw new ApiException("Your Material was existed");
            }

            Domain.Entities.Material material = new Domain.Entities.Material()
            {
                CostPerUnit = request.Cost,
                Description = request.Description ?? "",
                Thumbnail = "",
                Name = request.Name,
                Quantity = request.QuantityMaterial,
                UnitId = request.Unit,
                StoreId = loggedUser.StoreId,
                Sku = ""
            };

            await _unitOfWork.Materials.AddAsync(material);
            await _unitOfWork.SaveChangesAsync();

            return material;
        }
        else
        {
            var materialQuery = await _unitOfWork.Materials
                                        .Where(a => a.StoreId == loggedUser.StoreId
                                                && a.Name.ToLower() == request.Name.ToLower())
                                        .FirstOrDefaultAsync(cancellationToken);
            if (materialQuery == null)
            {
                throw new ApiException("Cannot Find Material for Update Action");
            }
            materialQuery.CostPerUnit = request.Cost;

            materialQuery.Description = request.Description ?? "";
            materialQuery.Thumbnail = "";
            materialQuery.Name = request.Name;
            materialQuery.Quantity = request.QuantityMaterial;
            materialQuery.UnitId = request.Unit;

            await _unitOfWork.Materials.ModifyAsync(materialQuery);
            await _unitOfWork.SaveChangesAsync();
            return materialQuery;
        }
    }
}