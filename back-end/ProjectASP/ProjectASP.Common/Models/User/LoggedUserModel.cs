using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectASP.Common.Models.User
{
    public class LoggedUserModel
    {
        public Guid? Id { get; set; } /// CustomerId or StaffId

        public Guid? AccountId { get; set; }

        public Guid? StoreId { get; set; }

        public Guid? BranchId { get; set; }

        public string BranchName { get; set; }

        public string Address { get; set; }

        public string Thumbnail { get; set; }

        public string StaffThumbnail { get; set; }

        /// <summary>
        /// This field has value when the user logged on POS
        /// </summary>
        public Guid? ShiftId { get; set; }

        public Guid AccountTypeId { get; set; }

        public string AccountType { get; set; }

        public string FullName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string UserName { get; set; }

        public string CurrencyCode { get; set; }

        public string CurrencySymbol { get; set; }

        public bool IsStartShift { get; set; }

        public string StoreName { get; set; }

        public string PhoneNumber { get; set; }

        public bool NeverExpires { get; set; }

        public Guid? CountryId { get; set; }

        public string CountryCode { get; set; }

        public DateTime LoginDateTime { get; set; }
    }
}
