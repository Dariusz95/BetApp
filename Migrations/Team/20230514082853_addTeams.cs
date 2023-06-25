using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BetApp.Migrations.Team
{
    /// <inheritdoc />
    public partial class addTeams : Migration
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

            migrationBuilder.InsertData(
                table: "Teams",
                columns: new[] { "Id", "ImageUrl", "Name", "Power" },
                values: new object[,]
                {
                    { new Guid("4bf6d700-2ddc-4576-aba7-fd25786511a4"), "url_druzyny_c", "Drużyna D", 65 },
                    { new Guid("7a44900a-24d3-4100-a400-fe97f786a306"), "url_druzyny_b", "Drużyna B", 75 },
                    { new Guid("a680fd7a-6b89-4352-bb45-78f53c4458e1"), "url_druzyny_a", "Drużyna A", 80 },
                    { new Guid("aba5cf22-246e-4c2b-9486-6ae92836aa5d"), "url_druzyny_c", "Drużyna C", 90 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Teams");
        }
    }
}
