using ProjectASP.Common.Exceptions;
using Newtonsoft.Json;

namespace ProjectASP.Common.Exceptions.ErrorModel
{
    public class ErrorModel
    {
        [JsonProperty("message")]
        public string Message { get; set; }

        [JsonProperty("innerMessage")]
        public string InnerMessage { get; set; }

        [JsonProperty("errors")]
        public List<ErrorItemModel> Errors { get; set; }

        [JsonProperty("error")]
        public string Error { get; set; }

        [JsonProperty("errorTime")]
        public DateTime? ErrorTime { get; set; }

        [SwashbuckleIgnore()]
        [JsonProperty("stackTrace", NullValueHandling = NullValueHandling.Ignore)]
        public string StackTrace { get; set; }
    }
}
