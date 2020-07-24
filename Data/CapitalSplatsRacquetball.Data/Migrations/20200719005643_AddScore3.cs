using Microsoft.EntityFrameworkCore.Migrations;

namespace CapitalSplatsRacquetball.Data.Migrations
{
    public partial class AddScore3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Score3",
                table: "Score",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Score3",
                table: "Score");
        }
    }
}
