using Microsoft.CodeAnalysis;
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
    [Table(nameof(Unit))]
    public class Unit : BaseEntity
    {
        public Guid StoreId { get; set; }

        /// <summary>
        /// The database generates a value when a row is inserted.
        /// </summary>
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Code { get; set; }

        [MaxLength(50)]
        public string Name { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Store Store { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Product> Products { get; set; }

        [JsonIgnore]
        [IgnoreDataMember]
        public virtual ICollection<Material> Materials { get; set; }
    }
}
