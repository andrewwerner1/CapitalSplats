using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using CapitalSplatsRacquetball.Data;
using CapitalSplatsRacquetball.Web.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Text.Json;

namespace CapitalSplatsRacquetball.Web.Controllers
{
    public class ScoreController : Controller
    {

        private readonly ILogger<ScoreController> _logger;
        private SplatsContext dbContext = new SplatsContext();

        public ScoreController(ILogger<ScoreController> logger)
        {
            _logger = logger;

        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ContentResult LoadRows()
        {
            var games = dbContext.Games.ToList();
            var matches = dbContext.Matches.ToList();
            var players = dbContext.Players.ToList();
            var items = new List<ScoresTableRowViewModel>();
            foreach( var game in games)
            {
                var player1 = players.Single(p => p.Id == game.Player1.Id);
                var player2 = players.Single(p => p.Id == game.Player2.Id);
                var matchesOfGame = matches.Where(m => m.GameId == game.Id).ToList();
                var row = new ScoresTableRowViewModel
                {
                    ID = game.Id,
                    PrettyDate = game.Date.ToShortDateString(),
                    Location = game.Location,
                    Player1Name = string.Format("{0} {1}", player1.FirstName, player1.LastName),
                    Player2Name = string.Format("{0} {1}", player2.FirstName, player2.LastName),
                    Match1Player1Score = matches.ElementAt(0).Player1Score,
                    Match1Player2Score = matches.ElementAt(0).Player2Score,
                    Match2Player1Score = matches.ElementAt(1).Player1Score,
                    Match2Player2Score = matches.ElementAt(1).Player2Score
                };
                items.Add(row);
            }


            string content = JsonConvert.SerializeObject(new { 
                rows = items,
                total = items.Count
            });

            return new ContentResult() { Content = content, ContentType = "application/json" };

        }
    }
}
