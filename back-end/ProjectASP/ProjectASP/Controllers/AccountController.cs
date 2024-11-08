using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ProjectASP.API.Controllers.Base;
using ProjectASP.Application.Features.Accounts.Commands;
using ProjectASP.Common.Wrappers;
using System.Net;

namespace ProjectASP.API.Controllers;
public class AccountController(IMediator mediator) : BaseApiController(mediator)
{
    [HttpPost]
    [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<RegisterAccountRequest>))]
    public async Task<IActionResult> Register(RegisterAccountRequest request)
    {
        var result = await _mediator.Send(request);
        return SafeOk(result);
    }
}
