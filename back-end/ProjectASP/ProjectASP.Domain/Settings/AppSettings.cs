namespace ProjectASP.Domain.Settings
{
    public class AppSettings
    {
        public string Environment { get; set; }

        public Socials Socials { get; set; }

        public string DomainAdminWebApi { get; set; }

        public string APIVersion { get; set; }

    }
    public class Socials
    {
        public TiktokShop TiktokShop { get; set; }

        public Facebook Facebook { get; set; }
    }

    public class TiktokShop
    {
        public string TiktokShopAuthUrl { get; set; }

        public string TiktokShopAPIUrl { get; set; }

        public string AppKey { get; set; }

        public string AppSecret { get; set; }
    }

    public class Facebook
    {
        public string FacebookAuthUrl { get; set; }

        public string FacebookAPIUrl { get; set; }

        public string Version { get; set; }

        public string AppId { get; set; }

        public string AppSecret { get; set; }
    }
}
