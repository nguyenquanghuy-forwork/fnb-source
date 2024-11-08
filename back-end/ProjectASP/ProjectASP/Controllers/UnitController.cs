using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ProjectASP.API.Controllers.Base;
using ProjectASP.Application.Features.Login.Commands;
using ProjectASP.Application.Features.Unit.Commands;
using ProjectASP.Application.Features.Unit.Queries;
using ProjectASP.Common.Wrappers;
using System.Net;

namespace ProjectASP.API.Controllers
{
    public class UnitController : BaseApiController
    {
        public UnitController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        /// Authenticate by token
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("create-unit")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<List<Domain.Entities.Unit>>))]
        public async Task<IActionResult> CreateUnit([FromBody] CreateUnitRequest request)
        {
            var response = await _mediator.Send(request);
            return SafeOk(response);
        }

        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<List<Domain.Entities.Unit>>))]
        public async Task<IActionResult> GetAllUnit([FromQuery] GetAllUnitRequest request)
        {
            var result = await _mediator.Send(request);
            return SafeOk(result);
        }
    }

}
