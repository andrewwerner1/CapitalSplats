﻿using CapitalSplatsRacquetball.Domain;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

namespace CapitalSplatsRacquetball.Data
{
    public class SplatsContext : DbContext
    {

        public DbSet<LogRecord> LogRecords { get; set; }

        public DbSet<Game> Games { get; set; }

        public DbSet<Player> Players { get; set; }

        public DbSet<GameMatch> Matches { get; set; }

        public DbSet<RequestEmailRecepient> RequestEmailRecepients { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=Splats;Integrated Security=True;";
            optionsBuilder.UseSqlServer(connectionString);
        }
    }
}
