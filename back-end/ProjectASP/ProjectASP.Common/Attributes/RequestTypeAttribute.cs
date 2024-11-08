using System;

namespace ProjectASP.Common.Attributes
{
    public class RequestTypeAttribute : Attribute
    {
        public RequestTypeAttribute(string requestType)
        {
            RequestType = requestType;
        }

        public virtual string RequestType { get; }
    }
}
