using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using ProjectASP.Domain;
using ProjectASP.Domain.Enums;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.Metrics;

namespace ProjectASP.Domain.Entities
{
    [Table(nameof(Order))]
    public class Order : BaseEntity
    {
        public Guid? StoreId { get; set; }

        [MaxLength(255)]
        public string Note { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Code { get; set; }

        /// <summary>
        /// Subtotal | Sum all original price of product items, toppings, fees
        /// </summary>
        [Precision(18, 2)]
        public decimal OriginalPrice { get; set; }

        public string CashierName { get; set; }

        /// <summary>
        /// Money given by customer
        /// </summary>
        [Precision(18, 2)]
        public decimal ReceivedAmount { get; set; }

        [Precision(18, 2)]
        public decimal Change { get; set; }

        [Description("Order revenue: OriginalPrice - TotalDiscountAmount + TotalFee + DeliveryFee + TotalTax")]
        [Precision(18, 2)]
        public decimal TotalAmount { get; set; }

        public string Status { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }

        public virtual Store Store { get; set; }
    }
}
