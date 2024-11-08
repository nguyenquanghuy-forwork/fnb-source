using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using ProjectASP.Common.Attributes;
using ProjectASP.Domain.Settings;
using ProjectASP.Infrastructure;
using ProjectASP.Interfaces;
using ProjectASP.Interfaces.ISevices.Facebook;
using ProjectASP.Interfaces.ISevices.Partner;
using ProjectASP.Loging.Serilog;
using ProjectASP.Services.Facebook;
using ProjectASP.Services.Partner;
using Scrutor;

namespace ProjectASP.Services
{
    public static class InitServices
    {
        public static IServiceCollection AddInitServices(this IServiceCollection services, IConfiguration configuration)
        {
            /// Register settings
            services.Configure<AppSettings>(configuration.GetSection(nameof(AppSettings)));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddHttpClient();
            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddDbContext<GoFnbSocialDbContext>(options => options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
            services.AutoWire(); /// Auto register services via AutoServiceAttribute
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IPartnerService, PartnerService>();
            services.AddScoped<IFacebookService, FacebookService>();

            return services;
        }

        public static IServiceCollection AddIdentityInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = configuration.GetSection(nameof(JWTSettings)).Get<JWTSettings>();
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidIssuer = jwtSettings.Issuer,
                    ValidAudience = jwtSettings.Audience,
                    ClockSkew = TimeSpan.Zero,
                    IssuerSigningKey = new SymmetricSecurityKey(jwtSettings.SecretBytes)
                };
                options.Events = new JwtBearerEvents
                {
                    OnAuthenticationFailed = context =>
                    {
                        /// SecurityTokenExpiredException
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    },
                };
            });

            return services;
        }
        public static IServiceCollection RegisterApplicationInsightsLogging(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddSingleton(Serilog.Log.Logger);
            services.EnableSqlCommandTextInstrumentation(configuration);
            services.SetupApplicationInsightsTelemetry(configuration);
            services.CreateLogger(configuration);

            return services;
        }

        public static IServiceCollection WithScopedLifetime<T>(this IServiceCollection services)
        {
            /// use Scrutor to scan services from asembly
            services.Scan(scan => scan
                .FromAssemblyOf<T>()
                .AddClasses()
                .AsImplementedInterfaces()
                .UsingRegistrationStrategy(RegistrationStrategy.Skip)
                .AsMatchingInterface()
                .WithScopedLifetime());

            return services;
        }
    }
}
