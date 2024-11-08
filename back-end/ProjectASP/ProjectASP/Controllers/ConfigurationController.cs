using Azure.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using System.Net;
using ProjectASP.API.Controllers.Base;
using ProjectASP.Common.Wrappers;
using ProjectASP.Application.Features.Configuration.Commands;
using ProjectASP.Application.Features.Configuration.Queries;

namespace ProjectASP.API.Controllers
{
    public class ConfigurationController : BaseApiController
    {
        public ConfigurationController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        /// Get api config
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<GetConfigurationsResponse>))]
        public async Task<IActionResult> GetApiConfigurationsAsync()
        {
            var response = await _mediator.Send(new GetApiConfigurationsRequest());
            return SafeOk(response);
        }

        /// <summary>
        /// Update api config
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<bool>))]
        public async Task<IActionResult> UpdateApiConfigurationsAsync([FromBody] UpdateApiConfigurationsRequest request)
        {
            var response = await _mediator.Send(request);
            return SafeOk(response);
        }

    }
}
