using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Serilog;
using Serilog.Configuration;

namespace ProjectASP.Loging.Serilog
{
    public static class LoggingExtensions
    {
        public static LoggerConfiguration WithHttpContext(this LoggerEnrichmentConfiguration enrichConfiguration, IServiceProvider serviceProvider)
        {
            if (enrichConfiguration is null) throw new ArgumentNullException(nameof(enrichConfiguration));

            var enricher = serviceProvider.GetService<HttpContextEnricher>();
            var enrichConfig = enrichConfiguration.With(enricher);

            return enrichConfig;
        }

        /// <summary>
        /// Add log record to trace table on azure
        /// </summary>
        /// <param name="input"></param>
        public static void AddTraceLog(this object input)
        {
            Log.Information(JsonConvert.SerializeObject(input));
        }

        /// <summary>
        /// Add log record to trace table on azure
        /// </summary>
        /// <param name="input"></param>
        public static void AddTraceLog(this object input, string keyName, string requestUrl = null)
        {
            var logRequest = new JObject
            {
                { "key", keyName },
                { "data", JsonConvert.SerializeObject(input)},
            };

            if (!string.IsNullOrWhiteSpace(requestUrl))
            {
                logRequest.Add("requestUrl", requestUrl);
            }

            Log.Information(JsonConvert.SerializeObject(logRequest));
        }
    }
}
