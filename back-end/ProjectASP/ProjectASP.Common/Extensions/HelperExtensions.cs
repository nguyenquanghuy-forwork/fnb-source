using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace ProjectASP.Common.Extensions
{
    public static class HelperExtensions
    {
        public static bool IsNullOrEmpty(this string input)
        {
            return string.IsNullOrEmpty(input);
        }

        public static string Base64Encode(this string plainText)
        {
            var plainTextBytes = Encoding.UTF8.GetBytes(plainText);
            return Convert.ToBase64String(plainTextBytes);
        }

        public static string Base64Decode(this string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            return Encoding.UTF8.GetString(base64EncodedBytes);
        }

        public static bool IsBlank(this string strValue)
        {
            return string.IsNullOrEmpty(strValue);
        }

        public static T JsonDeserializeNullSafe<T>(this string value) where T : class
        {
            if (value.IsBlank())
            {
                return null;
            }

            return JsonConvert.DeserializeObject<T>(value);
        }

        public static string CombineUris(this string uri1, string uri2)
        {
            uri1 = uri1.TrimEnd('/');
            uri2 = uri2.TrimStart('/');
            return $"{uri1}/{uri2}";
        }

        /// <summary>
        /// Get file extension
        /// </summary>
        /// <param name="base64String"></param>
        /// <returns></returns>
        public static string GetFileExtension(this string base64String)
        {
            var data = base64String.Substring(0, 5);

            return data.ToUpper() switch
            {
                "IVBOR" => "png",
                "/9J/4" => "jpg",
                "AAAAF" => "mp4",
                "JVBER" => "pdf",
                "AAABA" => "ico",
                "UMFYI" => "rar",
                "E1XYD" => "rtf",
                "U1PKC" => "txt",
                "MQOWM" or "77U/M" => "srt",
                _ => string.Empty,
            };
        }

        /// <summary>
        /// Get image extension from base64String
        /// </summary>
        /// <param name="base64String"></param>
        /// <returns></returns>
        public static string GetImageExtension(this string base64String)
        {
            var data = base64String.Substring(0, 5);
            return data.ToUpper() switch
            {
                "IVBOR" => ".png",
                "/9J/4" => ".jpg",
                _ => string.Empty,
            };
        }

        /// <summary>
        /// Convert string Guid to Guid
        /// </summary>
        /// <param name="inputValue"></param>
        /// <returns></returns>
        public static Guid? ToGuid(this string inputValue)
        {
            try
            {
                return new Guid(inputValue);
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// First char to lower case
        /// </summary>
        /// <param name="str"></param>
        /// <returns></returns>
        public static string FirstCharToLowerCase(this string str)
        {
            if (!string.IsNullOrEmpty(str) && char.IsUpper(str[0]))
                return str.Length == 1 ? char.ToLower(str[0]).ToString() : char.ToLower(str[0]) + str[1..];

            return str;
        }

        /// <summary>
        /// Parse query string to string json object
        /// </summary>
        /// <param name="str"></param>
        /// <returns>string json object</returns>
        public static string ParseQueryStringToJson(this string str)
        {
            var dict = HttpUtility.ParseQueryString(str);
            var json = System.Text.Json.JsonSerializer.Serialize(dict.AllKeys.ToDictionary(k => k, k => dict[k]));

            return json;
        }

        /// <summary>
        /// Date compare
        /// </summary>
        /// <param name="t1"></param>
        /// <param name="t2"></param>
        /// <returns>
        /// Less than zero: this time is earlier than t2.
        /// Zero: this time is the same as t2.
        /// Greater than zero: this time is later than t2.
        /// </returns>
        public static int DateCompare(this DateTime t1, DateTime? t2)
        {
            if (t2.HasValue)
            {
                var result = DateTime.Compare(t1, t2.Value);

                return result;
            }

            return -1;
        }

        public static DateTime? ToUtcDateTime(this DateTime? localTime)
        {
            if (localTime.HasValue)
            {
                var utcDateTime = TimeZoneInfo.ConvertTimeToUtc(localTime.Value, TimeZoneInfo.Local);

                return utcDateTime;
            }

            return null;
        }

        public static DateTime ToUtcDateTime(this DateTime localTime)
        {
            var utcDateTime = TimeZoneInfo.ConvertTimeToUtc(localTime, TimeZoneInfo.Local);

            return utcDateTime;
        }

        /// <summary>
        /// Convert the string to your desired enum type
        /// </summary>
        /// <typeparam name="T">Enum type you want to convert to</typeparam>
        /// <param name="value">The string you want to convert to enum type</param>
        /// <returns></returns>
        public static T ParseStringToEnum<T>(string value)
        {
            Type typeEnum = typeof(T);
            bool isEnum = Enum.IsDefined(typeEnum, value);
            if (isEnum)
            {
                T result = (T)Enum.Parse(typeEnum, value, true);

                return result;
            }
            return default;
        }

        public static string ConvertCodeFormat(this int number)
        {
            return $"{number:0000}";
        }

        public static string ConvertCodeFormat(this int number, string prefix)
        {
            return $"{prefix}{number:0000}";
        }

        public static string GetValueFromRequestHeader(this IHttpContextAccessor httpContextAccessor, string findKey)
        {
            var headers = httpContextAccessor.HttpContext.Request.Headers;
            var result = headers.FirstOrDefault(i => i.Key == findKey);
            return result.Value;
        }

        public static DateTime EndOfDay(this DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 23, 59, 59, 999);
        }

        public static DateTime StartOfDay(this DateTime date)
        {
            return new DateTime(date.Year, date.Month, date.Day, 0, 0, 0, 0);
        }

        public static string RemoveSign4VietnameseString(this string str)
        {
            if (string.IsNullOrEmpty(str)) return string.Empty;
            string[] vietnameseSigns = new string[]
             {
                "aAeEoOuUiIdDyY",
                "áàạảãâấầậẩẫăắằặẳẵ",
                "ÁÀẠẢÃÂẤẦẬẨẪĂẮẰẶẲẴ",
                "éèẹẻẽêếềệểễ",
                "ÉÈẸẺẼÊẾỀỆỂỄ",
                "óòọỏõôốồộổỗơớờợởỡ",
                "ÓÒỌỎÕÔỐỒỘỔỖƠỚỜỢỞỠ",
                "úùụủũưứừựửữ",
                "ÚÙỤỦŨƯỨỪỰỬỮ",
                "íìịỉĩ",
                "ÍÌỊỈĨ",
                "đ",
                "Đ",
                "ýỳỵỷỹ",
                "ÝỲỴỶỸ"
             };

            for (int i = 1; i < vietnameseSigns.Length; i++)
            {
                for (int j = 0; j < vietnameseSigns[i].Length; j++)
                {
                    str = str.Replace(vietnameseSigns[i][j], vietnameseSigns[0][i - 1]);
                }
            }

            return str;
        }

        public static string RemoveWhitespace(this string input)
        {
            var regexWhitespace = new Regex(@"\s+");

            return regexWhitespace.Replace(input, "");
        }

        public static string RemoveSpecialCharacter(this string input)
        {
            string result = Regex.Replace(input, @"[^0-9a-zA-Z]", "");
            return result.ToString();
        }

        public static string FormatedNumber(this decimal input)
        {
            return input.ToString("N0");
        }

        public static string FormatedNumber(this decimal? input)
        {
            if (input.HasValue)
            {
                return input?.ToString("N0");
            }
            else
            {
                return $"0";
            }
        }

        public static string FormatedDateTime(this DateTime? input, string format)
        {
            return input?.ToString(format);
        }

        /// <summary>
        /// Generate Code By PadLeft
        /// </summary>
        /// <param name="code">Text input code</param>
        /// <param name="prefix">Char generates before code with number length input</param>
        /// <param name="length">number char generate </param>
        /// <returns></returns>
        public static string GenerateCodeByPadLeft(this string code, char prefix, int length)
        {
            string r = string.Empty;
            if (!string.IsNullOrWhiteSpace(code))
            {
                r = code.PadLeft(length, prefix) ?? "";
            }
            return r;

        }

        public static bool IsValidEmail(string email)
        {
            if (email.EndsWith("."))
            {
                return false; // suggested by @TK-421
            }
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public static string ConvertFirstLetterToLower(this string input)
        {
            return string.Concat(input[..1].ToLower(), input.AsSpan(1));
        }

        public static string GetDayOfWeekInVietnamese(this DayOfWeek dayOfWeek)
        {
            switch (dayOfWeek)
            {
                case DayOfWeek.Monday:
                    return "Thứ Hai";
                case DayOfWeek.Tuesday:
                    return "Thứ Ba";
                case DayOfWeek.Wednesday:
                    return "Thứ Tư";
                case DayOfWeek.Thursday:
                    return "Thứ Năm";
                case DayOfWeek.Friday:
                    return "Thứ Sáu";
                case DayOfWeek.Saturday:
                    return "Thứ Bảy";
                case DayOfWeek.Sunday:
                    return "Chủ Nhật";
                default:
                    throw new ArgumentOutOfRangeException(nameof(dayOfWeek));
            }
        }

        public static string GetFullNameByDefaultCountry(bool isDefaultCountryVN, string firstName, string lastName)
        {
            lastName = lastName ?? string.Empty;
            return isDefaultCountryVN ? string.Join(' ', lastName, firstName)
                        : string.Join(' ', firstName, lastName);
        }

        public static bool Between(this DateTime input, DateTime startDate, DateTime endDate)
        {
            return input > startDate && input < endDate;
        }
    }
}
