using ProjectASP.Common.Attributes;
using Microsoft.Extensions.DependencyInjection;
using ProjectASP.Interfaces.ISevices.Product;

namespace ProjectASP.Services.Product
{
    [AutoService(typeof(IProductService), Lifetime = ServiceLifetime.Scoped)]
    public class ProductService : IProductService
    {
    }
}
