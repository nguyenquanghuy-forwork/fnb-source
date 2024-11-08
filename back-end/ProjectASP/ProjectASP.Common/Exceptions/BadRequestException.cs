using ProjectASP.Common.Exceptions.ErrorModel;
using System.Net;
using System.Runtime.Serialization;

namespace ProjectASP.Common.Exceptions
{
    [Serializable]
    public class BadRequestException : HttpStatusCodeException
    {
        public BadRequestException() : this("A bad request was made") { }

        public BadRequestException(string message) : base(message) { }

        public BadRequestException(List<ErrorItemModel> errors) : base(errors) { }

        public BadRequestException(ErrorItemModel error) : base(error) { }

        public BadRequestException(string message, Exception innerException) : base(message, innerException) { }

        protected BadRequestException(SerializationInfo info, StreamingContext context) : base(info, context) { }

        public override HttpStatusCode HttpStatusCode => HttpStatusCode.BadRequest;
    }
}
