using Microsoft.AspNetCore.Mvc;
using ProjectASP.Common.Wrappers;

namespace ProjectASP.API
{
    public static class ServiceExtensions
    {
        public static void AddInvalidModelStateResponse(this IServiceCollection services)
        {
            services.AddMvcCore().ConfigureApiBehaviorOptions(options =>
            {
                options.InvalidModelStateResponseFactory = (errorContext) =>
                {
                    var errors = errorContext.ModelState.Where(e => e.Value.Errors.Any())
                                    .Select(err => new
                                    {
                                        err.Key,
                                        err.Value.Errors
                                    })
                                    .ToDictionary(i => i.Key, i => i.Errors.Select(e => e.ErrorMessage));

                    var result = OpenApiResponse<object>.CreateFail(errors, OpenApiResponseMessageContants.VALIDATE_MESSAGE);
                    return new BadRequestObjectResult(result);
                };
            });
        }
    }
}
