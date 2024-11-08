using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectASP.Domain.Enum
{
    public enum EnumStatus
    {
        [Description("Inactive")]
        Inactive = 0,

        [Description("Active")]
        Active = 1,
    }
}
