using ProjectASP.Domain.Entities;
using MediatR;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.User;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Common.Exceptions;
using Microsoft.CodeAnalysis.Differencing;

namespace ProjectASP.Application.Features.Products.Commands
{
    public class CreateOrderRequest : IRequest<bool>
    {
        public string Note { get; set; }
        public List<OrderItemDto> Items { get; set; }

        public class OrderItemDto
        {
            public Guid ProductPriceId { get; set; }
            public string ProductPriceName { get; set; }
            public decimal OriginalPrice { get; set; }
            public int Quantity { get; set; }
            public string ProductName { get; set; }
            public string Notes { get; set; }
        }
    }

    public class CreateOrderRequestHandler : IRequestHandler<CreateOrderRequest, bool>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserProvider _userProvider;

        public CreateOrderRequestHandler(
            IUnitOfWork unitOfWork, IUserProvider userProvider
        )
        {
            _unitOfWork = unitOfWork;
            _userProvider = userProvider;
        }

        public async Task<bool> Handle(CreateOrderRequest request, CancellationToken cancellationToken)
        {
            try
            {
                var loggedUser = await _userProvider.ProvideAsync(cancellationToken);
                if (request == null || request.Items.Count == 0)
                {
                    return false;
                }

                var order = new Domain.Entities.Order
                {
                    Note = request.Note,
                    OriginalPrice = request.Items.Sum(i => i.OriginalPrice * i.Quantity),
                    TotalAmount = request.Items.Sum(i => i.OriginalPrice * i.Quantity),
                    Status = "Pending",
                    CashierName = "Default",
                    StoreId = loggedUser.StoreId,
                    OrderItems = request.Items.Select(i => new OrderItem
                    {
                        ProductPriceId = i.ProductPriceId,
                        ProductPriceName = i.ProductPriceName,
                        OriginalPrice = i.OriginalPrice,
                        Quantity = i.Quantity,
                        ProductName = i.ProductName,
                        Notes = i.Notes
                    }).ToList()
                };

                await _unitOfWork.Orders.AddAsync(order);

                //foreach (var item in request.Items)
                //{
                //    var productPriceMaterial = await _unitOfWork.ProductPriceMaterials
                //        .FirstOrDefaultAsync(ppm => ppm.ProductPriceId == item.ProductPriceId);
                //    if (productPriceMaterial != null)
                //    {
                //        productPriceMaterial.Quantity -= item.Quantity;
                //    }
                //}

                await _unitOfWork.SaveChangesAsync(cancellationToken);
                return true;
            }
            catch( Exception ex )
            {
                return false;
            }
            
        }

    }
}
