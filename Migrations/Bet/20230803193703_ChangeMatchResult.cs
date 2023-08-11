using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BetApp.Migrations.Bet
{
    /// <inheritdoc />
    public partial class ChangeMatchResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("0a26bdf4-dfd1-492d-9f15-dbead21df51f"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("205c1739-15bc-44a3-bfb8-6e83d8b43cee"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("43efa54c-2411-42d1-ba7e-7ee39b0107e3"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("5076cf58-93b0-4270-8830-b45ceb1e2f21"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("868cd73f-be79-4aff-8371-d314913e1277"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("95b22527-e2f7-4eb6-bbc4-d9374fd55564"));

            migrationBuilder.RenameColumn(
                name: "IsOver",
                table: "MatchResults",
                newName: "IsWin");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
                name: "IsWin",
                table: "MatchResults",
                newName: "IsOver");

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "ImageUrl", "Name", "Power" },
                values: new object[,]
                {
                    { new Guid("0a26bdf4-dfd1-492d-9f15-dbead21df51f"), "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/2048px-FC_Internazionale_Milano_2021.svg.png", "Intor Mediolan", 90 },
                    { new Guid("205c1739-15bc-44a3-bfb8-6e83d8b43cee"), "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png", "Manchester Citi", 90 },
                    { new Guid("43efa54c-2411-42d1-ba7e-7ee39b0107e3"), "https://upload.wikimedia.org/wikipedia/hif/f/ff/Manchester_United_FC_crest.png", "Manchuster United", 65 },
                    { new Guid("5076cf58-93b0-4270-8830-b45ceb1e2f21"), "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Juventus_Logo.png/1200px-Juventus_Logo.png", "Juventus Turin", 78 },
                    { new Guid("868cd73f-be79-4aff-8371-d314913e1277"), "url_druzyny_c", "Lagia Warszawa", 100 },
                    { new Guid("95b22527-e2f7-4eb6-bbc4-d9374fd55564"), "https://assets.stickpng.com/images/584a9b3bb080d7616d298777.png", "FC.Barceluna", 75 }
                });
        }
    }
}
