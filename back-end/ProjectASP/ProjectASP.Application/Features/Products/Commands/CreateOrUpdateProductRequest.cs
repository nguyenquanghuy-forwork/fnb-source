using ProjectASP.Domain.Entities;
using MediatR;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.User;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Common.Exceptions;
using Microsoft.CodeAnalysis.Differencing;

namespace ProjectASP.Application.Features.Products.Commands
{
    public class CreateOrUpdateProductRequest : IRequest<bool>
    {
        public Guid? Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public string? Media { get; set; }
        public Decimal? Price { get; set; }
        public Guid? UnitId {  get; set; }
        public List<MaterialRequest>? Materials { get; set; }
        public class MaterialRequest
        {
            public Guid? MaterialId { get; set; }
            public Decimal? Quantity {  get; set; }   
        }
    }

    public class CreateOrUpdateProductRequestHandler : IRequestHandler<CreateOrUpdateProductRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserProvider _userProvider;

        public CreateOrUpdateProductRequestHandler(
            IUnitOfWork unitOfWork, IUserProvider userProvider
        )
        {
            _unitOfWork = unitOfWork;
            _userProvider = userProvider;
        }

        public async Task<bool> Handle(CreateOrUpdateProductRequest request, CancellationToken cancellationToken)
        {
            var loggedUser = await _userProvider.ProvideAsync(cancellationToken);
            if (request.Id.HasValue)
            {
                var product= await _unitOfWork.Products
                                           .Where(a => a.StoreId == loggedUser.StoreId
                                                       && a.Id==request.Id.Value)
                                           .FirstOrDefaultAsync(cancellationToken);
                var productPrice = await _unitOfWork.ProductPrices
                                           .Where(a => a.StoreId == loggedUser.StoreId
                                                       && a.ProductId == product.Id)
                                           .FirstOrDefaultAsync(cancellationToken);
                var productPriceMaterials = await _unitOfWork.ProductPriceMaterials
                                           .Where(a => a.StoreId == loggedUser.StoreId
                                                       && a.ProductPriceId == productPrice.Id)
                                           .ToListAsync(cancellationToken);
                if (product == null || productPrice == null || productPriceMaterials == null)
                {
                    throw new ApiException("Your Product wasnot existed");
                }

                product.Name = request.Name;
                product.UnitId = request.UnitId;
                product.Description = request.Description;
                productPrice.PriceValue = request.Price ?? 0;

                List<Domain.Entities.ProductPriceMaterial> productPriceMaterialsAddNew = new List<Domain.Entities.ProductPriceMaterial>();
                await _unitOfWork.ProductPriceMaterials.RemoveRangeAsync(productPriceMaterials);
                
                foreach (var material in request.Materials)
                {
                    var productPriceMaterial = new Domain.Entities.ProductPriceMaterial
                    {
                        ProductPriceId = productPrice.Id,
                        MaterialId = material.MaterialId.Value,
                        Quantity = material.Quantity ?? 1,
                        StoreId = product.StoreId,
                    };
                    productPriceMaterialsAddNew.Add(productPriceMaterial);
                }
                await _unitOfWork.ProductPriceMaterials.AddRangeAsync(productPriceMaterialsAddNew);
                await _unitOfWork.SaveChangesAsync();
            }
            else
            {
                var productQuery = await _unitOfWork.Products
                                           .Where(a => a.StoreId == loggedUser.StoreId
                                                       && a.Name.ToLower() == request.Name.ToLower())
                                           .FirstOrDefaultAsync(cancellationToken);

                if (productQuery != null)
                {
                    throw new ApiException("Your Product was existed");
                }
                try
                {
                    Domain.Entities.Product product = new Domain.Entities.Product()
                    {
                        Name = request.Name ?? "",
                        Description = request.Description ?? "",
                        Thumbnail = request.Media ?? "https://gcs.tripi.vn/public-tripi/tripi-feed/img/474079iBp/anh-nen-tra-sua-hoat-hinh-cute-nhat_104118888.png",
                        UnitId = request.UnitId,
                        Abbreviation = "",
                        StoreId = loggedUser.StoreId ?? Guid.Empty,
                    };
                    Domain.Entities.ProductPrice productPrice = new Domain.Entities.ProductPrice()
                    {
                        ProductId = product.Id,
                        Code = product.Code,
                        PriceName = "default",
                        PriceValue = request.Price ?? 0,
                        StoreId = product.StoreId
                    };

                    List<Domain.Entities.ProductPriceMaterial> productPriceMaterials = new List<Domain.Entities.ProductPriceMaterial>();

                    foreach (var material in request.Materials)
                    {
                        var productPriceMaterial = new Domain.Entities.ProductPriceMaterial
                        {
                            ProductPriceId = productPrice.Id,
                            MaterialId = material.MaterialId.Value,
                            Quantity = material.Quantity ?? 1,
                            StoreId = product.StoreId,
                        };

                        productPriceMaterials.Add(productPriceMaterial);
                    }

                    await _unitOfWork.Products.AddAsync(product);
                    await _unitOfWork.ProductPrices.AddAsync(productPrice);
                    await _unitOfWork.ProductPriceMaterials.AddRangeAsync(productPriceMaterials);
                    await _unitOfWork.SaveChangesAsync();
                }
                catch (Exception ex)
                {

                }
            }
            return true;
        }

    }
}
