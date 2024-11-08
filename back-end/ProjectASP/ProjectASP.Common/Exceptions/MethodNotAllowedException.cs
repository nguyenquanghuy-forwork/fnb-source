using System;
using System.Net;
using System.Text;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace ProjectASP.Common.Exceptions
{
    [Serializable]
    public class MethodNotAllowedException : HttpStatusCodeException
    {
        public MethodNotAllowedException() : this("Method not found") { }

        public MethodNotAllowedException(string message) : base(message) { }

        public MethodNotAllowedException(string message, Exception innerException) : base(message, innerException) { }

        protected MethodNotAllowedException(SerializationInfo info, StreamingContext context) : base(info, context) { }

        public override HttpStatusCode HttpStatusCode => HttpStatusCode.MethodNotAllowed;
    }
}
