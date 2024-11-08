using ProjectASP.Domain;
using ProjectASP.Domain.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectASP.Domain.Entities
{
    [Table(nameof(Token))]
    public class Token : BaseEntity
    {
        public string AccessToken { get; set; }

        public string RefreshToken { get; set; }

        public Guid PartnerId { get; set; }

        public Guid AccountId { get; set; }

        public EnumPartner Type { get; set; }

        public int AccessTokenExpireIn { get; set; }
    }
}
