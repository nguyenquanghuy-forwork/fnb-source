using Microsoft.ApplicationInsights.DependencyCollector;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace ProjectASP.Loging.Serilog
{
    public static class SerilogStartupExtension
    {
        private static string defaultRoleName = "ProjectASP.API";

        public static void EnableSqlCommandTextInstrumentation(this IServiceCollection services, IConfiguration configuration)
        {
            _ = bool.TryParse(configuration.GetSection("Serilog:EnableSqlCommandText").Value, out bool enableSqlCommandText);
            if (enableSqlCommandText)
            {
                //DependencyTrackingTelemetryModule
                services.ConfigureTelemetryModule<DependencyTrackingTelemetryModule>((module, o) =>
                {
                    module.EnableSqlCommandTextInstrumentation = true;
                });
            }
        }

        public static void SetupApplicationInsightsTelemetry(this IServiceCollection services, IConfiguration configuration, string roleName = null, string instrumenationKey = null)
        {
            roleName = configuration.GetSection("Serilog:WriteTo:0:Args:roleName").Value;
            var roleInstance = configuration.GetSection("Serilog:WriteTo:0:Args:roleInstance").Value;
            if (string.IsNullOrWhiteSpace(roleName))
            {
                roleName = defaultRoleName;
            }

            services.Add(new ServiceDescriptor(typeof(ITelemetryInitializer), p => new TelemetryInitializer(roleName, roleInstance), ServiceLifetime.Singleton));

            if (string.IsNullOrEmpty(instrumenationKey))
            {
                instrumenationKey = configuration.GetSection("Serilog:WriteTo:0:Args:instrumentationKey").Value;
            }

            services.AddSingleton<HttpContextEnricher>();
            services.AddApplicationInsightsTelemetry(instrumenationKey);
        }

        public static void CreateLogger(this IServiceCollection services, IConfiguration configuration)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.WithHttpContext(services.BuildServiceProvider())
                .ReadFrom.Configuration(configuration)
                .CreateLogger();
        }
    }
}
