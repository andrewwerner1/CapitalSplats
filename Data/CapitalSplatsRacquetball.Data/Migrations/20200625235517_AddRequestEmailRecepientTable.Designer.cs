﻿// <auto-generated />
using System;
using CapitalSplatsRacquetball.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace CapitalSplatsRacquetball.Data.Migrations
{
    [DbContext(typeof(SplatsContext))]
    [Migration("20200625235517_AddRequestEmailRecepientTable")]
    partial class AddRequestEmailRecepientTable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("CapitalSplatsRacquetball.Domain.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("MatchesPlayed")
                        .HasColumnType("int");

                    b.Property<int?>("Player1Id")
                        .HasColumnType("int");

                    b.Property<int?>("Player2Id")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("Player1Id");

                    b.HasIndex("Player2Id");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("CapitalSplatsRacquetball.Domain.LogRecord", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateTime")
                        .HasColumnType("datetime2");

                    b.Property<int>("IPAddress")
                        .HasColumnType("int");

                    b.Property<int>("LogLevel")
                        .HasColumnType("int");

                    b.Property<string>("Message")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("LogRecords");
                });

            modelBuilder.Entity("CapitalSplatsRacquetball.Domain.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("CapitalSplatsRacquetball.Domain.RequestEmailRecepient", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EmailAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("RequestEmailRecepients");
                });

            modelBuilder.Entity("CapitalSplatsRacquetball.Domain.Score", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("GameId")
                        .HasColumnType("int");

                    b.Property<int>("Score1")
                        .HasColumnType("int");

                    b.Property<int>("Score2")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.ToTable("Score");
                });

            modelBuilder.Entity("CapitalSplatsRacquetball.Domain.Game", b =>
                {
                    b.HasOne("CapitalSplatsRacquetball.Domain.Player", "Player1")
                        .WithMany()
                        .HasForeignKey("Player1Id");

                    b.HasOne("CapitalSplatsRacquetball.Domain.Player", "Player2")
                        .WithMany()
                        .HasForeignKey("Player2Id");
                });

            modelBuilder.Entity("CapitalSplatsRacquetball.Domain.Score", b =>
                {
                    b.HasOne("CapitalSplatsRacquetball.Domain.Game", null)
                        .WithMany("Scores")
                        .HasForeignKey("GameId");
                });
#pragma warning restore 612, 618
        }
    }
}
