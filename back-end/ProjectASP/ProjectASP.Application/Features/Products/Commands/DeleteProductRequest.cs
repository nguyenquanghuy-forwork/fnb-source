using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.User;

namespace ProjectASP.Application.Features.Accounts.Commands;
public class DeleteProductRequest : IRequest<Domain.Entities.Product>
{
    public Guid Id { get; set; }
}

public class DeleteProductRequestHandler : IRequestHandler<DeleteProductRequest, Domain.Entities.Product>
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserProvider _userProvider;

    public DeleteProductRequestHandler(IUnitOfWork unitOfWork, IUserProvider userProvider)
    {
        _unitOfWork = unitOfWork;
        _userProvider = userProvider;
    }

    public async Task<Domain.Entities.Product> Handle(DeleteProductRequest request, CancellationToken cancellationToken)
    {
        var loggedUser = await _userProvider.ProvideAsync(cancellationToken);
        var product = await _unitOfWork.Products
            .Where(a => a.StoreId == loggedUser.StoreId && a.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (product != null)
        {
            product.IsDeleted = true;
            await _unitOfWork.Products.ModifyAsync(product);
            await _unitOfWork.SaveChangesAsync();
        }

        return product;
    }
}