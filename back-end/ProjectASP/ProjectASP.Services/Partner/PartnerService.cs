using ProjectASP.Common.Attributes;
using Microsoft.Extensions.DependencyInjection;
using ProjectASP.Interfaces.ISevices.Partner;

namespace ProjectASP.Services.Partner
{
    [AutoService(typeof(IPartnerService), Lifetime = ServiceLifetime.Scoped)]
    public class PartnerService : IPartnerService
    {
    }
}
