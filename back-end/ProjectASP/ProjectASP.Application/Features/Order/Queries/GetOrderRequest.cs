using MediatR;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Domain.Entities;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.User;

namespace ProjectASP.Application.Features.Order.Queries
{
    public class GetOrderRequest : IRequest<GetOrdersResponse>
    {
        public Guid? Id { get; set; }

        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public string? KeySearch { get; set; }
    }

    public class GetOrdersResponse
    {
        public IEnumerable<Domain.Entities.Order> Orders { get; set; }

        public int PageNumber { get; set; }

        public int Total { get; set; }
    }

    public class GetOrderRequestHandler : IRequestHandler<GetOrderRequest, GetOrdersResponse>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IUserProvider _userProvider;

        public GetOrderRequestHandler(
            IUnitOfWork unitOfWork, IUserProvider userProvider
            )
        {
            _unitOfWork = unitOfWork;
            _userProvider = userProvider;
        }


        public async Task<GetOrdersResponse> Handle(GetOrderRequest request, CancellationToken cancellationToken)
        {
            var loggedUser = await _userProvider.ProvideAsync(cancellationToken);


            IQueryable<Domain.Entities.Order> orderQuery = _unitOfWork.Orders
                                        .Where(o => o.StoreId == loggedUser.StoreId && (o.Id == request.Id || !request.Id.HasValue));


            int total = await orderQuery.CountAsync(cancellationToken);

            var orders = await _unitOfWork.Orders
                                .Where(a => a.StoreId == loggedUser.StoreId)
                                //.Skip((request.PageNumber - 1) * request.PageSize)
                                //.Take(request.PageSize)
                                .Select(o => new Domain.Entities.Order
                                {
                                    Id = o.Id,
                                    StoreId = o.StoreId,
                                    Note = o.Note,
                                    Code = o.Code,
                                    OriginalPrice = o.OriginalPrice,
                                    CashierName = o.CashierName,
                                    ReceivedAmount = o.ReceivedAmount,
                                    Change = o.Change,
                                    TotalAmount = o.TotalAmount,
                                    Status = o.Status,
                                    LastSavedUser = o.LastSavedUser,
                                    LastSavedTime = o.LastSavedTime,
                                    CreatedUser = o.CreatedUser,
                                    CreatedTime = o.CreatedTime,
                                    IsDeleted = o.IsDeleted,
                                    OrderItems = o.OrderItems.Select(oi => new OrderItem
                                    {
                                        Id = oi.Id,
                                        OrderId = oi.OrderId,
                                        ProductPriceId = oi.ProductPriceId,
                                        ProductPriceName = oi.ProductPriceName,
                                        OriginalPrice = oi.OriginalPrice,
                                        Quantity = oi.Quantity,
                                        Notes = oi.Notes,
                                        ProductId = oi.ProductId,
                                        ProductName = oi.ProductName,
                                        StoreId = oi.StoreId,
                                        LastSavedUser = oi.LastSavedUser,
                                        LastSavedTime = oi.LastSavedTime,
                                        CreatedUser = oi.CreatedUser,
                                        CreatedTime = oi.CreatedTime,
                                        IsDeleted = oi.IsDeleted
                                    }).ToList()
                                })
                                .ToListAsync(cancellationToken);

            var response = new GetOrdersResponse()
            {
                Orders = orders,
                PageNumber = request.PageNumber,
                Total = total
            };

            return response;
        }
    }
}
