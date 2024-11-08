using System;
using System.Net;
using System.Runtime.Serialization;

namespace ProjectASP.Common.Exceptions
{
    [Serializable]
    public class NotFoundException : HttpStatusCodeException
    {
        public NotFoundException() : this("Resource not found") { }

        public NotFoundException(string message) : base(message) { }

        public NotFoundException(string message, Exception innerException) : base(message, innerException) { }

        protected NotFoundException(SerializationInfo info, StreamingContext context) : base(info, context) { }

        public override HttpStatusCode HttpStatusCode => HttpStatusCode.NotFound;
    }
}
