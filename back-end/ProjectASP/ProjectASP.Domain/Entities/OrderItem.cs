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
    [Table(nameof(OrderItem))]
    public class OrderItem : BaseEntity
    {
        public Guid? OrderId { get; set; }

        public Guid? ProductPriceId { get; set; }

        /// <summary>
        /// This name compiled from the product name and price name
        /// </summary>
        public string ProductPriceName { get; set; }

        /// <summary>
        /// Original price of product price
        /// </summary>
        [Precision(18, 2)]
        public decimal OriginalPrice { get; set; }

        public int Quantity { get; set; }

        public string ItemName
        {
            get
            {
                string itemName = ProductName;
                if (!string.IsNullOrWhiteSpace(ProductPriceName))
                {
                    itemName += $" ({ProductPriceName})";
                }

                return itemName;
            }
        }

        public string Notes { get; set; }

        public Guid? ProductId { get; set; }

        public string ProductName { get; set; }

        public Guid? StoreId { get; set; }


        public virtual Order Order { get; set; }

        public virtual ProductPrice ProductPrice { get; set; }

        public virtual Product Product { get; set; }
    }
}
