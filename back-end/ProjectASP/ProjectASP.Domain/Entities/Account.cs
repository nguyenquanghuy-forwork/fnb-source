using Microsoft.CodeAnalysis;
using ProjectASP.Domain;
using ProjectASP.Domain.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;

namespace ProjectASP.Domain.Entities
{
    [Table(nameof(Account))]
    public class Account : BaseEntity
    {
        public Guid? StoreId { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Code { get; set; }

        [MaxLength(100)]
        public string Username { get; set; }

        [MaxLength(500)]
        public string Password { get; set; }

        [MaxLength(250)]
        public string FullName { get; set; }

        [MaxLength(50)]
        public string ValidateCode { get; set; }

        public bool EmailConfirmed { get; set; }

        public Guid? PlatformId { get; set; }

        public bool IsActivated { get; set; }

        [MaxLength(50)]
        public string PhoneNumber { get; set; }

        public string Thumbnail { get; set; }

        public DateTime? Birthday { get; set; }

        [Description("1.Male 2.Female 3.Other")]
        public EnumGender Gender { get; set; }
    }
}
