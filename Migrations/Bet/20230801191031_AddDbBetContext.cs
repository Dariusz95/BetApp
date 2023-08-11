using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BetApp.Migrations.Bet
{
    /// <inheritdoc />
    public partial class AddDbBetContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Coupons",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    WinValue = table.Column<int>(type: "integer", nullable: false),
                    Course = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coupons", x => x.Id);
                });

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
                name: "MatchResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TeamAScore = table.Column<int>(type: "integer", nullable: false),
                    TeamBScore = table.Column<int>(type: "integer", nullable: false),
                    Counter = table.Column<int>(type: "integer", nullable: false),
                    IsOver = table.Column<bool>(type: "boolean", nullable: true),
                    TeamAId = table.Column<Guid>(type: "uuid", nullable: false),
                    TeamBId = table.Column<Guid>(type: "uuid", nullable: false),
                    CouponId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchResults_Coupons_CouponId",
                        column: x => x.CouponId,
                        principalTable: "Coupons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    { new Guid("0a26bdf4-dfd1-492d-9f15-dbead21df51f"), "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/2048px-FC_Internazionale_Milano_2021.svg.png", "Intor Mediolan", 90 },
                    { new Guid("205c1739-15bc-44a3-bfb8-6e83d8b43cee"), "https://logodownload.org/wp-content/uploads/2017/02/manchester-city-fc-logo-escudo-badge.png", "Manchester Citi", 90 },
                    { new Guid("43efa54c-2411-42d1-ba7e-7ee39b0107e3"), "https://upload.wikimedia.org/wikipedia/hif/f/ff/Manchester_United_FC_crest.png", "Manchuster United", 65 },
                    { new Guid("5076cf58-93b0-4270-8830-b45ceb1e2f21"), "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Juventus_Logo.png/1200px-Juventus_Logo.png", "Juventus Turin", 78 },
                    { new Guid("868cd73f-be79-4aff-8371-d314913e1277"), "url_druzyny_c", "Lagia Warszawa", 100 },
                    { new Guid("95b22527-e2f7-4eb6-bbc4-d9374fd55564"), "https://assets.stickpng.com/images/584a9b3bb080d7616d298777.png", "FC.Barceluna", 75 }
                });

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
        }
    }
}
