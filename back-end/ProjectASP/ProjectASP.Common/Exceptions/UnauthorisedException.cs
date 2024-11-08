using System.Net;
using System.Runtime.Serialization;

namespace ProjectASP.Common.Exceptions
{
    [Serializable]
    public class UnauthorisedException : HttpStatusCodeException
    {
        public UnauthorisedException() : this("Unauthorised user") { }

        public UnauthorisedException(string message) : base(message) { }

        public UnauthorisedException(string message, Exception innerException) : base(message, innerException) { }

        protected UnauthorisedException(SerializationInfo info, StreamingContext context) : base(info, context) { }

        public override HttpStatusCode HttpStatusCode => HttpStatusCode.Unauthorized;
    }
}
