using System;
using System.Net;
using System.Text;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace ProjectASP.Common.Exceptions
{
    [Serializable]
    public class ForbiddenException : HttpStatusCodeException
    {
        public ForbiddenException() : this("Access was forbidden") { }

        public ForbiddenException(string message) : base(message) { }

        public ForbiddenException(string message, Exception innerException) : base(message, innerException) { }

        protected ForbiddenException(SerializationInfo info, StreamingContext context) : base(info, context) { }

        public override HttpStatusCode HttpStatusCode => HttpStatusCode.Forbidden;
    }
}
