using Newtonsoft.Json;

namespace ProjectASP.Common.Models.Facebook
{
    public class UserProfileResponse
    {
        [JsonProperty("id")]
        public string UserId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("email")]
        public string Email { get; set; }

        [JsonProperty("birthday")]
        public string Birthday { get; set; }

        [JsonProperty("picture")]
        public Picture Picture { get; set; }
    }

    public class Picture
    {
        [JsonProperty("data")]
        public PictureData Data { get; set; }
    }

    public class PictureData
    {
        [JsonProperty("url")]
        public string Url { get; set; }
    }
}
