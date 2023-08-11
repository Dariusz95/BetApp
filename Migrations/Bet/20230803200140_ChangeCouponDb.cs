using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BetApp.Migrations.Bet
{
    /// <inheritdoc />
    public partial class ChangeCouponDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("152b4d87-3c60-4a7d-b8a3-e45728245464"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("57b14e4b-5b23-46c1-be32-17585d3945e8"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("cee991bf-10cd-420c-8427-f225f6db27ea"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("d5f5d65d-7794-4b41-b553-8fb87f5275d8"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("ed4d8760-5a4a-4b1f-83a9-5456ab35125e"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("f0323a76-f6c5-4d05-aea2-c4f6aeeec04d"));

            migrationBuilder.RenameColumn(
                name: "WinValue",
                table: "Coupons",
                newName: "PotentialWinValue");

            migrationBuilder.AddColumn<bool>(
                name: "IsCouponWin",
                table: "Coupons",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "ImageUrl", "Name", "Power" },
                values: new object[,]
                {
                    { new Guid("4d90cc67-653d-42f2-aff9-5029027b1c9f"), "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/2048px-FC_Internazionale_Milano_2021.svg.png", "Intor Mediolan", 90 },
                    { new Guid("677af38f-298b-498b-88f2-fff9aad335fa"), "url_druzyny_c", "Lagia Warszawa", 100 },
                    { new Guid("685339d6-5f7c-4e3f-8f9f-2b8a04859adb"), "https://upload.wikimedia.org/wikipedia/hif/f/ff/Manchester_United_FC_crest.png", "Manchuster United", 65 },
                    { new Guid("6ed638d1-7a59-4ba9-9aa2-e2014118c9b6"), "https://assets.stickpng.com/images/584a9b3bb080d7616d298777.png", "FC.Barceluna", 75 },
                    { new Guid("c37199c3-aaff-4f91-b50e-24a7ea568910"), "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png", "Manchester Citi", 90 },
                    { new Guid("e62642bb-7adb-4fa4-b9be-e573b5728fe3"), "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Juventus_Logo.png/1200px-Juventus_Logo.png", "Juventus Turin", 78 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("4d90cc67-653d-42f2-aff9-5029027b1c9f"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("677af38f-298b-498b-88f2-fff9aad335fa"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("685339d6-5f7c-4e3f-8f9f-2b8a04859adb"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("6ed638d1-7a59-4ba9-9aa2-e2014118c9b6"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("c37199c3-aaff-4f91-b50e-24a7ea568910"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("e62642bb-7adb-4fa4-b9be-e573b5728fe3"));

            migrationBuilder.DropColumn(
                name: "IsCouponWin",
                table: "Coupons");

            migrationBuilder.RenameColumn(
                name: "PotentialWinValue",
                table: "Coupons",
                newName: "WinValue");

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "ImageUrl", "Name", "Power" },
                values: new object[,]
                {
                    { new Guid("152b4d87-3c60-4a7d-b8a3-e45728245464"), "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png", "Manchester Citi", 90 },
                    { new Guid("57b14e4b-5b23-46c1-be32-17585d3945e8"), "https://upload.wikimedia.org/wikipedia/hif/f/ff/Manchester_United_FC_crest.png", "Manchuster United", 65 },
                    { new Guid("cee991bf-10cd-420c-8427-f225f6db27ea"), "url_druzyny_c", "Lagia Warszawa", 100 },
                    { new Guid("d5f5d65d-7794-4b41-b553-8fb87f5275d8"), "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Juventus_Logo.png/1200px-Juventus_Logo.png", "Juventus Turin", 78 },
                    { new Guid("ed4d8760-5a4a-4b1f-83a9-5456ab35125e"), "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/2048px-FC_Internazionale_Milano_2021.svg.png", "Intor Mediolan", 90 },
                    { new Guid("f0323a76-f6c5-4d05-aea2-c4f6aeeec04d"), "https://assets.stickpng.com/images/584a9b3bb080d7616d298777.png", "FC.Barceluna", 75 }
                });
        }
    }
}
