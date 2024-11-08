using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.User;

namespace ProjectASP.Application.Features.Products.Queries
{
    public class GetProductsRequest : IRequest<GetProductsResponse>
    {
        public Guid? Id { get; set; }

        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public string? KeySearch { get; set; }
    }

    public class GetProductsResponse
    {
        public IEnumerable<Domain.Entities.Product> Products { get; set; }

        public int PageNumber { get; set; }

        public int Total { get; set; }
    }

    public class GetProductsRequestHandler : IRequestHandler<GetProductsRequest, GetProductsResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserProvider _userProvider;

        public GetProductsRequestHandler(
            IUnitOfWork unitOfWork, IUserProvider userProvider
            )
        {
            _unitOfWork = unitOfWork;
            _userProvider = userProvider;
        }

        public async Task<GetProductsResponse> Handle(GetProductsRequest request, CancellationToken cancellationToken)
        {
            var loggedUser = await _userProvider.ProvideAsync(cancellationToken);

            IEnumerable<Domain.Entities.Product> productList = null;

            if (request.Id.HasValue)
            {
                productList = await _unitOfWork.Products
                                       .Where(a => a.StoreId == loggedUser.StoreId && (a.Id == request.Id || !request.Id.HasValue))
                                       .Select(se => new Domain.Entities.Product()
                                       {
                                           Id = se.Id,
                                           Code = se.Code,
                                           Thumbnail = se.Thumbnail,
                                           Name = se.Name,
                                           UnitId = se.UnitId,
                                           Description = se.Description,
                                           ProductPrices = se.ProductPrices.Select(pp => new Domain.Entities.ProductPrice()
                                           {
                                               Id = pp.Id,
                                               ProductId = pp.ProductId,
                                               Code = pp.Code,
                                               PriceName = pp.PriceName,
                                               PriceValue = pp.PriceValue,
                                               ProductPriceMaterials= pp.ProductPriceMaterials.Select(pp => new Domain.Entities.ProductPriceMaterial()
                                               {
                                                   Id=pp.Id,
                                                   ProductPriceId=pp.ProductPriceId,
                                                   MaterialId=pp.MaterialId,
                                                   Quantity= pp.Quantity,
                                               }).ToList(),
                                           }).ToList(),
                                       })
                                       .ToListAsync(cancellationToken);
            }
            else
            {
                productList = await _unitOfWork.Products
                                        .Where(a => a.StoreId == loggedUser.StoreId && (a.Id == request.Id || !request.Id.HasValue))
                                        .Select(se => new Domain.Entities.Product()
                                        {
                                            Id = se.Id,
                                            Code = se.Code,
                                            Thumbnail = se.Thumbnail,
                                            Name = se.Name,
                                            UnitId = se.UnitId,
                                            Description = se.Description,
                                            ProductPrices = se.ProductPrices.Select(pp => new Domain.Entities.ProductPrice()
                                            {
                                                Id = pp.Id,
                                                ProductId = pp.ProductId,
                                                Code = pp.Code,
                                                PriceName = pp.PriceName,
                                                PriceValue = pp.PriceValue,
                                            }).ToList(),
                                        })
                                        .ToListAsync(cancellationToken);
            }
            var response = new GetProductsResponse()
            {
                Products = productList
            };

            return response;
        }
    }
}
