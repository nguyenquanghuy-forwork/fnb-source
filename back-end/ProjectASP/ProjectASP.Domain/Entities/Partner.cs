using ProjectASP.Domain;
using ProjectASP.Domain.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectASP.Domain.Entities
{
    [Table(nameof(Partner))]
    public class Partner : BaseEntity
    {
        [MaxLength(100)]
        public string UserId { get; set; }

        public EnumPartner Type { get; set; }

        public string? Avatar { get; set; }

        [MaxLength(255)]
        public string Name { get; set; }

        public Guid AccountId { get; set; }

        public bool IsConnected { get; set; }

        public string? ExtraInfo { get; set; }

    }
}
