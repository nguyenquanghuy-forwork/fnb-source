using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjectASP.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDatabaseInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    ValidateCode = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PlatformId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    IsActivated = table.Column<bool>(type: "bit", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Thumbnail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Birthday = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ApiConfig",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApiConfigGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ApiConfigGroupName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    URL = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApiConfig", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Partner",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsConnected = table.Column<bool>(type: "bit", nullable: false),
                    ExtraInfo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Partner", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Store",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AddressId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    IsActivated = table.Column<bool>(type: "bit", nullable: false),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Store", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Token",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccessToken = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RefreshToken = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PartnerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    AccessTokenExpireIn = table.Column<int>(type: "int", nullable: false),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Token", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Warehouse",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShopId = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ShopCipher = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    WarehouseId = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    FullAddress = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    ContactPerson = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    WarehouseType = table.Column<int>(type: "int", nullable: true),
                    WarehouseName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PartnerWarehouseId = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PartnerWarehouseName = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: true),
                    City = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    District = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Town = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    PartnerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LastSyncTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warehouse", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Warehouse_Partner_PartnerId",
                        column: x => x.PartnerId,
                        principalTable: "Partner",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Order",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OriginalPrice = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    CashierName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReceivedAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Change = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Order_Store_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Store",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Unit",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Unit", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Unit_Store_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Store",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Material",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UnitId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    Sku = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MinQuantity = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    CostPerUnit = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: true),
                    HasExpiryDate = table.Column<bool>(type: "bit", nullable: false),
                    Thumbnail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Material", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Material_Store_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Store",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Material_Unit_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Unit",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UnitId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TaxId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    StatusId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Thumbnail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsTopping = table.Column<bool>(type: "bit", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsPrintStamp = table.Column<bool>(type: "bit", nullable: false),
                    Code = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Abbreviation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Product", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Product_Store_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Store",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Product_Unit_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Unit",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProductPrice",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Code = table.Column<int>(type: "int", nullable: false),
                    PriceName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PriceValue = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    StoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPrice", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductPrice_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItem",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrderId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ProductPriceId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ProductPriceName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OriginalPrice = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItem_Order_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Order",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrderItem_ProductPrice_ProductPriceId",
                        column: x => x.ProductPriceId,
                        principalTable: "ProductPrice",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OrderItem_Product_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Product",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProductPriceMaterial",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductPriceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MaterialId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    StoreId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UnitId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    LastSavedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    CreatedUser = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductPriceMaterial", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProductPriceMaterial_Material_MaterialId",
                        column: x => x.MaterialId,
                        principalTable: "Material",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductPriceMaterial_ProductPrice_ProductPriceId",
                        column: x => x.ProductPriceId,
                        principalTable: "ProductPrice",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductPriceMaterial_Unit_UnitId",
                        column: x => x.UnitId,
                        principalTable: "Unit",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Account_IsDeleted",
                table: "Account",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_ApiConfig_IsDeleted",
                table: "ApiConfig",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Material_IsDeleted",
                table: "Material",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Material_StoreId",
                table: "Material",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Material_UnitId",
                table: "Material",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Order_IsDeleted",
                table: "Order",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Order_StoreId",
                table: "Order",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_IsDeleted",
                table: "OrderItem",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_OrderId",
                table: "OrderItem",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_ProductId",
                table: "OrderItem",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItem_ProductPriceId",
                table: "OrderItem",
                column: "ProductPriceId");

            migrationBuilder.CreateIndex(
                name: "IX_Partner_IsDeleted",
                table: "Partner",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Product_IsDeleted",
                table: "Product",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Product_StoreId",
                table: "Product",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Product_UnitId",
                table: "Product",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPrice_IsDeleted",
                table: "ProductPrice",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPrice_ProductId",
                table: "ProductPrice",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPriceMaterial_IsDeleted",
                table: "ProductPriceMaterial",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPriceMaterial_MaterialId",
                table: "ProductPriceMaterial",
                column: "MaterialId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPriceMaterial_ProductPriceId",
                table: "ProductPriceMaterial",
                column: "ProductPriceId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductPriceMaterial_UnitId",
                table: "ProductPriceMaterial",
                column: "UnitId");

            migrationBuilder.CreateIndex(
                name: "IX_Store_IsDeleted",
                table: "Store",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Token_IsDeleted",
                table: "Token",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Unit_IsDeleted",
                table: "Unit",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Unit_StoreId",
                table: "Unit",
                column: "StoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Warehouse_IsDeleted",
                table: "Warehouse",
                column: "IsDeleted");

            migrationBuilder.CreateIndex(
                name: "IX_Warehouse_PartnerId",
                table: "Warehouse",
                column: "PartnerId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "ApiConfig");

            migrationBuilder.DropTable(
                name: "OrderItem");

            migrationBuilder.DropTable(
                name: "ProductPriceMaterial");

            migrationBuilder.DropTable(
                name: "Token");

            migrationBuilder.DropTable(
                name: "Warehouse");

            migrationBuilder.DropTable(
                name: "Order");

            migrationBuilder.DropTable(
                name: "Material");

            migrationBuilder.DropTable(
                name: "ProductPrice");

            migrationBuilder.DropTable(
                name: "Partner");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Unit");

            migrationBuilder.DropTable(
                name: "Store");
        }
    }
}
