namespace ProjectASP.Application.Models.Facebook
{
    public class FacebookModel
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public string? Avatar { get; set; }

        public string Name { get; set; }

        public Guid AccountId { get; set; }

        public bool IsConnected { get; set; }
    }
}
