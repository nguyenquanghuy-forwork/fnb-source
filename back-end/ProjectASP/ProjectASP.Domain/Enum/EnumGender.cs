using System.ComponentModel;

namespace ProjectASP.Domain.Enums
{
    public enum EnumGender
    {
        [Description("Male")]
        Male = 1,

        [Description("Female")]
        Female = 2,

        [Description("Other")]
        Other = 3,
    }

    public static class EnumGenderExtension
    {
        public static string GetTextEN(this EnumGender enumGender) => enumGender switch
        {
            EnumGender.Male => "Male",
            EnumGender.Female => "Female",
            EnumGender.Other => "Other",
            _ => string.Empty
        };

        public static string GetTextVI(this EnumGender enumGender) => enumGender switch
        {
            EnumGender.Male => "Nam",
            EnumGender.Female => "Nữ",
            EnumGender.Other => "Khác",
            _ => string.Empty
        };
    }
}
