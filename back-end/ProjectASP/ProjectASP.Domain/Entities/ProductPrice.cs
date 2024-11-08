using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectASP.Domain.Entities
{
    [Table(nameof(ProductPrice))]
    public class ProductPrice : BaseEntity
    {
        public Guid ProductId { get; set; }

        public int Code { get; set; }

        [MaxLength(100)]
        public string PriceName { get; set; }

        [Precision(18, 2)]
        public decimal PriceValue { get; set; }

        public Guid? StoreId { get; set; }

        public virtual Product Product { get; set; }

        public virtual ICollection<ProductPriceMaterial> ProductPriceMaterials { get; set; }
    }
}
