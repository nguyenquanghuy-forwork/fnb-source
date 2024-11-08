using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Domain;
using ProjectASP.Domain.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace ProjectASP.Domain.Entities
{
    [Table(nameof(ProductPriceMaterial))]
    public class ProductPriceMaterial : BaseEntity
    {
        public Guid ProductPriceId { get; set; }

        public Guid MaterialId { get; set; }

        [Precision(18, 2)]
        public decimal Quantity { get; set; }

        // public decimal Cost { get; set; }

        public Guid? StoreId { get; set; }

        public Guid? UnitId { get; set; }

        public virtual Unit Unit { get; set; }

        public virtual Material Material { get; set; }

        public virtual ProductPrice ProductPrice { get; set; }
    }
}
