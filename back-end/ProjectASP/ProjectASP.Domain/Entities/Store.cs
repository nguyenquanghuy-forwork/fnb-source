using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Domain;
using ProjectASP.Domain.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;
using System.Net;
using System.Reflection.Metadata;

namespace ProjectASP.Domain.Entities
{
    [Table(nameof(Store))]
    public class Store : BaseEntity
    {
        public Guid AddressId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Code { get; set; }

        public string Logo { get; set; }

        [MaxLength(100)]
        public string Title { get; set; } // Store name

        public bool IsActivated { get; set; }

        public virtual ICollection<Product> Products { get; set; }

        public virtual ICollection<Material> Materials { get; set; }
    }
}
