using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BetApp.Migrations.Bet
{
    /// <inheritdoc />
    public partial class refactorCoupon : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("1db10d55-e1b8-4b5e-ab27-8a82ff9d68e3"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("2b51fea5-ef16-4c59-b90d-9806a851b9f8"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("88d25962-6332-46b0-93d2-18a385a4ccd1"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("b92902fe-9e5a-4a4e-9502-7c6c525b49c8"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("d5efe825-e276-4a8c-b72d-bf48076564a4"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("ec37d5b2-2246-415c-8ac3-58691ba40d6e"));

            migrationBuilder.RenameColumn(
                name: "PotentialWinValue",
                table: "Coupons",
                newName: "BetValue");

            migrationBuilder.RenameColumn(
                name: "IsCouponWin",
                table: "Coupons",
                newName: "IsWin");

            migrationBuilder.RenameColumn(
                name: "Course",
                table: "Coupons",
                newName: "TotalCourse");

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "ImageUrl", "Name", "Power" },
                values: new object[,]
                {
                    { new Guid("89e1fcb0-7652-40c8-abcf-9d3abe3ff97b"), "https://upload.wikimedia.org/wikipedia/hif/f/ff/Manchester_United_FC_crest.png", "Manchuster United", 65 },
                    { new Guid("b66f0f60-326f-4e73-a3a0-53e91ab845bd"), "url_druzyny_c", "Lagia Warszawa", 100 },
                    { new Guid("c7fb03ff-16ac-431d-87da-153e61669d6e"), "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png", "Manchester Citi", 90 },
                    { new Guid("d16ca520-7adb-427f-8da0-334447b75e55"), "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Juventus_Logo.png/1200px-Juventus_Logo.png", "Juventus Turin", 78 },
                    { new Guid("d3302441-7017-459b-9e75-70d2f9ea4384"), "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/2048px-FC_Internazionale_Milano_2021.svg.png", "Intor Mediolan", 90 },
                    { new Guid("e034e77c-9c0e-4c5b-adbd-16bac3d97adc"), "https://assets.stickpng.com/images/584a9b3bb080d7616d298777.png", "FC.Barceluna", 75 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("89e1fcb0-7652-40c8-abcf-9d3abe3ff97b"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("b66f0f60-326f-4e73-a3a0-53e91ab845bd"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("c7fb03ff-16ac-431d-87da-153e61669d6e"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("d16ca520-7adb-427f-8da0-334447b75e55"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("d3302441-7017-459b-9e75-70d2f9ea4384"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("e034e77c-9c0e-4c5b-adbd-16bac3d97adc"));

            migrationBuilder.RenameColumn(
                name: "TotalCourse",
                table: "Coupons",
                newName: "Course");

            migrationBuilder.RenameColumn(
                name: "IsWin",
                table: "Coupons",
                newName: "IsCouponWin");

            migrationBuilder.RenameColumn(
                name: "BetValue",
                table: "Coupons",
                newName: "PotentialWinValue");

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "ImageUrl", "Name", "Power" },
                values: new object[,]
                {
                    { new Guid("1db10d55-e1b8-4b5e-ab27-8a82ff9d68e3"), "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Juventus_Logo.png/1200px-Juventus_Logo.png", "Juventus Turin", 78 },
                    { new Guid("2b51fea5-ef16-4c59-b90d-9806a851b9f8"), "https://upload.wikimedia.org/wikipedia/hif/f/ff/Manchester_United_FC_crest.png", "Manchuster United", 65 },
                    { new Guid("88d25962-6332-46b0-93d2-18a385a4ccd1"), "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png", "Manchester Citi", 90 },
                    { new Guid("b92902fe-9e5a-4a4e-9502-7c6c525b49c8"), "url_druzyny_c", "Lagia Warszawa", 100 },
                    { new Guid("d5efe825-e276-4a8c-b72d-bf48076564a4"), "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/2048px-FC_Internazionale_Milano_2021.svg.png", "Intor Mediolan", 90 },
                    { new Guid("ec37d5b2-2246-415c-8ac3-58691ba40d6e"), "https://assets.stickpng.com/images/584a9b3bb080d7616d298777.png", "FC.Barceluna", 75 }
                });
        }
    }
}
