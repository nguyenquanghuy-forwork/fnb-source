using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ProjectASP.Domain
{
    [Index(nameof(IsDeleted), IsUnique = false)]
    public abstract class BaseEntity
    {
        [Key]
        public Guid Id { get; set; } = new Microsoft.EntityFrameworkCore.ValueGeneration.SequentialGuidValueGenerator().Next(null);

        public Guid? LastSavedUser { get; set; }

        public DateTime? LastSavedTime { get; set; }

        public Guid? CreatedUser { get; set; }

        public DateTime? CreatedTime { get; set; }

        /// <summary>
        /// Mark an object status delete
        /// </summary>
        public bool IsDeleted { get; set; }
    }
}
