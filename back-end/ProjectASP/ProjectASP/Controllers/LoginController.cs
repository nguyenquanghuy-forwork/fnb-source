using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using ProjectASP.API.Controllers.Base;
using ProjectASP.Application.Features.Login.Commands;
using ProjectASP.Common.Wrappers;
using System.Net;

namespace ProjectASP.API.Controllers
{
    public class LoginController : BaseApiController
    {
        public LoginController(IMediator mediator) : base(mediator)
        {
        }

        /// <summary>
        /// Authenticate by token
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("authenticate")]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<AuthenticateByTokenResponse>))]
        public async Task<IActionResult> AuthenticateByToken([FromBody] AuthenticateByTokenRequest request)
        {
            var response = await _mediator.Send(request);
            return SafeOk(response);
        }

        /// <summary>
        /// This is a method that checks a user's credentials
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The JSON store list object</returns>
        [HttpPost]
        [SwaggerResponse(HttpStatusCode.OK, typeof(OpenApiResponse<LoginResponse>))]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var response = await _mediator.Send(request);
            return SafeOk(response);
        }
    }
}
