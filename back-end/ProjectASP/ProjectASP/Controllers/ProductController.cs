using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ProjectASP.API.Controllers.Base;
using ProjectASP.Application.Features.Accounts.Commands;
using ProjectASP.Application.Features.Products.Commands;
using ProjectASP.Application.Features.Products.Queries;
using ProjectASP.Common.Wrappers;
using System.Net;

namespace ProjectASP.API.Controllers
{
    public class ProductController : BaseApiController
    {
        public ProductController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        /// Get product list
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<GetProductsResponse>))]
        public async Task<IActionResult> GetProductsAsync([FromQuery] GetProductsRequest request)
        {
            var response = await _mediator.Send(request);
            return SafeOk(response);
        }

        /// <summary>
        /// Create product
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<bool>))]
        public async Task<IActionResult> CreateOrUpdateProductsAsync([FromBody] CreateOrUpdateProductRequest request)
        {
            var response = await _mediator.Send(request);
            return SafeOk(response);
        }

        [HttpDelete]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<List<Domain.Entities.Material>>))]
        public async Task<IActionResult> DeleteMaterial([FromQuery] Guid Id)
        {
            var result = await _mediator.Send(new DeleteMaterialRequest() { Id = Id });
            return SafeOk(result);
        }
    }
}
