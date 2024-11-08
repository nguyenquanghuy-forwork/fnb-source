using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Linq.Expressions;

namespace ProjectASP.Common.Extensions
{
    public static class DatetimeExtensions
    {
        public static int ToTimestamp(this DateTime dateTime)
        {
            int res;
            var convert = dateTime.Subtract(new DateTime(1970, 1, 1)).TotalSeconds.ToString();
            int.TryParse(convert, out res);
            return res;
        }
    }
}
