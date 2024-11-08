using ProjectASP.Domain;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectASP.Domain.Entities
{
    [Table(nameof(ApiConfig))]
    public class ApiConfig : BaseEntity
    {
        public Guid? ApiConfigGroupId { get; set; }

        [MaxLength(255)]
        public string? ApiConfigGroupName { get; set; }

        [MaxLength(255)]
        public string? Name { get; set; }

        [MaxLength(2048)]
        public string? URL { get; set; }

        public Guid? AccountId { get; set; }

    }
}
