using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ProjectASP.API.Controllers.Base;
using ProjectASP.Application.Features.Order.Queries;
using ProjectASP.Application.Features.Products.Commands;
using ProjectASP.Application.Features.Products.Queries;
using ProjectASP.Common.Wrappers;
using System.Net;

namespace ProjectASP.API.Controllers
{
    public class OrderController : BaseApiController
    {
        public OrderController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        /// Authenticate by token
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("order/create")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<List<Domain.Entities.Order>>))]
        public async Task<IActionResult> CreateOrderAsync([FromBody] CreateOrderRequest request)
        {
            var response = await _mediator.Send(request);
            return SafeOk(response);
        }

        /// <summary>
        /// Get product list
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<GetOrdersResponse>))]
        public async Task<IActionResult> GetProductsAsync([FromQuery] GetOrderRequest request)
        {
            var response = await _mediator.Send(request);
            return SafeOk(response);
        }
    }
}
