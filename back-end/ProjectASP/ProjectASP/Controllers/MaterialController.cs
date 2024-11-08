using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ProjectASP.API.Controllers.Base;
using ProjectASP.Application.Features.Accounts.Commands;
using ProjectASP.Common.Wrappers;
using ProjectASP.Domain.Entities;
using System.Net;

namespace ProjectASP.API.Controllers;
public class MaterialController(IMediator mediator) : BaseApiController(mediator)
{
    [HttpPost]
    [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<Domain.Entities.Material>))]
    public async Task<IActionResult> CreateOrUpdate(CreateOrUpdateMaterialRequest request)
    {
        var result = await _mediator.Send(request);
        return SafeOk(result);
    }

    [HttpGet]
    [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<List<Domain.Entities.Material>>))]
    public async Task<IActionResult> GetMaterial([FromQuery] GetMaterialRequest request)
    {
        var result = await _mediator.Send(request);
        return SafeOk(result);
    }

    [HttpDelete]
    [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<List<Domain.Entities.Material>>))]
    public async Task<IActionResult> DeleteMaterial([FromQuery] Guid Id)
    {
        var result = await _mediator.Send(new DeleteMaterialRequest (){ Id = Id });
        return SafeOk(result);
    }
}
