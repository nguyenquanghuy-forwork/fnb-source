using Microsoft.Extensions.DependencyInjection;
using ProjectASP.Application.Providers;
using ProjectASP.Interfaces.ISevices.User;
using System.Reflection;

namespace ProjectASP.Application
{
    public static class ServiceExtensions
    {
        public static void AddApplicationServices(this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly()));
            services.AddHttpContextAccessor();
            services.AddScoped<IUserProvider, HttpUserProvider>();
        }
    }
}
