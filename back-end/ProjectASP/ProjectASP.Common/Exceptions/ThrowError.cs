using Newtonsoft.Json.Linq;

namespace ProjectASP.Common.Exceptions
{
    public static class ThrowError
    {
        public static void ArgumentIsNull(object value, string paramName)
        {
            if (value == null)
            {
                throw new ArgumentNullException(paramName);
            }
        }

        /// <summary>
        /// Throws an exception of type <typeparamref name="TException"/> with the specified message
        /// when the assertion statement is true.
        /// </summary>
        /// <typeparam name="TException">The type of exception to throw.</typeparam>
        /// <param name="assertion">The assertion to evaluate. If true then the <typeparamref name="TException"/> exception is thrown.</param>
        /// <param name="message">string. The exception message to throw.</param>
        public static void Against<TException>(bool assertion, string message = null) where TException : Exception
        {
            if (assertion)
                throw (TException)Activator.CreateInstance(typeof(TException), message);
        }

        public static void Against(bool assertion, JObject errors)
        {
            Against<Exception>(assertion, errors);
        }

        public static void Against<TException>(bool assertion, JObject errors) where TException : Exception
        {
            if (assertion)
            {
                var exception = (TException)Activator.CreateInstance(typeof(TException));
                foreach (var item in errors)
                {
                    exception.Data.Add(item.Key, item.Value);
                }

                throw exception;
            }
        }

        /// <summary>
        /// Throws an exception with the specified message
        /// when the assertion statement is true.
        /// </summary>
        /// <typeparam name="TException">The type of exception to throw.</typeparam>
        /// <param name="assertion">The assertion to evaluate. If true then the <typeparamref name="TException"/> exception is thrown.</param>
        /// <param name="message">string. The exception message to throw.</param>
        public static void Against(bool assertion, string message = null)
        {
            Against<Exception>(assertion, message);
        }

        /// <param name="message">string. The exception message to throw.</param>
        public static void BadRequestAgainst(bool assertion, string message = null)
        {
            Against<BadRequestException>(assertion, message);
        }

        /// <summary>
        /// Throws an exception with the specified message
        /// when the object is null.
        /// </summary>
        /// <typeparam name="TException">The type of exception to throw.</typeparam>
        /// <param name="obj">The assertion to evaluate. If null then the <typeparamref name="TException"/> exception is thrown.</param>
        /// <param name="message">string. The exception message to throw.</param>
        public static void BadRequestAgainstNull(object obj, string message = null)
        {
            Against<BadRequestException>(obj == null, message);
        }

        /// <summary>
        /// Throws an exception of type <typeparamref name="TException"/> with the specified message
        /// when the assertion
        /// </summary>
        /// <typeparam name="TException"></typeparam>
        /// <param name="assertion"></param>
        /// <param name="message"></param>
        public static void Against<TException>(Func<bool> assertion, string message = null) where TException : Exception
        {
            //Execute the lambda and if it evaluates to true then throw the exception.
            if (assertion())
                throw (TException)Activator.CreateInstance(typeof(TException), message);
        }

    }
}
