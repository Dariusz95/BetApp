using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BetApp.Migrations
{
    /// <inheritdoc />
    public partial class initialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Teams",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    Power = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teams", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    CoinsAmount = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Coupons",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BetValue = table.Column<int>(type: "integer", nullable: false),
                    IsWin = table.Column<bool>(type: "boolean", nullable: false),
                    TotalCourse = table.Column<decimal>(type: "numeric", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coupons", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Coupons_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MatchResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TeamAScore = table.Column<int>(type: "integer", nullable: false),
                    TeamBScore = table.Column<int>(type: "integer", nullable: false),
                    BetTypeCourse = table.Column<decimal>(type: "numeric", nullable: false),
                    BetType = table.Column<int>(type: "integer", nullable: false),
                    IsWin = table.Column<bool>(type: "boolean", nullable: true),
                    TeamAId = table.Column<Guid>(type: "uuid", nullable: false),
                    TeamBId = table.Column<Guid>(type: "uuid", nullable: false),
                    CouponId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchResults_Coupons_CouponId",
                        column: x => x.CouponId,
                        principalTable: "Coupons",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_MatchResults_Teams_TeamAId",
                        column: x => x.TeamAId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MatchResults_Teams_TeamBId",
                        column: x => x.TeamBId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "ImageUrl", "Name", "Power" },
                values: new object[,]
                {
                    { new Guid("1a6ff75a-8327-4fff-bec8-7d0e26352cd2"), "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Juventus_Logo.png/1200px-Juventus_Logo.png", "Juventus Turin", 78 },
                    { new Guid("24830625-ea43-493c-b90d-a4ff422d3a7c"), "https://upload.wikimedia.org/wikipedia/hif/f/ff/Manchester_United_FC_crest.png", "Manchuster United", 65 },
                    { new Guid("2c921d85-7f56-44e5-9956-e9ca64f85cec"), "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png", "Manchester Citi", 90 },
                    { new Guid("8ea0a590-ee50-452f-a4d2-ab1514cd20df"), "https://assets.stickpng.com/images/584a9b3bb080d7616d298777.png", "FC.Barceluna", 75 },
                    { new Guid("cdf9f3eb-a98c-4d31-98f1-e860c8bb9a2f"), "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/2048px-FC_Internazionale_Milano_2021.svg.png", "Intor Mediolan", 90 },
                    { new Guid("eebe0581-b860-43b9-8c07-6f487d2aa005"), "url_druzyny_c", "Lagia Warszawa", 100 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Coupons_UserId",
                table: "Coupons",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchResults_CouponId",
                table: "MatchResults",
                column: "CouponId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchResults_TeamAId",
                table: "MatchResults",
                column: "TeamAId");

            migrationBuilder.CreateIndex(
                name: "IX_MatchResults_TeamBId",
                table: "MatchResults",
                column: "TeamBId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MatchResults");

            migrationBuilder.DropTable(
                name: "Coupons");

            migrationBuilder.DropTable(
                name: "Teams");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
