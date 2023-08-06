using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BetApp.Migrations.Bet
{
    /// <inheritdoc />
    public partial class refactorMatchResult : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchResults_Coupons_CouponId",
                table: "MatchResults");

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("09034133-67fb-447a-a05f-1270a699b7b7"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("32a4984a-0d84-4062-8f7d-6e067f27e9b9"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("34e81e7c-0bb1-49c9-842b-e4c67a77fbfc"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("3de4344e-8d16-4b18-b0eb-9b6334769d8c"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("4f54bedb-10c4-4016-b2b2-16e027536ffd"));

            migrationBuilder.DeleteData(
                table: "Teams",
                keyColumn: "Id",
                keyValue: new Guid("f67de1eb-a198-4c0e-ae72-720abadbd2e8"));

            migrationBuilder.RenameColumn(
                name: "Counter",
                table: "MatchResults",
                newName: "BetType");

            migrationBuilder.AlterColumn<int>(
                name: "TeamBScore",
                table: "MatchResults",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<int>(
                name: "TeamAScore",
                table: "MatchResults",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<Guid>(
                name: "CouponId",
                table: "MatchResults",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

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

            migrationBuilder.AddForeignKey(
                name: "FK_MatchResults_Coupons_CouponId",
                table: "MatchResults",
                column: "CouponId",
                principalTable: "Coupons",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MatchResults_Coupons_CouponId",
                table: "MatchResults");

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
                name: "BetType",
                table: "MatchResults",
                newName: "Counter");

            migrationBuilder.AlterColumn<int>(
                name: "TeamBScore",
                table: "MatchResults",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TeamAScore",
                table: "MatchResults",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "CouponId",
                table: "MatchResults",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "ImageUrl", "Name", "Power" },
                values: new object[,]
                {
                    { new Guid("09034133-67fb-447a-a05f-1270a699b7b7"), "https://assets.stickpng.com/images/584a9b3bb080d7616d298777.png", "FC.Barceluna", 75 },
                    { new Guid("32a4984a-0d84-4062-8f7d-6e067f27e9b9"), "url_druzyny_c", "Lagia Warszawa", 100 },
                    { new Guid("34e81e7c-0bb1-49c9-842b-e4c67a77fbfc"), "https://upload.wikimedia.org/wikipedia/hif/f/ff/Manchester_United_FC_crest.png", "Manchuster United", 65 },
                    { new Guid("3de4344e-8d16-4b18-b0eb-9b6334769d8c"), "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png", "Manchester Citi", 90 },
                    { new Guid("4f54bedb-10c4-4016-b2b2-16e027536ffd"), "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Juventus_Logo.png/1200px-Juventus_Logo.png", "Juventus Turin", 78 },
                    { new Guid("f67de1eb-a198-4c0e-ae72-720abadbd2e8"), "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/2048px-FC_Internazionale_Milano_2021.svg.png", "Intor Mediolan", 90 }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_MatchResults_Coupons_CouponId",
                table: "MatchResults",
                column: "CouponId",
                principalTable: "Coupons",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
