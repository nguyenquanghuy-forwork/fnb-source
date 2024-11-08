using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using ProjectASP.Common.Exceptions;
using ProjectASP.Common.Extensions;
using System.Net;

namespace ProjectASP.Common.Wrappers
{
    public class ResponseWrapper
    {
        private readonly RequestDelegate _next;

        public ResponseWrapper(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception error)
            {
                var response = context.Response;
                response.ContentType = "application/json";
                var responseModel = OpenApiResponse.CreateFail(error?.Message);
                response.StatusCode = error switch
                {
                    ApiException => (int)HttpStatusCode.BadRequest,// custom application error
                    KeyNotFoundException => (int)HttpStatusCode.NotFound,// not found error
                    _ => (int)HttpStatusCode.InternalServerError,// unresolved error
                };

                var result = responseModel.ToJsonWithCamelCase();

                await response.WriteAsync(result);
            }
        }
    }

    public static class ResponseWrapperExtensions
    {
        public static IApplicationBuilder UseResponseWrapper(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ResponseWrapper>();
        }
    }


    public class OpenApiResponse
    {
        public bool Success { get; set; }

        public string Message { get; set; }

        public static OpenApiResponse CreateSuccess(string message = OpenApiResponseMessageContants.REQUEST_SUCCEEDED)
        {
            return new OpenApiResponse(message, true);
        }

        public static OpenApiResponse CreateFail(string message = OpenApiResponseMessageContants.REQUEST_FAILED)
        {
            return new OpenApiResponse(message, false);
        }

        protected OpenApiResponse(string message = "", bool success = true)
        {
            Success = success;
            Message = message;
        }
    }

    public class OpenApiResponse<T> : OpenApiResponse
    {
        public new T? Data { get; set; }

        public static OpenApiResponse CreateSuccess(T value, string message = OpenApiResponseMessageContants.REQUEST_SUCCEEDED)
        {
            return new OpenApiResponse<T>
            {
                Success = true,
                Data = value,
                Message = message
            };
        }

        public static OpenApiResponse CreateFail(T value, string message = OpenApiResponseMessageContants.REQUEST_FAILED)
        {
            return new OpenApiResponse<T>
            {
                Success = false,
                Data = value,
                Message = message
            };
        }
    }

    public class OpenApiResponseMessageContants
    {
        public const string REQUEST_SUCCEEDED = "Request succeeded";

        public const string REQUEST_FAILED = "Request failed";

        public const string VALIDATE_MESSAGE = "One or more validation errors occurred";
    }
}
