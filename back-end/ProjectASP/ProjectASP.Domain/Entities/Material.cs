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
    [Table(nameof(Material))]
    public class Material : BaseEntity
    {
        public Guid? StoreId { get; set; }

        public Guid? UnitId { get; set; }

        /// <summary>
        /// The database generates a value when a row is inserted.
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Code { get; set; }

        [MaxLength(255)]
        public string Name { get; set; }

        [MaxLength(2000)]
        public string Description { get; set; }

        public string Sku { get; set; }

        [Precision(18, 2)]
        public decimal? MinQuantity { get; set; }

        [Precision(18, 2)]
        public decimal? Quantity { get; set; }

        [Precision(18, 2)]
        public decimal? CostPerUnit { get; set; } // the number will be calculate on purchase order

        public bool? IsActive { get; set; }

        public bool HasExpiryDate { get; set; }

        public string Thumbnail { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Store Store { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Unit Unit { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<ProductPriceMaterial> ProductPriceMaterials { get; set; }
    }
}
