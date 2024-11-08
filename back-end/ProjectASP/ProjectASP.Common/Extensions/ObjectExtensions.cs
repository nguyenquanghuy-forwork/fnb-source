using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Linq.Expressions;

namespace ProjectASP.Common.Extensions
{
    public class DecimalFormatConverter : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(decimal) || objectType == typeof(decimal?);
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            writer.WriteValue(string.Format("{0:F2}", value));
        }

        public override bool CanRead
        {
            get { return false; }
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }
    }

    public static class ObjectExtensions
    {
        public static string ToJson(this object obj)
        {
            return JsonConvert.SerializeObject(obj);
        }

        public static T ToObject<T>(this string jsonString)
        {
            return JsonConvert.DeserializeObject<T>(jsonString);
        }

        public static string ToJsonWithCamelCase(this object obj)
        {
            return JsonConvert.SerializeObject(obj, CamelCaseJsonSettings);
        }

        public static string ToJsonWithCamelCaseDecimalFormatConverter(this object obj)
        {
            var settings = new JsonSerializerSettings
            {
                MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
                DateParseHandling = DateParseHandling.None,
                Formatting = Formatting.Indented,
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
            };

            settings.Converters.Add(new DecimalFormatConverter());

            return JsonConvert.SerializeObject(obj, settings);
        }

        private static readonly JsonSerializerSettings CamelCaseJsonSettings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Formatting = Formatting.Indented,
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            ContractResolver = new CamelCasePropertyNamesContractResolver(),
        };

        public static IQueryable<T> OrderBy<T>(this IQueryable<T> source, string ordering)
        {
            var type = typeof(T);
            var property = type.GetProperty(ordering);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExp = Expression.Lambda(propertyAccess, parameter);
            MethodCallExpression resultExp = Expression.Call(typeof(Queryable), "OrderBy", new Type[] { type, property.PropertyType }, source.Expression, Expression.Quote(orderByExp));
            return source.Provider.CreateQuery<T>(resultExp);
        }

        public static IQueryable<T> OrderByDescending<T>(this IQueryable<T> source, string ordering)
        {
            var type = typeof(T);
            var property = type.GetProperty(ordering);
            var parameter = Expression.Parameter(type, "p");
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var orderByExp = Expression.Lambda(propertyAccess, parameter);
            MethodCallExpression resultExp = Expression.Call(typeof(Queryable), "OrderByDescending", new Type[] { type, property.PropertyType }, source.Expression, Expression.Quote(orderByExp));
            return source.Provider.CreateQuery<T>(resultExp);
        }

        public static T Clone<T>(this object obj)
        {
            var serialized = JsonConvert.SerializeObject(obj);
            var result = JsonConvert.DeserializeObject<T>(serialized);
            return result;
        }
    }
}
