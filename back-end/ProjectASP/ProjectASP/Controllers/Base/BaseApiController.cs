using MediatR;
using Microsoft.AspNetCore.Mvc;
using ProjectASP.Common.Wrappers;

namespace ProjectASP.API.Controllers.Base
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected readonly IMediator _mediator;

        public BaseApiController(IMediator mediator)
        {
            _mediator = mediator;
        }

        protected ActionResult SafeOk<T>(List<T> value)
        {
            if (value == null) return Ok(OpenApiResponse.CreateSuccess());

            return Ok(OpenApiResponse<List<T>>.CreateSuccess(value));
        }

        protected ActionResult SafeOk<T>(IList<T> value)
        {
            if (value == null) return Ok(OpenApiResponse<IList<T>>.CreateSuccess(new List<T>()));

            return Ok(OpenApiResponse<IList<T>>.CreateSuccess(value));
        }

        protected ActionResult SafeOk(object value)
        {
            if (value == null) return Ok(OpenApiResponse<object>.CreateSuccess(value));

            return Ok(OpenApiResponse<object>.CreateSuccess(value));
        }

        protected ActionResult SafeOk() => Ok(OpenApiResponse.CreateSuccess());
    }
}
