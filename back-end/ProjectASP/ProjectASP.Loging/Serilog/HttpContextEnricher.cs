using Microsoft.AspNetCore.Http;
using Serilog.Core;
using Serilog.Events;

namespace ProjectASP.Loging.Serilog
{
    public class HttpContextEnricher : ILogEventEnricher
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public HttpContextEnricher(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
        {
            HttpContext ctx = _httpContextAccessor.HttpContext;
            if (ctx == null) return;

            var userId = ctx.User?.FindFirst("ID")?.Value;
            if (!string.IsNullOrEmpty(userId))
            {
                logEvent.AddPropertyIfAbsent(new LogEventProperty("UserId", new ScalarValue(userId)));
            }
        }
    }
}
